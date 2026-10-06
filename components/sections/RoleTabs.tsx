'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export interface RoleTabItem {
  id: string;
  label: string;
  badge?: string;
  headline: string;
  description: string;
  bullets: string[];
  metrics?: {
    value: string;
    label: string;
  }[];
  ctaText?: string;
  ctaHref?: string;
  previewContent?: React.ReactNode;
}

export interface RoleTabsProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  tabs: RoleTabItem[];
  className?: string;
}

export default function RoleTabs({
  id = 'role-solutions',
  badge = 'Role-Based Solutions',
  title,
  subtitle,
  tabs = [],
  className = '',
}: RoleTabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>(tabs?.[0]?.id || '');
  const activeTab = tabs?.find((t) => t.id === activeTabId) || tabs?.[0];

  if (!tabs || tabs.length === 0 || !activeTab) return null;

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

        {/* Tab Selector Pills (WAI-ARIA tablist) */}
        <div
          role="tablist"
          aria-label="Role-based solutions selector"
          className="flex flex-wrap items-center justify-center gap-3 mb-12 sm:mb-16"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`relative px-6 py-3 rounded-full text-xs sm:text-sm font-medium font-montserrat transition-all duration-300 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5EFC8D] ${ isActive ?'bg-[#5EFC8D] text-black shadow-[0_0_25px_rgba(94, 252, 141, 0.35)] scale-105'
                    : 'bg-[#141718] text-[#b3b3b3] border border-white/10 hover:text-[#D4FAE6] hover:border-[#5EFC8D]/40'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${ isActive ?'bg-black/20 text-black font-medium'
                        : 'bg-[#5EFC8D]/10 text-[#5EFC8D]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel (WAI-ARIA tabpanel) */}
        <div
          role="tabpanel"
          id={`panel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          tabIndex={0}
          className="rounded-[32px] bg-[#141718]/90 border border-white/10 p-8 sm:p-10 lg:p-12 backdrop-blur-md relative overflow-hidden focus:outline-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col">
              <span className="text-xs font-medium text-[#5EFC8D] mb-2 font-montserrat">
                Target Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#D4FAE6] font-montserrat leading-tight mb-4">
                {activeTab.headline}
              </h3>
              <p className="text-sm sm:text-base text-[#b3b3b3] font-light font-montserrat leading-[1.75] mb-6">
                {activeTab.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-3 mb-8">
                {activeTab.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#5EFC8D]/10 border border-[#5EFC8D]/30 flex items-center justify-center text-[#5EFC8D] flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                    </span>
                    <span className="text-sm sm:text-base text-[#D4FAE6]/90 font-light font-montserrat leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Metrics row */}
              {activeTab.metrics && activeTab.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 mb-8 border-y border-white/10">
                  {activeTab.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-2xl sm:text-3xl font-medium text-[#5EFC8D] font-montserrat">
                        {m.value}
                      </div>
                      <div className="text-xs text-[#b3b3b3] font-montserrat mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA link */}
              {activeTab.ctaHref && activeTab.ctaText && (
                <div>
                  <Link
                    href={activeTab.ctaHref}
                    aria-label={`${activeTab.ctaText}: ${activeTab.label}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#5EFC8D] text-black font-medium text-sm font-montserrat hover:bg-[#4ee37e] transition-all duration-200 shadow-[0_0_20px_rgba(94, 252, 141, 0.3)] hover:scale-105"
                  >
                    <span>{activeTab.ctaText}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right Preview Column */}
            <div className="lg:col-span-5">
              <div className="w-full rounded-[24px] bg-[#0A0D0E]/80 border border-white/10 p-6 shadow-inner relative overflow-hidden">
                {activeTab.previewContent ? (
                  activeTab.previewContent
                ) : (
                  <div className="space-y-4 font-montserrat text-xs text-[#b3b3b3]">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-[#D4FAE6] font-medium font-montserrat">
                        System Configuration
                      </span>
                      <span className="text-[#5EFC8D] text-[10px] bg-[#5EFC8D]/10 px-2 py-0.5 rounded">
                        Active Profile
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#141718] border border-white/10 space-y-1.5">
                      <div className="text-[#D4FAE6] text-sm font-medium font-montserrat">
                        {activeTab.label}
                      </div>
                      <div className="text-[#5EFC8D]">
                        Status: Fully Optimized
                      </div>
                      <div className="text-[11px] text-[#8C8C8C]">
                        Routing Rule: Auto-dispatched to nearest US facility
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2.5 rounded-lg bg-[#141718] border border-[#262C30]">
                        <div className="text-[#10E774] font-bold text-base">
                          99.9%
                        </div>
                        <div className="text-[10px] text-[#8C8C8C]">
                          Accuracy
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#141718] border border-[#262C30]">
                        <div className="text-[#10E774] font-bold text-base">
                          &lt; 24H
                        </div>
                        <div className="text-[10px] text-[#8C8C8C]">
                          SLA Guarantee
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
