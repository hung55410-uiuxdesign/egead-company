'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { NAV_ITEMS } from '../config/nav-items';
import NavItemLink from './NavItemLink';
import LanguageDropdown from './LanguageDropdown';
import NavCtaButton from '../ui/NavCtaButton';

interface DesktopNavbarProps {
  activeDropdown: string | null;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  onOpenMobileMenu: () => void;
}

export default function DesktopNavbar({
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
  onOpenMobileMenu,
}: DesktopNavbarProps) {
  return (
    <div className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 flex items-center justify-between">
      {/* Logo with micro hover */}
      <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
        <motion.img
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          src="/assets/logo/white.png"
          alt="E-GEAD — Automate Operations, Scale Global Sales"
          className="h-12 sm:h-13 md:h-14 lg:h-[54px] w-auto object-contain cursor-pointer"
        />
      </Link>

      {/* Center Navigation Links (Desktop) - True Geometric Center with gliding active indicator */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        {NAV_ITEMS.map((item) => (
          <NavItemLink
            key={item.id}
            item={item}
            isActive={activeDropdown === item.id}
            onMouseEnter={() => onMouseEnter(item.id)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </nav>

      {/* Right Header Controls */}
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Language Selector */}
        <LanguageDropdown />

        {/* CTA Button */}
        <NavCtaButton />

        {/* Hamburger Button: ONLY on mobile (lg:hidden) */}
        <motion.button
          type="button"
          onClick={onOpenMobileMenu}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open Navigation Menu"
          className="lg:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition backdrop-blur-md text-white cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
