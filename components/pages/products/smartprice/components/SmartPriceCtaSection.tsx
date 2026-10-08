'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

export default function SmartPriceCtaSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#000000] text-white border-t border-white/10 overflow-hidden text-center">
      <motion.div
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-bold font-montserrat leading-[1.2] mb-10">
          <span className="text-white font-extrabold">Boost profits</span> now <br className="hidden sm:inline" />
          with SmartPrice.
        </h2>
        <MotionLink
          href="/contact-us"
          className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-[#10E774] hover:bg-[#0ecb66] text-[#003D5B] font-bold text-base font-montserrat transition-all duration-300 shadow-[0_0_30px_rgba(16,231,116,0.4)] hover:shadow-[0_0_40px_rgba(16,231,116,0.7)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Let&apos;s talk
        </MotionLink>
      </motion.div>
    </section>
  );
}
