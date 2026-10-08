'use client';

import React from 'react';
import FooterLanguageDropdown from '../ui/FooterLanguageDropdown';
import BackToTopButton from '../ui/BackToTopButton';

export default function FooterBottomBar() {
  return (
    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
      {/* Language Selector Left */}
      <FooterLanguageDropdown />

      {/* Back to top Center */}
      <BackToTopButton />

      {/* Copyright Right */}
      <div className="text-right">
        <span>© 2026 E-Gead Company. All rights reserved.</span>
      </div>
    </div>
  );
}
