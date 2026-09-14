import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, ArrowUpRight } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

interface ArticleData {
  title: string;
  subtitle?: string;
  tag: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: string[];
}

const articlesMap: Record<string, ArticleData> = {
  'expanding-cross-border-ecommerce-playbook': {
    title: 'The 2026 Global E-Commerce Playbook: Expanding Across US, UK, and Australian Marketplaces',
    subtitle: 'Strategic execution for cross-border retailers targeting high-purchasing Western markets',
    tag: 'Market Expansion',
    date: 'January 15, 2026',
    readTime: '6 mins read',
    heroImage: '/assets/case_brother.jpg',
    content: [
      'The global cross-border e-commerce landscape is undergoing a decisive structural shift. Consumer demand in the United States, the United Kingdom, Germany, and Australia is increasingly gravitating toward personalized apparel, niche home decor, and customized consumer lifestyle goods. For international merchants, the addressable market has never been larger.',
      'However, the primary hurdle for cross-border merchants is rarely product design or consumer appetite—it is logistics execution and delivery reliability. Western online shoppers expect fast, predictable 2-to-4 day transit windows with end-to-end carrier tracking visibility. Traditional postal shipping methods taking 12-25 days invariably lead to customer disputes, chargebacks, and damaging 1-star reviews.',
      'E-GEAD resolves this fundamental bottleneck by deploying localized manufacturing and warehouse operations directly in the United States. When a customer completes checkout on your storefront, our automated order routing engine validates print files and dispatches production to our US facilities in under 24 hours. Finished goods are handed off directly to USPS, UPS, and FedEx, reaching customer doorsteps in 2 to 3 days.',
      'Furthermore, expanding across multi-channel environments requires resilient automated catalog orchestration. Managing product variations, currency fluctuations, and sales tax compliance across multiple platforms becomes unmanageable through manual spreadsheets. By leveraging E-GEAD’s Eweb-platform, sellers maintain a single source of truth across Amazon, TikTok Shop, Etsy, and Shopify, ensuring catalog consistency and inventory integrity.',
      'Coupled with high-intent digital growth marketing delivering proven 4.8x ROAS benchmarks, merchants can scale operational volume from dozens of daily shipments to thousands without linear headcount increases.',
    ],
  },
  'tiktok-shop-us-sla-compliance-guide': {
    title: 'Conquering TikTok Shop US: How Sub-24h Fulfillment Eliminates Late Dispatch Penalties',
    subtitle: 'The ultimate operational blueprint to maintain Top Seller status and protect account health',
    tag: 'Operations & SLA',
    date: 'February 02, 2026',
    readTime: '5 mins read',
    heroImage: '/assets/case_suntory.jpg',
    content: [
      'TikTok Shop US represents the fastest-growing social commerce channel in the world, generating unprecedented viral sales volumes. However, TikTok Shop enforces the most stringent seller performance benchmarks in the e-commerce industry, with particular emphasis on Late Dispatch Rate (LDR).',
      'Under current TikTok Shop guidelines, merchants must generate carrier-accepted tracking scans within a strict 48-hour operational window. Traditional print-on-demand fulfillment centers that require 3 to 5 business days for batch processing expose sellers to severe algorithmic penalties, daily order throttling, and eventual store suspension.',
      'At E-GEAD, sub-24 hour fulfillment is an engineered operational standard. Utilizing high-throughput 23-inch large-format printing lines and direct barcode queuing, orders received before operational cutoff are produced, quality-inspected, and packaged on the exact same business day.',
      'Our warehouse management system (WMS) is integrated directly with TikTok Shop US partner APIs. The moment an order passes our final quality gate and barcode scan, carrier tracking numbers are generated and synchronized back to your seller center in real time, guaranteeing a 100% on-time dispatch rate.',
      'Maintaining flawless SLA metrics does more than protect your account—it grants your products preferential visibility within TikTok Shop’s discovery algorithm, ensuring higher conversion rates during viral creator flash sales.',
    ],
  },
  'wms-barcode-automation-inventory-accuracy': {
    title: 'Achieving 99.9% Fulfillment Accuracy: Why Barcode WMS is Essential for High-Volume Sellers',
    subtitle: 'Eliminating packing errors, overselling, and inventory discrepancies with digitized warehouse control',
    tag: 'Technology & WMS',
    date: 'February 20, 2026',
    readTime: '5 mins read',
    heroImage: '/assets/case_weir.jpg',
    content: [
      'As cross-border sellers scale past 500 daily orders, manual fulfillment processes inevitably collapse under their own complexity. Mismatched SKUs, incorrect garment sizes, and inverted shipping labels lead to devastating customer churn, costly return shipping expenses, and platform policy strikes.',
      'E-GEAD’s proprietary WMS architecture eliminates manual human guesswork by enforcing end-to-end barcode verification across every touchpoint in the fulfillment lifecycle.',
      'From the moment blank inventory is received at our facility, each raw item is assigned a digital barcode locator. During the picking process, mobile handheld scanners verify that the selected blank matches the exact SKU, color, and size specified in the customer order payload.',
      'At the print station, automated barcode scanners verify the visual design file against the physical substrate. Finally, during packaging, the shipping label is generated only after the scanner confirms that all items within the package match the packing slip.',
      'This multi-stage digital verification delivers a verified 99.9% fulfillment accuracy rate, freeing brand founders to focus entirely on creative design and customer acquisition rather than resolving return tickets.',
    ],
  },
  'transparent-pod-pricing-landed-cost-optimization': {
    title: 'Mastering E-Commerce Unit Economics: Flat-Rate $6 All-In POD and Net Margin Protection',
    subtitle: 'Predictable manufacturing cost models designed for sustainable digital advertising scale',
    tag: 'Financial Strategy',
    date: 'March 01, 2026',
    readTime: '5 mins read',
    heroImage: '/assets/case_manulife.jpg',
    content: [
      'In high-volume performance marketing, predictable unit economics make the difference between profitable scaling and unexpected financial loss. Many print-on-demand providers lure merchants with low base item prices, only to add hidden fees for direct-to-garment pretreatments, white ink passes, oversize surcharges, and opaque shipping markups.',
      'E-GEAD operates on a transparent, flat-rate pricing model starting from $6 all-in per unit. This comprehensive rate covers high-grade manufacturing, industrial printing on 23-inch production lines, polybag packaging, and automated carrier dispatch.',
      'By locking in fixed production costs, media buyers and DTC founders can calculate their exact customer acquisition cost (CAC) ceilings and target return on ad spend (ROAS) before deploying capital across TikTok and Meta Ads.',
      'Our Eweb-platform dashboard provides real-time financial reconciliation, calculating net profit per SKU by automatically aggregating print costs, domestic postage, and marketplace commission percentages.',
      'With complete visibility into true landed costs, E-GEAD partners scale their campaigns with confidence, knowing their profit margins are protected on every single transaction.',
    ],
  },
};

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = articlesMap[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-[#25E2CC] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#25E2CC] text-black font-bold text-xs uppercase tracking-wider">
            {article.tag}
          </span>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#25E2CC]" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#25E2CC]" />
              {article.readTime}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] mb-6">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-lg sm:text-xl text-[#25E2CC] font-medium leading-relaxed">
            {article.subtitle}
          </p>
        )}
      </header>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#141718]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 space-y-6 text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <ContactBlock />
    </article>
  );
}
