'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Store,
  Megaphone,
  Truck,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
} from 'lucide-react';

export interface EcosystemPartner {
  id: string;
  name: string;
  tier: 'marketplaces' | 'storefronts' | 'advertising' | 'logistics' | 'payments';
  integrationType: string;
  syncLatency: string;
  description: string;
  capabilities: string[];
  certifiedBadge: string;
  docHref?: string;
}

const PARTNERS_DATA: EcosystemPartner[] = [
  // Tier 1: Global Marketplaces
  {
    id: 'tiktok-shop-us',
    name: 'TikTok Shop US',
    tier: 'marketplaces',
    integrationType: 'Native Two-Way Open API',
    syncLatency: '< 800ms',
    description: 'Direct programmatic order ingestion, automated USPS carrier tracking callback within 12–24h, safeguarding seller account health with LDR < 1%.',
    capabilities: ['Sub-24h Tracking Push', 'Fast Dispatch Retention', 'Idempotent Routing'],
    certifiedBadge: 'Certified SLA Partner',
  },
  {
    id: 'amazon-sp-api',
    name: 'Amazon Global Selling',
    tier: 'marketplaces',
    integrationType: 'Selling Partner API (SP-API)',
    syncLatency: '< 1.1s',
    description: 'Real-time multi-channel inventory buffer balancing, automated FBM shipment confirmation, and guaranteed Valid Tracking Rate (VTR > 99%).',
    capabilities: ['FBM Auto-Confirmation', 'Buffer Throttling', 'Barcode Serial Verification'],
    certifiedBadge: 'SP-API Certified',
  },
  {
    id: 'etsy-ebay',
    name: 'Etsy & eBay Global',
    tier: 'marketplaces',
    integrationType: 'Multi-Variant REST Bridge',
    syncLatency: '< 950ms',
    description: 'Automatic decomposition of complex bespoke orders (garment size, custom color, personalized text) directly into 23-inch DTF production queues.',
    capabilities: ['Custom Attribute Parsing', 'Multi-Variant Mapping', 'Flat $6 All-In Print'],
    certifiedBadge: 'Multi-Channel Partner',
  },
  {
    id: 'walmart-marketplace',
    name: 'Walmart Marketplace',
    tier: 'marketplaces',
    integrationType: 'Direct Marketplace API',
    syncLatency: '< 1.4s',
    description: 'Enterprise catalog synchronization and automated delivery tracking compliance for domestic American retail shoppers.',
    capabilities: ['Walmart Pro-Seller SLA', 'Automated 2-Day Tags', 'Real-Time Inventory'],
    certifiedBadge: 'Enterprise Verified',
  },

  // Tier 2: Storefront Platforms
  {
    id: 'shopify-plus',
    name: 'Shopify & Shopify Plus',
    tier: 'storefronts',
    integrationType: 'Native Webhook Architecture',
    syncLatency: '< 340ms',
    description: 'Zero-code one-click setup via OAuth 2.0. Instantaneous orders/create event listening with automatic fulfillment line-item dispatch.',
    capabilities: ['One-Click OAuth Connect', 'Instant Webhook Triggers', 'Multi-Location Sync'],
    certifiedBadge: 'Verified App Partner',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce & WordPress',
    tier: 'storefronts',
    integrationType: 'REST API v3 Bridge',
    syncLatency: '< 620ms',
    description: 'High-throughput order extraction for self-hosted independent creator stores with auto-synced tracking notes.',
    capabilities: ['Automated Note Sync', 'Variant Meta Mapping', 'Zero Ingestion Throttling'],
    certifiedBadge: 'Platform Partner',
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce Enterprise',
    tier: 'storefronts',
    integrationType: 'GraphQL & Webhooks',
    syncLatency: '< 480ms',
    description: 'High-volume enterprise B2B and DTC catalog routing with instant multi-warehouse blank allocation.',
    capabilities: ['Multi-Store Routing', 'B2B Wholesale Parsing', 'Real-Time Ledger Sync'],
    certifiedBadge: 'Enterprise Certified',
  },
  {
    id: 'headless-nextjs',
    name: 'Custom Headless & Next.js',
    tier: 'storefronts',
    integrationType: 'Open Developer SDK & API',
    syncLatency: '< 120ms',
    description: 'Programmatic RESTful endpoints and HMAC-signed webhooks for engineering teams running proprietary frontends.',
    capabilities: ['HMAC Signature Validation', 'OpenAPI 3.1 Specs', 'Custom Metadata Fields'],
    certifiedBadge: 'Developer First',
  },

  // Tier 3: Advertising & Growth Networks
  {
    id: 'meta-ads-capi',
    name: 'Meta Ads & Conversions API (CAPI)',
    tier: 'advertising',
    integrationType: 'Direct Server-to-Server CAPI',
    syncLatency: '< 250ms',
    description: 'Server-side purchase event transmission bypassing browser ad-blockers and iOS restrictions to optimize ROAS for Meta campaigns.',
    capabilities: ['Server-Side Event Matching', '100% Attribution Precision', 'Dynamic Audience Sync'],
    certifiedBadge: 'Growth Alliance',
  },
  {
    id: 'tiktok-ads-manager',
    name: 'TikTok Ads Manager',
    tier: 'advertising',
    integrationType: 'TikTok Events API',
    syncLatency: '< 310ms',
    description: 'Direct server-side event sync pairing viral video creatives with actual warehouse dispatch confirmations for algorithmic ad optimization.',
    capabilities: ['Direct Purchase Signaling', 'Creative Value Optimization', 'Live Shopping Tracking'],
    certifiedBadge: 'Growth Partner',
  },
  {
    id: 'google-pmax',
    name: 'Google Performance Max & YouTube',
    tier: 'advertising',
    integrationType: 'Google Enhanced Conversions',
    syncLatency: '< 400ms',
    description: 'Encrypted first-party conversion data feeds maximizing Google Shopping and YouTube product ad placement efficiency.',
    capabilities: ['Enhanced Conversions Feed', 'YouTube Shopping Sync', 'High-Intent Bidding'],
    certifiedBadge: 'Certified Growth',
  },

  // Tier 4: Logistics & Carrier Networks
  {
    id: 'usps-commercial',
    name: 'USPS Commercial Plus Network',
    tier: 'logistics',
    integrationType: 'Direct Carrier Manifest System',
    syncLatency: '< 200ms',
    description: 'Direct electronic manifest creation with origin post office hubs, unlocking negotiated volume rates for USPS Ground Advantage & Priority Mail.',
    capabilities: ['Ground Advantage Rates', 'Origin Scan Guarantee', 'Sub-24h Carrier Handoff'],
    certifiedBadge: 'Premier Carrier Partner',
  },
  {
    id: 'ups-domestic',
    name: 'UPS Express & Ground',
    tier: 'logistics',
    integrationType: 'UPS Developer API',
    syncLatency: '< 350ms',
    description: 'Guaranteed expedited air and ground shipping across all 50 US states for high-value time-sensitive apparel and gifts.',
    capabilities: ['Next Day Air Options', 'Real-Time Rate Shopping', 'Automated Address Clean'],
    certifiedBadge: 'Carrier Alliance',
  },
  {
    id: 'fedex-dhl',
    name: 'FedEx & DHL eCommerce',
    tier: 'logistics',
    integrationType: 'Global Sortation API',
    syncLatency: '< 420ms',
    description: 'Cross-border postal injection and regional hub sortation delivering packages worldwide with unified tracking numbers.',
    capabilities: ['Global Last-Mile Delivery', 'Pre-Cleared Customs', 'Zone-Skipping Routing'],
    certifiedBadge: 'Global Transit Partner',
  },

  // Tier 5: Payment Rails & Financial Security
  {
    id: 'stripe-payments',
    name: 'Stripe Global Infrastructure',
    tier: 'payments',
    integrationType: 'Stripe Connect & Custom API',
    syncLatency: '< 180ms',
    description: 'Instant multi-currency payout reconciliation, automated chargeback protection, and real-time ledger settlement for international merchants.',
    capabilities: ['Multi-Currency Settlement', 'Automated Fraud Shield', 'Instant P&L Reconciliation'],
    certifiedBadge: 'Fintech Alliance',
  },
  {
    id: 'paypal-intl',
    name: 'PayPal International & Venmo',
    tier: 'payments',
    integrationType: 'REST Payments v2',
    syncLatency: '< 290ms',
    description: 'Frictionless buyer checkout integration for American and European consumers with automated seller protection tracking upload.',
    capabilities: ['Seller Protection Upload', 'Dispute Resolution Sync', 'Global Currency Support'],
    certifiedBadge: 'Verified Rail',
  },
];

const TIERS = [
  { id: 'all', label: 'All Alliances', icon: Layers, count: 17 },
  { id: 'marketplaces', label: 'Marketplaces', icon: ShoppingBag, count: 4 },
  { id: 'storefronts', label: 'Storefront Platforms', icon: Store, count: 4 },
  { id: 'advertising', label: 'Ad & Growth Networks', icon: Megaphone, count: 3 },
  { id: 'logistics', label: 'Carriers & Logistics', icon: Truck, count: 3 },
  { id: 'payments', label: 'Payment Rails', icon: CreditCard, count: 2 },
];

export interface EcosystemMatrixProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function EcosystemMatrix({
  id = 'ecosystem-matrix',
  className = '',
  title = '5-Tier Categorized Ecosystem Matrix',
  subtitle = 'Discover verified technical integrations across global commerce marketplaces, storefront engines, advertising networks, national carriers, and financial settlement rails.',
}: EcosystemMatrixProps) {
  const [activeTier, setActiveTier] = useState<string>('all');

  const filteredPartners = activeTier === 'all'
    ? PARTNERS_DATA
    : PARTNERS_DATA.filter((p) => p.tier === activeTier);

  return (
    <div
      id={id}
      role="region"
      aria-label="5-Tier Categorized Ecosystem Matrix"
      className={`w-full rounded-[36px] bg-[#141718] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl ${className}`}
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
            Verified Commerce Alliances
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl">
            {subtitle}
          </p>
        </div>

        <div className="text-xs font-montserrat text-gray-400">
          Showing <span className="text-[#10E774] font-bold">{filteredPartners.length}</span> of {PARTNERS_DATA.length} Verified Alliances
        </div>
      </div>

      {/* Category Tab Pills */}
      <div 
        role="tablist" 
        aria-label="Ecosystem partner categories"
        className="flex flex-wrap gap-2.5 sm:gap-3 mt-8 pb-6 border-b border-white/10"
      >
        {TIERS.map((tier) => {
          const Icon = tier.icon;
          const isActive = activeTier === tier.id;

          return (
            <button
              key={tier.id}
              type="button"
              role="tab"
              id={`tier-tab-${tier.id}`}
              aria-selected={isActive}
              aria-controls="ecosystem-cards"
              onClick={() => setActiveTier(tier.id)}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${ isActive ?'bg-[#10E774] text-black shadow-lg shadow-[#10E774]/25 font-bold scale-[1.02]'
                  : 'bg-[#0A0D0E] text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{tier.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-montserrat font-bold ${ isActive ?'bg-black/20 text-black' : 'bg-white/10 text-gray-400'
                }`}
              >
                {tier.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Screen reader live notification */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Now displaying {filteredPartners.length} partner alliances in category {activeTier}.
      </div>

      {/* Partners Cards Grid */}
      <div
        id="ecosystem-cards"
        role="tabpanel"
        aria-labelledby={`tier-tab-${activeTier}`}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8"
      >
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0A0D0E]/80 border border-white/10 hover:border-[#10E774]/40 transition-all duration-300 relative group shadow-xl"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10E774]/10 border border-[#10E774]/25 text-[11px] font-montserrat font-semibold text-[#10E774]">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  {partner.certifiedBadge}
                </span>
                <span className="text-[11px] font-montserrat text-gray-500">
                  {partner.syncLatency}
                </span>
              </div>

              {/* Partner Name & Type */}
              <h3 className="text-xl font-bold text-white group-hover:text-[#10E774] transition-colors leading-snug">
                {partner.name}
              </h3>
              
              <div className="text-xs font-montserrat text-gray-400 mt-1 mb-3">
                {partner.integrationType}
              </div>

              <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed">
                {partner.description}
              </p>

              {/* Capabilities checklist */}
              <div className="mt-5 space-y-2 pt-4 border-t border-white/5">
                {partner.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-normal">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10E774] shrink-0" aria-hidden="true" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Action Link */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <a
                href={partner.docHref || '#partners-cta'}
                className="font-semibold font-montserrat text-[#10E774] group-hover:underline flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] rounded"
              >
                <span>Connect with {partner.name}</span>
              </a>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#10E774] group-hover:translate-x-0.5 transition-transform motion-reduce:transform-none" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Trust Indicator */}
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-montserrat text-gray-500">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
          <span>All integrations utilize secure OAuth 2.0, AES-256 in-transit encryption, and automated retry queues.</span>
        </div>
        <span>Open API 3.1 &amp; Webhook Standard Compliant</span>
      </div>
    </div>
  );
}
