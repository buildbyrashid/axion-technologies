export function validateRequiredFields(data: any, requiredFields: string[]) {
  const missing: string[] = []
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      missing.push(field)
    }
  }
  
  return {
    isValid: missing.length === 0,
    missingFields: missing
  }
}

export function sanitizeInput(input: any) {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Basic XSS prevention
    .substring(0, 1000) // Prevent excessively long inputs
}
