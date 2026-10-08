'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { NavItem } from '../types';

interface NavItemLinkProps {
  item: NavItem;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function NavItemLink({
  item,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: NavItemLinkProps) {
  return (
    <div
      className="relative py-2"
      onMouseEnter={() => item.hasDropdown && onMouseEnter()}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={item.href}
        className={`flex items-center gap-1.5 text-[13.5px] xl:text-[14px] font-medium transition duration-200 relative ${
          isActive ? 'text-white font-semibold' : 'text-white/85 hover:text-white'
        }`}
      >
        <span>{item.label}</span>
        {item.hasDropdown && (
          <motion.span
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="inline-flex items-center"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 ${
                isActive ? 'text-[#10E774]' : 'text-white/60'
              }`}
            />
          </motion.span>
        )}

        {/* Gliding Active Indicator matching reference */}
        {isActive && (
          <motion.span
            layoutId="activeNavIndicator"
            className="absolute -bottom-2.5 sm:-bottom-3 left-0 right-0 h-[2.5px] bg-[#10E774] shadow-[0_0_10px_#10E774] rounded-full"
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          />
        )}
      </Link>
    </div>
  );
}
