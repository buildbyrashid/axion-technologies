import { getSupabaseClient } from '../../supabase'
import { IFileRepository } from '../interfaces/IFileRepository'

export class SupabaseFileRepository extends IFileRepository {
  private get supabase() {
    return getSupabaseClient()
  }

  constructor() {
    super()
  }

  async uploadFile(file: any, path: string) {
    try {
      const { data, error } = await this.supabase.storage
        .from('files')
        .upload(path, file)
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseFileRepository.uploadFile:', error)
      return { success: false, error: error.message }
    }
  }

  async getFileUrl(path: string) {
    try {
      const { data } = this.supabase.storage
        .from('files')
        .getPublicUrl(path)
      
      return { success: true, data: data.publicUrl }
    } catch (error: any) {
      console.error('SupabaseFileRepository.getFileUrl:', error)
      return { success: false, error: error.message }
    }
  }

  async deleteFile(path: string) {
    try {
      const { data, error } = await this.supabase.storage
        .from('files')
        .remove([path])
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseFileRepository.deleteFile:', error)
      return { success: false, error: error.message }
    }
  }
}
