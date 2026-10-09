import React from 'react';
import { getAllJobs, getCareerStats, getDepartments } from '@/lib/careers';
import { CareerListClient } from '@/components/admin/careers';

export const dynamic = 'force-dynamic';

export default async function AdminCareersPage() {
  const [jobs, stats, departments] = await Promise.all([
    getAllJobs(),
    getCareerStats(),
    getDepartments(),
  ]);

  return (
    <CareerListClient
      initialJobs={jobs}
      stats={stats}
      departments={departments}
    />
  );
}
