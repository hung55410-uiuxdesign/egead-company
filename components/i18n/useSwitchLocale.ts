'use client';

import { useCallback } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { LOCALE_COOKIE, switchLocalePath, type Locale } from '@/lib/i18n/config';

/**
 * Switch the whole site language (header, footer, page).
 * Uses a full navigation on purpose: the root layout (<html lang>, dictionary) is
 * rendered on the server, and a soft navigation would keep the old layout.
 */
export function useSwitchLocale() {
  const locale = useLocale();

  return useCallback(
    (target: Locale) => {
      if (target === locale) return;
      document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
      const { pathname, search, hash } = window.location;
      window.location.assign(switchLocalePath(pathname, search, hash, target));
    },
    [locale]
  );
}
