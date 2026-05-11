import { ContactService } from '@/lib/services/ContactService'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

const contactService = new ContactService()

export async function POST(request: Request) {
  try {
    const inquiryData = await request.json()
    const result = await contactService.submitInquiry(inquiryData)
    
    return createSuccessResponse(result, 201)
  } catch (error: any) {
    console.error('Contact API Error:', error)
    
    if (error.message.includes('Validation failed')) {
      return handleAPIError(error, 'Invalid request data', 400)
    }
    
    return handleAPIError(error, 'Failed to submit inquiry')
  }
}
