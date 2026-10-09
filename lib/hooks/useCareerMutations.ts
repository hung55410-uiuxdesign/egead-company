'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { CareerPost, JobStatus } from '@/types/career';

export type JobPosting = CareerPost;

export const CAREERS_QUERY_KEY = ['admin', 'careers'] as const;

export interface SaveJobVariables extends Partial<CareerPost> {
  id?: string;
  title: string;
}

export interface DeleteJobVariables {
  id: string;
  title?: string;
}

export interface BulkDeleteJobsVariables {
  ids: string[];
}

export interface BulkUpdateJobsVariables {
  ids: string[];
  data: {
    status?: JobStatus;
    department?: string;
  };
}

export interface UseCareerMutationsOptions {
  showToast?: boolean;
  onSaveSuccess?: (data: JobPosting, isEditing: boolean) => void;
  onDeleteSuccess?: (id: string, title?: string) => void;
  onBulkDeleteSuccess?: (ids: string[], count: number) => void;
  onBulkUpdateSuccess?: (
    ids: string[],
    data: { status?: JobStatus; department?: string },
    count: number
  ) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook mutation lưu tin tuyển dụng (tạo mới hoặc cập nhật) với TanStack Query và Astryx Toast
 */
export function useSaveJobMutation(options?: {
  showToast?: boolean;
  redirectTo?: string;
  onSuccess?: (data: JobPosting, isEditing: boolean) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: SaveJobVariables) => {
      const isEditing = Boolean(payload.id);
      const url = isEditing
        ? `/api/admin/careers/${payload.id}`
        : '/api/admin/careers';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(
          result.error ||
            (isEditing
              ? 'Cập nhật tin tuyển dụng thất bại'
              : 'Tạo tin tuyển dụng thất bại')
        );
      }

      return { data: result.data as JobPosting, isEditing };
    },
    onSuccess: ({ data, isEditing }) => {
      if (showToast) {
        toast({
          body: isEditing
            ? `Cập nhật tin tuyển dụng "${data.title}" thành công!`
            : `Đã tạo tin tuyển dụng "${data.title}" thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CAREERS_QUERY_KEY });
      if (options?.redirectTo !== undefined) {
        if (options.redirectTo) {
          setTimeout(() => {
            router.push(options.redirectTo!);
            router.refresh();
          }, 600);
        }
      } else {
        setTimeout(() => {
          router.push('/admin/careers');
          router.refresh();
        }, 600);
      }
      options?.onSuccess?.(data, isEditing);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi lưu tin tuyển dụng, vui lòng thử lại',
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
 * Hook mutation xóa một tin tuyển dụng với TanStack Query và Astryx Toast
 */
export function useDeleteJobMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, title?: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, title }: DeleteJobVariables) => {
      const res = await fetch(`/api/admin/careers/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa tin tuyển dụng thất bại');
      }
      return { id, title };
    },
    onSuccess: ({ id, title }) => {
      if (showToast) {
        toast({
          body: title
            ? `Đã xóa tin tuyển dụng "${title}" thành công!`
            : 'Đã xóa tin tuyển dụng thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CAREERS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, title);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa tin tuyển dụng, vui lòng thử lại',
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
 * Hook mutation xóa hàng loạt tin tuyển dụng với TanStack Query và Astryx Toast
 */
export function useBulkDeleteJobsMutation(options?: {
  showToast?: boolean;
  onSuccess?: (ids: string[], count: number) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids }: BulkDeleteJobsVariables) => {
      const res = await fetch('/api/admin/careers/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', ids }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa hàng loạt tin tuyển dụng thất bại');
      }
      return { ids, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, count }) => {
      if (showToast) {
        toast({
          body: `Đã xóa thành công ${count} tin tuyển dụng đã chọn!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CAREERS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, count);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa hàng loạt tin tuyển dụng',
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
 * Hook mutation cập nhật hàng loạt tin tuyển dụng với TanStack Query và Astryx Toast
 */
export function useBulkUpdateJobsMutation(options?: {
  showToast?: boolean;
  onSuccess?: (
    ids: string[],
    data: { status?: JobStatus; department?: string },
    count: number
  ) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids, data }: BulkUpdateJobsVariables) => {
      const res = await fetch('/api/admin/careers/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', ids, data }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật hàng loạt tin tuyển dụng thất bại');
      }
      return { ids, data, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, data, count }) => {
      if (showToast) {
        toast({
          body: `Đã cập nhật thông tin cho ${count} tin tuyển dụng thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CAREERS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, data, count);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi cập nhật hàng loạt tin tuyển dụng',
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
 * Hook tổng hợp quản lý các thao tác mutation cho tin tuyển dụng
 */
export function useCareerMutations(options?: UseCareerMutationsOptions) {
  const saveMutation = useSaveJobMutation({
    showToast: options?.showToast,
    onSuccess: options?.onSaveSuccess,
    onError: options?.onError,
  });

  const deleteMutation = useDeleteJobMutation({
    showToast: options?.showToast,
    onSuccess: options?.onDeleteSuccess,
    onError: options?.onError,
  });

  const bulkDeleteMutation = useBulkDeleteJobsMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkDeleteSuccess,
    onError: options?.onError,
  });

  const bulkUpdateMutation = useBulkUpdateJobsMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkUpdateSuccess,
    onError: options?.onError,
  });

  return {
    // Save (Create or Update)
    saveJob: saveMutation.mutate,
    saveJobAsync: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
    saveMutation,

    // Delete
    deleteJob: deleteMutation.mutate,
    deleteJobAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteMutation,

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
