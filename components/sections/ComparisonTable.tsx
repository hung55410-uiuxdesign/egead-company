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
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#25E2CC]/15 text-[#25E2CC] border border-[#25E2CC]/30">
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
        className={`font-semibold text-sm sm:text-base ${
          isEgead ? 'text-[#25E2CC]' : 'text-[#8C8C8C]'
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
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {badge && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-[#262C30] text-[#25E2CC] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 font-montserrat">
              <Sparkles className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-rubik leading-[1.2]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-[#8C8C8C] leading-relaxed font-montserrat max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Table View with Full ARIA Semantics */}
        <div
          role="table"
          aria-label="E-GEAD vs Traditional Comparison"
          className="hidden md:block rounded-[28px] border border-[#262C30] bg-[#141718]/90 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]"
        >
          <div role="rowgroup" className="border-b border-[#262C30] bg-[#101416]">
            <div role="row" className="grid grid-cols-12">
              <div
                role="columnheader"
                className="col-span-5 p-6 sm:p-7 flex flex-col justify-center"
              >
                <span className="text-xs uppercase tracking-widest text-[#8C8C8C] font-semibold font-montserrat">
                  Feature / Metric
                </span>
              </div>
              {/* E-GEAD Header (Highlighted) */}
              <div
                role="columnheader"
                className="col-span-4 p-6 sm:p-7 bg-[#25E2CC]/10 border-x border-[#25E2CC]/30 flex flex-col justify-center relative"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#25E2CC] font-rubik">
                    {egeadTitle}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#25E2CC] text-black">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-[#8C8C8C] mt-1 font-montserrat">
                  {egeadSubtitle}
                </p>
              </div>
              {/* Traditional Header */}
              <div
                role="columnheader"
                className="col-span-3 p-6 sm:p-7 flex flex-col justify-center"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white font-rubik">
                  {traditionalTitle}
                </h3>
                <p className="text-xs text-[#8C8C8C] mt-1 font-montserrat">
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
                className={`grid grid-cols-12 transition-colors hover:bg-white/[0.02] ${
                  row.highlight ? 'bg-[#25E2CC]/[0.03]' : ''
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
                    <span className="text-[11px] text-[#8C8C8C] uppercase tracking-wider mt-0.5">
                      {row.category}
                    </span>
                  )}
                </div>

                {/* E-GEAD Cell */}
                <div
                  role="cell"
                  className="col-span-4 p-5 sm:p-6 bg-[#25E2CC]/[0.06] border-x border-[#25E2CC]/25 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3">
                    {renderValue(row.egead, true)}
                  </div>
                  {row.egeadNote && (
                    <p className="text-xs text-[#D3F9F5]/70 mt-1 font-montserrat">
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
              className="p-5 rounded-2xl bg-[#141718] border border-[#262C30] space-y-3"
            >
              <div className="font-bold text-white text-base font-rubik">
                {row.feature}
              </div>

              {/* E-GEAD pill */}
              <div className="p-3 rounded-xl bg-[#25E2CC]/10 border border-[#25E2CC]/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#25E2CC]">
                    {egeadTitle}:
                  </span>
                  <div>{renderValue(row.egead, true)}</div>
                </div>
                {row.egeadNote && (
                  <p className="text-[11px] text-[#D3F9F5]/80 mt-1">
                    {row.egeadNote}
                  </p>
                )}
              </div>

              {/* Traditional pill */}
              <div className="p-3 rounded-xl bg-[#101416] border border-[#262C30]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8C8C8C]">
                    {traditionalTitle}:
                  </span>
                  <div>{renderValue(row.traditional, false)}</div>
                </div>
                {row.traditionalNote && (
                  <p className="text-[11px] text-[#8C8C8C] mt-1">
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
