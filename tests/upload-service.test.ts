import { describe, test, expect } from 'bun:test';
import {
  validateImageFile,
  validateDocumentFile,
  validateMediaFile,
  uploadImageBuffer,
  uploadDocumentBuffer,
  uploadBase64OrUrl,
  deleteCloudinaryImage,
} from '../lib/services/upload.service';

describe('Upload Service Unit Tests', () => {
  describe('validateImageFile', () => {
    test('accepts standard web image formats', () => {
      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/svg+xml',
        'image/avif',
      ];

      for (const type of validTypes) {
        const result = validateImageFile({ size: 1024 * 1024, type });
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      }
    });

    test('rejects non-image formats with descriptive error', () => {
      const invalidTypes = [
        'application/pdf',
        'text/plain',
        'video/mp4',
        'application/zip',
        '',
      ];

      for (const type of invalidTypes) {
        const result = validateImageFile({ size: 1024 * 1024, type });
        expect(result.valid).toBe(false);
        expect(result.error).toBeDefined();
        expect(result.error).toContain('không được hỗ trợ');
      }
    });

    test('rejects files larger than 10MB', () => {
      const oversized = 11 * 1024 * 1024; // 11MB
      const result = validateImageFile({ size: oversized, type: 'image/jpeg' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('vượt quá giới hạn tối đa');
    });

    test('accepts files within 10MB limit', () => {
      const allowedSize = 9.5 * 1024 * 1024;
      const result = validateImageFile({ size: allowedSize, type: 'image/png' });
      expect(result.valid).toBe(true);
    });
  });

  describe('validateDocumentFile', () => {
    test('accepts PDF and Word documents by extension and mime type', () => {
      const testCases = [
        { name: 'resume.pdf', type: 'application/pdf', size: 2 * 1024 * 1024 },
        { name: 'profile.doc', type: 'application/msword', size: 1 * 1024 * 1024 },
        { name: 'cv.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 3 * 1024 * 1024 },
        { name: 'document.pdf', type: 'application/octet-stream', size: 500 * 1024 },
      ];

      for (const tc of testCases) {
        const result = validateDocumentFile(tc);
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      }
    });

    test('rejects unsupported extensions or media files', () => {
      const invalid = [
        { name: 'photo.jpg', type: 'image/jpeg', size: 1024 },
        { name: 'script.exe', type: 'application/x-msdownload', size: 1024 },
        { name: 'archive.zip', type: 'application/zip', size: 1024 },
      ];

      for (const tc of invalid) {
        const result = validateDocumentFile(tc);
        expect(result.valid).toBe(false);
        expect(result.error).toBeDefined();
        expect(result.error).toContain('không được hỗ trợ');
      }
    });

    test('rejects document files larger than 15MB', () => {
      const oversized = { name: 'huge-cv.pdf', type: 'application/pdf', size: 16 * 1024 * 1024 };
      const result = validateDocumentFile(oversized);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('vượt quá giới hạn tối đa');
    });
  });

  describe('validateMediaFile (Image & Video)', () => {
    test('accepts video up to 100MB', () => {
      const validVideo = {
        name: 'intro.mp4',
        type: 'video/mp4',
        size: 95 * 1024 * 1024, // 95MB
      };
      const result = validateMediaFile(validVideo);
      expect(result.valid).toBe(true);
      expect(result.mediaType).toBe('video');
    });

    test('rejects video larger than 100MB', () => {
      const oversizedVideo = {
        name: 'huge.mp4',
        type: 'video/mp4',
        size: 105 * 1024 * 1024, // 105MB
      };
      const result = validateMediaFile(oversizedVideo);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('100MB');
    });

    test('accepts image up to 10MB', () => {
      const validImage = {
        name: 'banner.webp',
        type: 'image/webp',
        size: 8 * 1024 * 1024, // 8MB
      };
      const result = validateMediaFile(validImage);
      expect(result.valid).toBe(true);
      expect(result.mediaType).toBe('image');
    });

    test('rejects image larger than 10MB', () => {
      const oversizedImage = {
        name: 'banner.png',
        type: 'image/png',
        size: 12 * 1024 * 1024, // 12MB
      };
      const result = validateMediaFile(oversizedImage);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('10MB');
    });
  });

  describe('Service API contract', () => {
    test('exports expected upload and management functions', () => {
      expect(typeof uploadImageBuffer).toBe('function');
      expect(typeof uploadDocumentBuffer).toBe('function');
      expect(typeof uploadBase64OrUrl).toBe('function');
      expect(typeof deleteCloudinaryImage).toBe('function');
      expect(typeof validateImageFile).toBe('function');
      expect(typeof validateDocumentFile).toBe('function');
      expect(typeof validateMediaFile).toBe('function');
    });
  });
});
