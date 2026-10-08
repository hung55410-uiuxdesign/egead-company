import type { Metadata } from 'next';
import { TestimonialView } from '@/components/pages/company/testimonial';

export const metadata: Metadata = {
  title: 'Client Testimonials | E-GEAD Company',
  description:
    'Read reviews and success stories from global e-commerce founders, brand owners, and operations directors who scale with E-GEAD.',
};

export default function TestimonialPage() {
  return <TestimonialView />;
}
