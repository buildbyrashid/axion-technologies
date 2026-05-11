import { CategoryService } from '@/lib/services/CategoryService'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

const categoryService = new CategoryService()

export async function GET() {
  try {
    const categories = await categoryService.getAllCategories()
    
    return createSuccessResponse({ categories })
  } catch (error) {
    console.error('Categories API Error:', error)
    return handleAPIError(error, 'Failed to fetch categories')
  }
}
