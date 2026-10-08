'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface MobilePromoCardProps {
  onClose: () => void;
}

export default function MobilePromoCard({ onClose }: MobilePromoCardProps) {
  return (
    <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#0A0D0E] to-[#141718] p-6 text-white flex flex-col justify-between relative overflow-hidden border border-gray-800">
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#10E774]/20 text-[#10E774] border border-[#10E774]/30 mb-4">
          US POD Production
        </span>
        <h3 className="text-xl font-bold leading-snug">
          Fulfilled in Under 24 Hours From $6 All-In
        </h3>
        <p className="text-xs text-gray-300 mt-3 leading-relaxed">
          End-to-end production with 23-inch large-format printing technology, 100% TikTok Shop US compliance, and real-time barcode accuracy.
        </p>
      </div>

      <div className="mt-8 relative z-10">
        <Link
          href="/contact-us"
          onClick={onClose}
          className="inline-flex items-center gap-2 bg-[#10E774] hover:bg-[#0ecb66] text-black font-semibold text-xs px-5 py-2.5 rounded-full transition"
        >
          <span>Request POD Pricing</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#10E774]/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}
