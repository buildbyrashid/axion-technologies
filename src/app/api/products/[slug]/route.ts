import { ProductService } from '@/lib/services/ProductService'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

const productService = new ProductService()

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
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
