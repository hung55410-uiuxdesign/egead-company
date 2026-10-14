import { Suspense } from 'react';
import { getServiceItems, getServiceItemStats } from '@/lib/services/service-item.service';
import { getPartnerItems, getPartnerItemStats } from '@/lib/services/partner-item.service';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';
import { ServiceListClient } from '@/components/admin/services';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Quản lý Dịch vụ, Ngành nghề & Đối tác | Admin E-GEAD',
  description: 'Quản lý các trụ cột dịch vụ công nghệ, ngành nghề chuyên sâu, cấu hình menu và đối tác chiến lược',
};

export default async function AdminServicesPage() {
  const [items, stats, headerMenuSection, partners, partnerStats] = await Promise.all([
    getServiceItems(),
    getServiceItemStats(),
    getHomeSectionByKey('header-services-menu').catch(() => null),
    getPartnerItems().catch(() => []),
    getPartnerItemStats().catch(() => ({ total: 0, published: 0, draft: 0 })),
  ]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="py-12 text-center text-sm text-slate-400">Đang tải...</div>}>
        <ServiceListClient
          initialItems={items}
          initialStats={stats}
          initialHeaderMenu={headerMenuSection}
          initialPartners={partners}
          initialPartnerStats={partnerStats}
        />
      </Suspense>
    </div>
  );
}

