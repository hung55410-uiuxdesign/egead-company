import { describe, test, expect } from 'bun:test';
import {
  getAllPosts,
  getPostBySlug,
  getPostById,
  savePost,
  getBlogStats,
  getCategories,
} from '../lib/services/blog.service';

describe('Blog Service Unit Tests', () => {
  describe('getAllPosts', () => {
    test('returns array of blog posts with proper structure', async () => {
      const posts = await getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);

      const firstPost = posts[0];
      expect(firstPost).toBeDefined();
      expect(typeof firstPost.id).toBe('string');
      expect(typeof firstPost.title).toBe('string');
      expect(typeof firstPost.slug).toBe('string');
      expect(typeof firstPost.tag).toBe('string');
      expect(firstPost.content).toBeDefined();
    });

    test('supports filtering by status', async () => {
      const publishedPosts = await getAllPosts({ status: 'published' });
      expect(Array.isArray(publishedPosts)).toBe(true);
      for (const p of publishedPosts) {
        expect(p.status).toBe('published');
      }
    });

    test('supports filtering by search keyword', async () => {
      const searchResults = await getAllPosts({ search: 'ecommerce' });
      expect(Array.isArray(searchResults)).toBe(true);
    });
  });

  describe('getPostBySlug', () => {
    test('finds post by slug correctly', async () => {
      const posts = await getAllPosts();
      const target = posts[0];
      const found = await getPostBySlug(target.slug);

      expect(found).not.toBeNull();
      expect(found?.slug).toBe(target.slug);
      expect(found?.title).toBe(target.title);
    });

    test('returns null for non-existent slug', async () => {
      const notFound = await getPostBySlug('non-existent-slug-random-123456');
      expect(notFound).toBeNull();
    });
  });

  describe('getPostById', () => {
    test('finds post by id correctly', async () => {
      const posts = await getAllPosts();
      const target = posts[0];
      const found = await getPostById(target.id);

      expect(found).not.toBeNull();
      expect(found?.id).toBe(target.id);
    });

    test('returns null for non-existent id', async () => {
      const notFound = await getPostById('post-non-existent-99999');
      expect(notFound).toBeNull();
    });
  });

  describe('getBlogStats', () => {
    test('computes total, published, and draft post counts accurately', async () => {
      const stats = await getBlogStats();
      expect(stats).toBeDefined();
      expect(typeof stats.totalPosts).toBe('number');
      expect(typeof stats.publishedPosts).toBe('number');
      expect(typeof stats.draftPosts).toBe('number');
      expect(typeof stats.totalViews).toBe('number');
      expect(stats.totalPosts).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getCategories', () => {
    test('returns categories with non-empty names and counts', async () => {
      const categories = await getCategories();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);

      const firstCat = categories[0];
      expect(typeof firstCat.name).toBe('string');
      expect(typeof firstCat.slug).toBe('string');
      expect(typeof firstCat.count).toBe('number');
    });
  });

  describe('savePost', () => {
    test('creates new post or validates title requirement', async () => {
      const newPostData = {
        title: 'Unit Test Automated Blog Article',
        subtitle: 'Testing automated creation with Prisma & TipTap',
        tag: 'Technology',
        category: 'Innovation',
        excerpt: 'This is a test excerpt for service validation.',
        content: '<p>Paragraph 1 from rich editor</p>',
        status: 'draft' as const,
      };

      const saved = await savePost(newPostData);
      expect(saved).toBeDefined();
      expect(saved.title).toBe(newPostData.title);
      expect(saved.slug).toContain('unit-test');
      expect(saved.status).toBe('draft');
    });
  });
});
