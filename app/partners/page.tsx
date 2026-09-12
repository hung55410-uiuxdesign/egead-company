import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Award, ExternalLink } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'Our Strategic Partners | SAI Digital',
  description: 'Certified partner ecosystem including SAP Silver, Shopify Plus, Sitecore, Stripe, commercetools, and Salesforce.',
};

const partnerTiers = [
  {
    name: 'SAP Silver Partner',
    desc: 'Deep certified expertise in SAP Commerce Cloud, SAP S/4HANA integrations, and enterprise B2B workflows across APAC.',
    logo: '/assets/logo_sapsilver.svg',
    level: 'Tier 1 Strategic Partner',
  },
  {
    name: 'Shopify Plus Partner',
    desc: 'High-volume international DTC brand builds, headless storefront migrations, and high-throughput checkout customizations.',
    logo: '/assets/logo_shopify.svg',
    level: 'Certified Plus Partner',
  },
  {
    name: 'Sitecore Partner',
    desc: 'Content-driven commerce implementations combining Sitecore XM/XP with order management and personalized journeys.',
    logo: '/assets/logo_Sitecore.png',
    level: 'Certified Solution Partner',
  },
  {
    name: 'Stripe Verified Partner',
    desc: 'Global recurring payments, localized alternative payment methods (VietQR, PayNow, Konbini), and fraud detection.',
    logo: '/assets/logo_stripe.svg',
    level: 'Verified Payments Partner',
  },
  {
    name: 'Salesforce Partner',
    desc: 'Commerce Cloud, Service Cloud, and Marketing Cloud cross-synchronization for 360-degree customer views.',
    logo: '/assets/logo_salesforce.svg',
    level: 'Ecosystem Partner',
  },
  {
    name: 'commercetools',
    desc: 'Next-generation composable MACH architecture implementations with cloud-native serverless microservices.',
    logo: '/assets/logo_commercetools.svg',
    level: 'MACH Alliance Partner',
  },
];

export default function PartnersPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Global Ecosystem
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            WORLD-CLASS <br />
            <span className="text-[#7ceee0]">TECHNOLOGY PARTNERS.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            We partner with the world's most innovative commerce, cloud, and data platforms to architect resilient, future-proof ecosystems for leading enterprises.
          </p>
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerTiers.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#7ceee0]/40 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-16 flex items-center mb-6">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-12 max-w-[160px] object-contain filter invert"
                  />
                </div>
                <span className="text-xs font-mono text-[#7ceee0] uppercase tracking-wider block mb-2">
                  {p.level}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">{p.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7ceee0] hover:underline"
                >
                  <span>Build on {p.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
