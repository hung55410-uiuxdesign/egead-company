'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLocalizeHref, useT } from '@/components/providers/LocaleProvider';

interface MobilePromoCardProps {
  onClose: () => void;
}

export default function MobilePromoCard({ onClose }: MobilePromoCardProps) {
  const t = useT();
  const lh = useLocalizeHref();

  return (
    <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#0A0D0E] to-[#141718] p-6 text-white flex flex-col justify-between relative overflow-hidden border border-gray-800">
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#10E774]/20 text-[#10E774] border border-[#10E774]/30 mb-4">
          {t.promo.tag}
        </span>
        <h3 className="text-xl font-bold leading-snug">
          {t.promo.title}
        </h3>
        <p className="text-xs text-gray-300 mt-3 leading-relaxed">
          {t.promo.body}
        </p>
      </div>

      <div className="mt-8 relative z-10">
        <Link
          href={lh('/contact-us')}
          onClick={onClose}
          className="inline-flex items-center gap-2 bg-[#10E774] hover:bg-[#0ecb66] text-black font-semibold text-xs px-5 py-2.5 rounded-full transition"
        >
          <span>{t.promo.cta}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#10E774]/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}
