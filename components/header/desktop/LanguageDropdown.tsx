'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import type { LanguageCode } from '../types';
import { AVAILABLE_LANGUAGES } from '../config/nav-items';

export default function LanguageDropdown() {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('EN');

  return (
    <div className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setLangDropdownOpen(!langDropdownOpen)}
        className="flex items-center gap-1.5 text-[13px] font-medium text-white/90 hover:text-white transition py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer"
      >
        <Globe className="w-4 h-4 text-[#F2F2F2]" />
        <span className="text-[#F2F2F2] font-semibold">{selectedLang}</span>
        <motion.span
          animate={{ rotate: langDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center"
        >
          <ChevronDown className="w-3.5 h-3.5 text-[#8C8C8C]" />
        </motion.span>
      </button>

      <AnimatePresence>
        {langDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute right-0 top-full mt-2 w-32 rounded-2xl bg-[#141718]/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl z-50"
          >
            {AVAILABLE_LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setSelectedLang(code);
                  setLangDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedLang === code
                    ? 'bg-[#10E774]/20 text-[#10E774]'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
