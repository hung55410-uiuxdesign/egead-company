'use client';

import React from 'react';
import Link from 'next/link';
import { SOCIAL_LINKS } from '../config/social-links';
import type { FooterTopBarData } from '@/lib/services/footer-config.service';

interface FooterTopBarProps {
  topBar?: FooterTopBarData;
}

export default function FooterTopBar({ topBar }: FooterTopBarProps) {
  const logoUrl = topBar?.logoUrl || '/assets/logo/logo-color.png';
  const logoAlt = topBar?.logoAlt || 'E-GEAD Company';
  const logoHref = topBar?.logoHref || '/';
  const networkTitle = topBar?.networkTitle ?? 'JOIN OUR NETWORK';
  const socialLinks =
    topBar?.socialLinks && topBar.socialLinks.length > 0
      ? topBar.socialLinks
      : SOCIAL_LINKS;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-gray-100">
      <Link href={logoHref} className="inline-block transition-opacity hover:opacity-90">
        <img
          src={logoUrl}
          alt={logoAlt}
          className="h-20 sm:h-24 lg:h-[96px] w-auto object-contain"
        />
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <span className="text-xs font-bold text-black font-montserrat">
          {networkTitle}
        </span>
        <div className="flex items-center gap-4 sm:gap-5">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              target="_blank"
              rel="noopener noreferrer"
              href={item.href}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#10E774] flex items-center justify-center transition p-2"
              aria-label={item.name}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
