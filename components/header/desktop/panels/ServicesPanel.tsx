'use client';

import React from 'react';
import Link from 'next/link';
import NavArrowIcon from '../../ui/NavArrowIcon';
import type { HeaderServicesMenuData } from '@/lib/services/home-section.service';
import { useT } from '@/components/providers/LocaleProvider';

interface ServicesPanelProps {
  onItemClick: () => void;
  servicesMenu?: HeaderServicesMenuData | null;
}

export default function ServicesPanel({
  onItemClick,
  servicesMenu,
}: ServicesPanelProps) {
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
    servicesMenu?.allIndustriesHref || '/services/all-services';

  const allPartnersText = servicesMenu?.allPartnersText || 'All Partners';
  const allPartnersHref = servicesMenu?.allPartnersHref || '/partners';

  const hasPartners = partnersList.length > 0;

  return (
    <div>
      <div
        className={`grid grid-cols-1 ${
          hasPartners ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
        } gap-8 lg:gap-14 items-start`}
      >
        {/* Column 1: Our Services */}
        <div>
          <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-6 font-montserrat">
            {t.servicesPage.operations}
          </h3>
          <div className="space-y-4 mb-8">
            {servicesList.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                onClick={onItemClick}
                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
              >
                {service.icon ? (
                  <span className="w-5 h-5 flex items-center justify-center shrink-0">
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.3';
                      }}
                    />
                  </span>
                ) : null}
                <span className="group-hover:translate-x-0.5 transition-transform">
                  {service.name}
                </span>
              </Link>
            ))}
          </div>

          <Link
            href={allServicesHref}
            onClick={onItemClick}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
          >
            <NavArrowIcon />
            <span>{allServicesText}</span>
          </Link>
        </div>

        {/* Column 2: Industries */}
        <div>
          <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-6 font-montserrat">
            {t.servicesPage.products}
          </h3>
          <div className="space-y-4 mb-8">
            {industriesList.map((ind) => (
              <Link
                key={ind.name}
                href={ind.href}
                onClick={onItemClick}
                className="group flex items-center gap-3.5 py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
              >
                {ind.icon ? (
                  <span className="w-5 h-5 flex items-center justify-center shrink-0">
                    <img
                      src={ind.icon}
                      alt={ind.name}
                      className="w-5 h-5 object-contain transition-transform group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.3';
                      }}
                    />
                  </span>
                ) : null}
                <span className="group-hover:translate-x-0.5 transition-transform">
                  {ind.name}
                </span>
              </Link>
            ))}
          </div>

          <Link
            href={allIndustriesHref}
            onClick={onItemClick}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
          >
            <NavArrowIcon />
            <span>{allIndustriesText}</span>
          </Link>
        </div>

        {/* Column 3: Partners (Only displayed when real partners exist) */}
        {hasPartners && (
          <div>
            <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mb-6 font-montserrat">
              Partners
            </h3>
            <div className="space-y-4 mb-8">
              {partnersList.map((partner) => (
                <Link
                  key={partner.name}
                  href={partner.href}
                  onClick={onItemClick}
                  className="group flex items-center py-1 text-[15px] font-semibold text-gray-800 hover:text-[#007A3D] transition duration-200"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {partner.name}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href={allPartnersHref}
              onClick={onItemClick}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:border-black text-[13.5px] font-semibold text-gray-800 hover:text-black transition duration-200 hover:bg-gray-50/80 shadow-sm"
            >
              <NavArrowIcon />
              <span>{allPartnersText}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
