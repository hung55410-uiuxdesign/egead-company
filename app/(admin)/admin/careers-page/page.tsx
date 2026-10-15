import React from 'react';
import { getCareersPageConfig } from '@/lib/services/careers-page-config.service';
import { CareersPageConfigClient } from '@/components/admin/careers-page';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Quản lý Trang Tuyển dụng (Careers) | Admin E-GEAD',
  description:
    'Quản lý cấu hình, hình ảnh banner, văn hóa và văn phòng toàn cầu trên trang tuyển dụng E-GEAD',
};

export default async function AdminCareersPageConfigPage() {
  const config = await getCareersPageConfig();

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <CareersPageConfigClient initialConfig={config} />
    </div>
  );
}
