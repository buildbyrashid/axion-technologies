import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM industries_page LIMIT 1')
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
      'sec_badge', 'sec_title', 'sec_subtitle',
      
      'ind_title_1', 'ind_sub_1', 'ind_desc_1', 'ind_img_1',
      'ind_title_2', 'ind_sub_2', 'ind_desc_2', 'ind_img_2',
      'ind_title_3', 'ind_sub_3', 'ind_desc_3', 'ind_img_3',
      'ind_title_4', 'ind_sub_4', 'ind_desc_4', 'ind_img_4',
      'ind_title_5', 'ind_sub_5', 'ind_desc_5', 'ind_img_5',
      'ind_title_6', 'ind_sub_6', 'ind_desc_6', 'ind_img_6',
      
      'is_active'
    ]
    
    Object.keys(fields).forEach(key => {
      if (allowedFields.includes(key)) {
        dbFields[key] = fields[key]
      }
    })

    const keys = Object.keys(dbFields)
    if (keys.length === 0) return NextResponse.json({ success: false, error: 'No fields provided' }, { status: 400 })
    
    const set = keys.map(k => `\`${k}\` = ?`).join(', ')
    await query(`UPDATE industries_page SET ${set} WHERE id = ?`, [...Object.values(dbFields), id])
    
    // Invalidate static caching layer on-demand
    revalidatePath('/industries')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
