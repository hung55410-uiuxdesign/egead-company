'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { useSession } from '@/lib/auth-client';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication state from Better Auth
  const { data: sessionData, isPending } = useSession();

  useEffect(() => {
    // If not login page, and user is confirmed unauthenticated, redirect to login
    if (!isLoginPage && !isPending && !sessionData?.session) {
      router.replace('/admin/login');
    }
  }, [isLoginPage, isPending, sessionData, router]);

  useEffect(() => {
    // Ensure document and body are in light mode for all admin portal pages (including login)
    const html = document.documentElement;
    const body = document.body;

    const hadDark = html.classList.contains('dark');
    const prevDataTheme = html.getAttribute('data-theme');
    const prevAstryxTheme = html.getAttribute('data-astryx-theme');
    const prevColorScheme = html.style.colorScheme;
    const prevBodyBg = body.style.backgroundColor;
    const prevBodyColor = body.style.color;

    // Force light mode for admin dashboard
    html.classList.remove('dark');
    html.setAttribute('data-theme', 'light');
    html.setAttribute('data-astryx-theme', 'neutral');
    html.style.colorScheme = 'light';
    body.style.backgroundColor = '#F8FAFC';
    body.style.color = '#0F172A';

    return () => {
      // Restore public website dark mode
      if (hadDark) html.classList.add('dark');
      if (prevDataTheme) html.setAttribute('data-theme', prevDataTheme);
      else html.removeAttribute('data-theme');
      if (prevAstryxTheme) html.setAttribute('data-astryx-theme', prevAstryxTheme);
      else html.removeAttribute('data-astryx-theme');
      html.style.colorScheme = prevColorScheme;
      body.style.backgroundColor = prevBodyBg;
      body.style.color = prevBodyColor;
    };
  }, [isLoginPage]);

  // If this is the login page, render clean standalone view in light mode
  if (isLoginPage) {
    return (
      <Theme theme={neutralTheme} mode="light">
        <div
          data-astryx-admin="true"
          data-astryx-theme="neutral"
          data-theme="light"
          style={{ colorScheme: 'light' }}
          className="font-open-sans min-h-screen bg-slate-50 text-slate-800"
        >
          {children}
        </div>
      </Theme>
    );
  }

  // Strictly block rendering admin shell if session is checking OR user is unauthenticated
  if (isPending || !sessionData?.session) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-open-sans text-slate-700">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold">
          {isPending ? 'Đang kiểm tra quyền quản trị viên...' : 'Đang chuyển hướng đến trang đăng nhập...'}
        </p>
        <span className="text-xs text-slate-400 mt-1">E-GEAD CMS Portal</span>
      </div>
    );
  }

  // Render Admin Shell if authenticated (or fallback during dev)
  return (
    <Theme theme={neutralTheme} mode="light">
      <div
        data-astryx-admin="true"
        data-astryx-theme="neutral"
        data-theme="light"
        style={{ colorScheme: 'light' }}
        className="astryx-app-shell surface h-screen w-full overflow-hidden bg-slate-50 text-slate-800 flex font-open-sans selection:bg-slate-900 selection:text-white"
      >
        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-50 font-open-sans">
          <AdminNavbar onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 px-[6%] sm:px-[7%] xl:px-[8%] py-6 sm:py-8 overflow-y-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </Theme>
  );
}
