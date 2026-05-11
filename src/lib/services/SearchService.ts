import { ProductService } from './ProductService'

export class SearchService {
  private productService: ProductService

  constructor(productService: ProductService = new ProductService()) {
    this.productService = productService
  }

  async search(query: string, options: any = {}) {
    return this.productService.searchProducts(query, options)
  }
}
