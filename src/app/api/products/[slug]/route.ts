import { NextRequest } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const supabase = getSupabaseClient()
    
    const { data: product, error } = await supabase
      .from('products')
      .select('*, categories(*)')
      .eq('slug', slug)
      .single()

    if (error) throw error
    if (!product) throw new Error('Product not found')
    
    return createSuccessResponse({ product })
  } catch (error: any) {
    console.error('Product API Error:', error)
    
    if (error.message.includes('not found') || error.code === 'PGRST116') {
      return handleAPIError(error, 'Product not found', 404)
    }
    
    return handleAPIError(error, 'Failed to fetch product')
  }
}
