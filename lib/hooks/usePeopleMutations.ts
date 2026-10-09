'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { AdminTeamMember } from '@/lib/services/people.service';

export const PEOPLE_QUERY_KEY = ['admin', 'people'] as const;

export interface SavePersonVariables {
  id?: string;
  name: string;
  role: string;
  department: string;
  location: string;
  quote?: string | null;
  image: string;
  linkedin?: string | null;
  bio: string;
  skills: string[];
  isLeader: boolean;
  order: number;
  status: 'published' | 'draft' | 'archived';
}

export interface DeletePersonVariables {
  id: string;
  name?: string;
}

export interface BulkDeletePeopleVariables {
  ids: string[];
}

export interface BulkUpdatePeopleVariables {
  ids: string[];
  data: {
    status?: 'published' | 'draft' | 'archived';
    department?: string;
  };
}

export interface UsePeopleMutationsOptions {
  showToast?: boolean;
  onSaveSuccess?: (data: AdminTeamMember, isEditing: boolean) => void;
  onDeleteSuccess?: (id: string, name?: string) => void;
  onBulkDeleteSuccess?: (ids: string[], count: number) => void;
  onBulkUpdateSuccess?: (
    ids: string[],
    data: { status?: 'published' | 'draft' | 'archived'; department?: string },
    count: number
  ) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook mutation lưu nhân sự (tạo mới hoặc cập nhật) với TanStack Query và Astryx Toast
 */
export function useSavePersonMutation(options?: {
  showToast?: boolean;
  redirectTo?: string;
  onSuccess?: (data: AdminTeamMember, isEditing: boolean) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: SavePersonVariables) => {
      const isEditing = Boolean(payload.id);
      const url = isEditing
        ? `/api/admin/people/${payload.id}`
        : '/api/admin/people';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(
          result.error || (isEditing ? 'Cập nhật nhân sự thất bại' : 'Tạo nhân sự mới thất bại')
        );
      }

      return { data: result.data as AdminTeamMember, isEditing };
    },
    onSuccess: ({ data, isEditing }) => {
      if (showToast) {
        toast({
          body: isEditing
            ? `Cập nhật nhân sự "${data.name}" thành công!`
            : `Đã thêm nhân sự "${data.name}" thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: PEOPLE_QUERY_KEY });
      if (options?.redirectTo !== undefined) {
        if (options.redirectTo) {
          setTimeout(() => {
            router.push(options.redirectTo!);
            router.refresh();
          }, 600);
        }
      } else {
        setTimeout(() => {
          router.push('/admin/people');
          router.refresh();
        }, 600);
      }
      options?.onSuccess?.(data, isEditing);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi lưu nhân sự, vui lòng thử lại',
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
 * Hook mutation xóa một nhân sự với TanStack Query và Astryx Toast
 */
export function useDeletePersonMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, name?: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, name }: DeletePersonVariables) => {
      const res = await fetch(`/api/admin/people/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa nhân sự thất bại');
      }
      return { id, name };
    },
    onSuccess: ({ id, name }) => {
      if (showToast) {
        toast({
          body: name
            ? `Đã xóa nhân sự "${name}" thành công!`
            : 'Đã xóa nhân sự thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: PEOPLE_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, name);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa nhân sự, vui lòng thử lại',
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
 * Hook mutation xóa hàng loạt nhân sự với TanStack Query và Astryx Toast
 */
export function useBulkDeletePeopleMutation(options?: {
  showToast?: boolean;
  onSuccess?: (ids: string[], count: number) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids }: BulkDeletePeopleVariables) => {
      const res = await fetch('/api/admin/people/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', ids }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xóa hàng loạt nhân sự thất bại');
      }
      return { ids, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, count }) => {
      if (showToast) {
        toast({
          body: `Đã xóa thành công ${count} nhân sự đã chọn!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: PEOPLE_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, count);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xóa hàng loạt nhân sự',
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
 * Hook mutation cập nhật hàng loạt nhân sự với TanStack Query và Astryx Toast
 */
export function useBulkUpdatePeopleMutation(options?: {
  showToast?: boolean;
  onSuccess?: (
    ids: string[],
    data: { status?: 'published' | 'draft' | 'archived'; department?: string },
    count: number
  ) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ ids, data }: BulkUpdatePeopleVariables) => {
      const res = await fetch('/api/admin/people/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', ids, data }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật hàng loạt nhân sự thất bại');
      }
      return { ids, data, count: (result.count as number) || ids.length };
    },
    onSuccess: ({ ids, data, count }) => {
      if (showToast) {
        toast({
          body: `Đã cập nhật thông tin cho ${count} nhân sự thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: PEOPLE_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(ids, data, count);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi cập nhật hàng loạt nhân sự',
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
 * Hook tổng hợp quản lý các thao tác mutation cho nhân sự
 */
export function usePeopleMutations(options?: UsePeopleMutationsOptions) {
  const saveMutation = useSavePersonMutation({
    showToast: options?.showToast,
    onSuccess: options?.onSaveSuccess,
    onError: options?.onError,
  });

  const deleteMutation = useDeletePersonMutation({
    showToast: options?.showToast,
    onSuccess: options?.onDeleteSuccess,
    onError: options?.onError,
  });

  const bulkDeleteMutation = useBulkDeletePeopleMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkDeleteSuccess,
    onError: options?.onError,
  });

  const bulkUpdateMutation = useBulkUpdatePeopleMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBulkUpdateSuccess,
    onError: options?.onError,
  });

  return {
    // Save (Create or Update)
    savePerson: saveMutation.mutate,
    savePersonAsync: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
    saveMutation,

    // Delete
    deletePerson: deleteMutation.mutate,
    deletePersonAsync: deleteMutation.mutateAsync,
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
