import fs from 'fs/promises';
import path from 'path';
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

const MAX_DOCUMENT_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
const ALLOWED_DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/octet-stream',
];
const ALLOWED_DOCUMENT_EXTENSIONS = ['.pdf', '.doc', '.docx'];

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
 * Validates a document file (CV / resume) by size, extension, and mime type
 */
export function validateDocumentFile(file: {
  size: number;
  type?: string;
  name?: string;
}): FileValidation {
  const ext = file.name ? '.' + file.name.split('.').pop()?.toLowerCase() : '';
  const isExtValid = ext ? ALLOWED_DOCUMENT_EXTENSIONS.includes(ext) : false;
  const isTypeValid = file.type ? ALLOWED_DOCUMENT_MIME_TYPES.includes(file.type) : false;

  if (!isExtValid && !isTypeValid) {
    return {
      valid: false,
      error: `Định dạng tệp "${file.name || file.type || 'unknown'}" không được hỗ trợ. Vui lòng chọn tệp PDF, DOC hoặc DOCX.`,
    };
  }

  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Kích thước tệp (${sizeMb}MB) vượt quá giới hạn tối đa cho phép là 15MB.`,
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

/**
 * Uploads a document (PDF, DOC, DOCX) buffer to Cloudinary or falls back to local storage
 */
export async function uploadDocumentBuffer(
  buffer: Buffer,
  originalFilename: string,
  options?: UploadOptions
): Promise<UploadResult> {
  const folder = options?.folder || 'egead_cms/cv';
  const ext = path.extname(originalFilename).toLowerCase() || '.pdf';
  const baseName = path.basename(originalFilename, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
  const safeFilename = `${Date.now()}-${baseName}${ext}`;

  // 1. Always save locally to ensure 100% reliable direct serving & preview without 401
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cv');
  await fs.mkdir(uploadDir, { recursive: true });
  const localFilePath = path.join(uploadDir, safeFilename);
  await fs.writeFile(localFilePath, buffer);
  const publicUrl = `/uploads/cv/${safeFilename}`;

  // 2. Also attempt upload to Cloudinary as cloud backup if credentials exist
  let cloudPublicId = `local-cv-${safeFilename}`;
  if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    try {
      await new Promise<void>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'raw',
            use_filename: true,
            unique_filename: true,
            tags: options?.tags || ['egead-cms', 'cv', 'application'],
          },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error || !result) {
              reject(new Error(error?.message || 'Lỗi tải lên Cloudinary'));
            } else {
              cloudPublicId = result.public_id;
              resolve();
            }
          }
        );
        uploadStream.end(buffer);
      });
    } catch (cloudErr) {
      console.warn('Cloudinary upload warning:', cloudErr);
    }
  }

  return {
    url: publicUrl,
    secureUrl: publicUrl,
    publicId: cloudPublicId,
    format: ext.replace('.', ''),
    bytes: buffer.length,
  };
}

