'use client';

import { motion } from 'framer-motion';
import { OFFICES } from '../data/offices.data';

export default function ContactOfficesSection() {
  return (
    <motion.section
      id="offices"
      initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16"
    >
      <div className="mb-12">
        <span className="text-sm sm:text-base font-normal text-[#D4FAE6] block mb-2 font-montserrat">
          Global Operations
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat">
          Our Headquarters &amp; Operational Network
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {OFFICES.map((off, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-[#141718] border border-white/10 hover:border-[#5EFC8D]/50 transition-colors duration-300 shadow-xl hover:shadow-[0_16px_36px_rgba(94,252,141,0.1)]"
          >
            <span className="text-xs text-[#5EFC8D] block mb-1 font-normal font-montserrat">
              {off.type}
            </span>
            <h3 className="text-lg sm:text-xl font-medium text-[#D4FAE6] mb-2 font-montserrat">{off.country}</h3>
            <p className="text-xs text-[#b3b3b3] font-light mb-3 leading-relaxed font-montserrat">{off.address}</p>
            <a
              href={`mailto:${off.email}`}
              className="text-xs text-[#5EFC8D] hover:underline font-montserrat"
            >
              {off.email}
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
