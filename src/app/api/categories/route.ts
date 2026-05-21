import { getCategories } from '@/lib/db-helpers'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function GET() {
  try {
    const categories = await getCategories()
    return createSuccessResponse({ categories })
  } catch (error) {
    console.error('Categories API Error:', error)
    return handleAPIError(error, 'Failed to fetch categories')
  }
}
