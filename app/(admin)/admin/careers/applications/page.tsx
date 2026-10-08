import React from 'react';
import { getAllApplications, getAllJobs } from '@/lib/careers';
import CareerApplicationsClient from '@/components/admin/CareerApplicationsClient';

export const dynamic = 'force-dynamic';

export default async function AdminCareerApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ jobId?: string }>;
}) {
  const { jobId } = await searchParams;
  const [applications, jobs] = await Promise.all([
    getAllApplications(),
    getAllJobs(),
  ]);

  return (
    <CareerApplicationsClient
      initialApplications={applications}
      jobs={jobs}
      initialSelectedJobId={jobId}
    />
  );
}
