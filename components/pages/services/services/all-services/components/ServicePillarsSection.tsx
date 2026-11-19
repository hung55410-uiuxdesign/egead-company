'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MotionSection from '@/components/MotionSection';
import { useT } from '@/components/providers/LocaleProvider';
import type { ServiceItemListItem } from '@/lib/services/service-item.service';
import { getOptimizedImageUrl } from '@/lib/utils/image';
import { servicePillars } from '../data/service-pillars.data';

const PAGE_SIZE = 6;

interface ServicePillarsSectionProps {
  serviceItems?: ServiceItemListItem[];
}

export default function ServicePillarsSection({ serviceItems }: ServicePillarsSectionProps) {
  const t = useT();
  const [activeTab, setActiveTabState] = useState<'all' | 'service' | 'industry'>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const setActiveTab = (tab: 'all' | 'service' | 'industry') => {
    setActiveTabState(tab);
    setVisibleCount(PAGE_SIZE);
  };

  const hasDbItems = Array.isArray(serviceItems) && serviceItems.length > 0;

  const totalCount = serviceItems?.length || 0;
  const servicesCount = serviceItems?.filter((s) => s.category === 'service').length || 0;
  const industriesCount = serviceItems?.filter((s) => s.category === 'industry').length || 0;

  const filteredDbItems = hasDbItems
    ? serviceItems.filter((s) => (activeTab === 'all' ? true : s.category === activeTab))
    : [];
  const displayDbItems = filteredDbItems.slice(0, visibleCount);
  const remainingCount = filteredDbItems.length - displayDbItems.length;

  return (
    <MotionSection
      id="service"
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28 scroll-mt-28"
    >
      <div className="max-w-4xl mb-8 sm:mb-12">
        <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
          Complete Capabilities Portfolio
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-semibold font-montserrat leading-[1.25] mb-4">
          <span className="text-white">Complete Operational Spectrum:</span> <br />
          <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
            From Ingestion to Delivery &amp; Growth
          </span>
        </h2>
        <p className="text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
          Specialized technology, automated manufacturing, and data-driven performance marketing.
        </p>
      </div>

      {/* Filter Tabs (Services vs Industries) */}
      {hasDbItems && (
        <div className="flex flex-wrap items-center gap-3 mb-10 sm:mb-14">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 font-montserrat ${
              activeTab === 'all'
                ? 'bg-[#10E774] text-black shadow-[0_0_20px_rgba(16,231,116,0.25)]'
                : 'bg-[#141718] text-[#b3b3b3] hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {t.servicesPage.all} ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('service')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 font-montserrat ${
              activeTab === 'service'
                ? 'bg-[#10E774] text-black shadow-[0_0_20px_rgba(16,231,116,0.25)]'
                : 'bg-[#141718] text-[#b3b3b3] hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {t.servicesPage.operations} ({servicesCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('industry')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 font-montserrat ${
              activeTab === 'industry'
                ? 'bg-[#10E774] text-black shadow-[0_0_20px_rgba(16,231,116,0.25)]'
                : 'bg-[#141718] text-[#b3b3b3] hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {t.servicesPage.products} ({industriesCount})
          </button>
        </div>
      )}

      {/* Dynamic List of Service & Industry Cards */}
      <div className="space-y-10 sm:space-y-14">
        {hasDbItems
          ? displayDbItems.map((item, idx) => {
              const iconImg = getOptimizedImageUrl(item.heroImage, { width: 500 }) || '/assets/icon_s_new__2_.png';
              const principles = Array.isArray(item.principles) ? item.principles : [];

              return (
                <div
                  key={item.id}
                  className="group rounded-[32px] bg-[#12131c] border border-white/10 hover:border-[#5EFC8D]/40 transition-all duration-300 p-6 sm:p-10 lg:p-12 shadow-xl hover:shadow-[0_0_35px_rgba(94,252,141,0.08)]"
                >
                  <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    {/* Left: Thumbnail Visual */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 shrink-0 flex items-center justify-center">
                      <img
                        src={iconImg}
                        alt={item.title}
                        className="w-full h-full object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Right: Content Wrapper */}
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-2xl font-medium text-white/50 font-montserrat">
                          {String(item.order || idx + 1).padStart(2, '0')}
                        </p>
                        <span className="text-xs px-3 py-1 rounded-full bg-[#1A2022] text-[#5EFC8D] border border-[#5EFC8D]/20 font-montserrat">
                          {item.category === 'industry' ? t.servicesPage.categoryProducts : t.servicesPage.categoryOperations}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-semibold font-montserrat mb-3 leading-snug">
                        <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                          {item.title}
                        </span>
                      </h3>

                      {item.tagline && (
                        <p className="text-sm sm:text-base text-[#D4FAE6]/80 font-normal mb-2 font-montserrat">
                          {item.tagline}
                        </p>
                      )}

                      <p className="text-sm sm:text-base text-[#b3b3b3] font-light leading-relaxed font-montserrat max-w-3xl mb-8">
                        {item.subtitle}
                      </p>

                      {/* Principles / Sub-cards with Gradient Borders */}
                      {principles.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                          {principles.slice(0, 3).map((p: any, cIdx: number) => (
                            <div
                              key={cIdx}
                              className="bg-gradient-to-b from-[#5EFC8D]/25 via-[#10E774]/5 to-[#5EFC8D]/15 p-[1px] rounded-[20px] transition-all duration-300 hover:from-[#5EFC8D]/50 hover:to-[#5EFC8D]/30"
                            >
                              <div className="bg-[#0A0D0E] p-6 rounded-[20px] h-full flex flex-col justify-start">
                                <h4 className="text-base sm:text-[17px] font-medium text-[#D4FAE6] font-montserrat mb-2 leading-snug">
                                  {p.title}
                                </h4>
                                <p className="text-xs sm:text-[13px] text-[#8C8C8C] font-light leading-relaxed font-montserrat">
                                  {p.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Discover More Action Button */}
                      <div className="pt-2">
                        <Link
                          href={`/services/all-services/${item.slug}`}
                          className="group/btn inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#10E774] text-black font-medium text-sm hover:bg-[#5EFC8D] transition-all duration-300 shadow-[0_0_20px_rgba(16,231,116,0.3)] hover:shadow-[0_0_30px_rgba(94,252,141,0.5)] font-montserrat"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-black group-hover/btn:rotate-45 transition-transform duration-300"
                          >
                            <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                          </svg>
                          <span>{t.servicesPage.viewDetails}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : servicePillars.map((service) => (
              <div
                key={service.id}
                className="group rounded-[32px] bg-[#12131c] border border-white/10 hover:border-[#5EFC8D]/40 transition-all duration-300 p-6 sm:p-10 lg:p-12 shadow-xl hover:shadow-[0_0_35px_rgba(94,252,141,0.08)]"
              >
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 shrink-0 flex items-center justify-center p-2 rounded-2xl bg-[#181a24] border border-white/5">
                    <img
                      src={service.iconImg}
                      alt={service.title}
                      className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-2xl font-medium text-white/50 font-montserrat">
                        {service.number}
                      </p>
                      <span className="text-xs px-3 py-1 rounded-full bg-[#1A2022] text-[#5EFC8D] border border-[#5EFC8D]/20 font-montserrat">
                        {service.subtitle}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold font-montserrat mb-3 leading-snug">
                      <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                        {service.title}
                      </span>
                    </h3>

                    <p className="text-sm sm:text-base text-[#b3b3b3] font-light leading-relaxed font-montserrat max-w-3xl mb-8">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                      {service.children.map((child, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-gradient-to-b from-[#5EFC8D]/25 via-[#10E774]/5 to-[#5EFC8D]/15 p-[1px] rounded-[20px] transition-all duration-300 hover:from-[#5EFC8D]/50 hover:to-[#5EFC8D]/30"
                        >
                          <div className="bg-[#0A0D0E] p-6 rounded-[20px] h-full flex flex-col justify-start">
                            <div className="w-10 h-10 mb-4 flex items-center justify-center">
                              <img
                                src={child.icon}
                                alt={child.title}
                                className="w-8 h-8 object-contain filter brightness-110"
                              />
                            </div>
                            <h4 className="text-base sm:text-[17px] font-medium text-[#D4FAE6] font-montserrat mb-2 leading-snug">
                              {child.title}
                            </h4>
                            <p className="text-xs sm:text-[13px] text-[#8C8C8C] font-light leading-relaxed font-montserrat">
                              {child.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        href={service.ctaHref}
                        className="group/btn inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#10E774] text-black font-medium text-sm hover:bg-[#5EFC8D] transition-all duration-300 shadow-[0_0_20px_rgba(16,231,116,0.3)] hover:shadow-[0_0_30px_rgba(94,252,141,0.5)] font-montserrat"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 19 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-black group-hover/btn:rotate-45 transition-transform duration-300"
                        >
                          <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                        </svg>
                        <span>{service.ctaText}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {hasDbItems && remainingCount > 0 && (
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="px-8 py-3 rounded-full bg-[#141718] text-white text-sm font-medium font-montserrat border border-white/15 hover:border-[#10E774]/60 hover:text-[#10E774] transition-all duration-200"
          >
            {t.common.showMore} ({remainingCount})
          </button>
          <p className="text-xs text-[#8C8C8C] font-montserrat">
            {displayDbItems.length} / {filteredDbItems.length}
          </p>
        </div>
      )}
    </MotionSection>
  );
}

