import type { Metadata } from 'next';
import {
  PeopleClientView,
  type TeamMember,
  type LeaderTeamHierarchy,
} from '@/components/pages/company/people';
import { getTeamMembers, getAllHierarchies } from '@/lib/people';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our People | Meet the Team Behind (Y)our Success',
  description:
    'Meet the visionary leadership team and world-class digital commerce experts driving cross-border operations, sub-24h POD fulfillment, and scalable enterprise technology.',
  openGraph: {
    title: 'Our People | E-GEAD & Global Commerce Leadership',
    description:
      'Meet the leaders, architects, and specialists behind E-GEAD and our global digital commerce ecosystem.',
    images: ['/assets/logo/logo-color.png'],
  },
};

export default async function PeoplePage() {
  let people: TeamMember[] = [];
  let hierarchies: Record<string, LeaderTeamHierarchy> = {};

  try {
    const [dbPeople, dbHierarchies] = await Promise.all([
      getTeamMembers({ status: 'published', limit: 200 }),
      getAllHierarchies(),
    ]);

    if (dbPeople && dbPeople.items) {
      people = dbPeople.items.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        department: m.department as TeamMember['department'],
        location: m.location,
        quote: m.quote ?? undefined,
        image: m.image,
        linkedin: m.linkedin ?? undefined,
        bio: m.bio,
        skills: m.skills,
        isLeader: m.isLeader,
        order: m.order,
        status: m.status,
      }));
    }

    if (dbHierarchies) {
      hierarchies = dbHierarchies;
    }
  } catch (error) {
    console.error('Error fetching people and hierarchies data from database:', error);
  }

  return (
    <PeopleClientView
      initialPeople={people}
      initialHierarchies={hierarchies}
    />
  );
}
