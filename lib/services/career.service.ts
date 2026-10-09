import fs from 'fs/promises';
import path from 'path';
import {
  CareerPost,
  JobApplication,
  CareerStats,
  JobStatus,
  ApplicationStatus,
} from '@/types/career';
import initialJobs from '@/data/careers.json';
import initialApplications from '@/data/career_applications.json';

const CAREERS_FILE_PATH = path.join(process.cwd(), 'data', 'careers.json');
const APPLICATIONS_FILE_PATH = path.join(
  process.cwd(),
  'data',
  'career_applications.json'
);

/**
 * Read jobs from storage with fallback
 */
async function readJobs(): Promise<CareerPost[]> {
  try {
    const content = await fs.readFile(CAREERS_FILE_PATH, 'utf-8');
    const jobs: CareerPost[] = JSON.parse(content);
    return jobs.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return initialJobs as CareerPost[];
  }
}

/**
 * Write jobs to storage
 */
async function writeJobs(jobs: CareerPost[]): Promise<void> {
  await fs.writeFile(CAREERS_FILE_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
}

/**
 * Read applications from storage with fallback
 */
async function readApplications(): Promise<JobApplication[]> {
  try {
    const content = await fs.readFile(APPLICATIONS_FILE_PATH, 'utf-8');
    const applications: JobApplication[] = JSON.parse(content);
    return applications.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return initialApplications as JobApplication[];
  }
}

/**
 * Write applications to storage
 */
async function writeApplications(
  applications: JobApplication[]
): Promise<void> {
  await fs.writeFile(
    APPLICATIONS_FILE_PATH,
    JSON.stringify(applications, null, 2),
    'utf-8'
  );
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
 * Get all career postings with optional filtering
 */
export async function getAllJobs(filter?: {
  status?: string;
  department?: string;
  search?: string;
}): Promise<CareerPost[]> {
  let jobs = await readJobs();

  if (filter?.status && filter.status !== 'all') {
    jobs = jobs.filter((job) => job.status === filter.status);
  }

  if (filter?.department && filter.department !== 'all') {
    jobs = jobs.filter((job) => job.department === filter.department);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    jobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.excerpt.toLowerCase().includes(q) ||
        job.slug.toLowerCase().includes(q)
    );
  }

  return jobs;
}

/**
 * Get single career post by ID
 */
export async function getJobById(id: string): Promise<CareerPost | null> {
  const jobs = await readJobs();
  return jobs.find((j) => j.id === id) || null;
}

/**
 * Get single career post by slug
 */
export async function getJobBySlug(slug: string): Promise<CareerPost | null> {
  const jobs = await readJobs();
  return jobs.find((j) => j.slug === slug) || null;
}

/**
 * Create or update a career posting
 */
export async function saveJob(
  jobData: Partial<CareerPost> & { title: string }
): Promise<CareerPost> {
  if (!jobData.title?.trim()) {
    throw new Error('Tiêu đề tin tuyển dụng không được để trống.');
  }

  const jobs = await readJobs();
  const now = new Date().toISOString();
  const slug = jobData.slug?.trim() || generateSlug(jobData.title);

  let saved: CareerPost;

  if (jobData.id) {
    const index = jobs.findIndex((j) => j.id === jobData.id);
    if (index === -1) {
      throw new Error(`Không tìm thấy tin tuyển dụng với mã: ${jobData.id}`);
    }

    saved = {
      ...jobs[index],
      ...jobData,
      title: jobData.title.trim(),
      slug,
      department: jobData.department?.trim() || jobs[index].department || 'General',
      location: jobData.location?.trim() || jobs[index].location || 'Hanoi',
      type: jobData.type || jobs[index].type || 'Full-time',
      experience: jobData.experience?.trim() || jobs[index].experience || 'Not required',
      salary: jobData.salary?.trim() || jobs[index].salary || 'Negotiable',
      quantity: jobData.quantity || jobs[index].quantity || '01',
      deadline: jobData.deadline || jobs[index].deadline || '2026-12-31',
      excerpt: jobData.excerpt?.trim() || jobs[index].excerpt || '',
      description: jobData.description || jobs[index].description || '',
      requirements: jobData.requirements || jobs[index].requirements || '',
      benefits: jobData.benefits || jobs[index].benefits || '',
      contactEmail: jobData.contactEmail?.trim() || jobs[index].contactEmail || 'hr@egead.com',
      status: (jobData.status as JobStatus) || jobs[index].status || 'published',
      featured: Boolean(jobData.featured),
      updatedAt: now,
    };

    jobs[index] = saved;
  } else {
    saved = {
      id: `job-${Date.now()}`,
      title: jobData.title.trim(),
      slug,
      department: jobData.department?.trim() || 'General',
      location: jobData.location?.trim() || 'Hanoi',
      type: jobData.type || 'Full-time',
      experience: jobData.experience?.trim() || 'Not required',
      salary: jobData.salary?.trim() || 'Negotiable',
      quantity: jobData.quantity || '01',
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
      createdAt: now,
      updatedAt: now,
    };

    jobs.unshift(saved);
  }

  await writeJobs(jobs);
  return saved;
}

/**
 * Delete a career posting
 */
export async function deleteJob(id: string): Promise<boolean> {
  const jobs = await readJobs();
  const filtered = jobs.filter((j) => j.id !== id);
  if (filtered.length === jobs.length) {
    return false;
  }
  await writeJobs(filtered);
  return true;
}

/**
 * Get distinct department list
 */
export async function getDepartments(): Promise<string[]> {
  const jobs = await readJobs();
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
  let applications = await readApplications();

  if (filter?.jobId && filter.jobId !== 'all') {
    applications = applications.filter((app) => app.jobId === filter.jobId);
  }

  if (filter?.status && filter.status !== 'all') {
    applications = applications.filter((app) => app.status === filter.status);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    applications = applications.filter(
      (app) =>
        app.fullName.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.phone.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q)
    );
  }

  return applications;
}

/**
 * Get single application by ID
 */
export async function getApplicationById(
  id: string
): Promise<JobApplication | null> {
  const applications = await readApplications();
  return applications.find((a) => a.id === id) || null;
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

  const applications = await readApplications();
  const now = new Date().toISOString();

  // Find job title if jobId is provided and jobTitle is empty
  let jobTitle = data.jobTitle?.trim() || 'General Application';
  if (data.jobId && data.jobId !== 'general') {
    const targetJob = await getJobById(data.jobId);
    if (targetJob) {
      jobTitle = targetJob.title;
    }
  }

  const newApp: JobApplication = {
    id: `app-${Date.now()}`,
    jobId: data.jobId || 'general',
    jobTitle,
    fullName: data.fullName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    cvUrl: data.cvUrl.trim(),
    portfolioUrl: data.portfolioUrl?.trim() || undefined,
    expectedSalary: data.expectedSalary?.trim() || undefined,
    experienceYears: data.experienceYears?.trim() || undefined,
    startDate: data.startDate?.trim() || undefined,
    coverLetter: data.coverLetter?.trim() || undefined,
    status: data.status || 'pending',
    notes: data.notes?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  applications.unshift(newApp);
  await writeApplications(applications);

  // Increment application count on the job posting if found
  if (data.jobId && data.jobId !== 'general') {
    const jobs = await readJobs();
    const jobIndex = jobs.findIndex((j) => j.id === data.jobId);
    if (jobIndex !== -1) {
      jobs[jobIndex].applicationsCount =
        (jobs[jobIndex].applicationsCount || 0) + 1;
      await writeJobs(jobs);
    }
  }

  return newApp;
}

/**
 * Update application status & internal notes
 */
export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string
): Promise<JobApplication> {
  const applications = await readApplications();
  const index = applications.findIndex((a) => a.id === id);
  if (index === -1) {
    throw new Error(`Không tìm thấy hồ sơ với mã: ${id}`);
  }

  const updated: JobApplication = {
    ...applications[index],
    status,
    notes: notes !== undefined ? notes : applications[index].notes,
    updatedAt: new Date().toISOString(),
  };

  applications[index] = updated;
  await writeApplications(applications);
  return updated;
}

/**
 * Delete an application
 */
export async function deleteApplication(id: string): Promise<boolean> {
  const applications = await readApplications();
  const target = applications.find((a) => a.id === id);
  if (!target) {
    return false;
  }

  const filtered = applications.filter((a) => a.id !== id);
  await writeApplications(filtered);

  // Decrement applications count on the job
  if (target.jobId && target.jobId !== 'general') {
    const jobs = await readJobs();
    const jobIndex = jobs.findIndex((j) => j.id === target.jobId);
    if (jobIndex !== -1 && jobs[jobIndex].applicationsCount > 0) {
      jobs[jobIndex].applicationsCount -= 1;
      await writeJobs(jobs);
    }
  }

  return true;
}

/**
 * Get comprehensive career & recruitment statistics
 */
export async function getCareerStats(): Promise<CareerStats> {
  const [jobs, applications] = await Promise.all([
    readJobs(),
    readApplications(),
  ]);

  return {
    totalJobs: jobs.length,
    activeJobs: jobs.filter((j) => j.status === 'published').length,
    draftJobs: jobs.filter((j) => j.status === 'draft').length,
    closedJobs: jobs.filter((j) => j.status === 'closed').length,
    totalApplications: applications.length,
    pendingApplications: applications.filter((a) => a.status === 'pending')
      .length,
  };
}

/**
 * Bulk delete jobs by IDs
 */
export async function bulkDeleteJobs(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  const jobs = await readJobs();
  const idSet = new Set(ids);
  const remaining = jobs.filter((j) => !idSet.has(j.id));
  const count = jobs.length - remaining.length;
  await writeJobs(remaining);
  return count;
}

/**
 * Bulk update jobs (status or department) by IDs
 */
export async function bulkUpdateJobs(
  ids: string[],
  data: { status?: JobStatus; department?: string }
): Promise<number> {
  if (ids.length === 0) return 0;
  const jobs = await readJobs();
  const idSet = new Set(ids);
  let count = 0;
  const updated = jobs.map((job) => {
    if (idSet.has(job.id)) {
      count++;
      return {
        ...job,
        ...(data.status ? { status: data.status } : {}),
        ...(data.department ? { department: data.department } : {}),
        updatedAt: new Date().toISOString(),
      };
    }
    return job;
  });
  await writeJobs(updated);
  return count;
}

