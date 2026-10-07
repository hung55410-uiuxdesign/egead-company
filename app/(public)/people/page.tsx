import React from 'react';
import type { Metadata } from 'next';
import PeopleClientView from './PeopleClientView';

export const metadata: Metadata = {
  title: 'Our People | Meet the Team Behind (Y)our Success',
  description:
    'Meet the visionary leadership team and world-class digital commerce experts driving cross-border operations, sub-24h POD fulfillment, and scalable enterprise technology.',
  openGraph: {
    title: 'Our People | E-GEAD & Global Commerce Leadership',
    description:
      'Meet the leaders, architects, and specialists behind E-GEAD and our global digital commerce ecosystem.',
    images: ['https://egeadcompany.com/images/egead/logo.png'],
  },
};

export default function PeoplePage() {
  return <PeopleClientView />;
}
