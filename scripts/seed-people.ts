import { prisma } from '../lib/prisma';
import { leadershipTeam, allExperts, TeamMember } from '../app/(public)/people/peopleData';
import { leaderHierarchies } from '../app/(public)/people/leaderTeamData';

async function seedPeople() {
  console.log('🌱 Bắt đầu seed dữ liệu Nhân sự & Sơ đồ Tổ chức vào PostgreSQL...');

  // 1. Seed Team Members (Leaders + Experts)
  const allMembers: Array<{ member: TeamMember; isLeader: boolean; order: number }> = [];

  leadershipTeam.forEach((member, index) => {
    allMembers.push({ member, isLeader: true, order: index + 1 });
  });

  allExperts.forEach((member, index) => {
    allMembers.push({ member, isLeader: false, order: index + 1 });
  });

  console.log(`📋 Tổng số nhân sự cần nạp: ${allMembers.length} (8 Lãnh đạo + 18 Chuyên gia)`);

  let memberCount = 0;
  for (const { member, isLeader, order } of allMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      create: {
        id: member.id,
        name: member.name,
        role: member.role,
        department: member.department,
        location: member.location,
        quote: member.quote ?? null,
        image: member.image,
        linkedin: member.linkedin ?? null,
        bio: member.bio,
        skills: member.skills || [],
        isLeader,
        order,
        status: 'published',
      },
      update: {
        name: member.name,
        role: member.role,
        department: member.department,
        location: member.location,
        quote: member.quote ?? null,
        image: member.image,
        linkedin: member.linkedin ?? null,
        bio: member.bio,
        skills: member.skills || [],
        isLeader,
        order,
        status: 'published',
      },
    });
    memberCount++;
  }
  console.log(`✅ Đã nạp thành công ${memberCount} nhân sự.`);

  // 2. Seed Leader Hierarchies
  const hierarchyEntries = Object.entries(leaderHierarchies);
  console.log(`🌳 Tổng số sơ đồ Lãnh đạo cần nạp: ${hierarchyEntries.length}`);

  let hierarchyCount = 0;
  for (const [leaderId, hierarchy] of hierarchyEntries) {
    await prisma.leaderHierarchy.upsert({
      where: { leaderId },
      create: {
        leaderId: hierarchy.leaderId,
        departmentScope: hierarchy.departmentScope,
        overview: hierarchy.overview,
        childNodes: hierarchy.childNodes as any,
      },
      update: {
        departmentScope: hierarchy.departmentScope,
        overview: hierarchy.overview,
        childNodes: hierarchy.childNodes as any,
      },
    });
    hierarchyCount++;
  }
  console.log(`✅ Đã nạp thành công ${hierarchyCount} sơ đồ Lãnh đạo & Squads.`);
  console.log('🎉 Hoàn tất quá trình seed People & Hierarchies!');
}

seedPeople()
  .catch((e) => {
    console.error('❌ Lỗi khi seed People:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
