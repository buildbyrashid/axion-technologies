import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM about_page LIMIT 1')
    return NextResponse.json({ success: true, data: rows[0] || {} })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...fields } = body
    const keys = Object.keys(fields)
    if (keys.length === 0) return NextResponse.json({ success: false, error: 'No fields' }, { status: 400 })
    const set = keys.map(k => `${k} = ?`).join(', ')
    await query(`UPDATE about_page SET ${set} WHERE id = ?`, [...Object.values(fields), id])
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
