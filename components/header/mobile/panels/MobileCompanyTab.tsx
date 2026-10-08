'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface MobileCompanyTabProps {
  onClose: () => void;
}

const COMPANY_LINKS = [
  { name: 'About us', href: '/company', icon: '/assets/icon_about_us.svg' },
  { name: 'Our Offices', href: '/contact-us', icon: '/assets/icon_offices.svg' },
  { name: 'Careers', href: '/careers', icon: '/assets/icon_career.svg' },
  { name: 'Our People', href: '/people', icon: '/assets/icon_people.svg' },
];

export default function MobileCompanyTab({ onClose }: MobileCompanyTabProps) {
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-wider">
        Company
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COMPANY_LINKS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.icon}
                alt={item.name}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-semibold text-gray-900 group-hover:text-[#007A3D] transition">
                {item.name}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#007A3D] group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
