import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SmoothScroll from '@/components/SmoothScroll';
import QueryProvider from '@/components/providers/QueryProvider';
import PublicLayoutClient from '@/components/layout/PublicLayoutClient';
import { getCategoriesWithCount } from '@/lib/services/category.service';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';
import { getFooterConfig } from '@/lib/services/footer-config.service';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, headerServicesSection, footerConfig] = await Promise.all([
    getCategoriesWithCount().catch(() => []),
    getHomeSectionByKey('header-services-menu').catch(() => null),
    getFooterConfig().catch(() => null),
  ]);

  return (
    <QueryProvider>
      <SmoothScroll>
        <PublicLayoutClient
          header={
            <Header
              initialCategories={categories}
              initialServicesMenu={headerServicesSection?.data || null}
            />
          }
          footer={<Footer initialConfig={footerConfig} />}
        >
          {children}
        </PublicLayoutClient>
      </SmoothScroll>
    </QueryProvider>
  );
}
