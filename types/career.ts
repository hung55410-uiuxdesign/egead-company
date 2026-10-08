export type JobStatus = 'published' | 'draft' | 'closed';

export type JobType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Internship'
  | 'Remote';

export interface CareerPost {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: JobType | string;
  experience: string;
  salary: string;
  quantity: string | number;
  deadline: string;
  excerpt: string;
  description: string;
  requirements: string;
  benefits: string;
  content?: string;
  contactEmail: string;
  status: JobStatus;
  featured: boolean;
  views: number;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus =
  | 'pending'
  | 'reviewing'
  | 'interview'
  | 'offered'
  | 'rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  cvUrl: string;
  portfolioUrl?: string;
  expectedSalary?: string;
  experienceYears?: string;
  startDate?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareerStats {
  totalJobs: number;
  activeJobs: number;
  draftJobs: number;
  closedJobs: number;
  totalApplications: number;
  pendingApplications: number;
}
