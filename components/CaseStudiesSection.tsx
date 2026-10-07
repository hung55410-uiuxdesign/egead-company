'use client';

import React from 'react';
import { motion } from 'framer-motion';

const row1Partners = [
  { name: 'Partner 01', src: '/assets/partners/01.svg' },
  { name: 'Partner 02', src: '/assets/partners/02.svg' },
  { name: 'Partner 03', src: '/assets/partners/03.svg' },
  { name: 'Partner 04', src: '/assets/partners/04.png' },
  { name: 'Partner 05', src: '/assets/partners/05.svg' },
  { name: 'Partner 06', src: '/assets/partners/06.svg' },
  { name: 'Partner 07', src: '/assets/partners/07.svg' },
  { name: 'Partner 08', src: '/assets/partners/08.svg' },
  { name: 'Partner 09', src: '/assets/partners/09.svg' },
  { name: 'Partner 10', src: '/assets/partners/10.svg' },
  { name: 'Partner 11', src: '/assets/partners/11.svg' },
  { name: 'Partner 12', src: '/assets/partners/12.svg' },
  { name: 'Partner 13', src: '/assets/partners/13.svg' },
  { name: 'Partner 14', src: '/assets/partners/14.svg' },
  { name: 'Partner 15', src: '/assets/partners/15.svg' },
];

const row2Partners = [
  { name: 'Partner 16', src: '/assets/partners/16.svg' },
  { name: 'Partner 17', src: '/assets/partners/17.svg' },
  { name: 'Partner 18', src: '/assets/partners/18.svg' },
  { name: 'Partner 19', src: '/assets/partners/19.svg' },
  { name: 'Partner 20', src: '/assets/partners/20.svg' },
  { name: 'Partner 21', src: '/assets/partners/21.svg' },
  { name: 'Partner 22', src: '/assets/partners/22.svg' },
  { name: 'Partner 23', src: '/assets/partners/23.svg' },
  { name: 'Partner 24', src: '/assets/partners/24.svg' },
  { name: 'Partner 25', src: '/assets/partners/25.svg' },
  { name: 'Partner 26', src: '/assets/partners/26.svg' },
  { name: 'Partner 27', src: '/assets/partners/27.svg' },
  { name: 'Partner 28', src: '/assets/partners/28.svg' },
  { name: 'Partner 29', src: '/assets/partners/29.svg' },
];

export default function CaseStudiesSection() {
  const row1Doubled = [...row1Partners, ...row1Partners];
  const row2Doubled = [...row2Partners, ...row2Partners];

  return (
    <section
      id="homepage__customers"
      className="relative w-full py-24 sm:py-32 lg:py-36 xl:py-40 bg-[#0A0D0E] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        {/* Header Block */}
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-normal text-white font-montserrat leading-[1.18] tracking-tight mb-7"
          >
            Trusted by the world&apos;s
            <br className="hidden sm:inline" /> leading brands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg lg:text-[19px] text-[#b3b3b3] font-light leading-[1.8] font-montserrat max-w-3xl"
          >
            More than 13,000 companies trust Egead to manage their global e-commerce logistics and digital infrastructure across 24 time zones. From Fortune 500s to emerging direct-to-consumer brands, companies rely on our fulfillment, sales automation, and growth marketing to drive supply chain efficiencies.
          </motion.p>
        </div>
      </div>

      {/* 2 Marquee Rows */}
      <div className="relative w-full overflow-hidden space-y-8 sm:space-y-12">
        {/* Row 1 Marquee (Flows Left) */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle Left & Right Edge Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />

          <div
            className="flex w-max pause-hover items-center gap-8 sm:gap-12 lg:gap-16"
            style={{ animation: 'marquee 60s linear infinite' }}
          >
            {row1Doubled.map((partner, idx) => (
              <motion.div
                key={`r1-${idx}`}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center justify-center min-w-[140px] sm:min-w-[170px] lg:min-w-[200px] h-12 sm:h-14 lg:h-16 opacity-75 hover:opacity-100 transition-opacity duration-300 group cursor-pointer"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-full w-auto max-h-10 sm:max-h-12 max-w-[160px] object-contain invert drop-shadow-sm group-hover:drop-shadow-[0_0_12px_rgba(108,232,195,0.6)] transition-all duration-300 pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 2 Marquee (Flows Right / Reverse) */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle Left & Right Edge Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />

          <div
            className="flex w-max pause-hover items-center gap-8 sm:gap-12 lg:gap-16"
            style={{ animation: 'marquee 65s linear infinite reverse' }}
          >
            {row2Doubled.map((partner, idx) => (
              <motion.div
                key={`r2-${idx}`}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center justify-center min-w-[140px] sm:min-w-[170px] lg:min-w-[200px] h-12 sm:h-14 lg:h-16 opacity-75 hover:opacity-100 transition-opacity duration-300 group cursor-pointer"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-full w-auto max-h-10 sm:max-h-12 max-w-[160px] object-contain invert drop-shadow-sm group-hover:drop-shadow-[0_0_12px_rgba(108,232,195,0.6)] transition-all duration-300 pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
