'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { OFFICES_DATA, OfficeItem } from '../data/offices.data';
import type { CareersOfficeItem } from '@/lib/services/careers-page-config.service';

function formatOfficeTime(timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '12:00';
  }
}

function mapCountryName(countryCode: string): string {
  const code = (countryCode || '').toLowerCase().trim();
  if (code === 'vietnam' || code === 'vn') return 'Vietnam';
  if (code === 'singapore' || code === 'sg') return 'Singapore';
  if (code === 'hongkong' || code === 'hk') return 'Hong Kong';
  return countryCode || 'Vietnam';
}

function formatCitySubtitle(city: string): string {
  if (!city) return '';
  return city.replace(/^Viet\s*Nam\s*-\s*/i, '').replace(/^Vietnam\s*-\s*/i, '').trim() || city;
}

function mapCareersOfficesToContactOffices(
  offices?: CareersOfficeItem[]
): OfficeItem[] {
  if (!offices || offices.length === 0) {
    return OFFICES_DATA;
  }

  return offices.map((o, idx) => ({
    id: o.id || `office-${idx + 1}`,
    country: mapCountryName(o.country),
    city: formatCitySubtitle(o.city),
    company: o.company || 'E-GEAD Company Limited',
    address: Array.isArray(o.addressLines)
      ? o.addressLines.filter(Boolean).join(', ')
      : '',
    phone: o.phone || '077 613 9999',
    email: o.email || 'contact@egeadcompany.com',
    timezone: o.timezone || 'Asia/Ho_Chi_Minh',
  }));
}

interface ContactOfficesSectionProps {
  offices?: CareersOfficeItem[];
}

export default function ContactOfficesSection({
  offices,
}: ContactOfficesSectionProps) {
  const displayOffices = mapCareersOfficesToContactOffices(offices);
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const next: Record<string, string> = {};
      displayOffices.forEach((office) => {
        next[office.id] = formatOfficeTime(office.timezone);
      });
      setTimes(next);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, [offices]);

  return (
    <section className="relative w-full bg-[#090B0E] text-white py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Subtle top radial light */}
      <div
        className="pointer-events-none absolute -top-40 left-0 w-[600px] h-[350px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="block text-emerald-400 text-xs sm:text-sm font-medium mb-3 font-montserrat">
            Our Offices
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight font-montserrat">
            Headquarters &amp;{' '}
            <span className="text-emerald-400">Operational Center</span>
          </h2>
        </motion.div>

        {/* Offices List */}
        <div className="border-t border-white/10">
          {displayOffices.map((office: OfficeItem, index: number) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group border-b border-white/10 py-8 sm:py-10 px-2 sm:px-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center">
                {/* Col 1: Country + City */}
                <div className="md:col-span-3">
                  <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-emerald-300 transition-colors font-montserrat">
                    {office.country}
                  </h3>
                  {office.city && (
                    <span className="block text-xs text-emerald-400/80 mt-1 font-montserrat">
                      {office.city}
                    </span>
                  )}
                </div>

                {/* Col 2: Company + Address */}
                <div className="md:col-span-5 space-y-1.5">
                  <p className="text-xs sm:text-sm font-semibold text-white/90 font-montserrat">
                    {office.company}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light font-montserrat">
                    {office.address}
                  </p>
                </div>

                {/* Col 3: Tel + Email */}
                <div className="md:col-span-3 space-y-1 text-xs sm:text-sm text-slate-300 font-light font-montserrat">
                  {office.phone && (
                    <p>
                      <span className="text-slate-500 font-medium">TEL:</span>{' '}
                      <a
                        href={`tel:${office.phone.replace(/\s+/g, '')}`}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {office.phone}
                      </a>
                    </p>
                  )}
                  {office.email && (
                    <p>
                      <span className="text-slate-500 font-medium">EMAIL:</span>{' '}
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {office.email}
                      </a>
                    </p>
                  )}
                </div>

                {/* Col 4: Live Time Badge */}
                <div className="md:col-span-1 flex md:justify-end">
                  <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-black border border-white/15 text-[11px] font-mono text-emerald-400 shadow-inner">
                    {times[office.id] || '12:00'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
