import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export interface ServicePrinciple {
  title: string;
  description: string;
}

export interface ServiceItemListItem {
  id: string;
  slug: string;
  category: string; // 'service' | 'industry'
  title: string;
  tagline: string;
  subtitle: string;
  heroImage: string | null;
  middleImage: string | null;
  principles?: any;
  order: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceItemDetailModel extends ServiceItemListItem {
  overviewSubTitle: string | null;
  overviewHeading: string | null;
  overviewParagraphs: string[];
  approachHeading: string | null;
  approachIntro: string | null;
  principles: any; // ServicePrinciple[]
}

export interface ServiceItemStats {
  total: number;
  services: number;
  industries: number;
  published: number;
  draft: number;
}

/**
 * Get all services/industries with optional filtering
 */
export async function getServiceItems(options?: {
  category?: string;
  status?: string;
  search?: string;
}): Promise<ServiceItemListItem[]> {
  try {
    const where: Prisma.ServiceItemWhereInput = {};

    if (options?.category && options.category !== 'all') {
      where.category = options.category;
    }

    if (options?.status && options.status !== 'all') {
      where.status = options.status;
    }

    if (options?.search && options.search.trim()) {
      const q = options.search.trim();
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { slug: { contains: q, mode: 'insensitive' } },
        { tagline: { contains: q, mode: 'insensitive' } },
        { subtitle: { contains: q, mode: 'insensitive' } },
      ];
    }

    const items = await prisma.serviceItem.findMany({
      where,
      orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }],
    });

    return items;
  } catch (error) {
    console.error('[service-item.service] Error in getServiceItems:', error);
    return [];
  }
}

/**
 * Get service item by slug (for public page /services/all-services/[...slug])
 */
export async function getServiceItemBySlug(
  slug: string
): Promise<ServiceItemDetailModel | null> {
  try {
    const item = await prisma.serviceItem.findUnique({
      where: { slug },
    });
    return item;
  } catch (error) {
    console.error('[service-item.service] Error in getServiceItemBySlug:', error);
    return null;
  }
}

/**
 * Get service item by ID (for admin editor)
 */
export async function getServiceItemById(
  id: string
): Promise<ServiceItemDetailModel | null> {
  try {
    const item = await prisma.serviceItem.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    console.error('[service-item.service] Error in getServiceItemById:', error);
    return null;
  }
}

/**
 * Get service item statistics
 */
export async function getServiceItemStats(): Promise<ServiceItemStats> {
  try {
    const [total, services, industries, published, draft] = await Promise.all([
      prisma.serviceItem.count(),
      prisma.serviceItem.count({ where: { category: 'service' } }),
      prisma.serviceItem.count({ where: { category: 'industry' } }),
      prisma.serviceItem.count({ where: { status: 'published' } }),
      prisma.serviceItem.count({ where: { status: 'draft' } }),
    ]);

    return { total, services, industries, published, draft };
  } catch (error) {
    console.error('[service-item.service] Error in getServiceItemStats:', error);
    return { total: 0, services: 0, industries: 0, published: 0, draft: 0 };
  }
}

/**
 * Create a new service item
 */
export async function createServiceItem(data: {
  slug: string;
  category?: string;
  title: string;
  tagline: string;
  subtitle: string;
  heroImage?: string | null;
  middleImage?: string | null;
  overviewSubTitle?: string | null;
  overviewHeading?: string | null;
  overviewParagraphs?: string[];
  approachHeading?: string | null;
  approachIntro?: string | null;
  principles?: any;
  order?: number;
  status?: string;
}): Promise<ServiceItemDetailModel> {
  const baseSlug = data.slug?.trim() || `service-${Date.now()}`;
  let finalSlug = baseSlug;
  const existing = await prisma.serviceItem.findUnique({
    where: { slug: finalSlug },
    select: { id: true },
  });
  if (existing) {
    finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
  }

  const item = await prisma.serviceItem.create({
    data: {
      ...data,
      slug: finalSlug,
      category: data.category || 'service',
      order: data.order ?? 0,
      status: data.status || 'published',
      overviewParagraphs: data.overviewParagraphs || [],
      principles: (data.principles ?? []) as unknown as Prisma.InputJsonValue,
    },
  });
  return item as unknown as ServiceItemDetailModel;
}

/**
 * Update an existing service item
 */
export async function updateServiceItem(
  id: string,
  data: Partial<{
    slug: string;
    category: string;
    title: string;
    tagline: string;
    subtitle: string;
    heroImage?: string | null;
    middleImage?: string | null;
    overviewSubTitle?: string | null;
    overviewHeading?: string | null;
    overviewParagraphs?: string[];
    approachHeading?: string | null;
    approachIntro?: string | null;
    principles?: any;
    order?: number;
    status?: string;
  }>
): Promise<ServiceItemDetailModel> {
  const updateData: any = { ...data };
  if (updateData.slug) {
    const baseSlug = updateData.slug.trim();
    const conflict = await prisma.serviceItem.findUnique({
      where: { slug: baseSlug },
      select: { id: true },
    });
    if (conflict && conflict.id !== id) {
      updateData.slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    } else {
      updateData.slug = baseSlug;
    }
  }
  if (data.principles !== undefined) {
    updateData.principles = data.principles as unknown as Prisma.InputJsonValue;
  }

  const item = await prisma.serviceItem.update({
    where: { id },
    data: updateData,
  });
  return item as unknown as ServiceItemDetailModel;
}

/**
 * Delete a service item
 */
export async function deleteServiceItem(id: string): Promise<boolean> {
  await prisma.serviceItem.delete({
    where: { id },
  });
  return true;
}

/**
 * Bulk delete service items by IDs
 */
export async function bulkDeleteServiceItems(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  const res = await prisma.serviceItem.deleteMany({
    where: { id: { in: ids } },
  });
  return res.count;
}

/**
 * Bulk update service items (status, category) by IDs
 */
export async function bulkUpdateServiceItems(
  ids: string[],
  data: {
    status?: 'published' | 'draft';
    category?: 'service' | 'industry';
  }
): Promise<number> {
  if (ids.length === 0) return 0;
  const updateData: { status?: string; category?: string } = {};
  if (data.status) updateData.status = data.status;
  if (data.category) updateData.category = data.category;

  const res = await prisma.serviceItem.updateMany({
    where: { id: { in: ids } },
    data: updateData,
  });
  return res.count;
}
