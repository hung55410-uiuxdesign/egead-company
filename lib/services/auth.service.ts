import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { seedDatabaseFromJSON } from './blog.service';

export interface AdminCredentials {
  email: string;
  name: string;
  role: string;
}

export const DEFAULT_ADMIN_CONFIG = {
  email: 'admin@egead.com',
  password: 'Admin@123456',
  name: 'E-GEAD Administrator',
  role: 'admin',
};

/**
 * Ensure PostgreSQL tables exist in the database.
 * If tables do not exist, creates them via raw DDL so user doesn't even need manual migrations.
 */
export async function ensureDatabaseTablesExist(): Promise<void> {
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
  ];

  for (const statement of ddlStatements) {
    await prisma.$executeRawUnsafe(statement);
  }
}

/**
 * Check if the admin account has been initialized in the database.
 */
export async function isAdminInitialized(): Promise<boolean> {
  try {
    const adminCount = await prisma.user.count({
      where: {
        OR: [
          { role: 'admin' },
          { email: DEFAULT_ADMIN_CONFIG.email },
        ],
      },
    });
    return adminCount > 0;
  } catch (error) {
    console.warn('[auth.service] Database connection check failed, assuming uninitialized:', error);
    return false;
  }
}

/**
 * Create the default admin account and ensure tables exist.
 */
export async function createDefaultAdminIfNotExist(): Promise<{
  created: boolean;
  message: string;
  email: string;
}> {
  try {
    // 1. Ensure tables exist in PostgreSQL
    await ensureDatabaseTablesExist();

    // 2. Check if admin exists
    const initialized = await isAdminInitialized();
    if (initialized) {
      return {
        created: false,
        message: 'Tài khoản quản trị viên đã tồn tại trong Database.',
        email: DEFAULT_ADMIN_CONFIG.email,
      };
    }

    // 3. Create user using Better Auth server API
    await auth.api.signUpEmail({
      body: {
        email: DEFAULT_ADMIN_CONFIG.email,
        password: DEFAULT_ADMIN_CONFIG.password,
        name: DEFAULT_ADMIN_CONFIG.name,
      },
    });

    // 4. Ensure role is admin
    await prisma.user.update({
      where: { email: DEFAULT_ADMIN_CONFIG.email },
      data: { role: 'admin' },
    });

    // 5. Seed initial posts into database
    try {
      await seedDatabaseFromJSON();
    } catch {
      // Ignore if seed fails
    }

    return {
      created: true,
      message: 'Khởi tạo cấu trúc bảng và tài khoản quản trị viên thành công!',
      email: DEFAULT_ADMIN_CONFIG.email,
    };
  } catch (error) {
    const err = error as Error;
    console.error('[auth.service] Failed to create default admin:', err);
    throw new Error(`Không thể khởi tạo tài khoản quản trị: ${err.message}`);
  }
}

/**
 * Validate password strength for user management.
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  error?: string;
} {
  if (password.length < 8) {
    return {
      valid: false,
      error: 'Mật khẩu phải chứa ít nhất 8 ký tự',
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      error: 'Mật khẩu phải chứa ít nhất 1 chữ hoa',
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      error: 'Mật khẩu phải chứa ít nhất 1 chữ số',
    };
  }
  return { valid: true };
}
