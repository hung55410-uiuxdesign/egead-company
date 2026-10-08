import { describe, test, expect } from 'bun:test';
import {
  getAllPosts,
  getPaginatedPosts,
  getInsightsHubData,
  getPostBySlug,
  getPostById,
  savePost,
  getBlogStats,
  getCategories,
  bulkUpdatePosts,
  bulkDeletePosts,
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

  describe('bulkUpdatePosts and bulkDeletePosts', () => {
    test('updates multiple posts status and category, then deletes them', async () => {
      const post1 = await savePost({
        title: 'Bulk Test Article 1',
        subtitle: 'Sub 1',
        tag: 'Tech',
        category: 'General',
        excerpt: 'Excerpt 1',
        content: '<p>Content 1</p>',
        status: 'draft',
      });

      const post2 = await savePost({
        title: 'Bulk Test Article 2',
        subtitle: 'Sub 2',
        tag: 'Tech',
        category: 'General',
        excerpt: 'Excerpt 2',
        content: '<p>Content 2</p>',
        status: 'draft',
      });

      const ids = [post1.id, post2.id];

      // Bulk update
      const updatedCount = await bulkUpdatePosts(ids, {
        status: 'published',
        category: 'Insights',
      });
      expect(updatedCount).toBe(2);

      // Verify updated post 1
      const fetched1 = await getPostById(post1.id);
      expect(fetched1?.status).toBe('published');
      expect(fetched1?.category).toBe('Insights');

      // Bulk delete
      const deletedCount = await bulkDeletePosts(ids);
      expect(deletedCount).toBe(2);

      // Verify deletion
      const checkDeleted1 = await getPostById(post1.id);
      expect(checkDeleted1).toBeNull();
    });

    test('handles empty ids gracefully', async () => {
      const updated = await bulkUpdatePosts([], { status: 'published' });
      expect(updated).toBe(0);

      const deleted = await bulkDeletePosts([]);
      expect(deleted).toBe(0);
    });
  });

  describe('getPaginatedPosts', () => {
    test('returns paginated result with total, page, limit, and totalPages', async () => {
      const result = await getPaginatedPosts({ page: 1, limit: 3 });
      expect(result).toBeDefined();
      expect(Array.isArray(result.posts)).toBe(true);
      expect(typeof result.total).toBe('number');
      expect(result.page).toBe(1);
      expect(result.limit).toBe(3);
      expect(typeof result.totalPages).toBe('number');
      expect(result.posts.length).toBeLessThanOrEqual(3);
    });

    test('supports filtering by status in paginated results', async () => {
      const result = await getPaginatedPosts({ status: 'published', limit: 5 });
      for (const p of result.posts) {
        expect(p.status).toBe('published');
      }
    });
  });

  describe('getInsightsHubData', () => {
    test('aggregates featured posts, categories, and category sections', async () => {
      const hubData = await getInsightsHubData();
      expect(hubData).toBeDefined();
      expect(Array.isArray(hubData.featured)).toBe(true);
      expect(hubData.featured.length).toBeLessThanOrEqual(2);
      expect(Array.isArray(hubData.categories)).toBe(true);
      expect(Array.isArray(hubData.sections)).toBe(true);
      expect(typeof hubData.totalPosts).toBe('number');

      for (const section of hubData.sections) {
        expect(section.category).toBeDefined();
        expect(typeof section.category.name).toBe('string');
        expect(typeof section.category.slug).toBe('string');
        expect(typeof section.link).toBe('string');
        expect(Array.isArray(section.posts)).toBe(true);
      }
    });
  });
});

