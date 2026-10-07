'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  const scrollToServices = () => {
    const el = document.getElementById('block__items__with__button') || document.getElementById('homepage__service');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="big__banner" className="big__banner relative h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 lg:px-14 xl:px-16 bg-black text-white select-none">
      {/* Background Video - Pure raw video without dark overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center banner__video"
        >
          <source src="/assets/bg_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Hero Typography: Staggered entrance */}
      <div className="relative z-10 w-full mb-12 sm:mb-20 h-full flex flex-col justify-center pt-14 sm:pt-20 lg:pt-24">
        <h1 className="font-montserrat font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[78px] leading-[1.08] tracking-tight max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-[#E0FCF4] bg-clip-text text-transparent block"
          >
            Automate Operations.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-r from-[#8EF5D8] via-[#CBFBF0] to-white bg-clip-text text-transparent block"
          >
            Scale Global Sales.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg lg:text-[17px] text-white/90 font-medium max-w-2xl sm:max-w-3xl leading-[1.7] font-montserrat drop-shadow-sm"
        >
          Unify order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time — cutting costs while accelerating revenue growth.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 sm:mt-8 flex items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-2.5 bg-[#10E774] hover:bg-[#0ecb66] text-[#003D5B] font-semibold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-[0_0_24px_rgba(16,231,116,0.35)] hover:shadow-[0_0_36px_rgba(16,231,116,0.6)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#003D5B] transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                />
              </svg>
              <span>Explore E-GEAD</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Center: Scroll Button */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          type="button"
          onClick={scrollToServices}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to services"
          className="group w-10 h-10 rounded-full border-[1.5px] border-white/80 bg-black/60 hover:bg-black/85 hover:border-white text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:translate-y-0.5"
          >
            <path
              d="M2.5 5L7 9.5L11.5 5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}
