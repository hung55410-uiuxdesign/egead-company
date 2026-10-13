import { OurWorkFormClient } from '@/components/admin/our-work';

export const metadata = {
  title: 'Thêm dự án Case Study mới | Admin E-GEAD',
  description: 'Thêm dự án mới và cấu hình từng section hiển thị trên Our Work',
};

export default function NewCaseStudyPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <OurWorkFormClient mode="create" />
    </div>
  );
}
