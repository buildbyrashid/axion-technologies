import { getSupabaseClient } from '@/lib/supabase'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function POST(request: Request) {
  try {
    const inquiryData = await request.json()
    const supabase = getSupabaseClient()
    
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([
        {
          full_name: inquiryData.name,
          email: inquiryData.email,
          subject: inquiryData.subject || 'General Inquiry',
          message: inquiryData.message,
          company: inquiryData.company,
          phone: inquiryData.phone,
          metadata: {
            source: 'website_contact_form',
            timestamp: new Date().toISOString()
          }
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
