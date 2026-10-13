import { getCaseStudies, getCaseStudyStats } from '@/lib/services/casestudy.service';
import { OurWorkListClient } from '@/components/admin/our-work';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Quản lý Dự án & Trang Our Work | Admin E-GEAD',
  description: 'Quản lý danh sách các dự án Case Studies và nội dung các section trên trang Our Work',
};

export default async function AdminOurWorkPage() {
  const [items, stats] = await Promise.all([
    getCaseStudies(),
    getCaseStudyStats(),
  ]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <OurWorkListClient initialItems={items} initialStats={stats} />
    </div>
  );
}
