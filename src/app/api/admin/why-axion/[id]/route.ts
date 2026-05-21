import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, icon_name, is_active } = body
    await query(
      'UPDATE why_axion SET title = ?, description = ?, icon_name = ?, is_active = ? WHERE id = ?',
      [title, description || null, icon_name || null, is_active ? 1 : 0, id]
    )
    const [updated] = await query<any[]>('SELECT * FROM why_axion WHERE id = ?', [id])
    return NextResponse.json({ success: true, data: { ...updated, is_active: Boolean(updated.is_active) } })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await query('DELETE FROM why_axion WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
