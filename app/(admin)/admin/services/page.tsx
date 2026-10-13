import { getServiceItems, getServiceItemStats } from '@/lib/services/service-item.service';
import { ServiceListClient } from '@/components/admin/services';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Quản lý Dịch vụ & Ngành nghề | Admin E-GEAD',
  description: 'Quản lý các trụ cột dịch vụ công nghệ và ngành nghề chuyên sâu hiển thị trên menu và trang All Services',
};

export default async function AdminServicesPage() {
  const [items, stats] = await Promise.all([
    getServiceItems(),
    getServiceItemStats(),
  ]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <ServiceListClient initialItems={items} initialStats={stats} />
    </div>
  );
}
