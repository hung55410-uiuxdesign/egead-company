import type { Locale } from '@/lib/i18n/config';

export type PostStatus = 'published' | 'draft' | 'archived';

export interface Author {
  name: string;
  avatar?: string;
  role?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  tag: string;
  category: string;
  categoryId?: string;
  date: string;
  readTime: string;
  heroImage: string;
  excerpt: string;
  content: string | string[];
  author?: Author;
  status: PostStatus;
  views?: number;
  featured?: boolean;
  /** Language of this version: 'en' (default) or 'vi' */
  locale?: Locale;
  /** Posts that are translations of each other share a groupId */
  groupId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogSibling {
  id: string;
  slug: string;
  title: string;
  locale: Locale;
  status: PostStatus;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
}
