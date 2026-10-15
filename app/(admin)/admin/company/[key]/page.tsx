import React from 'react';
import { notFound } from 'next/navigation';
import { getCompanySectionByKey } from '@/lib/services/company-section.service';
import {
  CompanyHeroSectionFormClient,
  CompanyIntroSectionFormClient,
  Company4DMethodSectionFormClient,
  CompanyValueSystemSectionFormClient,
  CompanyCaseStudiesSectionFormClient,
  CompanyPortalsSectionFormClient,
  CompanyContactSectionFormClient,
} from '@/components/admin/company';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ key: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { key } = await params;
  const section = await getCompanySectionByKey(key);
  return {
    title: section
      ? `Cập nhật section: ${section.name} | Admin E-GEAD`
      : 'Cập nhật section trang Company | Admin E-GEAD',
  };
}

export default async function AdminCompanySectionDetailPage({ params }: PageProps) {
  const { key } = await params;
  const section = await getCompanySectionByKey(key);

  if (!section) {
    notFound();
  }

  const renderSectionForm = () => {
    switch (key) {
      case 'company-hero':
        return (
          <CompanyHeroSectionFormClient
            key={`${section.key}-${section.updatedAt.toString()}`}
            section={section}
          />
        );
      case 'company-intro':
        return (
          <CompanyIntroSectionFormClient
            key={`${section.key}-${section.updatedAt.toString()}`}
            section={section}
          />
        );
      case 'company-4d-method':
        return (
          <Company4DMethodSectionFormClient
            key={`${section.key}-${section.updatedAt.toString()}`}
            section={section}
          />
        );
      case 'company-value-system':
        return (
          <CompanyValueSystemSectionFormClient
            key={`${section.key}-${section.updatedAt.toString()}`}
            section={section}
          />
        );
      case 'company-case-studies':
        return (
          <CompanyCaseStudiesSectionFormClient
            key={`${section.key}-${section.updatedAt.toString()}`}
            section={section}
          />
        );
      case 'company-portals':
        return (
          <CompanyPortalsSectionFormClient
            key={`${section.key}-${section.updatedAt.toString()}`}
            section={section}
          />
        );
      case 'company-contact':
        return (
          <CompanyContactSectionFormClient
            key={`${section.key}-${section.updatedAt.toString()}`}
            section={section}
          />
        );
      default:
        return notFound();
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {renderSectionForm()}
    </div>
  );
}
