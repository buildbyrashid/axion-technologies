import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const heroRows = await query<any[]>('SELECT * FROM homepage_hero LIMIT 1')
    const expertiseRows = await query<any[]>('SELECT * FROM homepage_expertise LIMIT 1')
    const productsRows = await query<any[]>('SELECT * FROM homepage_products ORDER BY sort_order ASC')
    
    return NextResponse.json({ 
      success: true, 
      data: {
        hero: heroRows[0] || {},
        expertise: expertiseRows[0] || {},
        products: productsRows || []
      }
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { hero, expertise, products } = body

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

    if (products && Array.isArray(products)) {
      for (const product of products) {
        const { id, ...productFields } = product
        if (id) {
          const keys = Object.keys(productFields)
          if (keys.length > 0) {
            const set = keys.map(k => `\`${k}\` = ?`).join(', ')
            await query(`UPDATE homepage_products SET ${set} WHERE id = ?`, [...Object.values(productFields), id])
          }
        }
      }
    }

    // Purge cached static homepage content on-demand
    revalidatePath('/')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

