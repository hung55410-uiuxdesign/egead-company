import React from 'react';
import { notFound } from 'next/navigation';
import { getJobById, getDepartments } from '@/lib/careers';
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

  return <CareerEditorClient initialJob={job} departments={departments} />;
}
