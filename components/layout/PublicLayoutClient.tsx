'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return <main className="w-full min-h-screen overflow-x-hidden bg-[#020617] text-slate-100">{children}</main>;
  }

  return (
    <>
      {header}
      <main className="flex-grow">{children}</main>
      {footer}
    </>
  );
}
