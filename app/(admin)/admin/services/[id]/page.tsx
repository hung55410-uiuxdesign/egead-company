import React from 'react';
import { notFound } from 'next/navigation';
import { getServiceItemById } from '@/lib/services/service-item.service';
import { ServiceFormClient } from '@/components/admin/services';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = await getServiceItemById(id);
  return {
    title: item
      ? `Chỉnh sửa: ${item.title} | Admin E-GEAD`
      : 'Chỉnh sửa dịch vụ | Admin E-GEAD',
  };
}

export default async function EditServicePage({ params }: PageProps) {
  const { id } = await params;
  const item = await getServiceItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <ServiceFormClient mode="edit" initialData={item} />
    </div>
  );
}
