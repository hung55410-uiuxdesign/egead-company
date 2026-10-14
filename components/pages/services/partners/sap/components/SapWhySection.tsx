'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SAP_WHY_ITEMS } from '../data/sap-partner.data';

export default function SapWhySection() {
  return (
    <section
      id="why-sap"
      aria-label="Why SAP Enterprise Value"
      className="service-detail__expert w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 border-t border-white/5 relative overflow-hidden"
    >
      {/* Subtle ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#10E774]/5 rounded-full blur-[120px]"
      />

      <div className="max-w-[1560px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Sticky Title & Subtitle) */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="service-detail__expert-subtitle text-sm sm:text-base font-normal text-[#D4FAE6] mb-3 font-montserrat"
            >
              Why SAP
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="service-detail__expert-title text-3xl sm:text-4xl lg:text-[46px] font-medium text-white leading-tight font-montserrat"
            >
              Join +404,000 enterprise businesses who trust SAP.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-[#b3b3b3] font-light leading-relaxed font-montserrat"
            >
              Global leaders choose SAP to orchestrate end-to-end commerce, ERP infrastructure, and multi-market scale.
            </motion.p>
          </div>

          {/* Right Column (5 Value Pillars) */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            {SAP_WHY_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="service-detail__expert-item group rounded-2xl bg-[#141718]/70 border border-white/5 p-6 sm:p-8 hover:border-[#10E774]/30 hover:bg-[#141718] transition-all duration-300"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 rounded-xl bg-[#10E774]/10 border border-[#10E774]/20 flex items-center justify-center shrink-0 mt-1 text-[#10E774] group-hover:scale-110 transition-transform">
                    <Check className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="service-detail__expert-item-title text-xl sm:text-2xl font-semibold text-white font-montserrat group-hover:text-[#7ceee0] transition-colors">
                      {item.title}
                    </h3>
                    <div className="service-detail__expert-content">
                      <p className="text-base sm:text-lg text-[#b3b3b3] font-light leading-relaxed font-montserrat">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
