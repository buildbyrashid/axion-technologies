import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { IFileRepository } from '../interfaces/IFileRepository'

export class SupabaseFileRepository extends IFileRepository {
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
