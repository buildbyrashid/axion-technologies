import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const data = await query<any[]>('SELECT * FROM industries ORDER BY sort_order ASC')
    return NextResponse.json({ success: true, data: data.map(r => ({ ...r, is_active: Boolean(r.is_active) })) })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, icon_name, is_active = true, sort_order = 0 } = body
    const id = uuidv4()
    await query(
      'INSERT INTO industries (id, name, slug, description, icon_name, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, slug, description || null, icon_name || null, is_active ? 1 : 0, sort_order]
    )
    const [created] = await query<any[]>('SELECT * FROM industries WHERE id = ?', [id])
    return NextResponse.json({ success: true, data: { ...created, is_active: Boolean(created.is_active) } }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
