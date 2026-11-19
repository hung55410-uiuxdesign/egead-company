import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CareerPost,
  CareerSibling,
  JobApplication,
  CareerStats,
  JobStatus,
  ApplicationStatus,
} from '@/types/career';
import { normalizeLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import initialJobs from '@/data/careers.json';
import initialApplications from '@/data/career_applications.json';

let isSeeded = false;

/**
 * Maps a Prisma CareerJob record to CareerPost
 */
function mapJobRecord(record: any): CareerPost {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    department: record.department || 'General',
    location: record.location || 'Hanoi',
    type: record.type || 'Full-time',
    experience: record.experience || 'Not required',
    salary: record.salary || 'Negotiable',
    quantity: record.quantity || '01',
    deadline: record.deadline || '2026-12-31',
    excerpt: record.excerpt || '',
    description: record.description || '',
    requirements: record.requirements || '',
    benefits: record.benefits || '',
    content: record.content || '',
    contactEmail: record.contactEmail || 'hr@egead.com',
    status: (record.status as JobStatus) || 'published',
    featured: Boolean(record.featured),
    views: Number(record.views || 0),
    applicationsCount: Number(record.applicationsCount || 0),
    locale: normalizeLocale(record.locale),
    groupId: record.groupId || undefined,
    createdAt:
      record.createdAt instanceof Date
        ? record.createdAt.toISOString()
        : new Date(record.createdAt || Date.now()).toISOString(),
    updatedAt:
      record.updatedAt instanceof Date
        ? record.updatedAt.toISOString()
        : new Date(record.updatedAt || Date.now()).toISOString(),
  };
}

/**
 * Maps a Prisma CareerApplication record to JobApplication
 */
function mapApplicationRecord(record: any): JobApplication {
  return {
    id: record.id,
    jobId: record.jobId || 'general',
    jobTitle: record.jobTitle || 'General Application',
    fullName: record.fullName,
    email: record.email,
    phone: record.phone,
    cvUrl: record.cvUrl,
    portfolioUrl: record.portfolioUrl || undefined,
    expectedSalary: record.expectedSalary || undefined,
    experienceYears: record.experienceYears || undefined,
    startDate: record.startDate || undefined,
    coverLetter: record.coverLetter || undefined,
    status: (record.status as ApplicationStatus) || 'pending',
    notes: record.notes || undefined,
    createdAt:
      record.createdAt instanceof Date
        ? record.createdAt.toISOString()
        : new Date(record.createdAt || Date.now()).toISOString(),
    updatedAt:
      record.updatedAt instanceof Date
        ? record.updatedAt.toISOString()
        : new Date(record.updatedAt || Date.now()).toISOString(),
  };
}

/**
 * Ensure initial JSON data is seeded into PostgreSQL if tables are empty.
 * Strictly preserves 100% of existing DB records (update: {}).
 */
async function ensureCareerDataSeeded(): Promise<void> {
  if (isSeeded) return;
  try {
    const jobCount = await prisma.careerJob.count();
    if (jobCount === 0 && Array.isArray(initialJobs) && initialJobs.length > 0) {
      for (const job of initialJobs as CareerPost[]) {
        await prisma.careerJob.upsert({
          where: { slug: job.slug },
          update: {},
          create: {
            id: job.id,
            slug: job.slug,
            title: job.title,
            department: job.department || 'General',
            location: job.location || 'Hanoi',
            type: String(job.type || 'Full-time'),
            experience: job.experience || 'Not required',
            salary: job.salary || 'Negotiable',
            quantity: String(job.quantity || '01'),
            deadline: job.deadline || '2026-12-31',
            excerpt: job.excerpt || '',
            description: job.description || '',
            requirements: job.requirements || '',
            benefits: job.benefits || '',
            content: job.content || '',
            contactEmail: job.contactEmail || 'hr@egead.com',
            status: job.status || 'published',
            featured: Boolean(job.featured),
            views: Number(job.views || 0),
            applicationsCount: Number(job.applicationsCount || 0),
            createdAt: job.createdAt ? new Date(job.createdAt) : new Date(),
            updatedAt: job.updatedAt ? new Date(job.updatedAt) : new Date(),
          },
        });
      }
    }

    const appCount = await prisma.careerApplication.count();
    if (
      appCount === 0 &&
      Array.isArray(initialApplications) &&
      initialApplications.length > 0
    ) {
      for (const app of initialApplications as JobApplication[]) {
        await prisma.careerApplication.upsert({
          where: { id: app.id },
          update: {},
          create: {
            id: app.id,
            jobId: app.jobId || 'general',
            jobTitle: app.jobTitle || 'General Application',
            fullName: app.fullName,
            email: app.email,
            phone: app.phone,
            cvUrl: app.cvUrl,
            portfolioUrl: app.portfolioUrl || null,
            expectedSalary: app.expectedSalary || null,
            experienceYears: app.experienceYears || null,
            startDate: app.startDate || null,
            coverLetter: app.coverLetter || null,
            status: app.status || 'pending',
            notes: app.notes || null,
            createdAt: app.createdAt ? new Date(app.createdAt) : new Date(),
            updatedAt: app.updatedAt ? new Date(app.updatedAt) : new Date(),
          },
        });
      }
    }

    isSeeded = true;
  } catch (error) {
    console.warn('[career.service] Initial seed check warning:', error);
  }
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Collapse translations of the same job (same groupId) into one entry,
 * preferring the version written in `locale`. Order of first appearance is kept.
 */
export function dedupeJobsByLocale(jobs: CareerPost[], locale: Locale): CareerPost[] {
  const order: string[] = [];
  const best = new Map<string, CareerPost>();
  for (const j of jobs) {
    const key = j.groupId || j.id;
    const current = best.get(key);
    if (!current) {
      order.push(key);
      best.set(key, j);
    } else if (current.locale !== locale && j.locale === locale) {
      best.set(key, j);
    }
  }
  return order.map((key) => best.get(key)!);
}

/**
 * Get all career postings with optional filtering
 */
export async function getAllJobs(filter?: {
  status?: string;
  department?: string;
  search?: string;
  /** Public site language: jobs that exist in both languages collapse to ONE (this language). */
  locale?: Locale;
  /** Exact language filter (admin). */
  language?: Locale;
}): Promise<CareerPost[]> {
  if (filter?.locale) {
    const { locale, ...rest } = filter;
    return dedupeJobsByLocale(await getAllJobs(rest), locale);
  }

  await ensureCareerDataSeeded();

  const where: Prisma.CareerJobWhereInput = {};

  if (filter?.language) {
    where.locale = filter.language;
  }

  if (filter?.status && filter.status !== 'all') {
    where.status = filter.status;
  }

  if (filter?.department && filter.department !== 'all') {
    where.department = filter.department;
  }

  if (filter?.search && filter.search.trim()) {
    const q = filter.search.trim();
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { department: { contains: q, mode: 'insensitive' } },
      { location: { contains: q, mode: 'insensitive' } },
      { excerpt: { contains: q, mode: 'insensitive' } },
      { slug: { contains: q, mode: 'insensitive' } },
    ];
  }

  const records = await prisma.careerJob.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return records.map(mapJobRecord);
}

/**
 * Get single career post by ID
 */
export async function getJobById(id: string): Promise<CareerPost | null> {
  await ensureCareerDataSeeded();
  const record = await prisma.careerJob.findUnique({
    where: { id },
  });
  return record ? mapJobRecord(record) : null;
}

/**
 * Get single career post by slug
 */
export async function getJobBySlug(slug: string): Promise<CareerPost | null> {
  await ensureCareerDataSeeded();
  const record = await prisma.careerJob.findUnique({
    where: { slug },
  });
  return record ? mapJobRecord(record) : null;
}

/**
 * Create or update a career posting in PostgreSQL
 */
export async function saveJob(
  jobData: Partial<CareerPost> & { title: string }
): Promise<CareerPost> {
  if (!jobData.title?.trim()) {
    throw new Error('Tiêu đề tin tuyển dụng không được để trống.');
  }

  await ensureCareerDataSeeded();

  const baseSlug =
    jobData.slug?.trim() || generateSlug(jobData.title) || `job-${Date.now()}`;

  const requestedLocale = jobData.locale ? normalizeLocale(jobData.locale) : undefined;

  if (jobData.id) {
    const existing = await prisma.careerJob.findUnique({
      where: { id: jobData.id },
    });

    if (!existing) {
      throw new Error(`Không tìm thấy tin tuyển dụng với mã: ${jobData.id}`);
    }

    // A translation group may hold only one job per language.
    if (requestedLocale && requestedLocale !== existing.locale && existing.groupId) {
      const clash = await prisma.careerJob.findFirst({
        where: {
          groupId: existing.groupId,
          locale: requestedLocale,
          NOT: { id: existing.id },
        },
        select: { id: true },
      });
      if (clash) {
        throw new Error(
          `Tin tuyển dụng này đã có phiên bản ${requestedLocale === 'vi' ? 'tiếng Việt' : 'tiếng Anh'}, không thể đổi ngôn ngữ trùng.`
        );
      }
    }

    // Ensure slug uniqueness if changed
    let finalSlug = baseSlug;
    if (finalSlug !== existing.slug) {
      const slugConflict = await prisma.careerJob.findUnique({
        where: { slug: finalSlug },
      });
      if (slugConflict && slugConflict.id !== existing.id) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }
    }

    const updated = await prisma.careerJob.update({
      where: { id: jobData.id },
      data: {
        title: jobData.title.trim(),
        slug: finalSlug,
        department:
          jobData.department?.trim() || existing.department || 'General',
        location: jobData.location?.trim() || existing.location || 'Hanoi',
        type: String(jobData.type || existing.type || 'Full-time'),
        experience:
          jobData.experience?.trim() || existing.experience || 'Not required',
        salary: jobData.salary?.trim() || existing.salary || 'Negotiable',
        quantity: String(jobData.quantity ?? existing.quantity ?? '01'),
        deadline: jobData.deadline || existing.deadline || '2026-12-31',
        excerpt:
          jobData.excerpt !== undefined
            ? jobData.excerpt.trim()
            : existing.excerpt,
        description:
          jobData.description !== undefined
            ? jobData.description
            : existing.description,
        requirements:
          jobData.requirements !== undefined
            ? jobData.requirements
            : existing.requirements,
        benefits:
          jobData.benefits !== undefined ? jobData.benefits : existing.benefits,
        content:
          jobData.content !== undefined ? jobData.content : existing.content,
        contactEmail:
          jobData.contactEmail?.trim() ||
          existing.contactEmail ||
          'hr@egead.com',
        status: (jobData.status as JobStatus) || existing.status || 'published',
        featured:
          jobData.featured !== undefined
            ? Boolean(jobData.featured)
            : existing.featured,
        locale: requestedLocale,
      },
    });

    return mapJobRecord(updated);
  }

  // Creating a new job posting: ensure slug does not collide
  let finalSlug = baseSlug;
  const slugConflict = await prisma.careerJob.findUnique({
    where: { slug: finalSlug },
  });
  if (slugConflict) {
    finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
  }

  const created = await prisma.careerJob.create({
    data: {
      id: `job-${Date.now()}`,
      title: jobData.title.trim(),
      slug: finalSlug,
      department: jobData.department?.trim() || 'General',
      location: jobData.location?.trim() || 'Hanoi',
      type: String(jobData.type || 'Full-time'),
      experience: jobData.experience?.trim() || 'Not required',
      salary: jobData.salary?.trim() || 'Negotiable',
      quantity: String(jobData.quantity || '01'),
      deadline: jobData.deadline || '2026-12-31',
      excerpt: jobData.excerpt?.trim() || '',
      description: jobData.description || '',
      requirements: jobData.requirements || '',
      benefits: jobData.benefits || '',
      content: jobData.content || '',
      contactEmail: jobData.contactEmail?.trim() || 'hr@egead.com',
      status: (jobData.status as JobStatus) || 'published',
      featured: Boolean(jobData.featured),
      views: 0,
      applicationsCount: 0,
      locale: requestedLocale || DEFAULT_LOCALE,
      groupId: jobData.groupId || null,
    },
  });

  return mapJobRecord(created);
}

/**
 * Other-language versions of a job (same groupId), including the job itself.
 */
export async function getJobSiblings(
  job: Pick<CareerPost, 'id' | 'groupId'>,
  options?: { publishedOnly?: boolean }
): Promise<CareerSibling[]> {
  if (!job.groupId) return [];
  try {
    const rows = await prisma.careerJob.findMany({
      where: {
        groupId: job.groupId,
        ...(options?.publishedOnly ? { status: 'published' } : {}),
      },
      select: { id: true, slug: true, title: true, locale: true, status: true },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      locale: normalizeLocale(r.locale),
      status: (r.status as JobStatus) || 'draft',
    }));
  } catch (error) {
    console.warn('[career.service] getJobSiblings failed:', error);
    return [];
  }
}

/**
 * Create the other-language version of an existing job as a DRAFT copy
 * (same fields, to be translated by the editor). Both jobs share a groupId.
 */
export async function createJobTranslation(
  sourceId: string,
  targetLocale: Locale
): Promise<CareerPost> {
  const source = await prisma.careerJob.findUnique({ where: { id: sourceId } });
  if (!source) {
    throw new Error('Không tìm thấy tin tuyển dụng gốc.');
  }
  if (normalizeLocale(source.locale) === targetLocale) {
    throw new Error('Tin tuyển dụng này đã ở ngôn ngữ được chọn.');
  }

  const groupId = source.groupId || source.id;

  const existing = await prisma.careerJob.findFirst({
    where: { groupId, locale: targetLocale },
    select: { id: true },
  });
  if (existing) {
    throw new Error(
      `Tin tuyển dụng đã có phiên bản ${targetLocale === 'vi' ? 'tiếng Việt' : 'tiếng Anh'}.`
    );
  }

  if (!source.groupId) {
    await prisma.careerJob.update({ where: { id: source.id }, data: { groupId } });
  }

  let slug = `${source.slug}-${targetLocale}`;
  const clash = await prisma.careerJob.findUnique({ where: { slug }, select: { id: true } });
  if (clash) slug = `${slug}-${Date.now().toString().slice(-4)}`;

  const created = await prisma.careerJob.create({
    data: {
      id: `job-${Date.now()}`,
      slug,
      title: source.title,
      department: source.department,
      location: source.location,
      type: source.type,
      experience: source.experience,
      salary: source.salary,
      quantity: source.quantity,
      deadline: source.deadline,
      excerpt: source.excerpt,
      description: source.description,
      requirements: source.requirements,
      benefits: source.benefits,
      content: source.content,
      contactEmail: source.contactEmail,
      status: 'draft',
      featured: false,
      views: 0,
      applicationsCount: 0,
      locale: targetLocale,
      groupId,
    },
  });

  return mapJobRecord(created);
}

/**
 * Delete a career posting
 */
export async function deleteJob(id: string): Promise<boolean> {
  await ensureCareerDataSeeded();
  try {
    await prisma.careerJob.delete({
      where: { id },
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get distinct department list
 */
export async function getDepartments(): Promise<string[]> {
  await ensureCareerDataSeeded();
  const jobs = await prisma.careerJob.findMany({
    select: { department: true },
  });
  const deptSet = new Set<string>();
  jobs.forEach((j) => {
    if (j.department?.trim()) {
      deptSet.add(j.department.trim());
    }
  });
  return Array.from(deptSet).sort();
}

/**
 * Get all career applications with filters
 */
export async function getAllApplications(filter?: {
  jobId?: string;
  status?: string;
  search?: string;
}): Promise<JobApplication[]> {
  await ensureCareerDataSeeded();

  const where: Prisma.CareerApplicationWhereInput = {};

  if (filter?.jobId && filter.jobId !== 'all') {
    where.jobId = filter.jobId;
  }

  if (filter?.status && filter.status !== 'all') {
    where.status = filter.status;
  }

  if (filter?.search && filter.search.trim()) {
    const q = filter.search.trim();
    where.OR = [
      { fullName: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q, mode: 'insensitive' } },
      { jobTitle: { contains: q, mode: 'insensitive' } },
    ];
  }

  const records = await prisma.careerApplication.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return records.map(mapApplicationRecord);
}

/**
 * Get single application by ID
 */
export async function getApplicationById(
  id: string
): Promise<JobApplication | null> {
  await ensureCareerDataSeeded();
  const record = await prisma.careerApplication.findUnique({
    where: { id },
  });
  return record ? mapApplicationRecord(record) : null;
}

/**
 * Submit a new application from candidate / form
 */
export async function submitApplication(
  data: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
    status?: ApplicationStatus;
  }
): Promise<JobApplication> {
  if (!data.fullName?.trim()) {
    throw new Error('Vui lòng nhập họ và tên của bạn.');
  }
  if (!data.email?.trim() || !data.email.includes('@')) {
    throw new Error('Vui lòng nhập địa chỉ email hợp lệ.');
  }
  if (!data.phone?.trim()) {
    throw new Error('Vui lòng nhập số điện thoại liên hệ.');
  }
  if (!data.cvUrl?.trim()) {
    throw new Error('Vui lòng cung cấp link CV hoặc tải tệp đính kèm.');
  }

  await ensureCareerDataSeeded();

  let jobTitle = data.jobTitle?.trim() || 'General Application';
  if (data.jobId && data.jobId !== 'general') {
    const targetJob = await getJobById(data.jobId);
    if (targetJob) {
      jobTitle = targetJob.title;
    }
  }

  const created = await prisma.careerApplication.create({
    data: {
      id: `app-${Date.now()}`,
      jobId: data.jobId || 'general',
      jobTitle,
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      cvUrl: data.cvUrl.trim(),
      portfolioUrl: data.portfolioUrl?.trim() || null,
      expectedSalary: data.expectedSalary?.trim() || null,
      experienceYears: data.experienceYears?.trim() || null,
      startDate: data.startDate?.trim() || null,
      coverLetter: data.coverLetter?.trim() || null,
      status: data.status || 'pending',
      notes: data.notes?.trim() || null,
    },
  });

  // Increment application count on the job posting if found
  if (data.jobId && data.jobId !== 'general') {
    try {
      await prisma.careerJob.update({
        where: { id: data.jobId },
        data: {
          applicationsCount: { increment: 1 },
        },
      });
    } catch {
      // Ignore if jobId does not exist in career_job table
    }
  }

  return mapApplicationRecord(created);
}

/**
 * Update application status & internal notes
 */
export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string
): Promise<JobApplication> {
  await ensureCareerDataSeeded();

  const existing = await prisma.careerApplication.findUnique({
    where: { id },
  });
  if (!existing) {
    throw new Error(`Không tìm thấy hồ sơ với mã: ${id}`);
  }

  const updated = await prisma.careerApplication.update({
    where: { id },
    data: {
      status,
      ...(notes !== undefined ? { notes } : {}),
    },
  });

  return mapApplicationRecord(updated);
}

/**
 * Delete an application
 */
export async function deleteApplication(id: string): Promise<boolean> {
  await ensureCareerDataSeeded();

  const target = await prisma.careerApplication.findUnique({
    where: { id },
  });
  if (!target) {
    return false;
  }

  await prisma.careerApplication.delete({
    where: { id },
  });

  if (target.jobId && target.jobId !== 'general') {
    try {
      const job = await prisma.careerJob.findUnique({
        where: { id: target.jobId },
      });
      if (job && job.applicationsCount > 0) {
        await prisma.careerJob.update({
          where: { id: target.jobId },
          data: {
            applicationsCount: { decrement: 1 },
          },
        });
      }
    } catch {
      // Ignore if job no longer exists
    }
  }

  return true;
}

/**
 * Get comprehensive career & recruitment statistics
 */
export async function getCareerStats(): Promise<CareerStats> {
  await ensureCareerDataSeeded();

  const [
    totalJobs,
    activeJobs,
    draftJobs,
    closedJobs,
    totalApplications,
    pendingApplications,
  ] = await Promise.all([
    prisma.careerJob.count(),
    prisma.careerJob.count({ where: { status: 'published' } }),
    prisma.careerJob.count({ where: { status: 'draft' } }),
    prisma.careerJob.count({ where: { status: 'closed' } }),
    prisma.careerApplication.count(),
    prisma.careerApplication.count({ where: { status: 'pending' } }),
  ]);

  return {
    totalJobs,
    activeJobs,
    draftJobs,
    closedJobs,
    totalApplications,
    pendingApplications,
  };
}

/**
 * Bulk delete jobs by IDs
 */
export async function bulkDeleteJobs(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  await ensureCareerDataSeeded();

  const result = await prisma.careerJob.deleteMany({
    where: { id: { in: ids } },
  });
  return result.count;
}

/**
 * Bulk update jobs (status or department) by IDs
 */
export async function bulkUpdateJobs(
  ids: string[],
  data: { status?: JobStatus; department?: string }
): Promise<number> {
  if (ids.length === 0) return 0;
  await ensureCareerDataSeeded();

  const updateData: Prisma.CareerJobUpdateManyMutationInput = {};
  if (data.status) updateData.status = data.status;
  if (data.department) updateData.department = data.department;

  const result = await prisma.careerJob.updateMany({
    where: { id: { in: ids } },
    data: updateData,
  });
  return result.count;
}
