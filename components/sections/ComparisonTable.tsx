import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export interface ComparisonRow {
  feature: string;
  category?: string;
  egead: string | boolean;
  traditional: string | boolean;
  egeadNote?: string;
  traditionalNote?: string;
  highlight?: boolean;
}

export interface ComparisonTableProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  egeadTitle?: string;
  egeadSubtitle?: string;
  traditionalTitle?: string;
  traditionalSubtitle?: string;
  rows: ComparisonRow[];
  className?: string;
}

export default function ComparisonTable({
  id,
  badge = 'Head-to-Head Comparison',
  title,
  subtitle,
  egeadTitle = 'E-GEAD Ecosystem',
  egeadSubtitle = 'AI Precision & Sub-24H US POD',
  traditionalTitle = 'Traditional 3PL / Print Vendors',
  traditionalSubtitle = 'Standard Manual Fulfillment',
  rows,
  className = '',
}: ComparisonTableProps) {
  const renderValue = (val: string | boolean, isEgead: boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#10E774]/15 text-[#10E774] border border-[#10E774]/30">
          <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          <span className="sr-only">Supported</span>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
          <X className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          <span className="sr-only">Not supported</span>
        </span>
      );
    }

    return (
      <span
        className={`font-semibold text-sm sm:text-base ${ isEgead ?'text-[#10E774]' : 'text-[#8C8C8C]'
        }`}
      >
        {val}
      </span>
    );
  };

  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {badge && (
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
              {badge}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Table View with Full ARIA Semantics */}
        <div
          role="table"
          aria-label="E-GEAD vs Traditional Comparison"
          className="hidden md:block rounded-[28px] border border-white/10 bg-[#141718]/90 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]"
        >
          <div role="rowgroup" className="border-b border-white/10 bg-[#101416]">
            <div role="row" className="grid grid-cols-12">
              <div
                role="columnheader"
                className="col-span-5 p-6 sm:p-7 flex flex-col justify-center"
              >
                <span className="text-xs text-[#b3b3b3] font-normal font-montserrat">
                  Feature / Metric
                </span>
              </div>
              {/* E-GEAD Header (Highlighted) */}
              <div
                role="columnheader"
                className="col-span-4 p-6 sm:p-7 bg-[#5EFC8D]/10 border-x border-[#5EFC8D]/30 flex flex-col justify-center relative"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-medium text-[#5EFC8D] font-montserrat">
                    {egeadTitle}
                  </h3>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#5EFC8D] text-black">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-[#b3b3b3] mt-1 font-montserrat font-light">
                  {egeadSubtitle}
                </p>
              </div>
              {/* Traditional Header */}
              <div
                role="columnheader"
                className="col-span-3 p-6 sm:p-7 flex flex-col justify-center"
              >
                <h3 className="text-lg sm:text-xl font-medium text-[#D4FAE6] font-montserrat">
                  {traditionalTitle}
                </h3>
                <p className="text-xs text-[#b3b3b3] mt-1 font-montserrat font-light">
                  {traditionalSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Table Body Rows */}
          <div role="rowgroup" className="divide-y divide-[#262C30]">
            {rows.map((row, idx) => (
              <div
                key={idx}
                role="row"
                className={`grid grid-cols-12 transition-colors hover:bg-white/[0.02] ${ row.highlight ?'bg-[#10E774]/[0.03]' : ''
                }`}
              >
                {/* Feature Name */}
                <div
                  role="rowheader"
                  className="col-span-5 p-5 sm:p-6 flex flex-col justify-center"
                >
                  <div className="font-semibold text-white font-montserrat text-sm sm:text-base">
                    {row.feature}
                  </div>
                  {row.category && (
                    <span className="text-[11px] text-[#8C8C8C] mt-0.5">
                      {row.category}
                    </span>
                  )}
                </div>

                {/* E-GEAD Cell */}
                <div
                  role="cell"
                  className="col-span-4 p-5 sm:p-6 bg-[#10E774]/[0.06] border-x border-[#10E774]/25 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3">
                    {renderValue(row.egead, true)}
                  </div>
                  {row.egeadNote && (
                    <p className="text-xs text-[#D4FAE6]/70 mt-1 font-montserrat">
                      {row.egeadNote}
                    </p>
                  )}
                </div>

                {/* Traditional Cell */}
                <div
                  role="cell"
                  className="col-span-3 p-5 sm:p-6 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3">
                    {renderValue(row.traditional, false)}
                  </div>
                  {row.traditionalNote && (
                    <p className="text-xs text-[#8C8C8C] mt-1 font-montserrat">
                      {row.traditionalNote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Stacked Card View */}
        <div className="md:hidden space-y-4">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#141718] border border-white/10 space-y-3"
            >
              <div className="font-medium text-[#D4FAE6] text-base font-montserrat">
                {row.feature}
              </div>

              {/* E-GEAD pill */}
              <div className="p-3 rounded-xl bg-[#5EFC8D]/10 border border-[#5EFC8D]/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#5EFC8D] font-montserrat">
                    {egeadTitle}:
                  </span>
                  <div>{renderValue(row.egead, true)}</div>
                </div>
                {row.egeadNote && (
                  <p className="text-[11px] text-[#D4FAE6]/80 mt-1 font-montserrat font-light">
                    {row.egeadNote}
                  </p>
                )}
              </div>

              {/* Traditional pill */}
              <div className="p-3 rounded-xl bg-[#101416] border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#b3b3b3] font-montserrat">
                    {traditionalTitle}:
                  </span>
                  <div>{renderValue(row.traditional, false)}</div>
                </div>
                {row.traditionalNote && (
                  <p className="text-[11px] text-[#b3b3b3] mt-1 font-montserrat font-light">
                    {row.traditionalNote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
