'use client';

import React from 'react';
import Link from 'next/link';
import NavArrowIcon from '../../ui/NavArrowIcon';
import { SERVICE_ITEMS, INDUSTRY_ITEMS, PARTNER_ITEMS } from '../../config/nav-items';

interface ServicesPanelProps {
  onItemClick: () => void;
}

export default function ServicesPanel({ onItemClick }: ServicesPanelProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-14 items-start">
        {/* Column 1: Our Services */}
        <div>
          <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-6 font-montserrat">
            Our Services
          </h3>
          <div className="space-y-4 mb-8">
            {SERVICE_ITEMS.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                onClick={onItemClick}
                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
              >
                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                  />
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform">{service.name}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/services/all-services"
            onClick={onItemClick}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
          >
            <NavArrowIcon />
            <span>All Our Services</span>
          </Link>
        </div>

        {/* Column 2: Industries */}
        <div>
          <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-6 font-montserrat">
            Industries
          </h3>
          <div className="space-y-4 mb-8">
            {INDUSTRY_ITEMS.map((ind) => (
              <Link
                key={ind.name}
                href={ind.href}
                onClick={onItemClick}
                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
              >
                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src={ind.icon}
                    alt={ind.name}
                    className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                  />
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform">{ind.name}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/services/all-services#industries"
            onClick={onItemClick}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
          >
            <NavArrowIcon />
            <span>All Industries</span>
          </Link>
        </div>

        {/* Column 3: Partners */}
        <div>
          <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-6 font-montserrat">
            Partners
          </h3>
          <div className="space-y-4 mb-8">
            {PARTNER_ITEMS.map((partner) => (
              <Link
                key={partner.name}
                href={partner.href}
                onClick={onItemClick}
                className="group flex items-center py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">{partner.name}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/partners"
            onClick={onItemClick}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
          >
            <NavArrowIcon />
            <span>All Partners</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
