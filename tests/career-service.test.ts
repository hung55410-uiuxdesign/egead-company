import { describe, test, expect } from 'bun:test';
import {
  getAllJobs,
  getJobById,
  getJobBySlug,
  saveJob,
  deleteJob,
  getDepartments,
  getAllApplications,
  getApplicationById,
  submitApplication,
  updateApplicationStatus,
  deleteApplication,
  getCareerStats,
  bulkUpdateJobs,
  bulkDeleteJobs,
} from '../lib/services/career.service';

describe('Career Service Unit Tests', () => {
  describe('getAllJobs', () => {
    test('returns array of career posts with valid structure', async () => {
      const jobs = await getAllJobs();
      expect(Array.isArray(jobs)).toBe(true);
      expect(jobs.length).toBeGreaterThan(0);

      const first = jobs[0];
      expect(typeof first.id).toBe('string');
      expect(typeof first.title).toBe('string');
      expect(typeof first.slug).toBe('string');
      expect(typeof first.department).toBe('string');
      expect(typeof first.location).toBe('string');
      expect(typeof first.salary).toBe('string');
    });

    test('supports filtering by status', async () => {
      const published = await getAllJobs({ status: 'published' });
      expect(Array.isArray(published)).toBe(true);
      for (const j of published) {
        expect(j.status).toBe('published');
      }
    });

    test('supports filtering by search keyword', async () => {
      const results = await getAllJobs({ search: 'Engineer' });
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('getJobById and getJobBySlug', () => {
    test('retrieves existing job by id', async () => {
      const all = await getAllJobs();
      const target = all[0];
      const found = await getJobById(target.id);
      expect(found).not.toBeNull();
      expect(found?.id).toBe(target.id);
      expect(found?.title).toBe(target.title);
    });

    test('returns null for nonexistent id', async () => {
      const notFound = await getJobById('nonexistent-job-id-99999');
      expect(notFound).toBeNull();
    });

    test('retrieves existing job by slug', async () => {
      const all = await getAllJobs();
      const target = all[0];
      const found = await getJobBySlug(target.slug);
      expect(found).not.toBeNull();
      expect(found?.slug).toBe(target.slug);
    });

    test('returns null for nonexistent slug', async () => {
      const notFound = await getJobBySlug('nonexistent-slug-xyz');
      expect(notFound).toBeNull();
    });
  });

  describe('saveJob and deleteJob', () => {
    test('creates a new career post and then deletes it', async () => {
      const newJob = await saveJob({
        title: 'Automation Test Position QA',
        department: 'Quality Assurance',
        location: 'Hà Nội',
        type: 'Full-time',
        experience: '2 năm',
        salary: '20 - 30 Triệu VND',
        quantity: '01',
        deadline: '2026-12-31',
        excerpt: 'Test job posting created by automated unit tests',
        description: '<p>Job description test content</p>',
        requirements: '<ul><li>Test requirement 1</li></ul>',
        benefits: '<ul><li>Test benefit 1</li></ul>',
        status: 'draft',
        contactEmail: 'qa@egead.com',
      });

      expect(newJob).toBeDefined();
      expect(newJob.id).toBeDefined();
      expect(newJob.title).toBe('Automation Test Position QA');
      expect(newJob.slug).toContain('automation-test-position-qa');
      expect(newJob.status).toBe('draft');

      // Update the created job
      const updatedJob = await saveJob({
        id: newJob.id,
        title: 'Automation Test Position QA (Updated)',
        status: 'published',
      });
      expect(updatedJob.title).toBe('Automation Test Position QA (Updated)');
      expect(updatedJob.status).toBe('published');

      // Delete the created job
      const deleted = await deleteJob(newJob.id);
      expect(deleted).toBe(true);

      const checkDeleted = await getJobById(newJob.id);
      expect(checkDeleted).toBeNull();
    });

    test('throws error if title is empty', async () => {
      expect(
        saveJob({
          title: '',
        })
      ).rejects.toThrow();
    });
  });

  describe('getDepartments and getCareerStats', () => {
    test('returns list of non-empty department names', async () => {
      const depts = await getDepartments();
      expect(Array.isArray(depts)).toBe(true);
      expect(depts.length).toBeGreaterThan(0);
      for (const d of depts) {
        expect(typeof d).toBe('string');
        expect(d.length).toBeGreaterThan(0);
      }
    });

    test('computes accurate career stats', async () => {
      const stats = await getCareerStats();
      expect(stats).toBeDefined();
      expect(typeof stats.totalJobs).toBe('number');
      expect(typeof stats.activeJobs).toBe('number');
      expect(typeof stats.draftJobs).toBe('number');
      expect(typeof stats.closedJobs).toBe('number');
      expect(typeof stats.totalApplications).toBe('number');
      expect(typeof stats.pendingApplications).toBe('number');
      expect(stats.totalJobs).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Applications and Form Submissions', () => {
    test('retrieves all applications with proper structure', async () => {
      const applications = await getAllApplications();
      expect(Array.isArray(applications)).toBe(true);
      expect(applications.length).toBeGreaterThan(0);

      const first = applications[0];
      expect(typeof first.id).toBe('string');
      expect(typeof first.fullName).toBe('string');
      expect(typeof first.email).toBe('string');
      expect(typeof first.phone).toBe('string');
      expect(typeof first.cvUrl).toBe('string');
      expect(typeof first.status).toBe('string');
    });

    test('submits a new application, updates status and deletes it', async () => {
      const submitted = await submitApplication({
        jobId: 'general',
        jobTitle: 'Senior Fullstack Engineer',
        fullName: 'Đoàn Nhật Nam',
        email: 'nhatnam.doan@example.com',
        phone: '0977889900',
        cvUrl: 'https://storage.example.com/cvs/nam-doan.pdf',
        portfolioUrl: 'https://nhatnam.dev',
        expectedSalary: '38.000.000 VND',
        coverLetter: 'Kính gửi ban tuyển dụng E-GEAD...',
      });

      expect(submitted).toBeDefined();
      expect(submitted.id).toBeDefined();
      expect(submitted.fullName).toBe('Đoàn Nhật Nam');
      expect(submitted.status).toBe('pending');

      // Update status
      const updated = await updateApplicationStatus(
        submitted.id,
        'interview',
        'Ứng viên phản hồi phỏng vấn tốt'
      );
      expect(updated.status).toBe('interview');
      expect(updated.notes).toBe('Ứng viên phản hồi phỏng vấn tốt');

      // Check retrieval by ID
      const found = await getApplicationById(submitted.id);
      expect(found).not.toBeNull();
      expect(found?.status).toBe('interview');

      // Delete application
      const deleted = await deleteApplication(submitted.id);
      expect(deleted).toBe(true);

      const verifyDeleted = await getApplicationById(submitted.id);
      expect(verifyDeleted).toBeNull();
    });

    test('validates required fields on application submission', async () => {
      expect(
        submitApplication({
          jobId: 'general',
          jobTitle: 'Developer',
          fullName: '',
          email: 'test@example.com',
          phone: '0123456789',
          cvUrl: 'https://cv.com',
        })
      ).rejects.toThrow();

      expect(
        submitApplication({
          jobId: 'general',
          jobTitle: 'Developer',
          fullName: 'Test User',
          email: 'invalid-email-format',
          phone: '0123456789',
          cvUrl: 'https://cv.com',
        })
      ).rejects.toThrow();
    });
  });

  describe('bulkUpdateJobs and bulkDeleteJobs', () => {
    test('bulk updates status and department of jobs, then deletes them', async () => {
      const job1 = await saveJob({
        title: 'Bulk Job Alpha',
        department: 'Engineering',
        location: 'Hanoi',
        type: 'Full-time',
        experience: '1 year',
        salary: 'Negotiable',
        quantity: '01',
        deadline: '2026-12-31',
        excerpt: 'Alpha excerpt',
        description: '<p>Desc</p>',
        requirements: 'Reqs',
        benefits: 'Benefits',
        status: 'draft',
      });

      const job2 = await saveJob({
        title: 'Bulk Job Beta',
        department: 'Engineering',
        location: 'Hanoi',
        type: 'Full-time',
        experience: '1 year',
        salary: 'Negotiable',
        quantity: '01',
        deadline: '2026-12-31',
        excerpt: 'Beta excerpt',
        description: '<p>Desc</p>',
        requirements: 'Reqs',
        benefits: 'Benefits',
        status: 'draft',
      });

      const ids = [job1.id, job2.id];

      // Bulk update
      const updatedCount = await bulkUpdateJobs(ids, {
        status: 'published',
        department: 'Design',
      });
      expect(updatedCount).toBe(2);

      // Verify updated
      const fetched1 = await getJobById(job1.id);
      expect(fetched1?.status).toBe('published');
      expect(fetched1?.department).toBe('Design');

      // Bulk delete
      const deletedCount = await bulkDeleteJobs(ids);
      expect(deletedCount).toBe(2);

      // Verify deletion
      const checkDeleted = await getJobById(job1.id);
      expect(checkDeleted).toBeNull();
    });

    test('handles empty ids gracefully', async () => {
      const updated = await bulkUpdateJobs([], { status: 'closed' });
      expect(updated).toBe(0);

      const deleted = await bulkDeleteJobs([]);
      expect(deleted).toBe(0);
    });
  });
});

