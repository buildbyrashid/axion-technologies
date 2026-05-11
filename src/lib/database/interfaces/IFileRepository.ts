export class IFileRepository {
  async uploadFile(file: any, path: string): Promise<any> { 
    throw new Error('uploadFile method not implemented') 
  }
  
  async getFileUrl(path: string): Promise<any> { 
    throw new Error('getFileUrl method not implemented') 
  }
  
  async deleteFile(path: string): Promise<any> { 
    throw new Error('deleteFile method not implemented') 
  }
}
