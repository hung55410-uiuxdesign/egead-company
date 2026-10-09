'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { ApplicationStatus, JobApplication } from '@/types/career';

export const CAREER_APPLICATIONS_QUERY_KEY = ['admin', 'careers', 'applications'] as const;

export interface UpdateApplicationStatusVariables {
  id: string;
  status: ApplicationStatus;
  candidateName?: string;
}

export interface UpdateApplicationNotesVariables {
  id: string;
  status?: ApplicationStatus;
  notes: string;
  candidateName?: string;
}

export interface DeleteApplicationVariables {
  id: string;
  candidateName?: string;
}

export interface SubmitApplicationVariables {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  cvUrl: string;
  portfolioUrl?: string;
  expectedSalary?: string;
  experienceYears?: string;
  startDate?: string;
  coverLetter?: string;
}

export interface UseCareerApplicationMutationsOptions {
  showToast?: boolean;
  onStatusChangeSuccess?: (id: string, status: ApplicationStatus) => void;
  onSaveNotesSuccess?: (id: string, notes: string) => void;
  onDeleteSuccess?: (id: string, candidateName?: string) => void;
  onSubmitSuccess?: (data: JobApplication) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook mutation cập nhật trạng thái của hồ sơ ứng tuyển với TanStack Query và Astryx Toast
 */
export function useUpdateApplicationStatusMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, status: ApplicationStatus) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, status }: UpdateApplicationStatusVariables) => {
      const res = await fetch(`/api/admin/careers/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật trạng thái hồ sơ thất bại');
      }

      return { id, status, data: result.data };
    },
    onSuccess: ({ id, status }) => {
      if (showToast) {
        toast({
          body: 'Đã cập nhật trạng thái hồ sơ ứng tuyển thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CAREER_APPLICATIONS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, status);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi cập nhật trạng thái hồ sơ ứng tuyển',
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
 * Hook mutation lưu ghi chú nội bộ cho hồ sơ ứng tuyển với TanStack Query và Astryx Toast
 */
export function useUpdateApplicationNotesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, notes: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, status, notes }: UpdateApplicationNotesVariables) => {
      const res = await fetch(`/api/admin/careers/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Lưu ghi chú tuyển dụng thất bại');
      }

      return { id, notes, data: result.data };
    },
    onSuccess: ({ id, notes }) => {
      if (showToast) {
        toast({
          body: 'Đã lưu ghi chú tuyển dụng thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CAREER_APPLICATIONS_QUERY_KEY });
      options?.onSuccess?.(id, notes);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi lưu ghi chú tuyển dụng',
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
 * Hook mutation xoá hồ sơ ứng tuyển với TanStack Query và Astryx Toast
 */
export function useDeleteApplicationMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, candidateName?: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, candidateName }: DeleteApplicationVariables) => {
      const res = await fetch(`/api/admin/careers/applications/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xoá hồ sơ ứng tuyển thất bại');
      }

      return { id, candidateName };
    },
    onSuccess: ({ id, candidateName }) => {
      if (showToast) {
        toast({
          body: candidateName
            ? `Đã xoá hồ sơ của "${candidateName}" thành công!`
            : 'Đã xoá hồ sơ ứng tuyển thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CAREER_APPLICATIONS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, candidateName);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xoá hồ sơ ứng tuyển',
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
 * Hook mutation gửi hồ sơ ứng tuyển mới (test submit hoặc public form)
 */
export function useSubmitApplicationMutation(options?: {
  showToast?: boolean;
  onSuccess?: (data: JobApplication) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: SubmitApplicationVariables) => {
      const res = await fetch('/api/admin/careers/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Gửi form ứng tuyển thất bại');
      }

      return result.data as JobApplication;
    },
    onSuccess: (data) => {
      if (showToast) {
        toast({
          body: 'Đã gửi hồ sơ ứng tuyển thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CAREER_APPLICATIONS_QUERY_KEY });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi gửi hồ sơ ứng tuyển',
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
 * Hook tổng hợp quản lý các thao tác mutation cho hồ sơ ứng tuyển
 */
export function useCareerApplicationMutations(options?: UseCareerApplicationMutationsOptions) {
  const updateStatusMutation = useUpdateApplicationStatusMutation({
    showToast: options?.showToast,
    onSuccess: options?.onStatusChangeSuccess,
    onError: options?.onError,
  });

  const updateNotesMutation = useUpdateApplicationNotesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onSaveNotesSuccess,
    onError: options?.onError,
  });

  const deleteMutation = useDeleteApplicationMutation({
    showToast: options?.showToast,
    onSuccess: options?.onDeleteSuccess,
    onError: options?.onError,
  });

  const submitMutation = useSubmitApplicationMutation({
    showToast: options?.showToast,
    onSuccess: options?.onSubmitSuccess,
    onError: options?.onError,
  });

  return {
    // Update status
    updateStatus: updateStatusMutation.mutate,
    updateStatusAsync: updateStatusMutation.mutateAsync,
    isUpdatingStatus: updateStatusMutation.isPending,
    updateStatusMutation,

    // Update notes
    saveNotes: updateNotesMutation.mutate,
    saveNotesAsync: updateNotesMutation.mutateAsync,
    isSavingNotes: updateNotesMutation.isPending,
    updateNotesMutation,

    // Delete
    deleteApplication: deleteMutation.mutate,
    deleteApplicationAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteMutation,

    // Submit
    submitApplication: submitMutation.mutate,
    submitApplicationAsync: submitMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
    submitMutation,
  };
}
