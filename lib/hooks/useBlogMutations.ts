'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { BlogPost, PostStatus } from '@/types/blog';
import type { Locale } from '@/lib/i18n/config';

export interface BulkDeleteBlogsVariables {
  ids: string[];
}

export interface BulkUpdateBlogsVariables {
  ids: string[];
  data: {
    status?: PostStatus;
    category?: string;
  };
}

export interface DeleteBlogVariables {
  id: string;
  title?: string;
}

export interface UseBlogMutationsOptions {
  onBulkDeleteSuccess?: (ids: string[]) => void;
  onBulkUpdateSuccess?: (
    ids: string[],
    updatedData: { status?: PostStatus; category?: string }
  ) => void;
  onDeleteSuccess?: (id: string) => void;
  onError?: (error: Error) => void;
  showToast?: boolean;
}

export const BLOGS_QUERY_KEY = ['admin', 'blogs'] as const;

/**
 * Hook mutation xóa hàng loạt bài viết với TanStack Query và Astryx Toast
 */
export function useBulkDeleteBlogsMutation(options?: {
  showToast?: boolean;
  onSuccess?: (ids: string[]) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids }: BulkDeleteBlogsVariables) => {
      const res = await fetch('/api/admin/blogs/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', ids }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Xóa hàng loạt bài viết thất bại');
      }
      return ids;
    },
    onSuccess: (ids) => {
      if (showToast) {
        toast({
          body: `Đã xóa thành công ${ids.length} bài viết`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Có lỗi xảy ra khi xóa hàng loạt bài viết',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 5000,
        });
      }
      options?.onError?.(error);
    },
  });
}

/**
 * Hook mutation cập nhật hàng loạt trạng thái / chuyên mục bài viết
 */
export function useBulkUpdateBlogsMutation(options?: {
  showToast?: boolean;
  onSuccess?: (
    ids: string[],
    data: { status?: PostStatus; category?: string }
  ) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids, data }: BulkUpdateBlogsVariables) => {
      const res = await fetch('/api/admin/blogs/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          ids,
          data: {
            ...(data.status ? { status: data.status } : {}),
            ...(data.category ? { category: data.category } : {}),
          },
        }),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || 'Cập nhật hàng loạt bài viết thất bại');
      }
      return { ids, data };
    },
    onSuccess: ({ ids, data }) => {
      if (showToast) {
        toast({
          body: `Đã cập nhật ${ids.length} bài viết thành công`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Có lỗi xảy ra khi cập nhật hàng loạt bài viết',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 5000,
        });
      }
      options?.onError?.(error);
    },
  });
}

/**
 * Hook mutation xóa 1 bài viết theo ID
 */
export function useDeleteBlogMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, title }: DeleteBlogVariables) => {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Có lỗi xảy ra khi xóa bài viết');
      }
      return { id, title };
    },
    onSuccess: ({ id, title }) => {
      if (showToast) {
        toast({
          body: title
            ? `Đã xóa bài viết "${title}" thành công`
            : 'Đã xóa bài viết thành công',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Không thể xóa bài viết. Vui lòng thử lại.',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 5000,
        });
      }
      options?.onError?.(error);
    },
  });
}

export interface SaveBlogVariables {
  id?: string;
  title: string;
  slug: string;
  subtitle?: string;
  tag?: string;
  category?: string;
  readTime?: string;
  heroImage?: string;
  excerpt?: string;
  content: string;
  author?: {
    name: string;
    role: string;
  };
  status: PostStatus;
  /** Ngôn ngữ bài viết: 'en' | 'vi' */
  locale?: Locale;
}

/**
 * Hook mutation lưu bài viết (tạo mới hoặc cập nhật) với TanStack Query và Astryx Toast
 */
export function useSaveBlogMutation(options?: {
  showToast?: boolean;
  onSuccess?: (data: any, isEditing: boolean) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: SaveBlogVariables) => {
      const isEditing = Boolean(payload.id);
      const url = isEditing
        ? `/api/admin/blogs/${payload.id}`
        : '/api/admin/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Có lỗi xảy ra khi lưu bài viết');
      }
      return { data, isEditing };
    },
    onSuccess: ({ isEditing, data }) => {
      if (showToast) {
        toast({
          body: isEditing
            ? 'Cập nhật bài viết thành công!'
            : 'Đã tạo bài viết mới thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      setTimeout(() => {
        router.push('/admin/blogs');
        router.refresh();
      }, 800);
      options?.onSuccess?.(data, isEditing);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi kết nối máy chủ, vui lòng thử lại.',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 5000,
        });
      }
      options?.onError?.(error);
    },
  });
}

export interface CreateBlogTranslationVariables {
  id: string;
  locale: Locale;
}

/**
 * Hook mutation tạo phiên bản ngôn ngữ khác (bản nháp sao chép) của bài viết
 */
export function useCreateBlogTranslationMutation(options?: {
  showToast?: boolean;
  onSuccess?: (post: BlogPost) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, locale }: CreateBlogTranslationVariables) => {
      const res = await fetch(`/api/admin/blogs/${id}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Không thể tạo phiên bản ngôn ngữ mới');
      }
      return data.data as BlogPost;
    },
    onSuccess: (post) => {
      if (showToast) {
        toast({
          body: 'Đã tạo bản nháp phiên bản mới. Hãy dịch nội dung rồi xuất bản.',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      router.push(`/admin/blogs/${post.id}`);
      router.refresh();
      options?.onSuccess?.(post);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Không thể tạo phiên bản ngôn ngữ mới',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 5000,
        });
      }
      options?.onError?.(error);
    },
  });
}

/**
 * Hook tổng hợp quản lý các thao tác mutation cho bài viết (xóa đơn, xóa hàng loạt, sửa hàng loạt, lưu bài)
 */
export function useBlogMutations(options?: UseBlogMutationsOptions) {
  const bulkDeleteMutation = useBulkDeleteBlogsMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkDeleteSuccess,
    onError: options?.onError,
  });

  const bulkUpdateMutation = useBulkUpdateBlogsMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkUpdateSuccess,
    onError: options?.onError,
  });

  const deleteMutation = useDeleteBlogMutation({
    showToast: options?.showToast,
    onSuccess: options?.onDeleteSuccess,
    onError: options?.onError,
  });

  const saveMutation = useSaveBlogMutation({
    showToast: options?.showToast,
    onError: options?.onError,
  });

  return {
    // Bulk Delete
    bulkDelete: bulkDeleteMutation.mutate,
    bulkDeleteAsync: bulkDeleteMutation.mutateAsync,
    isBulkDeleting: bulkDeleteMutation.isPending,
    bulkDeleteMutation,

    // Bulk Update
    bulkUpdate: bulkUpdateMutation.mutate,
    bulkUpdateAsync: bulkUpdateMutation.mutateAsync,
    isBulkUpdating: bulkUpdateMutation.isPending,
    bulkUpdateMutation,

    // Single Delete
    deleteBlog: deleteMutation.mutate,
    deleteBlogAsync: deleteMutation.mutateAsync,
    isDeletingBlog: deleteMutation.isPending,
    deleteMutation,

    // Save Blog
    saveBlog: saveMutation.mutate,
    saveBlogAsync: saveMutation.mutateAsync,
    isSavingBlog: saveMutation.isPending,
    saveMutation,

    // Combined states
    isAnyLoading:
      bulkDeleteMutation.isPending ||
      bulkUpdateMutation.isPending ||
      deleteMutation.isPending ||
      saveMutation.isPending,
  };
}

