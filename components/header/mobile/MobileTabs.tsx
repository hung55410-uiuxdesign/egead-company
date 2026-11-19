'use client';

import React from 'react';
import Link from 'next/link';
import { useLocalizeHref, useT } from '@/components/providers/LocaleProvider';

export type MobileTabKey = 'services' | 'insights' | 'company';

interface MobileTabsProps {
  activeTab: MobileTabKey;
  onTabChange: (tab: MobileTabKey) => void;
  onClose: () => void;
}

export default function MobileTabs({
  activeTab,
  onTabChange,
  onClose,
}: MobileTabsProps) {
  const t = useT();
  const lh = useLocalizeHref();

  return (
    <div className="flex flex-wrap gap-3 sm:gap-6 border-b border-gray-100 pb-4 mb-8 text-sm sm:text-base font-semibold">
      <button
        type="button"
        onClick={() => onTabChange('services')}
        className={`pb-2 border-b-2 transition cursor-pointer ${
          activeTab === 'services'
            ? 'border-[#10E774] text-black'
            : 'border-transparent text-gray-500 hover:text-black'
        }`}
      >
        {t.nav.services}
      </button>

      <button
        type="button"
        onClick={() => onTabChange('insights')}
        className={`pb-2 border-b-2 transition cursor-pointer ${
          activeTab === 'insights'
            ? 'border-[#10E774] text-black'
            : 'border-transparent text-gray-500 hover:text-black'
        }`}
      >
        {t.nav.insights}
      </button>

      <Link
        href={lh('/careers')}
        onClick={onClose}
        className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-black transition"
      >
        {t.nav.careers}
      </Link>

      <button
        type="button"
        onClick={() => onTabChange('company')}
        className={`pb-2 border-b-2 transition cursor-pointer ${
          activeTab === 'company'
            ? 'border-[#10E774] text-black'
            : 'border-transparent text-gray-500 hover:text-black'
        }`}
      >
        {t.nav.company}
      </button>
    </div>
  );
}
