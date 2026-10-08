'use client';

import React from 'react';
import Link from 'next/link';

export type MobileTabKey = 'services' | 'products' | 'insights' | 'company';

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
        Our Services
      </button>

      <button
        type="button"
        onClick={() => onTabChange('products')}
        className={`pb-2 border-b-2 transition cursor-pointer ${
          activeTab === 'products'
            ? 'border-[#10E774] text-black'
            : 'border-transparent text-gray-500 hover:text-black'
        }`}
      >
        Our Products
      </button>

      <Link
        href="/our-work"
        onClick={onClose}
        className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-black transition"
      >
        Our Work
      </Link>

      <button
        type="button"
        onClick={() => onTabChange('insights')}
        className={`pb-2 border-b-2 transition cursor-pointer ${
          activeTab === 'insights'
            ? 'border-[#10E774] text-black'
            : 'border-transparent text-gray-500 hover:text-black'
        }`}
      >
        Insights
      </button>

      <button
        type="button"
        onClick={() => onTabChange('company')}
        className={`pb-2 border-b-2 transition cursor-pointer ${
          activeTab === 'company'
            ? 'border-[#10E774] text-black'
            : 'border-transparent text-gray-500 hover:text-black'
        }`}
      >
        Company
      </button>
    </div>
  );
}
