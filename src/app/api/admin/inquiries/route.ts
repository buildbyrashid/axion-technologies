import { NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    let sql = `SELECT i.*, p.name as product_name, p.slug as product_slug
               FROM inquiries i
               LEFT JOIN products p ON i.product_id = p.id`
    const params: any[] = []
    
    if (status) {
      sql += ` WHERE i.status = ?`
      params.push(status)
    }
    
    sql += ` ORDER BY i.created_at DESC`
    
    const inquiries = await query<any[]>(sql, params)
    return NextResponse.json({ success: true, data: inquiries })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
