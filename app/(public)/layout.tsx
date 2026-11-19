import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SmoothScroll from '@/components/SmoothScroll';
import GridBackground from '@/components/background/GridBackground';
import QueryProvider from '@/components/providers/QueryProvider';
import { getCategoriesWithCount } from '@/lib/services/category.service';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';
import { getFooterConfig } from '@/lib/services/footer-config.service';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { getLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [categories, headerServicesSection, footerConfig] = await Promise.all([
    getCategoriesWithCount(),
    getHomeSectionByKey('header-services-menu').catch(() => null),
    getFooterConfig().catch(() => null),
  ]);

  return (
    <LocaleProvider locale={locale} dict={dict}>
    <QueryProvider>
      <SmoothScroll>
        <GridBackground />
        <Header
          initialCategories={categories}
          initialServicesMenu={headerServicesSection?.data || null}
        />
        <main data-grid-bg className="relative z-10 flex-grow">
          {children}
        </main>
        <div className="relative z-10">
          <Footer initialConfig={footerConfig} />
        </div>
      </SmoothScroll>
    </QueryProvider>
    </LocaleProvider>
  );
}
