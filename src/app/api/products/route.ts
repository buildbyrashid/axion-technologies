import { getSupabaseClient } from '@/lib/supabase'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const category = searchParams.get('category')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10

    const supabase = getSupabaseClient()
    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (featured) {
      query = query.eq('is_featured', true)
    }

    if (category) {
      query = query.eq('category_slug', category)
    }

    const { data: products, error } = await query

    if (error) throw error
    
    return createSuccessResponse({
      products,
      count: products?.length || 0
    })
  } catch (error) {
    console.error('Products API Error:', error)
    return handleAPIError(error, 'Failed to fetch products')
  }
}
