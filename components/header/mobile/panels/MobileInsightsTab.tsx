'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getCategoryHref, type CategoryItem } from '@/types/category';
import NavArrowIcon from '../../ui/NavArrowIcon';

interface MobileInsightsTabProps {
  categories: CategoryItem[];
  onClose: () => void;
}

export default function MobileInsightsTab({
  categories,
  onClose,
}: MobileInsightsTabProps) {
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-wider">
        Insights
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const href = getCategoryHref(cat.slug);
          return (
            <Link
              key={cat.id || cat.slug}
              href={href}
              onClick={onClose}
              className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
            >
              <div className="flex items-center gap-3 min-w-0">
                {cat.icon ? (
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-5 h-5 object-contain shrink-0"
                  />
                ) : null}
                <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition truncate">
                  {cat.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </Link>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-100">
        <Link
          href="/insights"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 hover:border-black text-sm font-semibold text-gray-800 transition"
        >
          <NavArrowIcon size={14} />
          <span>All Insights</span>
        </Link>
      </div>
    </div>
  );
}
