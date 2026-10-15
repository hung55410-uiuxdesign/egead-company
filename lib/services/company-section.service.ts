import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export interface CompanyHeroData {
  subtitle?: string;
  titlePart1?: string;
  titlePart2?: string;
  image?: string;
  badgeText?: string;
  alt?: string;
}

export interface CompanyIntroData {
  paragraphs?: string[];
}

export interface Company4DStep {
  step: number;
  name: string;
  tagline: string;
  description: string;
}

export const DEFAULT_4D_METHOD_STEPS: Company4DStep[] = [
  {
    step: 1,
    name: 'Design',
    tagline: 'Architect Strategies.',
    description: 'We blueprint conversion using Concentrix TPS design and data insights.',
  },
  {
    step: 2,
    name: 'Build',
    tagline: 'Deploy Faster.',
    description: 'We launch platforms in 6-8 months using pre-built TPS accelerators.',
  },
  {
    step: 3,
    name: 'Run',
    tagline: 'Operate Reliably.',
    description: 'We safeguard business continuity with 24/7 support and 99.9% uptime.',
  },
  {
    step: 4,
    name: 'Grow',
    tagline: 'Drive Revenue.',
    description: 'We drive revenue through data-driven marketing and continuous optimization.',
  },
];

export interface Company4DMethodData {
  videoUrl?: string;
  steps?: Company4DStep[];
}

export interface CompanyValueItem {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface CompanyValueSystemData {
  items: CompanyValueItem[];
}

export interface CompanyCaseStudiesLogo {
  name: string;
  src: string;
  invert?: boolean;
}

export interface CompanyCaseStudiesData {
  clientsSubtitle?: string;
  clientsTitle?: string;
  clients?: CompanyCaseStudiesLogo[];
  servicesSubtitle?: string;
  servicesTitle?: string;
  servicePartners?: CompanyCaseStudiesLogo[];
}

export interface CompanyPortalCard {
  subtitle: string;
  title: string;
  icon: string;
  hoverIcon?: string;
  buttonText: string;
  buttonHref: string;
}

export interface CompanyPortalsData {
  bannerImage?: string;
  bannerAlt?: string;
  peopleCard?: CompanyPortalCard;
  careersCard?: CompanyPortalCard;
}

export interface CompanyContactData {
  buttonText?: string;
  buttonHref?: string;
}

export interface CompanySectionModel {
  id: string;
  key: string;
  name: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  data: any;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

function formatCompanySection(item: any): CompanySectionModel {
  let rawData = item.data;
  if (typeof rawData === 'string') {
    try {
      rawData = JSON.parse(rawData);
    } catch {}
  }
  if (
    rawData &&
    typeof rawData === 'object' &&
    !Array.isArray(rawData) &&
    rawData.data !== undefined
  ) {
    rawData = rawData.data;
  }
  return {
    ...item,
    data: rawData,
  } as CompanySectionModel;
}

/**
 * Lấy danh sách tất cả các sections của trang Company
 */
export async function getCompanySections(): Promise<CompanySectionModel[]> {
  try {
    const delegate = (prisma as any)?.companySection;
    if (delegate && typeof delegate.findMany === 'function') {
      const items = await delegate.findMany({
        orderBy: { order: 'asc' },
      });
      return items.map((item: any) => formatCompanySection(item));
    }

    // Direct database query fallback when delegate is not yet loaded in active dev server process
    const rows = await prisma.$queryRawUnsafe<any[]>(
      'SELECT id, key, name, title, subtitle, description, data, "isActive", "order", "createdAt", "updatedAt" FROM company_section ORDER BY "order" ASC'
    );
    return rows.map((r) => formatCompanySection(r));
  } catch (error) {
    console.error('[company-section.service] Error in getCompanySections:', error);
    return [];
  }
}

/**
 * Lấy chi tiết một section trang Company theo key
 */
export async function getCompanySectionByKey(
  key: string
): Promise<CompanySectionModel | null> {
  try {
    const delegate = (prisma as any)?.companySection;
    if (delegate && typeof delegate.findUnique === 'function') {
      const item = await delegate.findUnique({
        where: { key },
      });
      return item ? formatCompanySection(item) : null;
    }

    // Direct database query fallback
    const rows = await prisma.$queryRawUnsafe<any[]>(
      'SELECT id, key, name, title, subtitle, description, data, "isActive", "order", "createdAt", "updatedAt" FROM company_section WHERE key = $1 LIMIT 1',
      key
    );

    if (!rows || rows.length === 0) return null;
    return formatCompanySection(rows[0]);
  } catch (error) {
    console.error('[company-section.service] Error in getCompanySectionByKey:', error);
    return null;
  }
}

/**
 * Cập nhật section trang Company
 */
export async function updateCompanySection(
  key: string,
  payload: {
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    data?: any;
    isActive?: boolean;
    order?: number;
  }
): Promise<CompanySectionModel> {
  let cleanTitle = payload.title;
  let cleanSubtitle = payload.subtitle;
  let cleanDescription = payload.description;
  let cleanIsActive = payload.isActive;
  let cleanOrder = payload.order;
  let cleanData = payload.data;

  // Xử lý unwrap nếu payload truyền lồng { data: { title, ... } }
  if (
    cleanData &&
    typeof cleanData === 'object' &&
    !Array.isArray(cleanData) &&
    cleanData.data !== undefined &&
    (cleanData.title !== undefined || cleanData.isActive !== undefined)
  ) {
    if (cleanTitle === undefined) cleanTitle = cleanData.title;
    if (cleanSubtitle === undefined) cleanSubtitle = cleanData.subtitle;
    if (cleanDescription === undefined) cleanDescription = cleanData.description;
    if (cleanIsActive === undefined) cleanIsActive = cleanData.isActive;
    cleanData = cleanData.data;
  }

  const delegate = (prisma as any)?.companySection;
  if (delegate && typeof delegate.update === 'function') {
    const updatePayload: any = {};
    if (cleanTitle !== undefined) updatePayload.title = cleanTitle;
    if (cleanSubtitle !== undefined) updatePayload.subtitle = cleanSubtitle;
    if (cleanDescription !== undefined) updatePayload.description = cleanDescription;
    if (cleanIsActive !== undefined) updatePayload.isActive = cleanIsActive;
    if (cleanOrder !== undefined) updatePayload.order = cleanOrder;
    if (cleanData !== undefined) {
      updatePayload.data = cleanData as unknown as Prisma.InputJsonValue;
    }

    const updated = await delegate.update({
      where: { key },
      data: updatePayload,
    });
    return formatCompanySection(updated);
  }

  // Fallback direct raw SQL update
  const existing = await getCompanySectionByKey(key);
  if (!existing) {
    throw new Error(`Section with key "${key}" not found`);
  }

  const newTitle = cleanTitle !== undefined ? cleanTitle : existing.title;
  const newSubtitle = cleanSubtitle !== undefined ? cleanSubtitle : existing.subtitle;
  const newDesc = cleanDescription !== undefined ? cleanDescription : existing.description;
  const newDataJson = cleanData !== undefined ? JSON.stringify(cleanData) : JSON.stringify(existing.data);
  const newIsActive = cleanIsActive !== undefined ? cleanIsActive : existing.isActive;
  const newOrder = cleanOrder !== undefined ? cleanOrder : existing.order;

  await prisma.$executeRawUnsafe(
    'UPDATE company_section SET title = $1, subtitle = $2, description = $3, data = $4::jsonb, "isActive" = $5, "order" = $6, "updatedAt" = NOW() WHERE key = $7',
    newTitle,
    newSubtitle,
    newDesc,
    newDataJson,
    newIsActive,
    newOrder,
    key
  );

  const reloaded = await getCompanySectionByKey(key);
  return reloaded!;
}

