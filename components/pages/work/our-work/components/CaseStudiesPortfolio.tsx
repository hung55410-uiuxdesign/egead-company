'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  ShieldCheck,
  Globe2,
} from 'lucide-react';

export interface CaseStudyItem {
  id: string;
  client: string;
  location: string;
  category: string;
  industry: 'pod-fulfillment' | 'marketplace-sync' | 'performance-ads' | 'api-integration';
  title: string;
  summary: string;
  image: string;
  metrics: string[];
  resultsBreakdown: {
    highlight: string;
    description: string;
  };
  linkHref?: string;
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'urbanvibe',
    client: 'UrbanVibe Apparel',
    location: 'Los Angeles, CA',
    category: 'Print-on-Demand Fashion',
    industry: 'pod-fulfillment',
    title: '100% Sub-24H Dispatch & Preserved TikTok Shop Fast Dispatch Badge',
    summary:
      'UrbanVibe faced late-shipment strikes and algorithmic throttles on TikTok Shop US due to legacy 3–5 day print delays. By partnering with E-GEAD, 100% of order volume was routed to 23-inch industrial DTF printing in the US with sub-24h carrier scans at $6 all-in.',
    image: '/assets/case_suntory.jpg',
    metrics: ['SLA < 24 Hours', '0.18% Late Dispatch', '+180% Q4 Revenue'],
    resultsBreakdown: {
      highlight: '$420,000 GMV',
      description: 'Handled 28,000 peak holiday orders without a single late dispatch violation.',
    },
    linkHref: '#work-cta',
  },
  {
    id: 'homecraft',
    client: 'HomeCraft Studio',
    location: 'London & Seattle',
    category: 'Home Living & Custom Gifts',
    industry: 'marketplace-sync',
    title: 'Automated Multi-Channel Stock Balancing Across Amazon, Etsy & Shopify',
    summary:
      'Managing 1,500+ SKUs across 3 international platforms resulted in chronic stockout cancellations and 15 weekly hours of manual spreadsheet reconciliation. Eweb-platform centralized multi-channel ingestion, automated buffer throttles, and achieved 99.9% WMS barcode accuracy.',
    image: '/assets/case_brother.jpg',
    metrics: ['99.9% WMS Accuracy', '-85% Manual Ops', 'Zero Overselling'],
    resultsBreakdown: {
      highlight: 'Zero Stockouts',
      description: 'Eliminated Amazon FBM out-of-stock cancellations across 1,500 active gift SKUs.',
    },
    linkHref: '#work-cta',
  },
  {
    id: 'lumina',
    client: 'Lumina DTC Brand',
    location: 'Singapore & US',
    category: 'Performance Fashion & DTC',
    industry: 'performance-ads',
    title: 'Scaled Blended ROAS to 4.8x and Reduced Acquisition Cost (CPA) to $8.40',
    summary:
      'Lumina struggled to scale ad spend past $5,000/day without fulfillment bottlenecks. Combining E-GEAD sub-24h shipping social proof in ad comments with high-velocity creative testing allowed Lumina to expand ad spend to $25,000/day profitably.',
    image: '/assets/case_weir.jpg',
    metrics: ['ROAS 4.8x', 'CPA $8.40', '+92K Monthly Traffic'],
    resultsBreakdown: {
      highlight: '4.8x Blended ROAS',
      description: 'Scaled paid media to $25K/day profitably backed by 24h fulfillment proof.',
    },
    linkHref: '#work-cta',
  },
  {
    id: 'printwave',
    client: 'PrintWave Enterprise Network',
    location: 'Austin, TX',
    category: 'Enterprise API Infrastructure',
    industry: 'api-integration',
    title: 'Processing 10,000+ Daily POD Orders via Open RESTful API & Webhooks',
    summary:
      'PrintWave required high-throughput direct automated routing to US manufacturing centers. Integrating E-GEAD RESTful endpoints and event-driven webhooks enabled automated print validation, instantaneous carrier tracking callbacks, and real-time margin settlement.',
    image: '/assets/case_manulife.jpg',
    metrics: ['10,000+ Orders/Day', '99.9% API Uptime', '<120ms Latency'],
    resultsBreakdown: {
      highlight: '10,000+ Daily Orders',
      description: 'Automated 100% of order routing and label generation with zero human intervention.',
    },
    linkHref: '#work-cta',
  },
  {
    id: 'nordic',
    client: 'Nordic Threads',
    location: 'Berlin & Stockholm',
    category: 'Apparel & Merch Expansion',
    industry: 'pod-fulfillment',
    title: 'Cross-Border US Expansion at Flat $6 All-In Rate with 34% Net Margin',
    summary:
      'European streetwear creator scaled into the US marketplace without local corporate entities or overseas inventory risk, utilizing E-GEAD $6 all-in DTF pricing and 3-5 day USPS First-Class delivery to establish an American direct-to-consumer footprint.',
    image: '/assets/case_suntory.jpg',
    metrics: ['34% Net Margin', '$6 All-In Print', '48h US Onboarding'],
    resultsBreakdown: {
      highlight: '34% Net Margin',
      description: 'Eliminated customs delays and international air freight overhead completely.',
    },
    linkHref: '#work-cta',
  },
  {
    id: 'auraglow',
    client: 'AuraGlow Custom Decor',
    location: 'Melbourne, Australia',
    category: 'Personalized Decor & Logistics',
    industry: 'marketplace-sync',
    title: 'Eliminated 91% of Return-to-Origin (RTO) via AI Postal Normalization',
    summary:
      'International seller suffered severe losses from unvalidated US buyer addresses. Eweb-character CASS postal normalization intercepted malformed addresses before print production, dropping RTO rates to 0.9% and saving thousands in carrier reshipment costs.',
    image: '/assets/case_brother.jpg',
    metrics: ['-91% RTO Losses', '99.7% Postal Delivery', '+$38K Reclaimed'],
    resultsBreakdown: {
      highlight: '-91% Return Rate',
      description: 'Repaired 4,200+ malformed zip codes and unit numbers before dispatch.',
    },
    linkHref: '#work-cta',
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Success Stories', count: 6 },
  { id: 'pod-fulfillment', label: 'POD US Fulfillment & 24H SLA', count: 2 },
  { id: 'marketplace-sync', label: 'Multi-Channel Inventory Sync', count: 2 },
  { id: 'performance-ads', label: 'Performance Ads & ROAS Scale', count: 1 },
  { id: 'api-integration', label: 'Enterprise WMS & API Integration', count: 1 },
];

export interface CaseStudiesPortfolioProps {
  className?: string;
}

export function CaseStudiesPortfolio({ className = '' }: CaseStudiesPortfolioProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredStudies = filter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((item) => item.industry === filter);

  return (
    <div className={`w-full ${className}`}>
      
      {/* SECTION 2: Interactive Industry & Capability Filter Bar */}
      <section 
        id="case-study-filters" 
        role="region"
        aria-label="Filter case studies by industry capability"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20 scroll-mt-28"
      >
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
            <span className="text-sm font-normal text-[#D4FAE6] font-montserrat">
              Filter By Capability &amp; Operational Domain
            </span>
            <span className="text-xs font-montserrat text-[#b3b3b3]">
              Showing <span className="text-white font-medium">{filteredStudies.length}</span> of {CASE_STUDIES.length} Verified Case Studies
            </span>
          </div>

          <div 
            role="tablist" 
            aria-label="Case study categories"
            className="flex flex-wrap gap-2.5 sm:gap-3"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls="case-studies-grid"
                  onClick={() => setFilter(tab.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${ isActive ?'bg-[#10E774] text-black shadow-lg shadow-[#10E774]/25 font-bold scale-[1.02]'
                      : 'bg-[#141718] text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-montserrat font-bold ${ isActive ?'bg-black/20 text-black'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Screen reader live notification */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Now displaying {filteredStudies.length} case studies for category {filter}.
          </div>
        </div>
      </section>

      {/* SECTION 3: Flagship Case Study Deep Dive: UrbanVibe Apparel */}
      <section 
        id="flagship-case-study"
        role="region"
        aria-label="Flagship Case Study Deep Dive: UrbanVibe Apparel"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="w-full rounded-[36px] bg-[#141718] border border-[#10E774]/40 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div 
            aria-hidden="true" 
            className="absolute -top-32 -right-32 w-96 h-96 bg-[#10E774]/15 rounded-full blur-3xl pointer-events-none" 
          />
          <div 
            aria-hidden="true" 
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" 
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Visual Card with Image & Live Proof Badges (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <Image
                  src="/assets/case_suntory.jpg"
                  alt="UrbanVibe Apparel high-speed industrial DTF fulfillment warehouse operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E] via-[#0A0D0E]/40 to-transparent" />
                
                {/* Brand Tag Top */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-montserrat font-semibold text-[#10E774]">
                    <Globe2 className="w-3 h-3" aria-hidden="true" />
                    UrbanVibe Apparel · Los Angeles, CA
                  </span>
                </div>

                {/* Proof Metrics Overlay Bottom */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] font-montserrat text-gray-400 block">Dispatch SLA</span>
                    <span className="text-base sm:text-lg font-montserrat font-bold text-[#10E774]">&lt; 24 Hours</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] font-montserrat text-gray-400 block">Late Dispatch</span>
                    <span className="text-base sm:text-lg font-montserrat font-bold text-[#10E774]">0.18% (Safe)</span>
                  </div>
                </div>
              </div>

              {/* Verified Verification Badge */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0A0D0E] border border-white/10 text-xs font-montserrat text-gray-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                  TikTok Fast Dispatch Badge Retained
                </span>
                <span className="text-[#10E774] font-bold">100% SLA</span>
              </div>
            </div>

            {/* Right Column: Narrative 3-Phase Transformation (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
                  Flagship Case Study Deep Dive
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat leading-[1.3] tracking-tight">
                  <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                    How UrbanVibe Conquered TikTok Shop US: Zero LDR Strikes &amp; +180% Q4 Growth
                  </span>
                </h2>
                <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
                  When viral short-form video campaigns drove a 12x surge in daily apparel orders, UrbanVibe faced the threat of automated TikTok account suspension. Here is how E-GEAD turned an operational bottleneck into a high-margin growth engine.
                </p>
              </div>

              {/* 3-Phase Narrative Cards */}
              <div className="space-y-4">
                
                {/* Phase 1 */}
                <div className="p-4 rounded-xl bg-[#0A0D0E]/80 border border-rose-500/20 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 font-montserrat font-bold text-xs shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      The Operational Bottleneck
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Legacy print partners required 3–5 days for DTG production. TikTok Shop US Late Dispatch Rate climbed to 4.2%, triggering an algorithmic penalty limiting the store to 100 orders/day during peak viral momentum.
                    </p>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="p-4 rounded-xl bg-[#0A0D0E]/80 border border-[#10E774]/20 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#10E774]/15 border border-[#10E774]/30 flex items-center justify-center text-[#10E774] font-montserrat font-bold text-xs shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      The E-GEAD Intervention
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      UrbanVibe rerouted 100% of order volume to E-GEAD US facility. Automated CASS address validation repaired incomplete zip codes, while 23-inch industrial DTF printing ensured sub-24h USPS postal scanning.
                    </p>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="p-4 rounded-xl bg-[#0A0D0E]/80 border border-emerald-500/20 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-montserrat font-bold text-xs shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      The Quantitative Outcome
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      LDR plunged to 0.18%, restoring the coveted TikTok Fast Dispatch badge. UrbanVibe scaled Q4 revenue by 180% to generate $420,000 GMV across 28,000 orders without hiring a single additional operations staff member.
                    </p>
                  </div>
                </div>

              </div>

              {/* Founder Quote */}
              <div className="pt-2 border-t border-white/10">
                <blockquote className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                  &ldquo;Without E-GEAD&apos;s sub-24h fulfillment, our TikTok Shop account would have been suspended in November. They didn&apos;t just fulfill orders—they saved our entire company.&rdquo;
                </blockquote>
                <div className="mt-2 text-xs font-montserrat text-[#10E774]">
                  — Marcus Vance, Founder, UrbanVibe Apparel
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Comprehensive 6-Brand Case Study Portfolio Grid */}
      <section 
        id="case-studies-grid" 
        role="region"
        aria-label="Comprehensive Case Studies Portfolio Grid"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
                Portfolio Showcase
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat leading-[1.3] tracking-tight">
                <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                  Empirical Case Studies Portfolio
                </span>
              </h2>
            </div>
            <p className="text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-md">
              Real metrics from global e-commerce merchants operating across apparel, home living, personalized gifts, and enterprise technology.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredStudies.map((item) => (
              <article
                key={item.id}
                className="group rounded-[32px] overflow-hidden bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-500 flex flex-col justify-between shadow-2xl relative"
              >
                {/* Top Image Banner */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.client} fulfillment and scale case study`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141718] via-transparent to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-montserrat font-semibold text-white">
                      {item.client}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#10E774]/20 backdrop-blur-md border border-[#10E774]/30 text-[11px] font-montserrat font-bold text-[#10E774]">
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-montserrat text-[#10E774] block mb-2 font-medium">
                      {item.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#10E774] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-400 font-normal leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Highlight Box */}
                    <div className="mt-5 p-3.5 rounded-xl bg-[#0A0D0E] border border-white/10 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-normal">Primary Growth Outcome:</span>
                      <span className="text-xs font-montserrat font-bold text-[#10E774]">
                        {item.resultsBreakdown.highlight}
                      </span>
                    </div>

                    {/* Metric Pills */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.metrics.map((m, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-montserrat text-gray-300"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={item.linkHref || '#work-cta'}
                      className="text-xs font-semibold text-[#10E774] group-hover:underline flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] rounded"
                    >
                      <span>Examine Case Methodology</span>
                      <span className="sr-only">for {item.client}</span>
                    </a>
                    <div 
                      aria-hidden="true" 
                      className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#10E774] group-hover:text-black transition duration-300"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
export default CaseStudiesPortfolio;
