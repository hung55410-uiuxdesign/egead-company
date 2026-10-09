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
    <div className="w-full h-full flex flex-col">
      <PeopleHierarchyClient
        leaders={leadersData.items}
        allMembers={allMembersData.items}
        initialLeaderId={leaderId}
      />
    </div>
  );
}
