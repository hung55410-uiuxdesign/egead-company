import React from 'react';
import { getAllJobs } from '@/lib/careers';
import CareerFormPreviewClient from '@/components/admin/CareerFormPreviewClient';

export const dynamic = 'force-dynamic';

export default async function AdminCareerFormPreviewPage() {
  const jobs = await getAllJobs();

  return <CareerFormPreviewClient jobs={jobs} />;
}
