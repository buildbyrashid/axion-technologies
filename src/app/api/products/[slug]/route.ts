import { NextRequest } from 'next/server'
import { getProductBySlug } from '@/lib/db-helpers'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
      return handleAPIError(new Error('Product not found'), 'Product not found', 404)
    }

    return createSuccessResponse({ product })
  } catch (error: any) {
    console.error('Product API Error:', error)
    return handleAPIError(error, 'Failed to fetch product')
  }
}
