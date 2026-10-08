'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ALL_INDUSTRIES, type ServiceDetailItem } from '@/data/services-data';

interface ServiceDetailClientViewProps {
  service: ServiceDetailItem;
}

const MotionLink = motion.create(Link);

// Reusable motion animation variants for smooth scroll reveals
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// SAI signature diagonal arrow icon
const SaiArrow = ({ className = 'w-[19px] h-[18px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

// Checkmark icon matching SAI approach principle bullets
const CheckIcon = ({ className = 'w-[18px] h-[18px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.29173 8.13771L0.5 9.95356L6.46529 16L17.5 4.81586L15.7083 3L6.46529 12.3675L2.29173 8.13771Z"
      fill="#003D5B"
    />
  </svg>
);

export default function ServiceDetailClientView({ service }: ServiceDetailClientViewProps) {
  return (
    <div className="service-detail industries w-full bg-[#0A0D0E] text-white select-none">
      {/* =====================================================================
          1. Hero Section (100% SAI Digital match, fluid full width - NO max-w)
          ===================================================================== */}
      <section
        id="hero"
        className="service-detail__header-white relative w-full pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <motion.div
          className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#10E774]/5 rounded-full blur-[140px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Back link */}
        <motion.div
          className="mb-8 sm:mb-10 relative z-10"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/services/all-services"
            className="back-btn group inline-flex items-center gap-2.5 text-base text-[#b3b3b3] hover:text-white transition-colors"
          >
            <svg
              className="w-[18px] h-[18px] rotate-180 transition-transform group-hover:-translate-x-1 text-[#b3b3b3] group-hover:text-white"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="subdirectory_arrow_right">
                <path
                  d="M3.375 10.875L7.875 15.375L8.94 14.31L6.2475 11.625H14.625V2.625H13.125V10.125H6.2475L8.94 7.44L7.875 6.375L3.375 10.875Z"
                  fill="currentColor"
                />
              </g>
            </svg>
            <span>Back to All Services</span>
          </Link>
        </motion.div>

        {/* 2-Column Hero: Typography & Anchors Left, Rounded Visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-stretch relative z-10">
          {/* Left Column */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="service-detail__title mb-8 sm:mb-10">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-semibold uppercase tracking-tight text-[#d3f9f5] leading-[1.08] font-montserrat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {service.title}
                </motion.h1>
              </div>
              <motion.p
                className="service-detail__desc no-box text-lg sm:text-xl text-[#f2f2f2] leading-relaxed font-light mb-12 sm:mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {service.subtitle}
              </motion.p>
            </div>

            {/* Anchor navigation links at bottom of hero */}
            <motion.div
              className="anchor-block flex flex-wrap items-center gap-8 sm:gap-12 pt-6 border-t border-white/10 mt-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="#intro"
                className="group inline-flex items-center gap-2.5 text-base font-normal text-[#b3b3b3] hover:text-white transition-colors"
              >
                <SaiArrow className="w-[18px] h-[18px] text-[#b3b3b3] group-hover:text-[#10E774] transition-colors" />
                <span>Intro</span>
              </a>
              <a
                href="#approach"
                className="group inline-flex items-center gap-2.5 text-base font-normal text-[#b3b3b3] hover:text-white transition-colors"
              >
                <SaiArrow className="w-[18px] h-[18px] text-[#b3b3b3] group-hover:text-[#10E774] transition-colors" />
                <span>Approach</span>
              </a>
              <a
                href="#cases"
                className="group inline-flex items-center gap-2.5 text-base font-normal text-[#b3b3b3] hover:text-white transition-colors"
              >
                <SaiArrow className="w-[18px] h-[18px] text-[#b3b3b3] group-hover:text-[#10E774] transition-colors" />
                <span>Cases</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Card (Fluid, No max-w) */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="service-detail__header-img relative rounded-[20px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[480px] group">
              <img
                src={service.heroImage}
                alt={`${service.title} Digital Transformation`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          2. Overview Section (#intro) - Clean light container matching SAI Digital
          ===================================================================== */}
      <motion.section
        id="intro"
        className="service-detail__content w-full bg-white text-gray-900 py-16 sm:py-24 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.05 },
          },
        }}
      >
        <div className="service-detail__intro-content type-2 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">
          {/* Left Column: Leading Bold Heading in #003D5B */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#003D5B] leading-[1.3] font-montserrat">
              {service.overviewHeading}
            </h2>
          </motion.div>

          {/* Right Column: Narrative Paragraphs */}
          <motion.div
            className="space-y-6 text-base sm:text-lg text-[#1c1e24] leading-relaxed font-normal"
            variants={fadeInUp}
          >
            {service.overviewParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* =====================================================================
          3. Middle Full-Width Visual Banner Image (Fluid, No max-w)
          ===================================================================== */}
      <motion.section
        className="w-full bg-white pb-16 sm:pb-24 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20"
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="service-detail__img w-full rounded-[20px] overflow-hidden shadow-2xl border border-gray-100 max-h-[640px]">
          <img
            src={service.middleImage}
            alt={`${service.title} Operational Infrastructure`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </motion.section>

      {/* =====================================================================
          4. Our Approach Section (#approach)
          ===================================================================== */}
      <motion.section
        id="approach"
        className="service-detail__expert w-full bg-white pb-20 sm:pb-32 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 border-b border-gray-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.05 },
          },
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">
          {/* Left Column: Heading in #003D5B */}
          <motion.div variants={fadeInUp}>
            <h2 className="service-detail__expert-title text-3xl sm:text-4xl lg:text-[38px] font-semibold text-[#003D5B] font-montserrat">
              {service.approachHeading}
            </h2>
          </motion.div>

          {/* Right Column: Lead Text & Principles List */}
          <div>
            <motion.div className="service-detail__expert-content mb-10" variants={fadeInUp}>
              <p className="text-base sm:text-lg text-[#1c1e24] leading-relaxed font-normal">
                {service.approachIntro}
              </p>
            </motion.div>

            <div className="space-y-10 sm:space-y-12">
              {service.principles.map((p, idx) => (
                <motion.div
                  key={idx}
                  className="service-detail__expert-item group"
                  variants={fadeInUp}
                >
                  <div className="service-detail__expert-item-title flex items-center gap-3.5 text-xl sm:text-2xl font-semibold text-[#003D5B] mb-3">
                    <CheckIcon className="w-5 h-5 shrink-0" />
                    <h3 className="font-montserrat">{p.title}</h3>
                  </div>
                  <div className="service-detail__expert-content">
                    <p className="text-base sm:text-lg text-[#1c1e24]/85 leading-relaxed pl-8 font-normal">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* =====================================================================
          5. Other Industries / Related Services Stack (#cases) - Fluid, No max-w
          ===================================================================== */}
      <section
        id="cases"
        className="service-detail__other w-full bg-[#0A0D0E] py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 text-white"
      >
        <motion.p
          className="service-detail__other-title text-2xl sm:text-3xl lg:text-[32px] font-normal text-white mb-10 font-montserrat"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Other industries
        </motion.p>

        <div className="service-block__list space-y-5 sm:space-y-6">
          {ALL_INDUSTRIES.filter((ind) => ind.slug !== service.slug).map((ind, idx) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: '0px 0px -30px 0px' }}
              transition={{
                duration: 0.6,
                delay: Math.min(idx * 0.08, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/services/all-services/${ind.slug}`}
                className="service-card normal-service group relative block w-full rounded-[20px] bg-[#12131C] border border-white/10 hover:border-[#10E774]/50 p-6 sm:p-9 lg:p-11 transition-all duration-300 shadow-xl overflow-hidden hover:bg-[#161722]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
                  {/* Left: Industry Title in #7CEEE0 */}
                  <div className="lg:col-span-5 flex items-center justify-between">
                    <p className="service-card__title text-2xl sm:text-3xl font-semibold text-[#7CEEE0] group-hover:text-[#10E774] transition-colors font-montserrat">
                      {ind.name}
                    </p>
                  </div>

                  {/* Right: Value proposition and Discover More CTA button (reveals on hover like SAI Digital) */}
                  <div className="service-card__content lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <p className="service-card__desc text-base sm:text-lg text-[#b3b3b3] leading-relaxed font-light flex-1">
                      {ind.desc}
                    </p>
                    <div className="hidden sm:inline-flex items-center gap-2 bg-[#25E2CC] hover:bg-[#10E774] text-[#003D5B] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 shrink-0">
                      <SaiArrow className="w-4 h-4 text-[#003D5B]" />
                      <span>Discover More</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. Contact CTA Block (100% SAI Digital match, Fluid - No max-w)
          ===================================================================== */}
      <section className="contact-block relative w-full py-24 sm:py-36 bg-[#0A0D0E] text-white px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 text-center border-t border-white/10">
        <motion.div
          className="w-full flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="contact-block__title text-4xl sm:text-5xl lg:text-[68px] font-medium leading-[1.15] tracking-tight font-montserrat text-[#d3f9f5] mb-8 sm:mb-10">
            Let&apos;s <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-[#10E774] bg-clip-text text-transparent font-bold">boost</span> your <br className="hidden sm:inline" />
            commerce outcomes.
          </h2>

          <div className="mt-2">
            <MotionLink
              href="/contact-us"
              className="inline-flex items-center gap-2.5 bg-[#25E2CC] hover:bg-[#10E774] text-[#003D5B] font-bold text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(37,226,204,0.35)] hover:shadow-[0_0_40px_rgba(16,231,116,0.65)] hover:-translate-y-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>Let&apos;s talk</span>
              <SaiArrow className="w-4 h-4 text-[#003D5B]" />
            </MotionLink>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
