'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ContactHeroSection() {
  return (
    <section className="relative w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 overflow-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm sm:text-base font-normal text-[#D4FAE6] mb-4 font-montserrat tracking-wide"
        >
          Contact Us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl lg:text-[76px] font-medium leading-[1.08] font-montserrat uppercase tracking-tight text-white max-w-5xl"
        >
          Thinking of Leading{' '}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
            Tomorrow?
          </span>
        </motion.h1>
      </div>
    </section>
  );
}
