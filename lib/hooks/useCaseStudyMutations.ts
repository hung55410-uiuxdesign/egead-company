'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { CaseStudyDetailModel } from '@/lib/services/casestudy.service';

export const CASE_STUDIES_QUERY_KEY = ['admin', 'case-studies'] as const;

export interface SaveCaseStudyVariables {
  id?: string;
  slug: string;
  title: string;
  customer: string;
  description: string;
  image: string;
  services: string[];
  industries: string[];
  tags: string[];
  highlight?: string | null;
  order: number;
  status: string;

  // Detail section fields
  bannerImage?: string | null;
  bannerVideo?: string | null;
  overviewSubtitle?: string | null;
  overviewTitle?: string | null;
  overviewDescription?: string | null;
  overviewImage?: string | null;
  challengeTitle?: string | null;
  challengeContent?: string | null;
  solutionTitle?: string | null;
  solutionContent?: string | null;
  taskSubtitle?: string | null;
  taskTitle?: string | null;
  taskImages?: string[];
  taskItems?: Array<{
    taskTitle: string;
    description: string;
  }>;
  nextStudySlug?: string | null;
  nextStudyTitle?: string | null;
  nextStudyCustomer?: string | null;
}

export interface DeleteCaseStudyVariables {
  id: string;
  title?: string;
}

export interface ImportCaseStudiesVariables {
  items: any[];
  onDuplicate?: 'rename' | 'update';
}

export interface BulkDeleteCaseStudiesVariables {
  ids: string[];
}

export interface BulkUpdateCaseStudiesVariables {
  ids: string[];
  data: {
    status?: 'published' | 'draft';
    service?: string;
    industry?: string;
    serviceAction?: 'add' | 'replace';
    industryAction?: 'add' | 'replace';
  };
}

export interface UseCaseStudyMutationsOptions {
  showToast?: boolean;
  onSaveSuccess?: (data: CaseStudyDetailModel, isEditing: boolean) => void;
  onDeleteSuccess?: (id: string, title?: string) => void;
  onImportSuccess?: (data: { count: number; items: any[] }) => void;
  onBulkDeleteSuccess?: (ids: string[], count: number) => void;
  onBulkUpdateSuccess?: (
    ids: string[],
    data: {
      status?: 'published' | 'draft';
      service?: string;
      industry?: string;
      serviceAction?: 'add' | 'replace';
      industryAction?: 'add' | 'replace';
    },
    count: number
  ) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook mutation lưu dự án (thêm mới hoặc cập nhật theo section) với TanStack Query và Astryx Toast
 */
export function useSaveCaseStudyMutation(options?: {
  showToast?: boolean;
  redirectTo?: string;
  onSuccess?: (data: CaseStudyDetailModel, isEditing: boolean) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: SaveCaseStudyVariables) => {
      const isEditing = Boolean(payload.id);
      const url = isEditing
        ? `/api/admin/our-work/${payload.id}`
        : '/api/admin/our-work';
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
            (isEditing ? 'Cập nhật dự án thất bại' : 'Tạo dự án mới thất bại')
        );
      }

      return { data: result.item as CaseStudyDetailModel, isEditing };
    },
    onSuccess: ({ data, isEditing }) => {
      if (showToast) {
        toast({
          body: isEditing
            ? `Cập nhật dự án "${data.title}" thành công!`
            : `Đã thêm dự án "${data.title}" thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CASE_STUDIES_QUERY_KEY });
      if (options?.redirectTo !== undefined) {
        if (options.redirectTo) {
          setTimeout(() => {
            router.push(options.redirectTo!);
            router.refresh();
          }, 600);
        }
      } else {
        setTimeout(() => {
          router.push('/admin/our-work');
          router.refresh();
        }, 600);
      }
      options?.onSuccess?.(data, isEditing);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi lưu dự án, vui lòng thử lại',
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
 * Hook mutation xóa một dự án Case Study với TanStack Query và Astryx Toast
 */
export function useDeleteCaseStudyMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, title?: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, title }: DeleteCaseStudyVariables) => {
      const res = await fetch(`/api/admin/our-work/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa dự án thất bại');
      }
      return { id, title };
    },
    onSuccess: ({ id, title }) => {
      if (showToast) {
        toast({
          body: title
            ? `Đã xóa dự án "${title}" thành công!`
            : 'Đã xóa dự án thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CASE_STUDIES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, title);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa dự án, vui lòng thử lại',
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
 * Hook mutation import danh sách dự án từ file JSON với TanStack Query và Astryx Toast
 */
export function useImportCaseStudiesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (data: { count: number; items: any[] }) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ items, onDuplicate = 'rename' }: ImportCaseStudiesVariables) => {
      const res = await fetch('/api/admin/our-work/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, onDuplicate }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Import dự án thất bại');
      }

      return { count: result.count as number, items: result.items as any[] };
    },
    onSuccess: (data) => {
      if (showToast) {
        toast({
          body: `Đã thêm thành công ${data.count} dự án vào hệ thống!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      queryClient.invalidateQueries({ queryKey: CASE_STUDIES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi import dự án, vui lòng kiểm tra lại file JSON',
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
 * Hook mutation xóa hàng loạt dự án với TanStack Query và Astryx Toast
 */
export function useBulkDeleteCaseStudiesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (ids: string[], count: number) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids }: BulkDeleteCaseStudiesVariables) => {
      const res = await fetch('/api/admin/our-work/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', ids }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa hàng loạt dự án thất bại');
      }
      return { ids, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, count }) => {
      if (showToast) {
        toast({
          body: `Đã xóa thành công ${count} dự án đã chọn!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CASE_STUDIES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, count);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa hàng loạt dự án',
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
 * Hook mutation cập nhật hàng loạt dự án với TanStack Query và Astryx Toast
 */
export function useBulkUpdateCaseStudiesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (
    ids: string[],
    data: {
      status?: 'published' | 'draft';
      service?: string;
      industry?: string;
      serviceAction?: 'add' | 'replace';
      industryAction?: 'add' | 'replace';
    },
    count: number
  ) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids, data }: BulkUpdateCaseStudiesVariables) => {
      const res = await fetch('/api/admin/our-work/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', ids, data }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật hàng loạt dự án thất bại');
      }
      return { ids, data, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, data, count }) => {
      if (showToast) {
        toast({
          body: `Đã cập nhật thành công ${count} dự án đã chọn!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CASE_STUDIES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, data, count);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi cập nhật hàng loạt dự án',
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
 * Hook tổng hợp quản lý các thao tác mutation cho Our Work / Case Studies
 */
export function useCaseStudyMutations(options?: UseCaseStudyMutationsOptions) {
  const saveMutation = useSaveCaseStudyMutation({
    showToast: options?.showToast,
    onSuccess: options?.onSaveSuccess,
    onError: options?.onError,
  });

  const deleteMutation = useDeleteCaseStudyMutation({
    showToast: options?.showToast,
    onSuccess: options?.onDeleteSuccess,
    onError: options?.onError,
  });

  const importMutation = useImportCaseStudiesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onImportSuccess,
    onError: options?.onError,
  });

  const bulkDeleteMutation = useBulkDeleteCaseStudiesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkDeleteSuccess,
    onError: options?.onError,
  });

  const bulkUpdateMutation = useBulkUpdateCaseStudiesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkUpdateSuccess,
    onError: options?.onError,
  });

  return {
    // Save (Create or Update)
    saveCaseStudy: saveMutation.mutate,
    saveCaseStudyAsync: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
    saveMutation,

    // Delete
    deleteCaseStudy: deleteMutation.mutate,
    deleteCaseStudyAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteMutation,

    // Import JSON
    importCaseStudies: importMutation.mutate,
    importCaseStudiesAsync: importMutation.mutateAsync,
    isImporting: importMutation.isPending,
    importMutation,

    // Bulk Delete
    bulkDeleteCaseStudies: bulkDeleteMutation.mutate,
    bulkDeleteCaseStudiesAsync: bulkDeleteMutation.mutateAsync,
    bulkDeleteAsync: bulkDeleteMutation.mutateAsync,
    isBulkDeleting: bulkDeleteMutation.isPending,
    bulkDeleteMutation,

    // Bulk Update
    bulkUpdateCaseStudies: bulkUpdateMutation.mutate,
    bulkUpdateCaseStudiesAsync: bulkUpdateMutation.mutateAsync,
    bulkUpdateAsync: bulkUpdateMutation.mutateAsync,
    isBulkUpdating: bulkUpdateMutation.isPending,
    bulkUpdateMutation,
  };
}
