export type ContactInquiryStatus = 'new' | 'contacted' | 'resolved' | 'archived';

export interface ContactInquiry {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  region: string;
  message: string;
  status: ContactInquiryStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInquiryInput {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  region?: string;
  message: string;
}

export interface ContactStats {
  total: number;
  newCount: number;
  contactedCount: number;
  resolvedCount: number;
  archivedCount: number;
}
