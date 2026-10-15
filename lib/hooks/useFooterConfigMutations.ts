'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { FooterConfigData } from '@/lib/services/footer-config.service';
import type { HomeSectionModel } from '@/lib/services/home-section.service';
import { HOME_SECTIONS_QUERY_KEY } from './useHomeSectionMutations';

export const FOOTER_CONFIG_QUERY_KEY = ['admin', 'footer-config'] as const;

export interface UpdateFooterConfigVariables {
  data: FooterConfigData;
  isActive?: boolean;
  name?: string;
  description?: string;
}

export function useUpdateFooterConfigMutation(options?: {
  showToast?: boolean;
  onSuccess?: (data: HomeSectionModel) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: UpdateFooterConfigVariables) => {
      const res = await fetch('/api/admin/home/sections/footer-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật cấu hình chân trang thất bại');
      }

      return result.section as HomeSectionModel;
    },
    onSuccess: (data) => {
      if (showToast) {
        toast({
          body: 'Cập nhật thông tin Footer thành công!',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3500,
        });
      }
      queryClient.invalidateQueries({ queryKey: FOOTER_CONFIG_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: HOME_SECTIONS_QUERY_KEY });
      router.refresh();
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi khi cập nhật cấu hình Footer, vui lòng thử lại',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error);
    },
  });
}
