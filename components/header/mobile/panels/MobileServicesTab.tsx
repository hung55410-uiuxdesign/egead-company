'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import NavArrowIcon from '../../ui/NavArrowIcon';
import { SERVICE_ITEMS, INDUSTRY_ITEMS, PARTNER_ITEMS } from '../../config/nav-items';

interface MobileServicesTabProps {
  onClose: () => void;
}

export default function MobileServicesTab({ onClose }: MobileServicesTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {/* Column 1: Our Services */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          Our Services
        </h3>
        <ul className="space-y-3.5 mb-6">
          {SERVICE_ITEMS.map((service) => (
            <li key={service.name}>
              <Link
                href={service.href}
                onClick={onClose}
                className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="w-4 h-4 object-contain"
                  />
                  <span>{service.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <Link
            href="/services/all-services"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 transition"
          >
            <NavArrowIcon size={12} />
            <span>All Our Services</span>
          </Link>
        </div>
      </div>

      {/* Column 2: Industries */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          Industries
        </h3>
        <ul className="space-y-3.5 mb-6">
          {INDUSTRY_ITEMS.map((ind) => (
            <li key={ind.name}>
              <Link
                href={ind.href}
                onClick={onClose}
                className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={ind.icon}
                    alt={ind.name}
                    className="w-4 h-4 object-contain"
                  />
                  <span>{ind.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <Link
            href="/services/all-services#industries"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 transition"
          >
            <NavArrowIcon size={12} />
            <span>All Industries</span>
          </Link>
        </div>
      </div>

      {/* Column 3: Partners */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          Partners
        </h3>
        <ul className="space-y-3.5 mb-6">
          {PARTNER_ITEMS.map((p) => (
            <li key={p.name}>
              <Link
                href={p.href}
                onClick={onClose}
                className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
              >
                <span>{p.name}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <Link
            href="/partners"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 transition"
          >
            <NavArrowIcon size={12} />
            <span>All Partners</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
