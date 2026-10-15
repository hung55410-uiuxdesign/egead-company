/**
 * Utility for Cloudinary image optimization and AI upscaling.
 * Automatically injects Cloudinary transformations:
 * - f_auto: delivers optimal modern format (AVIF/WebP) based on client support
 * - q_auto:best: delivers crisp visual quality without compression artifacts
 * - e_upscale: uses AI super-resolution to sharpen and upscale low-resolution uploads
 * - w_...,c_limit: limits max dimension without upscaling beyond limit
 */
export function getOptimizedImageUrl(
  url?: string | null,
  options?: {
    width?: number;
    quality?: 'best' | 'good' | 'eco';
    upscale?: boolean;
  }
): string {
  if (!url) return '';

  // Only apply Cloudinary transformations to Cloudinary image upload URLs
  if (!url.includes('res.cloudinary.com') || !url.includes('/image/upload/')) {
    return url;
  }

  const uploadToken = '/image/upload/';
  const index = url.indexOf(uploadToken);
  if (index === -1) return url;

  const prefix = url.substring(0, index + uploadToken.length);
  const rest = url.substring(index + uploadToken.length);

  // Parse segments after /upload/
  const segments = rest.split('/');
  let pathAfterTransform = rest;

  // Check if first segment is an existing transformation (does not start with 'v' followed by digits, and not 'egead_cms')
  if (
    segments.length > 1 &&
    !/^v\d+$/.test(segments[0]) &&
    !segments[0].startsWith('egead_cms')
  ) {
    pathAfterTransform = segments.slice(1).join('/');
  }

  const quality = options?.quality || 'good';
  const upscale = options?.upscale === true;

  const transformList: string[] = ['f_auto'];

  if (quality === 'best') {
    transformList.push('q_auto:best');
  } else if (quality === 'eco') {
    transformList.push('q_auto:eco');
  } else {
    transformList.push('q_auto:good');
  }

  if (upscale) {
    transformList.push('e_upscale');
  }

  if (options?.width) {
    transformList.push(`w_${options.width},c_limit`);
  }

  return `${prefix}${transformList.join(',')}/${pathAfterTransform}`;
}
