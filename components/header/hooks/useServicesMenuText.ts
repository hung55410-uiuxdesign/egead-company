'use client';

import { useLocale, useLocalizeHref, useT } from '@/components/providers/LocaleProvider';
import { pickLocalized } from '@/lib/i18n/config';
import type {
  HeaderMenuItem,
  HeaderServicesMenuData,
} from '@/lib/services/home-section.service';

/**
 * Titles, "see all" buttons, hrefs and item names of the services mega-menu
 * for the current site language. The menu content comes from the admin
 * (English); optional `...Vi` fields override it on the /vi site, and the
 * built-in dictionary covers generic labels when nothing is configured.
 */
export function useServicesMenuText(
  menu?: HeaderServicesMenuData | null,
  defaultIndustriesHref = '/services/all-services'
) {
  const locale = useLocale();
  const t = useT();
  const lh = useLocalizeHref();

  const label = (en?: string, vi?: string, fallback = '') =>
    locale === 'vi' ? vi || fallback : en || fallback;

  return {
    lh,
    itemName: (item: HeaderMenuItem) => pickLocalized(locale, item.name, item.nameVi),
    servicesTitle: label(menu?.servicesTitle, menu?.servicesTitleVi, t.servicesMenu.services),
    industriesTitle: label(menu?.industriesTitle, menu?.industriesTitleVi, t.servicesMenu.industries),
    partnersTitle: label(menu?.partnersTitle, menu?.partnersTitleVi, t.servicesMenu.partners),
    allServicesText: label(menu?.allServicesText, menu?.allServicesTextVi, t.servicesMenu.allServices),
    allIndustriesText: label(menu?.allIndustriesText, menu?.allIndustriesTextVi, t.servicesMenu.allIndustries),
    allPartnersText: label(menu?.allPartnersText, menu?.allPartnersTextVi, t.servicesMenu.allPartners),
    allServicesHref: lh(menu?.allServicesHref || '/services/all-services'),
    allIndustriesHref: lh(menu?.allIndustriesHref || defaultIndustriesHref),
    allPartnersHref: lh(menu?.allPartnersHref || '/partners'),
  };
}
