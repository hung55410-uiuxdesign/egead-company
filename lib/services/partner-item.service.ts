import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { PartnerDetailData } from '@/components/pages/services/partners/sap/types';

export type PartnerItemModel = Prisma.PartnerItemGetPayload<{}>;

export interface PartnerItemStats {
  total: number;
  published: number;
  draft: number;
}

export interface GetPartnerItemsOptions {
  search?: string;
  status?: string;
}

/**
 * Maps a Prisma PartnerItem database record into the rich PartnerDetailData
 * required by PartnerDetailView.
 */
export function mapDbPartnerToPartnerDetailData(dbItem: PartnerItemModel): PartnerDetailData {
  return {
    slug: dbItem.slug,
    name: dbItem.name,
    metaTitle: dbItem.metaTitle || `${dbItem.name} Partner Solutions & Enterprise Commerce | E-GEAD`,
    metaDescription: dbItem.metaDescription || dbItem.description || undefined,
    hero: {
      name: dbItem.name,
      badge: dbItem.badge || undefined,
      bannerImage: dbItem.bannerImage || '/images/services/enterprise_tech.jpg',
      bannerFallback: dbItem.bannerFallback || '/images/services/enterprise_tech.jpg',
      bannerAlt: `${dbItem.name} Enterprise Solutions`,
      headline: dbItem.headline || `Unlock enterprise operational excellence with ${dbItem.name}.`,
      description: dbItem.description || undefined,
      ctaText: dbItem.ctaText || 'Schedule demo',
      ctaHref: dbItem.ctaHref || '/contact-us',
    },
    advantages: {
      subtitle: dbItem.advantagesSubtitle || 'E-GEAD advantages',
      headline: dbItem.advantagesHeadline || undefined,
      items: Array.isArray(dbItem.advantagesItems) ? (dbItem.advantagesItems as any) : [],
    },
    expertise: {
      subtitle: dbItem.expertiseSubtitle || 'Our expertise',
      headline: dbItem.expertiseHeadline || 'We are fluent in',
      items: Array.isArray(dbItem.expertiseItems) ? (dbItem.expertiseItems as any) : [],
    },
    why: {
      titlePrefix: dbItem.whyTitlePrefix || `Why ${dbItem.name}`,
      headline: dbItem.whyHeadline || undefined,
      description: dbItem.whyDescription || undefined,
      items: Array.isArray(dbItem.whyItems) ? (dbItem.whyItems as any) : [],
    },
    caseStudies: {
      subtitle: dbItem.casesSubtitle || 'Proven outcomes',
      headline: dbItem.casesHeadline || 'Read our cases',
      items: Array.isArray(dbItem.casesItems) ? (dbItem.casesItems as any) : [],
    },
    cta: {
      headingPart1: dbItem.ctaHeadingPart1 || 'Unleash your ',
      headingHighlight: dbItem.ctaHighlight || 'growth potential',
      headingPart2: dbItem.ctaHeadingPart2 || ` with ${dbItem.name} now.`,
      description: dbItem.ctaDescription || undefined,
      buttonText: dbItem.ctaButtonText || "Let's talk",
      buttonHref: dbItem.ctaButtonHref || '/contact-us',
    },
  };
}

/**
 * Get all partner items with optional filtering
 */
export async function getPartnerItems(
  options?: GetPartnerItemsOptions
): Promise<PartnerItemModel[]> {
  try {
    const where: Prisma.PartnerItemWhereInput = {};

    if (options?.status && options.status !== 'all') {
      where.status = options.status;
    }

    if (options?.search && options.search.trim()) {
      const q = options.search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { slug: { contains: q, mode: 'insensitive' } },
        { headline: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    const items = await prisma.partnerItem.findMany({
      where,
      orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }],
    });

    return items;
  } catch (error) {
    console.error('[partner-item.service] Error in getPartnerItems:', error);
    return [];
  }
}

/**
 * Get partner item by slug (for public route /partners/[slug])
 */
export async function getPartnerItemBySlug(
  slug: string
): Promise<PartnerItemModel | null> {
  try {
    const item = await prisma.partnerItem.findUnique({
      where: { slug: slug.trim().toLowerCase() },
    });
    return item;
  } catch (error) {
    console.error('[partner-item.service] Error in getPartnerItemBySlug:', error);
    return null;
  }
}

/**
 * Get partner item by ID (for admin editor)
 */
export async function getPartnerItemById(
  id: string
): Promise<PartnerItemModel | null> {
  try {
    const item = await prisma.partnerItem.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    console.error('[partner-item.service] Error in getPartnerItemById:', error);
    return null;
  }
}

/**
 * Get partner item statistics
 */
export async function getPartnerItemStats(): Promise<PartnerItemStats> {
  try {
    const [total, published, draft] = await Promise.all([
      prisma.partnerItem.count(),
      prisma.partnerItem.count({ where: { status: 'published' } }),
      prisma.partnerItem.count({ where: { status: 'draft' } }),
    ]);

    return { total, published, draft };
  } catch (error) {
    console.error('[partner-item.service] Error in getPartnerItemStats:', error);
    return { total: 0, published: 0, draft: 0 };
  }
}

/**
 * Create a new partner item
 */
export async function createPartnerItem(
  data: Prisma.PartnerItemCreateInput
): Promise<PartnerItemModel> {
  const baseSlug = data.slug.trim().toLowerCase() || `partner-${Date.now()}`;
  let finalSlug = baseSlug;
  const existing = await prisma.partnerItem.findUnique({
    where: { slug: finalSlug },
    select: { id: true },
  });
  if (existing) {
    finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
  }

  const item = await prisma.partnerItem.create({
    data: {
      ...data,
      slug: finalSlug,
    },
  });
  return item;
}

/**
 * Update an existing partner item
 */
export async function updatePartnerItem(
  id: string,
  data: Prisma.PartnerItemUpdateInput
): Promise<PartnerItemModel> {
  const updateData = { ...data };
  if (updateData.slug && typeof updateData.slug === 'string') {
    const baseSlug = updateData.slug.trim().toLowerCase();
    const conflict = await prisma.partnerItem.findUnique({
      where: { slug: baseSlug },
      select: { id: true },
    });
    if (conflict && conflict.id !== id) {
      updateData.slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    } else {
      updateData.slug = baseSlug;
    }
  }

  const item = await prisma.partnerItem.update({
    where: { id },
    data: updateData,
  });
  return item;
}

/**
 * Delete a partner item
 */
export async function deletePartnerItem(id: string): Promise<void> {
  await prisma.partnerItem.delete({
    where: { id },
  });
}

/**
 * Synchronize PartnerItem database records from the Cột 3 (Partners) of Header Services Menu
 */
export async function syncPartnersFromHeaderMenu(
  providedPartners?: Array<{ name: string; href: string }>
): Promise<{ count: number; items: PartnerItemModel[] }> {
  const { getPartnerDetailData } = await import(
    '@/components/pages/services/partners/data/partner-details.data'
  );
  const { getHomeSectionByKey } = await import('./home-section.service');

  try {
    let menuPartners = providedPartners;
    if (!menuPartners || menuPartners.length === 0) {
      const section = await getHomeSectionByKey('header-services-menu');
      const data: any = section?.data || {};
      const unwrapped = data?.data && data.data.partners ? data.data : data;
      menuPartners = unwrapped.partners || [];
    }

    if (!menuPartners || menuPartners.length === 0) {
      return { count: 0, items: [] };
    }

    const syncedItems: PartnerItemModel[] = [];

    for (let index = 0; index < menuPartners.length; index++) {
      const p = menuPartners[index];
      const rawSlug = p.href
        .replace(/^\/partners\//, '')
        .replace(/^\//, '')
        .trim();
      const slug = (
        rawSlug ||
        p.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      ).toLowerCase();

      const defaultData = getPartnerDetailData(slug);

      const partner = await prisma.partnerItem.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          name: p.name || defaultData.name,
          badge: defaultData.hero.badge || null,
          headline: defaultData.hero.headline || null,
          description: defaultData.hero.description || null,
          bannerImage: defaultData.hero.bannerImage || null,
          bannerFallback: defaultData.hero.bannerFallback || null,
          ctaText: defaultData.hero.ctaText || 'Schedule demo',
          ctaHref: defaultData.hero.ctaHref || '/contact-us',

          advantagesSubtitle: defaultData.advantages.subtitle || null,
          advantagesHeadline: defaultData.advantages.headline || null,
          advantagesItems: (defaultData.advantages.items || []) as unknown as Prisma.InputJsonValue,

          expertiseSubtitle: defaultData.expertise.subtitle || null,
          expertiseHeadline: defaultData.expertise.headline || null,
          expertiseItems: (defaultData.expertise.items || []) as unknown as Prisma.InputJsonValue,

          whyTitlePrefix: defaultData.why.titlePrefix || null,
          whyHeadline: defaultData.why.headline || null,
          whyDescription: defaultData.why.description || null,
          whyItems: (defaultData.why.items || []) as unknown as Prisma.InputJsonValue,

          casesSubtitle: defaultData.caseStudies.subtitle || null,
          casesHeadline: defaultData.caseStudies.headline || null,
          casesItems: (defaultData.caseStudies.items || []) as unknown as Prisma.InputJsonValue,

          ctaHeadingPart1: defaultData.cta.headingPart1 || null,
          ctaHighlight: defaultData.cta.headingHighlight || null,
          ctaHeadingPart2: defaultData.cta.headingPart2 || null,
          ctaDescription: defaultData.cta.description || null,
          ctaButtonText: defaultData.cta.buttonText || null,
          ctaButtonHref: defaultData.cta.buttonHref || null,

          metaTitle: defaultData.metaTitle || null,
          metaDescription: defaultData.metaDescription || null,

          order: index,
          status: 'published',
        },
      });

      syncedItems.push(partner);
    }

    return { count: syncedItems.length, items: syncedItems };
  } catch (error) {
    console.error('[partner-item.service] Error in syncPartnersFromHeaderMenu:', error);
    throw error;
  }
}

/**
 * Bulk delete partner items by IDs
 */
export async function bulkDeletePartnerItems(ids: string[]): Promise<number> {
  if (!Array.isArray(ids) || ids.length === 0) return 0;
  const res = await prisma.partnerItem.deleteMany({
    where: { id: { in: ids } },
  });
  return res.count;
}

/**
 * Bulk update partner items (status, badge) by IDs
 */
export async function bulkUpdatePartnerItems(
  ids: string[],
  data: {
    status?: 'published' | 'draft';
    badge?: string;
  }
): Promise<number> {
  if (!Array.isArray(ids) || ids.length === 0) return 0;
  const updateData: { status?: string; badge?: string | null } = {};
  if (data.status) updateData.status = data.status;
  if (typeof data.badge === 'string') {
    updateData.badge = data.badge.trim() || null;
  }

  const res = await prisma.partnerItem.updateMany({
    where: { id: { in: ids } },
    data: updateData,
  });
  return res.count;
}
