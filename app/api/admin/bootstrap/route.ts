import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  isAdminInitialized,
  createDefaultAdminIfNotExist,
  DEFAULT_ADMIN_CONFIG,
  ensureDatabaseTablesExist,
} from '@/lib/services/auth.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  let dbConnected = false;
  let dbError: string | null = null;
  let tableExists = false;
  let initialized = false;

  try {
    await prisma.$queryRaw`SELECT 1 as connected`;
    dbConnected = true;

    // Check if user table exists
    try {
      await prisma.user.count();
      tableExists = true;
    } catch {
      tableExists = false;
    }

    // Auto-create tables and default admin if missing
    if (!tableExists) {
      await ensureDatabaseTablesExist();
      tableExists = true;
    }

    initialized = await isAdminInitialized();
    if (!initialized) {
      await createDefaultAdminIfNotExist();
      initialized = true;
    }
  } catch (err) {
    dbError = (err as Error).message;
  }

  return NextResponse.json({
    success: true,
    dbConnected,
    tableExists,
    dbError,
    initialized,
    defaultCredentials: {
      email: DEFAULT_ADMIN_CONFIG.email,
      password: DEFAULT_ADMIN_CONFIG.password,
    },
  });
}

export async function POST() {
  try {
    await ensureDatabaseTablesExist();
    const result = await createDefaultAdminIfNotExist();
    return NextResponse.json({
      success: true,
      ...result,
      defaultCredentials: {
        email: DEFAULT_ADMIN_CONFIG.email,
        password: DEFAULT_ADMIN_CONFIG.password,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
