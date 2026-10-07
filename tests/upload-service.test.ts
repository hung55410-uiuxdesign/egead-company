import { describe, test, expect } from 'bun:test';
import {
  validateImageFile,
  uploadImageBuffer,
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

  describe('Service API contract', () => {
    test('exports expected upload and management functions', () => {
      expect(typeof uploadImageBuffer).toBe('function');
      expect(typeof uploadBase64OrUrl).toBe('function');
      expect(typeof deleteCloudinaryImage).toBe('function');
      expect(typeof validateImageFile).toBe('function');
    });
  });
});
