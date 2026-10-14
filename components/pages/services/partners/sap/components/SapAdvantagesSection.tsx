'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Users, Clock } from 'lucide-react';
import { SAP_ADVANTAGES } from '../data/sap-partner.data';
import type { SapAdvantageItem } from '../types';

const ICON_SVGS: Record<string, string> = {
  years:
    'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/8317818f-e26c-434a-b7ff-37943f6147f1:f6de9061226b903d177e9781dba8c884d20f34c7/Name=Years,%20Color=Colorful.svg',
  delivery:
    'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/7ca84266-bdba-4f9b-9ab7-ac3db9ac4a4b:3db5f8be5335de1caaa334c304fda5f26bbfb1a2/Name=Project%20delivery,%20Color=Colorful.svg',
  engineers:
    'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/ac1889bd-f803-4b1f-9d57-39097d7c51c3:098f1d97c97b22c0eab814dbea058f782f39bdab/Name=Experts,%20Color=Colorful.svg',
  support:
    'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/6afe6cf0-5f1f-4503-8c83-b77f2060e5d5:f8641fec2614f9b59e6a037b6dc6b1edbbf6479d/7%20support,%20Color=Colorful.svg',
};

function AdvantageCard({ item, index }: { item: SapAdvantageItem; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);

  const renderFallbackIcon = () => {
    switch (item?.iconName) {
      case 'years':
        return <Calendar className="w-10 h-10 text-[#10E774]" />;
      case 'delivery':
        return <CheckCircle2 className="w-10 h-10 text-[#7ceee0]" />;
      case 'engineers':
        return <Users className="w-10 h-10 text-[#5EFC8D]" />;
      case 'support':
        return <Clock className="w-10 h-10 text-[#6CE8C3]" />;
      default:
        return <CheckCircle2 className="w-10 h-10 text-[#10E774]" />;
    }
  };

  const svgSrc = item?.iconName ? ICON_SVGS[item.iconName] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="items-card rounded-[28px] bg-[#141718] border border-white/10 p-8 sm:p-10 flex flex-col items-center text-center hover:border-[#10E774]/40 hover:shadow-[0_20px_45px_rgba(16,231,116,0.12)] transition-all duration-300 group"
    >
      {/* Icon Area */}
      <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-[#10E774]/10 group-hover:border-[#10E774]/30 transition-all duration-300">
        {!imgFailed && svgSrc ? (
          <img
            src={svgSrc}
            alt={item.metric || (item as any).title || 'Advantage'}
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
            onError={() => setImgFailed(true)}
          />
        ) : (
          renderFallbackIcon()
        )}
      </div>

      {(item as any).tag && (
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#10E774]/10 text-[#10E774] border border-[#10E774]/20 text-[11px] font-semibold mb-2">
          {(item as any).tag}
        </span>
      )}

      {/* Metric Title */}
      <h3 className="text-xl sm:text-2xl font-semibold text-white font-montserrat mb-3 group-hover:text-[#7ceee0] transition-colors duration-300 leading-snug">
        {item.metric || (item as any).title || (item as any).headline || 'Lợi thế'}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-[#b3b3b3] font-light leading-relaxed font-montserrat">
        {item.description || (item as any).content || ''}
      </p>
    </motion.div>
  );

}

export interface SapAdvantagesSectionProps {
  partnerName?: string;
  subtitle?: string;
  headline?: string;
  items?: SapAdvantageItem[];
}

export default function SapAdvantagesSection({
  partnerName = 'SAP',
  subtitle = 'E-GEAD advantages',
  headline = 'Qualified SAP Gold Partner Specializing in CX Enterprise eCommerce Technologies.',
  items = SAP_ADVANTAGES,
}: SapAdvantagesSectionProps = {}) {
  const displayItems = items && items.length > 0 ? items : SAP_ADVANTAGES;

  return (
    <section
      id="advantages"
      aria-label={`${partnerName} Partner Advantages`}
      className="block-items partner-advance w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 border-t border-white/5 relative overflow-hidden"
    >
      <div className="w-full">
        {/* Header */}

        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
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
            className="text-2xl sm:text-4xl lg:text-[44px] font-medium text-white leading-tight font-montserrat"
          >
            {headline}
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayItems.map((item, idx) => (
            <AdvantageCard
              key={item.id || item.metric || (item as any).title || `adv-${idx}`}
              item={item}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

