'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Ensure document and body are strictly in light mode for admin portal
    const html = document.documentElement;
    const body = document.body;

    const hadDark = html.classList.contains('dark');
    const prevDataTheme = html.getAttribute('data-theme');
    const prevAstryxTheme = html.getAttribute('data-astryx-theme');
    const prevColorScheme = html.style.colorScheme;
    const prevBodyBg = body.style.backgroundColor;
    const prevBodyColor = body.style.color;

    // Force light mode
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
  }, []);

  return (
    <div
      data-astryx-admin="true"
      data-astryx-theme="neutral"
      data-theme="light"
      style={{ colorScheme: 'light' }}
      className="astryx-app-shell surface min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans selection:bg-slate-900 selection:text-white"
    >
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        <AdminNavbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
