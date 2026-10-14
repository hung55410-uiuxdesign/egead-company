'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { PartnerItemModel } from '@/lib/services/partner-item.service';

export const PARTNERS_QUERY_KEY = ['admin', 'partners'] as const;

export interface SavePartnerVariables {
  id?: string;
  slug: string;
  name: string;
  badge?: string | null;
  headline?: string | null;
  description?: string | null;
  bannerImage?: string | null;
  bannerFallback?: string | null;
  ctaText?: string | null;
  ctaHref?: string | null;

  advantagesSubtitle?: string | null;
  advantagesHeadline?: string | null;
  advantagesItems?: any[];

  expertiseSubtitle?: string | null;
  expertiseHeadline?: string | null;
  expertiseItems?: any[];

  whyTitlePrefix?: string | null;
  whyHeadline?: string | null;
  whyDescription?: string | null;
  whyItems?: any[];

  casesSubtitle?: string | null;
  casesHeadline?: string | null;
  casesItems?: any[];

  ctaHeadingPart1?: string | null;
  ctaHighlight?: string | null;
  ctaHeadingPart2?: string | null;
  ctaDescription?: string | null;
  ctaButtonText?: string | null;
  ctaButtonHref?: string | null;

  metaTitle?: string | null;
  metaDescription?: string | null;

  order?: number;
  status?: string;
}

export interface DeletePartnerVariables {
  id: string;
  name?: string;
}

export interface UsePartnerMutationsOptions {
  showToast?: boolean;
  onSaveSuccess?: (data: PartnerItemModel, isEditing: boolean) => void;
  onDeleteSuccess?: (id: string, name?: string) => void;
  onBulkDeleteSuccess?: (ids: string[], count: number) => void;
  onBulkUpdateSuccess?: (
    ids: string[],
    data: { status?: 'published' | 'draft'; badge?: string },
    count: number
  ) => void;
}

export function usePartnerMutations(options: UsePartnerMutationsOptions = {}) {
  const {
    showToast = true,
    onSaveSuccess,
    onDeleteSuccess,
    onBulkDeleteSuccess,
    onBulkUpdateSuccess,
  } = options;
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  const saveMutation = useMutation({
    mutationFn: async (variables: SavePartnerVariables): Promise<{
      data: PartnerItemModel;
      isEditing: boolean;
    }> => {
      const isEditing = Boolean(variables.id);
      const url = isEditing
        ? `/api/admin/partners/${variables.id}`
        : '/api/admin/partners';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Lỗi khi lưu thông tin đối tác');
      }

      return { data: json.item, isEditing };
    },
    onSuccess: ({ data, isEditing }) => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
      router.refresh();

      if (showToast) {
        toast({
          body: isEditing
            ? `Đối tác "${data.name}" đã được cập nhật thành công!`
            : `Đối tác "${data.name}" đã được tạo mới thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }

      if (onSaveSuccess) {
        onSaveSuccess(data, isEditing);
      }
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Có lỗi xảy ra, vui lòng thử lại.',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, name }: DeletePartnerVariables): Promise<{
      id: string;
      name?: string;
    }> => {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: 'DELETE',
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Lỗi khi xóa đối tác');
      }

      return { id, name };
    },
    onSuccess: ({ id, name }) => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
      router.refresh();

      if (showToast) {
        toast({
          body: name
            ? `Đối tác "${name}" đã được xóa khỏi hệ thống.`
            : 'Đối tác đã được xóa thành công.',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }

      if (onDeleteSuccess) {
        onDeleteSuccess(id, name);
      }
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Không thể xóa đối tác, vui lòng thử lại.',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
    },
  });

  const syncMenuMutation = useMutation({
    mutationFn: async (partners?: Array<{ name: string; href: string }>): Promise<{
      count: number;
      items: PartnerItemModel[];
    }> => {
      const res = await fetch('/api/admin/partners/sync-menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partners }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Lỗi khi đồng bộ đối tác từ Menu Header');
      }

      return json;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
      router.refresh();

      if (showToast) {
        toast({
          body: `Đã đồng bộ ${data.count} đối tác từ Menu Header thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Không thể đồng bộ từ Menu Header.',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: async ({ ids }: { ids: string[] }): Promise<{ count: number }> => {
      const res = await fetch('/api/admin/partners/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', ids }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Lỗi khi xóa các đối tác đã chọn');
      }

      return json;
    },
    onSuccess: (data, { ids }) => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
      router.refresh();

      if (showToast) {
        toast({
          body: `Đã xóa thành công ${data.count} đối tác!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }

      if (onBulkDeleteSuccess) {
        onBulkDeleteSuccess(ids, data.count);
      }
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Không thể xóa các đối tác đã chọn.',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: async ({
      ids,
      data,
    }: {
      ids: string[];
      data: { status?: 'published' | 'draft'; badge?: string };
    }): Promise<{ count: number }> => {
      const res = await fetch('/api/admin/partners/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', ids, data }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Lỗi khi cập nhật các đối tác đã chọn');
      }

      return json;
    },
    onSuccess: (resData, { ids, data }) => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
      router.refresh();

      if (showToast) {
        toast({
          body: `Đã cập nhật thành công ${resData.count} đối tác!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }

      if (onBulkUpdateSuccess) {
        onBulkUpdateSuccess(ids, data, resData.count);
      }
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Không thể cập nhật các đối tác đã chọn.',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
    },
  });

  return {
    savePartnerAsync: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
    saveError: saveMutation.error,

    deletePartnerAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,

    syncMenuAsync: syncMenuMutation.mutateAsync,
    isSyncingMenu: syncMenuMutation.isPending,

    bulkDeletePartnersAsync: bulkDeleteMutation.mutateAsync,
    isBulkDeleting: bulkDeleteMutation.isPending,

    bulkUpdatePartnersAsync: bulkUpdateMutation.mutateAsync,
    isBulkUpdating: bulkUpdateMutation.isPending,
  };
}

/**
 * Hook mutation import danh sách đối tác từ file JSON với TanStack Query và Astryx Toast
 */
export function useImportPartnersMutation(options?: {
  showToast?: boolean;
  onSuccess?: (data: { count: number; items: PartnerItemModel[] }) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({
      items,
      onDuplicate = 'rename',
    }: {
      items: any[];
      onDuplicate?: 'rename' | 'update';
    }): Promise<{ count: number; items: PartnerItemModel[] }> => {
      const res = await fetch('/api/admin/partners/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, onDuplicate }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Import đối tác thất bại');
      }

      return { count: result.count as number, items: result.items as PartnerItemModel[] };
    },
    onSuccess: (data) => {
      if (showToast) {
        toast({
          body: `Đã thêm thành công ${data.count} đối tác vào hệ thống!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi import đối tác, vui lòng kiểm tra lại file JSON',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 5000,
        });
      }
      options?.onError?.(error);
    },
  });
}
