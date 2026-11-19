'use client';

import React from 'react';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n/config';
import { useLocale, useT } from '@/components/providers/LocaleProvider';
import { useSwitchLocale } from '@/components/i18n/useSwitchLocale';

/** Compact EN | VI toggle for the mobile menu header. */
export default function MobileLanguageSwitch() {
  const locale = useLocale();
  const t = useT();
  const switchLocale = useSwitchLocale();

  return (
    <div
      role="group"
      aria-label={t.common.selectLanguage}
      className="inline-flex items-center rounded-full border border-gray-200 p-0.5 text-xs font-semibold"
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          aria-pressed={locale === code}
          className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
            locale === code ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
          }`}
        >
          {LOCALE_LABELS[code].short}
        </button>
      ))}
    </div>
  );
}
