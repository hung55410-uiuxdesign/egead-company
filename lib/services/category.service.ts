import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { CategoryInput, categorySchema } from '@/lib/validations/category';
import { CategoryItem, generateSlug } from '@/types/category';

export type { CategoryItem };
export { generateSlug };

/**
 * Seed initial categories into PostgreSQL database from existing posts if empty
 */
export async function seedCategoriesFromPosts(): Promise<CategoryItem[]> {
  try {
    const posts = await prisma.post.findMany({
      select: { id: true, categoryName: true, tag: true },
    });

    const categoryNames = new Set<string>();
    posts.forEach((p) => {
      const catName = p.categoryName?.trim();
      const tagName = p.tag?.trim();
      if (catName && catName !== 'Chưa phân loại' && catName !== 'General') {
        categoryNames.add(catName);
      }
      if (tagName && tagName !== 'Chưa phân loại' && tagName !== 'General') {
        categoryNames.add(tagName);
      }
    });

    // Default categories if posts are empty
    if (categoryNames.size === 0) {
      categoryNames.add('Technology');
      categoryNames.add('Market Expansion');
      categoryNames.add('Operations & SLA');
      categoryNames.add('Technology & WMS');
      categoryNames.add('Financial Strategy');
    }

    for (const name of Array.from(categoryNames)) {
      const slug = generateSlug(name);
      const cat = await prisma.category.upsert({
        where: { slug },
        update: { name },
        create: {
          name,
          slug,
          description: `Chuyên mục kiến thức ${name} của E-GEAD`,
        },
      });

      // Link existing posts to this category
      await prisma.post.updateMany({
        where: {
          OR: [{ categoryName: name }, { tag: name }],
          categoryId: null,
        },
        data: {
          categoryId: cat.id,
          categoryName: cat.name,
        },
      });
    }

    const seeded = await prisma.category.findMany({
      include: {
        _count: { select: { posts: true } },
      },
      orderBy: { name: 'asc' },
    });

    return seeded.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      icon: c.icon,
      count: c._count.posts,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('[category.service] Error seeding categories from posts:', error);
    return [];
  }
}

/**
 * Get all categories with post count
 */
export async function getCategoriesWithCount(): Promise<CategoryItem[]> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    let iconMap: Map<string, string | null> | null = null;
    const needIconEnrichment =
      categories.length > 0 &&
      categories.some((c) => (c as { icon?: string | null }).icon === undefined);

    if (needIconEnrichment) {
      try {
        const raw = await prisma.$queryRawUnsafe<{ id: string; icon: string | null }[]>(
          `SELECT "id", "icon" FROM "category"`
        );
        iconMap = new Map(raw.map((r) => [r.id, r.icon]));
      } catch {
        // Ignore raw fallback error if table doesn't have icon yet
      }
    }

    return categories.map((c) => {
      const rawCat = c as { icon?: string | null };
      const icon = iconMap
        ? iconMap.get(c.id) ?? null
        : rawCat.icon ?? null;

      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon,
        count: c._count.posts,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      };
    });
  } catch (error) {
    console.error('[category.service] Error fetching categories:', error);
    return [];
  }
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: string): Promise<CategoryItem | null> {
  const c = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: { select: { posts: true } },
    },
  });

  if (!c) return null;

  let icon = (c as { icon?: string | null }).icon ?? null;
  if (icon === undefined || icon === null) {
    try {
      const raw = await prisma.$queryRawUnsafe<{ icon: string | null }[]>(
        `SELECT "icon" FROM "category" WHERE "id" = $1 LIMIT 1`,
        c.id
      );
      if (raw.length > 0 && raw[0].icon) {
        icon = raw[0].icon;
      }
    } catch {
      // Ignore raw fallback error
    }
  }

  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    icon,
    count: c._count.posts,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  };
}

/**
 * Create a new category
 */
export async function createCategory(rawInput: CategoryInput): Promise<CategoryItem> {
  const validated = categorySchema.parse(rawInput);

  // Check unique name
  const existingName = await prisma.category.findFirst({
    where: { name: { equals: validated.name, mode: 'insensitive' } },
  });
  if (existingName) {
    throw new Error(`Chuyên mục có tên "${validated.name}" đã tồn tại`);
  }

  // Check unique slug
  const existingSlug = await prisma.category.findUnique({
    where: { slug: validated.slug },
  });
  if (existingSlug) {
    throw new Error(`Đường dẫn slug "${validated.slug}" đã tồn tại`);
  }

  const baseData = {
    name: validated.name,
    slug: validated.slug,
    description: validated.description || null,
  };

  const iconVal = validated.icon && validated.icon.trim().length > 0 ? validated.icon.trim() : null;

  let createdId = '';
  let createdName = validated.name;
  let createdSlug = validated.slug;
  let createdDescription = validated.description || null;
  let createdIcon: string | null = iconVal;
  let postCount = 0;
  let createdAt = new Date();
  let updatedAt = new Date();

  try {
    const createPayload = iconVal
      ? { ...baseData, icon: iconVal }
      : baseData;

    const created = await prisma.category.create({
      data: createPayload,
      include: {
        _count: { select: { posts: true } },
      },
    });

    createdId = created.id;
    createdName = created.name;
    createdSlug = created.slug;
    createdDescription = created.description;
    createdIcon = (created as { icon?: string | null }).icon ?? iconVal;
    postCount = created._count.posts;
    createdAt = created.createdAt;
    updatedAt = created.updatedAt;
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('Unknown argument `icon`')) {
      const created = await prisma.category.create({
        data: baseData,
        include: {
          _count: { select: { posts: true } },
        },
      });

      createdId = created.id;
      createdName = created.name;
      createdSlug = created.slug;
      createdDescription = created.description;
      postCount = created._count.posts;
      createdAt = created.createdAt;
      updatedAt = created.updatedAt;

      if (iconVal) {
        try {
          await prisma.$executeRawUnsafe(
            `UPDATE "category" SET "icon" = $1 WHERE "id" = $2`,
            iconVal,
            created.id
          );
          createdIcon = iconVal;
        } catch (rawErr) {
          console.warn('[category.service] Could not update icon via raw SQL:', rawErr);
        }
      }
    } else {
      throw err;
    }
  }

  return {
    id: createdId,
    name: createdName,
    slug: createdSlug,
    description: createdDescription,
    icon: createdIcon,
    count: postCount,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

/**
 * Update an existing category
 */
export async function updateCategory(
  id: string,
  rawInput: CategoryInput
): Promise<CategoryItem> {
  const validated = categorySchema.parse(rawInput);

  const current = await prisma.category.findUnique({ where: { id } });
  if (!current) {
    throw new Error(`Không tìm thấy chuyên mục với ID "${id}"`);
  }

  // Check unique name with other categories
  const duplicateName = await prisma.category.findFirst({
    where: {
      name: { equals: validated.name, mode: 'insensitive' },
      NOT: { id },
    },
  });
  if (duplicateName) {
    throw new Error(`Tên chuyên mục "${validated.name}" đã được sử dụng`);
  }

  // Check unique slug with other categories
  const duplicateSlug = await prisma.category.findFirst({
    where: {
      slug: validated.slug,
      NOT: { id },
    },
  });
  if (duplicateSlug) {
    throw new Error(`Đường dẫn slug "${validated.slug}" đã được sử dụng`);
  }

  const baseData = {
    name: validated.name,
    slug: validated.slug,
    description: validated.description || null,
  };

  const iconVal =
    validated.icon !== undefined
      ? validated.icon && validated.icon.trim().length > 0
        ? validated.icon.trim()
        : null
      : undefined;

  let updatedId = id;
  let updatedName = validated.name;
  let updatedSlug = validated.slug;
  let updatedDescription = validated.description || null;
  let updatedIcon: string | null = iconVal ?? (current as { icon?: string | null }).icon ?? null;
  let postCount = 0;
  let createdAt = current.createdAt;
  let updatedAt = new Date();

  try {
    const updatePayload =
      iconVal !== undefined
        ? { ...baseData, icon: iconVal }
        : baseData;

    const updated = await prisma.category.update({
      where: { id },
      data: updatePayload,
      include: {
        _count: { select: { posts: true } },
      },
    });

    updatedId = updated.id;
    updatedName = updated.name;
    updatedSlug = updated.slug;
    updatedDescription = updated.description;
    updatedIcon = (updated as { icon?: string | null }).icon ?? (iconVal ?? null);
    postCount = updated._count.posts;
    createdAt = updated.createdAt;
    updatedAt = updated.updatedAt;
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('Unknown argument `icon`')) {
      const updated = await prisma.category.update({
        where: { id },
        data: baseData,
        include: {
          _count: { select: { posts: true } },
        },
      });

      updatedId = updated.id;
      updatedName = updated.name;
      updatedSlug = updated.slug;
      updatedDescription = updated.description;
      postCount = updated._count.posts;
      createdAt = updated.createdAt;
      updatedAt = updated.updatedAt;

      if (iconVal !== undefined) {
        try {
          await prisma.$executeRawUnsafe(
            `UPDATE "category" SET "icon" = $1 WHERE "id" = $2`,
            iconVal,
            id
          );
          updatedIcon = iconVal;
        } catch (rawErr) {
          console.warn('[category.service] Could not update icon via raw SQL:', rawErr);
        }
      }
    } else {
      throw err;
    }
  }

  // If category name changed, update categoryName in linked posts
  if (current.name !== validated.name) {
    await prisma.post.updateMany({
      where: { categoryId: id },
      data: { categoryName: validated.name },
    });
  }

  return {
    id: updatedId,
    name: updatedName,
    slug: updatedSlug,
    description: updatedDescription,
    icon: updatedIcon,
    count: postCount,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

/**
 * Delete a category by ID
 */
export async function deleteCategory(id: string): Promise<boolean> {
  const current = await prisma.category.findUnique({ where: { id } });
  if (!current) {
    throw new Error(`Không tìm thấy chuyên mục với ID "${id}"`);
  }

  // 1. Unlink posts in database referencing this category
  await prisma.post.updateMany({
    where: {
      OR: [
        { categoryId: id },
        { categoryName: current.name },
      ],
    },
    data: {
      categoryId: null,
      categoryName: 'Chưa phân loại',
    },
  });

  // 2. Also unlink in fallback blogs.json if it exists
  try {
    const blogsFilePath = path.join(process.cwd(), 'data', 'blogs.json');
    const blogsContent = await fs.readFile(blogsFilePath, 'utf-8');
    const blogs = JSON.parse(blogsContent);
    let blogsChanged = false;
    const updatedBlogs = blogs.map((b: { category?: string; tag?: string }) => {
      if (b.category === current.name || b.tag === current.name) {
        blogsChanged = true;
        return {
          ...b,
          category: b.category === current.name ? 'Chưa phân loại' : b.category,
          tag: b.tag === current.name ? 'Chưa phân loại' : b.tag,
        };
      }
      return b;
    });
    if (blogsChanged) {
      await fs.writeFile(blogsFilePath, JSON.stringify(updatedBlogs, null, 2), 'utf-8');
    }
  } catch {
    // Ignore fallback errors
  }

  // 3. Delete category from database
  await prisma.category.delete({
    where: { id },
  });

  return true;
}

/**
 * Bulk delete categories by IDs
 */
export async function bulkDeleteCategories(ids: string[]): Promise<number> {
  if (!ids || ids.length === 0) return 0;

  // 1. Find all categories to get their names before deleting
  const toDelete = await prisma.category.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true },
  });

  if (toDelete.length === 0) return 0;
  const names = toDelete.map((c) => c.name);

  // 2. Unlink all posts in PostgreSQL referencing these categories
  await prisma.post.updateMany({
    where: {
      OR: [
        { categoryId: { in: ids } },
        { categoryName: { in: names } },
      ],
    },
    data: {
      categoryId: null,
      categoryName: 'Chưa phân loại',
    },
  });

  // 3. Also unlink in fallback blogs.json if it exists
  try {
    const blogsFilePath = path.join(process.cwd(), 'data', 'blogs.json');
    const blogsContent = await fs.readFile(blogsFilePath, 'utf-8');
    const blogs = JSON.parse(blogsContent);
    let blogsChanged = false;
    const updatedBlogs = blogs.map((b: { category?: string; tag?: string }) => {
      if (names.includes(b.category || '') || names.includes(b.tag || '')) {
        blogsChanged = true;
        return {
          ...b,
          category: names.includes(b.category || '') ? 'Chưa phân loại' : b.category,
          tag: names.includes(b.tag || '') ? 'Chưa phân loại' : b.tag,
        };
      }
      return b;
    });
    if (blogsChanged) {
      await fs.writeFile(blogsFilePath, JSON.stringify(updatedBlogs, null, 2), 'utf-8');
    }
  } catch {
    // Ignore fallback errors
  }

  // 4. Delete categories from database
  const result = await prisma.category.deleteMany({
    where: { id: { in: ids } },
  });

  return result.count;
}

/**
 * Bulk update categories by IDs
 */
export async function bulkUpdateCategories(
  ids: string[],
  data: { description?: string; icon?: string | null }
): Promise<number> {
  const iconVal =
    data.icon !== undefined
      ? data.icon && data.icon.trim().length > 0
        ? data.icon.trim()
        : null
      : undefined;

  try {
    const result = await prisma.category.updateMany({
      where: { id: { in: ids } },
      data: {
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(iconVal !== undefined ? { icon: iconVal } : {}),
      },
    });
    return result.count;
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('Unknown argument `icon`')) {
      const result = await prisma.category.updateMany({
        where: { id: { in: ids } },
        data: {
          ...(data.description !== undefined ? { description: data.description } : {}),
        },
      });

      if (iconVal !== undefined) {
        try {
          await prisma.$executeRawUnsafe(
            `UPDATE "category" SET "icon" = $1 WHERE "id" = ANY($2::text[])`,
            iconVal,
            ids
          );
        } catch (rawErr) {
          console.warn('[category.service] Bulk raw SQL icon update error:', rawErr);
        }
      }

      return result.count;
    }
    throw err;
  }
}

