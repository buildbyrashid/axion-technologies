import { createInquiry } from '@/lib/db-helpers'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function POST(request: Request) {
  try {
    const inquiryData = await request.json()

    const result = await createInquiry({
      name: inquiryData.name || inquiryData.full_name,
      email: inquiryData.email,
      phone: inquiryData.phone,
      company: inquiryData.company,
      country: inquiryData.country,
      message: inquiryData.message,
      source: 'contact_form',
    })

    return createSuccessResponse({ success: true, data: result }, 201)
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return handleAPIError(error, 'Failed to submit inquiry')
  }
}
