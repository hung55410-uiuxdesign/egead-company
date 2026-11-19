'use client';

import Link from 'next/link';
import type { BlogPost, BlogSibling } from '@/types/blog';
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/i18n/config';
import { useLocalizeHref, useT } from '@/components/providers/LocaleProvider';

type Props = {
  post: BlogPost;
  siblings: BlogSibling[];
};

/**
 * EN | VI switch that only changes THIS article's language.
 * Links keep the current site language prefix, so header/footer and the rest of the
 * site are not affected. Rendered only when the article exists in both languages.
 */
export default function ArticleLanguageToggle({ post, siblings }: Props) {
  const t = useT();
  const lh = useLocalizeHref();
  const current: Locale = post.locale || 'en';

  const byLocale = new Map<Locale, string>();
  byLocale.set(current, post.slug);
  siblings.forEach((s) => {
    if (s.id !== post.id) byLocale.set(s.locale, s.slug);
  });

  if (byLocale.size < 2) return null;

  return (
    <div
      className="flex items-center gap-3 mb-8 font-montserrat"
      role="group"
      aria-label={t.article.readThisIn}
    >
      <span className="text-xs text-[#b3b3b3]">{t.article.readThisIn}</span>
      <div className="inline-flex items-center rounded-full border border-[#666666] p-0.5 text-xs font-semibold">
        {LOCALES.filter((code) => byLocale.has(code)).map((code) =>
          code === current ? (
            <span
              key={code}
              aria-current="true"
              lang={code}
              className="px-3.5 py-1.5 rounded-full bg-[#10E774] text-black"
            >
              {LOCALE_LABELS[code].full}
            </span>
          ) : (
            <Link
              key={code}
              href={lh(`/articles/${byLocale.get(code)}`)}
              lang={code}
              className="px-3.5 py-1.5 rounded-full text-[#b3b3b3] hover:text-white transition"
            >
              {LOCALE_LABELS[code].full}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
