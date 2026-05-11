import { getSupabaseClient } from '../../supabase'
import { ICategoryRepository } from '../interfaces/ICategoryRepository'

export class SupabaseCategoryRepository extends ICategoryRepository {
  private get supabase() {
    return getSupabaseClient()
  }

  constructor() {
    super()
  }

  async getAllCategories() {
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .select(`
          *,
          subcategories(id, name, slug, description)
        `)
        .order('sort_order', { ascending: true })
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseCategoryRepository.getAllCategories:', error)
      return { success: false, error: error.message }
    }
  }

  async getCategoryBySlug(slug: string) {
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .select(`
          *,
          subcategories(id, name, slug, description, sort_order)
        `)
        .eq('slug', slug)
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseCategoryRepository.getCategoryBySlug:', error)
      return { success: false, error: error.message }
    }
  }

  async createCategory(categoryData: any) {
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .insert(categoryData)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseCategoryRepository.createCategory:', error)
      return { success: false, error: error.message }
    }
  }
}
