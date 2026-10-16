'use client';

import { useMutation } from '@tanstack/react-query';
import { useToast } from '@astryxdesign/core';

export interface UploadMediaVariables {
  file: File;
  folder?: string;
}

export interface UploadMediaResponse {
  success: boolean;
  url: string;
  publicId?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  resourceType?: 'image' | 'video' | string;
  duration?: number;
  error?: string;
}

export interface UseUploadMediaOptions {
  /** Thư mục Cloudinary mặc định nếu không truyền khi gọi upload */
  defaultFolder?: string;
  /** Bật/tắt hiển thị toast tự động qua Astryx useToast (mặc định: true) */
  showToast?: boolean;
  /** Thông điệp toast khi upload thành công (mặc định: tự động theo ảnh/video) */
  successMessage?: string;
  /** Hàm kiểm tra file trước khi tải (trả về chuỗi thông báo lỗi hoặc null nếu hợp lệ) */
  validate?: (file: File) => string | null | undefined;
  /** Callback khi upload thành công */
  onSuccess?: (data: UploadMediaResponse, variables: UploadMediaVariables) => void;
  /** Callback khi upload thất bại */
  onError?: (error: Error, variables: UploadMediaVariables) => void;
}

/**
 * Hook upload hình ảnh / video lên Cloudinary qua API route `/api/admin/upload`
 * Tích hợp TanStack Query và thông báo Astryx Toast
 */
export function useUploadMedia(options?: UseUploadMediaOptions) {
  const toast = useToast();
  const showToast = options?.showToast ?? true;

  const mutation = useMutation<UploadMediaResponse, Error, UploadMediaVariables>({
    mutationFn: async ({ file, folder }: UploadMediaVariables) => {
      // Client-side validation nếu có cấu hình
      if (options?.validate) {
        const validationError = options.validate(file);
        if (validationError) {
          throw new Error(validationError);
        }
      }

      const targetFolder = folder || options?.defaultFolder || 'egead_cms/media';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', targetFolder);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = (await res.json()) as UploadMediaResponse;

      if (!res.ok || !data.success || !data.url) {
        throw new Error(data.error || 'Tải tệp lên máy chủ thất bại');
      }

      return data;
    },
    onSuccess: (data, variables) => {
      if (showToast) {
        const isVideo =
          data.resourceType === 'video' ||
          data.url.endsWith('.mp4') ||
          data.url.endsWith('.webm') ||
          data.url.includes('/video/');
        const defaultMsg = isVideo ? 'Tải video lên thành công!' : 'Tải tệp đa phương tiện thành công!';

        toast({
          body: options?.successMessage || defaultMsg,
          type: 'info',
          isAutoHide: true,
          autoHideDuration: 3000,
        });
      }
      options?.onSuccess?.(data, variables);
    },
    onError: (error: Error, variables) => {
      if (showToast) {
        toast({
          body: error.message || 'Lỗi kết nối khi tải tệp lên Cloudinary',
          type: 'error',
          isAutoHide: true,
          autoHideDuration: 4000,
        });
      }
      options?.onError?.(error, variables);
    },
  });

  const uploadFile = (file: File, folder?: string) => {
    return mutation.mutate({ file, folder });
  };

  const uploadFileAsync = (file: File, folder?: string) => {
    return mutation.mutateAsync({ file, folder });
  };

  return {
    /** Hàm mutation nhận object { file, folder } */
    upload: mutation.mutate,
    /** Hàm async mutation nhận object { file, folder } */
    uploadAsync: mutation.mutateAsync,
    /** Helper tiện ích gọi thẳng bằng file và folder tùy chọn */
    uploadFile,
    /** Helper async tiện ích gọi thẳng bằng file và folder tùy chọn */
    uploadFileAsync,
    /** Trạng thái đang tải */
    isUploading: mutation.isPending,
    /** Thông báo lỗi nếu có */
    error: mutation.error?.message ?? null,
    /** Dữ liệu phản hồi upload gần nhất */
    data: mutation.data,
    /** Hàm đặt lại trạng thái mutation */
    reset: mutation.reset,
    /** Đối tượng mutation gốc của TanStack Query */
    mutation,
  };
}

/**
 * Bí danh tiện ích của useUploadMedia
 */
export const useFileUpload = useUploadMedia;
