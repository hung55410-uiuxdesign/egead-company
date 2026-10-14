'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SAP_EXPERTISE } from '../data/sap-partner.data';
import type { SapExpertiseItem } from '../types';

function ExpertiseRow({ item, index }: { item: SapExpertiseItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const isEven = index % 2 === 1;

  return (
    <div className="text-image-twocolumn__item py-14 sm:py-20 border-b border-white/5 last:border-b-0">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}>
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:col-start-7' : ''}`}
        >
          {(item as any).tag && (
            <span className="inline-block px-3 py-1 rounded-full bg-[#10E774]/10 text-[#10E774] border border-[#10E774]/20 text-xs font-semibold">
              {(item as any).tag}
            </span>
          )}

          <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-semibold text-white leading-[1.2] font-montserrat">
            {item.title}
          </h3>

          <div className="space-y-4 text-base sm:text-lg text-[#b3b3b3] font-light leading-relaxed font-montserrat">
            {(
              (Array.isArray(item.paragraphs) && item.paragraphs.length > 0
                ? item.paragraphs
                : (item as any).description
                ? [(item as any).description]
                : [])
            ).map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* Image Column - No cropping (ảnh không bị cắt) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`lg:col-span-6 ${isEven ? 'lg:col-start-1' : ''}`}
        >
          <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#141718]/50 p-2 sm:p-5 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center group">
            <img
              src={(imgError ? item.imageFallback : item.image) || item.imageFallback || '/images/services/enterprise_tech.jpg'}
              alt={item.alt || item.title || 'Expertise'}
              className="w-full h-auto object-contain group-hover:scale-102 transition-transform duration-500 block"
              onError={() => setImgError(true)}
            />
          </div>
        </motion.div>
      </div>
    </div>

  );
}

export interface SapExpertiseSectionProps {
  partnerName?: string;
  subtitle?: string;
  headline?: string;
  items?: SapExpertiseItem[];
}

export default function SapExpertiseSection({
  partnerName = 'SAP',
  subtitle = 'Our expertise',
  headline = 'We are fluent in',
  items = SAP_EXPERTISE,
}: SapExpertiseSectionProps = {}) {
  const displayItems = items && items.length > 0 ? items : SAP_EXPERTISE;

  return (
    <section
      id="expertise"
      aria-label={`${partnerName} Expertise`}
      className="text-image-twocolumn partner-expert w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 border-t border-white/5 relative"
    >
      <div className="w-full">
        {/* Section Header */}

        <div className="mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base font-normal text-[#D4FAE6] mb-3 font-montserrat"
          >
            {subtitle}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[52px] font-medium text-white leading-tight font-montserrat"
          >
            {headline}
          </motion.h2>
        </div>

        {/* Alternating Feature Rows */}
        <div className="space-y-6">
          {displayItems.map((item, idx) => (
            <ExpertiseRow
              key={item.id || item.title || `exp-${idx}`}
              item={item}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

