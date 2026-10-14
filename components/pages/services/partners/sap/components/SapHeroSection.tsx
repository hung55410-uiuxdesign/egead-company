'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import type { PartnerHeroData } from '../types';

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

export default function SapHeroSection({ data }: { data?: PartnerHeroData } = {}) {
  const [imageError, setImageError] = useState(false);

  const name = data?.name ?? 'SAP';
  const badge = data?.badge ?? 'Qualified SAP Gold Partner';
  const bannerImage =
    data?.bannerImage ??
    'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/86de0e07-7dd4-4ddd-afdc-723c96eba1dd:335aa49d18ee1cefc92c820c337d1f354a080065/SAP_banner_sept24.png';
  const bannerFallback = data?.bannerFallback ?? '/images/services/enterprise_tech.jpg';
  const bannerAlt = data?.bannerAlt ?? `${name} Enterprise Solutions`;
  const headline = data?.headline ?? 'Unlock enterprise operational excellence.';
  const description =
    data?.description ??
    'Give your enterprise business an unparalleled advantage with our tailored SAP solutions. We can help you streamline processes, enhance efficiency, and drive profitability.';
  const ctaText = data?.ctaText ?? 'Schedule demo';
  const ctaHref = data?.ctaHref ?? '/contact-us?subject=sap-demo';

  return (
    <section
      id="hero"
      aria-label={`${name} Partner Hero`}
      className="service-detail partner relative w-full pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-10 lg:px-14 xl:px-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-[#10E774]/5 rounded-full blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#008FD3]/5 rounded-full blur-[140px]"
      />

      <div className="relative z-10 w-full">
        {/* Back Link */}
        <motion.div

          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10"
        >
          <Link
            href="/partners"
            className="back-btn group inline-flex items-center gap-2.5 text-sm sm:text-base text-[#b3b3b3] hover:text-white transition-colors"
          >
            <svg
              className="w-[18px] h-[18px] rotate-180 transition-transform group-hover:-translate-x-1 text-[#b3b3b3] group-hover:text-white"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g id="subdirectory_arrow_right">
                <path
                  d="M3.375 10.875L7.875 15.375L8.94 14.31L6.2475 11.625H14.625V2.625H13.125V10.125H6.2475L8.94 7.44L7.875 6.375L3.375 10.875Z"
                  fill="currentColor"
                />
              </g>
            </svg>
            <span>Back to Our Partners</span>
          </Link>
        </motion.div>

        {/* Title */}
        <div className="service-detail__title mb-8 sm:mb-12">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008FD3]/15 border border-[#008FD3]/30 text-xs sm:text-sm text-[#7ceee0] font-normal mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10E774]" />
              <span>{badge}</span>
            </motion.div>
          )}

          <motion.h1
            className="text-4xl sm:text-6xl lg:text-[76px] font-semibold tracking-tight text-white leading-[1.05] font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {name}
          </motion.h1>
        </div>

        {/* Hero Visual Card / Banner - No cropping */}
        <motion.div
          className="w-full mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#141718] shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
            {!imageError ? (
              <img
                src={bannerImage}
                alt={bannerAlt}
                className="w-full h-auto object-contain block"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="relative w-full min-h-[380px] sm:min-h-[460px] bg-gradient-to-r from-[#001726] via-[#0A2540] to-[#0A0D0E] flex flex-col justify-center items-center p-8 sm:p-14 text-center">
                <img
                  src={bannerFallback}
                  alt={bannerAlt}
                  className="max-h-24 w-auto mb-6 object-contain"
                />
                <h3 className="text-2xl sm:text-4xl font-semibold text-white font-montserrat max-w-2xl">
                  {headline}
                </h3>
              </div>
            )}
          </div>
        </motion.div>

        {/* Intro Section */}
        <div className="service-detail__intro grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <motion.div
            className="lg:col-span-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-white leading-[1.2] font-montserrat">
              {headline}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] font-light leading-relaxed font-montserrat max-w-3xl">
              {description}
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-4 flex lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#10E774] hover:bg-[#5EFC8D] text-[#003D5B] font-semibold text-base transition-all duration-300 shadow-[0_0_25px_rgba(16,231,116,0.3)] hover:shadow-[0_0_40px_rgba(94,252,141,0.6)] font-montserrat"
            >
              <span>{ctaText}</span>
              <SaiArrow className="w-4 h-4 text-[#003D5B] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

