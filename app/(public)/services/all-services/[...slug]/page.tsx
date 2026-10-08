import React from 'react';
import type { Metadata } from 'next';
import { getServiceData } from '@/data/services-data';
import ServiceDetailClientView from './ServiceDetailClientView';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceData(slug);

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

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceData(slug);

  return <ServiceDetailClientView service={service} />;
}
