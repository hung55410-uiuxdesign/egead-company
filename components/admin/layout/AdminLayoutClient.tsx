'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { useSession } from '@/lib/auth-client';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const isHierarchyPage = pathname === '/admin/people/hierarchy';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: sessionData, isPending } = useSession();

  useEffect(() => {
    if (!isLoginPage && !isPending && !sessionData?.session) {
      router.replace('/admin/login');
    }
  }, [isLoginPage, isPending, sessionData, router]);

  if (isLoginPage) {
    return (
      <div className="font-mona-sans min-h-screen text-slate-800">
        {children}
      </div>
    );
  }

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

  return (
    <div className="astryx-app-shell surface h-screen w-full overflow-hidden bg-slate-100 text-slate-800 flex font-open-sans selection:bg-slate-900 selection:text-white">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-100 font-open-sans">
        <AdminNavbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main
          className={
            isHierarchyPage
              ? 'flex-1 p-6 overflow-hidden w-full flex flex-col min-h-0'
              : 'flex-1 px-[6%] sm:px-[7%] xl:px-[8%] py-6 sm:py-8 overflow-y-auto w-full'
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
}
