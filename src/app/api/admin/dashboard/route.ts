import { NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function GET() {
  try {
    const [
      [products],
      [categories],
      [totalQuotes],
      [newQuotes],
      [totalContacts],
      [newContacts],
      [activeProds],
      recentInquiries
    ] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as count FROM products'),
      query<any[]>('SELECT COUNT(*) as count FROM categories'),
      query<any[]>('SELECT COUNT(*) as count FROM inquiries WHERE source = ?', ['quote_form']),
      query<any[]>('SELECT COUNT(*) as count FROM inquiries WHERE status = ? AND source = ?', ['new', 'quote_form']),
      query<any[]>('SELECT COUNT(*) as count FROM inquiries WHERE source != ? OR source IS NULL', ['quote_form']),
      query<any[]>('SELECT COUNT(*) as count FROM inquiries WHERE status = ? AND (source != ? OR source IS NULL)', ['new', 'quote_form']),
      query<any[]>('SELECT COUNT(*) as count FROM products WHERE is_active = 1'),
      query<any[]>(
        'SELECT id, name, company, email, status, created_at, country, source FROM inquiries ORDER BY created_at DESC LIMIT 8'
      ),
    ])

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalProducts: products.count || 0,
          totalCategories: categories.count || 0,
          totalQuotes: totalQuotes.count || 0,
          newQuotes: newQuotes.count || 0,
          totalContacts: totalContacts.count || 0,
          newContacts: newContacts.count || 0,
          activeProducts: activeProds.count || 0,
        },
        recentInquiries,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

