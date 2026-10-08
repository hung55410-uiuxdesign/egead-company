import type { Metadata } from 'next';
import {
  PeopleClientView,
  leadershipTeam,
  allExperts,
  leaderHierarchies,
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
    images: ['https://egeadcompany.com/images/egead/logo.png'],
  },
};

export default async function PeoplePage() {
  let people: TeamMember[] = leadershipTeam.concat(allExperts);
  let hierarchies: Record<string, LeaderTeamHierarchy> = leaderHierarchies;

  try {
    const dbPeople = await getTeamMembers({ status: 'published', limit: 100 });
    if (dbPeople && dbPeople.items && dbPeople.items.length > 0) {
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
      }));

      const dbHierarchies = await getAllHierarchies();
      if (dbHierarchies && Object.keys(dbHierarchies).length > 0) {
        hierarchies = dbHierarchies;
      }
    }
  } catch (error) {
    console.error('Error fetching dynamic people data, using fallback:', error);
  }

  return (
    <PeopleClientView
      initialPeople={people}
      initialHierarchies={hierarchies}
    />
  );
}
