'use client';

import { motion } from 'framer-motion';

export default function LoyaltyAdvanceSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#000000] text-white overflow-hidden border-t border-white/5">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
        {/* Header Block */}
        <motion.div
          className="w-full text-center max-w-4xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm sm:text-base font-medium text-[#6CE8C3] mb-3 font-montserrat tracking-wider uppercase">
            Next-gen technology
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
            <span>Step into the future of </span>
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              customer retention.
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-[19px] text-[#A1A1AA] font-light leading-[1.7] max-w-3xl mx-auto font-montserrat">
            Cultivate deeper customer relationships, drive retention, and propel your enterprise forward.
          </p>
        </motion.div>

        {/* 2 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Bento Card 1: MACH Architecture */}
          <motion.div
            className="rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden group hover:border-[#10E774]/40 transition-all duration-300 flex flex-col justify-between"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/loyalty/loyalty-1.svg"
                  alt="MACH Architecture"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-montserrat mb-4 group-hover:text-[#6CE8C3] transition-colors">
                MACH Architecture
              </h3>
              <p className="text-base sm:text-[17px] text-[#A1A1AA] font-light leading-[1.7] font-montserrat">
                SmartLoyalty’s MACH-based architecture elevates shopping experiences, seamlessly supporting both online and offline models while incentivizing in-store actions.
              </p>
            </div>
          </motion.div>

          {/* Bento Card 2: Blockchain Integration and Smart Contract */}
          <motion.div
            className="rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden group hover:border-[#10E774]/40 transition-all duration-300 flex flex-col justify-between"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/loyalty/loyalty-2.svg"
                  alt="Blockchain Integration and Smart Contract Application"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-montserrat mb-4 group-hover:text-[#6CE8C3] transition-colors">
                Blockchain Integration and Smart Contract Application
              </h3>
              <p className="text-base sm:text-[17px] text-[#A1A1AA] font-light leading-[1.7] font-montserrat">
                Use blockchain technology and smart contracts to provide a secure, transparent, and reliable reward points system that your customers can trust.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
