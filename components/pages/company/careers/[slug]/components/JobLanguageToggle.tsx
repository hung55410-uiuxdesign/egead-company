'use client';

import Link from 'next/link';
import type { JobOpening } from '@/lib/careers';
import type { CareerSibling } from '@/types/career';
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/i18n/config';
import { useLocalizeHref, useT } from '@/components/providers/LocaleProvider';

type Props = {
  job: JobOpening;
  siblings: CareerSibling[];
};

/**
 * EN | VI switch that only changes THIS job posting's language.
 * Links keep the current site language prefix, so header/footer are not affected.
 * Rendered only when the posting exists in both languages.
 */
export default function JobLanguageToggle({ job, siblings }: Props) {
  const t = useT();
  const lh = useLocalizeHref();
  const current: Locale = job.locale || 'en';

  const byLocale = new Map<Locale, string>();
  byLocale.set(current, job.slug);
  siblings.forEach((s) => {
    if (s.id !== job.id) byLocale.set(s.locale, s.slug);
  });

  if (byLocale.size < 2) return null;

  return (
    <div
      className="flex items-center gap-3 mb-6"
      role="group"
      aria-label={t.careers.viewThisIn}
    >
      <span className="text-xs text-slate-500 font-medium">{t.careers.viewThisIn}</span>
      <div className="inline-flex items-center rounded-full border border-slate-200 p-0.5 text-xs font-semibold">
        {LOCALES.filter((code) => byLocale.has(code)).map((code) =>
          code === current ? (
            <span
              key={code}
              aria-current="true"
              lang={code}
              className="px-3.5 py-1.5 rounded-full bg-slate-900 text-white"
            >
              {LOCALE_LABELS[code].full}
            </span>
          ) : (
            <Link
              key={code}
              href={lh(`/careers/${byLocale.get(code)}`)}
              lang={code}
              className="px-3.5 py-1.5 rounded-full text-slate-600 hover:text-slate-900 transition"
            >
              {LOCALE_LABELS[code].full}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
