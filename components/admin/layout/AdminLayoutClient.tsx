'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { useSession } from '@/lib/auth-client';
import { LoginLoadingFallback } from '@/components/admin/shared';

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
      <LoginLoadingFallback
        message={isPending ? 'Đang kiểm tra quyền quản trị viên...' : 'Đang chuyển hướng đến trang đăng nhập...'}
        subMessage="Vui lòng chờ trong giây lát trong khi hệ thống xác thực phiên làm việc."
      />
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
