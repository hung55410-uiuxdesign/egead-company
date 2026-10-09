'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { CategoryItem } from '@/types/category';

import { BLOGS_QUERY_KEY } from './useBlogMutations';

export const CATEGORIES_QUERY_KEY = ['admin', 'categories'] as const;

export interface SaveCategoryVariables {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string | null;
}

export interface DeleteCategoryVariables {
  id: string;
  name?: string;
}

export interface BulkDeleteCategoriesVariables {
  ids: string[];
}

export interface BulkUpdateCategoriesVariables {
  ids: string[];
  data: {
    description?: string;
    icon?: string | null;
  };
}

export interface UseCategoryMutationsOptions {
  showToast?: boolean;
  onSaveSuccess?: (category: CategoryItem, isEditing: boolean) => void;
  onDeleteSuccess?: (id: string, name?: string) => void;
  onSyncSuccess?: (categories: CategoryItem[]) => void;
  onBulkDeleteSuccess?: (ids: string[], count: number) => void;
  onBulkUpdateSuccess?: (ids: string[], data: { description?: string; icon?: string | null }) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook mutation lưu chuyên mục (tạo mới hoặc cập nhật) với TanStack Query và Astryx Toast
 */
export function useSaveCategoryMutation(options?: {
  showToast?: boolean;
  onSuccess?: (category: CategoryItem, isEditing: boolean) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: SaveCategoryVariables) => {
      const isEditing = Boolean(payload.id);
      const url = isEditing
        ? `/api/admin/categories/${payload.id}`
        : '/api/admin/categories';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          slug: payload.slug,
          description: payload.description,
          icon: payload.icon || null,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || (isEditing ? 'Cập nhật chuyên mục thất bại' : 'Tạo chuyên mục thất bại'));
      }

      return { category: result.data as CategoryItem, isEditing };
    },
    onSuccess: ({ category, isEditing }) => {
      if (showToast) {
        toast({
          body: isEditing
            ? `Cập nhật chuyên mục "${category.name}" thành công!`
            : `Đã tạo chuyên mục "${category.name}" thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(category, isEditing);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi lưu chuyên mục, vui lòng thử lại',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}

/**
 * Hook mutation xóa một chuyên mục với TanStack Query và Astryx Toast
 */
export function useDeleteCategoryMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, name?: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, name }: DeleteCategoryVariables) => {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa chuyên mục thất bại');
      }
      return { id, name };
    },
    onSuccess: ({ id, name }) => {
      if (showToast) {
        toast({
          body: name
            ? `Đã xóa chuyên mục "${name}" thành công!`
            : 'Đã xóa chuyên mục thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, name);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa chuyên mục, vui lòng thử lại',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}

/**
 * Hook mutation đồng bộ chuyên mục từ dữ liệu bài viết với TanStack Query và Astryx Toast
 */
export function useSyncCategoriesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (categories: CategoryItem[]) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync' }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Đồng bộ chuyên mục thất bại');
      }
      return result.data as CategoryItem[];
    },
    onSuccess: (data) => {
      if (showToast) {
        toast({
          body: 'Đã đồng bộ danh sách chuyên mục từ bài viết thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi đồng bộ chuyên mục',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}

/**
 * Hook mutation xóa hàng loạt chuyên mục với TanStack Query và Astryx Toast
 */
export function useBulkDeleteCategoriesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (ids: string[], count: number) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids }: BulkDeleteCategoriesVariables) => {
      const res = await fetch('/api/admin/categories/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', ids }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa hàng loạt chuyên mục thất bại');
      }
      return { ids, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, count }) => {
      if (showToast) {
        toast({
          body: `Đã xóa thành công ${count} chuyên mục đã chọn!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, count);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa hàng loạt chuyên mục',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}

/**
 * Hook mutation cập nhật hàng loạt chuyên mục với TanStack Query và Astryx Toast
 */
export function useBulkUpdateCategoriesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (ids: string[], data: { description?: string; icon?: string | null }) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids, data }: BulkUpdateCategoriesVariables) => {
      const res = await fetch('/api/admin/categories/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', ids, data }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật hàng loạt chuyên mục thất bại');
      }
      return { ids, data, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, data, count }) => {
      if (showToast) {
        toast({
          body: `Đã cập nhật thông tin cho ${count} chuyên mục thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi cập nhật hàng loạt chuyên mục',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}

/**
 * Hook tổng hợp quản lý các thao tác mutation cho chuyên mục
 */
export function useCategoryMutations(options?: UseCategoryMutationsOptions) {
  const saveMutation = useSaveCategoryMutation({
    showToast: options?.showToast,
    onSuccess: options?.onSaveSuccess,
    onError: options?.onError,
  });

  const deleteMutation = useDeleteCategoryMutation({
    showToast: options?.showToast,
    onSuccess: options?.onDeleteSuccess,
    onError: options?.onError,
  });

  const syncMutation = useSyncCategoriesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onSyncSuccess,
    onError: options?.onError,
  });

  const bulkDeleteMutation = useBulkDeleteCategoriesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkDeleteSuccess,
    onError: options?.onError,
  });

  const bulkUpdateMutation = useBulkUpdateCategoriesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkUpdateSuccess,
    onError: options?.onError,
  });

  return {
    // Save (Create or Update)
    saveCategory: saveMutation.mutate,
    saveCategoryAsync: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
    saveMutation,

    // Delete
    deleteCategory: deleteMutation.mutate,
    deleteCategoryAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteMutation,

    // Sync
    syncCategories: syncMutation.mutate,
    syncCategoriesAsync: syncMutation.mutateAsync,
    isSyncing: syncMutation.isPending,
    syncMutation,

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
  };
}
