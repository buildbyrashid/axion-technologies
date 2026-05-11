export class IContactRepository {
  async createInquiry(inquiryData: any): Promise<any> { 
    throw new Error('createInquiry method not implemented') 
  }
  
  async getAllInquiries(): Promise<any> { 
    throw new Error('getAllInquiries method not implemented') 
  }
  
  async getInquiryById(id: string): Promise<any> { 
    throw new Error('getInquiryById method not implemented') 
  }
  
  async updateInquiryStatus(id: string, status: string): Promise<any> { 
    throw new Error('updateInquiryStatus method not implemented') 
  }
}
