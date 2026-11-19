'use client';

import React, { useState } from 'react';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n/config';
import { useLocale, useT } from '@/components/providers/LocaleProvider';
import { useSwitchLocale } from '@/components/i18n/useSwitchLocale';

export default function FooterLanguageDropdown() {
  const [langOpen, setLangOpen] = useState(false);
  const locale = useLocale();
  const t = useT();
  const switchLocale = useSwitchLocale();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setLangOpen(!langOpen)}
        className="flex items-center gap-1.5 text-xs font-semibold text-black hover:text-[#007A3D] transition cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path
            d="M9.99297 1.66602C5.39297 1.66602 1.66797 5.39935 1.66797 9.99935C1.66797 14.5993 5.39297 18.3327 9.99297 18.3327C14.6013 18.3327 18.3346 14.5993 18.3346 9.99935C18.3346 5.39935 14.6013 1.66602 9.99297 1.66602ZM15.768 6.66602H13.3096C13.043 5.62435 12.6596 4.62435 12.1596 3.69935C13.693 4.22435 14.968 5.29102 15.768 6.66602ZM10.0013 3.36602C10.693 4.36602 11.2346 5.47435 11.593 6.66602H8.40964C8.76797 5.47435 9.30964 4.36602 10.0013 3.36602ZM3.5513 11.666C3.41797 11.1327 3.33464 10.5743 3.33464 9.99935C3.33464 9.42435 3.41797 8.86602 3.5513 8.33268H6.36797C6.3013 8.88268 6.2513 9.43268 6.2513 9.99935C6.2513 10.566 6.3013 11.116 6.36797 11.666H3.5513ZM4.23464 13.3327H6.69297C6.95964 14.3743 7.34297 15.3743 7.84297 16.2993C6.30964 15.7743 5.03464 14.716 4.23464 13.3327ZM6.69297 6.66602H4.23464C5.03464 5.28268 6.30964 4.22435 7.84297 3.69935C7.34297 4.62435 6.95964 5.62435 6.69297 6.66602ZM10.0013 16.6327C9.30964 15.6327 8.76797 14.5243 8.40964 13.3327H11.593C11.2346 14.5243 10.693 15.6327 10.0013 16.6327ZM11.9513 11.666H8.0513C7.9763 11.116 7.91797 10.566 7.91797 9.99935C7.91797 9.43268 7.9763 8.87435 8.0513 8.33268H11.9513C12.0263 8.87435 12.0846 9.43268 12.0846 9.99935C12.0846 10.566 12.0263 11.116 11.9513 11.666ZM12.1596 16.2993C12.6596 15.3743 13.043 14.3743 13.3096 13.3327H15.768C14.968 14.7077 13.693 15.7743 12.1596 16.2993ZM13.6346 11.666C13.7013 11.116 13.7513 10.566 13.7513 9.99935C13.7513 9.43268 13.7013 8.88268 13.6346 8.33268H16.4513C16.5846 8.86602 16.668 9.42435 16.668 9.99935C16.668 10.5743 16.5846 11.1327 16.4513 11.666H13.6346Z"
            fill="black"
          />
        </svg>
        <span>{t.footer.language}: {LOCALE_LABELS[locale].short}</span>
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
          <path d="M10 6.42578L9.295 5.72078L6.5 8.51078V2.42578H5.5V8.51078L2.71 5.71578L2 6.42578L6 10.4258L10 6.42578Z" fill="black" />
        </svg>
      </button>

      {langOpen && (
        <div className="absolute left-0 bottom-full mb-2 w-32 rounded-xl bg-white border border-gray-200 shadow-xl p-1 z-50">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLangOpen(false);
                switchLocale(l);
              }}
              className={`w-full text-left px-3 py-1.5 rounded-lg hover:bg-gray-100 font-semibold text-xs cursor-pointer ${
                l === locale ? 'text-[#007A3D]' : ''
              }`}
            >
              {LOCALE_LABELS[l].full}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
