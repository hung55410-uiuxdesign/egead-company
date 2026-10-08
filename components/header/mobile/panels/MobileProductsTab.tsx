'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MOBILE_PRODUCT_CARDS } from '../../config/nav-items';

interface MobileProductsTabProps {
  onClose: () => void;
}

export default function MobileProductsTab({ onClose }: MobileProductsTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {MOBILE_PRODUCT_CARDS.map((card) => (
        <div
          key={card.title}
          className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#10E774] transition"
        >
          <span className="text-xs font-bold text-[#007A3D]">{card.tag}</span>
          <h4 className="text-lg font-bold text-gray-900 mt-1">{card.title}</h4>
          <p className="text-sm text-gray-600 mt-2">{card.description}</p>
          <Link
            href={card.href}
            onClick={onClose}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#007A3D] mt-3 hover:underline"
          >
            {card.actionText} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
