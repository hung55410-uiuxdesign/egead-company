import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { SapPartnerView } from '@/components/pages/services/partners/sap';
import { PARTNER_ITEMS } from '@/components/header/config/nav-items';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'sap') {
    return {
      title: 'SAP Partner Solutions & Enterprise Commerce | E-GEAD',
      description:
        'Give your enterprise business an unparalleled advantage with our tailored SAP solutions. We can help you streamline processes, enhance efficiency, and drive profitability.',
    };
  }

  const partner = PARTNER_ITEMS.find(
    (p) => p.href === `/partners/${slug}` || p.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  const name = partner ? partner.name : slug.toUpperCase();

  return {
    title: `${name} Partner Solutions | E-GEAD`,
    description: `Explore E-GEAD technical integration and enterprise commerce capabilities with ${name}.`,
  };
}

export default async function PartnerDetailPage({ params }: Props) {
  const { slug } = await params;

  if (slug === 'sap') {
    return <SapPartnerView />;
  }

  const partner = PARTNER_ITEMS.find(
    (p) => p.href === `/partners/${slug}` || p.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!partner) {
    notFound();
  }

  // Generic fallback view for other partner slugs until their custom views are designed
  return (
    <div className="w-full min-h-[70vh] bg-[#0A0D0E] text-white pt-36 sm:pt-44 pb-24 px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-sm text-[#b3b3b3] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Partners</span>
        </Link>
        <span className="inline-block px-3 py-1 rounded-full bg-[#10E774]/10 border border-[#10E774]/20 text-xs text-[#7ceee0]">
          Strategic Integration Partner
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold font-montserrat">
          {partner.name}
        </h1>
        <p className="text-base sm:text-lg text-[#b3b3b3] font-light leading-relaxed">
          Deep programmatic integrations, automated workflows, and enterprise scale with {partner.name}.
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact-us"
            className="px-8 py-3.5 rounded-full bg-[#10E774] text-[#003D5B] font-semibold text-sm hover:bg-[#5EFC8D] transition-colors"
          >
            Connect with technical team
          </Link>
          <Link
            href="/partners/sap"
            className="px-8 py-3.5 rounded-full bg-[#141718] border border-white/20 text-white font-normal text-sm hover:border-[#10E774] transition-colors"
          >
            View SAP Partner Page
          </Link>
        </div>
      </div>
    </div>
  );
}
