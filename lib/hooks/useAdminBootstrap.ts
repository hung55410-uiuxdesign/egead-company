'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@astryxdesign/core';

export interface BootstrapStatusData {
  success: boolean;
  dbConnected: boolean;
  tableExists?: boolean;
  dbError?: string | null;
  initialized: boolean;
  defaultCredentials?: {
    email: string;
    password: string;
  };
}

export interface BootstrapMutationResponse {
  success: boolean;
  created?: boolean;
  user?: {
    id: string;
    email: string;
    name?: string | null;
  };
  error?: string;
}

export interface UseAdminBootstrapOptions {
  showToast?: boolean;
  onBootstrapSuccess?: (data: BootstrapMutationResponse) => void;
  onBootstrapError?: (error: Error) => void;
}

export const ADMIN_BOOTSTRAP_QUERY_KEY = ['admin', 'bootstrap'] as const;

/**
 * Hook truy vấn trạng thái kết nối Database và khởi tạo Admin
 */
export function useAdminBootstrapStatus() {
  return useQuery({
    queryKey: ADMIN_BOOTSTRAP_QUERY_KEY,
    queryFn: async (): Promise<BootstrapStatusData> => {
      const res = await fetch('/api/admin/bootstrap');
      const data = await res.json();
      if (!res.ok && !data) {
        throw new Error('Không thể kết nối đến máy chủ API bootstrap');
      }
      return data;
    },
    staleTime: 30 * 1000,
    retry: 1,
  });
}

/**
 * Hook mutation thực hiện khởi tạo tài khoản admin và cấu trúc bảng (Seed) có tích hợp Astryx Toast
 */
export function useBootstrapAdminMutation(options?: {
  showToast?: boolean;
  onSuccess?: (data: BootstrapMutationResponse) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (): Promise<BootstrapMutationResponse> => {
      const res = await fetch('/api/admin/bootstrap', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Khởi tạo tài khoản quản trị thất bại');
      }
      return data;
    },
    onSuccess: (data) => {
      // Tự động làm mới trạng thái bootstrap sau khi seed
      queryClient.invalidateQueries({ queryKey: ADMIN_BOOTSTRAP_QUERY_KEY });

      if (showToast) {
        toast({
          body: data.created
            ? 'Khởi tạo cấu trúc bảng & tài khoản Admin thành công! Bạn có thể đăng nhập ngay.'
            : 'Tài khoản Admin đã sẵn sàng trong Database.',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi khởi tạo tài khoản quản trị.',
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
 * Hook tiện ích tổng hợp toàn bộ trạng thái DB và hành động Bootstrap tích hợp Astryx Toast
 */
export function useAdminBootstrap(options?: UseAdminBootstrapOptions) {
  const statusQuery = useAdminBootstrapStatus();
  const mutation = useBootstrapAdminMutation({
    showToast: options?.showToast,
    onSuccess: options?.onBootstrapSuccess,
    onError: options?.onBootstrapError,
  });

  const dbStatus = {
    dbConnected: Boolean(statusQuery.data?.dbConnected),
    dbError: statusQuery.data?.dbError || null,
    initialized: Boolean(statusQuery.data?.initialized),
  };

  return {
    dbStatus,
    checkingDb: statusQuery.isLoading,
    checkStatus: statusQuery.refetch,
    bootstrapAdmin: mutation.mutate,
    bootstrapAdminAsync: mutation.mutateAsync,
    isBootstrapping: mutation.isPending,
    bootstrapError: mutation.error ? (mutation.error as Error).message : null,
    query: statusQuery,
    mutation,
  };
}
