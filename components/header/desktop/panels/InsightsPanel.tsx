'use client';

import React from 'react';
import Link from 'next/link';
import { getCategoryHref, type CategoryItem } from '@/types/category';
import NavArrowIcon from '../../ui/NavArrowIcon';
import { useLocalizeHref, useT } from '@/components/providers/LocaleProvider';

interface InsightsPanelProps {
  categories: CategoryItem[];
  onItemClick: () => void;
}

export default function InsightsPanel({ categories, onItemClick }: InsightsPanelProps) {
  const t = useT();
  const lh = useLocalizeHref();

  return (
    <div>
      <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-8 font-montserrat">
        {t.activities.title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
        {categories.map((cat) => {
          const href = getCategoryHref(cat.slug);
          return (
            <Link
              key={cat.id || cat.slug}
              href={lh(href)}
              onClick={onItemClick}
              className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
            >
              {cat.icon ? (
                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                  />
                </span>
              ) : null}
              <span className="group-hover:translate-x-0.5 transition-transform truncate">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="pt-2">
        <Link
          href={lh('/insights')}
          onClick={onItemClick}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
        >
          <NavArrowIcon />
          <span>{t.activities.all}</span>
        </Link>
      </div>
    </div>
  );
}
