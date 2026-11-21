import { unstable_cache } from 'next/cache';
import { getCategoriesWithCount } from '@/lib/services/category.service';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';
import { getFooterConfig } from '@/lib/services/footer-config.service';
import { getAllPosts } from '@/lib/blogs';
import type { Locale } from '@/lib/i18n/config';

/**
 * Cached reads for the public site.
 *
 * Every public page is rendered per request (the root layout reads the locale header), so without this each
 * visit ran 3 DB queries in the layout plus 5 more on the home page, against a database that can be far from
 * the server. These wrappers keep the results in Next's Data Cache for a short time:
 *   - entries expire by themselves after REVALIDATE_SECONDS, and
 *   - the admin routes call `revalidateTag(PUBLIC_DATA_TAG, { expire: 0 })` so edits show up immediately.
 * The underlying services are unchanged, so scripts and tests keep calling them directly.
 *
 * Results are JSON-serialised by the cache, so Date fields come back as ISO strings.
 */
export const PUBLIC_DATA_TAG = 'public-data';
const REVALIDATE_SECONDS = 60;
const options = { tags: [PUBLIC_DATA_TAG], revalidate: REVALIDATE_SECONDS };

/** Thrown inside a cached function so an empty/failed result is NOT stored (it is retried on the next request). */
class NotCacheable extends Error {}

export const getCachedCategoriesWithCount = unstable_cache(
  async () => getCategoriesWithCount(),
  ['public-categories-with-count'],
  options
);

export const getCachedFooterConfig = unstable_cache(
  async () => getFooterConfig(),
  ['public-footer-config'],
  options
);

export async function getCachedHomeSectionByKey(key: string) {
  try {
    return await unstable_cache(
      async () => {
        const section = await getHomeSectionByKey(key);
        if (!section) throw new NotCacheable();
        return section;
      },
      ['public-home-section', key],
      options
    )();
  } catch (error) {
    if (error instanceof NotCacheable) return null;
    throw error;
  }
}

export async function getCachedLatestPosts(locale: Locale, limit = 10) {
  try {
    return await unstable_cache(
      async () => {
        const posts = await getAllPosts({ status: 'published', limit, locale });
        if (!posts.length) throw new NotCacheable();
        return posts;
      },
      ['public-latest-posts', locale, String(limit)],
      options
    )();
  } catch (error) {
    if (error instanceof NotCacheable) return [];
    throw error;
  }
}
