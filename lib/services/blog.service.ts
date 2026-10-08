import fs from 'fs/promises';
import path from 'path';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { BlogPost, BlogStats, BlogCategory, PostStatus } from '@/types/blog';
import { CategoryItem, getCategoryHref } from '@/types/category';
import { getCategoriesWithCount } from './category.service';
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

export interface PostFilter {
  status?: string;
  tag?: string;
  category?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  skip?: number;
  sort?: 'newest' | 'oldest' | 'popular';
}

export interface PaginatedPostsResult {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function buildPostWhereInput(filter?: PostFilter): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = {};

  if (filter?.status && filter.status !== 'all') {
    where.status = filter.status;
  }

  if (filter?.featured !== undefined) {
    where.featured = filter.featured;
  }

  if (filter?.tag && filter.tag !== 'all') {
    where.tag = { equals: filter.tag, mode: 'insensitive' };
  }

  if (filter?.category && filter.category !== 'all') {
    const catVal = filter.category.trim();
    const catSlug = catVal.toLowerCase().replace(/\s+/g, '-');
    const aliasSlug =
      catSlug === 'blog' ? 'blogs' : catSlug === 'blogs' ? 'blog' : undefined;

    const categoryConditions: Prisma.PostWhereInput[] = [
      { categoryName: { equals: catVal, mode: 'insensitive' } },
      { category: { is: { slug: { equals: catSlug, mode: 'insensitive' } } } },
      { category: { is: { name: { equals: catVal, mode: 'insensitive' } } } },
    ];

    if (aliasSlug) {
      categoryConditions.push(
        { category: { is: { slug: { equals: aliasSlug, mode: 'insensitive' } } } },
        { categoryName: { equals: aliasSlug, mode: 'insensitive' } }
      );
    }

    where.OR = categoryConditions;
  }

  if (filter?.search) {
    const searchConditions: Prisma.PostWhereInput[] = [
      { title: { contains: filter.search, mode: 'insensitive' } },
      { excerpt: { contains: filter.search, mode: 'insensitive' } },
      { slug: { contains: filter.search, mode: 'insensitive' } },
    ];
    if (where.OR) {
      where.AND = [{ OR: where.OR }, { OR: searchConditions }];
      delete where.OR;
    } else {
      where.OR = searchConditions;
    }
  }

  return where;
}

/**
 * Get all blog posts from Prisma with optional filters.
 */
export async function getAllPosts(filter?: PostFilter): Promise<BlogPost[]> {
  try {
    const where = buildPostWhereInput(filter);

    let orderBy: Prisma.PostOrderByWithRelationInput = { createdAt: 'desc' };
    if (filter?.sort === 'oldest') {
      orderBy = { createdAt: 'asc' };
    } else if (filter?.sort === 'popular') {
      orderBy = { views: 'desc' };
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy,
      take: filter?.limit,
      skip: filter?.skip,
      include: {
        category: true,
      },
    });

    if (posts.length === 0 && !filter?.status && !filter?.search && !filter?.tag && !filter?.category) {
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
      categoryId: p.categoryId || p.category?.id || undefined,
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
    if (filter?.featured !== undefined) {
      posts = posts.filter((p) => p.featured === filter.featured);
    }
    if (filter?.tag && filter.tag !== 'all') {
      posts = posts.filter((p) => p.tag === filter.tag || p.category === filter.tag);
    }
    if (filter?.category && filter.category !== 'all') {
      const c = filter.category.toLowerCase().replace(/-/g, ' ');
      const cSlug = filter.category.toLowerCase().replace(/\s+/g, '-');
      posts = posts.filter((p) => {
        const pCat = (p.category || '').toLowerCase();
        const pCatSlug = pCat.replace(/\s+/g, '-');
        const isBlog =
          (cSlug === 'blog' || cSlug === 'blogs') &&
          (pCatSlug === 'blog' || pCatSlug === 'blogs');
        if (pCat === c || pCat === filter.category?.toLowerCase() || pCatSlug === cSlug || isBlog) {
          return true;
        }
        if (!p.category || p.category.toLowerCase() === 'general') {
          return p.tag.toLowerCase().replace(/\s+/g, '-') === cSlug;
        }
        return false;
      });
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
    if (filter?.sort === 'oldest') {
      posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (filter?.sort === 'popular') {
      posts.sort((a, b) => (b.views || 0) - (a.views || 0));
    }
    if (filter?.skip) {
      posts = posts.slice(filter.skip);
    }
    if (filter?.limit) {
      posts = posts.slice(0, filter.limit);
    }
    return posts;
  }
}

/**
 * Get paginated blog posts with total count and metadata.
 */
export async function getPaginatedPosts(
  filter?: PostFilter & { page?: number }
): Promise<PaginatedPostsResult> {
  const page = Math.max(1, filter?.page || 1);
  const limit = Math.max(1, filter?.limit || 9);
  const skip = (page - 1) * limit;

  try {
    const where = buildPostWhereInput(filter);

    let orderBy: Prisma.PostOrderByWithRelationInput = { createdAt: 'desc' };
    if (filter?.sort === 'oldest') {
      orderBy = { createdAt: 'asc' };
    } else if (filter?.sort === 'popular') {
      orderBy = { views: 'desc' };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy,
        take: limit,
        skip,
        include: {
          category: true,
        },
      }),
      prisma.post.count({ where }),
    ]);

    const mappedPosts: BlogPost[] = posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle || undefined,
      tag: p.tag,
      category: p.categoryName || p.category?.name || 'General',
      categoryId: p.categoryId || p.category?.id || undefined,
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

    return {
      posts: mappedPosts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  } catch (error) {
    console.warn('[blog.service] Prisma paginated query failed, using fallback:', error);
    const allFiltered = await getAllPosts({
      status: filter?.status,
      tag: filter?.tag,
      category: filter?.category,
      search: filter?.search,
      featured: filter?.featured,
      sort: filter?.sort,
    });

    const total = allFiltered.length;
    const paginated = allFiltered.slice(skip, skip + limit);

    return {
      posts: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }
}

export interface InsightsHubData {
  featured: BlogPost[];
  sections: Array<{
    category: CategoryItem;
    posts: BlogPost[];
    link: string;
  }>;
  categories: CategoryItem[];
  totalPosts: number;
}

/**
 * Get aggregated data for the public Insights Hub page
 */
export async function getInsightsHubData(): Promise<InsightsHubData> {
  const [allPosts, categories] = await Promise.all([
    getAllPosts({ status: 'published' }),
    getCategoriesWithCount(),
  ]);

  // Featured Insights (2 items)
  const featuredPosts = allPosts.filter((p) => p.featured).slice(0, 2);
  const featured = featuredPosts.length >= 2 ? featuredPosts : allPosts.slice(0, 2);

  // Fallback default categories if database has no categories yet
  const effectiveCategories: CategoryItem[] =
    categories.length > 0
      ? categories
      : [
          {
            id: 'cat-blog',
            name: 'Blog',
            slug: 'blog',
            description: 'Thought leadership, industry perspectives, and technical architecture guides.',
            icon: '/assets/icon_blog.svg',
            count: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'cat-announcements',
            name: 'Announcements',
            slug: 'announcements',
            description: 'Stay updated on product launches, strategic milestones, and company announcements.',
            icon: '/assets/icon_announcement.svg',
            count: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'cat-webinars',
            name: 'Webinars',
            slug: 'webinars',
            description: "Join or watch our webinars to equip you for tomorrow's leadership.",
            icon: '/assets/icon_webinar.svg',
            count: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'cat-white-papers',
            name: 'White Papers',
            slug: 'white-papers',
            description: 'In-depth research papers, enterprise blueprints, and strategic benchmarks.',
            icon: '/assets/icon_whitepaper.svg',
            count: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

  // Group posts by each category from database
  const sections: InsightsHubData['sections'] = effectiveCategories.map((cat) => {
    const catNameLower = cat.name.toLowerCase().trim();
    const catSlugLower = cat.slug.toLowerCase().trim();

    const posts = allPosts.filter((p) => {
      // 1. Direct categoryId check if available
      if (p.categoryId && cat.id) {
        if (p.categoryId === cat.id) return true;
        return false;
      }

      // 2. Strict category name or slug matching
      const pCatLower = (p.category || '').toLowerCase().trim();
      const pCatSlug = pCatLower.replace(/\s+/g, '-');
      const isBlogMatch =
        (catSlugLower === 'blog' || catSlugLower === 'blogs') &&
        (pCatSlug === 'blog' || pCatSlug === 'blogs');
      const isWhitePaperMatch =
        catSlugLower.includes('white') && pCatSlug.includes('white');

      if (
        pCatLower === catNameLower ||
        pCatSlug === catSlugLower ||
        isBlogMatch ||
        isWhitePaperMatch
      ) {
        return true;
      }

      // 3. Fallback to tag only if post has no explicit category
      if (!p.category || p.category.toLowerCase() === 'general') {
        const pTagLower = (p.tag || '').toLowerCase().trim();
        return (
          pTagLower === catNameLower ||
          pTagLower.replace(/\s+/g, '-') === catSlugLower
        );
      }

      return false;
    });

    return {
      category: cat,
      posts: posts.slice(0, 3),
      link: getCategoryHref(cat.slug),
    };
  });

  return {
    featured,
    sections,
    categories: effectiveCategories,
    totalPosts: allPosts.length,
  };
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
    let resolvedCategoryId = postData.categoryId || null;
    if (!resolvedCategoryId && postData.category) {
      try {
        const cat = await prisma.category.findFirst({
          where: {
            OR: [
              { name: { equals: postData.category, mode: 'insensitive' } },
              { slug: { equals: postData.category.toLowerCase().replace(/\s+/g, '-'), mode: 'insensitive' } },
            ],
          },
        });
        if (cat) {
          resolvedCategoryId = cat.id;
        }
      } catch {
        // Ignore
      }
    }

    if (postData.id) {
      const updated = await prisma.post.update({
        where: { id: postData.id },
        data: {
          title: postData.title,
          subtitle: postData.subtitle,
          slug,
          tag: postData.tag || 'General',
          categoryName: postData.category || 'General',
          categoryId: resolvedCategoryId,
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
        categoryId: updated.categoryId || resolvedCategoryId || undefined,
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
          categoryId: resolvedCategoryId,
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
        categoryId: created.categoryId || resolvedCategoryId || undefined,
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
