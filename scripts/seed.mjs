/**
 * Database Seed Script for E-GEAD Blog CMS & Better Auth
 * Run via: node scripts/seed.mjs
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { MYSQL_DDL_STATEMENTS } from '../lib/db/mysql-ddl.mjs';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'mysql://root@localhost:3306/egead',
    },
  },
});

const DEFAULT_ADMIN = {
  id: 'admin-egead-01',
  name: 'E-GEAD Administrator',
  email: 'admin@egead.com',
  role: 'admin',
};

async function ensureTables() {
  console.log('📦 Kiểm tra và tạo các bảng trong MySQL nếu chưa có...');
  for (const sql of MYSQL_DDL_STATEMENTS) {
    await prisma.$executeRawUnsafe(sql);
  }
  console.log('✅ Cấu trúc bảng MySQL đã sẵn sàng.');
}

async function main() {
  console.log('🚀 Bắt đầu khởi tạo cơ sở dữ liệu E-GEAD trên MySQL local...');
  await ensureTables();

  // 1. Kiểm tra hoặc tạo User Admin
  const existingUser = await prisma.user.findUnique({
    where: { email: DEFAULT_ADMIN.email },
    include: { accounts: true },
  });

  if (!existingUser || existingUser.accounts.length === 0) {
    console.log(`ℹ️ Tài khoản quản trị sẽ được tự động kích hoạt kèm mật khẩu qua Better Auth khi truy cập /admin/login.`);
  } else {
    console.log(`ℹ️ Tài khoản ${DEFAULT_ADMIN.email} đã sẵn sàng.`);
  }

  // 2. Seed danh sách bài viết từ data/blogs.json
  const blogsFilePath = path.join(process.cwd(), 'data', 'blogs.json');
  if (fs.existsSync(blogsFilePath)) {
    const rawData = fs.readFileSync(blogsFilePath, 'utf-8');
    const posts = JSON.parse(rawData);

    console.log(`📚 Đang nạp ${posts.length} bài viết mẫu vào database...`);
    for (const post of posts) {
      const contentStr = Array.isArray(post.content)
        ? post.content.map((p) => `<p>${p}</p>`).join('')
        : post.content || '';

      await prisma.post.upsert({
        where: { slug: post.slug },
        update: {},
        create: {
          id: post.id,
          slug: post.slug,
          title: post.title,
          subtitle: post.subtitle || null,
          tag: post.tag || 'General',
          categoryName: post.category || 'General',
          date: post.date,
          readTime: post.readTime || '5 mins read',
          heroImage: post.heroImage || '/assets/case_brother.jpg',
          excerpt: post.excerpt || '',
          content: contentStr,
          authorName: post.author?.name || 'E-GEAD Team',
          authorRole: post.author?.role || 'Editor',
          status: post.status || 'published',
          views: post.views || 0,
          featured: post.featured || false,
        },
      });
    }
    console.log('✅ Đã nạp danh sách bài viết thành công!');
  }

  // 3. Seed chuyên mục (Categories) từ bài viết và liên kết
  console.log('🏷️ Đang khởi tạo và liên kết các chuyên mục (categories)...');
  const allPosts = await prisma.post.findMany({
    select: { id: true, categoryName: true, tag: true },
  });
  const catNames = new Set();
  allPosts.forEach((p) => {
    if (p.categoryName) catNames.add(p.categoryName.trim());
    if (p.tag) catNames.add(p.tag.trim());
  });
  if (catNames.size === 0) {
    catNames.add('Technology');
    catNames.add('Market Expansion');
    catNames.add('Operations & SLA');
    catNames.add('Technology & WMS');
    catNames.add('Financial Strategy');
  }
  for (const name of catNames) {
    const slug = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    const cat = await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: {
        name,
        slug,
        description: `Chuyên mục kiến thức ${name} của E-GEAD`,
      },
    });
    await prisma.post.updateMany({
      where: {
        OR: [{ categoryName: name }, { tag: name }],
        categoryId: null,
      },
      data: {
        categoryId: cat.id,
        categoryName: cat.name,
      },
    });
  }
  console.log(`✅ Đã đồng bộ ${catNames.size} chuyên mục và liên kết với bài viết!`);

  console.log('\n🎉 Quá trình khởi tạo cơ sở dữ liệu hoàn tất!');
  console.log('🔑 Thông tin đăng nhập quản trị:');
  console.log(`   Email:    admin@egead.com`);
  console.log(`   Password: Admin@123456`);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi khởi tạo DB:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
