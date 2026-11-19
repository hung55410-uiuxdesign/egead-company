import React from 'react';
import { notFound } from 'next/navigation';
import { getJobById, getDepartments, getJobSiblings } from '@/lib/careers';
import { CareerEditorClient } from '@/components/admin/careers';

export const dynamic = 'force-dynamic';

export default async function AdminEditCareerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [job, departments] = await Promise.all([
    getJobById(id),
    getDepartments(),
  ]);

  if (!job) {
    notFound();
  }

  const siblings = await getJobSiblings(job);

  return (
    <CareerEditorClient
      initialJob={job}
      departments={departments}
      siblings={siblings}
    />
  );
}
