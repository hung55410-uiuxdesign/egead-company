'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import type { CompanySectionModel } from '@/lib/services/company-section.service';

export const COMPANY_SECTIONS_QUERY_KEY = ['admin', 'company-sections'] as const;

export interface UpdateCompanySectionVariables {
  key: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  data?: any;
  isActive?: boolean;
  order?: number;
}

export function useUpdateCompanySectionMutation(options?: {
  showToast?: boolean;
  redirectTo?: string;
  onSuccess?: (data: CompanySectionModel) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async (payload: UpdateCompanySectionVariables) => {
      const res = await fetch(`/api/admin/company/sections/${payload.key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Cập nhật section trang company thất bại');
      }

      return result.section as CompanySectionModel;
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
      queryClient.invalidateQueries({ queryKey: COMPANY_SECTIONS_QUERY_KEY });
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
