/**
 * Seed Script: Populate Services and Industries into Database
 * Run via: bun scripts/seed-services.ts
 */
import { PrismaClient, Prisma } from '@prisma/client';
import { SERVICES_DATA } from '../data/services-data';

const prisma = new PrismaClient();

async function seedServices() {
  console.log('🚀 Bắt đầu nạp dữ liệu Services & Industries vào PostgreSQL...');

  const entries = Object.entries(SERVICES_DATA);
  let count = 0;

  for (const [key, item] of entries) {
    const slug = item.slug || key;
    const principlesJson = (item.principles ?? []) as unknown as Prisma.InputJsonValue;

    await prisma.serviceItem.upsert({
      where: { slug },
      update: {}, // An toàn dữ liệu: Không ghi đè nếu bản ghi đã tồn tại trong DB
      create: {
        slug,
        category: item.category || 'service',
        title: item.title,
        tagline: item.tagline || '',
        subtitle: item.subtitle || '',
        heroImage: item.heroImage || null,
        middleImage: item.middleImage || null,
        overviewSubTitle: item.overviewSubTitle || null,
        overviewHeading: item.overviewHeading || null,
        overviewParagraphs: item.overviewParagraphs || [],
        approachHeading: item.approachHeading || 'Our approach',
        approachIntro: item.approachIntro || null,
        principles: principlesJson,
        order: count,
        status: 'published',
      },
    });

    console.log(`✅ [${count + 1}/${entries.length}] Nạp thành công: ${item.title} (${slug}) - ${item.category}`);
    count++;
  }

  console.log(`🎉 Hoàn tất nạp ${count} dịch vụ & ngành nghề vào cơ sở dữ liệu!`);
  await prisma.$disconnect();
}

seedServices().catch(async (e) => {
  console.error('❌ Lỗi khi nạp dữ liệu:', e);
  await prisma.$disconnect();
  process.exit(1);
});
