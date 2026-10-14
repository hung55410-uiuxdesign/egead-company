'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SaiArrow = ({ className = 'w-[19px] h-[18px]' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

import type { PartnerCtaData } from '../types';

export interface SapCtaSectionProps {
  partnerName?: string;
  data?: PartnerCtaData;
}

export default function SapCtaSection({ partnerName = 'SAP', data }: SapCtaSectionProps = {}) {
  const headingPart1 = data?.headingPart1 ?? 'Unleash your ';
  const headingHighlight = data?.headingHighlight ?? 'growth potential';
  const headingPart2 = data?.headingPart2 ?? ` with ${partnerName} now.`;
  const description =
    data?.description ??
    `Connect with our certified ${partnerName} solutions team to explore bespoke architectures, seamless migrations, and high-velocity commerce operations.`;
  const buttonText = data?.buttonText ?? "Let's talk";
  const buttonHref =
    data?.buttonHref ?? `/contact-us?subject=${encodeURIComponent(partnerName.toLowerCase())}-consultation`;

  return (
    <section className="contact-block relative w-full py-24 sm:py-32 lg:py-36 bg-[#0A0D0E] text-white overflow-hidden text-center border-t border-white/5">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#10E774]/5 rounded-full blur-[160px]"
      />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl lg:text-[64px] font-medium leading-[1.18] tracking-tight font-montserrat max-w-4xl"
        >
          <span>{headingPart1}</span>
          <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent font-semibold">
            {headingHighlight}
          </span>
          <br className="hidden sm:inline" />
          <span>{headingPart2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg text-[#b3b3b3] font-light max-w-2xl font-montserrat"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 sm:mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Link
              href={buttonHref}
              className="group relative inline-flex items-center gap-3 bg-[#10E774] hover:bg-[#5EFC8D] text-[#003D5B] font-semibold text-base sm:text-lg px-9 sm:px-12 py-4 sm:py-4.5 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(16,231,116,0.35)] hover:shadow-[0_0_50px_rgba(94,252,141,0.7)] font-montserrat"
            >
              <span>{buttonText}</span>
              <SaiArrow className="w-4 h-4 text-[#003D5B] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

