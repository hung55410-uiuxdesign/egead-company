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
  Layers,
  Sparkles,
  Lock,
  ExternalLink,
  Flame,
} from 'lucide-react';
import {
  BentoGrid,
  MetricsRibbon,
  ComparisonTable,
  FaqAccordion,
  WorkflowTimeline,
  RoleTabs,
  MarginSimulator,
} from '@/components/sections';
import type { BentoItem, MetricItem, ComparisonRow, FaqItem, WorkflowStep, RoleTabItem } from '@/components/sections';
import ContactBlock from '@/components/ContactBlock';

export const metadata: Metadata = {
  title: 'All Services & Capabilities | E-GEAD: End-to-End E-Commerce & POD Solutions',
  description:
    'Explore E-GEAD complete operational and technology ecosystem: Sub-24H US POD fulfillment, multi-channel sales automation, WMS precision, and 4.8x ROAS digital marketing.',
  keywords: [
    'end-to-end ecommerce operations',
    'cross-border fulfillment solutions',
    'ecommerce automation platform',
    'US POD fulfillment 24 hours',
    'TikTok Shop US compliant fulfillment',
    'multi-channel inventory sync',
  ],
};

const complianceBadges = [
  {
    title: 'TikTok Shop US LDR Shield',
    description:
      'Maintains Late Dispatch Rate under 1% (platform threshold < 4%), securing Fast Dispatch badges and algorithm visibility.',
    icon: <Flame className="w-6 h-6" aria-hidden="true" />,
  },
  {
    title: 'Amazon FBM VTR Guarantee',
    description:
      'Automated origin tracking injection ensures Valid Tracking Rate (VTR) stays above 95% across all Amazon FBM orders.',
    icon: <CheckCircle2 className="w-6 h-6" aria-hidden="true" />,
  },
  {
    title: 'Bank-Grade Data Privacy',
    description:
      'Customer PII data is secured with AES-256 encryption, fully compliant with GDPR and California CCPA privacy standards.',
    icon: <Lock className="w-6 h-6" aria-hidden="true" />,
  },
  {
    title: '99.9% Uptime Cloud SLA',
    description:
      'Enterprise cloud routing across AWS and Cloudflare Edge guarantees uninterrupted storefront operations during peak holiday rushes.',
    icon: <ShieldCheck className="w-6 h-6" aria-hidden="true" />,
  },
];

export default function AllServicesPage() {
  // Section 2: Metrics
  const globalMetrics: MetricItem[] = [
    {
      value: '< 24h',
      label: 'Average US Fulfillment SLA',
      trend: 'Guaranteed',
      description: 'Under 24-hour printing and domestic carrier first scan in the US.',
    },
    {
      value: '99.9%',
      label: 'Barcode WMS Accuracy',
      trend: 'Zero-Defect',
      description: 'Digitized barcode checkpoints across picking, printing, and packing.',
    },
    {
      value: '4.8x',
      label: 'Average Blended ROAS',
      trend: 'Scale Mode',
      description: 'Performance marketing on TikTok Shop, Meta, and Google Shopping.',
    },
    {
      value: '$6 All-in',
      label: 'Transparent Unit Base Rate',
      trend: 'No Hidden Fees',
      description: 'Predictable manufacturing, 23-inch DTF printing, blanks, and packaging.',
    },
  ];

  // Section 3: Role Tabs
  const roleTabsData: RoleTabItem[] = [
    {
      id: 'pod-sellers',
      label: 'POD & Marketplace Sellers',
      badge: 'Sub-24H SLA',
      headline: 'Sub-24H Dispatch SLA & TikTok Shop Compliance',
      description:
        'Protect your seller account health against Late Dispatch Rate (LDR) strikes while scaling oversized streetwear, apparel, and trending merchandise effortlessly.',
      bullets: [
        'Guaranteed carrier origin scan within 24 hours, keeping TikTok Shop LDR < 1%',
        '23-inch wide roll-fed DTF printing delivering premium edge-to-edge color vibrancy',
        'Automated AI address sanitization with USPS Zip+4 validation to eliminate RTO',
      ],
      metrics: [
        { value: '0.0%', label: 'LDR Violations' },
        { value: '< 24H', label: 'Carrier Injection' },
        { value: '$6.00', label: 'All-In Base Rate' },
      ],
      ctaText: 'Explore SpeedX POD Engine',
      ctaHref: '/speedx',
    },
    {
      id: 'dtc-brands',
      label: 'DTC & Omnichannel Brands',
      badge: 'Zero Stockouts',
      headline: 'Zero Stockouts Across Amazon, Etsy & Shopify',
      description:
        'Unify scattered multi-store orders and inventory with automated bidirectional synchronization, dynamic buffer calculation, and automated multi-hub routing.',
      bullets: [
        'Bidirectional inventory synchronization across Amazon, Etsy, TikTok Shop, and Shopify',
        'Intelligent safety stock buffers that prevent algorithmic overselling penalties',
        'Automated landed cost calculation and consolidated multi-currency net margin reporting',
      ],
      metrics: [
        { value: '100%', label: 'Stockout Protection' },
        { value: '< 1.2s', label: 'Sync Latency' },
        { value: '5+ Channels', label: 'Centralized OMS' },
      ],
      ctaText: 'Explore SmartCommerce Platform',
      ctaHref: '/smartcommerce',
    },
    {
      id: 'marketers',
      label: 'Media Buyers & Growth Marketers',
      badge: '4.8x ROAS',
      headline: 'Performance Advertising Tuned for Profitable Scale',
      description:
        'High-velocity creative testing engines on TikTok and Meta Ads paired with live unit economics modeling to scale profitable global customer acquisition.',
      bullets: [
        'Trend-reactive short-form video creatives optimized for high impulse-buy conversion',
        'Automated ROAS bid management and high-intent audience segmentation',
        'Real-time product unit margin calculators ensuring front-end customer acquisition remains profitable',
      ],
      metrics: [
        { value: '4.8x', label: 'Average ROAS' },
        { value: '$8.40', label: 'Average CPA' },
        { value: '92K+', label: 'Monthly Traffic' },
      ],
      ctaText: 'Schedule Growth Strategy Call',
      ctaHref: '/contact-us',
    },
    {
      id: 'developers',
      label: 'Technical Teams & Developers',
      badge: 'API-First',
      headline: 'Developer-First RESTful API & Event-Driven Webhooks',
      description:
        'Direct programmatic control over order creation, SKU mapping, artwork asset queuing, and real-time tracking callbacks with enterprise-grade resilience.',
      bullets: [
        'Sub-150ms API endpoint response latency with 99.9% uptime SLA guarantee',
        'Event-driven webhooks for instant order transitions: created, queued, printed, dispatched',
        'Interactive OpenAPI schema documentation and sandboxed test environment',
      ],
      metrics: [
        { value: '99.9%', label: 'API Availability' },
        { value: '< 150ms', label: 'Endpoint Latency' },
        { value: '100%', label: 'Webhook Delivery' },
      ],
      ctaText: 'View Developer Sandbox',
      ctaHref: '/speedx',
    },
  ];

  // Section 4: Bento Grid 6 Pillars
  const bentoPillars: BentoItem[] = [
    {
      id: 'sales-automation',
      title: '01. Sales Automation',
      tag: 'Core Pipeline',
      description:
        'Aggregate and normalize incoming orders from Amazon, Etsy, TikTok Shop, and Shopify into a unified automated pipeline, eliminating 99% of manual spreadsheet workflows.',
      stats: { value: '99%', label: 'Reduction in Manual Work' },
      colSpan: 2,
      highlight: true,
      icon: <Layers className="w-6 h-6 text-[#25E2CC]" aria-hidden="true" />,
      ctaText: 'Learn About Order Sync',
      ctaHref: '/smartcommerce',
    },
    {
      id: 'pod-marketplace-integration',
      title: '02. POD Marketplace Integration',
      tag: 'Sub-24H US SLA',
      description:
        'Bi-directional API bridge connecting your storefronts directly to automated US print facilities for sub-24H domestic dispatch.',
      stats: { value: '23-Inch', label: 'Roll-Fed DTF Prints' },
      colSpan: 1,
      icon: <Zap className="w-6 h-6 text-[#25E2CC]" aria-hidden="true" />,
      ctaText: 'Discover SpeedX POD',
      ctaHref: '/speedx',
    },
    {
      id: 'fulfillment-automation',
      title: '03. Fulfillment Automation',
      tag: 'WMS Precision',
      description:
        'Digitize warehouse logistics with barcode scanning at every station—picking, heat pressing, quality inspection, and carrier sorting.',
      stats: { value: '99.9%', label: 'Packing & Label Accuracy' },
      colSpan: 1,
      icon: <CheckCircle2 className="w-6 h-6 text-[#25E2CC]" aria-hidden="true" />,
      ctaText: 'See WMS Checkpoints',
      ctaHref: '/speedx',
    },
    {
      id: 'ecommerce-platform',
      title: '04. E-Commerce Platform',
      tag: 'High Velocity',
      description:
        'Custom headless commerce storefronts engineered for sub-1.5s mobile page loads, frictionless 1-step checkout, and multi-currency conversion.',
      stats: { value: '< 1.5s', label: 'Mobile Page Load Speed' },
      colSpan: 2,
      icon: <Cpu className="w-6 h-6 text-[#25E2CC]" aria-hidden="true" />,
      ctaText: 'Explore Platform Tech',
      ctaHref: '/smartcommerce',
    },
    {
      id: 'cloud-hosting',
      title: '05. Website & Cloud Hosting',
      tag: 'Enterprise Infra',
      description:
        'Cloudflare Edge and AWS auto-scaling infrastructure built to withstand massive Black Friday and viral TikTok traffic surges without slowdown.',
      stats: { value: '99.9%', label: 'Guaranteed System Uptime' },
      colSpan: 1,
      icon: <ShieldCheck className="w-6 h-6 text-[#25E2CC]" aria-hidden="true" />,
      ctaText: 'Review Infrastructure',
      ctaHref: '/company',
    },
    {
      id: 'growth-marketing',
      title: '06. Digital Advertising Services',
      tag: 'Performance Marketing',
      description:
        'Full-funnel paid media campaigns across TikTok Shop, Meta, and Google Ads paired with rigorous unit economics modeling to drive consistent 4.8x ROAS.',
      stats: { value: '4.8x', label: 'Average Blended ROAS' },
      colSpan: 2,
      highlight: true,
      icon: <Activity className="w-6 h-6 text-[#25E2CC]" aria-hidden="true" />,
      ctaText: 'Book Strategy Audit',
      ctaHref: '/contact-us',
    },
  ];

  // Section 5: Workflow Timeline
  const workflowSteps: WorkflowStep[] = [
    {
      step: '01',
      title: 'Order Ingestion',
      description: 'Webhook automatically triggers order capture across TikTok Shop, Amazon, Etsy, or Shopify.',
      subtext: 'Latency < 1s • Instant Webhook Event',
      badge: 'Real-Time',
    },
    {
      step: '02',
      title: 'AI Sanitization & Verification',
      description: 'AI normalizes USPS postal standards, validates Zip+4, and flags high-risk fraudulent orders.',
      subtext: 'USPS CASS Certified • Zero RTO',
      badge: 'AI Precision',
    },
    {
      step: '03',
      title: 'Automated DTF Production',
      description: 'High-res 23-inch print files are automatically auto-ganged, printed, and heat-pressed onto blanks.',
      subtext: 'Sub-12H Print Queue • OEKO-TEX Inks',
      badge: 'Industrial DTF',
    },
    {
      step: '04',
      title: 'Barcode QC & Scan Injection',
      description: 'Technicians scan barcode checkpoints, inspect garment finish, and automatically dispatch tracking to platform.',
      subtext: 'Sub-20H First Carrier Scan',
      badge: '99.9% Accuracy',
    },
    {
      step: '05',
      title: 'Domestic Delivery Handshake',
      description: 'Packages handed over to USPS / UPS hubs with real-time end-customer tracking updates.',
      subtext: '2-4 Days Domestic US Transit',
      badge: 'Delivered',
    },
  ];

  // Section 6: Comparison Table Rows
  const comparisonRows: ComparisonRow[] = [
    {
      feature: 'Fulfillment & Carrier Dispatch Speed',
      category: 'Production SLA',
      egead: '< 24 Hours dispatch guarantee',
      traditional: '3-5 Business Days',
      egeadNote: 'Direct domestic carrier handshake, 0% TikTok LDR strikes',
      traditionalNote: 'Frequent delayed dispatch penalties and customer cancellations',
      highlight: true,
    },
    {
      feature: 'Print Format & Garment Versatility',
      category: 'Print Quality',
      egead: '23-Inch Large-Format Roll-Fed DTF',
      traditional: 'Standard 12x14 Inch DTG Flatbed',
      egeadNote: 'Full-coverage oversize, hoodies, streetwear, and dark garments',
      traditionalNote: 'Limited print areas and heavy garment pre-treatment stains',
    },
    {
      feature: 'Address Normalization & RTO Prevention',
      category: 'AI Technology',
      egead: 'Automated AI USPS verification',
      traditional: 'Manual review or raw import',
      egeadNote: 'Flags invalid addresses before printing, saving up to 8% in RTO',
      traditionalNote: 'High return rates and costly shipping label reprints',
    },
    {
      feature: 'Multi-Channel Inventory Synchronization',
      category: 'Software OMS',
      egead: 'Real-time 2-way API synchronization',
      traditional: 'Batch CSV spreadsheet uploads',
      egeadNote: 'Instant safety stock buffer updates across all channels',
      traditionalNote: 'High risk of overselling and marketplace account suspension',
      highlight: true,
    },
    {
      feature: 'Pricing Model & Cost Predictability',
      category: 'Unit Economics',
      egead: '$6 Flat All-In per unit base rate',
      traditional: 'Base cost + pick + pack + handling fees',
      egeadNote: 'Includes garment blank, 23-inch print, sorting, and packaging',
      traditionalNote: 'Opaque monthly invoices with unexpected surcharges',
    },
    {
      feature: 'Financial & Net Margin Reporting',
      category: 'Analytics',
      egead: 'Live Net Margin Dashboard',
      traditional: 'End-of-month Excel statement',
      egeadNote: 'Track real-time ad spend, landed costs, and true net profit',
      traditionalNote: 'Delayed visibility causing unmitigated ad budget burn',
    },
  ];

  // Section 10: FAQ Accordion
  const faqs: FaqItem[] = [
    {
      question: 'How quickly does E-GEAD dispatch US print-on-demand orders?',
      answer:
        'Over 95% of standard orders are printed, quality-inspected, and handed over to US domestic carriers (USPS/UPS) within 12 to 24 hours of receiving the order webhook. Carrier origin scan occurs well within strict marketplace deadlines.',
      category: 'Operations & SLA',
    },
    {
      question: 'Can E-GEAD integrate with our existing custom ERP or Shopify store?',
      answer:
        'Yes. We offer fully documented Open RESTful APIs and real-time Webhooks that allow direct two-way synchronization with any custom ERP, WMS, or Shopify Plus store with sub-150ms response latency.',
      category: 'Integrations & API',
    },
    {
      question: 'What is included in the $6 all-in unit rate?',
      answer:
        'Our transparent $6 base rate covers the premium blank garment, high-resolution 23-inch roll-fed DTF printing, barcode WMS sorting, standard protective packaging, and labor with zero hidden picking or handling fees.',
      category: 'Pricing & Economics',
    },
    {
      question: 'How does E-GEAD safeguard our TikTok Shop seller account health?',
      answer:
        'By ensuring physical carrier origin scans occur well within TikTok Shop US strict 48-hour SLA deadline. This keeps your Late Dispatch Rate (LDR) far below the 4% penalty ceiling, protecting your account from order volume limits (OVL).',
      category: 'Operations & SLA',
    },
    {
      question: 'What advertising channels does your digital growth team manage?',
      answer:
        'We specialize in TikTok Shop Ads, Meta (Facebook & Instagram), and Google Shopping / Performance Max campaigns. We focus on high-intent creative testing, CPA containment, and maximizing blended return on ad spend (ROAS).',
      category: 'Growth & Ads',
    },
    {
      question: 'Is there any minimum order quantity (MOQ) to get started with E-GEAD?',
      answer:
        'No MOQ. Whether you process 10 orders a day as an emerging brand or 5,000 orders daily during Q4 peak holiday campaigns, E-GEAD infrastructure scales elastically to match your demand.',
      category: 'Operations & SLA',
    },
  ];

  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-24 sm:pt-32">
      {/* SECTION 1: Immersive Hero & Live Capability Ticker */}
      <section
        id="services-hero"
        className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 py-16 sm:py-24 overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/3 w-[550px] h-[350px] bg-[#25E2CC]/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-[#262C30] text-[#7ceee0] text-xs font-normal tracking-wide mb-6 font-montserrat">
              <span className="w-2 h-2 rounded-full bg-[#7ceee0] animate-pulse" />
              Live System: 10,000+ Daily Dispatches Across US Hubs
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium tracking-tight text-[#d3f9f5] font-montserrat leading-[1.08] mb-6">
              Automate Operations. <br />
              Scale <span className="text-[#7ceee0] font-medium">Global Commerce.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] leading-[1.75] font-light font-montserrat max-w-2xl mb-8">
              E-GEAD delivers an enterprise-grade technology and logistics ecosystem: automating multi-channel order pipelines, manufacturing US print-on-demand goods in under 24 hours, and scaling revenue through high-impact performance advertising.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#solutions-by-role"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7ceee0] text-black font-medium text-sm sm:text-base font-montserrat hover:bg-[#68d8ca] transition duration-300"
              >
                <span>Explore Solutions Matrix</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#141718] text-[#d3f9f5] border border-white/20 font-medium text-sm sm:text-base font-montserrat hover:border-[#7ceee0] hover:text-[#7ceee0] transition duration-300"
              >
                <span>Request Operations Audit</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: Real-time Order Throughput Dashboard HUD */}
          <div className="lg:col-span-5">
            <div className="w-full rounded-[32px] bg-[#141718]/90 border border-[#262C30] p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#262C30] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7ceee0] animate-ping" />
                  <span className="text-xs font-normal text-[#d3f9f5] font-montserrat">
                    Live Dispatch HUD
                  </span>
                </div>
                <span className="text-[10px] font-mono font-medium bg-[#7ceee0]/10 text-[#7ceee0] px-2.5 py-1 rounded-full border border-[#7ceee0]/20">
                  Latency: 120ms
                </span>
              </div>

              {/* HUD Stats */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0A0D0E]/80 border border-[#262C30] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#b3b3b3] font-light font-montserrat">
                      Today's US Dispatch Queue
                    </span>
                    <div className="text-2xl font-medium text-[#7ceee0] font-montserrat mt-0.5">
                      12,480 Units
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-[#D3F9F5] bg-[#7ceee0]/10 px-2 py-1 rounded">
                    100% On Time
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0A0D0E]/80 border border-[#262C30] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#b3b3b3] font-light font-montserrat">
                      TikTok Shop LDR Status
                    </span>
                    <div className="text-2xl font-medium text-[#d3f9f5] font-montserrat mt-0.5">
                      0.18% <span className="text-xs text-[#8C8C8C] font-light">(Ceiling: 4.0%)</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                    Safe Shield
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0A0D0E]/80 border border-[#262C30] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#b3b3b3] font-light font-montserrat">
                      Active Production Facilities
                    </span>
                    <div className="text-2xl font-medium text-[#d3f9f5] font-montserrat mt-0.5">
                      US East &amp; West Hubs
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-[#7ceee0] bg-[#7ceee0]/10 px-2 py-1 rounded">
                    Operational
                  </span>
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-6 pt-4 border-t border-[#262C30] flex items-center justify-between text-xs text-[#8C8C8C] font-montserrat">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
                  Carrier Handshake: Connected
                </span>
                <span className="font-mono text-[11px] text-[#D3F9F5]">
                  USPS / UPS / DHL
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Global Operations Metrics Bar */}
      <MetricsRibbon
        id="operations-metrics"
        badge="Enterprise Performance"
        title="Backed by Proven Operating Benchmarks"
        subtitle="Real-time production and growth indicators achieved across 100+ global storefronts"
        metrics={globalMetrics}
      />

      {/* SECTION 3: Interactive Role-Based Solutions Switcher */}
      <RoleTabs
        id="solutions-by-role"
        badge="Tailored Ecosystem Solutions"
        title={
          <>
            Engineered for <span className="text-[#25E2CC]">Your Exact Business Model</span>
          </>
        }
        subtitle="Select your operating persona to explore dedicated infrastructure, integrations, and performance guarantees."
        tabs={roleTabsData}
      />

      {/* SECTION 4: The 6 Service Pillars Bento Grid Deep Dive */}
      <BentoGrid
        id="core-services-grid"
        badge="Complete Capabilities Portfolio"
        title={
          <>
            Complete Operational Spectrum: <br />
            <span className="text-[#25E2CC]">From Ingestion to Delivery &amp; Growth</span>
          </>
        }
        description="Every link in your e-commerce chain is strengthened by specialized technology, automated manufacturing, and data-driven marketing."
        items={bentoPillars}
      />

      {/* SECTION 5: End-to-End Automated Workflow Pipeline */}
      <WorkflowTimeline
        id="workflow-pipeline"
        badge="The Order Journey"
        title={
          <>
            From Customer Click to <span className="text-[#25E2CC]">US Porch Delivery</span>
          </>
        }
        subtitle="Experience a zero-touch, automated fulfillment pipeline that turns multi-channel orders into delivered packages in days."
        steps={workflowSteps}
      />

      {/* SECTION 6: Head-to-Head Comparison: E-GEAD vs Traditional 3PL */}
      <ComparisonTable
        id="comparison-matrix"
        badge="Head-to-Head Comparison"
        title={
          <>
            Why Modern Sellers Switch from <span className="text-[#25E2CC]">Legacy 3PL Vendors</span>
          </>
        }
        subtitle="Examine the tangible operational advantages that keep your accounts healthy and your unit economics predictable."
        egeadTitle="E-GEAD Ecosystem"
        egeadSubtitle="AI Precision & Sub-24H US POD"
        traditionalTitle="Legacy 3PL / Print Vendors"
        traditionalSubtitle="Batch Manual Processing"
        rows={comparisonRows}
      />

      {/* SECTION 7: Interactive Fulfillment & Margin Simulator */}
      <MarginSimulator id="margin-simulator" />

      {/* SECTION 8: Enterprise SLA Protection & Compliance Badges */}
      <section
        id="sla-compliance"
        className="relative w-full py-20 sm:py-24 bg-[#0A0D0E] border-t border-[#262C30] text-white overflow-hidden"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-normal text-[#d3f9f5] mb-4 font-montserrat">
              <ShieldCheck className="w-4 h-4 text-[#7ceee0]" aria-hidden="true" />
              Account Safety &amp; SLAs
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-[#d3f9f5] font-montserrat leading-[1.2]">
              Enterprise SLA Protection &amp; Compliance Badges
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#b3b3b3] leading-[1.75] font-light font-montserrat max-w-2xl mx-auto">
              Eliminate account suspension risks. Our automated operations maintain perfect compliance with the world's strictest marketplace algorithms.
            </p>
          </div>

          {/* 4 Compliance Cards rendered cleanly via DRY map */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[26px] bg-[#141718]/90 border border-[#262C30] hover:border-[#7ceee0]/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1D2224] border border-[#262C30] flex items-center justify-center text-[#7ceee0] mb-5 group-hover:scale-105 transition-transform">
                  {badge.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#d3f9f5] font-montserrat mb-2 group-hover:text-[#7ceee0] transition-colors">
                  {badge.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#b3b3b3] font-light font-montserrat leading-relaxed">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Featured Client Transformation Spotlight */}
      <section
        id="client-spotlight"
        className="relative w-full py-20 sm:py-24 bg-[#0A0D0E] text-white overflow-hidden"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="rounded-[32px] bg-gradient-to-br from-[#141718] to-[#101416] border border-[#262C30] p-8 sm:p-12 lg:p-16 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#25E2CC]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Client Profile Card */}
              <div className="lg:col-span-5 space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141718] border border-white/10 text-[#d3f9f5] text-xs font-normal uppercase tracking-wider font-montserrat">
                  Case Study Spotlight
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-[#d3f9f5] font-montserrat leading-snug">
                  UrbanVibe Apparel
                </h2>
                <p className="text-sm text-[#b3b3b3] font-light font-montserrat leading-relaxed">
                  Top-Tier US Streetwear Brand scaling on TikTok Shop US &amp; Shopify DTC.
                </p>

                <div className="p-4 rounded-2xl bg-[#0A0D0E]/80 border border-white/10 space-y-3 pt-4">
                  <div className="flex justify-between items-center text-xs font-montserrat">
                    <span className="text-[#b3b3b3]">Before Migration:</span>
                    <span className="text-red-400 font-medium">4.2% LDR (Order Limit Strike)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-montserrat">
                    <span className="text-[#b3b3b3]">After E-GEAD:</span>
                    <span className="text-[#7ceee0] font-medium">0.2% LDR (Sub-24H Dispatch)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-montserrat pt-2 border-t border-white/10">
                    <span className="text-[#b3b3b3]">Q4 GMV Growth:</span>
                    <span className="text-emerald-400 font-medium text-sm">+180% ($420,000 GMV)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Quote */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <blockquote className="text-lg sm:text-xl text-[#d3f9f5] font-montserrat font-light italic leading-[1.75] mb-6">
                  &ldquo;E-GEAD eliminated our sleepless nights. We scaled our TikTok Shop ad spend knowing our fulfillment would never drop the ball. With sub-24H dispatch and 23-inch DTF quality, our customer ratings surged to 4.9 stars.&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#7ceee0]/20 border border-[#7ceee0] flex items-center justify-center text-[#7ceee0] font-medium font-montserrat text-sm">
                    MV
                  </div>
                  <div>
                    <div className="text-[#d3f9f5] font-medium text-sm font-montserrat">Marcus Vance</div>
                    <div className="text-xs text-[#b3b3b3] font-light font-montserrat">Founder &amp; CEO, UrbanVibe Apparel</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    href="/our-work"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#7ceee0] hover:text-[#68d8ca] transition-colors group font-montserrat"
                  >
                    <span>Read Full Client Transformation Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: Categorized FAQ Accordion */}
      <FaqAccordion
        id="services-faq"
        badge="Frequently Answered Inquiries"
        title={
          <>
            Got Questions? <span className="text-[#7ceee0] font-medium">We Have Answers.</span>
          </>
        }
        subtitle="Review key details regarding our SLAs, custom integrations, pricing model, and account protections."
        items={faqs}
        categories={['Operations & SLA', 'Integrations & API', 'Pricing & Economics', 'Growth & Ads']}
      />

      {/* SECTION 11: High-Velocity Conversion Mega CTA */}
      <section
        id="services-cta"
        className="relative w-full py-20 sm:py-28 bg-[#0A0D0E] text-white overflow-hidden"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="rounded-[36px] bg-gradient-to-br from-[#141718] via-[#101416] to-[#0A0D0E] border border-white/10 p-8 sm:p-12 lg:p-16 text-center shadow-[0_0_60px_rgba(124,238,224,0.15)] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7ceee0]/10 blur-[140px] rounded-full pointer-events-none" />

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-white/10 text-[#d3f9f5] text-xs font-normal tracking-wider uppercase mb-6 font-montserrat">
              <Sparkles className="w-3.5 h-3.5 text-[#7ceee0]" aria-hidden="true" />
              Scale Without Limits
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-[#d3f9f5] font-montserrat leading-[1.1] mb-6 tracking-tight">
              Ready to Automate Operations &amp; <br />
              <span className="text-[#7ceee0] font-medium">Dominate Global Commerce?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#b3b3b3] font-light font-montserrat max-w-2xl mx-auto leading-[1.75] mb-10">
              Connect with our solutions architects today. Receive a complimentary operations audit and review your custom unit economics in under 24 hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#7ceee0] text-black font-medium text-sm sm:text-base font-montserrat hover:bg-[#68d8ca] transition-all duration-200 shadow-[0_0_30px_rgba(124,238,224,0.4)] hover:scale-105 focus:outline-none"
              >
                <span>Schedule Operations Consultation</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                href="/speedx"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#141718] text-white border border-[#262C30] font-bold text-sm sm:text-base font-montserrat hover:border-[#25E2CC]/40 hover:text-[#25E2CC] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]"
              >
                <span>Explore SpeedX Tech Specs</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 pt-8 border-t border-[#262C30]/60 text-xs text-[#8C8C8C] font-montserrat">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                Zero Setup Fees
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                14-Day Free API Sandbox
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                Dedicated Account Architect
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Contact & Inquiry Block */}
      <ContactBlock />
    </div>
  );
}
