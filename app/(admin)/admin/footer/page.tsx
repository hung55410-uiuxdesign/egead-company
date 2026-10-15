import React from 'react';
import { getFooterSection } from '@/lib/services/footer-config.service';
import { FooterConfigFormClient } from '@/components/admin/footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Quản lý Chân trang (Footer) | Admin E-GEAD',
  description:
    'Quản lý cấu hình, liên kết điều hướng, mạng xã hội, bản tin và múi giờ chân trang website E-GEAD',
};

export default async function AdminFooterPage() {
  const section = await getFooterSection();

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <FooterConfigFormClient
        key={`${section.key}-${section.updatedAt.toString()}`}
        section={section}
      />
    </div>
  );
}
