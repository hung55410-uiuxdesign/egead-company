import { getTeamMembers, getPeopleStats } from '@/lib/people';
import { PeopleListClient } from '@/components/admin/people';

export const dynamic = 'force-dynamic';

export default async function AdminPeoplePage() {
  const [data, stats] = await Promise.all([
    getTeamMembers({ page: 1, limit: 100 }),
    getPeopleStats(),
  ]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <PeopleListClient
        initialMembers={data.items}
        initialStats={stats}
      />
    </div>
  );
}
