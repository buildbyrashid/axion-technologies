import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, slug, tagline, description, parent_id, is_active, sort_order } = body

    const fields: string[] = []
    const values: any[] = []

    if (name !== undefined) { fields.push('name = ?'); values.push(name) }
    if (slug !== undefined) { fields.push('slug = ?'); values.push(slug) }
    if (tagline !== undefined) { fields.push('tagline = ?'); values.push(tagline || null) }
    if (description !== undefined) { fields.push('description = ?'); values.push(description || null) }
    if (parent_id !== undefined) { fields.push('parent_id = ?'); values.push(parent_id || null) }
    if (is_active !== undefined) { fields.push('is_active = ?'); values.push(is_active ? 1 : 0) }
    if (sort_order !== undefined) { fields.push('sort_order = ?'); values.push(sort_order) }

    if (fields.length === 0) {
      return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 })
    }

    values.push(id)
    await query(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`, values)

    const [updated] = await query<any[]>('SELECT * FROM categories WHERE id = ?', [id])
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
    // First clear parent_id references if deleting a parent category
    await query('UPDATE categories SET parent_id = NULL WHERE parent_id = ?', [id])
    await query('DELETE FROM categories WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
