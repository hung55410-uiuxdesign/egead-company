'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MotionDiv } from '@/components/MotionSection';

export default function CaseStudyBreadcrumb() {
  return (
    <MotionDiv
      delay={0.05}
      className="pt-4 sm:pt-6 pb-2 px-6 md:px-16 max-w-[1440px] mx-auto"
    >
      <Link
        href="/our-work"
        className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[#7ceee0] hover:text-[#d3f9f5] transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Our Work</span>
      </Link>
    </MotionDiv>
  );
}
