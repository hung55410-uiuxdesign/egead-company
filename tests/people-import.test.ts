import { describe, test, expect, mock } from 'bun:test';

mock.module('@/lib/admin-auth', () => ({
  requireAdmin: async () => true,
}));

import { POST } from '../app/api/admin/people/import/route';
import { SAMPLE_PEOPLE_JSON } from '../components/admin/people/components/PeopleImportModal';
import { prisma } from '../lib/prisma';
import { getTeamMembers, getPeopleStats } from '../lib/services/people.service';

describe('People Bulk Import API Tests', () => {
  test('imports sample people correctly and returns imported items count', async () => {
    const initialStats = await getPeopleStats();

    // Prepare import payload with 2 sample members
    const testItems = [
      {
        name: 'Unit Test CEO ' + Date.now(),
        role: 'Chief Executive Officer',
        department: 'Executive Leadership',
        location: 'Singapore',
        quote: 'Leading innovation forward',
        image: '/assets/team/test-ceo.jpg',
        bio: 'Over 15 years executive leadership.',
        skills: ['Leadership', 'Strategy'],
        isLeader: true,
        order: 1,
        status: 'published',
      },
      {
        name: 'Unit Test Expert ' + Date.now(),
        role: 'Senior AI Engineer',
        department: 'Technology & AI',
        location: 'Tokyo, Japan',
        quote: 'Architecting intelligence',
        image: '/assets/team/test-ai.jpg',
        bio: 'Machine learning and deep tech specialist.',
        skills: ['Python', 'PyTorch', 'Next.js'],
        isLeader: false,
        order: 2,
        status: 'published',
      },
    ];

    const req = new Request('http://localhost:3000/api/admin/people/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: testItems,
        onDuplicate: 'create',
      }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.importedCount).toBe(2);
    expect(body.items.length).toBe(2);
    expect(body.items[0].name).toBe(testItems[0].name);

    // Verify in database
    const finalStats = await getPeopleStats();
    expect(finalStats.total).toBe(initialStats.total + 2);

    // Clean up created test items
    const createdIds = body.items.map((i: any) => i.id);
    await prisma.teamMember.deleteMany({
      where: { id: { in: createdIds } },
    });
  });

  test('validates duplicate strategy "skip" and "update"', async () => {
    const testName = 'Duplicate Test Member ' + Date.now();

    // 1. Create first
    const req1 = new Request('http://localhost:3000/api/admin/people/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          {
            name: testName,
            role: 'Initial Role',
            department: 'Commerce & Solutions',
            location: 'Hanoi',
            bio: 'Bio initial',
            skills: ['Commerce'],
            status: 'draft',
          },
        ],
        onDuplicate: 'create',
      }),
    });
    const res1 = await POST(req1 as any);
    const body1 = await res1.json();
    expect(body1.success).toBe(true);
    const memberId = body1.items[0].id;

    // 2. Import same name with onDuplicate: "update"
    const req2 = new Request('http://localhost:3000/api/admin/people/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          {
            name: testName,
            role: 'Updated Role',
            department: 'Commerce & Solutions',
            location: 'Hanoi',
            bio: 'Bio updated',
            skills: ['Commerce', 'Growth'],
            status: 'published',
          },
        ],
        onDuplicate: 'update',
      }),
    });
    const res2 = await POST(req2 as any);
    const body2 = await res2.json();
    expect(body2.success).toBe(true);
    expect(body2.importedCount).toBe(1);
    expect(body2.items[0].role).toBe('Updated Role');
    expect(body2.items[0].status).toBe('published');

    // 3. Clean up
    await prisma.teamMember.delete({ where: { id: memberId } });
  });
});
