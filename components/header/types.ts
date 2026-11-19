import type React from 'react';
import type { CategoryItem } from '@/types/category';

export type LanguageCode = 'EN' | 'JA' | 'VI';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface ProductItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ServiceItem {
  name: string;
  href: string;
  icon: string;
}

export interface IndustryItem {
  name: string;
  href: string;
  icon: string;
}

export interface PartnerItem {
  name: string;
  href: string;
}

export interface CompanyItem {
  /** Key into the i18n dictionary (dict.company[key]) */
  key: 'about' | 'offices' | 'work' | 'people';
  name: string;
  href: string;
  icon: string;
  hasArrow?: boolean;
  hasBorderBottom?: boolean;
}

export interface MobileProductCard {
  tag: string;
  title: string;
  description: string;
  href: string;
  actionText: string;
}

import type { HeaderServicesMenuData } from '@/lib/services/home-section.service';

export interface HeaderProps {
  initialCategories?: CategoryItem[];
  initialServicesMenu?: HeaderServicesMenuData | null;
}
