import React from 'react';
import { getAllContactInquiries } from '@/lib/contacts';
import { ContactInquiriesClient } from '@/components/admin/contacts';

export const dynamic = 'force-dynamic';

export default async function AdminContactsPage() {
  const inquiries = await getAllContactInquiries();

  return <ContactInquiriesClient initialInquiries={inquiries} />;
}
