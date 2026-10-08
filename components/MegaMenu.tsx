'use client';

import React from 'react';
import MobileDrawer from './header/mobile/MobileDrawer';
import { DEFAULT_INSIGHTS_CATEGORIES } from './header/config/default-categories';
import type { CategoryItem } from '@/types/category';

export interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: CategoryItem[];
}

export default function MegaMenu({
  isOpen,
  onClose,
  categories = DEFAULT_INSIGHTS_CATEGORIES,
}: MegaMenuProps) {
  return (
    <MobileDrawer
      isOpen={isOpen}
      onClose={onClose}
      categories={categories}
    />
  );
}
