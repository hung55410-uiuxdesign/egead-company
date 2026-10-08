import type { BentoItem } from '@/components/sections';

export const CERTIFIED_BENTO_ITEMS: BentoItem[] = [
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
