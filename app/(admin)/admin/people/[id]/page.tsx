import React from 'react';
import { notFound } from 'next/navigation';
import { getTeamMember } from '@/lib/people';
import { PeopleFormClient } from '@/components/admin/people';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPeoplePage({ params }: PageProps) {
  const { id } = await params;
  const member = await getTeamMember(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <PeopleFormClient mode="edit" initialData={member} />
    </div>
  );
}
