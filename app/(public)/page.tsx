import React from 'react';
import type { Metadata } from 'next';
import EGEADLanding from '@/components/puture/EGEADLanding';

export const metadata: Metadata = {
  title: 'EGEAD — Tự Động Hóa Vận Hành E-Commerce & Phát Triển Nền Tảng Kỹ Thuật Số',
  description:
    'EGEAD tự động hóa thương mại điện tử xuyên biên giới trên eBay, TikTok Shop US, Google, phát triển nền tảng POD & Dropship, pipeline tạo ảnh AI, ứng dụng tùy biến và casual games.',
  openGraph: {
    type: 'website',
    siteName: 'EGEAD',
    locale: 'vi_VN',
    title: 'EGEAD — Tự Động Hóa Vận Hành E-Commerce & Phát Triển Nền Tảng Kỹ Thuật Số',
    description:
      'EGEAD tự động hóa thương mại điện tử xuyên biên giới trên eBay, TikTok Shop US, Google, phát triển nền tảng POD & Dropship, pipeline tạo ảnh AI, ứng dụng tùy biến và casual games.',
    url: 'https://egeadcompany.com/',
    images: [
      {
        url: '/og/home-en.jpg',
        width: 1200,
        height: 630,
        alt: 'EGEAD — Tự động hóa vận hành & phát triển nền tảng số',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EGEAD — Tự Động Hóa Vận Hành E-Commerce & Phát Triển Nền Tảng Kỹ Thuật Số',
    description:
      'EGEAD tự động hóa thương mại điện tử xuyên biên giới trên eBay, TikTok Shop US, Google, phát triển nền tảng POD & Dropship, pipeline tạo ảnh AI, ứng dụng tùy biến và casual games.',
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

export default function HomePage() {
  return <EGEADLanding />;
}
