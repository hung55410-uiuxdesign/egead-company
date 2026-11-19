/**
 * E-GEAD i18n core (EN default, VI under the /vi prefix).
 * Pure functions only: safe to import from middleware, server and client code.
 */
export const LOCALES = ['en', 'vi'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Request header set by middleware so server components know the site language. */
export const LOCALE_HEADER = 'x-egead-locale';

/** Cookie remembering the language the visitor picked with the language switcher. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const LOCALE_LABELS: Record<Locale, { short: string; full: string }> = {
  en: { short: 'EN', full: 'English' },
  vi: { short: 'VI', full: 'Tiếng Việt' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Pick the right string for a locale, falling back to English when the Vietnamese text is empty. */
export function pickLocalized(
  locale: Locale,
  en: string | undefined | null,
  vi: string | undefined | null
): string {
  if (locale === 'vi' && vi && vi.trim()) return vi;
  return en || vi || '';
}

/**
 * "/vi/careers" -> { locale: 'vi', pathname: '/careers' }
 * "/careers"    -> { locale: null, pathname: '/careers' }
 */
export function stripLocalePrefix(pathname: string): {
  locale: Locale | null;
  pathname: string;
} {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    const prefix = `/${locale}`;
    if (pathname === prefix) return { locale, pathname: '/' };
    if (pathname.startsWith(`${prefix}/`)) {
      return { locale, pathname: pathname.slice(prefix.length) || '/' };
    }
  }
  return { locale: null, pathname };
}

const UNLOCALIZED_PREFIXES = ['/admin', '/api', '/assets', '/_next', '/models', '/images'];

/** True for site-internal page paths that belong to a language (not admin / api / assets). */
export function isLocalizablePath(href: string): boolean {
  if (!href.startsWith('/') || href.startsWith('//')) return false;
  return !UNLOCALIZED_PREFIXES.some(
    (p) => href === p || href.startsWith(`${p}/`) || href.startsWith(`${p}?`)
  );
}

/**
 * Add the language prefix to an internal href.
 * English has no prefix; external links, anchors, mailto and admin/api paths are untouched.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (!href || locale === DEFAULT_LOCALE) return href;
  if (!isLocalizablePath(href)) return href;
  if (stripLocalePrefix(href.split(/[?#]/)[0]).locale) return href;
  if (href === '/') return `/${locale}`;
  if (href.startsWith('/?') || href.startsWith('/#')) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Path (with query/hash) of the same page in another language. */
export function switchLocalePath(
  pathname: string,
  search: string,
  hash: string,
  target: Locale
): string {
  const { pathname: bare } = stripLocalePrefix(pathname);
  const rest = `${search || ''}${hash || ''}`;
  return `${localizeHref(bare, target)}${rest}`;
}
