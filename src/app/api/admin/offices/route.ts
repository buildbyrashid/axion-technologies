import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const data = await query<any[]>('SELECT * FROM global_offices ORDER BY sort_order ASC')
    return NextResponse.json({ success: true, data: data.map(r => ({ ...r, is_headquarters: Boolean(r.is_headquarters) })) })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { city, country, address, email, phone, role, is_headquarters = false, sort_order = 0 } = body
    const id = uuidv4()
    await query(
      'INSERT INTO global_offices (id, city, country, address, email, phone, role, is_headquarters, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, city, country, address || null, email || null, phone || null, role || 'Office', is_headquarters ? 1 : 0, sort_order]
    )
    const [created] = await query<any[]>('SELECT * FROM global_offices WHERE id = ?', [id])
    return NextResponse.json({ success: true, data: { ...created, is_headquarters: Boolean(created.is_headquarters) } }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
