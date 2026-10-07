import React from 'react';
import type { Metadata } from 'next';
import OurWorkClient from '@/components/OurWorkClient';

export const metadata: Metadata = {
  title: 'Explore Our Innovative Projects and Success Stories | E-GEAD',
  description:
    'Discover our innovative projects and success stories at E-GEAD, showcasing how we transform ideas into impactful digital solutions for diverse industries.',
  keywords: [
    'ecommerce case studies',
    'tiktok shop us success story',
    'pod fulfillment case study',
    'cross-border scaling results',
    'sub 24h dispatch SLA proof',
    'SAI Digital our work',
  ],
};

export default function OurWorkPage() {
  return <OurWorkClient />;
}
