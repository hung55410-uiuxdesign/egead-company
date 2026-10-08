'use client';

import React, { useState } from 'react';
import { useHeaderScroll } from './hooks/useHeaderScroll';
import { useHeaderDropdown } from './hooks/useHeaderDropdown';
import { useHeaderCategories } from './hooks/useHeaderCategories';
import DesktopNavbar from './desktop/DesktopNavbar';
import MegaSubmenuContainer from './desktop/MegaSubmenuContainer';
import MobileDrawer from './mobile/MobileDrawer';
import type { HeaderProps } from './types';

export default function Header({ initialCategories = [] }: HeaderProps) {
  const categories = useHeaderCategories(initialCategories);
  const scrolled = useHeaderScroll(25);
  const {
    activeDropdown,
    handleMouseEnter,
    handleMouseLeave,
    closeDropdownImmediately,
    clearDropdownTimeout,
  } = useHeaderDropdown(220);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 font-montserrat ${
          scrolled
            ? 'bg-[#0A0D0E]/90 backdrop-blur-xl border-b border-white/10 py-3.5 sm:py-4 shadow-[0_16px_40px_rgba(0,0,0,0.6)]'
            : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
        }`}
      >
        {/* Desktop & Tablet Top Navigation Bar */}
        <DesktopNavbar
          activeDropdown={activeDropdown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Mega Submenu Floating White Panel */}
        <MegaSubmenuContainer
          activeDropdown={activeDropdown}
          categories={categories}
          onMouseEnter={clearDropdownTimeout}
          onMouseLeave={handleMouseLeave}
          onItemClick={closeDropdownImmediately}
        />
      </header>

      {/* Mobile Mega Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
      />
    </>
  );
}

export * from './types';
