import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
  Cpu,
  Palette,
  AlertOctagon,
  ExternalLink,
} from 'lucide-react';
import {
  BentoGrid,
  MetricsRibbon,
  ComparisonTable,
  FaqAccordion,
  WorkflowTimeline,
  AddressDemo,
  PricingCalculator,
  ApiTerminal,
  LiveCountdownCard,
} from '@/components/sections';
import type { BentoItem, MetricItem, ComparisonRow, FaqItem, WorkflowStep } from '@/components/sections';
import ContactBlock from '@/components/ContactBlock';

export const metadata: Metadata = {
  title: 'SpeedX & Eweb-character | AI Order Precision & Sub-24H US POD Fulfillment',
  description:
    'Eweb-character AI normalizes cross-border addresses, eliminates RTO, and executes 23-inch large-format DTF print-on-demand fulfillment in the US under 24 hours from $6 all-in.',
  keywords: [
    '24 hour POD fulfillment USA',
    'TikTok Shop compliant POD',
    'AI address normalization ecommerce',
    'DTF print on demand US',
    'US POD fulfillment 24 hours',
    'large format direct to film printing',
  ],
};

const blanksCatalog = [
  {
    name: 'Classic Heavyweight Tee',
    brand: 'Gildan 5000 / Shaka Wear',
    weight: '5.3 oz / 180 GSM',
    fabric: '100% Pre-shrunk Cotton',
    fit: 'Classic Streetwear Boxy Fit',
    sizes: 'S to 5XL (30+ Colors)',
    tag: 'Best Seller',
    stockStatus: 'In Stock (100K+ Units)',
  },
  {
    name: 'Vintage Garment-Dyed Tee',
    brand: 'Comfort Colors 1717',
    weight: '6.1 oz / 207 GSM',
    fabric: '100% Ringspun Cotton',
    fit: 'Relaxed Retro Washed Drape',
    sizes: 'S to 4XL (24+ Colors)',
    tag: 'Premium Favorite',
    stockStatus: 'In Stock (65K+ Units)',
  },
  {
    name: 'Retail-Fit Unisex Tee',
    brand: 'Bella+Canvas 3001',
    weight: '4.2 oz / 142 GSM',
    fabric: '100% Airlume Combed Cotton',
    fit: 'Fitted Modern Lifestyle',
    sizes: 'XS to 3XL (32+ Colors)',
    tag: 'Ultra Soft',
    stockStatus: 'In Stock (50K+ Units)',
  },
  {
    name: 'Heavy Blend Fleece Hoodie',
    brand: 'Gildan 18500 / 18000',
    weight: '8.0 oz / 271 GSM',
    fabric: '50% Cotton / 50% Polyester',
    fit: 'Warm Pouch Hooded Pullover',
    sizes: 'S to 5XL (20+ Colors)',
    tag: 'Fall / Winter Essential',
    stockStatus: 'In Stock (40K+ Units)',
  },
];

export default function SpeedXPage() {
  // Section 2: Metrics
  const speedxMetrics: MetricItem[] = [
    {
      value: '< 18.4 Hours',
      label: 'Median Order Turnaround',
      trend: 'Sub-24H SLA',
      description: 'Median time from incoming webhook ingestion to domestic carrier first scan.',
    },
    {
      value: '23 Inches',
      label: 'Maximum DTF Print Width',
      trend: 'Large-Format',
      description: 'Industrial roll-fed printing capable of edge-to-edge oversize graphics.',
    },
    {
      value: '0.2%',
      label: 'Average Late Dispatch Rate',
      trend: 'TikTok Shield',
      description: '20x safer than TikTok Shop US 4.0% late dispatch penalty threshold.',
    },
    {
      value: '-82%',
      label: 'Drop in Address RTO',
      trend: 'AI CASS Certified',
      description: 'Proprietary USPS address sanitization eliminates return-to-origin waste.',
    },
  ];

  // Section 3: Problem vs Solution Table
  const crisisComparisonRows: ComparisonRow[] = [
    {
      feature: 'Production & Carrier Dispatch SLA',
      category: 'Fulfillment Speed',
      egead: 'Guaranteed Sub-24 Hours physical origin scan',
      traditional: '3 to 5 Business Days delay',
      egeadNote: 'Same-day carrier handover protects seller metrics',
      traditionalNote: 'High cancellation rates and Late Dispatch strikes',
      highlight: true,
    },
    {
      feature: 'TikTok Shop US Account Health',
      category: 'Compliance',
      egead: '0.2% Average LDR (Fast Dispatch Badge)',
      traditional: 'Frequently breaches 4.0% LDR ceiling',
      egeadNote: 'Protects store visibility and algorithmic recommendation',
      traditionalNote: 'Triggers Order Volume Limits (OVL) and permanent shop bans',
      highlight: true,
    },
    {
      feature: 'Address Normalization & Validation',
      category: 'AI Automation',
      egead: 'Proprietary AI CASS & Zip+4 Standardization',
      traditional: 'Manual inspection or raw payload dispatch',
      egeadNote: 'Resolves typos, abbreviations, and missing suite numbers',
      traditionalNote: 'Causes up to 8% lost revenue in return-to-origin packages',
    },
    {
      feature: 'Unit Pricing & Cost Transparency',
      category: 'Unit Economics',
      egead: '$6.00 Flat All-In per unit base rate',
      traditional: 'Base $4.00 + pick + pack + prep fees ($7-$9)',
      egeadNote: 'Garment, 23-inch print, sorting, and packaging included',
      traditionalNote: 'Opaque monthly billing with surprise surcharge fees',
    },
    {
      feature: 'Printing Format & Graphic Coverage',
      category: 'Print Technology',
      egead: '23-Inch Wide Industrial Roll-Fed DTF',
      traditional: 'Standard 12x14 Inch DTG Flatbed',
      egeadNote: 'Full-coverage oversize, hoodies, streetwear, and dark garments',
      traditionalNote: 'Limited print areas and heavy pre-treatment box stains',
    },
  ];

  // Section 5: Bento DTF Tech Deep Dive
  const dtfTechItems: BentoItem[] = [
    {
      id: 'printhead-hardware',
      title: 'Dual Epson i3200 Industrial Heads',
      tag: 'Hardware Architecture',
      description:
        'Continuous 24-inch roll-fed printing paired with automated RIP nesting software to achieve zero film waste and pixel-perfect 2400 DPI sharpness.',
      stats: { value: '2400 DPI', label: 'Ultra High-Definition' },
      colSpan: 2,
      highlight: true,
      icon: <Cpu className="w-6 h-6 text-[#25E2CC]" aria-hidden="true" />,
    },
    {
      id: 'wash-durability',
      title: '60+ Wash Cycle Durability',
      tag: 'Wash Fastness',
      description:
        'Automated powder shaker and infrared oven curing bonding OEKO-TEX eco-solvent inks with high-elastic hot-melt adhesive that flexes without cracking.',
      stats: { value: '60+ Washes', label: 'Zero Fading or Peeling' },
      colSpan: 1,
      icon: <Sparkles className="w-6 h-6 text-[#25E2CC]" aria-hidden="true" />,
    },
    {
      id: 'expanded-gamut',
      title: 'Expanded Gamut: CMYK + White + Fluorescent',
      tag: 'Color Gamut',
      description:
        'High-density white ink underbase ensures 100% opacity on pitch-black hoodies, while specialized neon fluorescent channels reproduce vibrant cyber colors.',
      stats: { value: '100% Opacity', label: 'Dark Garment Vibrancy' },
      colSpan: 3,
      icon: <Palette className="w-6 h-6 text-[#25E2CC]" aria-hidden="true" />,
    },
  ];

  // Section 6: 6-Station WMS Workflow Timeline
  const wmsSteps: WorkflowStep[] = [
    {
      step: '01',
      title: 'API Intake & Auto-Ganging',
      description: 'Webhook captures orders and intelligently nests graphics across 23-inch rolls.',
      subtext: 'Sub-150ms Processing • Zero Film Waste',
      badge: 'Automated',
    },
    {
      step: '02',
      title: 'High-Speed DTF Roll Printing',
      description: 'Continuous industrial roll-fed printing with eco-friendly OEKO-TEX pigments.',
      subtext: '2400 DPI • High Density White Ink',
      badge: 'Printing',
    },
    {
      step: '03',
      title: 'Powder Shaker & Oven Curing',
      description: 'Automated hot-melt adhesive application and infrared tunnel curing.',
      subtext: '60+ Wash Durability • Stretch Resistant',
      badge: 'Curing',
    },
    {
      step: '04',
      title: 'Carousel Heat Pressing',
      description: 'Pneumatic industrial heat presses fuse graphics onto blanks in 15 seconds.',
      subtext: 'Controlled PSI • Zero Pretreatment Stains',
      badge: 'Pressing',
    },
    {
      step: '05',
      title: 'Optical & Barcode QC Inspection',
      description: 'High-res cameras and optical barcode scanners verify color match and SKU accuracy.',
      subtext: '99.9% Packing Accuracy • Zero Defect',
      badge: 'QC Scan',
    },
    {
      step: '06',
      title: 'Automated Labeling & Carrier Hand-Off',
      description: 'USPS / UPS labels applied and packages loaded directly into carrier transport trucks.',
      subtext: 'Sub-24H First Carrier Scan Injected',
      badge: 'Dispatched',
    },
  ];

  // Section 11: FAQs
  const speedxFaqs: FaqItem[] = [
    {
      question: 'What file formats do you accept for 23-inch DTF printing?',
      answer:
        'We accept high-resolution PNG, TIFF, and PDF files at 300 DPI with a transparent background. Both sRGB and CMYK color profiles are supported by our automated RIP color-management software.',
      category: 'File Specs',
    },
    {
      question: 'What happens if an order is delayed past the 24-hour guarantee?',
      answer:
        'If any standard domestic POD order fails to receive a physical carrier origin scan within 24 business hours due to our production line, we automatically refund 100% of the fulfillment fee and dispatch the item at zero charge.',
      category: 'SLA Guarantee',
    },
    {
      question: 'How does the AI address normalization engine handle customer typos?',
      answer:
        'Eweb-character AI cross-references incoming addresses against the official USPS CASS postal database. It automatically corrects spelling errors, standardizes street abbreviations (e.g., "Ter" for "Terrace"), appends missing Zip+4 codes, and flags undeliverable addresses before printing.',
      category: 'AI Engine',
    },
    {
      question: 'Do you offer custom neck labels and packaging inserts?',
      answer:
        'Yes. We support custom heat-transferred neck labels, branded hangtags, and promotional packaging inserts (e.g., thank-you cards or discount stickers) to maintain a complete white-label unboxing experience for your brand.',
      category: 'Branding',
    },
    {
      question: 'Which domestic carriers do you use in the United States?',
      answer:
        'We partner directly with USPS Ground Advantage, USPS Priority Mail, and UPS Ground. All tracking numbers are generated and synchronized with your store within hours of production.',
      category: 'Logistics',
    },
    {
      question: 'Can I order physical sample garments before connecting my live store?',
      answer:
        'Yes. We provide sample packs allowing you to test garment blanks, 23-inch print coverage, and wash durability firsthand. Samples are dispatched within 24 hours of ordering.',
      category: 'Samples',
    },
  ];

  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-24 sm:pt-32">
      {/* SECTION 1: Kinetic Hero with Live 24H Dispatch Countdown */}
      <section
        id="speedx-hero"
        className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 py-16 sm:py-24 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Neon Glow Backdrop */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-[#25E2CC]/10 blur-[170px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-[#262C30] text-[#25E2CC] text-xs font-semibold tracking-wider uppercase mb-6 font-montserrat shadow-[0_0_15px_rgba(37,226,204,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#25E2CC] animate-pulse" />
              Propelled by Eweb-character AI
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white font-rubik leading-[1.08] mb-6">
              Eweb-character: <br />
              <span className="text-[#25E2CC]">AI Precision. Sub-24H POD.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#8C8C8C] leading-relaxed font-montserrat max-w-2xl mb-8">
              Eliminate return-to-origin (RTO) with proprietary AI address correction, print oversized 23-inch DTF graphics on industrial machinery, and dispatch orders to US domestic carriers in under 24 hours from just $6 all-in.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25E2CC] text-black font-bold text-sm sm:text-base font-montserrat hover:bg-[#1ec2af] transition-all duration-200 shadow-[0_0_25px_rgba(37,226,204,0.35)] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]"
              >
                <span>Start Fulfilling in 24H</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <a
                href="#ai-address-normalization"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#141718] text-white border border-[#262C30] font-semibold text-sm sm:text-base font-montserrat hover:border-[#25E2CC]/40 hover:text-[#25E2CC] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]"
              >
                <span>View Live Address Demo</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Live Countdown Card */}
          <div className="lg:col-span-5">
            <LiveCountdownCard />
          </div>
        </div>
      </section>

      {/* SECTION 2: Instant Production Metrics Strip */}
      <MetricsRibbon
        id="speedx-metrics"
        badge="SpeedX Production Velocity"
        title="Industrial Speed Meets Uncompromising Quality"
        subtitle="Real metrics recorded across our US print-on-demand fulfillment network"
        metrics={speedxMetrics}
      />

      {/* SECTION 3: The Cross-Border POD Crisis vs E-GEAD Solution */}
      <ComparisonTable
        id="the-pod-crisis"
        badge="Market Reality Check"
        title={
          <>
            The Legacy 3PL Crisis vs <span className="text-[#25E2CC]">The Eweb-character Standard</span>
          </>
        }
        subtitle="Delayed carrier scans cause TikTok Shop account bans and lost customer trust. Here is how E-GEAD solves it."
        egeadTitle="Eweb-character Standard"
        egeadSubtitle="AI Precision & Sub-24H Dispatch"
        traditionalTitle="Legacy 3PL Vendors"
        traditionalSubtitle="3-5 Day Print Delays & Hidden Fees"
        rows={crisisComparisonRows}
      />

      {/* SECTION 4: AI Address Normalization Engine Visual Demo */}
      <AddressDemo id="ai-address-normalization" />

      {/* SECTION 5: 23-Inch Industrial DTF Printing Technology Deep Dive */}
      <BentoGrid
        id="dtf-technology"
        badge="Print Hardware Engineering"
        title={
          <>
            23-Inch Industrial DTF: <br />
            <span className="text-[#25E2CC]">Full-Coverage Streetwear Excellence</span>
          </>
        }
        description="We eliminated legacy DTG limitations. Enjoy massive print areas, vibrant fluorescent pigments, and wash durability that outlasts the garment itself."
        items={dtfTechItems}
      />

      {/* SECTION 6: Barcode-Driven 6-Station WMS Production Flow */}
      <WorkflowTimeline
        id="wms-production-flow"
        badge="WMS Factory Discipline"
        title={
          <>
            6-Station Barcode-Verified <span className="text-[#25E2CC]">Production Flow</span>
          </>
        }
        subtitle="From automated API artwork ganging to carrier handover, every garment is tracked with optical barcode scans."
        steps={wmsSteps}
      />

      {/* SECTION 7: Transparent $6 All-In Pricing Breakdown & Calculator */}
      <PricingCalculator id="pricing-calculator" />

      {/* SECTION 8: TikTok Shop US LDR Shield & Account Health Guardian */}
      <section
        id="tiktok-sla-shield"
        className="relative w-full py-20 sm:py-24 bg-[#0A0D0E] border-t border-[#262C30] text-white overflow-hidden"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 max-w-6xl mx-auto">
          <div className="rounded-[32px] bg-gradient-to-br from-[#141718] via-[#121617] to-[#0A0D0E] border-2 border-[#25E2CC]/40 p-8 sm:p-12 lg:p-16 backdrop-blur-md relative overflow-hidden shadow-[0_0_45px_rgba(37,226,204,0.15)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25E2CC]/10 text-[#25E2CC] text-xs font-semibold uppercase tracking-wider font-montserrat">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  Marketplace Account Guardian
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-rubik leading-tight">
                  TikTok Shop US LDR Shield: <br />
                  <span className="text-[#25E2CC]">Never Risk an Account Strike</span>
                </h2>
                <p className="text-sm sm:text-base text-[#8C8C8C] font-montserrat leading-relaxed">
                  TikTok Shop Seller Center enforces a strict 4.0% Late Dispatch Rate threshold with required physical origin scan within 2 business days. Breach it, and your shop faces Order Volume Limits (OVL) or permanent suspension.
                </p>
                <div className="space-y-2 pt-2 text-xs sm:text-sm font-montserrat text-[#D3F9F5]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#25E2CC] flex-shrink-0" aria-hidden="true" />
                    <span>Average origin scan achieved within <strong>18.4 hours</strong> of order intake</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#25E2CC] flex-shrink-0" aria-hidden="true" />
                    <span>Automated priority escalation for orders approaching 20 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#25E2CC] flex-shrink-0" aria-hidden="true" />
                    <span><strong>100% money-back guarantee</strong> if production delay breaches domestic SLA</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Policy Warning Card */}
              <div className="lg:col-span-5 bg-[#0A0D0E]/90 border border-yellow-500/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase font-montserrat">
                  <AlertOctagon className="w-4 h-4" aria-hidden="true" />
                  TikTok Shop Policy Mandate (2026)
                </div>
                <blockquote className="text-xs font-mono text-[#8C8C8C] leading-relaxed italic border-l-2 border-yellow-500/50 pl-3">
                  &ldquo;Sellers with Late Dispatch Rate (LDR) exceeding 4.0% across a 30-day window will be restricted from running paid TikTok Shop Ads and subject to daily dispatch caps.&rdquo;
                </blockquote>
                <div className="p-3 rounded-xl bg-[#25E2CC]/10 border border-[#25E2CC]/30 flex items-center justify-between text-xs font-montserrat">
                  <span className="text-white font-semibold">E-GEAD Store Average:</span>
                  <span className="text-[#25E2CC] font-bold font-mono">0.2% LDR (Optimal)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Premium Blanks Catalog & Technical Specifications */}
      <section
        id="blanks-catalog"
        className="relative w-full py-20 sm:py-24 bg-[#0A0D0E] text-white overflow-hidden"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-[#262C30] text-[#25E2CC] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 font-montserrat">
              <Layers className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
              Pre-Stocked Inventory
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-rubik leading-[1.2]">
              Premium Blanks Catalog &amp; <span className="text-[#25E2CC]">Warehouse Stock</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#8C8C8C] leading-relaxed font-montserrat max-w-2xl mx-auto">
              Never worry about stockouts when running viral sales campaigns. Over 250,000 blank garments are maintained across our East and West Coast US hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blanksCatalog.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[26px] bg-[#141718]/90 border border-[#262C30] hover:border-[#25E2CC]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#25E2CC]/10 text-[#25E2CC] font-montserrat">
                      {item.tag}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white font-rubik mb-1 group-hover:text-[#25E2CC] transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-xs text-[#8C8C8C] font-mono mb-4">
                    {item.brand}
                  </div>

                  <div className="space-y-2 text-xs font-montserrat text-[#D3F9F5]/80 pt-3 border-t border-[#262C30]">
                    <div>
                      <span className="text-[#8C8C8C]">Weight: </span>
                      {item.weight}
                    </div>
                    <div>
                      <span className="text-[#8C8C8C]">Fabric: </span>
                      {item.fabric}
                    </div>
                    <div>
                      <span className="text-[#8C8C8C]">Cut &amp; Fit: </span>
                      {item.fit}
                    </div>
                    <div>
                      <span className="text-[#8C8C8C]">Sizes: </span>
                      {item.sizes}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#262C30] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400">● {item.stockStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: Developer RESTful API & Webhook Terminal */}
      <ApiTerminal id="api-terminal" />

      {/* SECTION 11: SpeedX & POD Production FAQ Accordion */}
      <FaqAccordion
        id="speedx-faq"
        badge="Production & Engineering FAQ"
        title={
          <>
            SpeedX Technical &amp; <span className="text-[#25E2CC]">Fulfillment Inquiries</span>
          </>
        }
        subtitle="Everything you need to know about 23-inch DTF quality, SLA refund policies, and AI address normalization."
        items={speedxFaqs}
        categories={['File Specs', 'SLA Guarantee', 'AI Engine', 'Branding', 'Logistics', 'Samples']}
      />

      {/* SECTION 12: High-Octane Conversion CTA */}
      <section
        id="speedx-cta"
        className="relative w-full py-20 sm:py-28 bg-[#0A0D0E] text-white overflow-hidden"
      >
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 max-w-5xl mx-auto">
          <div className="rounded-[36px] bg-gradient-to-br from-[#141718] via-[#101416] to-[#0A0D0E] border-2 border-[#25E2CC]/40 p-8 sm:p-12 lg:p-16 text-center shadow-[0_0_60px_rgba(37,226,204,0.15)] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#25E2CC]/10 blur-[140px] rounded-full pointer-events-none" />

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-[#262C30] text-[#25E2CC] text-xs font-semibold tracking-wider uppercase mb-6 font-montserrat">
              <Sparkles className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
              Connect in 5 Minutes
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-rubik leading-[1.1] mb-6 tracking-tight">
              Stop Losing Money on <br />
              <span className="text-[#25E2CC]">Print Delays &amp; High RTO.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#8C8C8C] font-montserrat max-w-2xl mx-auto leading-relaxed mb-10">
              Claim 10 free sample prints and enjoy 14 days of complimentary access to Eweb-character AI address normalization.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25E2CC] text-black font-bold text-sm sm:text-base font-montserrat hover:bg-[#1ec2af] transition-all duration-200 shadow-[0_0_30px_rgba(37,226,204,0.4)] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]"
              >
                <span>Connect Your Storefront Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                href="/smartcommerce"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#141718] text-white border border-[#262C30] font-bold text-sm sm:text-base font-montserrat hover:border-[#25E2CC]/40 hover:text-[#25E2CC] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]"
              >
                <span>Explore SmartCommerce Sync</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 pt-8 border-t border-[#262C30]/60 text-xs text-[#8C8C8C] font-montserrat">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                No Setup Fee or Contract
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                Sub-24H SLA Guaranteed
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                10 Free Sample Prints Included
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Contact Block */}
      <ContactBlock />
    </div>
  );
}
