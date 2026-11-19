'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { localizeHref, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, dict }), [locale, dict]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale/useT must be used inside <LocaleProvider>');
  }
  return ctx;
}

/** Current site language ('en' | 'vi'). */
export function useLocale(): Locale {
  return useLocaleContext().locale;
}

/** UI dictionary for the current language. */
export function useT(): Dictionary {
  return useLocaleContext().dict;
}

/** Returns a function that adds the /vi prefix to internal links when the site is in Vietnamese. */
export function useLocalizeHref(): (href: string) => string {
  const { locale } = useLocaleContext();
  return (href: string) => localizeHref(href, locale);
}
