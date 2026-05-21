import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const products = await query<any[]>(`
      SELECT p.id, p.name, p.slug, p.category_id, p.subcategory_id, p.is_active, p.is_featured,
             p.featured_image, p.created_at,
             c.name as category_name,
             sc.name as subcategory_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN categories sc ON p.subcategory_id = sc.id
      ORDER BY p.created_at DESC
    `)
    return NextResponse.json({
      success: true,
      data: products.map(p => ({
        ...p,
        is_active: Boolean(p.is_active),
        is_featured: Boolean(p.is_featured),
        category_name: p.subcategory_name 
          ? `${p.category_name} > ${p.subcategory_name}` 
          : p.category_name
      })),
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, category_id, subcategory_id, short_description, full_description, is_active = true, is_featured = false } = body
    const id = uuidv4()
    await query(
      `INSERT INTO products (id, name, slug, category_id, subcategory_id, short_description, full_description, is_active, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, slug, category_id || null, subcategory_id || null, short_description || null, full_description || null, is_active ? 1 : 0, is_featured ? 1 : 0]
    )
    return NextResponse.json({ success: true, data: { id } }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
