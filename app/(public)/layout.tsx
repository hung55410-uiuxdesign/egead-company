import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SmoothScroll from '@/components/SmoothScroll';
import { getCategoriesWithCount } from '@/lib/services/category.service';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategoriesWithCount();

  return (
    <SmoothScroll>
      <Header initialCategories={categories} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}

