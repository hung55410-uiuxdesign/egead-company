'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  COMPANY_ITEMS_COL1,
  COMPANY_ITEMS_COL2,
  COMPANY_ITEMS_COL3,
} from '../../config/nav-items';
import { useLocalizeHref, useT } from '@/components/providers/LocaleProvider';

interface CompanyPanelProps {
  onItemClick: () => void;
}

export default function CompanyPanel({ onItemClick }: CompanyPanelProps) {
  const t = useT();
  const lh = useLocalizeHref();

  return (
    <div>
      <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-8 font-montserrat">
        {t.company.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {/* Column 1: About us & Our Offices */}
          <div className="space-y-4">
            {COMPANY_ITEMS_COL1.map((item) => (
              <Link
                key={item.name}
                href={lh(item.href)}
                onClick={onItemClick}
                className={`group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200 ${
                  item.hasBorderBottom ? 'border-b border-gray-100 pb-3' : ''
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src={item.icon}
                    alt={t.company[item.key]}
                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                  />
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform">{t.company[item.key]}</span>
              </Link>
            ))}
          </div>

          {/* Column 2: Careers */}
          <div className="space-y-4">
            {COMPANY_ITEMS_COL2.map((item) => (
              <Link
                key={item.name}
                href={lh(item.href)}
                onClick={onItemClick}
                className="group flex items-center justify-between py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-5 h-5 flex items-center justify-center shrink-0">
                    <img
                      src={item.icon}
                      alt={t.company[item.key]}
                      className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                    />
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform">{t.company[item.key]}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* Column 3: Our People */}
          <div className="space-y-4">
            {COMPANY_ITEMS_COL3.map((item) => (
              <Link
                key={item.name}
                href={lh(item.href)}
                onClick={onItemClick}
                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
              >
                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src={item.icon}
                    alt={t.company[item.key]}
                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                  />
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform">{t.company[item.key]}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4: Featured Image Card */}
        <div className="md:col-span-4 lg:col-span-3 flex justify-end">
          <div className="w-full max-w-[300px] h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group bg-black">
            <img
              src="/assets/menu_company.jpg"
              alt="E-GEAD Company"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
