import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import '@astryxdesign/core/astryx.css';
import '@astryxdesign/theme-neutral/theme.css';
import './admin.css';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

const openSans = Open_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
});

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
    <div className={`${openSans.variable} ${openSans.className} font-open-sans`}>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}

