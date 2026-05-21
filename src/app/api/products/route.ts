import { getProducts } from '@/lib/db-helpers'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const category = searchParams.get('category') || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const products = await getProducts({
      featured: featured || undefined,
      category,
      limit,
    })

    return createSuccessResponse({
      products,
      count: products.length,
    })
  } catch (error) {
    console.error('Products API Error:', error)
    return handleAPIError(error, 'Failed to fetch products')
  }
}
