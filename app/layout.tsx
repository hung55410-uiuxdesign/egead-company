import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://egeadcompany.com'),
  title: 'E-GEAD — Automate Operations, Scale Global Sales',
  description: 'Unify order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time — cutting costs while accelerating revenue growth.',
  icons: {
    icon: 'https://egeadcompany.com/images/egead/logo.png',
  },
  openGraph: {
    title: 'E-GEAD — Automate Operations, Scale Global Sales',
    description: 'Unify order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time — cutting costs while accelerating revenue growth.',
    images: ['https://egeadcompany.com/images/egead/logo.png'],
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
      className={`${montserrat.variable} dark`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="bg-[#0A0D0E] text-white min-h-screen flex flex-col font-sans selection:bg-[#25E2CC] selection:text-black">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
