import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  highlight?: boolean;
  icon?: React.ReactNode;
  stats?: {
    value: string;
    label: string;
  };
  visual?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
}

export interface BentoGridProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  description?: string;
  items: BentoItem[];
  className?: string;
}

export default function BentoGrid({
  id,
  badge,
  title,
  description,
  items,
  className = '',
}: BentoGridProps) {
  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#25E2CC]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          {badge && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-white/10 text-[#d3f9f5] text-xs sm:text-sm font-normal tracking-wider uppercase mb-4 font-montserrat">
              <span className="w-2 h-2 rounded-full bg-[#7ceee0] animate-pulse" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#d3f9f5] font-montserrat leading-[1.2]">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base sm:text-lg text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]">
          {items.map((item) => {
            const isSpan2 = item.colSpan === 2;
            const isSpan3 = item.colSpan === 3;
            const spanClass = isSpan3
              ? 'md:col-span-2 lg:col-span-3'
              : isSpan2
              ? 'md:col-span-2 lg:col-span-2'
              : 'col-span-1';

            const rowClass = item.rowSpan === 2 ? 'lg:row-span-2' : '';

            return (
              <div
                key={item.id}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-[28px] bg-[#141718]/90 border transition-all duration-300 backdrop-blur-sm overflow-hidden ${
                  item.highlight
                    ? 'border-[#7ceee0]/40 shadow-[0_0_30px_rgba(124,238,224,0.12)]'
                    : 'border-white/10 hover:border-[#7ceee0]/50 hover:shadow-[0_0_25px_rgba(124,238,224,0.08)]'
                } ${spanClass} ${rowClass}`}
              >
                {/* Subtle hover gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7ceee0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top Row: Icon/Tag */}
                <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                  {item.icon && (
                    <div className="w-12 h-12 rounded-2xl bg-[#1D2224] border border-white/10 flex items-center justify-center text-[#7ceee0] group-hover:scale-105 group-hover:border-[#7ceee0]/40 transition-all duration-200">
                      {item.icon}
                    </div>
                  )}
                  {item.tag && (
                    <span className="text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-[#1A2022] text-[#7ceee0] border border-[#7ceee0]/20 font-montserrat">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Visual / Mockup content if provided */}
                {item.visual && (
                  <div className="relative z-10 my-4 w-full rounded-xl overflow-hidden bg-[#0A0D0E]/60 border border-white/10 p-4">
                    {item.visual}
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 mt-auto">
                  {item.stats && (
                    <div className="mb-4 pb-4 border-b border-white/10">
                      <div className="text-3xl sm:text-4xl font-medium text-[#7ceee0] font-montserrat tracking-tight">
                        {item.stats.value}
                      </div>
                      <div className="text-xs text-[#b3b3b3] uppercase tracking-wider font-montserrat mt-1">
                        {item.stats.label}
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl font-medium text-[#d3f9f5] font-montserrat tracking-tight mb-2 group-hover:text-[#7ceee0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
                    {item.description}
                  </p>

                  {item.ctaHref && item.ctaText && (
                    <Link
                      href={item.ctaHref}
                      aria-label={`${item.ctaText}: ${item.title}`}
                      className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-[#7ceee0] hover:text-[#68d8ca] transition-colors group/link focus:outline-none focus-visible:underline font-montserrat"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
