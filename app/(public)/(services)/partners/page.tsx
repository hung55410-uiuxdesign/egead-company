import React from 'react';
import type { Metadata } from 'next';
import { PartnersView } from '@/components/pages/services/partners';

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

export default function PartnersPage() {
  return <PartnersView />;
}
