import { SupabaseCategoryRepository } from '../database/repositories/SupabaseCategoryRepository'
import { ICategoryRepository } from '../database/interfaces/ICategoryRepository'

export class CategoryService {
  private categoryRepository: ICategoryRepository

  constructor(categoryRepository: ICategoryRepository = new SupabaseCategoryRepository()) {
    this.categoryRepository = categoryRepository
  }

  async getAllCategories() {
    try {
      const result = await this.categoryRepository.getAllCategories()
      
      if (!result.success) {
        throw new Error(`Failed to fetch categories: ${result.error}`)
      }

      return result.data.map(this.transformCategoryForAPI)
    } catch (error) {
      console.error('CategoryService.getAllCategories:', error)
      throw error
    }
  }

  async getCategoryBySlug(slug: string) {
    try {
      const result = await this.categoryRepository.getCategoryBySlug(slug)
      
      if (!result.success) {
        throw new Error(`Category not found: ${result.error}`)
      }

      return this.transformCategoryDetailsForAPI(result.data)
    } catch (error) {
      console.error('CategoryService.getCategoryBySlug:', error)
      throw error
    }
  }

  private transformCategoryForAPI(category: any) {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      tagline: category.tagline,
      description: category.description,
      imageUrl: category.image_url,
      sortOrder: category.sort_order || 0
    }
  }

  private transformCategoryDetailsForAPI(category: any) {
    return {
      ...this.transformCategoryForAPI(category),
      subcategories: (category.subcategories || []).map((sub: any) => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        description: sub.description,
        sortOrder: sub.sort_order || 0
      }))
    }
  }
}
