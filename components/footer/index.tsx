'use client';

import React from 'react';
import FooterTopBar from './sections/FooterTopBar';
import FooterNavColumns from './sections/FooterNavColumns';
import NewsletterForm from './sections/NewsletterForm';
import WorldClocksBar from './sections/WorldClocksBar';
import CertificationBadges from './sections/CertificationBadges';
import FooterBottomBar from './sections/FooterBottomBar';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="footer w-full bg-white text-gray-700 pt-16 sm:pt-20 pb-12 overflow-hidden"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Top: Logo & Social Media */}
        <FooterTopBar />

        {/* Middle: Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-gray-100">
          <FooterNavColumns />
          <NewsletterForm />
        </div>

        {/* Live World Clocks Bar */}
        <WorldClocksBar />

        {/* Badges SOC */}
        <CertificationBadges />

        {/* Bottom Bar: Language, Back to top, Copyright */}
        <FooterBottomBar />
      </div>
    </footer>
  );
}

export * from './types';
