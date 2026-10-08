"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceDetailItem } from "@/data/services-data";

type Props = {
  service: ServiceDetailItem;
};

const SaiArrow = ({
  className = "w-[19px] h-[18px]",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

export default function ServiceDetailHero({ service }: Props) {
  return (
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
                transition={{
                  duration: 0.65,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {service.title}
              </motion.h1>
            </div>
            <motion.p
              className="service-detail__desc no-box text-lg sm:text-xl text-[#f2f2f2] leading-relaxed font-light mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
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
  );
}
