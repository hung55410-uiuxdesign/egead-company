import { describe, test, expect } from 'bun:test';
import {
  DEFAULT_ADMIN_CONFIG,
  validatePasswordStrength,
  isAdminInitialized,
} from '../lib/services/auth.service';

describe('Auth Service Unit Tests', () => {
  describe('DEFAULT_ADMIN_CONFIG', () => {
    test('contains expected default admin credentials', () => {
      expect(DEFAULT_ADMIN_CONFIG.email).toBe('admin@egead.com');
      expect(DEFAULT_ADMIN_CONFIG.password).toBe('Admin@123456');
      expect(DEFAULT_ADMIN_CONFIG.role).toBe('admin');
      expect(DEFAULT_ADMIN_CONFIG.name).toContain('Administrator');
    });
  });

  describe('validatePasswordStrength', () => {
    test('accepts strong passwords with uppercase, numbers, and sufficient length', () => {
      const result = validatePasswordStrength('Admin@123456');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test('rejects passwords shorter than 8 characters', () => {
      const result = validatePasswordStrength('Pass1');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('8 ký tự');
    });

    test('rejects passwords without uppercase letters', () => {
      const result = validatePasswordStrength('admin123456');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('chữ hoa');
    });

    test('rejects passwords without numbers', () => {
      const result = validatePasswordStrength('AdminPassword');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('chữ số');
    });
  });

  describe('isAdminInitialized', () => {
    test('returns boolean indicating initialization status', async () => {
      const status = await isAdminInitialized();
      expect(typeof status).toBe('boolean');
    });
  });
});
