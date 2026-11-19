'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { NAV_ITEMS } from '../config/nav-items';
import NavItemLink from './NavItemLink';
import NavCtaButton from '../ui/NavCtaButton';
import LanguageDropdown from './LanguageDropdown';
import { useLocalizeHref, useT } from '@/components/providers/LocaleProvider';

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
  const t = useT();
  const lh = useLocalizeHref();

  return (
    <div className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 flex items-center justify-between">
      {/* Logo with micro hover & ambient glowing light aura */}
      <Link href={lh('/')} className="group relative flex items-center shrink-0 transition-opacity">
        {/* Vùng sáng mờ ảo xuất phát từ góc trên bên trái & tỏa rộng chuyển động dịu nhẹ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-28 sm:-top-32 sm:-left-36 w-[560px] h-[400px] sm:w-[700px] sm:h-[500px] -z-10 overflow-visible transition-opacity duration-500 group-hover:opacity-90"
        >
          {/* Tầng 1: Quầng sáng tỏa cực đại thở nhẹ êm dịu (Subtle Broad Ambient Aura) */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.08)_40%,transparent_75%)] blur-3xl"
          />

          {/* Tầng 2: Cực quang dải màu lan tỏa chéo góc dịu mắt (Soft Colorful Aurora Flare) */}
          <motion.div
            animate={{
              rotate: [-10, 10, -10],
              scale: [0.95, 1.12, 0.95],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{
              rotate: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{ transformOrigin: '25% 25%' }}
            className="absolute -top-4 -left-4 w-[85%] h-[85%] rounded-full bg-[radial-gradient(ellipse_at_25%_25%,rgba(16,231,116,0.22)_0%,rgba(251,191,36,0.2)_25%,rgba(236,72,153,0.18)_45%,rgba(56,189,248,0.15)_60%,transparent_80%)] blur-2xl"
          />

          {/* Tầng 3: Khối sáng trôi bồng bềnh hữu cơ êm ái (Floating Ambient Highlight) */}
          <motion.div
            animate={{
              x: [-10, 12, -10],
              y: [-6, 8, -6],
              scale: [1.1, 0.95, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-2 left-2 w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.1)_45%,transparent_70%)] blur-xl"
          />

          {/* Tầng 4: Điểm sáng mềm mại rọi vào logo từ góc trên bên trái (Soft Core Light on Logo) */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.45, 0.65, 0.45],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-8 left-10 w-[55%] h-[55%] rounded-full bg-[radial-gradient(ellipse_at_35%_35%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.2)_45%,transparent_75%)] blur-lg"
          />
        </div>

        <motion.img
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          src="/assets/logo/logo-color.png"
          alt="E-GEAD — Automate Operations, Scale Global Sales"
          className="relative z-10 h-12 sm:h-13 md:h-14 lg:h-[54px] w-auto object-contain cursor-pointer"
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
        {/* Language switcher (EN / VI) */}
        <LanguageDropdown />

        {/* CTA Button */}
        <NavCtaButton />

        {/* Hamburger Button: ONLY on mobile (lg:hidden) */}
        <motion.button
          type="button"
          onClick={onOpenMobileMenu}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={t.common.openMenu}
          className="lg:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition backdrop-blur-md text-white cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
