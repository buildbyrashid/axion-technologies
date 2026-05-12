import { getSupabaseClient } from '@/lib/supabase'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function GET() {
  try {
    const supabase = getSupabaseClient()
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    
    return createSuccessResponse({ categories })
  } catch (error) {
    console.error('Categories API Error:', error)
    return handleAPIError(error, 'Failed to fetch categories')
  }
}
