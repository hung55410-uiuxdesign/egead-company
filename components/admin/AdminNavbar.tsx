'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Bell } from 'lucide-react';
import { Button } from '@astryxdesign/core';

interface AdminNavbarProps {
  onOpenSidebar: () => void;
}

export default function AdminNavbar({ onOpenSidebar }: AdminNavbarProps) {
  const pathname = usePathname();

  const getBreadcrumbTitle = () => {
    if (pathname === '/admin') return 'Tổng quan bảng điều khiển';
    if (pathname === '/admin/blogs') return 'Quản lý danh sách bài viết';
    if (pathname === '/admin/blogs/new') return 'Tạo bài viết blog mới';
    if (pathname?.startsWith('/admin/blogs/')) return 'Chỉnh sửa bài viết';
    if (pathname === '/admin/categories') return 'Chuyên mục & Phân loại';
    if (pathname === '/admin/settings') return 'Cấu hình hệ thống';
    return 'Admin Portal';
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-open-sans shrink-0">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Mở menu điều hướng"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/admin"
            className="text-slate-400 hover:text-slate-700 transition-colors hidden sm:inline font-semibold text-xs"
          >
            Admin
          </Link>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <h1 className="text-sm sm:text-base font-extrabold text-slate-900">
            {getBreadcrumbTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          label="Xem trang live"
          variant="secondary"
          size="sm"
          href="/insights"
          target="_blank"
        />

        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 relative transition-colors"
          aria-label="Thông báo hệ thống"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        {pathname !== '/admin/blogs/new' && (
          <Button
            label="Viết bài mới"
            variant="primary"
            size="sm"
            href="/admin/blogs/new"
          />
        )}
      </div>
    </header>
  );
}
