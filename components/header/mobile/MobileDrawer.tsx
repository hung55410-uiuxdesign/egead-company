'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CategoryItem } from '@/types/category';
import type { HeaderServicesMenuData } from '@/lib/services/home-section.service';
import MobileHeader from './MobileHeader';
import MobileTabs, { type MobileTabKey } from './MobileTabs';
import MobileServicesTab from './panels/MobileServicesTab';
import MobileInsightsTab from './panels/MobileInsightsTab';
import MobileCompanyTab from './panels/MobileCompanyTab';
import MobilePromoCard from './panels/MobilePromoCard';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryItem[];
  servicesMenu?: HeaderServicesMenuData | null;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  categories,
  servicesMenu,
}: MobileDrawerProps) {
  const [activeTab, setActiveTab] = useState<MobileTabKey>('services');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md"
        >
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-6 pb-12">
            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative rounded-[32px] sm:rounded-[40px] bg-white text-black p-6 sm:p-10 lg:p-14 shadow-2xl border border-gray-100 min-h-[500px]"
            >
              {/* Top Bar inside Menu */}
              <MobileHeader onClose={onClose} />

              {/* Navigation Category Tabs */}
              <MobileTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onClose={onClose}
              />

              {/* Tab Contents & Promo Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Content Area (Columns) */}
                <div className="lg:col-span-8">
                  {activeTab === 'services' && (
                    <MobileServicesTab servicesMenu={servicesMenu} onClose={onClose} />
                  )}
                  {activeTab === 'insights' && (
                    <MobileInsightsTab
                      categories={categories}
                      onClose={onClose}
                    />
                  )}
                  {activeTab === 'company' && (
                    <MobileCompanyTab onClose={onClose} />
                  )}
                </div>

                {/* Right Promotional Feature Card */}
                <MobilePromoCard onClose={onClose} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
