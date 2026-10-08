"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CultureSection() {
  return (
    <section
      id="homepage__culture"
      className="homepage__culture relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat"
            >
              Our Culture
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-semibold leading-[1.4] sm:leading-[1.42] lg:leading-[1.45] tracking-tight font-montserrat mb-10"
            >
              <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                Empowering global commerce through relentless operational innovation, technology automation, and transparent collaboration.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/company"
                  className="group inline-flex items-center gap-2.5 bg-[#5EFC8D] hover:bg-[#4ee37e] text-black font-medium text-sm sm:text-[15px] px-8 py-3.5 rounded-full transition shadow-[0_0_20px_rgba(94,252,141,0.35)] hover:shadow-[0_0_30px_rgba(94,252,141,0.55)] font-montserrat"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  >
                    <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                  </svg>
                  <span>About Us</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/careers"
                  className="group inline-flex items-center gap-2.5 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-[#5EFC8D] hover:text-[#5EFC8D] text-[#D4FAE6] font-medium text-sm sm:text-[15px] px-8 py-3.5 rounded-full transition-all duration-300 font-montserrat shadow-sm"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  >
                    <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                  </svg>
                  <span>Careers</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Culture Graphic */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              animate={{ y: [0, -8, 0] }}
              style={{ willChange: "transform" }}
              className="relative w-full max-w-lg rounded-[40px] overflow-hidden bg-gradient-to-br from-[#141718] to-[#0A0D0E] border border-white/10 group shadow-2xl hover:border-[#5EFC8D]/40 transition-colors"
            >
              <img
                src="/assets/Group_8839.png"
                alt="E-GEAD Company Culture"
                className="w-full h-auto object-contain mx-auto transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
