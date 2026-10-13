import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export interface PartnerLogo {
  name: string;
  src: string;
}

export interface MarketplacesPartnersSectionData {
  row1Partners: PartnerLogo[];
  row2Partners: PartnerLogo[];
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
    return items as unknown as HomeSectionModel[];
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
  data: {
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    data?: any;
    isActive?: boolean;
    order?: number;
  }
): Promise<HomeSectionModel> {
  const updatePayload: any = {};
  if (data.title !== undefined) updatePayload.title = data.title;
  if (data.subtitle !== undefined) updatePayload.subtitle = data.subtitle;
  if (data.description !== undefined) updatePayload.description = data.description;
  if (data.isActive !== undefined) updatePayload.isActive = data.isActive;
  if (data.order !== undefined) updatePayload.order = data.order;
  if (data.data !== undefined) {
    updatePayload.data = data.data as unknown as Prisma.InputJsonValue;
  }

  const updated = await prisma.homeSection.update({
    where: { key },
    data: updatePayload,
  });

  return updated as unknown as HomeSectionModel;
}
