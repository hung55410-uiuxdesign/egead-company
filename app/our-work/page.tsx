import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Volume2,
  Video,
  Quote,
  Calendar,
} from 'lucide-react';
import {
  CaseStudiesPortfolio,
  TransformationMatrix,
  EfficiencyVisualizer,
  PlaybookDownloads,
  FaqAccordion,
} from '@/components/sections';
import type { FaqItem } from '@/components/sections';
import ContactBlock from '@/components/ContactBlock';

export const metadata: Metadata = {
  title: 'E-Commerce Case Studies & Battle-Tested Growth Proof | E-GEAD',
  description:
    'Explore empirical proof of scale from 100+ global e-commerce brands. Discover how E-GEAD delivers sub-24h fulfillment, 99.8% SLA safety, and automated margin growth across TikTok Shop, Amazon, and Shopify.',
  keywords: [
    'ecommerce case studies',
    'tiktok shop us success story',
    'pod fulfillment case study',
    'cross-border scaling results',
    'sub 24h dispatch SLA proof',
    'omnichannel inventory case study',
    'print on demand ROI',
    'ecommerce operations audit',
  ],
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How quickly can our store replicate these results?',
    answer:
      'Most e-commerce stores and DTC brands complete API integration and onboarding in 3 to 5 business days. Once your storefront is connected, orders automatically route to our US fulfillment center with sub-24h carrier scans on day one.',
  },
  {
    question: 'Are these case study metrics verified by third-party platforms?',
    answer:
      'Yes. All reported operational SLA rates, late dispatch percentages, and revenue figures are pulled directly from third-party merchant portals including TikTok Shop Seller Center, Amazon Seller Central, Shopify Analytics, and carrier tracking logs.',
  },
  {
    question: 'Do you work with early-stage sellers or only established enterprise brands?',
    answer:
      'E-GEAD supports growing cross-border sellers starting from 30–50 orders per day up to enterprise accounts handling 10,000+ daily orders. Our flat $6 all-in pricing structure provides enterprise-grade logistics without requiring prohibitive minimum order volumes.',
  },
  {
    question: 'What happens if our sales volume spikes 10x overnight during a viral campaign?',
    answer:
      'Our 23-inch industrial DTF printing lines and automated barcode WMS are engineered for instant elastic scaling. When your TikTok or Meta ad goes viral, our production floor absorbs the surge dynamically without backlog or SLA penalties.',
  },
  {
    question: 'Can we sign an NDA before sharing our storefront data?',
    answer:
      'Yes, absolutely. We routinely sign bilateral non-disclosure agreements (NDAs) before conducting operations audits to ensure complete protection of your proprietary product designs, supplier data, and store revenue figures.',
  },
];

export default function OurWorkPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36">
      
      {/* SECTION 1: Impact-Driven Hero & Aggregate Portfolio Metrics */}
      <section 
        id="work-hero"
        role="region"
        aria-label="Case Studies Hero and Aggregate Portfolio Impact"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28"
      >
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Headline & Positioning */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-normal text-[#d3f9f5] mb-6 font-montserrat">
                <Sparkles className="w-4 h-4 text-[#7ceee0]" aria-hidden="true" />
                Proven Global Case Studies &amp; ROI
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium tracking-tight leading-[1.08] text-[#d3f9f5] font-montserrat mb-6">
                Measurable Growth. <br />
                <span className="text-[#7ceee0] font-medium">Battle-Tested Results.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mb-8">
                Discover how E-GEAD empowers cross-border e-commerce brands and high-volume sellers to eliminate operational bottlenecks, safeguard marketplace SLA performance, and scale global revenue with zero headcount expansion.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#case-studies-grid"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7ceee0] text-black font-medium text-sm sm:text-base font-montserrat hover:bg-[#68d8ca] transition duration-300"
                >
                  <span>Explore Case Studies</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#work-cta"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#141718] border border-white/20 text-[#d3f9f5] font-medium text-sm sm:text-base font-montserrat hover:border-[#7ceee0] hover:text-[#7ceee0] transition duration-300"
                >
                  <span>Book Operations Audit</span>
                </a>
              </div>
            </div>

            {/* Right Aggregate Metrics Box */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-[#141718] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
                <div 
                  aria-hidden="true" 
                  className="absolute -top-16 -right-16 w-48 h-48 bg-[#25E2CC]/15 rounded-full blur-2xl pointer-events-none" 
                />

                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400">
                    Cumulative Portfolio Impact
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-[#25E2CC]">
                    <span className="w-2 h-2 rounded-full bg-[#25E2CC] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                    Live Audited
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {/* Metric 1 */}
                  <div className="p-4 rounded-2xl bg-[#0A0D0E] border border-white/5">
                    <div className="text-2xl sm:text-3xl font-medium text-[#7ceee0]">
                      +$45M
                    </div>
                    <div className="text-xs text-[#b3b3b3] mt-1 font-light">
                      Gross Merchandise Value (GMV) Generated
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 rounded-2xl bg-[#0A0D0E] border border-white/5">
                    <div className="text-2xl sm:text-3xl font-medium text-[#d3f9f5]">
                      100+
                    </div>
                    <div className="text-xs text-[#b3b3b3] mt-1 font-light">
                      Brands Accelerated in 10+ Countries
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 rounded-2xl bg-[#0A0D0E] border border-white/5">
                    <div className="text-2xl sm:text-3xl font-medium text-[#7ceee0]">
                      99.8%
                    </div>
                    <div className="text-xs text-[#b3b3b3] mt-1 font-light">
                      Aggregate On-Time Dispatch SLA Rate
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-4 rounded-2xl bg-[#0A0D0E] border border-white/5">
                    <div className="text-2xl sm:text-3xl font-medium text-[#d3f9f5]">
                      0%
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-normal">
                      Account Health Violations Across Partners
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-500">
                  <span>Audited across 100+ Merchant Accounts</span>
                  <span className="text-gray-400">2024–2026 Data</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTIONS 2, 3, 4: Interactive Filter Bar, Flagship Showcase & 6-Brand Portfolio Grid */}
      <CaseStudiesPortfolio />

      {/* SECTION 5: Quantitative Before-vs-After Transformation Matrix */}
      <section 
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28"
        aria-label="Quantitative Transformation Matrix Section"
      >
        <div className="w-full">
          <TransformationMatrix />
        </div>
      </section>

      {/* SECTION 6: Interactive Operational Efficiency Visualizer */}
      <section 
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28"
        aria-label="Interactive Operational Efficiency Visualizer Section"
      >
        <div className="w-full">
          <EfficiencyVisualizer />
        </div>
      </section>

      {/* SECTION 7: Verified Founder Voices & Audio/Video Quotes */}
      <section 
        id="founder-voices"
        role="region"
        aria-label="Verified Founder Voices and Client Testimonials"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#25E2CC] block mb-2">
                Executive Perspectives
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Verified Founder Voices
              </h2>
            </div>
            <p className="text-sm text-gray-400 max-w-md font-normal leading-relaxed">
              Unfiltered reflections from founders and operations directors who scaled cross-border e-commerce businesses on our infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Voice 1: Marcus Vance */}
            <div className="flex flex-col justify-between p-8 rounded-3xl bg-[#141718] border border-white/10 hover:border-[#25E2CC]/40 transition-all duration-300 relative group shadow-xl">
              <div>
                {/* Media badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25E2CC]/10 border border-[#25E2CC]/25 text-[11px] font-mono text-[#25E2CC] font-semibold">
                    <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Audio Recording · 1m 18s
                  </span>
                  <Quote className="w-5 h-5 text-gray-600 group-hover:text-[#25E2CC] transition-colors" aria-hidden="true" />
                </div>

                <blockquote className="text-sm text-gray-300 leading-relaxed italic">
                  &ldquo;Without E-GEAD&apos;s sub-24h fulfillment, our TikTok Shop account would have been suspended in November. They didn&apos;t just fulfill orders—they saved our entire company.&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="font-bold text-white text-base">Marcus Vance</div>
                <div className="text-xs text-[#25E2CC] font-mono mt-0.5">Founder, UrbanVibe Apparel (US)</div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
                  <span>Verified Top 500 TikTok Shop US Seller</span>
                </div>
              </div>
            </div>

            {/* Voice 2: Elena Rostova */}
            <div className="flex flex-col justify-between p-8 rounded-3xl bg-[#141718] border border-white/10 hover:border-[#25E2CC]/40 transition-all duration-300 relative group shadow-xl">
              <div>
                {/* Media badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-[11px] font-mono text-cyan-300 font-semibold">
                    <Video className="w-3.5 h-3.5" aria-hidden="true" />
                    Video Case · 2m 04s
                  </span>
                  <Quote className="w-5 h-5 text-gray-600 group-hover:text-[#25E2CC] transition-colors" aria-hidden="true" />
                </div>

                <blockquote className="text-sm text-gray-300 leading-relaxed italic">
                  &ldquo;Syncing stock across Etsy and Amazon was our worst daily headache. Eweb-platform automated everything. We haven&apos;t opened an inventory spreadsheet in 8 months.&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="font-bold text-white text-base">Elena Rostova</div>
                <div className="text-xs text-[#25E2CC] font-mono mt-0.5">Head of Operations, HomeCraft Studio</div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
                  <span>Verified Merchant · 1,500+ Active SKUs</span>
                </div>
              </div>
            </div>

            {/* Voice 3: David Nguyen */}
            <div className="flex flex-col justify-between p-8 rounded-3xl bg-[#141718] border border-white/10 hover:border-[#25E2CC]/40 transition-all duration-300 relative group shadow-xl">
              <div>
                {/* Media badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25E2CC]/10 border border-[#25E2CC]/25 text-[11px] font-mono text-[#25E2CC] font-semibold">
                    <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Audio Recording · 1m 45s
                  </span>
                  <Quote className="w-5 h-5 text-gray-600 group-hover:text-[#25E2CC] transition-colors" aria-hidden="true" />
                </div>

                <blockquote className="text-sm text-gray-300 leading-relaxed italic">
                  &ldquo;Scaling ads past $5,000/day used to terrify us because our old print partner couldn&apos;t keep up. With E-GEAD&apos;s $6 all-in rate and 24h capacity, we scaled to $25,000/day with complete confidence.&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="font-bold text-white text-base">David Nguyen</div>
                <div className="text-xs text-[#25E2CC] font-mono mt-0.5">Co-Founder, Lumina DTC Brand</div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
                  <span>Verified DTC Brand · $1.8M GMV</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: Operational Playbooks & Strategy Breakdowns */}
      <section 
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28"
        aria-label="Operational Playbooks Section"
      >
        <PlaybookDownloads />
      </section>

      {/* SECTION 9: Case Studies & Partnership FAQ Accordion */}
      <section 
        id="case-studies-faq"
        role="region"
        aria-label="Case Studies and Partnership FAQ"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="w-full">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our case study verification, onboarding timeline, and performance guarantees."
          />
        </div>
      </section>

      {/* SECTION 10: High-Conversion Growth Audit Booking CTA */}
      <section 
        id="work-cta"
        role="region"
        aria-label="Book Operations Growth Audit"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 scroll-mt-28"
      >
        <div className="w-full">
          <div className="rounded-[36px] bg-gradient-to-br from-[#1A2224] via-[#141718] to-[#0A0D0E] border border-[#25E2CC]/40 p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden">
            <div 
              aria-hidden="true" 
              className="absolute top-0 right-0 w-80 h-80 bg-[#25E2CC]/15 rounded-full blur-3xl pointer-events-none" 
            />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-normal text-[#d3f9f5] mb-6 font-montserrat">
                <Calendar className="w-4 h-4 text-[#7ceee0]" aria-hidden="true" />
                Free 30-Minute Confidential Strategy Session
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-medium text-[#d3f9f5] font-montserrat tracking-tight leading-[1.15]">
                Ready to Write Your Own <br />
                <span className="text-[#7ceee0] font-medium">Growth Story?</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
                Schedule a confidential 30-minute operations audit with our senior solutions engineers. We will analyze your current fulfillment bottlenecks, calculate your exact unit economics savings, and map out a sub-24h scaling roadmap.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#7ceee0] text-black font-medium text-sm sm:text-base font-montserrat hover:bg-[#68d8ca] transition duration-300"
                >
                  <span>Claim Your Free Operations Audit</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  href="/services/all-services"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#141718] border border-white/20 text-[#d3f9f5] font-medium text-sm sm:text-base font-montserrat hover:border-[#7ceee0] hover:text-[#7ceee0] transition duration-300"
                >
                  <span>Explore Technical Documentation</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                  <span>100% Strict Mutual NDA Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                  <span>No Setup Fees or Retainers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                  <span>Custom Unit Economics Model Provided</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Conversion Contact Block */}
      <div id="contact" className="scroll-mt-28">
        <ContactBlock />
      </div>

    </div>
  );
}
