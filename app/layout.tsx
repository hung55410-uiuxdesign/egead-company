import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://egeadcompany.com'),
  title: 'E-GEAD — Automate Operations, Scale Global Sales',
  description: 'Unify order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time — cutting costs while accelerating revenue growth.',
  icons: {
    icon: [
      { url: '/assets/logo/logo-color.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: ['/assets/logo/logo-color.png'],
    apple: [
      { url: '/assets/logo/logo-color.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'E-GEAD — Automate Operations, Scale Global Sales',
    description: 'Unify order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time — cutting costs while accelerating revenue growth.',
    images: ['/assets/logo/logo-color.png'],
    siteName: 'E-GEAD',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${openSans.variable} dark`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/assets/logo/logo-color.png" type="image/png" />
        <link rel="shortcut icon" href="/assets/logo/logo-color.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/logo/logo-color.png" />
      </head>
      <body className="bg-[#0A0D0E] text-white min-h-screen flex flex-col font-sans selection:bg-[#10E774] selection:text-black">
        {children}
      </body>
    </html>
  );
}
