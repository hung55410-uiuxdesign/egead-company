import React from 'react';
import PeopleFormClient from '@/components/admin/PeopleFormClient';

export const dynamic = 'force-dynamic';

export default function NewPeoplePage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <PeopleFormClient mode="create" />
    </div>
  );
}
