import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { MYSQL_DDL_STATEMENTS } from '@/lib/db/mysql-ddl.mjs';
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
 * Ensure MySQL tables exist in the database.
 * If tables do not exist, creates them via raw DDL so user doesn't even need manual migrations.
 */
export async function ensureDatabaseTablesExist(): Promise<void> {
  for (const statement of MYSQL_DDL_STATEMENTS) {
    await prisma.$executeRawUnsafe(statement);
  }
}

/**
 * Check if the admin account has been initialized in the database.
 */
export async function isAdminInitialized(): Promise<boolean> {
  try {
    const adminUser = await prisma.user.findFirst({
      where: {
        OR: [
          { role: 'admin' },
          { email: DEFAULT_ADMIN_CONFIG.email },
        ],
      },
      include: {
        accounts: true,
      },
    });
    return Boolean(adminUser && adminUser.accounts.some((a) => a.providerId === 'credential'));
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
    // 1. Ensure tables exist in MySQL
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

    // Clean up any dangling user record without an account record
    const danglingUser = await prisma.user.findUnique({
      where: { email: DEFAULT_ADMIN_CONFIG.email },
    });
    if (danglingUser) {
      await prisma.user.delete({ where: { id: danglingUser.id } });
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
