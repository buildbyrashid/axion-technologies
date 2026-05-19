import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM solutions_page LIMIT 1')
    return NextResponse.json({ success: true, data: rows[0] || {} })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...fields } = body
    
    const dbFields: any = {}
    const allowedFields = [
      'hero_title', 'hero_subtitle', 'hero_badge', 'hero_image',
      'tech_badge', 'tech_title', 'tech_subtitle',
      'tech_title_1', 'tech_img_1', 'tech_title_2', 'tech_img_2', 'tech_title_3', 'tech_img_3', 'tech_title_4', 'tech_img_4', 'tech_title_5', 'tech_img_5',
      'env_badge', 'env_title', 'env_subtitle',
      'env_title_1', 'env_img_1', 'env_title_2', 'env_img_2', 'env_title_3', 'env_img_3', 'env_title_4', 'env_img_4', 'env_title_5', 'env_img_5', 'env_title_6', 'env_img_6', 'env_title_7', 'env_img_7',
      'is_active'
    ]
    
    Object.keys(fields).forEach(key => {
      if (allowedFields.includes(key)) {
        dbFields[key] = fields[key]
      }
    })

    const keys = Object.keys(dbFields)
    if (keys.length === 0) return NextResponse.json({ success: false, error: 'No fields' }, { status: 400 })
    const set = keys.map(k => `\`${k}\` = ?`).join(', ')
    await query(`UPDATE solutions_page SET ${set} WHERE id = ?`, [...Object.values(dbFields), id])
    
    // Purge cached static solutions page on-demand
    revalidatePath('/solutions')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
