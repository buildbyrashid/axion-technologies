export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  company: string;
  phone?: string | null;
  productInterest?: string;
  message: string;
  source?: string;
  status?: 'new' | 'read' | 'replied' | 'closed';
  createdAt?: string;
}
