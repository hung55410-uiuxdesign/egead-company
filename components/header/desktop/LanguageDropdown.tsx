'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n/config';
import { useLocale, useT } from '@/components/providers/LocaleProvider';
import { useSwitchLocale } from '@/components/i18n/useSwitchLocale';

export default function LanguageDropdown() {
  const locale = useLocale();
  const t = useT();
  const switchLocale = useSwitchLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={t.common.selectLanguage}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[13px] font-medium text-white/90 hover:text-white transition py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
      >
        <Globe className="w-4 h-4 text-[#F2F2F2]" />
        <span className="text-[#F2F2F2] font-semibold">{LOCALE_LABELS[locale].short}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center"
        >
          <ChevronDown className="w-3.5 h-3.5 text-[#8C8C8C]" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute right-0 top-full mt-2 w-36 rounded-2xl bg-[#141718]/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl z-50"
          >
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => {
                  setOpen(false);
                  switchLocale(code);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  locale === code
                    ? 'bg-[#10E774]/20 text-[#10E774]'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {LOCALE_LABELS[code].full}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
