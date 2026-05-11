import { IProductRepository } from '../interfaces/IProductRepository'

export class NodeJSProductRepository extends IProductRepository {
  private apiUrl: string

  constructor(apiUrl: string) {
    super()
    this.apiUrl = apiUrl
  }

  async getAllProducts() {
    try {
      const response = await fetch(`${this.apiUrl}/products`)
      const data = await response.json()
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Other methods would be implemented similarly
}
