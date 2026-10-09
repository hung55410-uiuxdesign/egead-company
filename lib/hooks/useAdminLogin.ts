'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@astryxdesign/core';
import { authClient } from '@/lib/auth-client';

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface UseAdminLoginOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  showToast?: boolean;
}

/**
 * Hook mutation xử lý đăng nhập Admin qua Better Auth với TanStack Query và Astryx Toast
 */
export function useAdminLoginMutation(options?: UseAdminLoginOptions) {
  const router = useRouter();
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  return useMutation({
    mutationFn: async ({ email, password }: AdminLoginCredentials) => {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        throw new Error(
          result.error.message ||
          'Email hoặc mật khẩu không chính xác. Nếu chưa khởi tạo tài khoản, hãy nhấn nút "Khởi tạo tài khoản Admin" bên dưới.'
        );
      }

      return result.data;
    },
    onSuccess: () => {
      if (showToast) {
        toast({
          body: 'Đăng nhập thành công! Đang chuyển hướng vào bảng điều khiển...',
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3000,
        });
      }
      options?.onSuccess?.();
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 800);
    },
    onError: (error: Error) => {
      if (showToast) {
        toast({
          body: error.message,
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
 * Hook tiện ích đóng gói toàn bộ logic đăng nhập Admin với Astryx Toast
 */
export function useAdminLogin(options?: UseAdminLoginOptions) {
  const loginMutation = useAdminLoginMutation(options);

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error ? (loginMutation.error as Error).message : null,
    isSuccess: loginMutation.isSuccess,
    reset: loginMutation.reset,
    mutation: loginMutation,
  };
}
