'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import type { CareersOfficeItem } from '@/lib/services/careers-page-config.service';

interface CareerOfficesSectionProps {
  offices?: CareersOfficeItem[];
}

function SingaporeFlag() {
  return (
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-slate-200/90 shadow-xs shrink-0 flex items-center justify-center">
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <clipPath id="sg-flag-clip">
            <circle cx="24" cy="24" r="24" />
          </clipPath>
        </defs>
        <g clipPath="url(#sg-flag-clip)">
          <rect x="0" y="0" width="48" height="24" fill="#ED2939" />
          <rect x="0" y="24" width="48" height="24" fill="#FFFFFF" />
          <path
            d="M 17 6 A 6 6 0 1 0 17 18 A 5 5 0 1 1 17 6 Z"
            fill="#FFFFFF"
          />
          <g fill="#FFFFFF" transform="translate(19, 7) scale(0.65)">
            <polygon points="4,0 5.2,3.6 9,3.6 6,5.8 7.2,9.4 4,7.2 0.8,9.4 2,5.8 -1,3.6 2.8,3.6" />
            <polygon points="0,6 1.2,9.6 5,9.6 2,11.8 3.2,15.4 0,13.2 -3.2,15.4 -2,11.8 -5,9.6 -1.2,9.6" />
            <polygon points="8,6 9.2,9.6 13,9.6 10,11.8 11.2,15.4 8,13.2 4.8,15.4 6,11.8 3,9.6 6.8,9.6" />
            <polygon points="2,13 3.2,16.6 7,16.6 4,18.8 5.2,22.4 2,20.2 -1.2,22.4 0,18.8 -3,16.6 0.8,16.6" />
            <polygon points="6,13 7.2,16.6 11,16.6 8,18.8 9.2,22.4 6,20.2 2.8,22.4 4,18.8 1,16.6 4.8,16.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function HongKongFlag() {
  return (
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-slate-200/90 shadow-xs shrink-0 flex items-center justify-center bg-[#DE2910]">
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <clipPath id="hk-flag-clip">
            <circle cx="24" cy="24" r="24" />
          </clipPath>
        </defs>
        <g clipPath="url(#hk-flag-clip)">
          <circle cx="24" cy="24" r="24" fill="#DE2910" />
          <g fill="#FFFFFF" stroke="#DE2910" strokeWidth="0.4" transform="translate(24, 24) scale(0.65)">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <path
                  d="M 0,0 C -5,-10 -12,-16 -3,-23 C 4,-20 8,-12 0,0 Z"
                  fill="#FFFFFF"
                />
                <circle cx="-1" cy="-16" r="1.3" fill="#DE2910" />
              </g>
            ))}
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function VietnamFlag() {
  return (
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-slate-200/90 shadow-xs shrink-0 flex items-center justify-center bg-[#DA251D]">
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <clipPath id="vn-flag-clip">
            <circle cx="24" cy="24" r="24" />
          </clipPath>
        </defs>
        <g clipPath="url(#vn-flag-clip)">
          <circle cx="24" cy="24" r="24" fill="#DA251D" />
          <polygon
            points="24,10 28.2,21.5 40.5,21.5 30.6,28.8 34.4,40.5 24,33.2 13.6,40.5 17.4,28.8 7.5,21.5 19.8,21.5"
            fill="#FFFF00"
          />
        </g>
      </svg>
    </div>
  );
}

function GenericFlag() {
  return (
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
      <Globe className="w-6 h-6" />
    </div>
  );
}

const DEFAULT_OFFICES: CareersOfficeItem[] = [
  {
    id: 'vn-bmt',
    country: 'vietnam',
    city: 'Viet Nam - Buon Ma Thuat',
    company: 'E-GEAD Company Limited',
    addressLines: [
      'CS1: 217/9 Ngo Quyen, Buon Ma Thuat',
      'Dak Lak',
    ],
    phone: '077 613 9999',
    email: 'contact@egeadcompany.com',
  },
  {
    id: 'vn-hn',
    country: 'vietnam',
    city: 'Viet Nam - Ha Noi',
    company: 'E-GEAD Company Limited',
    addressLines: [
      'CS2: 157 Cau Dien, Phuc Dien',
      'Ha Noi',
    ],
    phone: '077 613 9999',
    email: 'contact@egeadcompany.com',
  },
];

export default function CareerOfficesSection({
  offices,
}: CareerOfficesSectionProps) {
  const displayOffices =
    offices && offices.length > 0 ? offices : DEFAULT_OFFICES;

  const renderFlag = (country: string) => {
    const c = country.toLowerCase().trim();
    if (c === 'singapore' || c === 'sg') return <SingaporeFlag />;
    if (c === 'hongkong' || c === 'hk') return <HongKongFlag />;
    if (c === 'vietnam' || c === 'vn') return <VietnamFlag />;
    return <GenericFlag />;
  };

  return (
    <section className="w-full pt-8 pb-20 sm:pb-28 bg-white" id="offices">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {displayOffices.map((office, idx) => (
            <motion.div
              key={office.id || office.city}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start gap-4"
            >
              {renderFlag(office.country)}
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {office.city}
                </h3>
                <div className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal space-y-0.5">
                  {office.addressLines.map((line, lIdx) => (
                    <p key={lIdx}>{line}</p>
                  ))}
                  {office.phone && (
                    <p className="pt-1 text-slate-700">
                      <span className="font-semibold text-slate-800">TEL:</span>{' '}
                      <a
                        href={`tel:${office.phone.replace(/\s+/g, '')}`}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        {office.phone}
                      </a>
                    </p>
                  )}
                  {office.email && (
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-800">EMAIL:</span>{' '}
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        {office.email}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
