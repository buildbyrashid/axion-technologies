import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const [product] = await query<any[]>(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [id])

    if (!product) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        is_active: Boolean(product.is_active),
        is_featured: Boolean(product.is_featured),
        gallery: product.gallery ? JSON.parse(product.gallery) : [],
        specifications: product.specifications ? JSON.parse(product.specifications) : {},
        features: product.features ? JSON.parse(product.features) : [],
        accessories: product.accessories ? JSON.parse(product.accessories) : [],
        applications: product.applications ? JSON.parse(product.applications) : [],
        downloads: product.downloads ? JSON.parse(product.downloads) : [],
      },
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      name, slug, category_id, short_description, full_description,
      is_active, is_featured, featured_image,
      gallery, specifications, features, accessories, applications, downloads,
    } = body

    await query(
      `UPDATE products SET
        name = ?, slug = ?, category_id = ?, short_description = ?, full_description = ?,
        is_active = ?, is_featured = ?, featured_image = ?,
        gallery = ?, specifications = ?, features = ?, accessories = ?, applications = ?, downloads = ?,
        updated_at = NOW()
       WHERE id = ?`,
      [
        name, slug, category_id || null, short_description || null, full_description || null,
        is_active ? 1 : 0, is_featured ? 1 : 0, featured_image || null,
        gallery ? JSON.stringify(gallery) : null,
        specifications ? JSON.stringify(specifications) : null,
        features ? JSON.stringify(features) : null,
        accessories ? JSON.stringify(accessories) : null,
        applications ? JSON.stringify(applications) : null,
        downloads ? JSON.stringify(downloads) : null,
        id,
      ]
    )
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const fields: string[] = []
    const values: any[] = []
    if (body.is_active !== undefined) { fields.push('is_active = ?'); values.push(body.is_active ? 1 : 0) }
    if (body.is_featured !== undefined) { fields.push('is_featured = ?'); values.push(body.is_featured ? 1 : 0) }
    if (fields.length === 0) return NextResponse.json({ success: false, error: 'No fields' }, { status: 400 })
    values.push(id)
    await query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values)
    return NextResponse.json({ success: true })
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
    await query('DELETE FROM products WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
