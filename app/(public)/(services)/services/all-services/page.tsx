import type { Metadata } from 'next';
import { AllServicesView } from '@/components/pages/services/services/all-services';

export const metadata: Metadata = {
  title: 'All Services & Capabilities | E-GEAD: End-to-End E-Commerce & POD Solutions',
  description:
    'Explore E-GEAD complete operational and technology ecosystem: Sub-24H US POD fulfillment, multi-channel sales automation, WMS precision, and 4.8x ROAS digital marketing.',
  keywords: [
    'end-to-end ecommerce operations',
    'cross-border fulfillment solutions',
    'ecommerce automation platform',
    'US POD fulfillment 24 hours',
    'TikTok Shop US compliant fulfillment',
    'multi-channel inventory sync',
  ],
};

export default function AllServicesPage() {
  return <AllServicesView />;
}
