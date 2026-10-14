import { ServiceFormClient } from '@/components/admin/services';

export const metadata = {
  title: 'Thêm Dịch vụ / Ngành nghề mới | Admin E-GEAD',
  description: 'Thêm dịch vụ mới và cấu hình từng section hiển thị trên All Services',
};

export default function NewServicePage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <ServiceFormClient mode="create" />
    </div>
  );
}
