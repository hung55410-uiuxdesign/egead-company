"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SmartCXSection() {
  return (
    <section
      id="homepage__customersuccess"
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white border-t border-white/10 overflow-hidden select-none"
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-8 xl:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-semibold font-montserrat leading-[1.2] tracking-tight"
            >
              <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                Why brands ship with Egead
              </span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Row 1 Left: 2 Squares */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="relative aspect-square overflow-hidden bg-[#181d1f] border border-white/10 hover:border-[#6CE8C3]/50 rounded-xl group transition-all duration-300 shadow-lg cursor-pointer"
            >
              <img
                src="/assets/success_apparel.jpg"
                alt="E-GEAD precision industrial DTF print-on-demand streetwear apparel"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{
                y: -6,
                scale: 1.015,
                borderColor: "rgba(108, 232, 195, 0.5)",
              }}
              className="flex flex-col justify-between p-6 sm:p-7 xl:p-8 bg-[#141718] border border-white/10 transition-all duration-300 aspect-square rounded-xl shadow-lg group cursor-pointer"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="border border-white/40 px-2 py-0.5 inline-flex items-center shrink-0 rounded-sm group-hover:border-[#6CE8C3]"
                >
                  <span className="text-[11px] sm:text-xs font-bold tracking-widest text-white group-hover:text-[#6CE8C3] font-mono transition-colors">
                    URBANVIBE
                  </span>
                </motion.div>
                <div className="w-[1px] h-10 bg-white/20 shrink-0" />
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#b3b3b3] leading-[1.45]">
                  URBANVIBE
                  <br />
                  ACHIEVED SUB-24H DISPATCH
                  <br />
                  ON TIKTOK SHOP US
                </p>
              </div>

              <div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-5xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-light text-white group-hover:text-[#6CE8C3] tracking-tighter leading-none font-montserrat transition-colors"
                >
                  &lt;24H
                </motion.div>
                <p className="text-[11px] sm:text-xs text-[#5EFC8D] font-mono uppercase tracking-wider mt-2.5 font-medium">
                  Average Production SLA
                </p>
              </div>
            </motion.div>
          </div>

          {/* Row 1 Right: Wide Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.015 }}
            className="relative w-full h-[280px] sm:h-[320px] lg:h-full min-h-[260px] overflow-hidden bg-[#181d1f] border border-white/10 hover:border-[#6CE8C3]/50 rounded-xl group transition-all duration-300 shadow-lg cursor-pointer"
          >
            <img
              src="/assets/success_warehouse.jpg"
              alt="E-GEAD high-speed automated robotics fulfillment facility"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Row 2 Left: Wide Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{
              y: -6,
              scale: 1.015,
              borderColor: "rgba(108, 232, 195, 0.5)",
            }}
            className="flex flex-col justify-between p-7 sm:p-9 lg:p-10 bg-[#141718] border border-white/10 transition-all duration-300 min-h-[300px] lg:min-h-full rounded-xl shadow-lg group cursor-pointer"
          >
            <p className="text-lg sm:text-xl lg:text-[22px] font-normal text-white font-montserrat leading-[1.55] tracking-tight">
              &ldquo;Egead eliminated our fulfillment delays entirely. With sub-24h industrial DTF printing and automated TikTok Shop US compliance, we scaled to 28,000 peak holiday orders with a 0.18% late dispatch rate and zero algorithmic penalties.&rdquo;
            </p>

            <div className="flex items-end justify-between mt-8 pt-6 border-t border-white/10">
              <div>
                <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white font-mono">
                  MARCUS VANCE
                </h4>
                <p className="text-[11px] sm:text-xs text-[#a3a3a3] font-mono uppercase tracking-wider mt-1">
                  HEAD OF GLOBAL SUPPLY CHAIN &amp; OPERATIONS
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.08 }} className="shrink-0">
                <span className="text-xs sm:text-sm font-bold tracking-widest text-white/90 group-hover:text-[#6CE8C3] font-mono uppercase border border-white/30 group-hover:border-[#6CE8C3] px-2.5 py-1 rounded bg-white/5 transition-colors">
                  URBANVIBE
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Row 2 Right: 2 Squares */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="relative aspect-square overflow-hidden bg-[#181d1f] border border-white/10 hover:border-[#6CE8C3]/50 rounded-xl group transition-all duration-300 shadow-lg cursor-pointer"
            >
              <img
                src="/assets/success_scanner.jpg"
                alt="Smart barcode scan warehouse management and error-free dispatch"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{
                y: -6,
                scale: 1.015,
                borderColor: "rgba(108, 232, 195, 0.5)",
              }}
              className="flex flex-col justify-between p-6 sm:p-7 xl:p-8 bg-[#141718] border border-white/10 transition-all duration-300 aspect-square rounded-xl shadow-lg group cursor-pointer"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="border border-white/40 px-2 py-0.5 inline-flex items-center shrink-0 rounded-sm group-hover:border-[#6CE8C3]"
                >
                  <span className="text-[11px] sm:text-xs font-bold tracking-widest text-white group-hover:text-[#6CE8C3] font-mono transition-colors">
                    HOMECRAFT
                  </span>
                </motion.div>
                <div className="w-[1px] h-10 bg-white/20 shrink-0" />
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#b3b3b3] leading-[1.45]">
                  HOMECRAFT
                  <br />
                  ELIMINATED OVERSELLING &amp;
                  <br />
                  CUT MANUAL OPS BY 85%
                </p>
              </div>

              <div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-5xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-light text-white group-hover:text-[#6CE8C3] tracking-tighter leading-none font-montserrat transition-colors"
                >
                  99.9%
                </motion.div>
                <p className="text-[11px] sm:text-xs text-[#5EFC8D] font-mono uppercase tracking-wider mt-2.5 font-medium">
                  WMS Barcode Scan Accuracy
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/our-work"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/20 hover:border-[#5EFC8D] hover:text-[#5EFC8D] hover:bg-white/5 text-[#D4FAE6] font-medium text-sm transition duration-300 shrink-0 font-montserrat shadow-lg"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#D4FAE6] group-hover:fill-[#5EFC8D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>Read Customer Stories</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
