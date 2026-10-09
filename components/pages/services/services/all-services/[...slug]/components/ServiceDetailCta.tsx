'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

const SaiArrow = ({ className = 'w-[19px] h-[18px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

export default function ServiceDetailCta() {
  return (
    <section className="contact-block relative w-full py-24 sm:py-36 bg-[#0A0D0E] text-white px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 text-center border-t border-white/10">
      <motion.div
        className="w-full flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="contact-block__title text-4xl sm:text-5xl lg:text-[68px] font-medium leading-[1.15] tracking-tight font-montserrat text-[#d3f9f5] mb-8 sm:mb-10">
          Let&apos;s <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-[#E0FCF4] bg-clip-text text-transparent font-bold">boost</span> your <br className="hidden sm:inline" />
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
  );
}
