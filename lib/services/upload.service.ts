import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export interface UploadOptions {
  folder?: string;
  tags?: string[];
  transformation?: {
    quality?: string | number;
    fetch_format?: string;
  };
}

export interface FileValidation {
  valid: boolean;
  error?: string;
}

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
];

/**
 * Validates an image file by size and mime type
 */
export function validateImageFile(file: { size: number; type: string }): FileValidation {
  if (!file.type || !ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Định dạng tệp "${file.type || 'unknown'}" không được hỗ trợ. Vui lòng chọn ảnh JPG, PNG, WebP, GIF, SVG hoặc AVIF.`,
    };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Kích thước ảnh (${sizeMb}MB) vượt quá giới hạn tối đa cho phép là 10MB.`,
    };
  }

  return { valid: true };
}

/**
 * Uploads an image buffer directly to Cloudinary
 */
export async function uploadImageBuffer(
  buffer: Buffer,
  options?: UploadOptions
): Promise<UploadResult> {
  const folder = options?.folder || 'egead_cms/blogs';

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        tags: options?.tags || ['egead-cms', 'blog'],
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          reject(new Error(error?.message || 'Không thể tải ảnh lên Cloudinary'));
        } else {
          resolve({
            url: result.url,
            secureUrl: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Uploads a base64 encoded image or remote URL to Cloudinary
 */
export async function uploadBase64OrUrl(
  dataUriOrUrl: string,
  options?: UploadOptions
): Promise<UploadResult> {
  const folder = options?.folder || 'egead_cms/blogs';

  const result: UploadApiResponse = await cloudinary.uploader.upload(dataUriOrUrl, {
    folder,
    resource_type: 'image',
    tags: options?.tags || ['egead-cms', 'blog'],
  });

  return {
    url: result.url,
    secureUrl: result.secure_url,
    publicId: result.public_id,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
  };
}

/**
 * Deletes an image from Cloudinary by its publicId
 */
export async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch {
    return false;
  }
}
