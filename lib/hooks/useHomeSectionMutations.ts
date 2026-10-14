'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { HomeSectionModel } from '@/lib/services/home-section.service';

export const HOME_SECTIONS_QUERY_KEY = ['admin', 'home-sections'] as const;

export interface UpdateHomeSectionVariables {
  key: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  data?: any;
  isActive?: boolean;
  order?: number;
}

export function useUpdateHomeSectionMutation(options?: {
  showToast?: boolean;
  redirectTo?: string;
  onSuccess?: (data: HomeSectionModel) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: UpdateHomeSectionVariables) => {
      const res = await fetch(`/api/admin/home/sections/${payload.key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật section trang chủ thất bại');
      }

      return result.section as HomeSectionModel;
    },
    onSuccess: (data) => {
      if (showToast) {
        toast({
          body: `Cập nhật section "${data.name}" thành công!`,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: HOME_SECTIONS_QUERY_KEY });
      if (options?.redirectTo !== undefined) {
        if (options.redirectTo) {
          setTimeout(() => {
            router.push(options.redirectTo!);
            router.refresh();
          }, 600);
        }
      } else {
        router.refresh();
      }
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi cập nhật section, vui lòng thử lại',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}
