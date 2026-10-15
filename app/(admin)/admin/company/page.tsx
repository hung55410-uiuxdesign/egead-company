import { getCompanySections } from '@/lib/services/company-section.service';
import CompanySectionsGridClient from '@/components/admin/company/CompanySectionsGridClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Quản lý Trang Company | Admin E-GEAD',
  description: 'Quản lý cấu hình, ẩn/hiện và nội dung các khối (sections) trên trang Giới thiệu (Company) E-GEAD',
};

export default async function AdminCompanyPage() {
  const sections = await getCompanySections();

  const timestampKey = sections
    .map((s) => `${s.key}-${s.updatedAt.toString()}`)
    .join('_');

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <CompanySectionsGridClient key={timestampKey} sections={sections} />
    </div>
  );
}
