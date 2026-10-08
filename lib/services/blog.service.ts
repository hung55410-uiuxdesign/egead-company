import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { BlogPost, BlogStats, BlogCategory, PostStatus } from '@/types/blog';
import initialBlogs from '@/data/blogs.json';

const BLOGS_FILE_PATH = path.join(process.cwd(), 'data', 'blogs.json');

/**
 * Format string content into array of paragraphs or string HTML
 */
function normalizeContent(rawContent: string | string[]): string[] {
  if (Array.isArray(rawContent)) {
    return rawContent;
  }
  if (typeof rawContent === 'string') {
    // If it's HTML, we can either return it or keep as single block
    return [rawContent];
  }
  return [''];
}

/**
 * Fallback loader from local JSON file
 */
async function getFallbackPosts(): Promise<BlogPost[]> {
  try {
    const fileContent = await fs.readFile(BLOGS_FILE_PATH, 'utf-8');
    const posts: BlogPost[] = JSON.parse(fileContent);
    return posts.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return initialBlogs as BlogPost[];
  }
}

/**
 * Get all blog posts from Prisma with optional filters.
 */
export async function getAllPosts(filter?: {
  status?: string;
  tag?: string;
  category?: string;
  search?: string;
}): Promise<BlogPost[]> {
  try {
    const where: {
      status?: string;
      tag?: string;
      categoryName?: { equals: string; mode: 'insensitive' };
      OR?: Array<
        | { title: { contains: string; mode: 'insensitive' } }
        | { excerpt: { contains: string; mode: 'insensitive' } }
        | { slug: { contains: string; mode: 'insensitive' } }
      >;
    } = {};

    if (filter?.status && filter.status !== 'all') {
      where.status = filter.status;
    }
    if (filter?.tag && filter.tag !== 'all') {
      where.tag = filter.tag;
    }
    if (filter?.category && filter.category !== 'all') {
      where.categoryName = { equals: filter.category, mode: 'insensitive' };
    }
    if (filter?.search) {
      where.OR = [
        { title: { contains: filter.search, mode: 'insensitive' } },
        { excerpt: { contains: filter.search, mode: 'insensitive' } },
        { slug: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
      },
    });

    if (posts.length === 0 && !filter?.status && !filter?.search && !filter?.tag) {
      // If table is empty, auto-seed from JSON
      return await seedDatabaseFromJSON();
    }

    return posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle || undefined,
      tag: p.tag,
      category: p.categoryName || p.category?.name || 'General',
      date: p.date,
      readTime: p.readTime,
      heroImage: p.heroImage,
      excerpt: p.excerpt,
      content: p.content,
      author: {
        name: p.authorName,
        role: p.authorRole || undefined,
        avatar: p.authorAvatar || undefined,
      },
      status: (p.status as PostStatus) || 'draft',
      views: p.views,
      featured: p.featured,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.warn('[blog.service] Prisma query failed, using JSON fallback:', error);
    let posts = await getFallbackPosts();
    if (filter?.status && filter.status !== 'all') {
      posts = posts.filter((p) => p.status === filter.status);
    }
    if (filter?.tag && filter.tag !== 'all') {
      posts = posts.filter((p) => p.tag === filter.tag || p.category === filter.tag);
    }
    if (filter?.category && filter.category !== 'all') {
      const c = filter.category.toLowerCase().replace(/-/g, ' ');
      posts = posts.filter(
        (p) =>
          p.category.toLowerCase() === c ||
          p.category.toLowerCase().replace(/\s+/g, '-') === filter.category?.toLowerCase()
      );
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }
    return posts;
  }
}

/**
 * Get a single post by slug.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (post) {
      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        subtitle: post.subtitle || undefined,
        tag: post.tag,
        category: post.categoryName || post.category?.name || 'General',
        date: post.date,
        readTime: post.readTime,
        heroImage: post.heroImage,
        excerpt: post.excerpt,
        content: post.content,
        author: {
          name: post.authorName,
          role: post.authorRole || undefined,
          avatar: post.authorAvatar || undefined,
        },
        status: (post.status as PostStatus) || 'draft',
        views: post.views,
        featured: post.featured,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.warn('[blog.service] Prisma findUnique failed, using fallback:', error);
  }

  const fallbackPosts = await getFallbackPosts();
  return (
    fallbackPosts.find((p) => p.slug === slug || p.slug.toLowerCase() === slug.toLowerCase()) ||
    null
  );
}

/**
 * Get a single post by id.
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { category: true },
    });

    if (post) {
      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        subtitle: post.subtitle || undefined,
        tag: post.tag,
        category: post.categoryName || post.category?.name || 'General',
        date: post.date,
        readTime: post.readTime,
        heroImage: post.heroImage,
        excerpt: post.excerpt,
        content: post.content,
        author: {
          name: post.authorName,
          role: post.authorRole || undefined,
          avatar: post.authorAvatar || undefined,
        },
        status: (post.status as PostStatus) || 'draft',
        views: post.views,
        featured: post.featured,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.warn('[blog.service] Prisma findById failed, using fallback:', error);
  }

  const fallbackPosts = await getFallbackPosts();
  return fallbackPosts.find((p) => p.id === id) || null;
}

/**
 * Save or update a blog post.
 */
export async function savePost(
  postData: Partial<BlogPost> & { title: string }
): Promise<BlogPost> {
  const contentString = Array.isArray(postData.content)
    ? postData.content.map((p) => (p.startsWith('<') ? p : `<p>${p}</p>`)).join('')
    : postData.content || '';

  const slug =
    postData.slug ||
    postData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const date =
    postData.date ||
    new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });

  try {
    if (postData.id) {
      const updated = await prisma.post.update({
        where: { id: postData.id },
        data: {
          title: postData.title,
          subtitle: postData.subtitle,
          slug,
          tag: postData.tag || 'General',
          categoryName: postData.category || 'General',
          date,
          readTime: postData.readTime || '5 mins read',
          heroImage: postData.heroImage || '/assets/case_brother.jpg',
          excerpt: postData.excerpt || '',
          content: contentString,
          authorName: postData.author?.name || 'E-GEAD Team',
          authorRole: postData.author?.role || 'Editor',
          authorAvatar: postData.author?.avatar,
          status: postData.status || 'draft',
          views: postData.views,
          featured: postData.featured,
        },
      });

      return {
        id: updated.id,
        slug: updated.slug,
        title: updated.title,
        subtitle: updated.subtitle || undefined,
        tag: updated.tag,
        category: updated.categoryName,
        date: updated.date,
        readTime: updated.readTime,
        heroImage: updated.heroImage,
        excerpt: updated.excerpt,
        content: updated.content,
        author: {
          name: updated.authorName,
          role: updated.authorRole || undefined,
          avatar: updated.authorAvatar || undefined,
        },
        status: (updated.status as PostStatus) || 'draft',
        views: updated.views,
        featured: updated.featured,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    } else {
      const created = await prisma.post.create({
        data: {
          title: postData.title,
          subtitle: postData.subtitle,
          slug,
          tag: postData.tag || 'General',
          categoryName: postData.category || 'General',
          date,
          readTime: postData.readTime || '5 mins read',
          heroImage: postData.heroImage || '/assets/case_brother.jpg',
          excerpt: postData.excerpt || '',
          content: contentString,
          authorName: postData.author?.name || 'E-GEAD Team',
          authorRole: postData.author?.role || 'Editor',
          authorAvatar: postData.author?.avatar,
          status: postData.status || 'draft',
          views: postData.views || 0,
          featured: postData.featured || false,
        },
      });

      return {
        id: created.id,
        slug: created.slug,
        title: created.title,
        subtitle: created.subtitle || undefined,
        tag: created.tag,
        category: created.categoryName,
        date: created.date,
        readTime: created.readTime,
        heroImage: created.heroImage,
        excerpt: created.excerpt,
        content: created.content,
        author: {
          name: created.authorName,
          role: created.authorRole || undefined,
          avatar: created.authorAvatar || undefined,
        },
        status: (created.status as PostStatus) || 'draft',
        views: created.views,
        featured: created.featured,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.warn('[blog.service] Prisma save failed, saving to JSON fallback:', error);
    // JSON file fallback
    const posts = await getFallbackPosts();
    const now = new Date().toISOString();
    let saved: BlogPost;

    if (postData.id) {
      const idx = posts.findIndex((p) => p.id === postData.id);
      if (idx === -1) throw new Error(`Post with id "${postData.id}" not found`);
      saved = {
        ...posts[idx],
        ...postData,
        content: contentString,
        updatedAt: now,
      };
      posts[idx] = saved;
    } else {
      saved = {
        id: `post-${Date.now()}`,
        slug,
        title: postData.title,
        subtitle: postData.subtitle,
        tag: postData.tag || 'General',
        category: postData.category || 'General',
        date,
        readTime: postData.readTime || '5 mins read',
        heroImage: postData.heroImage || '/assets/case_brother.jpg',
        excerpt: postData.excerpt || '',
        content: contentString,
        author: postData.author || { name: 'E-GEAD Team', role: 'Editor' },
        status: postData.status || 'draft',
        views: postData.views || 0,
        featured: postData.featured || false,
        createdAt: now,
        updatedAt: now,
      };
      posts.unshift(saved);
    }

    await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(posts, null, 2), 'utf-8');
    return saved;
  }
}

/**
 * Delete a post by id.
 */
export async function deletePost(id: string): Promise<boolean> {
  try {
    await prisma.post.delete({ where: { id } });
    return true;
  } catch (error) {
    console.warn('[blog.service] Prisma delete failed, falling back to JSON:', error);
    const posts = await getFallbackPosts();
    const filtered = posts.filter((p) => p.id !== id);
    if (filtered.length === posts.length) return false;
    await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  }
}

/**
 * Get statistics of blogs.
 */
export async function getBlogStats(): Promise<BlogStats> {
  try {
    const [totalPosts, publishedPosts, draftPosts, viewsAgg] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: 'published' } }),
      prisma.post.count({ where: { status: 'draft' } }),
      prisma.post.aggregate({ _sum: { views: true } }),
    ]);

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews: viewsAgg._sum.views || 0,
    };
  } catch (error) {
    console.warn('[blog.service] Prisma stats failed, using fallback:', error);
    const posts = await getFallbackPosts();
    return {
      totalPosts: posts.length,
      publishedPosts: posts.filter((p) => p.status === 'published').length,
      draftPosts: posts.filter((p) => p.status === 'draft').length,
      totalViews: posts.reduce((acc, curr) => acc + (curr.views || 0), 0),
    };
  }
}

/**
 * Get list of blog categories with post count.
 */
export async function getCategories(): Promise<BlogCategory[]> {
  try {
    const { getCategoriesWithCount } = await import('@/lib/services/category.service');
    const categories = await getCategoriesWithCount();
    if (categories.length > 0) {
      return categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || undefined,
        count: c.count,
      }));
    }
  } catch (error) {
    console.warn('[blog.service] getCategories failed, using fallback:', error);
  }

  const posts = await getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const cat = post.tag || post.category || 'General';
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count], index) => ({
    id: `cat-${index + 1}`,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    count,
  }));
}

/**
 * Seed initial blog posts into Prisma database from blogs.json
 */
export async function seedDatabaseFromJSON(): Promise<BlogPost[]> {
  const fallback = await getFallbackPosts();
  try {
    for (const post of fallback) {
      const contentStr = normalizeContent(post.content).join('');
      await prisma.post.upsert({
        where: { slug: post.slug },
        update: {},
        create: {
          id: post.id,
          slug: post.slug,
          title: post.title,
          subtitle: post.subtitle,
          tag: post.tag || 'General',
          categoryName: post.category || 'General',
          date: post.date,
          readTime: post.readTime,
          heroImage: post.heroImage,
          excerpt: post.excerpt,
          content: contentStr,
          authorName: post.author?.name || 'E-GEAD Team',
          authorRole: post.author?.role || 'Editor',
          status: post.status,
          views: post.views || 0,
          featured: post.featured || false,
        },
      });
    }

    const seeded = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return seeded.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle || undefined,
      tag: p.tag,
      category: p.categoryName,
      date: p.date,
      readTime: p.readTime,
      heroImage: p.heroImage,
      excerpt: p.excerpt,
      content: p.content,
      author: {
        name: p.authorName,
        role: p.authorRole || undefined,
      },
      status: (p.status as PostStatus) || 'draft',
      views: p.views,
      featured: p.featured,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.warn('[blog.service] Database seed skipped, returning fallback:', error);
    return fallback;
  }
}

/**
 * Bulk delete blog posts by IDs
 */
export async function bulkDeletePosts(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  let count = 0;
  try {
    const res = await prisma.post.deleteMany({
      where: { id: { in: ids } },
    });
    count = res.count;
  } catch (error) {
    console.warn('[blog.service] Prisma bulk delete failed:', error);
  }

  // Always sync with fallback JSON file
  try {
    const posts = await getFallbackPosts();
    const idSet = new Set(ids);
    const remaining = posts.filter((p) => !idSet.has(p.id));
    if (remaining.length !== posts.length) {
      if (count === 0) {
        count = posts.length - remaining.length;
      }
      await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(remaining, null, 2), 'utf-8');
    }
  } catch (error) {
    console.warn('[blog.service] JSON sync failed in bulk delete:', error);
  }

  return count;
}

/**
 * Bulk update blog posts (e.g. status or category) by IDs
 */
export async function bulkUpdatePosts(
  ids: string[],
  data: { status?: PostStatus; category?: string }
): Promise<number> {
  if (ids.length === 0) return 0;
  const updateData: { status?: string; categoryName?: string; tag?: string } = {};
  if (data.status) updateData.status = data.status;
  if (data.category) {
    updateData.categoryName = data.category;
    updateData.tag = data.category;
  }

  let count = 0;
  try {
    const res = await prisma.post.updateMany({
      where: { id: { in: ids } },
      data: updateData,
    });
    count = res.count;
  } catch (error) {
    console.warn('[blog.service] Prisma bulk update failed:', error);
  }

  // Always sync with fallback JSON file
  try {
    const posts = await getFallbackPosts();
    const idSet = new Set(ids);
    let jsonCount = 0;
    const updated = posts.map((p) => {
      if (idSet.has(p.id)) {
        jsonCount++;
        return {
          ...p,
          ...(data.status ? { status: data.status } : {}),
          ...(data.category ? { category: data.category, tag: data.category } : {}),
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    });
    if (jsonCount > 0) {
      if (count === 0) count = jsonCount;
      await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    }
  } catch (error) {
    console.warn('[blog.service] JSON sync failed in bulk update:', error);
  }

  return count;
}
