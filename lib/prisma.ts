import { PrismaClient } from '@prisma/client';

export const LOCAL_POSTGRES_URL =
  'postgresql://nguyenhung@localhost:5432/postgres';

const getTargetDatabaseUrl = () => {
  const envUrl = process.env.DATABASE_URL;
  if (envUrl && !envUrl.includes('postgres:postgres@localhost:5432/egead_db')) {
    return envUrl;
  }
  return LOCAL_POSTGRES_URL;
};

const targetUrl = getTargetDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  activeUrl: string | undefined;
};

if (!globalForPrisma.prisma || globalForPrisma.activeUrl !== targetUrl) {
  if (globalForPrisma.prisma) {
    try {
      globalForPrisma.prisma.$disconnect();
    } catch {}
  }
  globalForPrisma.prisma = new PrismaClient({
    datasources: {
      db: {
        url: targetUrl,
      },
    },
    log:
      process.env.NODE_ENV === 'development'
        ? ['warn', 'error']
        : ['error'],
  });
  globalForPrisma.activeUrl = targetUrl;
}

export const prisma = (globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: targetUrl,
      },
    },
    log:
      process.env.NODE_ENV === 'development'
        ? ['warn', 'error']
        : ['error'],
  })) as PrismaClient;
