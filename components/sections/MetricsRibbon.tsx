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
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#10E774]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#10E774]/20 to-transparent" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {(badge || title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            {badge && (
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-2 font-montserrat">
                {badge}
              </p>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
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
              className="relative p-6 sm:p-7 rounded-[22px] bg-[#141718]/80 border border-white/10 hover:border-[#5EFC8D]/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                {item.icon ? (
                  <div className="w-10 h-10 rounded-xl bg-[#1D2224] flex items-center justify-center text-[#5EFC8D] border border-white/10 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#5EFC8D] animate-pulse" />
                )}
                {item.trend && (
                  <span className="text-[11px] font-medium text-[#5EFC8D] bg-[#5EFC8D]/10 px-2.5 py-0.5 rounded-full border border-[#5EFC8D]/20 font-montserrat">
                    {item.trend}
                  </span>
                )}
              </div>

              <div className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#5EFC8D] group-hover:text-white transition-colors font-montserrat tracking-tight leading-none mb-2">
                {item.value}
              </div>

              <div className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#D4FAE6] font-montserrat">
                {item.label}
              </div>

              {item.description && (
                <p className="mt-2 text-xs text-[#b3b3b3] font-light font-montserrat leading-relaxed">
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
