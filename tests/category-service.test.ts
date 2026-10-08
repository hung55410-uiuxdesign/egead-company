import { describe, test, expect } from 'bun:test';
import { categorySchema } from '../lib/validations/category';
import { generateSlug, getCategoriesWithCount } from '../lib/services/category.service';

describe('Category Service & Validation Tests', () => {
  describe('Zod Validation Schema (categorySchema)', () => {
    test('validates correct category payload with or without icon', () => {
      const payloadWithIcon = {
        name: 'Supply Chain & Logistics',
        slug: 'supply-chain-logistics',
        description: 'Chuyên mục quản lý kho vận và chuỗi cung ứng',
        icon: 'https://res.cloudinary.com/egead/image/upload/v1234/icon.svg',
      };
      const result = categorySchema.safeParse(payloadWithIcon);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Supply Chain & Logistics');
        expect(result.data.slug).toBe('supply-chain-logistics');
        expect(result.data.icon).toBe('https://res.cloudinary.com/egead/image/upload/v1234/icon.svg');
      }

      const payloadWithoutIcon = {
        name: 'Webinars',
        slug: 'webinars',
        description: null,
      };
      const result2 = categorySchema.safeParse(payloadWithoutIcon);
      expect(result2.success).toBe(true);
    });

    test('rejects category with empty or too short name', () => {
      const invalid = {
        name: 'A',
        slug: 'valid-slug',
      };
      const result = categorySchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    test('rejects category with invalid slug (uppercase or special characters)', () => {
      const invalid = {
        name: 'Valid Name',
        slug: 'INVALID_SLUG!',
      };
      const result = categorySchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('Slug Generator Utility (generateSlug)', () => {
    test('converts Vietnamese with accents into clean slug', () => {
      expect(generateSlug('Chiến Lược Kinh Doanh')).toBe('chien-luoc-kinh-doanh');
      expect(generateSlug('Quản Lý & Vận Hành Kho')).toBe('quan-ly-van-hanh-kho');
    });

    test('handles punctuation and excess whitespace', () => {
      expect(generateSlug('  E-Commerce: AI & Automation!  ')).toBe('e-commerce-ai-automation');
    });
  });

  describe('getCategoriesWithCount Query', () => {
    test('retrieves category items with expected fields', async () => {
      const categories = await getCategoriesWithCount();
      expect(Array.isArray(categories)).toBe(true);
      if (categories.length > 0) {
        const first = categories[0];
        expect(first).toHaveProperty('id');
        expect(first).toHaveProperty('name');
        expect(first).toHaveProperty('slug');
        expect(first).toHaveProperty('count');
        expect(typeof first.count).toBe('number');
      }
    });
  });
});
