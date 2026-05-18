import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const categories = await query<any[]>(
      'SELECT * FROM categories ORDER BY sort_order ASC'
    )
    return NextResponse.json({ success: true, data: categories.map(c => ({ ...c, is_active: Boolean(c.is_active) })) })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, tagline, description, is_active = true, sort_order = 0 } = body
    const id = uuidv4()

    await query(
      'INSERT INTO categories (id, name, slug, tagline, description, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, slug, tagline || null, description || null, is_active ? 1 : 0, sort_order]
    )

    const [created] = await query<any[]>('SELECT * FROM categories WHERE id = ?', [id])
    return NextResponse.json({ success: true, data: { ...created, is_active: Boolean(created.is_active) } }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

// PATCH for bulk reorder
export async function PATCH(request: NextRequest) {
  try {
    const { updates } = await request.json() // [{ id, sort_order }]
    for (const u of updates) {
      await query('UPDATE categories SET sort_order = ? WHERE id = ?', [u.sort_order, u.id])
    }
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
