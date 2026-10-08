import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

