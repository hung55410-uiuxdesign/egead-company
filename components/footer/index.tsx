'use client';

import React from 'react';
import FooterTopBar from './sections/FooterTopBar';
import FooterNavColumns from './sections/FooterNavColumns';
import NewsletterForm from './sections/NewsletterForm';
import OfficeLocations from './sections/OfficeLocations';
import WorldClocksBar from './sections/WorldClocksBar';
import CertificationBadges from './sections/CertificationBadges';
import FooterBottomBar from './sections/FooterBottomBar';

import type { FooterConfigData } from '@/lib/services/footer-config.service';

interface FooterProps {
  initialConfig?: FooterConfigData | null;
}

export default function Footer({ initialConfig }: FooterProps) {
  if (initialConfig?.isActive === false) {
    return null;
  }

  const config = initialConfig || null;

  return (
    <footer
      id="footer"
      className="footer w-full bg-white text-gray-700 pt-16 sm:pt-20 pb-12 overflow-hidden"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Top: Logo & Social Media */}
        <FooterTopBar topBar={config?.topBar} />

        {/* Middle: Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-gray-100">
          <FooterNavColumns columns={config?.navColumns} />
          <NewsletterForm newsletter={config?.newsletter} />
        </div>

        {/* Offices: addresses & working hours */}
        <OfficeLocations />

        {/* Live World Clocks Bar */}
        <WorldClocksBar timezones={config?.timezones} />

        {/* Badges SOC */}
        <CertificationBadges certification={config?.certification} />

        {/* Bottom Bar: Language, Back to top, Copyright */}
        <FooterBottomBar bottomBar={config?.bottomBar} />
      </div>
    </footer>
  );
}

export * from './types';
