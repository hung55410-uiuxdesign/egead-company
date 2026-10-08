'use client';

import React from 'react';
import Link from 'next/link';
import { X, ArrowUpRight } from 'lucide-react';

interface MobileHeaderProps {
  onClose: () => void;
}

export default function MobileHeader({ onClose }: MobileHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
      <Link href="/" onClick={onClose} className="flex items-center">
        <img
          src="https://egeadcompany.com/images/egead/logo.png"
          alt="E-GEAD Company"
          className="h-8 sm:h-9 w-auto"
        />
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/contact-us"
          onClick={onClose}
          className="hidden sm:inline-flex items-center gap-2 bg-[#10E774] hover:bg-[#0ecb66] text-black font-semibold text-sm px-6 py-2.5 rounded-full transition"
        >
          <span>Get Free Consultation</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-black cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
