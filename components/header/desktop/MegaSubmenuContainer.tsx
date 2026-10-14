'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CategoryItem } from '@/types/category';
import type { HeaderServicesMenuData } from '@/lib/services/home-section.service';
import ServicesPanel from './panels/ServicesPanel';
import InsightsPanel from './panels/InsightsPanel';
import CompanyPanel from './panels/CompanyPanel';

interface MegaSubmenuContainerProps {
  activeDropdown: string | null;
  categories: CategoryItem[];
  servicesMenu?: HeaderServicesMenuData | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onItemClick: () => void;
}

export default function MegaSubmenuContainer({
  activeDropdown,
  categories,
  servicesMenu,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
}: MegaSubmenuContainerProps) {
  return (
    <AnimatePresence>
      {activeDropdown && (
        <motion.div
          key="mega-submenu-container"
          initial={{ opacity: 0, y: -14, scale: 0.98, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, scale: 0.98, filter: 'blur(6px)' }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mt-2.5"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="w-full bg-white text-black rounded-[32px] sm:rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-gray-100 p-8 sm:p-10 lg:p-12 xl:p-14 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDropdown}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
              >
                {activeDropdown === 'services' && (
                  <ServicesPanel servicesMenu={servicesMenu} onItemClick={onItemClick} />
                )}
                {activeDropdown === 'insights' && (
                  <InsightsPanel categories={categories} onItemClick={onItemClick} />
                )}
                {activeDropdown === 'company' && (
                  <CompanyPanel onItemClick={onItemClick} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
