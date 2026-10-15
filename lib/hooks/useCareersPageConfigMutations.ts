'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { CareersPageConfigData } from '@/lib/services/careers-page-config.service';

export const CAREERS_PAGE_CONFIG_QUERY_KEY = ['admin', 'careers-page-config'] as const;

export interface UpdateCareersPageConfigVariables {
  data: CareersPageConfigData;
}

export function useCareersPageConfigQuery(initialData?: CareersPageConfigData) {
  return useQuery({
    queryKey: CAREERS_PAGE_CONFIG_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch('/api/admin/careers-page');
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Không thể tải cấu hình');
      }
      return result.config as CareersPageConfigData;
    },
    initialData,
  });
}

export function useUpdateCareersPageConfigMutation(options?: {
  showToast?: boolean;
  onSuccess?: (data: CareersPageConfigData) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: UpdateCareersPageConfigVariables) => {
      const res = await fetch('/api/admin/careers-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật cấu hình thất bại');
      }

      return result.config as CareersPageConfigData;
    },
    onSuccess: (data) => {
      if (showToast) {
        toast({
          body: 'Cập nhật nội dung trang tuyển dụng thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }

      queryClient.setQueryData(CAREERS_PAGE_CONFIG_QUERY_KEY, data);
      queryClient.invalidateQueries({ queryKey: CAREERS_PAGE_CONFIG_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: `Lỗi cập nhật: ${error.message}`,
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 5000,
        });
      }
      options?.onError?.(error);
    },
  });
}
