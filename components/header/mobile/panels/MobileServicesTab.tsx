'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import NavArrowIcon from '../../ui/NavArrowIcon';
import { SERVICE_ITEMS, INDUSTRY_ITEMS, PARTNER_ITEMS } from '../../config/nav-items';
import type { HeaderServicesMenuData } from '@/lib/services/home-section.service';

interface MobileServicesTabProps {
  onClose: () => void;
  servicesMenu?: HeaderServicesMenuData | null;
}

export default function MobileServicesTab({
  onClose,
  servicesMenu,
}: MobileServicesTabProps) {
  const servicesList =
    servicesMenu?.services && servicesMenu.services.length > 0
      ? servicesMenu.services
      : SERVICE_ITEMS;
  const industriesList =
    servicesMenu?.industries && servicesMenu.industries.length > 0
      ? servicesMenu.industries
      : INDUSTRY_ITEMS;
  const partnersList =
    servicesMenu?.partners && servicesMenu.partners.length > 0
      ? servicesMenu.partners
      : PARTNER_ITEMS;

  const allServicesText = servicesMenu?.allServicesText || 'All Our Services';
  const allServicesHref =
    servicesMenu?.allServicesHref || '/services/all-services';

  const allIndustriesText =
    servicesMenu?.allIndustriesText || 'All Industries';
  const allIndustriesHref =
    servicesMenu?.allIndustriesHref || '/services/all-services#industries';

  const allPartnersText = servicesMenu?.allPartnersText || 'All Partners';
  const allPartnersHref = servicesMenu?.allPartnersHref || '/partners';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {/* Column 1: Our Services */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          Our Services
        </h3>
        <ul className="space-y-3.5 mb-6">
          {servicesList.map((service) => (
            <li key={service.name}>
              <Link
                href={service.href}
                onClick={onClose}
                className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={service.icon || '/assets/icon_strategy_design.svg'}
                    alt={service.name}
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = '0.3';
                    }}
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
            href={allServicesHref}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 transition"
          >
            <NavArrowIcon size={12} />
            <span>{allServicesText}</span>
          </Link>
        </div>
      </div>

      {/* Column 2: Industries */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          Industries
        </h3>
        <ul className="space-y-3.5 mb-6">
          {industriesList.map((ind) => (
            <li key={ind.name}>
              <Link
                href={ind.href}
                onClick={onClose}
                className="group flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#007A3D] transition"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={ind.icon || '/assets/icon_automotive.svg'}
                    alt={ind.name}
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = '0.3';
                    }}
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
            href={allIndustriesHref}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 transition"
          >
            <NavArrowIcon size={12} />
            <span>{allIndustriesText}</span>
          </Link>
        </div>
      </div>

      {/* Column 3: Partners */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          Partners
        </h3>
        <ul className="space-y-3.5 mb-6">
          {partnersList.map((p) => (
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
            href={allPartnersHref}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 transition"
          >
            <NavArrowIcon size={12} />
            <span>{allPartnersText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
