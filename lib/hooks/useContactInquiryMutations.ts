'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { ContactInquiryStatus, ContactInquiry } from '@/types/contact';

export const CONTACT_INQUIRIES_QUERY_KEY = ['admin', 'contacts'] as const;

export interface SubmitContactInquiryVariables {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone?: string;
  region: string;
  message: string;
}

export interface UpdateInquiryStatusVariables {
  id: string;
  status: ContactInquiryStatus;
  clientName?: string;
}

export interface UpdateInquiryNotesVariables {
  id: string;
  notes: string;
  status?: ContactInquiryStatus;
  clientName?: string;
}

export interface DeleteInquiryVariables {
  id: string;
  clientName?: string;
}

export interface UseContactInquiryMutationsOptions {
  showToast?: boolean;
  onStatusChangeSuccess?: (id: string, status: ContactInquiryStatus) => void;
  onSaveNotesSuccess?: (id: string, notes: string) => void;
  onDeleteSuccess?: (id: string, clientName?: string) => void;
  onSubmitSuccess?: (data: ContactInquiry) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook mutation gửi yêu cầu liên hệ mới từ biểu mẫu phía người dùng với TanStack Query
 */
export function useSubmitContactInquiryMutation(options?: {
  onSuccess?: (data: ContactInquiry) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: SubmitContactInquiryVariables) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Đã có lỗi xảy ra khi gửi thông tin liên hệ');
      }

      return result.data as ContactInquiry;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CONTACT_INQUIRIES_QUERY_KEY });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

/**
 * Hook tiện ích cho biểu mẫu gửi liên hệ
 */
export function useSubmitContactInquiry(options?: {
  onSuccess?: (data: ContactInquiry) => void;
  onError?: (error: Error) => void;
}) {
  const mutation = useSubmitContactInquiryMutation(options);

  return {
    submit: mutation.mutate,
    submitAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
    data: mutation.data,
    mutation,
  };
}

export function useUpdateInquiryStatusMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, status: ContactInquiryStatus) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, status }: UpdateInquiryStatusVariables) => {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật trạng thái thất bại');
      }

      return { id, status, data: result.data };
    },
    onSuccess: ({ id, status }) => {
      if (showToast) {
        toast({
          body: 'Đã cập nhật trạng thái yêu cầu liên hệ thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CONTACT_INQUIRIES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, status);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi cập nhật trạng thái',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}

export function useUpdateInquiryNotesMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, notes: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, notes, status }: UpdateInquiryNotesVariables) => {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes, status }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Lưu ghi chú thất bại');
      }

      return { id, notes, data: result.data };
    },
    onSuccess: ({ id, notes }) => {
      if (showToast) {
        toast({
          body: 'Đã lưu ghi chú nội bộ thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CONTACT_INQUIRIES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, notes);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi lưu ghi chú',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}

export function useDeleteInquiryMutation(options?: {
  showToast?: boolean;
  onSuccess?: (id: string, clientName?: string) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ id, clientName }: DeleteInquiryVariables) => {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Xoá yêu cầu liên hệ thất bại');
      }

      return { id, clientName };
    },
    onSuccess: ({ id, clientName }) => {
      if (showToast) {
        toast({
          body: clientName
            ? `Đã xoá yêu cầu liên hệ của "${clientName}" thành công.`
            : 'Đã xoá yêu cầu liên hệ thành công.',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: CONTACT_INQUIRIES_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(id, clientName);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi xoá yêu cầu liên hệ',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}

export function useContactInquiryMutations(
  options?: UseContactInquiryMutationsOptions
) {
  const updateStatusMutation = useUpdateInquiryStatusMutation({
    showToast: options?.showToast,
    onSuccess: options?.onStatusChangeSuccess,
    onError: options?.onError,
  });

  const updateNotesMutation = useUpdateInquiryNotesMutation({
    showToast: options?.showToast,
    onSuccess: options?.onSaveNotesSuccess,
    onError: options?.onError,
  });

  const deleteMutation = useDeleteInquiryMutation({
    showToast: options?.showToast,
    onSuccess: options?.onDeleteSuccess,
    onError: options?.onError,
  });

  const submitMutation = useSubmitContactInquiryMutation({
    onSuccess: options?.onSubmitSuccess,
    onError: options?.onError,
  });

  return {
    updateStatus: updateStatusMutation.mutate,
    updateStatusAsync: updateStatusMutation.mutateAsync,
    isUpdatingStatus: updateStatusMutation.isPending,
    updateStatusMutation,

    saveNotes: updateNotesMutation.mutate,
    saveNotesAsync: updateNotesMutation.mutateAsync,
    isSavingNotes: updateNotesMutation.isPending,
    updateNotesMutation,

    deleteInquiry: deleteMutation.mutate,
    deleteInquiryAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteMutation,

    submitInquiry: submitMutation.mutate,
    submitInquiryAsync: submitMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
    submitMutation,
  };
}
