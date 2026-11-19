'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import NavArrowIcon from '../../ui/NavArrowIcon';
import type { HeaderServicesMenuData } from '@/lib/services/home-section.service';
import { useT } from '@/components/providers/LocaleProvider';

interface MobileServicesTabProps {
  onClose: () => void;
  servicesMenu?: HeaderServicesMenuData | null;
}

export default function MobileServicesTab({
  onClose,
  servicesMenu,
}: MobileServicesTabProps) {
  const t = useT();
  const servicesList = servicesMenu?.services || [];
  const industriesList = servicesMenu?.industries || [];
  const partnersList = servicesMenu?.partners || [];

  const allServicesText = servicesMenu?.allServicesText || 'All Our Services';
  const allServicesHref =
    servicesMenu?.allServicesHref || '/services/all-services';

  const allIndustriesText =
    servicesMenu?.allIndustriesText || 'All Industries';
  const allIndustriesHref =
    servicesMenu?.allIndustriesHref || '/services/all-services#industries';

  const allPartnersText = servicesMenu?.allPartnersText || 'All Partners';
  const allPartnersHref = servicesMenu?.allPartnersHref || '/partners';

  const hasPartners = partnersList.length > 0;

  return (
    <div
      className={`grid grid-cols-1 ${
        hasPartners ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
      } gap-8`}
    >
      {/* Column 1: Our Services */}
      <div>
        <h3 className="text-xs font-bold text-gray-500 mb-4">
          {t.servicesPage.operations}
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
                  {service.icon ? (
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.3';
                      }}
                    />
                  ) : null}
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
        <h3 className="text-xs font-bold text-gray-500 mb-4">
          {t.servicesPage.products}
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
                  {ind.icon ? (
                    <img
                      src={ind.icon}
                      alt={ind.name}
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.3';
                      }}
                    />
                  ) : null}
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
      {hasPartners && (
        <div>
          <h3 className="text-xs font-bold text-gray-500 mb-4">
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
      )}
    </div>
  );
}
