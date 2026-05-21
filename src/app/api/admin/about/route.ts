import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

import { revalidatePath } from 'next/cache'

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
    
    // Filter out internal non-db fields if any
    const dbFields: any = {}
    const allowedFields = [
      'hero_title', 'hero_subtitle', 'hero_badge', 'hero_image',
      'who_we_are_badge', 'who_we_are_title', 'who_we_are_paragraph_1', 'who_we_are_paragraph_2', 'who_we_are_image', 'technical_reach',
      'global_operations_title', 'global_operations_description',
      'visual_solutions_title', 'visual_solutions_description',
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
    await query(`UPDATE about_page SET ${set} WHERE id = ?`, [...Object.values(dbFields), id])
    
    // Purge cached static About page on-demand
    revalidatePath('/about')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
