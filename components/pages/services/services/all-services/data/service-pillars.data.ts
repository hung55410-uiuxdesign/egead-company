import type { ServicePillar } from '../types';

export const servicePillars: ServicePillar[] = [
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
