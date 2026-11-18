'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import EgeadLiveGridCanvas from './EgeadLiveGridCanvas';
import EgeadPageTransition from './EgeadPageTransition';

interface PublicLayoutClientProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export default function PublicLayoutClient({
  header,
  footer,
  children,
}: PublicLayoutClientProps) {
  const pathname = usePathname() || '/';
  const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/en/';

  if (isHomePage) {
    return (
      <>
        <EgeadPageTransition />
        {children}
      </>
    );
  }

  return (
    <div className="egead-public-shell relative min-h-screen flex flex-col">
      {/* Global Radial Pixel-Grid Wave Page Transition */}
      <EgeadPageTransition />

      {/* Living 3D Perspective Architectural Crosshair Grid + Breathing Lime Glow */}
      <EgeadLiveGridCanvas />

      {header}
      <main key={pathname} className="relative z-10 flex-grow egead-page-enter">
        {children}
      </main>
      <div className="relative z-10">{footer}</div>
    </div>
  );
}
