export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  count: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Generate a clean URL-friendly slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Get public URL for a category slug
 */
export function getCategoryHref(slug: string): string {
  const normalized = (slug || '').toLowerCase().trim();
  if (normalized === 'webinars') return '/webinars';
  if (normalized === 'announcements') return '/announcements';
  if (normalized === 'white-papers' || normalized === 'whitepapers') return '/white-papers';
  if (normalized === 'blog' || normalized === 'blogs') return '/blog';
  return `/insights?category=${encodeURIComponent(normalized)}`;
}

