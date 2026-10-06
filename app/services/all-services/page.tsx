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
  ComparisonTable,
  FaqAccordion,
  WorkflowTimeline,
} from '@/components/sections';
import type { ComparisonRow, FaqItem, WorkflowStep } from '@/components/sections';
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

const partnerLogos = [
  { name: 'Shopify', src: '/assets/logo_shopify.svg' },
  { name: 'Salesforce', src: '/assets/logo_salesforce.svg' },
  { name: 'Stripe', src: '/assets/logo_stripe.svg' },
  { name: 'SAP Silver', src: '/assets/logo_sapsilver.svg' },
  { name: 'Magento', src: '/assets/logo_magento.svg' },
  { name: 'Klaviyo', src: '/assets/logo_klaviyo.svg' },
  { name: 'Commercetools', src: '/assets/logo_commercetools.svg' },
  { name: 'Qualtrics', src: '/assets/logo_qualtrics.svg' },
  { name: 'Emarsys', src: '/assets/logo_emarsys.svg' },
  { name: 'Sitecore', src: '/assets/logo_Sitecore.png' },
];

export default function AllServicesPage() {
  // Proven Results Data matching SAI Digital .grid-info with 148px glossy 3D icons
  const provenResults = [
    {
      icon: '/assets/projectdeliverycolor.svg',
      title: '< 24h',
      description: 'Average US Fulfillment SLA',
      detail: 'Guaranteed sub-24h printing and domestic carrier first scan in the US.',
      badge: 'Guaranteed',
    },
    {
      icon: '/assets/yearscolor.svg',
      title: '99.9%',
      description: 'Barcode WMS Accuracy',
      detail: 'Zero-Defect barcode checkpoints across picking, printing, and packing.',
      badge: 'Zero-Defect',
    },
    {
      icon: '/assets/Glass0.svg',
      title: '4.8x',
      description: 'Average Blended ROAS',
      detail: 'Scale Mode performance marketing on TikTok Shop, Meta, and Google Shopping.',
      badge: 'Scale Mode',
    },
    {
      icon: '/assets/icon222.svg',
      title: '$6 All-in',
      description: 'Transparent Unit Base Rate',
      detail: 'No Hidden Fees. Predictable manufacturing, 23-inch DTF printing, blanks, and packaging.',
      badge: 'No Hidden Fees',
    },
    {
      icon: '/assets/Name_Experts__Color_Colorful.svg',
      title: '200+',
      description: 'Certified Platform Engineers',
      detail: 'Global development and fulfillment operations providing 24/7/365 coverage.',
      badge: '24/7 Coverage',
    },
    {
      icon: '/assets/icon4444.svg',
      title: '15+',
      description: 'Integrated Channels & Marketplaces',
      detail: 'Zero-stockout synchronization across Amazon, Etsy, TikTok Shop, and Shopify.',
      badge: 'Connected',
    },
  ];

  // The 6 Operational Service Pillars matching SAI Digital .service-card architecture
  const servicePillars = [
    {
      id: 'sales-automation',
      number: '01',
      title: '01. Sales Automation',
      subtitle: 'Core Pipeline Automation',
      iconImg: '/assets/icon_s_new__2_.png',
      description:
        'Aggregate and normalize incoming orders from Amazon, Etsy, TikTok Shop, and Shopify into a unified automated pipeline, eliminating 99% of manual spreadsheet workflows.',
      ctaText: 'Learn About Order Sync',
      ctaHref: '/smartcommerce',
      children: [
        {
          icon: '/assets/101.svg',
          title: 'Multi-Channel Order Aggregation',
          desc: 'Instant webhook event capture across Amazon, Etsy, TikTok Shop, and Shopify with sub-second order ingestion.',
        },
        {
          icon: '/assets/102.svg',
          title: 'Automated SKU & Asset Mapping',
          desc: 'Dynamically pair external marketplace product listings to print-ready production files and garment blanks.',
        },
        {
          icon: '/assets/103.svg',
          title: 'Two-Way Real-Time Stock Sync',
          desc: 'Eliminate overselling penalties with continuous bidirectional inventory synchronization across all sales channels.',
        },
      ],
    },
    {
      id: 'pod-marketplace-integration',
      number: '02',
      title: '02. POD Marketplace Integration',
      subtitle: 'Sub-24H US Domestic SLA',
      iconImg: '/assets/icon_s_new__3_.png',
      description:
        'Bi-directional API bridge connecting your storefronts directly to automated US print facilities for sub-24H domestic dispatch.',
      ctaText: 'Discover SpeedX POD',
      ctaHref: '/speedx',
      children: [
        {
          icon: '/assets/201.svg',
          title: '23-Inch Roll-Fed DTF Technology',
          desc: 'Industrial large-format roll-fed DTF printers delivering vivid full-coverage oversize graphics on tees and heavy hoodies.',
        },
        {
          icon: '/assets/202.svg',
          title: 'Direct Domestic Carrier Injection',
          desc: 'Sub-24h domestic courier handshakes with USPS, UPS, and DHL hubs for reliable origin scans that satisfy TikTok Shop.',
        },
        {
          icon: '/assets/203.svg',
          title: 'Multi-Hub Routing Algorithm',
          desc: 'Intelligent routing sends production orders to US East or West facilities to minimize shipping zones and transit times.',
        },
      ],
    },
    {
      id: 'fulfillment-automation',
      number: '03',
      title: '03. Fulfillment Automation',
      subtitle: 'Barcode-Driven Precision WMS',
      iconImg: '/assets/icon_s_new__14_.png',
      description:
        'Digitize warehouse logistics with barcode scanning at every station—picking, heat pressing, quality inspection, and carrier sorting.',
      ctaText: 'See WMS Checkpoints',
      ctaHref: '/speedx',
      children: [
        {
          icon: '/assets/301.svg',
          title: '6-Station Barcode Validation',
          desc: 'Eliminate mispicks and wrong-item errors with mandatory barcode verification at picking, pressing, and packaging.',
        },
        {
          icon: '/assets/302.svg',
          title: 'AI Address Normalization',
          desc: 'Automated USPS CASS certification sanitizes postal standards and corrects Zip+4 codes prior to label generation.',
        },
        {
          icon: '/assets/303.svg',
          title: '99.9% Packing & Shipping Accuracy',
          desc: 'Automated weigh-scale checkpoints guarantee package contents match order requirements before carrier handover.',
        },
      ],
    },
    {
      id: 'ecommerce-platform',
      number: '04',
      title: '04. E-Commerce Platform',
      subtitle: 'High Velocity Commerce Engine',
      iconImg: '/assets/icon_s_new__11_.png',
      description:
        'Custom headless commerce storefronts engineered for sub-1.5s mobile page loads, frictionless 1-step checkout, and multi-currency conversion.',
      ctaText: 'Explore Platform Tech',
      ctaHref: '/smartcommerce',
      children: [
        {
          icon: '/assets/401.svg',
          title: 'Headless Next.js Storefronts',
          desc: 'Sub-1.5s mobile page speed engineered with server components and edge rendering for peak impulse buying.',
        },
        {
          icon: '/assets/402.svg',
          title: 'Frictionless 1-Step Checkout',
          desc: 'Integrated with Apple Pay, Google Pay, and localized cross-border payment rails to maximize checkout completion.',
        },
        {
          icon: '/assets/403.svg',
          title: 'Multi-Currency Catalog Management',
          desc: 'Dynamic localized pricing, automated tax computation, and seamless multi-store inventory routing.',
        },
      ],
    },
    {
      id: 'cloud-hosting',
      number: '05',
      title: '05. Website & Cloud Hosting',
      subtitle: 'Enterprise Cloud Resilience',
      iconImg: '/assets/icon31.svg',
      description:
        'Cloudflare Edge and AWS auto-scaling infrastructure built to withstand massive Black Friday and viral TikTok traffic surges without slowdown.',
      ctaText: 'Review Infrastructure',
      ctaHref: '/company',
      children: [
        {
          icon: '/assets/101.svg',
          title: 'Cloudflare Edge CDN Distribution',
          desc: 'Storefront assets cached across 300+ global data centers to ensure instantaneous page delivery worldwide.',
        },
        {
          icon: '/assets/201.svg',
          title: 'AWS Auto-Scaling Serverless Mesh',
          desc: 'Dynamic compute clusters that effortlessly scale to absorb 50x flash traffic surges during viral promotions.',
        },
        {
          icon: '/assets/301.svg',
          title: '99.9% Guaranteed System Uptime',
          desc: 'Active-active high availability architecture safeguarding storefront revenue during high-volume sales windows.',
        },
      ],
    },
    {
      id: 'growth-marketing',
      number: '06',
      title: '06. Digital Advertising Services',
      subtitle: 'Performance Growth Engine',
      iconImg: '/assets/icon32.svg',
      description:
        'Full-funnel paid media campaigns across TikTok Shop, Meta, and Google Ads paired with rigorous unit economics modeling to drive consistent 4.8x ROAS.',
      ctaText: 'Book Strategy Audit',
      ctaHref: '/contact-us',
      children: [
        {
          icon: '/assets/401.svg',
          title: 'TikTok Shop Viral Creative Sprints',
          desc: 'Rapid creative testing with short-form impulse videos, creator partnerships, and direct shop tab ads.',
        },
        {
          icon: '/assets/402.svg',
          title: 'Meta & Google Shopping Retargeting',
          desc: 'High-intent dynamic catalog ads and Advantage+ shopping campaigns focused on maximizing customer lifetime value.',
        },
        {
          icon: '/assets/403.svg',
          title: 'Live Net Margin Attribution Dashboard',
          desc: 'Full visibility connecting ad spend directly to landed manufacturing costs and true net margin profitability.',
        },
      ],
    },
  ];

  // Workflow Timeline
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

  // Comparison Table Rows
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

  // FAQ Items
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
    <div className="w-full bg-[#0A0D0E] text-white pt-24 sm:pt-32 font-montserrat">
      {/* SECTION 1: Top Eyebrow, Heading & Live HUD matching SAI Digital */}
      <section
        id="services-hero"
        className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-4 sm:pt-8 pb-10 sm:pb-14 overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[350px] bg-[#10E774]/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10 mb-8 sm:mb-12">
          {/* Left Column: Heading Text */}
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
              Our Services
            </p>

            <div className="heading-text mb-6">
              <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium text-[#D4FAE6] font-montserrat leading-[1.08] mb-6">
                <span className="block">Automate Operations.</span>
                <span className="flex flex-wrap items-center gap-3 sm:gap-4">
                  Scale <span className="text-[#5EFC8D] font-medium">Global Commerce.</span>
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] leading-[1.75] font-light font-montserrat max-w-2xl mb-8">
              Sub-24h US POD fulfillment, automated multi-channel order pipelines, and data-driven performance advertising.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a
                href="#core-services-grid"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#5EFC8D] text-black font-medium text-sm sm:text-base font-montserrat hover:bg-[#4ee37e] transition duration-300 shadow-[0_0_20px_rgba(94,252,141,0.3)]"
              >
                <span>Explore Solutions Matrix</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#141718] text-[#D4FAE6] border border-white/20 font-medium text-sm sm:text-base font-montserrat hover:border-[#5EFC8D] hover:text-[#5EFC8D] transition duration-300"
              >
                <span>Request Operations Audit</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-[#262C30] text-[#5EFC8D] text-xs font-normal font-montserrat">
              <span className="w-2 h-2 rounded-full bg-[#5EFC8D] animate-pulse" />
              Live System: 10,000+ Daily Dispatches Across US Hubs
            </div>
          </div>

          {/* Right Column: Real-time Order Throughput Dashboard HUD */}
          <div className="lg:col-span-5">
            <div className="w-full rounded-[32px] bg-[#141718]/90 border border-[#262C30] p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#262C30] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#5EFC8D] animate-ping" />
                  <span className="text-xs font-normal text-[#D4FAE6] font-montserrat">
                    Live Dispatch HUD
                  </span>
                </div>
                <span className="text-[10px] font-montserrat font-medium bg-[#5EFC8D]/10 text-[#5EFC8D] px-2.5 py-1 rounded-full border border-[#5EFC8D]/20">
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
                    <div className="text-2xl font-medium text-[#5EFC8D] font-montserrat mt-0.5">
                      12,480 Units
                    </div>
                  </div>
                  <span className="text-xs font-montserrat font-medium text-[#D4FAE6] bg-[#5EFC8D]/10 px-2 py-1 rounded">
                    100% On Time
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0A0D0E]/80 border border-[#262C30] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#b3b3b3] font-light font-montserrat">
                      TikTok Shop LDR Status
                    </span>
                    <div className="text-2xl font-medium text-[#D4FAE6] font-montserrat mt-0.5">
                      0.18% <span className="text-xs text-[#8C8C8C] font-light">(Ceiling: 4.0%)</span>
                    </div>
                  </div>
                  <span className="text-xs font-montserrat font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                    Safe Shield
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0A0D0E]/80 border border-[#262C30] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#b3b3b3] font-light font-montserrat">
                      Active Production Facilities
                    </span>
                    <div className="text-2xl font-medium text-[#D4FAE6] font-montserrat mt-0.5">
                      US East &amp; West Hubs
                    </div>
                  </div>
                  <span className="text-xs font-montserrat font-medium text-[#5EFC8D] bg-[#5EFC8D]/10 px-2 py-1 rounded">
                    Operational
                  </span>
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-6 pt-4 border-t border-[#262C30] flex items-center justify-between text-xs text-[#8C8C8C] font-montserrat">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10E774]" aria-hidden="true" />
                  Carrier Handshake: Connected
                </span>
                <span className="font-montserrat text-[11px] text-[#D4FAE6]">
                  USPS / UPS / DHL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Anchor Block: Horizontal In-Page Navigation matching SAI Digital .anchor-block */}
        <div className="w-full pt-6 pb-2 border-t border-white/10 relative z-10">
          <div className="flex items-center gap-8 sm:gap-12 lg:gap-14 overflow-x-auto py-3 no-scrollbar">
            <a
              href="#core-services-grid"
              className="group inline-flex items-center gap-2 text-sm sm:text-[15px] font-normal text-[#b3b3b3] hover:text-[#5EFC8D] transition-colors whitespace-nowrap"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#b3b3b3] group-hover:fill-[#5EFC8D] transition-colors shrink-0"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>Services</span>
            </a>

            <a
              href="#workflow-pipeline"
              className="group inline-flex items-center gap-2 text-sm sm:text-[15px] font-normal text-[#b3b3b3] hover:text-[#5EFC8D] transition-colors whitespace-nowrap"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#b3b3b3] group-hover:fill-[#5EFC8D] transition-colors shrink-0"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>The Order Journey</span>
            </a>

            <a
              href="#comparison-matrix"
              className="group inline-flex items-center gap-2 text-sm sm:text-[15px] font-normal text-[#b3b3b3] hover:text-[#5EFC8D] transition-colors whitespace-nowrap"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#b3b3b3] group-hover:fill-[#5EFC8D] transition-colors shrink-0"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>Comparison</span>
            </a>

            <a
              href="#operations-metrics"
              className="group inline-flex items-center gap-2 text-sm sm:text-[15px] font-normal text-[#b3b3b3] hover:text-[#5EFC8D] transition-colors whitespace-nowrap"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#b3b3b3] group-hover:fill-[#5EFC8D] transition-colors shrink-0"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>Proven Results</span>
            </a>

            <a
              href="#clients-partnerships"
              className="group inline-flex items-center gap-2 text-sm sm:text-[15px] font-normal text-[#b3b3b3] hover:text-[#5EFC8D] transition-colors whitespace-nowrap"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#b3b3b3] group-hover:fill-[#5EFC8D] transition-colors shrink-0"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>Clients &amp; Partnerships</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1.5: Hero Visual Banner matching SAI Digital .image-text #main-4 */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-24">
        <div className="relative w-full rounded-[28px] sm:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl h-[340px] sm:h-[480px] lg:h-[600px]">
          <img
            src="/assets/banner18.png"
            alt="E-GEAD Global Operations and Technology Ecosystem"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E]/80 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex items-center gap-3">
            <span className="px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 font-montserrat text-xs sm:text-sm text-[#D4FAE6]">
              BUON MA THUOT HQ &amp; US FULFILLMENT NETWORK
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: The 6 Service Pillars matching SAI Digital .service-block and .service-card architecture */}
      <section
        id="core-services-grid"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28"
      >
        <div className="max-w-4xl mb-12 sm:mb-16">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
            Complete Capabilities Portfolio
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-medium text-[#D4FAE6] font-montserrat leading-[1.25] mb-4">
            Complete Operational Spectrum: <br />
            <span className="text-[#10E774]">From Ingestion to Delivery &amp; Growth</span>
          </h2>
          <p className="text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
            Specialized technology, automated manufacturing, and data-driven performance marketing.
          </p>
        </div>

        {/* List of 6 Service Cards with authentic SAI Digital card structure */}
        <div className="space-y-10 sm:space-y-14">
          {servicePillars.map((service) => (
            <div
              key={service.id}
              className="group rounded-[32px] bg-[#12131c] border border-white/10 hover:border-[#5EFC8D]/40 transition-all duration-300 p-6 sm:p-10 lg:p-12 shadow-xl hover:shadow-[0_0_35px_rgba(94,252,141,0.08)]"
            >
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                {/* Left: 3D Category Icon */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 shrink-0 flex items-center justify-center p-2 rounded-2xl bg-[#181a24] border border-white/5">
                  <img
                    src={service.iconImg}
                    alt={service.title}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Right: Content Wrapper */}
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-2xl font-medium text-white/50 font-montserrat">
                      {service.number}
                    </p>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#1A2022] text-[#5EFC8D] border border-[#5EFC8D]/20 font-montserrat">
                      {service.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium text-[#D4FAE6] font-montserrat mb-3 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#b3b3b3] font-light leading-relaxed font-montserrat max-w-3xl mb-8">
                    {service.description}
                  </p>

                  {/* 3 Children Sub-cards with SAI Digital Gradient Borders */}
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

                  {/* Discover More Action Button */}
                  <div className="pt-2">
                    <Link
                      href={service.ctaHref}
                      className="group/btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#5EFC8D] text-black font-medium text-sm hover:bg-[#4ee37e] transition-all duration-300 font-montserrat shadow-[0_0_20px_rgba(94,252,141,0.25)] hover:scale-105"
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
      </section>

      {/* SECTION 4.5: Mid-Page Visual Divider matching SAI Digital .image-text #main-6 */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 my-16 sm:my-24">
        <div className="relative w-full rounded-[28px] sm:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl h-[280px] sm:h-[420px] lg:h-[500px]">
          <img
            src="/assets/banner111.png"
            alt="E-GEAD Advanced Operations Infrastructure"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E]/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </section>

      {/* SECTION 4.6: Custom Statement Quote Block matching SAI Digital .custom-block */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="p-8 sm:p-14 lg:p-16 rounded-[32px] bg-[#12131c] border border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#5EFC8D]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="flex flex-col gap-6 max-w-4xl relative z-10">
            <p className="text-base sm:text-lg lg:text-xl font-light text-[#b3b3b3] leading-[1.8] font-montserrat">
              Our strategy and engineering teams build with physical manufacturing feasibility in mind because they work directly alongside our fulfillment centers. Your storefront dispatches in sub-24 hours from day one because barcode WMS validates every station. Your ad campaigns scale profitably over time because performance marketing connects directly to factory-floor landed unit economics.
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#5EFC8D] font-montserrat leading-snug">
              One ecosystem. Zero late dispatches. Your global success.
            </h3>
          </div>
        </div>
      </section>

      {/* SECTION 2: Proven Results Grid matching SAI Digital .grid-info #proven-results with 148px icons */}
      <section
        id="operations-metrics"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 py-16 sm:py-24 bg-[#0A0D0E] border-t border-b border-white/5"
      >
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
            Enterprise Performance
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3] mb-3">
            Backed by Proven Operating Benchmarks
          </h2>
          <p className="text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
            Proven operating benchmarks achieved across 100+ global storefronts
          </p>
        </div>

        {/* 6 Grid Cards with SAI Digital 148px Glossy 3D Icons & Gradient Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {provenResults.map((metric, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-b from-[#5EFC8D]/35 via-[#10E774]/10 to-[#5EFC8D]/20 p-[1px] rounded-[20px] transition-all duration-300 hover:from-[#5EFC8D]/65 hover:to-[#5EFC8D]/40 hover:shadow-[0_0_30px_rgba(94,252,141,0.15)]"
            >
              <div className="bg-[#040404] p-8 rounded-[20px] h-full flex flex-col items-center text-center justify-between min-h-[340px]">
                {/* 148x148 Glossy 3D Icon */}
                <div className="w-[148px] h-[148px] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={metric.icon}
                    alt={metric.description}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="w-full">
                  <p className="text-2xl lg:text-[28px] font-semibold text-[#D4FAE6] font-montserrat mb-1 group-hover:text-[#5EFC8D] transition-colors">
                    {metric.title}
                  </p>
                  <p className="text-sm font-medium text-[#D4FAE6] font-montserrat mb-2">
                    {metric.description}
                  </p>
                  <p className="text-xs text-[#8C8C8C] font-light font-montserrat leading-relaxed">
                    {metric.detail}
                  </p>
                </div>

                <span className="mt-4 px-3 py-1 rounded-full text-[11px] font-medium bg-[#5EFC8D]/10 text-[#5EFC8D] border border-[#5EFC8D]/20 font-montserrat">
                  {metric.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Enterprise Clients & Ecosystem Partners Slider matching SAI Digital #clients-partnerships */}
      <section
        id="clients-partnerships"
        className="w-full py-14 sm:py-20 mb-16 overflow-hidden border-b border-white/5 bg-[#0D1011]"
      >
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-8">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-2 font-montserrat">
            Enterprise Partners
          </p>
          <h3 className="text-xl sm:text-2xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-snug">
            Seamlessly connected with leading marketplace and cloud platforms.
          </h3>
        </div>

        {/* Infinite marquee track */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-12 sm:gap-16 lg:gap-20 py-4">
            {partnerLogos.concat(partnerLogos, partnerLogos).map((partner, idx) => (
              <div
                key={`partner-${idx}`}
                className="flex items-center justify-center min-w-[130px] sm:min-w-[160px] h-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-w-full max-h-12 object-contain filter invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: End-to-End Automated Workflow Pipeline */}
      <WorkflowTimeline
        id="workflow-pipeline"
        badge="The Order Journey"
        title={
          <>
            From Customer Click to <span className="text-[#10E774]">US Porch Delivery</span>
          </>
        }
        subtitle="Zero-touch fulfillment pipeline turning multi-channel orders into delivered packages in days."
        steps={workflowSteps}
      />

      {/* SECTION 6: Head-to-Head Comparison: E-GEAD vs Traditional 3PL */}
      <ComparisonTable
        id="comparison-matrix"
        badge="Head-to-Head Comparison"
        title={
          <>
            Why Modern Sellers Switch from <span className="text-[#10E774]">Legacy 3PL Vendors</span>
          </>
        }
        subtitle="Key operational metrics comparing E-GEAD with traditional 3PL vendors."
        egeadTitle="E-GEAD Ecosystem"
        egeadSubtitle="AI Precision & Sub-24H US POD"
        traditionalTitle="Legacy 3PL / Print Vendors"
        traditionalSubtitle="Batch Manual Processing"
        rows={comparisonRows}
      />

      {/* SECTION 8: Enterprise SLA Protection & Compliance Badges */}
      <section
        id="sla-compliance"
        className="relative w-full py-20 sm:py-24 bg-[#0A0D0E] border-t border-[#262C30] text-white overflow-hidden"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
              Account Safety &amp; SLAs
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
              Enterprise SLA Protection &amp; Compliance Badges
            </h2>
            <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] leading-[1.75] font-light font-montserrat max-w-2xl mx-auto">
              Automated operations maintaining strict compliance with marketplace algorithms.
            </p>
          </div>

          {/* 4 Compliance Cards matching /company card aesthetic */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBadges.map((badge, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#1D2224] border border-[#262C30] flex items-center justify-center text-[#5EFC8D] mb-6 group-hover:scale-105 group-hover:border-[#10E774]/40 group-hover:shadow-[0_0_20px_rgba(16,231,116,0.2)] transition-all">
                    {badge.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#D4FAE6] font-montserrat mb-3 group-hover:text-[#5EFC8D] transition-colors leading-snug">
                    {badge.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b3b3b3] font-light font-montserrat leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Flagship Service Portals (Matching /company Section 9 3D dual-state icon cards) */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
        <div className="w-full mb-10 sm:mb-14">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
            Flagship Platforms
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            Dedicated engines built for automated scale.
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: SpeedX US POD Engine */}
          <div className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px]">
            <div>
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
                SpeedX POD Fulfillment
              </p>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
                <img
                  src="/assets/icon31.svg"
                  alt="SpeedX POD fulfillment icon"
                  className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="/assets/icon32.svg"
                  alt="SpeedX POD fulfillment color icon"
                  className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] mb-4 font-montserrat leading-snug">
                Sub-24H US printing &amp; direct domestic dispatch.
              </h3>
              <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-relaxed font-montserrat">
                23-inch roll-fed DTF, automated barcode WMS, and 100% TikTok Shop US compliance.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/speedx"
                className="group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-[#10E774] transition-all duration-300 font-montserrat"
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
                <span>SpeedX Fulfillment</span>
              </Link>
            </div>
          </div>

          {/* Card 2: SmartCommerce Platform */}
          <div className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px]">
            <div>
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
                SmartCommerce Platform
              </p>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
                <img
                  src="/assets/Name_Job_Opportunities__Color_BnW.svg"
                  alt="SmartCommerce platform icon"
                  className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="/assets/Name_Job_Opportunities__Color_Colorful.svg"
                  alt="SmartCommerce platform color icon"
                  className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] mb-4 font-montserrat leading-snug">
                Unified multi-channel catalog &amp; order sync.
              </h3>
              <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-relaxed font-montserrat">
                Bidirectional synchronization across Amazon, Etsy, TikTok Shop, and Shopify with zero stockouts.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/smartcommerce"
                className="group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-[#10E774] transition-all duration-300 font-montserrat"
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
                <span>SmartCommerce</span>
              </Link>
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
            Got Questions? <span className="text-[#5EFC8D] font-medium">We Have Answers.</span>
          </>
        }
        subtitle="Review key details regarding our SLAs, custom integrations, pricing model, and account protections."
        items={faqs}
        categories={['Operations & SLA', 'Integrations & API', 'Pricing & Economics', 'Growth & Ads']}
      />

      {/* Global Contact & Inquiry Block */}
      <ContactBlock />
    </div>
  );
}
