import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export interface PartnerLogo {
  name: string;
  src: string;
  invert?: boolean;
}

export interface MarketplacesPartnersSectionData {
  rows?: PartnerLogo[][];
  row1Partners?: PartnerLogo[];
  row2Partners?: PartnerLogo[];
}

export interface CapabilityItem {
  num: string;
  title: string;
  desc: string;
  icon: string;
  href: string;
}

export interface CapabilitiesSectionData {
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
  items: CapabilityItem[];
}

export interface BentoStatCard {
  brand: string;
  tagline: string;
  value: string;
  label: string;
}

export interface BentoPhotoCard {
  image: string;
  alt: string;
}

export interface BentoQuoteCard {
  quote: string;
  author: string;
  role: string;
  brand: string;
}

export interface SmartCXSectionData {
  ctaText?: string;
  ctaHref?: string;
  photo1?: BentoPhotoCard;
  stat1?: BentoStatCard;
  widePhoto?: BentoPhotoCard;
  quote?: BentoQuoteCard;
  photo2?: BentoPhotoCard;
  stat2?: BentoStatCard;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  subtitle: string;
  avatar: string;
  partnerLogo: string;
}

export interface TestimonialsSectionData {
  items: TestimonialItem[];
  ratingImage?: string;
}

export interface HeaderMenuItem {
  name: string;
  href: string;
  icon?: string;
}

export interface HeaderServicesMenuData {
  services: HeaderMenuItem[];
  industries: HeaderMenuItem[];
  partners: HeaderMenuItem[];
  allServicesText?: string;
  allServicesHref?: string;
  allIndustriesText?: string;
  allIndustriesHref?: string;
  allPartnersText?: string;
  allPartnersHref?: string;
}

export interface HomeSectionModel {
  id: string;
  key: string;
  name: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  data: any; // MarketplacesPartnersSectionData or other section custom data
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get all home sections
 */
export async function getHomeSections(): Promise<HomeSectionModel[]> {
  try {
    const items = await prisma.homeSection.findMany({
      where: {
        NOT: {
          key: { startsWith: 'header-' },
        },
      },
      orderBy: { order: 'asc' },
    });
    return items.map((item) => {
      const rawData = item.data as any;
      if (
        rawData &&
        typeof rawData === 'object' &&
        !Array.isArray(rawData) &&
        rawData.data !== undefined
      ) {
        return {
          ...item,
          data: rawData.data,
        } as unknown as HomeSectionModel;
      }
      return item as unknown as HomeSectionModel;
    });
  } catch (error) {
    console.error('[home-section.service] Error in getHomeSections:', error);
    return [];
  }
}

/**
 * Get a specific home section by key
 */
export async function getHomeSectionByKey(
  key: string
): Promise<HomeSectionModel | null> {
  try {
    const item = await prisma.homeSection.findUnique({
      where: { key },
    });
    if (!item) return null;

    // Normalization in case DB has legacy nested { data: { ... } }
    const rawData = item.data as any;
    if (
      rawData &&
      typeof rawData === 'object' &&
      !Array.isArray(rawData) &&
      rawData.data !== undefined
    ) {
      return {
        ...item,
        data: rawData.data,
      } as unknown as HomeSectionModel;
    }

    return item as unknown as HomeSectionModel | null;
  } catch (error) {
    console.error('[home-section.service] Error in getHomeSectionByKey:', error);
    return null;
  }
}

/**
 * Update a home section
 */
export async function updateHomeSection(
  key: string,
  payload: {
    name?: string;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    data?: any;
    isActive?: boolean;
    order?: number;
  }
): Promise<HomeSectionModel> {
  // Defensive check: if payload has nested data wrapper (e.g. payload.data contains title/isActive/data)
  let cleanTitle = payload.title;
  let cleanSubtitle = payload.subtitle;
  let cleanDescription = payload.description;
  let cleanIsActive = payload.isActive;
  let cleanOrder = payload.order;
  let cleanData = payload.data;

  if (
    cleanData &&
    typeof cleanData === 'object' &&
    !Array.isArray(cleanData) &&
    cleanData.data !== undefined &&
    (cleanData.title !== undefined || cleanData.isActive !== undefined)
  ) {
    if (cleanTitle === undefined) cleanTitle = cleanData.title;
    if (cleanSubtitle === undefined) cleanSubtitle = cleanData.subtitle;
    if (cleanDescription === undefined) cleanDescription = cleanData.description;
    if (cleanIsActive === undefined) cleanIsActive = cleanData.isActive;
    cleanData = cleanData.data;
  }

  const updatePayload: any = {};
  if (payload.name !== undefined) updatePayload.name = payload.name;
  if (cleanTitle !== undefined) updatePayload.title = cleanTitle;
  if (cleanSubtitle !== undefined) updatePayload.subtitle = cleanSubtitle;
  if (cleanDescription !== undefined) updatePayload.description = cleanDescription;
  if (cleanIsActive !== undefined) updatePayload.isActive = cleanIsActive;
  if (cleanOrder !== undefined) updatePayload.order = cleanOrder;
  if (cleanData !== undefined) {
    updatePayload.data = cleanData as unknown as Prisma.InputJsonValue;
  }

  const updated = await prisma.homeSection.upsert({
    where: { key },
    update: updatePayload,
    create: {
      key,
      name:
        key === 'footer-config'
          ? 'Khối Chân trang & Thông tin liên kết (Footer)'
          : key,
      title: cleanTitle ?? null,
      subtitle: cleanSubtitle ?? null,
      description: cleanDescription ?? null,
      data: (cleanData ?? {}) as unknown as Prisma.InputJsonValue,
      isActive: cleanIsActive ?? true,
      order: cleanOrder ?? 5,
    },
  });

  return updated as unknown as HomeSectionModel;
}
