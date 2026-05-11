export class IProductRepository {
  async getAllProducts(): Promise<any> { 
    throw new Error('getAllProducts method not implemented') 
  }
  
  async getProductById(id: string): Promise<any> { 
    throw new Error('getProductById method not implemented') 
  }
  
  async getProductBySlug(slug: string): Promise<any> { 
    throw new Error('getProductBySlug method not implemented') 
  }
  
  async getProductsByCategory(categorySlug: string): Promise<any> { 
    throw new Error('getProductsByCategory method not implemented') 
  }
  
  async createProduct(productData: any): Promise<any> { 
    throw new Error('createProduct method not implemented') 
  }
  
  async updateProduct(id: string, productData: any): Promise<any> { 
    throw new Error('updateProduct method not implemented') 
  }
  
  async deleteProduct(id: string): Promise<any> { 
    throw new Error('deleteProduct method not implemented') 
  }
  
  async searchProducts(query: string): Promise<any> { 
    throw new Error('searchProducts method not implemented') 
  }
}
