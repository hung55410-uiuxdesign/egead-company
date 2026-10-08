/**
 * E-GEAD Career & Recruitment Module
 * Re-exports the Career & Applications Service and provides compatibility helpers
 */
import { getAllJobs as getAllCareerPosts, getJobBySlug as getCareerPostBySlug } from '@/lib/services/career.service';
import type { CareerPost } from '@/types/career';

export * from '@/lib/services/career.service';
export type { CareerPost, JobApplication, CareerStats } from '@/types/career';

export interface JobOpening {
  id: string;
  slug: string;
  position: string;
  department: string;
  location: string;
  locationCountry: string;
  locationCity?: string;
  jobType: string;
  excerpt: string;
  experience?: string;
  salary?: string;
  quantity?: string | number;
  deadline?: string;
  createdAt?: string;
  responsibilities?: string[];
  qualifications?: string[];
  preferredSkills?: string[];
  toolsAndTechnologies?: string[];
  benefits?: string[];
}

export function toJobOpening(post: CareerPost): JobOpening {
  const parseList = (htmlOrText?: string): string[] => {
    if (!htmlOrText) return [];
    const matches = htmlOrText.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (matches && matches.length > 0) {
      return matches
        .map((m) =>
          m
            .replace(/<[^>]+>/g, '')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .trim()
        )
        .filter(Boolean);
    }
    return htmlOrText
      .split('\n')
      .map((s) => s.replace(/^[-*•\d.]\s*/, '').trim())
      .filter(Boolean);
  };

  return {
    id: post.id,
    slug: post.slug,
    position: post.title,
    department: post.department,
    location: post.location,
    locationCountry: post.location,
    locationCity: post.location,
    jobType: post.type,
    excerpt: post.excerpt || '',
    experience: post.experience,
    salary: post.salary,
    quantity: post.quantity,
    deadline: post.deadline,
    createdAt: post.createdAt,
    responsibilities: parseList(post.description),
    qualifications: parseList(post.requirements),
    benefits: parseList(post.benefits),
  };
}

export async function getPublicJobOpenings(): Promise<JobOpening[]> {
  const posts = await getAllCareerPosts({ status: 'published' });
  return posts.map(toJobOpening);
}

export async function getPublicJobOpeningBySlug(slug: string): Promise<JobOpening | null> {
  const post = await getCareerPostBySlug(slug);
  if (!post) return null;
  return toJobOpening(post);
}
