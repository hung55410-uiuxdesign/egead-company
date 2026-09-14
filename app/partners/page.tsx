import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Truck,
  Headphones,
  Zap,
  Globe2,
} from 'lucide-react';
import {
  BentoGrid,
  MetricsRibbon,
  FaqAccordion,
  EcosystemMatrix,
  IntegrationBridgeVisualizer,
  EcosystemHeroGraphic,
} from '@/components/sections';
import type { BentoItem, MetricItem, FaqItem } from '@/components/sections';
import ContactBlock from '@/components/ContactBlock';

export const metadata: Metadata = {
  title: 'Strategic Partners & Global Commerce Ecosystem | E-GEAD',
  description:
    'Explore the E-GEAD technical integration ecosystem. Direct programmatic connections with TikTok Shop US, Amazon SP-API, Shopify Plus, USPS Commercial Carrier Network, Meta CAPI, and Stripe.',
  keywords: [
    'ecommerce marketplace integrations',
    'tiktok shop api partner',
    'amazon sp-api integration',
    'shopify pod fulfillment partner',
    'usps commercial shipping partner',
    'omnichannel ecommerce integrations',
    'print on demand api partners',
    'cross border commerce alliances',
  ],
};

const THROUGHPUT_METRICS: MetricItem[] = [
  {
    value: '< 120ms',
    label: 'API Response Latency',
    trend: 'Real-Time Programmatic Ingestion',
  },
  {
    value: '10,000,000+',
    label: 'Monthly Webhook Events',
    trend: 'Zero Data Loss Architecture',
  },
  {
    value: '100%',
    label: 'OAuth 2.0 Compliance',
    trend: 'Bank-Grade AES-256 Encryption',
  },
  {
    value: '99.9%',
    label: 'Carrier Scan Rate',
    trend: 'Guaranteed Origin USPS Handoff',
  },
];

const CERTIFIED_BENTO_ITEMS: BentoItem[] = [
  {
    id: 'certified-tiktok',
    title: 'TikTok Shop US: Certified Fast Dispatch Partner',
    description:
      'Direct programmatic two-way integration via TikTok Shop Open API. Automates tracking number dispatch within 12–24 hours, preserving the prestigious Fast Dispatch badge and keeping Late Dispatch Rate (LDR) consistently below 1%.',
    colSpan: 2,
    rowSpan: 1,
    tag: 'Official API Partner',
    stats: {
      value: 'Sub-24h SLA',
      label: 'Fast Dispatch Shield',
    },
    ctaText: 'Explore TikTok Integration',
    ctaHref: '#partners-cta',
  },
  {
    id: 'certified-amazon',
    title: 'Amazon Selling Partner API (SP-API Certified)',
    description:
      'Real-time multi-channel inventory buffer synchronization, automated FBM order dispatch, and 100% Valid Tracking Rate (VTR) protection across American marketplaces.',
    colSpan: 1,
    rowSpan: 1,
    tag: 'SP-API Certified',
    stats: {
      value: '99.9% VTR',
      label: 'Zero Stockout Cancellations',
    },
    ctaText: 'View SP-API Specs',
    ctaHref: '#partners-cta',
  },
  {
    id: 'certified-etsy-ebay',
    title: 'Etsy & eBay: Multi-Variant Catalog Bridge',
    description:
      'Automatic parsing of complex bespoke order attributes (custom size, personalized text, graphic layers) routed directly into industrial 23-inch DTF printing queues at a fixed $6 all-in rate.',
    colSpan: 1,
    rowSpan: 1,
    tag: 'Catalog Bridge',
    stats: {
      value: '1,500+ SKUs',
      label: 'Multi-Variant Auto-Map',
    },
    ctaText: 'Learn More',
    ctaHref: '#partners-cta',
  },
  {
    id: 'certified-shopify',
    title: 'Shopify & Shopify Plus: Verified App Infrastructure',
    description:
      'One-click installation via Shopify App Store. Listens to native orders/create webhooks, updates item fulfillment status instantaneously, and synchronizes blank inventory across US warehouses.',
    colSpan: 2,
    rowSpan: 1,
    tag: 'Verified App',
    stats: {
      value: '< 340ms',
      label: 'Webhook Reaction Speed',
    },
    ctaText: 'Install Shopify Bridge',
    ctaHref: '#partners-cta',
  },
  {
    id: 'certified-usps',
    title: 'USPS Commercial Plus Carrier Network',
    description:
      'Direct carrier manifest integration with origin post office hubs. Unlocks deeply negotiated enterprise postage discounts for USPS Ground Advantage and Priority Mail, saving $1.50–$3.00 per package.',
    colSpan: 2,
    rowSpan: 1,
    tag: 'National Carrier Alliance',
    stats: {
      value: 'Save $1.50-$3.00',
      label: 'Per Package Commercial Rate',
    },
    ctaText: 'View Postal Savings',
    ctaHref: '#partners-cta',
  },
  {
    id: 'certified-meta-google',
    title: 'Meta & Google Growth Alliances',
    description:
      'Server-side Conversions API (CAPI) and Google Enhanced Conversions integration. Bypasses browser ad-blockers and iOS restrictions to feed high-intent conversion data into AI bidding models.',
    colSpan: 1,
    rowSpan: 1,
    tag: 'Growth Partner',
    stats: {
      value: '4.8x ROAS',
      label: 'Blended Ad Efficiency',
    },
    ctaText: 'Scale Ad Spend',
    ctaHref: '#partners-cta',
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Does E-GEAD share or sell our store customer data?',
    answer:
      'Strictly no. E-GEAD adheres to strict mutual non-disclosure agreements (NDAs) and complies fully with SOC2 Type II, GDPR, and CCPA data privacy frameworks. Customer shipping details are processed solely for printing, packaging, and carrier delivery verification.',
  },
  {
    question: 'How long does it take to connect a new TikTok Shop or Shopify store?',
    answer:
      'Connecting a new storefront takes less than 5 minutes through our secure OAuth 2.0 authorization interface. Once approved, webhook endpoints activate instantaneously, allowing test orders to route in minutes.',
  },
  {
    question: 'Can we connect multiple stores from different platforms to one E-GEAD account?',
    answer:
      'Yes. Our multi-tenant architecture allows you to connect an unlimited number of TikTok Shop, Amazon, Etsy, and Shopify stores into a single centralized Eweb-platform dashboard with unified inventory buffers and margin reconciliation.',
  },
  {
    question: 'What happens if a marketplace API experiences unexpected downtime?',
    answer:
      'E-GEAD employs an enterprise event retry queue with Exponential Backoff and dead-letter queue (DLQ) safeguards. Ingestion events are securely buffered in Redis memory, ensuring zero dropped orders or missed tracking updates during third-party outages.',
  },
  {
    question: 'Are there any ongoing API connection fees or hidden platform surcharges?',
    answer:
      'No. Standard marketplace and storefront integrations are completely free with zero ongoing monthly API connection fees. You only pay for manufacturing base costs and postage with our transparent $6 all-in pricing structure.',
  },
];

export default function PartnersPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36">
      
      {/* SECTION 1: Ecosystem Hero & Global Alliances Statement */}
      <section
        id="partners-hero"
        role="region"
        aria-label="Partners Ecosystem Hero"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28 scroll-mt-28"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Headline & Positioning */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25E2CC]/10 border border-[#25E2CC]/30 text-[#25E2CC] text-xs font-mono font-semibold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Global Commerce Alliances 2026
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6">
                Integrated with the World&apos;s <br />
                <span className="text-[#25E2CC]">Leading Commerce Ecosystems.</span>
              </h1>

              <p className="text-base sm:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl mb-8">
                E-GEAD bridges your business directly with the world&apos;s most powerful marketplaces, storefront technologies, advertising platforms, and national logistics networks. Seamless, secure, and fully automated operations from day one.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#ecosystem-matrix"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#25E2CC] text-black font-bold text-sm hover:bg-[#7ceee0] transition-all duration-300 shadow-lg shadow-[#25E2CC]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]"
                >
                  <span>Explore Partner Matrix</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#partners-cta"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]"
                >
                  <span>Become an Ecosystem Partner</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Topology Card */}
            <div className="lg:col-span-5">
              <EcosystemHeroGraphic />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: Real-Time API Integration Throughput Ticker */}
      <section
        id="api-throughput"
        role="region"
        aria-label="Real-Time API Integration Throughput"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="max-w-6xl mx-auto">
          <MetricsRibbon
            id="throughput-ribbon"
            badge="High-Availability Telemetry"
            title="Real-Time API Integration Throughput"
            subtitle="Our resilient microservices mesh processes millions of mission-critical orders, inventory syncs, and tracking updates with sub-second precision."
            metrics={THROUGHPUT_METRICS}
          />
        </div>
      </section>

      {/* SECTION 3: 5-Tier Categorized Ecosystem Matrix */}
      <section
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28"
        aria-label="5-Tier Ecosystem Matrix Section"
      >
        <div className="max-w-6xl mx-auto">
          <EcosystemMatrix />
        </div>
      </section>

      {/* SECTION 4: Deep Integration & Certified Status Showcase */}
      <section
        id="certified-showcase"
        role="region"
        aria-label="Deep Integration & Certified Status Showcase"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="max-w-6xl mx-auto">
          <BentoGrid
            badge="Official Technical Certifications"
            title="Deep Programmatic Integrations & Certified Status"
            description="We build directly against official platform developer APIs and commercial carrier specifications, giving your business guaranteed SLA safety and technical resilience."
            items={CERTIFIED_BENTO_ITEMS}
          />
        </div>
      </section>

      {/* SECTION 5: The E-GEAD Technical Integration Bridge Architecture */}
      <section
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28"
        aria-label="Technical Integration Bridge Architecture Section"
      >
        <div className="max-w-6xl mx-auto">
          <IntegrationBridgeVisualizer />
        </div>
      </section>

      {/* SECTION 6: Exclusive Merchant Advantages from Our Alliances */}
      <section
        id="merchant-advantages"
        role="region"
        aria-label="Exclusive Merchant Advantages"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#25E2CC] block mb-2 font-semibold">
                Strategic Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Exclusive Advantages from Our Alliances
              </h2>
            </div>
            <p className="text-sm text-gray-400 max-w-md font-normal leading-relaxed">
              Selling through E-GEAD unlocks institutional advantages and cost structures individual merchants cannot negotiate on their own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Benefit 1 */}
            <div className="p-8 rounded-3xl bg-[#141718] border border-white/10 hover:border-[#25E2CC]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#25E2CC]/10 border border-[#25E2CC]/25 flex items-center justify-center text-[#25E2CC] mb-6 group-hover:scale-105 transition-transform motion-reduce:transform-none">
                  <Truck className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#25E2CC] transition-colors">
                  Commercial Postage Discounts
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  Save between <span className="text-[#25E2CC] font-bold font-mono">$1.50 and $3.00</span> on every US parcel. Benefit from E-GEAD&apos;s aggregated multi-million package volume contracts with USPS Ground Advantage and UPS Express.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-gray-500">
                Direct Origin Manifest Rates
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="p-8 rounded-3xl bg-[#141718] border border-white/10 hover:border-[#25E2CC]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#25E2CC]/10 border border-[#25E2CC]/25 flex items-center justify-center text-[#25E2CC] mb-6 group-hover:scale-105 transition-transform motion-reduce:transform-none">
                  <Headphones className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#25E2CC] transition-colors">
                  Priority Policy Escalation
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  Enjoy direct engineering and account health escalation desks with TikTok Shop US and Amazon Seller Central. Rapidly resolve algorithmic false positives and preserve seller privileges.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-gray-500">
                Dedicated Partner Support Desks
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="p-8 rounded-3xl bg-[#141718] border border-white/10 hover:border-[#25E2CC]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#25E2CC]/10 border border-[#25E2CC]/25 flex items-center justify-center text-[#25E2CC] mb-6 group-hover:scale-105 transition-transform motion-reduce:transform-none">
                  <Zap className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#25E2CC] transition-colors">
                  Early Access Alpha APIs
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  Access cutting-edge platform capabilities before public release: TikTok Live automated order ingestion, Amazon Custom direct print APIs, and Meta Instant Checkout social triggers.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-gray-500">
                Quarterly Alpha Testing Cohorts
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: Partner Co-Innovation & Success Stories */}
      <section
        id="partner-stories"
        role="region"
        aria-label="Partner Co-Innovation and Success Stories"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[36px] bg-[#141718] border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div 
              aria-hidden="true" 
              className="absolute -top-32 -right-32 w-96 h-96 bg-[#25E2CC]/10 rounded-full blur-3xl pointer-events-none" 
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Quote Content (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25E2CC]/10 border border-[#25E2CC]/25 text-[#25E2CC] text-xs font-mono font-medium uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  Carrier Co-Innovation Spotlight
                </div>

                <blockquote className="text-lg sm:text-xl text-gray-200 font-normal leading-relaxed italic">
                  &ldquo;E-GEAD&apos;s high-speed barcode manifest scanning ensures that thousands of packages enter our sortation facilities perfectly organized and 100% compliant with origin scan windows. They set the benchmark for modern cross-border fulfillment efficiency.&rdquo;
                </blockquote>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-bold text-white text-base">Marcus Sterling</div>
                  <div className="text-xs text-[#25E2CC] font-mono mt-0.5">
                    Director of Carrier Alliances, North American Postal Network
                  </div>
                  <div className="text-xs text-gray-500 font-mono mt-2 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
                    <span>Handling 500,000+ Verified Scans Per Quarter</span>
                  </div>
                </div>
              </div>

              {/* Right Carrier Stat Box (4 cols) */}
              <div className="lg:col-span-4 flex flex-col space-y-4">
                <div className="p-6 rounded-2xl bg-[#0A0D0E] border border-white/10">
                  <span className="text-[11px] font-mono text-gray-400 uppercase block">USPS Scan Compliance</span>
                  <span className="text-3xl sm:text-4xl font-mono font-black text-[#25E2CC] mt-1 block">
                    99.8%
                  </span>
                  <p className="text-xs text-gray-400 mt-2">
                    Packages receive an origin carrier induction scan within 24 hours of printing.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A0D0E] border border-white/10">
                  <span className="text-[11px] font-mono text-gray-400 uppercase block">Transit Time Average</span>
                  <span className="text-3xl sm:text-4xl font-mono font-black text-white mt-1 block">
                    2.8 Days
                  </span>
                  <p className="text-xs text-gray-400 mt-2">
                    Average domestic delivery window across US Postal Zones 1 through 8.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Integration & Ecosystem FAQ Accordion */}
      <section
        id="partners-faq"
        role="region"
        aria-label="Partnership and Integration FAQ"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="max-w-4xl mx-auto">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Ecosystem &amp; Integration FAQs"
            subtitle="Common questions regarding API security, onboarding speeds, multi-tenant store setups, and technical specifications."
          />
        </div>
      </section>

      {/* SECTION 9: High-Velocity Alliance CTA: Join the Ecosystem */}
      <section
        id="partners-cta"
        role="region"
        aria-label="Join the E-GEAD Ecosystem"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 scroll-mt-28"
      >
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[36px] bg-gradient-to-br from-[#1A2224] via-[#141718] to-[#0A0D0E] border border-[#25E2CC]/40 p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden">
            <div 
              aria-hidden="true" 
              className="absolute top-0 right-0 w-80 h-80 bg-[#25E2CC]/15 rounded-full blur-3xl pointer-events-none" 
            />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25E2CC]/10 border border-[#25E2CC]/30 text-[#25E2CC] text-xs font-mono font-semibold uppercase tracking-widest mb-6">
                <Globe2 className="w-3.5 h-3.5" aria-hidden="true" />
                Alliance Partnership Program
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Expand Your Reach Within the <br />
                <span className="text-[#25E2CC]">E-GEAD Global Network.</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
                Are you a software vendor, logistics provider, blank apparel manufacturer, or marketplace platform? Partner with E-GEAD to deliver unprecedented operational velocity to thousands of high-growth global e-commerce merchants.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25E2CC] text-black font-bold text-sm hover:bg-[#7ceee0] transition-all duration-300 shadow-xl shadow-[#25E2CC]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]"
                >
                  <span>Apply for Technology Partnership</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  href="/services/all-services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]"
                >
                  <span>Access Developer Sandbox</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                  <span>Open API 3.1 &amp; Webhook Standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                  <span>Free Sandbox Testing Environment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                  <span>Dedicated Developer Technical Support</span>
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
