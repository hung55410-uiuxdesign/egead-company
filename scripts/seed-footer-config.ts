import { PrismaClient, Prisma } from '@prisma/client';
import {
  DEFAULT_FOOTER_CONFIG,
  FOOTER_SECTION_KEY,
} from '../lib/services/footer-config.service';

const prisma = new PrismaClient();

export async function seedFooterConfig() {
  console.log('🚀 Đang khởi tạo cấu hình Chân trang (Footer) vào database...');

  const footerData = DEFAULT_FOOTER_CONFIG as unknown as Prisma.InputJsonValue;

  const section = await prisma.homeSection.upsert({
    where: { key: FOOTER_SECTION_KEY },
    update: {}, // An toàn dữ liệu: không ghi đè nếu đã tồn tại
    create: {
      key: FOOTER_SECTION_KEY,
      name: 'Khối Chân trang & Thông tin liên kết (Footer)',
      title: 'Footer Configuration',
      subtitle: 'Cấu hình chân trang toàn website',
      description:
        'Quản lý logo, liên kết mạng xã hội, 3 cột menu điều hướng, form nhận bản tin, múi giờ thế giới và bản quyền chân trang.',
      data: footerData,
      isActive: true,
      order: 5,
    },
  });

  console.log(`✅ Đã nạp thành công cấu hình Footer (id: ${section.id}, key: ${section.key})!`);
  await prisma.$disconnect();
}

seedFooterConfig().catch(async (e) => {
  console.error('❌ Lỗi khi nạp footer section:', e);
  await prisma.$disconnect();
  process.exit(1);
});
