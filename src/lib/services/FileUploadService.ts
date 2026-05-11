import { SupabaseFileRepository } from '../database/repositories/SupabaseFileRepository'
import { IFileRepository } from '../database/interfaces/IFileRepository'

export class FileUploadService {
  private fileRepository: IFileRepository

  constructor(fileRepository: IFileRepository = new SupabaseFileRepository()) {
    this.fileRepository = fileRepository
  }

  async uploadProductImage(file: any, productName: string) {
    const timestamp = Date.now()
    const fileName = `${productName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`
    const path = `products/${fileName}`

    try {
      const result = await this.fileRepository.uploadFile(file, path)
      if (!result.success) throw new Error(result.error)

      const urlResult = await this.fileRepository.getFileUrl(path)
      if (!urlResult.success) throw new Error(urlResult.error)

      return {
        success: true,
        url: urlResult.data,
        path: path
      }
    } catch (error: any) {
      console.error('FileUploadService.uploadProductImage:', error)
      throw error
    }
  }
}
