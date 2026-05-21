import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function GET() {
  try {
    const heroRows = await query<any[]>('SELECT * FROM homepage_hero LIMIT 1')
    const expertiseRows = await query<any[]>('SELECT * FROM homepage_expertise LIMIT 1')
    
    return NextResponse.json({ 
      success: true, 
      data: {
        hero: heroRows[0] || {},
        expertise: expertiseRows[0] || {}
      }
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { hero, expertise } = body

    if (hero) {
      const { id, ...heroFields } = hero
      const keys = Object.keys(heroFields)
      if (keys.length > 0) {
        const set = keys.map(k => `\`${k}\` = ?`).join(', ')
        await query(`UPDATE homepage_hero SET ${set} WHERE id = ?`, [...Object.values(heroFields), id])
      }
    }

    if (expertise) {
      const { id, ...expertiseFields } = expertise
      const keys = Object.keys(expertiseFields)
      if (keys.length > 0) {
        const set = keys.map(k => `\`${k}\` = ?`).join(', ')
        await query(`UPDATE homepage_expertise SET ${set} WHERE id = ?`, [...Object.values(expertiseFields), id])
      }
    }

    // Purge cached static homepage content on-demand
    revalidatePath('/')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
