import React from 'react';
import type { Metadata } from 'next';
import SmartPriceClientView from './SmartPriceClientView';

export const metadata: Metadata = {
  title: 'SmartPrice | AI-Driven Pricing Intelligence for Pre-Owned Products',
  description:
    'Recommend optimal trading prices for pre-owned products using AI/ML. Reduce operational complexity and improve customer experience with accurate, real-time pricing scenarios.',
  keywords: [
    'SmartPrice',
    'AI pricing intelligence',
    'pre-owned product pricing',
    'automated appraisal',
    'eCommerce pricing optimization',
    'machine learning price setting',
    'SAP store catalyzer smartprice',
  ],
  openGraph: {
    title: 'SmartPrice | Maximize Profits on Pre-Owned Products',
    description:
      'Recommend optimal trading prices for pre-owned products using real-time AI/ML market intelligence.',
    url: 'https://egeadcompany.com/smartprice',
    siteName: 'E-GEAD & Global Commerce Solutions',
    images: [
      {
        url: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/3ef3d108-de8d-4ee0-ad1d-9cc24d91446e:9f8173ce06c48b4d058c258c7a8bb5d7d2997792/SmartPrice.jpg',
        width: 1200,
        height: 630,
        alt: 'SmartPrice AI Pricing Platform',
      },
    ],
    type: 'website',
  },
};

export default function SmartPricePage() {
  return <SmartPriceClientView />;
}
