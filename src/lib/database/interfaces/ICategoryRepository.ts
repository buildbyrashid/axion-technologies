export class ICategoryRepository {
  async getAllCategories(): Promise<any> { 
    throw new Error('getAllCategories method not implemented') 
  }
  
  async getCategoryById(id: string): Promise<any> { 
    throw new Error('getCategoryById method not implemented') 
  }
  
  async getCategoryBySlug(slug: string): Promise<any> { 
    throw new Error('getCategoryBySlug method not implemented') 
  }
  
  async createCategory(categoryData: any): Promise<any> { 
    throw new Error('createCategory method not implemented') 
  }
  
  async updateCategory(id: string, categoryData: any): Promise<any> { 
    throw new Error('updateCategory method not implemented') 
  }
  
  async deleteCategory(id: string): Promise<any> { 
    throw new Error('deleteCategory method not implemented') 
  }
}
