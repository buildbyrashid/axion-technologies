import { createInquiry } from '@/lib/db-helpers'
import { handleAPIError, createSuccessResponse } from '@/lib/utils/responseFormatter'

export async function POST(request: Request) {
  try {
    const quoteData = await request.json()

    // Symmetrical validation
    if (!quoteData.email) {
      return handleAPIError(new Error('Email is required'), 'Email is required', 400)
    }

    // Construct client name from email prefix
    const clientName = quoteData.email.split('@')[0] || 'B2B Client'
    const name = `Quote: ${clientName}`

    // Serialize specialized B2B metrics into the 'message' field as JSON
    const messagePayload = JSON.stringify({
      projectStatus: quoteData.projectStatus || '',
      width: quoteData.width || '',
      height: quoteData.height || '',
      uncertainSize: Boolean(quoteData.uncertainSize),
      installationMethod: quoteData.installationMethod || '',
      solutionType: quoteData.type || '',
      requirements: quoteData.message || '',
    })

    const result = await createInquiry({
      name: name,
      email: quoteData.email,
      phone: quoteData.phone || '',
      company: 'B2B Client',
      country: quoteData.country || '',
      message: messagePayload,
      source: 'quote_form',
    })

    return createSuccessResponse({ success: true, data: result }, 201)
  } catch (error: any) {
    console.error('Quote API Error:', error)
    return handleAPIError(error, 'Failed to submit quote request')
  }
}
