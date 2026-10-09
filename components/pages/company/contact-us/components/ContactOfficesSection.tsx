'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OFFICES_DATA } from '../data/offices.data';

function OfficeClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setTime(formatted);
      } catch {
        setTime('--:--');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="inline-flex items-center justify-center min-w-[72px] px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs font-mono font-medium text-[#6CE8C3] shadow-inner">
      {time || '--:--'}
    </div>
  );
}

export default function ContactOfficesSection() {
  return (
    <section
      id="our-offices"
      className="relative w-full bg-[#0A0D0E] text-white py-20 sm:py-28 lg:py-32 overflow-hidden scroll-mt-24"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base font-normal text-[#D4FAE6] mb-3 font-montserrat"
          >
            Our Office
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-white font-montserrat leading-tight"
          >
            Headquarters &amp;{' '}
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              Operational Center
            </span>
          </motion.h2>
        </div>

        {/* Office Table/List with dividers and live digital clock */}
        <div className="w-full border-t border-white/10">
          {OFFICES_DATA.map((office, idx) => (
            <motion.div
              id={`office-${office.id}`}
              key={office.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="py-8 sm:py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-4 sm:gap-6">
                {/* Column 1: Country & City */}
                <div className="md:col-span-3">
                  <h3 className="text-xl sm:text-2xl font-normal text-white font-montserrat">
                    {office.country}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6CE8C3] font-montserrat mt-1">
                    {office.city}
                  </p>
                </div>

                {/* Column 2: Legal Entity Name & Address */}
                <div className="md:col-span-5">
                  <div className="text-xs font-semibold text-white/90 mb-1 font-montserrat">
                    {office.company}
                  </div>
                  <p className="text-xs sm:text-sm text-[#b3b3b3] font-light leading-relaxed font-montserrat">
                    {office.address}
                  </p>
                </div>

                {/* Column 3: Phone & Email */}
                <div className="md:col-span-2 space-y-1">
                  {office.phone && office.phone !== '-' ? (
                    <div className="text-xs sm:text-sm text-[#b3b3b3] font-montserrat">
                      <span className="text-white/40 mr-1.5 font-semibold">TEL:</span>
                      <a
                        href={`tel:${office.phone.replace(/\s+/g, '')}`}
                        className="hover:text-[#6CE8C3] transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                  ) : null}
                  {office.email ? (
                    <div className="text-xs sm:text-sm text-[#b3b3b3] font-montserrat">
                      <span className="text-white/40 mr-1.5 font-semibold">EMAIL:</span>
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:text-[#6CE8C3] transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  ) : null}
                </div>

                {/* Column 4: Local Time Clock Pill */}
                <div className="md:col-span-2 flex justify-start md:justify-end">
                  <OfficeClock timezone={office.timezone} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
