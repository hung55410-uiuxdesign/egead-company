import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export interface CaseStudyListItem {
  id: string;
  slug: string;
  title: string;
  customer: string;
  description: string;
  image: string;
  services: string[];
  industries: string[];
  tags: string[];
  highlight: string | null;
  order: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseStudyDetailModel extends CaseStudyListItem {
  bannerImage: string | null;
  bannerVideo: string | null;
  overviewSubtitle: string | null;
  overviewTitle: string | null;
  overviewDescription: string | null;
  overviewImage: string | null;
  challengeTitle: string | null;
  challengeContent: string | null;
  solutionTitle: string | null;
  solutionContent: string | null;
  taskSubtitle: string | null;
  taskTitle: string | null;
  taskImages: string[];
  taskItems: any;
  nextStudySlug: string | null;
  nextStudyTitle: string | null;
  nextStudyCustomer: string | null;
}

export interface CaseStudyStats {
  total: number;
  published: number;
  draft: number;
}

/**
 * Get all case studies with optional filtering
 */
export async function getCaseStudies(options?: {
  status?: string;
  search?: string;
}): Promise<CaseStudyListItem[]> {
  try {
    const where: Prisma.CaseStudyWhereInput = {};

    if (options?.status && options.status !== 'all') {
      where.status = options.status;
    }

    if (options?.search && options.search.trim()) {
      const q = options.search.trim();
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { customer: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    const items = await prisma.caseStudy.findMany({
      where,
      orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }],
    });

    return items;
  } catch (error) {
    console.error('[casestudy.service] Error in getCaseStudies:', error);
    return [];
  }
}

/**
 * Get case study by slug (for public detail page)
 */
export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudyDetailModel | null> {
  try {
    const item = await prisma.caseStudy.findUnique({
      where: { slug },
    });
    return item;
  } catch (error) {
    console.error('[casestudy.service] Error in getCaseStudyBySlug:', error);
    return null;
  }
}

/**
 * Get case study by ID (for admin editor)
 */
export async function getCaseStudyById(
  id: string
): Promise<CaseStudyDetailModel | null> {
  try {
    const item = await prisma.caseStudy.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    console.error('[casestudy.service] Error in getCaseStudyById:', error);
    return null;
  }
}

/**
 * Get case study statistics
 */
export async function getCaseStudyStats(): Promise<CaseStudyStats> {
  try {
    const [total, published, draft] = await Promise.all([
      prisma.caseStudy.count(),
      prisma.caseStudy.count({ where: { status: 'published' } }),
      prisma.caseStudy.count({ where: { status: 'draft' } }),
    ]);

    return { total, published, draft };
  } catch (error) {
    console.error('[casestudy.service] Error in getCaseStudyStats:', error);
    return { total: 0, published: 0, draft: 0 };
  }
}

/**
 * Create a new case study
 */
export async function createCaseStudy(data: {
  slug: string;
  title: string;
  customer: string;
  description: string;
  image: string;
  services: string[];
  industries: string[];
  tags: string[];
  highlight?: string | null;
  order?: number;
  status?: string;

  bannerImage?: string | null;
  bannerVideo?: string | null;
  overviewSubtitle?: string | null;
  overviewTitle?: string | null;
  overviewDescription?: string | null;
  overviewImage?: string | null;
  challengeTitle?: string | null;
  challengeContent?: string | null;
  solutionTitle?: string | null;
  solutionContent?: string | null;
  taskSubtitle?: string | null;
  taskTitle?: string | null;
  taskImages?: string[];
  taskItems?: any;
  nextStudySlug?: string | null;
  nextStudyTitle?: string | null;
  nextStudyCustomer?: string | null;
}): Promise<CaseStudyDetailModel> {
  const item = await prisma.caseStudy.create({
    data: {
      ...data,
      order: data.order ?? 0,
      status: data.status || 'published',
      taskImages: data.taskImages || [],
      taskItems: data.taskItems || [],
    },
  });
  return item;
}

/**
 * Update an existing case study
 */
export async function updateCaseStudy(
  id: string,
  data: Partial<{
    slug: string;
    title: string;
    customer: string;
    description: string;
    image: string;
    services: string[];
    industries: string[];
    tags: string[];
    highlight?: string | null;
    order?: number;
    status?: string;

    bannerImage?: string | null;
    bannerVideo?: string | null;
    overviewSubtitle?: string | null;
    overviewTitle?: string | null;
    overviewDescription?: string | null;
    overviewImage?: string | null;
    challengeTitle?: string | null;
    challengeContent?: string | null;
    solutionTitle?: string | null;
    solutionContent?: string | null;
    taskSubtitle?: string | null;
    taskTitle?: string | null;
    taskImages?: string[];
    taskItems?: any;
    nextStudySlug?: string | null;
    nextStudyTitle?: string | null;
    nextStudyCustomer?: string | null;
  }>
): Promise<CaseStudyDetailModel> {
  const item = await prisma.caseStudy.update({
    where: { id },
    data,
  });
  return item;
}

/**
 * Delete a case study
 */
export async function deleteCaseStudy(id: string): Promise<boolean> {
  await prisma.caseStudy.delete({
    where: { id },
  });
  return true;
}

/**
 * Bulk delete case studies by IDs
 */
export async function bulkDeleteCaseStudies(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  const res = await prisma.caseStudy.deleteMany({
    where: { id: { in: ids } },
  });
  return res.count;
}

/**
 * Bulk update case studies (status, services, industries) by IDs
 */
export async function bulkUpdateCaseStudies(
  ids: string[],
  data: {
    status?: 'published' | 'draft';
    service?: string;
    industry?: string;
    serviceAction?: 'add' | 'replace';
    industryAction?: 'add' | 'replace';
  }
): Promise<number> {
  if (ids.length === 0) return 0;

  // If only updating status, we can run a single query
  if (data.status && !data.service && !data.industry) {
    const res = await prisma.caseStudy.updateMany({
      where: { id: { in: ids } },
      data: { status: data.status },
    });
    return res.count;
  }

  // If service or industry changes are requested, process each record
  const items = await prisma.caseStudy.findMany({
    where: { id: { in: ids } },
    select: { id: true, services: true, industries: true },
  });

  let count = 0;
  for (const item of items) {
    const updatePayload: any = {};
    if (data.status) {
      updatePayload.status = data.status;
    }
    if (data.service) {
      if (data.serviceAction === 'replace') {
        updatePayload.services = [data.service];
      } else {
        const current = item.services || [];
        if (!current.includes(data.service)) {
          updatePayload.services = [...current, data.service];
        }
      }
    }
    if (data.industry) {
      if (data.industryAction === 'replace') {
        updatePayload.industries = [data.industry];
      } else {
        const current = item.industries || [];
        if (!current.includes(data.industry)) {
          updatePayload.industries = [...current, data.industry];
        }
      }
    }

    if (Object.keys(updatePayload).length > 0) {
      await prisma.caseStudy.update({
        where: { id: item.id },
        data: updatePayload,
      });
      count++;
    }
  }

  return count;
}
