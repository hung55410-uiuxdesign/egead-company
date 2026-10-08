import { describe, test, expect } from 'bun:test';
import {
  teamMemberInputSchema,
  teamMemberUpdateSchema,
  hierarchyInputSchema,
  childNodesSchema,
  DEPARTMENTS,
} from '../lib/validations/people';
import { leadershipTeam, allExperts } from '../app/(public)/people/peopleData';
import { leaderHierarchies } from '../app/(public)/people/leaderTeamData';
import {
  getTeamMembers,
  getTeamMember,
  getPeopleStats,
  getHierarchy,
  getAllHierarchies,
} from '../lib/services/people.service';

describe('People Validation & Consistency Tests', () => {
  describe('TeamMember Zod Validation Schema', () => {
    test('validates correct team member payload successfully', () => {
      const validMember = {
        name: 'Nguyễn Văn A',
        role: 'Senior Frontend Architect',
        department: DEPARTMENTS[1], // 'Technology & AI'
        location: 'Ho Chi Minh City, Vietnam',
        quote: 'Excellence in every line of code',
        image: 'https://example.com/avatar.jpg',
        linkedin: 'https://linkedin.com/in/nguyenvana',
        bio: 'Over 10 years building high-traffic enterprise applications.',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        isLeader: false,
        order: 1,
        status: 'published' as const,
      };

      const result = teamMemberInputSchema.safeParse(validMember);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Nguyễn Văn A');
        expect(result.data.skills.length).toBe(4);
      }
    });

    test('rejects payload with empty name', () => {
      const invalid = {
        name: '',
        role: 'Developer',
        department: DEPARTMENTS[0],
        location: 'Hanoi',
        image: 'https://example.com/avatar.jpg',
        bio: 'Bio text',
      };

      const result = teamMemberInputSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes('name'))).toBe(true);
      }
    });

    test('rejects payload with invalid department enum', () => {
      const invalid = {
        name: 'John Doe',
        role: 'Developer',
        department: 'Invalid Department Non-Existent',
        location: 'Singapore',
        image: 'https://example.com/avatar.jpg',
        bio: 'Bio text',
      };

      const result = teamMemberInputSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes('department'))).toBe(true);
      }
    });

    test('validates partial update schema', () => {
      const partialUpdate = {
        role: 'Chief Technology Officer',
        order: 5,
      };

      const result = teamMemberUpdateSchema.safeParse(partialUpdate);
      expect(result.success).toBe(true);
    });
  });

  describe('Leader Hierarchy & ChildNodes Schema Validation', () => {
    test('validates all 8 seed leader hierarchies against childNodesSchema without error', () => {
      const hierarchyEntries = Object.entries(leaderHierarchies);
      expect(hierarchyEntries.length).toBe(8);

      for (const [leaderId, hierarchy] of hierarchyEntries) {
        const result = hierarchyInputSchema.safeParse(hierarchy);
        expect(result.success).toBe(true);
        if (!result.success) {
          console.error(`Validation failed for leader ${leaderId}:`, result.error.issues);
        }
      }
    });

    test('rejects hierarchy with missing overview or empty childNodes squadName', () => {
      const invalidHierarchy = {
        leaderId: 'lead-1',
        departmentScope: 'Scope',
        overview: '', // empty overview
        childNodes: [
          {
            id: 'exp-1',
            name: 'Name',
            role: 'Role',
            department: 'Technology & AI',
            location: 'Location',
            image: '/avatar.jpg',
            skills: [],
            responsibility: '',
            squadName: '', // empty squadName
            squadFocus: '',
            levelTag: 'Lead',
            children: [],
          },
        ],
      };

      const result = hierarchyInputSchema.safeParse(invalidHierarchy);
      expect(result.success).toBe(false);
    });
  });

  describe('Seed Data Consistency Checks', () => {
    test('all 8 leaders have IDs starting with lead-', () => {
      expect(leadershipTeam.length).toBe(8);
      for (const leader of leadershipTeam) {
        expect(leader.id.startsWith('lead-')).toBe(true);
        expect(leader.name).toBeTruthy();
        expect(leader.role).toBeTruthy();
        expect(leader.department).toBe('Executive Leadership');
      }
    });

    test('all 18 experts have IDs starting with exp-', () => {
      expect(allExperts.length).toBe(18);
      for (const expert of allExperts) {
        expect(expert.id.startsWith('exp-')).toBe(true);
        expect(expert.name).toBeTruthy();
        expect(expert.role).toBeTruthy();
      }
    });

    test('all member IDs referenced in leader hierarchies exist in leadershipTeam or allExperts', () => {
      const allKnownIds = new Set([
        ...leadershipTeam.map((l) => l.id),
        ...allExperts.map((e) => e.id),
      ]);

      expect(allKnownIds.size).toBe(26);

      for (const [leaderId, hierarchy] of Object.entries(leaderHierarchies)) {
        expect(allKnownIds.has(leaderId)).toBe(true);

        for (const squad of hierarchy.childNodes) {
          expect(allKnownIds.has(squad.id)).toBe(true);

          for (const sub of squad.children) {
            expect(allKnownIds.has(sub.id)).toBe(true);
          }
        }
      }
    });
  });

  describe('People Service Database Queries', () => {
    test('getTeamMembers returns seeded members from PostgreSQL', async () => {
      const res = await getTeamMembers({ limit: 100 });
      expect(res.total).toBeGreaterThanOrEqual(26);
      expect(res.items.length).toBeGreaterThanOrEqual(26);

      const leader1 = res.items.find((m) => m.id === 'lead-1');
      expect(leader1).toBeDefined();
      expect(leader1?.isLeader).toBe(true);
      expect(leader1?.name).toBe('Suhas Hiwale');
    });

    test('getPeopleStats returns accurate counts', async () => {
      const stats = await getPeopleStats();
      expect(stats.total).toBeGreaterThanOrEqual(26);
      expect(stats.leaders).toBeGreaterThanOrEqual(8);
      expect(stats.experts).toBeGreaterThanOrEqual(18);
      expect(stats.published).toBeGreaterThanOrEqual(26);
    });

    test('getHierarchy returns squad tree for lead-1', async () => {
      const hierarchy = await getHierarchy('lead-1');
      expect(hierarchy).not.toBeNull();
      expect(hierarchy?.leaderId).toBe('lead-1');
      expect(Array.isArray(hierarchy?.childNodes)).toBe(true);
      expect(hierarchy?.childNodes.length).toBeGreaterThan(0);
    });

    test('getAllHierarchies returns map of leader hierarchies', async () => {
      const all = await getAllHierarchies();
      expect(Object.keys(all).length).toBeGreaterThanOrEqual(8);
      expect(all['lead-1']).toBeDefined();
      expect(all['lead-8']).toBeDefined();
    });
  });
});
