import { getHomeSections } from '@/lib/services/home-section.service';
import { HomeSectionsGridClient } from '@/components/admin/home';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Quản lý Trang chủ | Admin E-GEAD',
  description: 'Quản lý cấu hình và nội dung các khối (sections) trên trang chủ E-GEAD',
};

export default async function AdminHomePage() {
  const sections = await getHomeSections();

  const timestampKey = sections
    .map((s) => `${s.key}-${s.updatedAt.toString()}`)
    .join('_');

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <HomeSectionsGridClient key={timestampKey} sections={sections} />
    </div>
  );
}
