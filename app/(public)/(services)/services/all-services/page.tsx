import type { Metadata } from 'next';
import { AllServicesView } from '@/components/pages/services/services/all-services';
import { getServiceItems } from '@/lib/services/service-item.service';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';

export const dynamic = 'force-dynamic';

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

export default async function AllServicesPage() {
  const [serviceItems, marketplacesSection] = await Promise.all([
    getServiceItems({ status: 'published' }).catch(() => []),
    getHomeSectionByKey('marketplaces-partners').catch(() => null),
  ]);
  return (
    <AllServicesView
      serviceItems={serviceItems}
      marketplacesSection={marketplacesSection}
    />
  );
}

