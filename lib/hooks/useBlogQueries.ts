'use client';

import { useQuery } from '@tanstack/react-query';
import type { BlogPost } from '@/types/blog';

export interface UseArticlesQueryOptions {
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  initialData?: BlogPost[] | any[];
}

export const ARTICLES_QUERY_KEY = ['articles', 'public'] as const;

/**
 * Hook truy vấn danh sách bài viết công khai với TanStack Query
 */
export function useLatestArticlesQuery(options?: UseArticlesQueryOptions) {
  const limit = options?.limit ?? 10;
  const category = options?.category;
  const tag = options?.tag;
  const search = options?.search;

  return useQuery({
    queryKey: [...ARTICLES_QUERY_KEY, 'latest', { limit, category, tag, search }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('status', 'published');
      params.set('limit', String(limit));
      if (category) params.set('category', category);
      if (tag) params.set('tag', tag);
      if (search) params.set('search', search);

      const res = await fetch(`/api/articles?${params.toString()}`);
      if (!res.ok) throw new Error('Không thể tải danh sách bài viết');
      const json = await res.json();
      if (!json.success || !Array.isArray(json.data)) {
        throw new Error(json.error || 'Dữ liệu bài viết không hợp lệ');
      }
      return json.data as BlogPost[];
    },
    initialData: options?.initialData as any,
    staleTime: 60 * 1000,
  });
}
