/**
 * Seed Script: Populate Case Studies / Our Work into Database
 * Run via: bun scripts/seed-casestudies.ts
 */
import { PrismaClient, Prisma } from '@prisma/client';
import { CASE_STUDIES } from '../components/pages/work/our-work/data/case-studies.data';
import { CASE_STUDIES_DETAILS } from '../lib/case-studies-data';

const prisma = new PrismaClient();

async function seedCaseStudies() {
  console.log('🚀 Bắt đầu nạp dữ liệu Case Studies / Our Work vào PostgreSQL...');

  let count = 0;
  for (const item of CASE_STUDIES) {
    const slug = item.slug || item.id;
    const detail = CASE_STUDIES_DETAILS[slug];

    await prisma.caseStudy.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: item.title,
        customer: item.customer,
        description: item.description,
        image: item.image,
        services: item.services,
        industries: item.industries,
        tags: item.tags,
        highlight: item.highlight || null,
        order: item.order ?? count,
        status: 'published',

        // Detail Fields
        bannerImage: detail?.bannerImage || item.image,
        bannerVideo: detail?.bannerVideo || null,

        // Section 1: Overview
        overviewSubtitle: detail?.overview?.subtitle || 'OVERVIEW',
        overviewTitle: detail?.overview?.title || item.title,
        overviewDescription: detail?.overview?.description || item.description,
        overviewImage: detail?.overview?.image || item.image,

        // Section 2: Challenge & Solution
        challengeTitle:
          detail?.challengeSolution?.challengeTitle ||
          'Thách thức trong quản trị và mở rộng quy mô đa kênh quốc tế.',
        challengeContent:
          detail?.challengeSolution?.challengeContent ||
          item.description,
        solutionTitle:
          detail?.challengeSolution?.solutionTitle ||
          'Triển khai kiến trúc tự động hóa kết nối vận hành thời gian thực.',
        solutionContent:
          detail?.challengeSolution?.solutionContent ||
          'Đồng bộ chuỗi cung ứng, chuẩn hóa quy trình fulfilment và kiểm soát biên lợi nhuận ròng.',

        // Section 3: Task & Implementation
        taskSubtitle: detail?.task?.subtitle || 'TASK',
        taskTitle:
          detail?.task?.title ||
          'Tối ưu hóa năng lực vận hành và thực thi chiến lược.',
        taskImages: detail?.task?.images || [item.image],
        taskItems: (detail?.task?.taskItems || [
          {
            taskTitle: 'Tích hợp hệ thống và tự động hóa quy trình đơn hàng.',
            description:
              'Liên kết đa nền tảng thương mại điện tử, tự động hóa routing đơn hàng.',
          },
          {
            taskTitle: 'Đảm bảo SLA giao hàng dưới 24h và kiểm soát chi phí.',
            description:
              'Phun hàng trực tiếp vào mạng lưới vận chuyển và bảo toàn huy hiệu gian hàng.',
          },
        ]) as unknown as Prisma.InputJsonValue,

        // Section 4: Next Case Study
        nextStudySlug: detail?.nextCaseStudy?.slug || null,
        nextStudyTitle: detail?.nextCaseStudy?.title || null,
        nextStudyCustomer: detail?.nextCaseStudy?.customer || null,
      },
    });

    count++;
    console.log(`✅ [${count}/${CASE_STUDIES.length}] Đã nạp: ${item.customer}`);
  }

  console.log(`🎉 Nạp thành công ${count} dự án Case Studies vào cơ sở dữ liệu!`);
}

seedCaseStudies()
  .catch((e) => {
    console.error('❌ Lỗi khi seed Case Studies:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
