/**
 * Seed Script: Populate Strategic Partners into Database
 * Run via: bun scripts/seed-partners.ts
 */
import { PrismaClient, Prisma } from '@prisma/client';
import {
  TIKTOK_SHOP_PARTNER_DATA,
  SHOPIFY_ECOMMERCE_PARTNER_DATA,
  ETSY_EBAY_PARTNER_DATA,
  GOOGLE_ADS_SHOPPING_PARTNER_DATA,
  SAP_PARTNER_DATA,
  SHOPIFY_PLUS_PARTNER_DATA,
  SITECORE_PARTNER_DATA,
  STRIPE_PARTNER_DATA,
} from '../components/pages/services/partners/data/partner-details.data';

const prisma = new PrismaClient();

const PARTNERS_TO_SEED = [
  TIKTOK_SHOP_PARTNER_DATA,
  SHOPIFY_ECOMMERCE_PARTNER_DATA,
  ETSY_EBAY_PARTNER_DATA,
  GOOGLE_ADS_SHOPPING_PARTNER_DATA,
  SAP_PARTNER_DATA,
  SHOPIFY_PLUS_PARTNER_DATA,
  SITECORE_PARTNER_DATA,
  STRIPE_PARTNER_DATA,
];

async function seedPartners() {
  console.log('🚀 Bắt đầu nạp dữ liệu Strategic Partners vào PostgreSQL...');

  let count = 0;

  for (const partner of PARTNERS_TO_SEED) {
    const slug = partner.slug;

    await prisma.partnerItem.upsert({
      where: { slug },
      update: {}, // An toàn dữ liệu tuyệt đối: Không ghi đè nếu bản ghi đã tồn tại trong DB per AGENTS.md
      create: {
        slug,
        name: partner.name,
        badge: partner.hero.badge || null,
        headline: partner.hero.headline || null,
        description: partner.hero.description || null,
        bannerImage: partner.hero.bannerImage || null,
        bannerFallback: partner.hero.bannerFallback || null,
        ctaText: partner.hero.ctaText || 'Schedule demo',
        ctaHref: partner.hero.ctaHref || '/contact-us',

        advantagesSubtitle: partner.advantages.subtitle || 'E-GEAD advantages',
        advantagesHeadline: partner.advantages.headline || null,
        advantagesItems: (partner.advantages.items || []) as unknown as Prisma.InputJsonValue,

        expertiseSubtitle: partner.expertise.subtitle || 'Our expertise',
        expertiseHeadline: partner.expertise.headline || 'We are fluent in',
        expertiseItems: (partner.expertise.items || []) as unknown as Prisma.InputJsonValue,

        whyTitlePrefix: partner.why.titlePrefix || `Why ${partner.name}`,
        whyHeadline: partner.why.headline || null,
        whyDescription: partner.why.description || null,
        whyItems: (partner.why.items || []) as unknown as Prisma.InputJsonValue,

        casesSubtitle: partner.caseStudies.subtitle || 'Proven outcomes',
        casesHeadline: partner.caseStudies.headline || 'Read our cases',
        casesItems: (partner.caseStudies.items || []) as unknown as Prisma.InputJsonValue,

        ctaHeadingPart1: partner.cta.headingPart1 || 'Unleash your ',
        ctaHighlight: partner.cta.headingHighlight || 'growth potential',
        ctaHeadingPart2: partner.cta.headingPart2 || ` with ${partner.name} now.`,
        ctaDescription: partner.cta.description || null,
        ctaButtonText: partner.cta.buttonText || "Let's talk",
        ctaButtonHref: partner.cta.buttonHref || '/contact-us',

        metaTitle: partner.metaTitle || null,
        metaDescription: partner.metaDescription || null,

        order: count,
        status: 'published',
      },
    });

    console.log(`✅ [${count + 1}/${PARTNERS_TO_SEED.length}] Nạp thành công đối tác: ${partner.name} (${slug})`);
    count++;
  }

  console.log(`🎉 Hoàn tất nạp ${count} đối tác chiến lược vào cơ sở dữ liệu!`);
  await prisma.$disconnect();
}

seedPartners().catch(async (e) => {
  console.error('❌ Lỗi khi nạp dữ liệu partners:', e);
  await prisma.$disconnect();
  process.exit(1);
});
