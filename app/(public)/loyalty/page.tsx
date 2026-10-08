import React from 'react';
import type { Metadata } from 'next';
import LoyaltyClientView from './LoyaltyClientView';

export const metadata: Metadata = {
  title: 'SmartLoyalty | Transform Customer Engagement with Omnichannel Retention Solutions',
  description:
    'Enhance customer loyalty with our omnichannel retention solution. Strengthen relationships, drive engagement, and fuel growth by rewarding your valued customers across O2O touchpoints.',
  keywords: [
    'SmartLoyalty',
    'Customer Loyalty Platform',
    'Omnichannel loyalty solution',
    'O2O customer retention',
    'MACH architecture loyalty',
    'Blockchain loyalty reward system',
    'SAP store catalyzer loyalty',
    'AI customer engagement',
  ],
  openGraph: {
    title: 'SmartLoyalty | Transform Customer Engagement & Retention Solutions',
    description:
      'Enhance customer loyalty with our omnichannel retention solution. Strengthen relationships, drive engagement, and fuel growth by rewarding your valued customers.',
    url: 'https://egeadcompany.com/loyalty',
    siteName: 'E-GEAD & Global Commerce Solutions',
    images: [
      {
        url: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/c09e1292-35bb-433f-8d7a-391adccc2986:bfcdc1195a4526451ebe1653ec01e75a3a21c2f1/Loyalty.jpg',
        width: 1200,
        height: 630,
        alt: 'SmartLoyalty Omnichannel Platform',
      },
    ],
    type: 'website',
  },
};

export default function LoyaltyPage() {
  return <LoyaltyClientView />;
}
