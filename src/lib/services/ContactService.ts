import { SupabaseContactRepository } from '../database/repositories/SupabaseContactRepository'
import { IContactRepository } from '../database/interfaces/IContactRepository'

export class ContactService {
  private contactRepository: IContactRepository

  constructor(contactRepository: IContactRepository = new SupabaseContactRepository()) {
    this.contactRepository = contactRepository
  }

  async submitInquiry(inquiryData: any) {
    try {
      // Validate inquiry data
      const validation = this.validateInquiryData(inquiryData)
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
      }

      // Clean and prepare data
      const cleanData = {
        name: inquiryData.name.trim(),
        email: inquiryData.email.trim().toLowerCase(),
        company: inquiryData.company.trim(),
        phone: inquiryData.phone?.trim() || null,
        productInterest: inquiryData.productInterest || 'general',
        message: inquiryData.message.trim(),
        source: inquiryData.source || 'website'
      }

      const result = await this.contactRepository.createInquiry(cleanData)
      
      if (!result.success) {
        throw new Error(`Failed to submit inquiry: ${result.error}`)
      }

      return {
        success: true,
        inquiryId: result.data.id,
        message: 'Inquiry submitted successfully'
      }
    } catch (error) {
      console.error('ContactService.submitInquiry:', error)
      throw error
    }
  }

  private validateInquiryData(data: any) {
    const errors: string[] = []
    
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long')
    }
    
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email address is required')
    }
    
    if (!data.company || data.company.trim().length < 2) {
      errors.push('Company name is required')
    }
    
    if (!data.message || data.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long')
    }
    
    if (data.phone && !this.isValidPhone(data.phone)) {
      errors.push('Invalid phone number format')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  private isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private isValidPhone(phone: string) {
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }
}
