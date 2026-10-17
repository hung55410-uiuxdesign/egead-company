import { describe, test, expect } from 'bun:test';
import {
  getYouTubeEmbedInfo,
  isDirectVideoUrl,
  getMediaType,
  getMediaThumbnailUrl,
} from '../lib/utils/media';

describe('Media Utilities Unit Tests', () => {
  describe('getYouTubeEmbedInfo', () => {
    test('extracts videoId and generate correct embed and thumbnail URLs for standard watch URLs', () => {
      const url = 'https://www.youtube.com/watch?v=SNSIiPokNQsk&list=PL4I6mfes_iDX7JrGztZQqi07Hk_MPXPP';
      const info = getYouTubeEmbedInfo(url);

      expect(info).not.toBeNull();
      expect(info?.videoId).toBe('SNSIiPokNQsk');
      expect(info?.embedUrl).toContain('https://www.youtube-nocookie.com/embed/SNSIiPokNQsk');
      expect(info?.embedUrl).toContain('autoplay=1');
      expect(info?.previewUrl).toContain('https://www.youtube-nocookie.com/embed/SNSIiPokNQsk');
      expect(info?.thumbnailUrl).toBe('https://img.youtube.com/vi/SNSIiPokNQsk/hqdefault.jpg');
    });

    test('extracts videoId from youtu.be short URLs', () => {
      const url = 'https://youtu.be/dQw4w9WgXcQ?t=42';
      const info = getYouTubeEmbedInfo(url);

      expect(info).not.toBeNull();
      expect(info?.videoId).toBe('dQw4w9WgXcQ');
      expect(info?.thumbnailUrl).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');
    });

    test('extracts videoId from shorts URLs', () => {
      const url = 'https://www.youtube.com/shorts/AbCdEfGhIjK';
      const info = getYouTubeEmbedInfo(url);

      expect(info).not.toBeNull();
      expect(info?.videoId).toBe('AbCdEfGhIjK');
    });

    test('returns null for non-YouTube URLs or empty inputs', () => {
      expect(getYouTubeEmbedInfo(null)).toBeNull();
      expect(getYouTubeEmbedInfo('')).toBeNull();
      expect(getYouTubeEmbedInfo('/assets/case_brother.jpg')).toBeNull();
      expect(getYouTubeEmbedInfo('https://example.com/video.mp4')).toBeNull();
    });
  });

  describe('isDirectVideoUrl', () => {
    test('detects mp4, webm, mov and other direct video formats', () => {
      expect(isDirectVideoUrl('https://example.com/video.mp4')).toBe(true);
      expect(isDirectVideoUrl('https://example.com/video.webm?token=123')).toBe(true);
      expect(isDirectVideoUrl('/uploads/sample.mov')).toBe(true);
      expect(isDirectVideoUrl('https://res.cloudinary.com/demo/video/upload/sample.mp4')).toBe(true);
    });

    test('returns false for image formats or YouTube links', () => {
      expect(isDirectVideoUrl('/assets/case_brother.jpg')).toBe(false);
      expect(isDirectVideoUrl('https://res.cloudinary.com/demo/image/upload/sample.webp')).toBe(false);
      expect(isDirectVideoUrl('https://www.youtube.com/watch?v=SNSIiPokNQsk')).toBe(false);
      expect(isDirectVideoUrl(null)).toBe(false);
    });
  });

  describe('getMediaType', () => {
    test('classifies youtube, video and image properly', () => {
      expect(getMediaType('https://www.youtube.com/watch?v=12345678901')).toBe('youtube');
      expect(getMediaType('https://youtu.be/12345678901')).toBe('youtube');
      expect(getMediaType('https://cdn.example.com/promo.mp4')).toBe('video');
      expect(getMediaType('https://cdn.example.com/banner.jpg')).toBe('image');
      expect(getMediaType('')).toBe('image');
      expect(getMediaType(undefined)).toBe('image');
    });
  });

  describe('getMediaThumbnailUrl', () => {
    test('returns YouTube HQ thumbnail when media is YouTube URL', () => {
      const url = 'https://www.youtube.com/watch?v=SNSIiPokNQsk';
      expect(getMediaThumbnailUrl(url)).toBe('https://img.youtube.com/vi/SNSIiPokNQsk/hqdefault.jpg');
    });

    test('returns Cloudinary .jpg thumbnail for Cloudinary video URL', () => {
      const videoUrl = 'https://res.cloudinary.com/egead/video/upload/v123456/sample.mp4';
      expect(getMediaThumbnailUrl(videoUrl)).toBe(
        'https://res.cloudinary.com/egead/video/upload/v123456/sample.jpg'
      );
    });

    test('returns original image URL for image media', () => {
      const imgUrl = '/assets/case_brother.jpg';
      expect(getMediaThumbnailUrl(imgUrl)).toBe(imgUrl);
    });

    test('returns fallback for empty or non-previewable media', () => {
      expect(getMediaThumbnailUrl('')).toBe('/assets/case_brother.jpg');
      expect(getMediaThumbnailUrl(null)).toBe('/assets/case_brother.jpg');
    });
  });
});
