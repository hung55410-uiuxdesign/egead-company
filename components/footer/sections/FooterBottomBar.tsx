'use client';

import React from 'react';
import FooterLanguageDropdown from '../ui/FooterLanguageDropdown';
import BackToTopButton from '../ui/BackToTopButton';
import type { FooterBottomBarData } from '@/lib/services/footer-config.service';

interface FooterBottomBarProps {
  bottomBar?: FooterBottomBarData;
}

export default function FooterBottomBar({ bottomBar }: FooterBottomBarProps) {
  const copyright =
    bottomBar?.copyright || '© 2026 E-Gead Company. All rights reserved.';
  const showLanguage = bottomBar?.showLanguageSelector ?? true;
  const showBackToTop = bottomBar?.showBackToTop ?? true;

  return (
    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
      {/* Language Selector Left */}
      <div>{showLanguage && <FooterLanguageDropdown />}</div>

      {/* Back to top Center */}
      <div>{showBackToTop && <BackToTopButton />}</div>

      {/* Copyright Right */}
      <div className="text-right">
        <span>{copyright}</span>
      </div>
    </div>
  );
}
