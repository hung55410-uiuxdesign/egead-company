import React from 'react';
import { getDepartments } from '@/lib/careers';
import CareerEditorClient from '@/components/admin/CareerEditorClient';

export const dynamic = 'force-dynamic';

export default async function AdminNewCareerPage() {
  const departments = await getDepartments();

  return <CareerEditorClient departments={departments} />;
}
