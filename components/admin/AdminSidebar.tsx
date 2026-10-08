'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  FolderTree,
  Settings,
  ExternalLink,
  Layers,
  X,
  Sparkles,
  Briefcase,
  UserPlus,
  Users,
  FileInput,
  GitFork,
} from 'lucide-react';
import { useSession, authClient } from '@/lib/auth-client';
import { Badge, Button } from '@astryxdesign/core';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTENT_NAV_ITEMS = [
  {
    label: 'Bảng điều khiển',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: 'Tất cả bài viết',
    href: '/admin/blogs',
    icon: FileText,
    exact: true,
  },
  {
    label: 'Thêm bài viết mới',
    href: '/admin/blogs/new',
    icon: PenSquare,
    exact: false,
  },
  {
    label: 'Chuyên mục & Thẻ',
    href: '/admin/categories',
    icon: FolderTree,
    exact: false,
  },
];

const PEOPLE_NAV_ITEMS = [
  {
    label: 'Danh sách nhân sự',
    href: '/admin/people',
    icon: Users,
    exact: true,
  },
  {
    label: 'Thêm nhân sự mới',
    href: '/admin/people/new',
    icon: UserPlus,
    exact: false,
  },
  {
    label: 'Sơ đồ tổ chức & Squads',
    href: '/admin/people/hierarchy',
    icon: GitFork,
    exact: false,
  },
];

const CAREER_NAV_ITEMS = [
  {
    label: 'Quản lý tuyển dụng',
    href: '/admin/careers',
    icon: Briefcase,
    exact: true,
  },
  {
    label: 'Đăng tin tuyển dụng',
    href: '/admin/careers/new',
    icon: UserPlus,
    exact: false,
  },
  {
    label: 'Hồ sơ ứng tuyển',
    href: '/admin/careers/applications',
    icon: Users,
    exact: false,
  },
  {
    label: 'Form ứng tuyển & Test',
    href: '/admin/careers/form-preview',
    icon: FileInput,
    exact: false,
  },
];

const SYSTEM_NAV_ITEMS = [
  {
    label: 'Cài đặt CMS',
    href: '/admin/settings',
    icon: Settings,
    exact: false,
  },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: sessionData } = useSession();
  const sessionUser = sessionData?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container - Light Mode */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Logo */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200/80 bg-white shrink-0">
          <Link href="/admin" className="flex items-center gap-2.5 group min-w-0">
            <div className="relative flex items-center shrink-0">
              {/* Light mode logo */}
              <Image
                src="/assets/logo/black.png"
                alt="E-GEAD"
                width={112}
                height={28}
                className="h-7 w-auto object-contain dark:hidden group-hover:opacity-85 transition-opacity"
                priority
              />
              {/* Dark mode logo */}
              <Image
                src="/assets/logo/white.png"
                alt="E-GEAD"
                width={112}
                height={28}
                className="h-7 w-auto object-contain hidden dark:block group-hover:opacity-85 transition-opacity"
                priority
              />
            </div>
            <div className="shrink-0 flex items-center">
              <Badge label="CMS" variant="success" />
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 lg:hidden"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
          {/* Content Management Group */}
          <div>
            <div className="px-3 mb-2 text-xs font-bold text-slate-500">
              Quản lý nội dung
            </div>
            <nav className="space-y-1">
              {CONTENT_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-50/90 text-emerald-900 border border-emerald-200/90 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* People & Organization Group */}
          <div>
            <div className="px-3 mb-2 text-xs font-bold text-slate-500 flex items-center justify-between">
              <span>Nhân sự &amp; Tổ chức</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <nav className="space-y-1">
              {PEOPLE_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-50/90 text-emerald-900 border border-emerald-200/90 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Careers & Recruitment Group */}
          <div>
            <div className="px-3 mb-2 text-xs font-bold text-slate-500 flex items-center justify-between">
              <span>Tuyển dụng &amp; Ứng tuyển</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <nav className="space-y-1">
              {CAREER_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-50/90 text-emerald-900 border border-emerald-200/90 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* System Settings Group */}
          <div>
            <div className="px-3 mb-2 text-xs font-bold text-slate-500">
              Hệ thống
            </div>
            <nav className="space-y-1">
              {SYSTEM_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-50/90 text-emerald-900 border border-emerald-200/90 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 mb-2 text-[11px] font-bold text-slate-500">
              Đường dẫn nhanh
            </div>
            <div className="space-y-1">
              <Link
                href="/insights"
                target="_blank"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  <span>Trang Insights Live</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  <span>Trang chủ E-GEAD</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info & Logout in sidebar */}
        <div className="p-3.5 border-t border-slate-200/80 bg-slate-50/70 shrink-0">
          <div className="bg-white border border-slate-200/80 rounded-xl p-3 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-bold text-xs">
                  {sessionUser?.name ? sessionUser.name.slice(0, 2).toUpperCase() : 'AD'}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {sessionUser?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {sessionUser?.email || 'admin@egead.com'}
                </p>
              </div>
            </div>

            <Button
              label="Đăng xuất"
              variant="secondary"
              width="100%"
              onClick={handleSignOut}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
