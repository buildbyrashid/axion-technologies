import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { IContactRepository } from '../interfaces/IContactRepository'

export class SupabaseContactRepository extends IContactRepository {
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

  async createInquiry(inquiryData: any) {
    try {
      const { data, error } = await this.supabase
        .from('contact_inquiries')
        .insert({
          ...inquiryData,
          status: 'new',
          created_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseContactRepository.createInquiry:', error)
      return { success: false, error: error.message }
    }
  }

  async getAllInquiries() {
    try {
      const { data, error } = await this.supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('SupabaseContactRepository.getAllInquiries:', error)
      return { success: false, error: error.message }
    }
  }
}
