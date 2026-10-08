'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCT_COLUMNS } from '../../config/nav-items';

interface ProductsPanelProps {
  onItemClick: () => void;
}

export default function ProductsPanel({ onItemClick }: ProductsPanelProps) {
  return (
    <div>
      <h3 className="text-xs sm:text-sm font-semibold text-gray-500 mb-6 tracking-wide uppercase">
        Our Products
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Columns 1-3: Product Links */}
        <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCT_COLUMNS.map((col, idx) => (
            <div key={idx} className="space-y-4">
              {col.items.map((prod) => {
                const IconComponent = prod.icon;
                return (
                  <Link
                    key={prod.name}
                    href={prod.href}
                    onClick={onItemClick}
                    className="group flex items-center gap-3 py-1.5 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition"
                  >
                    <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-[#10E774] group-hover:scale-115 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{prod.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Column 4: Featured Image Card */}
        <div className="md:col-span-4 lg:col-span-3 flex justify-end">
          <div className="w-full max-w-[300px] h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group bg-black">
            <img
              src="/assets/menu_product_3d.jpg"
              alt="E-GEAD Products"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
