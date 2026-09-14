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
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
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
                className={`relative px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-bold font-montserrat transition-all duration-300 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D0E] ${
                  isActive
                    ? 'bg-[#25E2CC] text-black shadow-[0_0_25px_rgba(37,226,204,0.35)] scale-105'
                    : 'bg-[#141718] text-[#8C8C8C] border border-[#262C30] hover:text-white hover:border-[#25E2CC]/40'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-black/20 text-black font-extrabold'
                        : 'bg-[#25E2CC]/10 text-[#25E2CC]'
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
          className="rounded-[32px] bg-[#141718]/90 border border-[#262C30] p-8 sm:p-10 lg:p-12 backdrop-blur-md relative overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#25E2CC]/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-[#25E2CC] mb-2 font-montserrat">
                Target Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-rubik leading-tight mb-4">
                {activeTab.headline}
              </h3>
              <p className="text-sm sm:text-base text-[#8C8C8C] font-montserrat leading-relaxed mb-6">
                {activeTab.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-3 mb-8">
                {activeTab.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#25E2CC]/10 border border-[#25E2CC]/30 flex items-center justify-center text-[#25E2CC] flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                    </span>
                    <span className="text-sm sm:text-base text-[#D3F9F5]/90 font-montserrat">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Metrics row */}
              {activeTab.metrics && activeTab.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 mb-8 border-y border-[#262C30]">
                  {activeTab.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#25E2CC] font-rubik tracking-tight">
                        {m.value}
                      </div>
                      <div className="text-xs text-[#8C8C8C] uppercase tracking-wider font-montserrat mt-0.5">
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25E2CC] text-black font-bold text-sm font-montserrat hover:bg-[#1ec2af] transition-all duration-200 shadow-[0_0_20px_rgba(37,226,204,0.3)] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D0E]"
                  >
                    <span>{activeTab.ctaText}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right Preview Column */}
            <div className="lg:col-span-5">
              <div className="w-full rounded-[24px] bg-[#0A0D0E]/80 border border-[#262C30] p-6 shadow-inner relative overflow-hidden">
                {activeTab.previewContent ? (
                  activeTab.previewContent
                ) : (
                  <div className="space-y-4 font-mono text-xs text-[#8C8C8C]">
                    <div className="flex items-center justify-between pb-3 border-b border-[#262C30]">
                      <span className="text-white font-bold font-rubik">
                        System Configuration
                      </span>
                      <span className="text-[#25E2CC] text-[10px] bg-[#25E2CC]/10 px-2 py-0.5 rounded">
                        Active Profile
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#141718] border border-[#262C30] space-y-1.5">
                      <div className="text-white text-sm font-semibold">
                        {activeTab.label}
                      </div>
                      <div className="text-[#25E2CC]">
                        Status: Fully Optimized
                      </div>
                      <div className="text-[11px] text-[#8C8C8C]">
                        Routing Rule: Auto-dispatched to nearest US facility
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2.5 rounded-lg bg-[#141718] border border-[#262C30]">
                        <div className="text-[#25E2CC] font-bold text-base">
                          99.9%
                        </div>
                        <div className="text-[10px] text-[#8C8C8C]">
                          Accuracy
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#141718] border border-[#262C30]">
                        <div className="text-[#25E2CC] font-bold text-base">
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
