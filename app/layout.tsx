import type { Metadata } from 'next';
import { Rubik, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sai-digital.com'),
  title: 'SAI Digital: Innovative Solutions for Your Business Success Online',
  description: 'Unlock your business potential with SAI Digital innovative online solutions. Elevate your brand, enhance customer engagement, and drive success today! A Concentrix Company.',
  icons: {
    icon: '/assets/icon.svg',
  },
  openGraph: {
    title: 'SAI Digital | A Concentrix Company',
    description: 'We help leading enterprises design, build, run, and grow intelligent customer experiences.',
    images: ['/assets/smartcx-2.png'],
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
      className={`${rubik.variable} ${montserrat.variable} dark`}
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
