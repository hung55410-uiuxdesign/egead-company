import React from 'react';
import type { Metadata } from 'next';
import { SapPartnerView } from '@/components/pages/services/partners/sap';

export const metadata: Metadata = {
  title: 'SAP Partner Solutions & Enterprise Commerce | E-GEAD',
  description:
    'Give your enterprise business an unparalleled advantage with our tailored SAP solutions. We can help you streamline processes, enhance efficiency, and drive profitability.',
  keywords: [
    'SAP gold partner',
    'SAP commerce cloud',
    'enterprise commerce solutions',
    'SAP ERP integration',
    'SAP migration services',
    'SAP reporting analytics',
    'b2b ecommerce sap',
    'E-GEAD SAP partner',
  ],
  openGraph: {
    title: 'SAP Partner Solutions & Enterprise Commerce | E-GEAD',
    description:
      'Unlock enterprise operational excellence with E-GEAD tailored SAP commerce, integration, and cloud transformation solutions.',
    images: [
      {
        url: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/86de0e07-7dd4-4ddd-afdc-723c96eba1dd:335aa49d18ee1cefc92c820c337d1f354a080065/SAP_banner_sept24.png',
        width: 1200,
        height: 630,
        alt: 'SAP Enterprise Partner - E-GEAD',
      },
    ],
  },
};

export default function SapPartnerPage() {
  return <SapPartnerView />;
}
