/**
 * Utility for parsing and handling media URLs (Images, Videos, YouTube embeds).
 */

export interface YouTubeEmbedInfo {
  videoId: string;
  embedUrl: string;
  previewUrl: string;
  thumbnailUrl: string;
  maxresThumbnailUrl: string;
}

export type MediaType = 'youtube' | 'video' | 'image';

/**
 * Trích xuất Video ID và URL nhúng YouTube từ các định dạng liên kết YouTube:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/live/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 */
export function getYouTubeEmbedInfo(url?: string | null): YouTubeEmbedInfo | null {
  if (!url || typeof url !== 'string') return null;

  const cleanUrl = url.trim();

  // 1. Phân tích qua đối tượng URL để lấy chính xác tham số v và pathname
  try {
    const fullUrl = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')
      ? cleanUrl
      : `https://${cleanUrl}`;
    const parsed = new URL(fullUrl);
    let videoId = '';

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch' || parsed.searchParams.has('v')) {
        videoId = parsed.searchParams.get('v') || '';
      } else if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.split('/embed/')[1]?.split('/')[0]?.split('?')[0] || '';
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.split('/shorts/')[1]?.split('/')[0]?.split('?')[0] || '';
      } else if (parsed.pathname.startsWith('/live/')) {
        videoId = parsed.pathname.split('/live/')[1]?.split('/')[0]?.split('?')[0] || '';
      }
    } else if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.replace(/^\//, '').split('/')[0]?.split('?')[0] || '';
    }

    if (videoId && /^[\w-]{6,}$/.test(videoId)) {
      return {
        videoId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1&modestbranding=1`,
        previewUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1&controls=1`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        maxresThumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      };
    }
  } catch {
    // Tiếp tục với regex nếu URL không chuẩn cấu trúc http
  }

  // 2. Regex fallback linh hoạt
  const match = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{6,})/i
  );

  if (match && match[1]) {
    const videoId = match[1];
    return {
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1&modestbranding=1`,
      previewUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1&controls=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      maxresThumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    };
  }

  return null;
}

/**
 * Kiểm tra xem liên kết có phải là video trực tiếp hay không (MP4, WebM, MOV, Cloudinary Video...)
 */
export function isDirectVideoUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;

  const trimmed = url.trim().toLowerCase();
  const cleanUrl = trimmed.split('?')[0].split('#')[0];

  return (
    cleanUrl.endsWith('.mp4') ||
    cleanUrl.endsWith('.webm') ||
    cleanUrl.endsWith('.mov') ||
    cleanUrl.endsWith('.ogg') ||
    cleanUrl.endsWith('.ogv') ||
    cleanUrl.endsWith('.mkv') ||
    cleanUrl.endsWith('.avi') ||
    trimmed.includes('/video/upload/') ||
    trimmed.startsWith('data:video/')
  );
}

/**
 * Xác định kiểu media dựa trên đường dẫn
 */
export function getMediaType(url?: string | null): MediaType {
  if (!url) return 'image';
  if (getYouTubeEmbedInfo(url)) return 'youtube';
  if (isDirectVideoUrl(url)) return 'video';
  return 'image';
}

/**
 * Lấy URL ảnh đại diện / thumbnail tối ưu cho mọi loại media (kể cả khi media là link YouTube hoặc file Video)
 */
export function getMediaThumbnailUrl(
  url?: string | null,
  fallback = '/assets/case_brother.jpg'
): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }

  const trimmed = url.trim();

  // 1. Trường hợp là link YouTube -> lấy thumbnail từ YouTube CDN
  const ytInfo = getYouTubeEmbedInfo(trimmed);
  if (ytInfo) {
    return ytInfo.thumbnailUrl;
  }

  // 2. Trường hợp là video Cloudinary -> Cloudinary tự động render frame đầu tiên làm ảnh thumbnail bằng cách đổi đuôi sang .jpg
  if (trimmed.includes('res.cloudinary.com') && trimmed.includes('/video/upload/')) {
    // Thay thế phần mở rộng video (.mp4, .webm, .mov) thành .jpg
    return trimmed.replace(/\.(mp4|webm|mov|ogg|ogv|mkv|avi)(\?.*)?$/i, '.jpg$2');
  }

  // 3. Trường hợp là video direct khác (không phải Cloudinary và không phải YouTube)
  if (isDirectVideoUrl(trimmed)) {
    return fallback;
  }

  // 4. Trường hợp là ảnh thông thường
  return trimmed;
}
