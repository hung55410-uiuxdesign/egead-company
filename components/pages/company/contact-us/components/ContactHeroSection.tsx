'use client';

import { motion } from 'framer-motion';

export default function ContactHeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-24"
    >
      <div className="w-full">
        <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
          Get in Touch
        </p>
        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium leading-[1.08] text-[#D4FAE6] font-montserrat mb-6">
          Automate Operations, <br />
          <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-[#E0FCF4] bg-clip-text text-transparent font-medium">
            Scale Globally.
          </span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-3xl">
          Let&apos;s discuss how E-GEAD can automate your multi-channel storefronts, guarantee sub-24h US POD fulfillment, and scale your brand across international marketplaces.
        </p>
      </div>
    </motion.section>
  );
}
