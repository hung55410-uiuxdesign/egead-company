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

export interface UseCaseStudyMutationsOptions {
  showToast?: boolean;
  onSaveSuccess?: (data: CaseStudyDetailModel, isEditing: boolean) => void;
  onDeleteSuccess?: (id: string, title?: string) => void;
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
  };
}
