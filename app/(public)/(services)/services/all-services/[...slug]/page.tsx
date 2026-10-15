import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExactServiceData, ServiceDetailItem } from '@/data/services-data';
import { getServiceItemBySlug } from '@/lib/services/service-item.service';
import { ServiceDetailView } from '@/components/pages/services/services/all-services/[...slug]';
import { getOptimizedImageUrl } from '@/lib/utils/image';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

async function getMergedServiceItem(slugOrPath: string[]): Promise<ServiceDetailItem | null> {
  const targetSlug = slugOrPath[slugOrPath.length - 1] || slugOrPath[0];

  try {
    const dbItem = await getServiceItemBySlug(targetSlug);
    if (dbItem) {
      if (dbItem.status && dbItem.status !== 'published') {
        return null;
      }
      return {
        slug: dbItem.slug,
        category: (dbItem.category as 'service' | 'industry') || 'service',
        title: dbItem.title,
        tagline: dbItem.tagline,
        subtitle: dbItem.subtitle,
        overviewSubTitle: dbItem.overviewSubTitle || '',
        heroImage: getOptimizedImageUrl(dbItem.heroImage, { width: 1600 }) || '/images/services/strategy_design.jpg',
        middleImage: getOptimizedImageUrl(dbItem.middleImage, { width: 1600 }) || '/images/services/Btm_Automotive.jpg',
        overviewHeading: dbItem.overviewHeading || '',
        overviewParagraphs: dbItem.overviewParagraphs || [],
        approachHeading: dbItem.approachHeading || 'Our approach',
        approachIntro: dbItem.approachIntro || '',
        principles: Array.isArray(dbItem.principles) && dbItem.principles.length > 0
          ? dbItem.principles
          : [],
      };
    }
  } catch (error) {
    console.error('Error fetching service item from DB, using fallback:', error);
  }

  return getExactServiceData(slugOrPath);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getMergedServiceItem(slug);

  if (!service) {
    return {
      title: 'Trang không tìm thấy | E-GEAD Enterprise Digital Operations',
      description: 'Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã được gỡ bỏ.',
    };
  }

  return {
    title: `${service.title} Solutions | E-GEAD Enterprise Digital Operations`,
    description: service.subtitle,
    keywords: [
      `${service.title.toLowerCase()} ecommerce`,
      `${service.title.toLowerCase()} digital transformation`,
      'enterprise commerce operations',
      'sub-24h fulfillment',
      'multi-channel automation',
      'E-GEAD enterprise solutions',
    ],
    openGraph: {
      title: `${service.title} | E-GEAD Solutions`,
      description: service.subtitle,
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getMergedServiceItem(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}

