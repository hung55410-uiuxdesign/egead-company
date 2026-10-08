import type { Metadata } from 'next';
import { SmartCommerceView } from '@/components/pages/products/smartcommerce';

export const metadata: Metadata = {
  title: 'Transform Your Business with SmartCommerce Solutions and Insights | E-GEAD',
  description:
    'Discover SmartCommerce by SAI Digital, your ultimate solution for seamless online shopping experiences, enhancing customer engagement and boosting sales effortlessly.',
};

export default function SmartCommercePage() {
  return <SmartCommerceView />;
}
