import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity,
  Cpu,
  Lock,
  Boxes,
  Barcode,
  Scale,
  Globe2,
  ExternalLink,
  CloudLightning,
} from 'lucide-react';
import {
  BentoGrid,
  MetricsRibbon,
  ComparisonTable,
  CockpitHudCard,
  InventoryBufferEngine,
  NetMarginLedger,
  BusinessRulesBuilder,
} from '@/components/sections';
import type { BentoItem, MetricItem, ComparisonRow } from '@/components/sections';
import ContactBlock from '@/components/ContactBlock';

export const metadata: Metadata = {
  title: 'Eweb-platform | Unified Operations Cockpit & Margin Control | E-GEAD',
  description:
    'Eweb-platform connects every online storefront, warehouse WMS node, and financial settlement stream into a unified operations cockpit. Eliminate manual spreadsheets, prevent stockout cancellations, and monitor net margins in real time.',
  keywords: [
    'multi-channel ecommerce management platform',
    'real time inventory sync',
    'ecommerce operations cockpit',
    'automated margin reconciliation',
    'warehouse WMS automation',
    'TikTok Shop inventory sync',
    'Amazon FBM inventory bridge',
    'omnichannel order management system',
  ],
};

// Section 2: Metrics Data
const platformMetrics: MetricItem[] = [
  {
    value: '< 1.2s',
    label: 'Real-Time Sync Latency',
    trend: 'Sub-Second',
    description: 'Instant two-way quantity broadcast across all connected sales channels.',
  },
  {
    value: '0%',
    label: 'Overselling Incidents',
    trend: 'Zero-Defect',
    description: 'Automated safety stock buffer shields stores from stockout penalties.',
  },
  {
    value: '15+ Hrs',
    label: 'Saved Weekly on Sheets',
    trend: 'Automated',
    description: 'Eliminates error-prone Excel formulas, VLOOKUP scripts, and manual P&L reconciliation.',
  },
  {
    value: '99.99%',
    label: 'High-Availability Uptime',
    trend: 'Enterprise SLA',
    description: 'Continuous cloud resilience during viral TikTok surges and Black Friday peaks.',
  },
];

// Section 3: Comparison Rows
const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Multi-Channel Order Ingestion',
    egead: 'Centralized live stream across Amazon, TikTok Shop, Etsy, and Shopify in < 1 second',
    traditional: 'Fragmented manual logins across 5+ seller portals with delayed notification updates',
  },
  {
    feature: 'Inventory Sync & Allocation',
    egead: 'Bi-directional 800ms synchronization with intelligent Dynamic Safety Stock Buffer',
    traditional: 'Batch sync 1-2 times daily, frequently resulting in costly overselling cancellations',
  },
  {
    feature: 'WMS Warehouse Routing',
    egead: '6-station optical barcode verification with 99.9% pick-pack-ship accuracy',
    traditional: 'Manual paper pick lists, unverified bin picking, and frequent mismatched garment errors',
  },
  {
    feature: 'Financial Ledger & P&L',
    egead: 'Real-time per-SKU net profit calculation deducting blank, print, postage, and ad CPA',
    traditional: 'Messy end-of-month spreadsheets with delayed estimates and undetected negative-margin items',
  },
  {
    feature: 'Exception & Rule Automation',
    egead: 'Visual If-This-Then-That workflow engine for instant address correction and VIP upgrades',
    traditional: 'Manual email checks, delayed customer outreach, and costly Return-to-Sender packages',
  },
];

// Section 4: Bento Grid Items
const bentoItems: BentoItem[] = [
  {
    id: 'bento-queue',
    title: 'Live Global Order Queue',
    description:
      'Aggregates incoming orders from TikTok Shop, Amazon FBM, Etsy, and Shopify into a unified stream with real-time status filtering and priority flags.',
    tag: 'Core Engine',
    colSpan: 2,
    rowSpan: 2,
    visual: (
      <div className="p-4 rounded-2xl bg-[#0A0D0E]/90 border border-[#262C30] space-y-2.5 font-montserrat text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#262C30] text-[11px] text-[#8C8C8C]">
          <span className="text-[#10E774] font-bold">LIVE DISPATCH INGESTION</span>
          <span>4 Channels Active</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#141718] border border-[#262C30]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10E774]" />
            <span className="text-white font-bold">#TTS-982410</span>
          </div>
          <span className="text-[#8C8C8C]">Gildan 5000 (Black/L)</span>
          <span className="text-emerald-400 font-bold">Printing</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#141718] border border-[#262C30]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-white font-bold">#AMZ-419082</span>
          </div>
          <span className="text-[#8C8C8C]">Comfort Colors (XL)</span>
          <span className="text-[#10E774] font-bold">Queued</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#141718] border border-[#262C30]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span className="text-white font-bold">#ET-882103</span>
          </div>
          <span className="text-[#8C8C8C]">Bella+Canvas 3001</span>
          <span className="text-purple-400 font-bold">QC Passed</span>
        </div>
      </div>
    ),
  },
  {
    id: 'bento-inventory',
    title: 'Bi-Directional Inventory Bridge',
    description:
      'Continuous two-way synchronization connects US warehouse blanks directly to storefront stock counts in 800ms.',
    tag: 'Real-Time Sync',
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'bento-fraud',
    title: 'Automated Fraud & Address Intercept',
    description:
      'Built-in USPS CASS verification flags incomplete unit numbers and invalid addresses before orders enter manufacturing.',
    tag: 'Risk Mitigation',
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'bento-carrier',
    title: 'Instant Multi-Carrier Dispatch Console',
    description:
      'Algorithmically selects the optimal carrier (USPS Ground Advantage, UPS Ground, FedEx 2Day) based on destination zone and SLA deadline, cutting average shipping costs by 18%.',
    tag: 'Postage Rate Shopping',
    colSpan: 2,
    rowSpan: 1,
  },
];

// Section 6: WMS Feature Cards
const wmsFeatures = [
  {
    icon: <Barcode className="w-6 h-6 text-[#10E774]" aria-hidden="true" />,
    title: 'Barcode Receiving & Blank Auditing',
    description:
      'Every inbound carton of blanks is optically scanned upon arrival. Items are verified against manufacturer manifests and assigned to dedicated shelf bin locations with live RFID and barcode checkpoints.',
    tag: 'Station 1 & 2',
  },
  {
    icon: <Boxes className="w-6 h-6 text-[#10E774]" aria-hidden="true" />,
    title: 'Pick-to-Light & Smart Roll Batching',
    description:
      'Orders are algorithmically clustered by artwork dimensions, garment color, and size. Automated ganging software arranges prints on 23-inch rolls to minimize film waste and optimize printer throughput by 40%.',
    tag: 'Station 3 & 4',
  },
  {
    icon: <Scale className="w-6 h-6 text-[#10E774]" aria-hidden="true" />,
    title: 'Optical QC Scan & Automated Weighing',
    description:
      'Before poly-mailer sealing, packages undergo optical barcode inspection and inline digital weight checks. Any variance over 10g automatically routes the parcel to manual review, eliminating size-mismatch shipments.',
    tag: 'Station 5 & 6',
  },
];

// Section 9: Security Standards
const securityStandards = [
  {
    icon: <Lock className="w-6 h-6 text-[#10E774]" aria-hidden="true" />,
    title: 'End-to-End TLS 1.3 & AES-256 Encryption',
    description:
      'Customer PII, shipping addresses, and transaction keys are encrypted in transit and at rest, meeting strict GDPR and California CCPA standards.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#10E774]" aria-hidden="true" />,
    title: 'Cloudflare Enterprise DDoS Shield',
    description:
      'Continuous edge firewall filtering neutralizes malicious bot networks, scraper rings, and layer-7 denial of service attempts with zero latency impact.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-[#10E774]" aria-hidden="true" />,
    title: 'Granular Role-Based Access Control (RBAC)',
    description:
      'Assign precise permission tiers across warehouse technicians, customer support agents, and finance controllers to safeguard sensitive ledger data.',
  },
  {
    icon: <CloudLightning className="w-6 h-6 text-[#10E774]" aria-hidden="true" />,
    title: 'Automated Multi-Region Disaster Recovery',
    description:
      'Continuous database snapshotting every 15 minutes across geographically redundant US cloud hubs ensures zero data loss during regional outages.',
  },
];

// Section 10: Integrations
const integrations = [
  {
    name: 'TikTok Shop US',
    category: 'Marketplace',
    latency: '18ms API Sync',
    status: 'Native Partner',
    desc: 'Two-way order ingestion, tracking push, and LDR policy guardian.',
  },
  {
    name: 'Amazon FBM',
    category: 'Marketplace',
    latency: '42ms SP-API',
    status: 'Certified SP-API',
    desc: 'Prime-compliant order dispatch and automated VTR tracking verification.',
  },
  {
    name: 'Etsy Global',
    category: 'Marketplace',
    latency: '35ms Direct API',
    status: 'OAuth 2.0 Direct',
    desc: 'Instant catalog synchronization and automated buyer shipping updates.',
  },
  {
    name: 'Shopify & Shopify Plus',
    category: 'DTC Platform',
    latency: '12ms Webhook',
    status: '1-Click App',
    desc: 'Real-time order webhook listening, live stock sync, and multi-location routing.',
  },
  {
    name: 'WooCommerce',
    category: 'DTC Platform',
    latency: '28ms REST API',
    status: 'Direct Plugin',
    desc: 'Automated order ingestion and tracking upload for WordPress storefronts.',
  },
  {
    name: 'eBay Marketplace',
    category: 'Marketplace',
    latency: '45ms Trading API',
    status: 'Full Integration',
    desc: 'High-volume order pulling with automated origin tracking scan generation.',
  },
  {
    name: 'Walmart Marketplace',
    category: 'Marketplace',
    latency: '55ms Bridge',
    status: 'Certified Bridge',
    desc: 'High-volume seller compliant inventory bridge and 2-day delivery tagging.',
  },
  {
    name: 'Stripe & Regional Gateways',
    category: 'Fintech & P&L',
    latency: '15ms Settlement',
    status: 'Direct Ledger',
    desc: 'Real-time payout settlement reconciliation and dispute notification tracking.',
  },
];

export default function SmartCommercePage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-24 sm:pt-28">
      {/* SECTION 1: Enterprise Cockpit Hero with Real-Time Data HUD */}
      <section
        id="platform-hero"
        className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-[#262C30]"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-normal text-[#D4FAE6] font-montserrat">
                <Activity className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
                Centralized Commerce OS
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-medium text-[#D4FAE6] font-montserrat leading-[1.08]">
                Eweb-platform: Unified Operations.{' '}
                <span className="text-[#5EFC8D] font-medium">Master Multi-Channel Margins.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-xl">
                Connect every storefront, warehouse fulfillment node, and financial settlement stream into a single high-velocity operations cockpit. Eliminate manual spreadsheets, prevent stockout cancellations, and monitor net profit margins in real time.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="#financial-ledger"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#5EFC8D] text-black font-medium text-sm sm:text-base font-montserrat hover:bg-[#4ee37e] transition duration-300"
                >
                  <span>Explore Cockpit Demo</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href="#platform-integrations"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#141718] border border-white/20 text-[#D4FAE6] font-medium text-sm sm:text-base font-montserrat hover:border-[#5EFC8D] hover:text-[#5EFC8D] transition duration-300"
                >
                  <span>View Integration Hub</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8C8C8C]" aria-hidden="true" />
                </Link>
              </div>

              {/* Live Status Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#8C8C8C] font-montserrat border-t border-[#262C30]/80">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live 2-Way Sync
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                  Zero-Overselling Guarantee
                </span>
                <span className="flex items-center gap-2 font-montserrat">
                  SLA Uptime: 99.99%
                </span>
              </div>
            </div>

            {/* Right HUD Card */}
            <div className="lg:col-span-6">
              <CockpitHudCard />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Core Platform Performance Metrics Bar */}
      <MetricsRibbon
        id="platform-metrics"
        badge="Performance Architecture"
        title="Engineered for Extreme Multi-Channel Velocity"
        subtitle="Process tens of thousands of orders daily across disparate retail platforms without latency, desynchronization, or accounting discrepancies."
        metrics={platformMetrics}
      />

      {/* SECTION 3: The Omnichannel Chaos vs Unified Cockpit Matrix */}
      <ComparisonTable
        id="omnichannel-chaos"
        badge="Operational Benchmark"
        title={
          <>
            The Disconnected Nightmare vs{' '}
            <span className="text-[#10E774]">The Unified Cockpit Standard</span>
          </>
        }
        subtitle="Compare traditional fragmented operations against Eweb-platform centralized, automated architecture."
        egeadTitle="Eweb-platform Cockpit"
        egeadSubtitle="Unified Real-Time Architecture"
        traditionalTitle="Legacy Fragmented Stack"
        traditionalSubtitle="Manual Excel & Disconnected Apps"
        rows={comparisonRows}
      />

      {/* SECTION 4: Central Operations Cockpit Bento Grid Architecture */}
      <BentoGrid
        id="cockpit-bento-grid"
        badge="Platform Pillars"
        title={
          <>
            Complete Operational Mastery in{' '}
            <span className="text-[#10E774]">Four Intelligent Modules</span>
          </>
        }
        description="Explore the four core technological pillars that eliminate operational friction and accelerate order throughput."
        items={bentoItems}
      />

      {/* SECTION 5: Multi-Channel Real-Time Inventory & Safety Buffer Engine */}
      <InventoryBufferEngine id="inventory-buffer-engine" />

      {/* SECTION 6: Barcode-Verified WMS & Warehouse Automation Module */}
      <section
        id="wms-automation-module"
        className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white border-t border-[#262C30]"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center justify-center gap-2">
              <Barcode className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
              WMS Fulfillment Protocol
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
              Barcode-Verified WMS &amp; <span className="text-[#5EFC8D] font-medium">Warehouse Automation</span>
            </h2>
            <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] leading-[1.75] font-light font-montserrat max-w-2xl mx-auto">
              Whether fulfilling from your own warehouse or leveraging E-GEAD US facilities, our digitized barcode checkpoints guarantee 99.9% inventory precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {wmsFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="rounded-[28px] bg-[#141718]/90 border border-[#262C30] p-7 sm:p-8 flex flex-col justify-between hover:border-[#5EFC8D]/40 transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#1D2224] border border-[#262C30] flex items-center justify-center text-[#5EFC8D] group-hover:scale-105 transition-transform">
                      {feat.icon}
                    </div>
                    <span className="text-[10px] font-montserrat font-medium bg-[#5EFC8D]/10 text-[#5EFC8D] px-2.5 py-1 rounded border border-[#5EFC8D]/20">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium text-[#D4FAE6] font-montserrat mb-3 group-hover:text-[#5EFC8D] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#b3b3b3] font-light font-montserrat leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#262C30] flex items-center gap-2 text-xs font-montserrat text-[#10E774]">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>Verified 99.9% Accuracy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Automated Net Margin & Financial Reconciliation Ledger */}
      <NetMarginLedger id="financial-ledger" />

      {/* SECTION 8: Intelligent Business Rules & Exception Handling Builder */}
      <BusinessRulesBuilder id="rules-engine" />

      {/* SECTION 9: Enterprise Cloud Resilience & Security Standards */}
      <section
        id="cloud-security"
        className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white border-t border-[#262C30]"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
              Zero-Trust Architecture
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
              Enterprise Cloud Resilience &amp; <span className="text-[#5EFC8D] font-medium">Security Standards</span>
            </h2>
            <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] leading-[1.75] font-light font-montserrat max-w-2xl mx-auto">
              Built on battle-tested AWS and Cloudflare Edge infrastructure. Engineered to withstand hyper-scale traffic bursts while guarding sensitive merchant financial records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityStandards.map((sec, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-[26px] bg-[#141718]/90 border border-[#262C30] hover:border-[#5EFC8D]/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1D2224] border border-[#262C30] flex items-center justify-center text-[#5EFC8D] mb-5 group-hover:scale-105 transition-transform">
                  {sec.icon}
                </div>
                <h3 className="text-base sm:text-lg font-medium text-[#D4FAE6] font-montserrat mb-2 group-hover:text-[#5EFC8D] transition-colors">
                  {sec.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#b3b3b3] font-light font-montserrat leading-relaxed">
                  {sec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: Seamless Native Platform Integrations Ecosystem */}
      <section
        id="platform-integrations"
        className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white border-t border-[#262C30]"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center justify-center gap-2">
              <Globe2 className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
              Native Connector Hub
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
              Seamless Native Platform <span className="text-[#5EFC8D] font-medium">Integrations Ecosystem</span>
            </h2>
            <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] leading-[1.75] font-light font-montserrat max-w-2xl mx-auto">
              Direct, pre-built API connectors to the world&apos;s leading e-commerce marketplaces and commerce platforms. Connect your stores in under 15 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                title={`${item.name} - ${item.status}`}
                className="p-6 rounded-2xl bg-[#141718]/90 border border-[#262C30] hover:border-[#5EFC8D]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262C30]">
                    <span className="text-[10px] font-montserrat text-[#b3b3b3]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-montserrat font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.latency}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-medium text-[#D4FAE6] font-montserrat mb-1 group-hover:text-[#5EFC8D] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs font-montserrat text-[#5EFC8D] block mb-2 font-normal">
                    {item.status}
                  </span>

                  <p className="text-xs text-[#b3b3b3] font-light font-montserrat leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#262C30] flex items-center justify-between text-[11px] font-montserrat text-[#8C8C8C]">
                  <span>2-Way Live Sync</span>
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: High-Velocity Conversion CTA: Launch Your Cockpit */}
      <section
        id="platform-cta"
        className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white border-t border-[#262C30]"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16">
          <div className="relative rounded-[36px] bg-gradient-to-b from-[#141718] to-[#0A0D0E] border border-[#10E774]/40 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_0_80px_rgba(16, 231, 116, 0.15)] text-center">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#10E774]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] font-montserrat mb-4 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
                14-Day Risk-Free Sandbox
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#D4FAE6] font-montserrat leading-[1.15]">
                Take Full Control of Your E-Commerce{' '}
                <span className="text-[#5EFC8D] font-medium">Operations Velocity Today.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#b3b3b3] leading-[1.75] font-light font-montserrat max-w-2xl mx-auto">
                Start your 14-day free operations trial. Seamlessly migrate your store catalog and order history in less than 30 minutes with our dedicated onboarding engineering team.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-[#5EFC8D] text-black font-medium text-sm sm:text-base font-montserrat hover:bg-[#4ee37e] transition duration-300"
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-[#141718] border border-white/20 text-[#D4FAE6] font-medium text-sm sm:text-base font-montserrat hover:border-[#5EFC8D] hover:text-[#5EFC8D] transition duration-300"
                >
                  <span>Book Guided Architecture Tour</span>
                  <ExternalLink className="w-4 h-4 text-[#8C8C8C]" aria-hidden="true" />
                </Link>
              </div>

              {/* Guarantees Strip */}
              <div className="pt-8 border-t border-[#262C30] flex flex-wrap items-center justify-center gap-8 text-xs text-[#8C8C8C] font-montserrat">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                  Zero Upfront Setup Fees
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                  30-Minute Migration Guarantee
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                  Dedicated Account Architect
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded ContactBlock */}
        <ContactBlock />
      </section>
    </div>
  );
}
