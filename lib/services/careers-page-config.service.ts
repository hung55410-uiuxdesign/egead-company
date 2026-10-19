import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export interface CareersHeroData {
  title: string;
  image: string;
}

export interface CareersAboutData {
  subtitle: string;
  title: string;
  paragraphs: string[];
  image: string;
}

export interface BenefitCardData {
  title: string;
  items: string[];
  icon?: string;
}

export interface CareersWhyChooseUsData {
  title: string;
  benefits: BenefitCardData;
  learning: BenefitCardData;
  environment: BenefitCardData;
}

export interface CareersOfficeItem {
  id: string;
  country: string; // 'singapore' | 'hongkong' | 'vietnam' | string
  city: string;
  addressLines: string[];
}

export interface CareersVideoData {
  videoUrl?: string;
  title?: string;
  subtitle?: string;
}

export interface CareersPageConfigData {
  hero: CareersHeroData;
  about: CareersAboutData;
  video?: CareersVideoData;
  whyChooseUs: CareersWhyChooseUsData;
  offices: CareersOfficeItem[];
}

export const CAREERS_PAGE_KEY = 'careers-page-config';

export const DEFAULT_CAREERS_PAGE_CONFIG: CareersPageConfigData = {
  hero: {
    title: 'Join The Human Inc to\ndiscover new opportunities\ntogether in the future.',
    image: '/assets/careers/team-group.png',
  },
  about: {
    subtitle: 'About The Human Inc',
    title: 'Find your passion at\nThe Human Inc',
    paragraphs: [
      'At The Human Inc, we aim to create a breakthrough environment so that every individual can find their passion and build a solid foundation for their personal career in the technology field.',
      'Join us and you will become part of a passionate team, creating products with profound global impact.',
    ],
    image: '/assets/careers/culture-spotlight.png',
  },
  video: {
    videoUrl: '',
    title: '',
    subtitle: '',
  },
  whyChooseUs: {
    title: 'Why choose us?',
    benefits: {
      title: 'Great benefits',
      icon: '',
      items: [
        'Bonus policy according to seniority',
        'Health insurance and social insurance as prescribed',
        'Lunch allowance',
        'Snacks and coffee are provided daily',
        'Profesional equipment are provided',
        'Frequent team building, annual vacation',
      ],
    },
    learning: {
      title: 'Learning and self-improvement',
      icon: '',
      items: [
        'Encouraged to align with personal, team, and company goals.',
        'Receive expert training to boost skills and critical thinking on the job.',
        'Learn new technologies and solve complex e-commerce problems.',
      ],
    },
    environment: {
      title: 'Open working environment',
      icon: '',
      items: [
        'Flexible working time, from Monday to Friday',
        'Leave days: 12 days/year',
        'Holidays, New Year according to regulations',
        'Working with a creative and enthusiastic team, ready to make breakthroughs.',
      ],
    },
  },
  offices: [
    {
      id: 'office-sg',
      country: 'singapore',
      city: 'Singapore',
      addressLines: [
        '1 Sophia road #05-12 Peace center',
        'Singapore 228149',
      ],
    },
    {
      id: 'office-hk',
      country: 'hongkong',
      city: 'HongKong',
      addressLines: [
        'Unit 1402B 14/F, The Belgian Bank Building,',
        'NOS. 721-725 Nathan road, Mongkok,',
        'Kowloon, HongKong.',
      ],
    },
    {
      id: 'office-vn',
      country: 'vietnam',
      city: 'Viet Nam - Ha Noi',
      addressLines: [
        '2nd floor, Comatce building, 61 Nguy Nhu',
        'Kon Tum, Nhan Chinh ward, Thanh Xuan',
        'district, Hanoi city',
      ],
    },
  ],
};

/**
 * Normalizes raw data with fallback defaults
 */
export function normalizeCareersPageConfig(
  rawData?: any
): CareersPageConfigData {
  if (!rawData || typeof rawData !== 'object') {
    return DEFAULT_CAREERS_PAGE_CONFIG;
  }

  // Handle nested wrapper e.g. { data: { hero: ... } }
  const data = rawData.data && typeof rawData.data === 'object' ? rawData.data : rawData;

  return {
    hero: {
      title: data.hero?.title?.trim() || DEFAULT_CAREERS_PAGE_CONFIG.hero.title,
      image: data.hero?.image?.trim() || DEFAULT_CAREERS_PAGE_CONFIG.hero.image,
    },
    about: {
      subtitle: data.about?.subtitle?.trim() || DEFAULT_CAREERS_PAGE_CONFIG.about.subtitle,
      title: data.about?.title?.trim() || DEFAULT_CAREERS_PAGE_CONFIG.about.title,
      paragraphs: Array.isArray(data.about?.paragraphs) && data.about.paragraphs.length > 0
        ? data.about.paragraphs
        : DEFAULT_CAREERS_PAGE_CONFIG.about.paragraphs,
      image: data.about?.image?.trim() || DEFAULT_CAREERS_PAGE_CONFIG.about.image,
    },
    video: {
      videoUrl: data.video?.videoUrl?.trim() || '',
      title: data.video?.title?.trim() || '',
      subtitle: data.video?.subtitle?.trim() || '',
    },
    whyChooseUs: {
      title: data.whyChooseUs?.title?.trim() || DEFAULT_CAREERS_PAGE_CONFIG.whyChooseUs.title,
      benefits: {
        title: data.whyChooseUs?.benefits?.title?.trim() || DEFAULT_CAREERS_PAGE_CONFIG.whyChooseUs.benefits.title,
        icon: data.whyChooseUs?.benefits?.icon?.trim() || '',
        items: Array.isArray(data.whyChooseUs?.benefits?.items) && data.whyChooseUs.benefits.items.length > 0
          ? data.whyChooseUs.benefits.items
          : DEFAULT_CAREERS_PAGE_CONFIG.whyChooseUs.benefits.items,
      },
      learning: {
        title: data.whyChooseUs?.learning?.title?.trim() || DEFAULT_CAREERS_PAGE_CONFIG.whyChooseUs.learning.title,
        icon: data.whyChooseUs?.learning?.icon?.trim() || '',
        items: Array.isArray(data.whyChooseUs?.learning?.items) && data.whyChooseUs.learning.items.length > 0
          ? data.whyChooseUs.learning.items
          : DEFAULT_CAREERS_PAGE_CONFIG.whyChooseUs.learning.items,
      },
      environment: {
        title: data.whyChooseUs?.environment?.title?.trim() || DEFAULT_CAREERS_PAGE_CONFIG.whyChooseUs.environment.title,
        icon: data.whyChooseUs?.environment?.icon?.trim() || '',
        items: Array.isArray(data.whyChooseUs?.environment?.items) && data.whyChooseUs.environment.items.length > 0
          ? data.whyChooseUs.environment.items
          : DEFAULT_CAREERS_PAGE_CONFIG.whyChooseUs.environment.items,
      },
    },
    offices: Array.isArray(data.offices) && data.offices.length > 0
      ? data.offices.map((o: any, idx: number) => ({
          id: o.id || `office-${idx + 1}`,
          country: o.country || 'singapore',
          city: o.city || 'Office Location',
          addressLines: Array.isArray(o.addressLines) ? o.addressLines : [],
        }))
      : DEFAULT_CAREERS_PAGE_CONFIG.offices,
  };
}

/**
 * Get the careers page configuration from DB
 */
export async function getCareersPageConfig(): Promise<CareersPageConfigData> {
  try {
    const delegate = (prisma as any)?.companySection;
    if (delegate && typeof delegate.findUnique === 'function') {
      const item = await delegate.findUnique({
        where: { key: CAREERS_PAGE_KEY },
      });
      if (item && item.data) {
        return normalizeCareersPageConfig(item.data);
      }
    } else {
      const rows = await prisma.$queryRawUnsafe<any[]>(
        'SELECT data FROM company_section WHERE key = $1 LIMIT 1',
        CAREERS_PAGE_KEY
      );
      if (rows && rows.length > 0 && rows[0].data) {
        return normalizeCareersPageConfig(rows[0].data);
      }
    }

    // If not found in DB, return defaults
    return DEFAULT_CAREERS_PAGE_CONFIG;
  } catch (error) {
    console.error('[careers-page-config.service] Error in getCareersPageConfig:', error);
    return DEFAULT_CAREERS_PAGE_CONFIG;
  }
}

/**
 * Update the careers page configuration in DB
 */
export async function updateCareersPageConfig(
  newConfig: CareersPageConfigData
): Promise<CareersPageConfigData> {
  const normalized = normalizeCareersPageConfig(newConfig);

  try {
    const delegate = (prisma as any)?.companySection;
    if (delegate && typeof delegate.upsert === 'function') {
      await delegate.upsert({
        where: { key: CAREERS_PAGE_KEY },
        update: {
          data: normalized as unknown as Prisma.InputJsonValue,
          updatedAt: new Date(),
        },
        create: {
          key: CAREERS_PAGE_KEY,
          name: 'Cấu hình Trang Tuyển dụng (Careers Page)',
          title: 'Join The Human Inc',
          subtitle: 'Careers Page Content',
          description: 'Quản lý toàn bộ nội dung Hero, About, Why Choose Us, và Danh sách Văn phòng trên trang tuyển dụng E-GEAD.',
          data: normalized as unknown as Prisma.InputJsonValue,
          isActive: true,
          order: 99,
        },
      });
    } else {
      // Direct SQL upsert
      const existing = await prisma.$queryRawUnsafe<any[]>(
        'SELECT id FROM company_section WHERE key = $1 LIMIT 1',
        CAREERS_PAGE_KEY
      );

      if (existing && existing.length > 0) {
        await prisma.$queryRawUnsafe(
          'UPDATE company_section SET data = $1::jsonb, "updatedAt" = NOW() WHERE key = $2',
          JSON.stringify(normalized),
          CAREERS_PAGE_KEY
        );
      } else {
        const id = `careers-page-${Date.now()}`;
        await prisma.$queryRawUnsafe(
          'INSERT INTO company_section (id, key, name, title, subtitle, description, data, "isActive", "order", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, true, 99, NOW(), NOW())',
          id,
          CAREERS_PAGE_KEY,
          'Cấu hình Trang Tuyển dụng (Careers Page)',
          'Join The Human Inc',
          'Careers Page Content',
          'Quản lý toàn bộ nội dung Hero, About, Why Choose Us, và Danh sách Văn phòng trên trang tuyển dụng E-GEAD.',
          JSON.stringify(normalized)
        );
      }
    }

    return normalized;
  } catch (error) {
    console.error('[careers-page-config.service] Error updating careers page config:', error);
    throw error;
  }
}
