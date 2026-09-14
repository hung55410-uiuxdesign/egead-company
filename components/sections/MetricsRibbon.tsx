import React from 'react';

export interface MetricItem {
  value: string;
  label: string;
  trend?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface MetricsRibbonProps {
  id?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  metrics: MetricItem[];
  className?: string;
}

export default function MetricsRibbon({
  id,
  badge,
  title,
  subtitle,
  metrics,
  className = '',
}: MetricsRibbonProps) {
  return (
    <section
      id={id}
      className={`relative w-full py-12 sm:py-16 bg-[#0A0D0E] border-y border-[#262C30] text-white overflow-hidden ${className}`}
    >
      {/* Background neon glow line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#25E2CC]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#25E2CC]/20 to-transparent" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 max-w-7xl mx-auto">
        {(badge || title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            {badge && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141718] border border-[#262C30] text-[#25E2CC] text-xs font-semibold uppercase tracking-wider mb-3 font-montserrat">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-rubik tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-[#8C8C8C] font-montserrat">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Metrics Grid */}
        <div
          className={`grid gap-6 ${
            metrics.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : metrics.length === 3
              ? 'grid-cols-1 md:grid-cols-3'
              : 'grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-[22px] bg-[#141718]/80 border border-[#262C30] hover:border-[#25E2CC]/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                {item.icon ? (
                  <div className="w-10 h-10 rounded-xl bg-[#1D2224] flex items-center justify-center text-[#25E2CC] border border-[#262C30] group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#25E2CC] animate-pulse" />
                )}
                {item.trend && (
                  <span className="text-[11px] font-semibold text-[#25E2CC] bg-[#25E2CC]/10 px-2.5 py-0.5 rounded-full border border-[#25E2CC]/20 font-montserrat">
                    {item.trend}
                  </span>
                )}
              </div>

              <div className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white group-hover:text-[#25E2CC] transition-colors font-rubik tracking-tight leading-none mb-2">
                {item.value}
              </div>

              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D3F9F5] font-montserrat">
                {item.label}
              </div>

              {item.description && (
                <p className="mt-2 text-xs text-[#8C8C8C] font-montserrat leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
