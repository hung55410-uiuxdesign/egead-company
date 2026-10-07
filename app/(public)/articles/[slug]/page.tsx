import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, ArrowUpRight } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';
import MotionSection, { MotionHero, MotionDiv } from '@/components/MotionSection';
import { getPostBySlug } from '@/lib/blogs';

interface ArticleData {
  title: string;
  subtitle?: string;
  tag: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: string | string[];
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
  'omnichannel-fulfillment-retail-playbook': {
    title: 'Omnichannel Fulfillment: The Definitive Guide for Modern Retailers (2026)',
    subtitle: 'Streamlining cross-channel logistics, unified inventory synchronization, and automated order routing',
    tag: 'Retail Strategy',
    date: 'Sep 22, 2026',
    readTime: '17 MIN',
    heroImage: '/assets/insight_omnichannel.jpg',
    content: [
      'Modern retail demands an omnichannel fulfillment strategy that bridges physical storefronts, DTC web stores, and major global marketplaces. Today’s consumers expect frictionless execution: click-and-collect (BOPIS), cross-state fulfillment, and predictable same-day dispatch.',
      'To solve data fragmentation across channels, E-GEAD delivers SmartCommerce architecture that unifies sales channels in real time. Inventory is tracked and allocated dynamically to the closest fulfillment nodes, drastically reducing transit times and last-mile freight surcharges.',
      'With barcode-verified WMS accuracy exceeding 99.9%, retailers eliminate mispicks, minimize costly returns, and maintain unmatched customer retention rates.',
    ],
  },
  'o2o-online-to-offline-marketing-strategies': {
    title: 'Online-to-Offline (O2O) Commerce: Driving In-Store Foot Traffic Through Digital Channels',
    subtitle: 'Attracting high-intent online shoppers to physical destinations using algorithmic geo-targeting and multi-platform media',
    tag: 'Growth Marketing',
    date: 'Jan 6, 2026',
    readTime: '25 MIN',
    heroImage: '/assets/insight_o2o.jpg',
    content: [
      'Online-to-Offline (O2O) commerce is reshaping fashion, apparel, and lifestyle consumer retail. Leveraging online viral traction from TikTok, Meta, and Google Ads to guide customers directly into physical retail locations dramatically expands average order value (AOV) and customer lifetime value.',
      'E-GEAD partners with emerging brands to architect intelligent conversion funnels: combining hyper-local geo-targeting, exclusive digital loyalty mobile activations, and instant counter checkout fulfillment.',
      'Merging digital data telemetry with tangible retail touchpoints is the key to sustainable brand equity and scalable retail growth.',
    ],
  },
  'conquering-tiktok-shop-us-ldr-compliance': {
    title: 'Mastering TikTok Shop US: Keeping Late Dispatch Rate Below 1% with Sub-24H Fulfillment',
    subtitle: 'Protecting seller health ratings and algorithmic preference during viral sales surges',
    tag: 'Operations',
    date: 'Oct 02, 2026',
    readTime: '12 MIN',
    heroImage: '/assets/insight_tiktok.jpg',
    content: [
      'TikTok Shop US enforces some of the most stringent fulfillment standards in e-commerce, requiring a Late Dispatch Rate (LDR) strictly under 4%. For cross-border print-on-demand sellers, traditional 3-to-5 day manufacturing lead times lead to algorithmic throttling and sudden account suspension.',
      'E-GEAD operates large-format 23-inch industrial DTF printing and warehouse hubs located directly in the United States. With a strict sub-24h turnaround from order receipt to carrier induction scans, partner stores consistently maintain an LDR under 0.18%, earning coveted Fast Dispatch badges.',
      'Real-time API integrations automatically push carrier tracking numbers directly into TikTok Shop Seller Center, empowering sellers to scale affiliate creator live-streams with absolute fulfillment peace of mind.',
    ],
  },
  'ai-market-trend-forecasting-ecommerce-2027': {
    title: 'Predictive E-Commerce 2027: Leveraging AI Consumer Analytics for Global Expansion',
    subtitle: 'Detecting breakout niche consumer demand and automating rapid product launch cycles',
    tag: 'Technology',
    date: 'Oct 15, 2026',
    readTime: '15 MIN',
    heroImage: '/assets/insight_ai_analytics.jpg',
    content: [
      'Real-time market intelligence is the single greatest competitive edge for modern digital brands. E-GEAD’s AI analytics platform continuously parses millions of consumer behavioral data points across Amazon, Etsy, TikTok Shop, and global search engines.',
      'The engine automatically surfaces high-margin product niches before market saturation occurs, recommending design concepts, pricing ranges, and optimized search metadata for immediate deployment.',
      'By pairing artificial intelligence forecasting with agile on-demand manufacturing, retailers test new market opportunities with near-zero overhead and scale winning product lines instantaneously.',
    ],
  },
  'cross-border-supply-chain-optimization-d2c': {
    title: 'Cross-Border Supply Chain Optimization: Warehouse Strategies for Scaled D2C Brands',
    subtitle: 'Maximizing inventory velocity and cutting storage costs with localized fulfillment nodes',
    tag: 'Logistics',
    date: 'Nov 04, 2026',
    readTime: '18 MIN',
    heroImage: '/assets/insight_supply_chain.jpg',
    content: [
      'With rising digital advertising customer acquisition costs, supply chain optimization is critical to defending net profit margins. Traditional international freight transit taking 10 to 20 days degrades conversion rates and increases customer cancellation rates.',
      'E-GEAD establishes an agile cross-border logistics ecosystem integrating dedicated air freight lanes and strategic dual-coast US warehouse nodes. When an order fires, the system dynamically routes it to the closest domestic facility, cutting delivery windows to 2-3 business days.',
      'Predictive inventory allocation models decrease long-term storage costs by up to 35% while keeping high-velocity SKUs primed for peak shopping moments including Q4 holiday peaks and flash sales.',
    ],
  },
  'dtf-automated-printing-breakthrough-apparel-pod': {
    title: 'Automated Industrial DTF Technology: The Next Frontier in Custom Apparel & Print-on-Demand',
    subtitle: 'Ultra-high fidelity color reproduction, superior wash fastness, and sub-24h mass production',
    tag: 'Manufacturing',
    date: 'Nov 12, 2026',
    readTime: '14 MIN',
    heroImage: '/assets/insight_dtf_tech.jpg',
    content: [
      'Industrial 23-inch Direct-to-Film (DTF) transfer printing has revolutionized custom apparel, outperforming older DTG techniques across vibrant color reproduction on cotton, poly blends, and heavyweight fleece.',
      'E-GEAD’s automated industrial production lines feature latest-generation high-density Epson printheads coupled with automated continuous powder shaker-dryer units. This closed-loop process ensures soft hand feel and certified 80+ wash durability cycles.',
      'Orders are received and queued via API within seconds of customer checkout, enabling our SpeedX facilities to manufacture, inspect, and package thousands of apparel items per shift with zero defect rates.',
    ],
  },
  'multi-channel-wms-warehouse-integration-scale': {
    title: 'Multi-Channel Cloud WMS: Real-Time Warehouse Synchronization for High-Volume Merchants',
    subtitle: 'Eliminating overselling discrepancies and accelerating pick-and-pack throughput with barcode telemetry',
    tag: 'Cloud WMS',
    date: 'Nov 20, 2026',
    readTime: '20 MIN',
    heroImage: '/assets/insight_wms_cloud.jpg',
    content: [
      'Scaling order volume across multiple platforms like Shopify, Amazon FBM, TikTok Shop, and WooCommerce simultaneously leads to severe inventory errors without modern digitized warehouse control.',
      'Egead Cloud WMS delivers bidirectional real-time inventory synchronization. Any stock change on one channel automatically updates all connected storefronts in sub-500ms intervals.',
      'Floor technicians use ergonomic mobile barcode scanners and automated guided vehicles (AGVs) that map the optimal pick paths through warehouse aisles, tripling fulfillment speed and achieving 99.9% inventory accuracy.',
    ],
  },
  'brand-protection-ip-compliance-global-marketplaces': {
    title: 'Brand IP Protection & Trademark Compliance Across Global E-Commerce Marketplaces',
    subtitle: 'Mitigating infringement liabilities and defending digital brand equity on international platforms',
    tag: 'Legal & Policy',
    date: 'Dec 01, 2026',
    readTime: '16 MIN',
    heroImage: '/assets/insight_brand_ip.jpg',
    content: [
      'Intellectual property protection and trademark compliance are non-negotiable fundamentals when scaling on US and European marketplaces. Accidental copyright infringement or malicious counterfeit claims can freeze payment accounts and shut down listings overnight.',
      'E-GEAD integrates an AI-driven trademark and copyright scanning gate prior to accepting print files into the production queue. The engine cross-references designs against USPTO and international IP databases, alerting sellers to potential compliance risks.',
      'Additionally, our specialized marketplace compliance team assists brands with official registration, unlocking premium merchant privileges such as Amazon Brand Registry and TikTok Shop Verified Brand status.',
    ],
  },
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const article = post || articlesMap[slug];

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 overflow-hidden">
      {/* Back button */}
      <MotionDiv
        delay={0.05}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#10E774] transition group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Insights</span>
        </Link>
      </MotionDiv>

      {/* Header */}
      <MotionHero className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#5EFC8D] text-black font-semibold text-xs tracking-wide">
            {article.tag}
          </span>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-montserrat">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#5EFC8D]" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#5EFC8D]" />
              {article.readTime}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-medium leading-[1.15] font-montserrat mb-6">
          <span className="bg-gradient-to-r from-[#D4FAE6] via-[#a3f7eb] to-[#7ceee0] bg-clip-text text-transparent">
            {article.title}
          </span>
        </h1>

        {article.subtitle && (
          <p className="text-lg sm:text-xl text-[#5EFC8D] font-normal leading-relaxed font-montserrat">
            {article.subtitle}
          </p>
        )}
      </MotionHero>

      {/* Hero Image */}
      <MotionDiv
        delay={0.15}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#141718]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      </MotionDiv>

      {/* Content Body */}
      <MotionSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 text-base sm:text-lg text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
        {Array.isArray(article.content) ? (
          <div className="space-y-6">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-[1.75]">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <div
            className="prose prose-invert max-w-none text-[#b3b3b3] font-light leading-[1.75] space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}
      </MotionSection>

      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </article>
  );
}
