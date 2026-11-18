import React from 'react';
import type { Metadata } from 'next';
import EGEADLanding from '@/components/puture/EGEADLanding';

export const metadata: Metadata = {
  title: 'EGEAD — Automate Operations, Scale Global E-Commerce & Custom Software',
  description:
    'EGEAD automates cross-border e-commerce across eBay, TikTok Shop US, and Google, builds POD & dropship platforms, AI image generation pipelines, custom applications, and casual games.',
  openGraph: {
    type: 'website',
    siteName: 'EGEAD',
    locale: 'en_US',
    title: 'EGEAD — Automate Operations, Scale Global E-Commerce & Custom Software',
    description:
      'EGEAD automates cross-border e-commerce across eBay, TikTok Shop US, and Google, builds POD & dropship platforms, AI image generation pipelines, custom applications, and casual games.',
    url: 'https://egeadcompany.com/en/',
    images: [
      {
        url: '/og/home-en.jpg',
        width: 1200,
        height: 630,
        alt: 'EGEAD — Interactive AI experiences for brands, pop-ups and campaigns',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EGEAD — Automate Operations, Scale Global E-Commerce & Custom Software',
    description:
      'EGEAD automates cross-border e-commerce across eBay, TikTok Shop US, and Google, builds POD & dropship platforms, AI image generation pipelines, custom applications, and casual games.',
    images: ['/og/home-en.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      { url: '/favicon.ico?v=2', sizes: '48x48' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=2' }],
  },
};

export default function EnglishHomePage() {
  return <EGEADLanding />;
}
