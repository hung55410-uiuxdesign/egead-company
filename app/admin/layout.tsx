import type { Metadata } from 'next';
import '@astryxdesign/core/astryx.css';
import '@astryxdesign/theme-neutral/theme.css';
import './admin.css';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export const metadata: Metadata = {
  title: 'E-GEAD Admin Portal — Quản lý nội dung & Blog CMS (Astryx UI)',
  description: 'Hệ thống quản trị và đăng bài viết blog sử dụng Astryx Design System.',
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
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
