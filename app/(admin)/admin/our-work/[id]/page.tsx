import React from 'react';
import { notFound } from 'next/navigation';
import { getCaseStudyById } from '@/lib/services/casestudy.service';
import { OurWorkFormClient } from '@/components/admin/our-work';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = await getCaseStudyById(id);
  return {
    title: item
      ? `Chỉnh sửa dự án: ${item.title} | Admin E-GEAD`
      : 'Chỉnh sửa dự án Case Study | Admin E-GEAD',
  };
}

export default async function EditCaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const item = await getCaseStudyById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <OurWorkFormClient mode="edit" initialData={item} />
    </div>
  );
}
