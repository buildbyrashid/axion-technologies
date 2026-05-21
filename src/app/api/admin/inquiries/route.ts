import { NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function GET() {
  try {
    const inquiries = await query<any[]>(
      `SELECT i.*, p.name as product_name, p.slug as product_slug
       FROM inquiries i
       LEFT JOIN products p ON i.product_id = p.id
       ORDER BY i.created_at DESC`
    )
    return NextResponse.json({ success: true, data: inquiries })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
