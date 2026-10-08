'use client';

import { motion } from 'framer-motion';

export default function LoyaltyHowItWorksSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#000000] text-white overflow-hidden border-t border-white/5">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
        {/* Header Block */}
        <motion.div
          className="w-full text-center max-w-4xl mx-auto mb-14 sm:mb-18"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm sm:text-base font-medium text-[#6CE8C3] mb-3 font-montserrat tracking-wider uppercase">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
            <span>Effortless integration </span>
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              for impactful results.
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-[19px] text-[#A1A1AA] font-light leading-[1.7] max-w-3xl mx-auto font-montserrat">
            From precise segmentation to seamless O2O experiences, SmartLoyalty drives customer retention with minimal effort.
          </p>
        </motion.div>

        {/* Diagram Card Container */}
        <motion.div
          className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-6 sm:p-10 lg:p-14 xl:p-16 shadow-2xl relative overflow-hidden flex items-center justify-center transition-all duration-300"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            src="/assets/loyalty/loyalty-how-it-works.mp4"
            className="w-full h-auto max-w-[1360px] xl:max-w-[1500px] object-contain rounded-[18px] sm:rounded-[24px] block drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </div>
    </section>
  );
}
