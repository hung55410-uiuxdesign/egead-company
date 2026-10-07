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
  date: string;
  readTime: string;
  heroImage: string;
  excerpt: string;
  content: string | string[];
  author?: Author;
  status: PostStatus;
  views?: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
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
