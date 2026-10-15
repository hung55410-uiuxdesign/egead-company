import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import {
  getHomeSectionByKey,
  updateHomeSection,
  type HomeSectionModel,
} from './home-section.service';
import { FOOTER_NAV_COLUMNS } from '@/components/footer/config/footer-links';
import { SOCIAL_LINKS } from '@/components/footer/config/social-links';
import { FOOTER_TIMEZONES } from '@/components/footer/config/timezones';
import type {
  FooterNavColumn,
  FooterNavLink,
  SocialLink,
  TimezoneLocation,
} from '@/components/footer/types';

export type { FooterNavColumn, FooterNavLink, SocialLink, TimezoneLocation };

export interface FooterTopBarData {
  logoUrl: string;
  logoAlt: string;
  logoHref: string;
  networkTitle: string;
  socialLinks: SocialLink[];
}

export interface FooterNewsletterData {
  title: string;
  placeholder: string;
  disclaimerText: string;
  privacyPolicyHref: string;
  termsHref: string;
}

export interface FooterCertificationData {
  badgeImage: string;
  badgeAlt: string;
  badgeHref?: string;
}

export interface FooterBottomBarData {
  copyright: string;
  showLanguageSelector: boolean;
  showBackToTop: boolean;
}

export interface FooterConfigData {
  isActive?: boolean;
  topBar: FooterTopBarData;
  navColumns: FooterNavColumn[];
  newsletter: FooterNewsletterData;
  timezones: TimezoneLocation[];
  certification: FooterCertificationData;
  bottomBar: FooterBottomBarData;
}

export const DEFAULT_FOOTER_CONFIG: FooterConfigData = {
  topBar: {
    logoUrl: '/assets/logo/logo-color.png',
    logoAlt: 'E-GEAD Company',
    logoHref: '/',
    networkTitle: 'JOIN OUR NETWORK',
    socialLinks: SOCIAL_LINKS,
  },
  navColumns: FOOTER_NAV_COLUMNS,
  newsletter: {
    title: 'Newsletter',
    placeholder: 'name@youremail.com',
    disclaimerText:
      'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.',
    privacyPolicyHref: 'https://policies.google.com/privacy?hl=en',
    termsHref: 'https://policies.google.com/terms?hl=en',
  },
  timezones: FOOTER_TIMEZONES,
  certification: {
    badgeImage: '/assets/Badges_SOC.svg',
    badgeAlt: 'Badges SOC',
    badgeHref: '',
  },
  bottomBar: {
    copyright: '© 2026 E-Gead Company. All rights reserved.',
    showLanguageSelector: true,
    showBackToTop: true,
  },
};

export const FOOTER_SECTION_KEY = 'footer-config';

/**
 * Normalizes raw json data from DB with full fallback defaults
 */
export function normalizeFooterConfig(raw: any): FooterConfigData {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_FOOTER_CONFIG;
  }
  const data =
    raw.data !== undefined &&
    typeof raw.data === 'object' &&
    !Array.isArray(raw.data)
      ? raw.data
      : raw;

  return {
    topBar: {
      logoUrl: data.topBar?.logoUrl || DEFAULT_FOOTER_CONFIG.topBar.logoUrl,
      logoAlt: data.topBar?.logoAlt || DEFAULT_FOOTER_CONFIG.topBar.logoAlt,
      logoHref: data.topBar?.logoHref || DEFAULT_FOOTER_CONFIG.topBar.logoHref,
      networkTitle:
        data.topBar?.networkTitle ?? DEFAULT_FOOTER_CONFIG.topBar.networkTitle,
      socialLinks:
        Array.isArray(data.topBar?.socialLinks) &&
        data.topBar.socialLinks.length > 0
          ? data.topBar.socialLinks
          : DEFAULT_FOOTER_CONFIG.topBar.socialLinks,
    },
    navColumns:
      Array.isArray(data.navColumns) && data.navColumns.length > 0
        ? data.navColumns
        : DEFAULT_FOOTER_CONFIG.navColumns,
    newsletter: {
      title: data.newsletter?.title ?? DEFAULT_FOOTER_CONFIG.newsletter.title,
      placeholder:
        data.newsletter?.placeholder ??
        DEFAULT_FOOTER_CONFIG.newsletter.placeholder,
      disclaimerText:
        data.newsletter?.disclaimerText ??
        DEFAULT_FOOTER_CONFIG.newsletter.disclaimerText,
      privacyPolicyHref:
        data.newsletter?.privacyPolicyHref ??
        DEFAULT_FOOTER_CONFIG.newsletter.privacyPolicyHref,
      termsHref:
        data.newsletter?.termsHref ??
        DEFAULT_FOOTER_CONFIG.newsletter.termsHref,
    },
    timezones:
      Array.isArray(data.timezones) && data.timezones.length > 0
        ? data.timezones
        : DEFAULT_FOOTER_CONFIG.timezones,
    certification: {
      badgeImage:
        data.certification?.badgeImage !== undefined
          ? data.certification.badgeImage
          : DEFAULT_FOOTER_CONFIG.certification.badgeImage,
      badgeAlt:
        data.certification?.badgeAlt !== undefined
          ? data.certification.badgeAlt
          : DEFAULT_FOOTER_CONFIG.certification.badgeAlt,
      badgeHref: data.certification?.badgeHref || '',
    },
    bottomBar: {
      copyright:
        data.bottomBar?.copyright ?? DEFAULT_FOOTER_CONFIG.bottomBar.copyright,
      showLanguageSelector:
        data.bottomBar?.showLanguageSelector ??
        DEFAULT_FOOTER_CONFIG.bottomBar.showLanguageSelector,
      showBackToTop:
        data.bottomBar?.showBackToTop ??
        DEFAULT_FOOTER_CONFIG.bottomBar.showBackToTop,
    },
  };
}

/**
 * Get normalized footer config for public display
 */
export async function getFooterConfig(): Promise<FooterConfigData> {
  try {
    const section = await getHomeSectionByKey(FOOTER_SECTION_KEY);
    if (!section || !section.data) {
      return { ...DEFAULT_FOOTER_CONFIG, isActive: true };
    }
    const normalized = normalizeFooterConfig(section.data);
    return {
      ...normalized,
      isActive: section.isActive ?? true,
    };
  } catch (error) {
    console.error('[footer-config.service] Error in getFooterConfig:', error);
    return { ...DEFAULT_FOOTER_CONFIG, isActive: true };
  }
}

/**
 * Get footer section model for admin editing
 */
export async function getFooterSection(): Promise<HomeSectionModel> {
  try {
    const section = await getHomeSectionByKey(FOOTER_SECTION_KEY);
    if (section) {
      return {
        ...section,
        data: normalizeFooterConfig(section.data),
      };
    }

    return {
      id: 'default-footer-config',
      key: FOOTER_SECTION_KEY,
      name: 'Khối Chân trang & Thông tin liên kết (Footer)',
      title: 'Footer Configuration',
      subtitle: 'Cấu hình chân trang toàn website',
      description:
        'Quản lý logo, liên kết mạng xã hội, 3 cột menu điều hướng, form nhận bản tin, múi giờ thế giới và bản quyền chân trang.',
      data: DEFAULT_FOOTER_CONFIG,
      isActive: true,
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('[footer-config.service] Error in getFooterSection:', error);
    return {
      id: 'default-footer-config',
      key: FOOTER_SECTION_KEY,
      name: 'Khối Chân trang & Thông tin liên kết (Footer)',
      title: 'Footer Configuration',
      subtitle: 'Cấu hình chân trang toàn website',
      description:
        'Quản lý logo, liên kết mạng xã hội, 3 cột menu điều hướng, form nhận bản tin, múi giờ thế giới và bản quyền chân trang.',
      data: DEFAULT_FOOTER_CONFIG,
      isActive: true,
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

/**
 * Update footer configuration
 */
export async function updateFooterConfig(
  payload: {
    data: FooterConfigData;
    isActive?: boolean;
    name?: string;
    description?: string;
  }
): Promise<HomeSectionModel> {
  return updateHomeSection(FOOTER_SECTION_KEY, {
    name: payload.name || 'Khối Chân trang & Thông tin liên kết (Footer)',
    title: 'Footer Configuration',
    subtitle: 'Cấu hình chân trang toàn website',
    description:
      payload.description ||
      'Quản lý logo, liên kết mạng xã hội, 3 cột menu điều hướng, form nhận bản tin, múi giờ thế giới và bản quyền chân trang.',
    data: payload.data,
    isActive: payload.isActive ?? true,
    order: 5,
  });
}
