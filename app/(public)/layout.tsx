import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SmoothScroll from '@/components/SmoothScroll';
import QueryProvider from '@/components/providers/QueryProvider';
import { getCategoriesWithCount } from '@/lib/services/category.service';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, headerServicesSection] = await Promise.all([
    getCategoriesWithCount(),
    getHomeSectionByKey('header-services-menu').catch(() => null),
  ]);

  return (
    <QueryProvider>
      <SmoothScroll>
        <Header
          initialCategories={categories}
          initialServicesMenu={headerServicesSection?.data || null}
        />
        <main className="flex-grow">{children}</main>
        <Footer />
      </SmoothScroll>
    </QueryProvider>
  );
}
