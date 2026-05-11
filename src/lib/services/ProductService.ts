import { SupabaseProductRepository } from '../database/repositories/SupabaseProductRepository'
import { IProductRepository } from '../database/interfaces/IProductRepository'

export class ProductService {
  private productRepository: IProductRepository

  constructor(productRepository: IProductRepository = new SupabaseProductRepository()) {
    this.productRepository = productRepository
  }

  async getAllProducts(options: any = {}) {
    const { featured, category, limit } = options
    
    try {
      const result = await this.productRepository.getAllProducts()
      
      if (!result.success) {
        throw new Error(`Failed to fetch products: ${result.error}`)
      }

      let products = result.data

      // Apply business logic filters
      if (featured === true) {
        products = products.filter((product: any) => product.is_featured)
      }

      if (category) {
        products = products.filter((product: any) => product.category?.slug === category)
      }

      if (limit && limit > 0) {
        products = products.slice(0, limit)
      }

      // Transform data for frontend consumption
      return products.map(this.transformProductForAPI)
    } catch (error) {
      console.error('ProductService.getAllProducts:', error)
      throw error
    }
  }

  async getProductBySlug(slug: string) {
    try {
      const result = await this.productRepository.getProductBySlug(slug)
      
      if (!result.success) {
        throw new Error(`Product not found: ${result.error}`)
      }

      return this.transformProductDetailsForAPI(result.data)
    } catch (error) {
      console.error('ProductService.getProductBySlug:', error)
      throw error
    }
  }

  async getProductsByCategory(categorySlug: string) {
    try {
      const result = await this.productRepository.getProductsByCategory(categorySlug)
      
      if (!result.success) {
        throw new Error(`Failed to fetch products for category: ${result.error}`)
      }

      return result.data.map(this.transformProductForAPI)
    } catch (error) {
      console.error('ProductService.getProductsByCategory:', error)
      throw error
    }
  }

  async searchProducts(query: string, options: any = {}) {
    if (!query || query.trim().length < 2) {
      throw new Error('Search query must be at least 2 characters long')
    }

    try {
      const result = await this.productRepository.searchProducts(query.trim())
      
      if (!result.success) {
        throw new Error(`Search failed: ${result.error}`)
      }

      let products = result.data

      // Apply additional filters
      if (options.category) {
        products = products.filter((product: any) => product.category?.slug === options.category)
      }

      return {
        query: query.trim(),
        totalResults: products.length,
        products: products.map(this.transformProductForAPI)
      }
    } catch (error) {
      console.error('ProductService.searchProducts:', error)
      throw error
    }
  }

  // Data transformation methods
  private transformProductForAPI(product: any) {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      shortDescription: product.short_description,
      category: product.category ? {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
        tagline: product.category.tagline
      } : null,
      subcategory: product.subcategory ? {
        id: product.subcategory.id,
        name: product.subcategory.name,
        slug: product.subcategory.slug
      } : null,
      images: product.images || [],
      isFeatured: product.is_featured || false,
      sortOrder: product.sort_order || 0
    }
  }

  private transformProductDetailsForAPI(product: any) {
    return {
      ...this.transformProductForAPI(product),
      fullDescription: product.full_description,
      keyFeatures: product.key_features || [],
      specifications: product.specifications || {},
      accessories: product.accessories || {},
      downloads: {
        datasheet: product.datasheet_url,
        manual: product.manual_url,
        technicalDrawing: product.technical_drawing_url,
        installationGuide: product.installation_guide_url,
        certification: product.certification_url,
        brochure: product.brochure_url
      },
      createdAt: product.created_at,
      updatedAt: product.updated_at
    }
  }
}
