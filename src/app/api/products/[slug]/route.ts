import { NextRequest } from 'next/server'
import { ProductService } from '@/lib/services/ProductService'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

const productService = new ProductService()

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const product = await productService.getProductBySlug(slug)
    
    return createSuccessResponse({ product })
  } catch (error: any) {
    console.error('Product API Error:', error)
    
    if (error.message.includes('not found')) {
      return handleAPIError(error, 'Product not found', 404)
    }
    
    return handleAPIError(error, 'Failed to fetch product')
  }
}
