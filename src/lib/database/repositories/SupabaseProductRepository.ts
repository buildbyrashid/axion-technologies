import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { IProductRepository } from '../interfaces/IProductRepository'

export class SupabaseProductRepository extends IProductRepository {
  private supabase: SupabaseClient

  constructor() {
    super()
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables')
    }

    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  async getAllProducts() {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug, tagline),
          subcategory:subcategories(id, name, slug)
        `)
        .order('sort_order', { ascending: true })
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseProductRepository.getAllProducts:', error)
      return { success: false, error: error.message }
    }
  }

  async getProductById(id: string) {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug, tagline),
          subcategory:subcategories(id, name, slug)
        `)
        .eq('id', id)
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseProductRepository.getProductById:', error)
      return { success: false, error: error.message }
    }
  }

  async getProductBySlug(slug: string) {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug, tagline),
          subcategory:subcategories(id, name, slug)
        `)
        .eq('slug', slug)
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseProductRepository.getProductBySlug:', error)
      return { success: false, error: error.message }
    }
  }

  async getProductsByCategory(categorySlug: string) {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`
          *,
          category:categories!inner(id, name, slug, tagline)
        `)
        .eq('category.slug', categorySlug)
        .order('sort_order', { ascending: true })
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseProductRepository.getProductsByCategory:', error)
      return { success: false, error: error.message }
    }
  }

  async createProduct(productData: any) {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .insert(productData)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseProductRepository.createProduct:', error)
      return { success: false, error: error.message }
    }
  }

  async updateProduct(id: string, productData: any) {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseProductRepository.updateProduct:', error)
      return { success: false, error: error.message }
    }
  }

  async deleteProduct(id: string) {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .delete()
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseProductRepository.deleteProduct:', error)
      return { success: false, error: error.message }
    }
  }

  async searchProducts(query: string) {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug, tagline)
        `)
        .or(`name.ilike.%${query}%,short_description.ilike.%${query}%,full_description.ilike.%${query}%`)
        .order('sort_order', { ascending: true })
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseProductRepository.searchProducts:', error)
      return { success: false, error: error.message }
    }
  }
}
