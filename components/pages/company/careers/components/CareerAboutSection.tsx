'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { CareersAboutData } from '@/lib/services/careers-page-config.service';

interface CareerAboutSectionProps {
  config?: CareersAboutData;
}

const DEFAULT_SUBTITLE = 'About The Human Inc';
const DEFAULT_TITLE = 'Find your passion at\nThe Human Inc';
const DEFAULT_PARAGRAPHS = [
  'At The Human Inc, we aim to create a breakthrough environment so that every individual can find their passion and build a solid foundation for their personal career in the technology field.',
  'Join us and you will become part of a passionate team, creating products with profound global impact.',
];
const DEFAULT_IMAGE = '/assets/careers/culture-spotlight.png';

export default function CareerAboutSection({ config }: CareerAboutSectionProps) {
  const subtitle = config?.subtitle || DEFAULT_SUBTITLE;
  const title = config?.title || DEFAULT_TITLE;
  const paragraphs =
    config?.paragraphs && config.paragraphs.length > 0
      ? config.paragraphs
      : DEFAULT_PARAGRAPHS;
  const image = config?.image || DEFAULT_IMAGE;

  return (
    <section className="w-full py-12 sm:py-20 lg:py-28" id="about">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Left Column: Text Content Card overlapping onto the image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[48%] xl:w-[45%] z-10 relative lg:-mr-16 xl:-mr-24 shrink-0"
          >
            <div className="bg-white/95 lg:bg-white/90 backdrop-blur-md p-6 sm:p-10 lg:p-12 xl:p-14 rounded-[28px] sm:rounded-[36px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-slate-100/90 space-y-6">
              <span className="text-sm sm:text-base font-semibold text-slate-900 tracking-normal block">
                {subtitle}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px]/[1.2] font-bold text-slate-900 whitespace-pre-line">
                {title}
              </h2>

              <div className="space-y-4 pt-1 text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Large Photo spanning from middle to right edge touching 1440px */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[62%] xl:w-[65%]"
          >
            <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_4px_28px_rgba(0,0,0,0.06)] border border-slate-100 bg-white">
              <img
                src={image}
                alt={title.replace('\n', ' ')}
                className="w-full h-auto object-cover max-h-[580px] lg:max-h-[640px] block select-none"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/careers/culture-spotlight.png';
                }}
              />
              {/* White gradient fade from left to right */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
