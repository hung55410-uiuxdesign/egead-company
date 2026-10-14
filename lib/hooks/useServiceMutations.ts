'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { ServiceItemDetailModel } from '@/lib/services/service-item.service';

export const SERVICES_QUERY_KEY = ['admin', 'services'] as const;

export interface SaveServiceVariables {
  id?: string;
  slug: string;
  category: string;
  title: string;
  tagline: string;
  subtitle: string;
  heroImage?: string | null;
  middleImage?: string | null;
  overviewSubTitle?: string | null;
  overviewHeading?: string | null;
  overviewParagraphs: string[];
  approachHeading?: string | null;
  approachIntro?: string | null;
  principles?: Array<{
    title: string;
    description: string;
  }>;
  order: number;
  status: string;
}

export interface DeleteServiceVariables {
  id: string;
  title?: string;
}

export interface ImportServicesVariables {
  items: any[];
  onDuplicate?: 'rename' | 'update';
}

export interface BulkDeleteServicesVariables {
  ids: string[];
}

export interface BulkUpdateServicesVariables {
  ids: string[];
  data: {
    status?: 'published' | 'draft';
    category?: 'service' | 'industry';
  };
}

export interface UseServiceMutationsOptions {
  showToast?: boolean;
  onSaveSuccess?: (data: ServiceItemDetailModel, isEditing: boolean) => void;
  onDeleteSuccess?: (id: string, title?: string) => void;
  onImportSuccess?: (data: { count: number; items: any[] }) => void;
  onBulkDeleteSuccess?: (ids: string[], count: number) => void;
  onBulkUpdateSuccess?: (
    ids: string[],
    data: { status?: 'published' | 'draft'; category?: 'service' | 'industry' },
    count: number
  ) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook mutation lưu dịch vụ / ngành nghề (thêm mới hoặc cập nhật theo section) với TanStack Query và Astryx Toast
 */
export function useSaveServiceMutation(options?: {
  showToast?: boolean;
  redirectTo?: string;
  onSuccess?: (data: ServiceItemDetailModel, isEditing: boolean) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: SaveServiceVariables) => {
      const isEditing = Boolean(payload.id);
      const url = isEditing
        ? `/api/admin/services/${payload.id}`
        : '/api/admin/services';
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
            (isEditing ? 'Cập nhật dịch vụ thất bại' : 'Tạo dịch vụ mới thất bại')
        );
      }

      return { data: result.item as ServiceItemDetailModel, isEditing };
    },
    onSuccess: ({ data, isEditing }) => {
      if (showToast) {
        toast({
          body: isEditing
            ? `Cập nhật dịch vụ "${data.title}" thành công!`
            : `Đã thêm dịch vụ "${data.title}" thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
      if (options?.redirectTo !== undefined) {
        if (options.redirectTo) {
          setTimeout(() => {
            router.push(options.redirectTo!);
            router.refresh();
          }, 600);
        }
      } else {
        setTimeout(() => {
          router.push('/admin/services');
          router.refresh();
        }, 600);
      }
      options?.onSuccess?.(data, isEditing);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi lưu dịch vụ, vui lòng thử lại',
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
 * Hook mutation xóa một dịch vụ với TanStack Query và Astryx Toast
 */
export function useDeleteServiceMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, title?: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, title }: DeleteServiceVariables) => {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa dịch vụ thất bại');
      }
      return { id, title };
    },
    onSuccess: ({ id, title }) => {
      if (showToast) {
        toast({
          body: title
            ? `Đã xóa dịch vụ "${title}" thành công!`
            : 'Đã xóa dịch vụ thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, title);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa dịch vụ, vui lòng thử lại',
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
 * Hook mutation import danh sách dịch vụ từ file JSON với TanStack Query và Astryx Toast
 */
export function useImportServicesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (data: { count: number; items: any[] }) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ items, onDuplicate = 'rename' }: ImportServicesVariables) => {
      const res = await fetch('/api/admin/services/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, onDuplicate }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Import dịch vụ thất bại');
      }

      return { count: result.count as number, items: result.items as any[] };
    },
    onSuccess: (data) => {
      if (showToast) {
        toast({
          body: `Đã thêm thành công ${data.count} mục vào hệ thống!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi import dịch vụ, vui lòng kiểm tra lại file JSON',
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
 * Hook mutation xóa hàng loạt dịch vụ với TanStack Query và Astryx Toast
 */
export function useBulkDeleteServicesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (ids: string[], count: number) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids }: BulkDeleteServicesVariables) => {
      const res = await fetch('/api/admin/services/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', ids }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa hàng loạt dịch vụ thất bại');
      }
      return { ids, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, count }) => {
      if (showToast) {
        toast({
          body: `Đã xóa thành công ${count} mục đã chọn!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, count);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa hàng loạt dịch vụ',
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
 * Hook mutation cập nhật hàng loạt dịch vụ với TanStack Query và Astryx Toast
 */
export function useBulkUpdateServicesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (
    ids: string[],
    data: { status?: 'published' | 'draft'; category?: 'service' | 'industry' },
    count: number
  ) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids, data }: BulkUpdateServicesVariables) => {
      const res = await fetch('/api/admin/services/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', ids, data }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật hàng loạt dịch vụ thất bại');
      }
      return { ids, data, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, data, count }) => {
      if (showToast) {
        toast({
          body: `Đã cập nhật thành công ${count} mục đã chọn!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, data, count);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi cập nhật hàng loạt dịch vụ',
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
 * Hook tổng hợp quản lý các thao tác mutation cho Services & Industries
 */
export function useServiceMutations(options?: UseServiceMutationsOptions) {
  const saveMutation = useSaveServiceMutation({
    showToast: options?.showToast,
    onSuccess: options?.onSaveSuccess,
    onError: options?.onError,
  });

  const deleteMutation = useDeleteServiceMutation({
    showToast: options?.showToast,
    onSuccess: options?.onDeleteSuccess,
    onError: options?.onError,
  });

  const importMutation = useImportServicesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onImportSuccess,
    onError: options?.onError,
  });

  const bulkDeleteMutation = useBulkDeleteServicesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkDeleteSuccess,
    onError: options?.onError,
  });

  const bulkUpdateMutation = useBulkUpdateServicesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkUpdateSuccess,
    onError: options?.onError,
  });

  return {
    // Save (Create or Update)
    saveService: saveMutation.mutate,
    saveServiceAsync: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
    saveMutation,

    // Delete
    deleteService: deleteMutation.mutate,
    deleteServiceAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteMutation,

    // Import JSON
    importServices: importMutation.mutate,
    importServicesAsync: importMutation.mutateAsync,
    isImporting: importMutation.isPending,
    importMutation,

    // Bulk Delete
    bulkDeleteServices: bulkDeleteMutation.mutate,
    bulkDeleteServicesAsync: bulkDeleteMutation.mutateAsync,
    bulkDeleteAsync: bulkDeleteMutation.mutateAsync,
    isBulkDeleting: bulkDeleteMutation.isPending,
    bulkDeleteMutation,

    // Bulk Update
    bulkUpdateServices: bulkUpdateMutation.mutate,
    bulkUpdateServicesAsync: bulkUpdateMutation.mutateAsync,
    bulkUpdateAsync: bulkUpdateMutation.mutateAsync,
    isBulkUpdating: bulkUpdateMutation.isPending,
    bulkUpdateMutation,
  };
}
