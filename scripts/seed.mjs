/**
 * Database Seed Script for E-GEAD Blog CMS & Better Auth
 * Run via: node scripts/seed.mjs
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://nguyenhung@localhost:5432/postgres',
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
  console.log('📦 Kiểm tra và tạo các bảng trong PostgreSQL nếu chưa có...');
  const ddlStatements = [
    `CREATE TABLE IF NOT EXISTS "user" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT UNIQUE NOT NULL,
      "emailVerified" BOOLEAN NOT NULL DEFAULT false,
      "image" TEXT,
      "role" TEXT DEFAULT 'admin',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS "session" (
      "id" TEXT PRIMARY KEY,
      "expiresAt" TIMESTAMP(3) NOT NULL,
      "token" TEXT UNIQUE NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "ipAddress" TEXT,
      "userAgent" TEXT,
      "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS "account" (
      "id" TEXT PRIMARY KEY,
      "accountId" TEXT NOT NULL,
      "providerId" TEXT NOT NULL,
      "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "accessToken" TEXT,
      "refreshToken" TEXT,
      "idToken" TEXT,
      "accessTokenExpiresAt" TIMESTAMP(3),
      "refreshTokenExpiresAt" TIMESTAMP(3),
      "scope" TEXT,
      "password" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE ("providerId", "accountId")
    );`,
    `CREATE TABLE IF NOT EXISTS "verification" (
      "id" TEXT PRIMARY KEY,
      "identifier" TEXT NOT NULL,
      "value" TEXT NOT NULL,
      "expiresAt" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS "category" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT UNIQUE NOT NULL,
      "slug" TEXT UNIQUE NOT NULL,
      "description" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS "post" (
      "id" TEXT PRIMARY KEY,
      "slug" TEXT UNIQUE NOT NULL,
      "title" TEXT NOT NULL,
      "subtitle" TEXT,
      "tag" TEXT NOT NULL DEFAULT 'General',
      "categoryName" TEXT NOT NULL DEFAULT 'E-Commerce',
      "categoryId" TEXT REFERENCES "category"("id") ON DELETE SET NULL,
      "date" TEXT NOT NULL,
      "readTime" TEXT NOT NULL DEFAULT '5 mins read',
      "heroImage" TEXT NOT NULL DEFAULT '/assets/case_brother.jpg',
      "excerpt" TEXT NOT NULL,
      "content" TEXT NOT NULL,
      "authorName" TEXT NOT NULL DEFAULT 'E-GEAD Team',
      "authorRole" TEXT DEFAULT 'Editor',
      "authorAvatar" TEXT,
      "authorId" TEXT REFERENCES "user"("id") ON DELETE SET NULL,
      "status" TEXT NOT NULL DEFAULT 'draft',
      "views" INTEGER NOT NULL DEFAULT 0,
      "featured" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS "team_member" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "role" TEXT NOT NULL,
      "department" TEXT NOT NULL,
      "location" TEXT NOT NULL,
      "quote" TEXT,
      "image" TEXT NOT NULL,
      "linkedin" TEXT,
      "bio" TEXT NOT NULL,
      "skills" TEXT[] NOT NULL DEFAULT '{}',
      "isLeader" BOOLEAN NOT NULL DEFAULT false,
      "order" INTEGER NOT NULL DEFAULT 0,
      "status" TEXT NOT NULL DEFAULT 'published',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS "leader_hierarchy" (
      "id" TEXT PRIMARY KEY,
      "leaderId" TEXT UNIQUE NOT NULL REFERENCES "team_member"("id") ON DELETE CASCADE,
      "departmentScope" TEXT NOT NULL,
      "overview" TEXT NOT NULL,
      "childNodes" JSONB NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE INDEX IF NOT EXISTS "team_member_department_idx" ON "team_member"("department");`,
    `CREATE INDEX IF NOT EXISTS "team_member_isLeader_idx" ON "team_member"("isLeader");`,
    `CREATE INDEX IF NOT EXISTS "team_member_status_idx" ON "team_member"("status");`,
  ];

  for (const sql of ddlStatements) {
    await prisma.$executeRawUnsafe(sql);
  }
  console.log('✅ Cấu trúc bảng PostgreSQL đã sẵn sàng.');
}

async function main() {
  console.log('🚀 Bắt đầu khởi tạo cơ sở dữ liệu E-GEAD trên PostgreSQL local...');
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
      update: {}, // An toàn dữ liệu: Không ghi đè nếu chuyên mục đã tồn tại
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
