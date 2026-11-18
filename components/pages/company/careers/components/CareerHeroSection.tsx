'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { CareersHeroData } from '@/lib/services/careers-page-config.service';

interface CareerHeroSectionProps {
  config?: CareersHeroData;
}

const DEFAULT_TITLE =
  'Join The Human Inc to\ndiscover new opportunities\ntogether in the future.';
const DEFAULT_IMAGE = '/assets/careers/team-group.png';

export default function CareerHeroSection({ config }: CareerHeroSectionProps) {
  const title = config?.title || DEFAULT_TITLE;
  const image = config?.image || DEFAULT_IMAGE;

  return (
    <section className="w-full pt-6 sm:pt-10 pb-14 sm:pb-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Team Photo Banner - Full Width with soft bottom vignette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100"
        >
          <img
            src={image}
            alt="The Human Inc Team"
            className="w-full h-auto object-cover select-none block"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/careers/hero-team.png';
            }}
          />
          {/* Soft bottom vignette fading cleanly into the page */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-40 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-10 sm:mt-14 max-w-4xl mx-auto"
        >
          <h1 className="text-3xl/[1.4] sm:text-4xl/[1.35] md:text-[42px]/[1.32] lg:text-[46px]/[1.3] font-bold text-slate-900 whitespace-pre-line">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
