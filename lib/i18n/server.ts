import { headers } from 'next/headers';
import { LOCALE_HEADER, normalizeLocale, type Locale } from './config';

/**
 * Language of the current request (set by middleware: "/vi/..." -> 'vi', everything else 'en').
 * Reading request headers makes the calling route dynamic, which the public pages already are.
 */
export async function getLocale(): Promise<Locale> {
  const h = await headers();
  return normalizeLocale(h.get(LOCALE_HEADER));
}
