'use client';

import { motion } from 'framer-motion';

export default function SmartPriceSapStoreSection() {
  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[420px] flex items-center overflow-hidden border-t border-white/5">
      <video
        src="/assets/smartprice/SmartPrice_BG02.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 py-16 sm:py-20">
        <motion.div
          className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C]/90 border border-white/[0.12] backdrop-blur-md p-8 sm:p-12 lg:p-14 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xl sm:text-2xl lg:text-[28px] font-medium text-white font-montserrat text-center sm:text-left">
            Catalyzer SmartPrice is available on:
          </p>
          <a
            href="https://store.sap.com/dcp/en/product/display-2001016288_live_v1/catalyzer-smartprice"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            <img
              src="/assets/smartprice/Available-on-SAP-Store.png"
              alt="Available on SAP Store"
              className="w-[210px] sm:w-[240px] h-auto object-contain"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
