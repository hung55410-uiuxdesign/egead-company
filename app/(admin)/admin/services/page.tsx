import { getServiceItems, getServiceItemStats } from '@/lib/services/service-item.service';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';
import { ServiceListClient } from '@/components/admin/services';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Quản lý Dịch vụ & Ngành nghề | Admin E-GEAD',
  description: 'Quản lý các trụ cột dịch vụ công nghệ, ngành nghề chuyên sâu và cấu hình menu điều hướng Header',
};

export default async function AdminServicesPage() {
  const [items, stats, headerMenuSection] = await Promise.all([
    getServiceItems(),
    getServiceItemStats(),
    getHomeSectionByKey('header-services-menu').catch(() => null),
  ]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <ServiceListClient
        initialItems={items}
        initialStats={stats}
        initialHeaderMenu={headerMenuSection}
      />
    </div>
  );
}
