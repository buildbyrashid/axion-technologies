import { getSupabaseClient } from '@/lib/supabase'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function POST(request: Request) {
  try {
    const inquiryData = await request.json()
    const supabase = getSupabaseClient()
    
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          full_name: inquiryData.name || inquiryData.full_name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          company: inquiryData.company,
          country: inquiryData.country,
          subject: inquiryData.subject || 'General Inquiry',
          message: inquiryData.message,
          status: 'new'
        }
      ])
      .select()

    if (error) throw error
    
    return createSuccessResponse({ success: true, data }, 201)
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return handleAPIError(error, 'Failed to submit inquiry')
  }
}
