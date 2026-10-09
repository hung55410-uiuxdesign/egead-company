/**
 * E-GEAD Contact & Inquiry Module
 * Re-exports the Contact Service and types
 */
export * from '@/lib/services/contact.service';
export type {
  ContactInquiry,
  ContactInquiryInput,
  ContactInquiryStatus,
  ContactStats,
} from '@/types/contact';
