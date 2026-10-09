import type { Metadata } from 'next';
import './admin.css';
import { AdminLayoutClient } from '@/components/admin/layout';
import { AdminQueryProvider } from '@/components/admin/providers';
import { AstryxProviders } from '@/components/admin/providers/AstryxProvider';

export const metadata: Metadata = {
  title: 'E-GEAD Admin Portal — Quản lý nội dung & Blog CMS',
  description: 'Hệ thống quản trị và đăng bài viết blog hiện đại chuẩn SaaS cho E-GEAD.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-mona-sans antialiased">
      <AdminQueryProvider>
        <AstryxProviders>
          <AdminLayoutClient>{children}</AdminLayoutClient>
        </AstryxProviders>
      </AdminQueryProvider>
    </div>
  );
}
