import React from 'react';
import { getTeamMembers } from '@/lib/people';
import { PeopleHierarchyClient } from '@/components/admin/people';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ leaderId?: string }>;
}

export default async function PeopleHierarchyPage({ searchParams }: PageProps) {
  const { leaderId } = await searchParams;

  const [leadersData, allMembersData] = await Promise.all([
    getTeamMembers({ isLeader: true, limit: 100 }),
    getTeamMembers({ limit: 100 }),
  ]);

  return (
    <div className="w-full flex-1 flex flex-col -m-4 sm:-m-6 lg:-m-8 p-3 sm:p-4 min-h-[calc(100vh-4rem)]">
      <PeopleHierarchyClient
        leaders={leadersData.items}
        allMembers={allMembersData.items}
        initialLeaderId={leaderId}
      />
    </div>
  );
}
