import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';
import {
  MarketplacesSectionFormClient,
  ServicesSectionFormClient,
  SmartCXSectionFormClient,
  TestimonialsSectionFormClient,
} from '@/components/admin/home';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ key: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { key } = await params;
  if (key === 'footer-config') {
    return { title: 'Cấu hình Chân trang (Footer) | Admin E-GEAD' };
  }
  const section = await getHomeSectionByKey(key);
  return {
    title: section
      ? `Cập nhật section: ${section.name} | Admin E-GEAD`
      : 'Cập nhật section trang chủ | Admin E-GEAD',
  };
}

export default async function AdminHomeSectionDetailPage({ params }: PageProps) {
  const { key } = await params;

  if (key === 'footer-config') {
    redirect('/admin/footer');
  }

  const section = await getHomeSectionByKey(key);

  if (!section) {
    notFound();
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {key === 'services-capabilities' ? (
        <ServicesSectionFormClient
          key={`${section.key}-${section.updatedAt.toString()}`}
          section={section}
        />
      ) : key === 'why-brands-ship' || key === 'smartcx-success' ? (
        <SmartCXSectionFormClient
          key={`${section.key}-${section.updatedAt.toString()}`}
          section={section}
        />
      ) : key === 'testimonials' ? (
        <TestimonialsSectionFormClient
          key={`${section.key}-${section.updatedAt.toString()}`}
          section={section}
        />
      ) : (
        <MarketplacesSectionFormClient
          key={`${section.key}-${section.updatedAt.toString()}`}
          section={section}
        />
      )}
    </div>
  );
}
