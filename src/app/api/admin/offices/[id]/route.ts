import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { city, country, address, email, phone, role } = body
    await query(
      'UPDATE global_offices SET city = ?, country = ?, address = ?, email = ?, phone = ?, role = ?, is_headquarters = ? WHERE id = ?',
      [city, country, address || null, email || null, phone || null, role || 'Office', role === 'HQ' ? 1 : 0, id]
    )
    const [updated] = await query<any[]>('SELECT * FROM global_offices WHERE id = ?', [id])
    return NextResponse.json({ success: true, data: { ...updated, is_headquarters: Boolean(updated.is_headquarters) } })
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
    await query('DELETE FROM global_offices WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
