import { ProductService } from '@/lib/services/ProductService'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

const productService = new ProductService()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const options = {
      featured: searchParams.get('featured') === 'true',
      category: searchParams.get('category'),
      limit: limitParam ? parseInt(limitParam) : undefined
    }

    const products = await productService.getAllProducts(options)
    
    return createSuccessResponse({
      products,
      count: products.length
    })
  } catch (error) {
    console.error('Products API Error:', error)
    return handleAPIError(error, 'Failed to fetch products')
  }
}
