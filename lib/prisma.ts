import { PrismaClient } from '@prisma/client';

export const LOCAL_MYSQL_URL = 'mysql://root@localhost:3306/egead';

const getTargetDatabaseUrl = () => process.env.DATABASE_URL || LOCAL_MYSQL_URL;

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

export const prisma = globalForPrisma.prisma;
