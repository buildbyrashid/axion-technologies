import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM global_cta LIMIT 1')
    const data = rows[0] || {}
    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...fields } = body
    const keys = Object.keys(fields)
    if (keys.length === 0) return NextResponse.json({ success: false, error: 'No fields' }, { status: 400 })
    const set = keys.map(k => `${k} = ?`).join(', ')
    await query(`UPDATE global_cta SET ${set} WHERE id = ?`, [...Object.values(fields), id])
    
    // Purge cached static homepage content on-demand
    revalidatePath('/')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
