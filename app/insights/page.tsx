import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'Insights & Knowledge Base | E-GEAD Company',
  description: 'Explore expert playbooks on cross-border e-commerce, TikTok Shop US compliance, sub-24h POD fulfillment, and multi-channel inventory sync.',
};

const allInsights = [
  {
    slug: 'expanding-cross-border-ecommerce-playbook',
    title: 'The 2026 Global E-Commerce Playbook: Expanding Across US, UK, and Australian Marketplaces',
    tag: 'Market Expansion',
    date: 'January 15, 2026',
    readTime: '6 mins read',
    image: '/assets/case_brother.jpg',
    desc: 'A comprehensive operational blueprint for cross-border merchants: multi-channel catalog orchestration, automated US fulfillment routing, and currency risk mitigation.',
  },
  {
    slug: 'tiktok-shop-us-sla-compliance-guide',
    title: 'Conquering TikTok Shop US: How Sub-24h Fulfillment Eliminates Late Dispatch Penalties',
    tag: 'Operations & SLA',
    date: 'February 02, 2026',
    readTime: '5 mins read',
    image: '/assets/case_suntory.jpg',
    desc: 'TikTok Shop US enforces strict 48-hour order-to-tracking SLA windows. Learn how automated WMS routing and on-demand US manufacturing ensure zero late-dispatch strikes.',
  },
  {
    slug: 'wms-barcode-automation-inventory-accuracy',
    title: 'Achieving 99.9% Fulfillment Accuracy: Why Barcode WMS is Essential for High-Volume Sellers',
    tag: 'Technology & WMS',
    date: 'February 20, 2026',
    readTime: '5 mins read',
    image: '/assets/case_weir.jpg',
    desc: 'Manual packing errors destroy margins through return shipping costs and platform strikes. Discover how barcode scanning workflows safeguard your seller metrics.',
  },
  {
    slug: 'transparent-pod-pricing-landed-cost-optimization',
    title: 'Mastering E-Commerce Unit Economics: Flat-Rate $6 All-In POD and Net Margin Protection',
    tag: 'Financial Strategy',
    date: 'March 01, 2026',
    readTime: '5 mins read',
    image: '/assets/case_manulife.jpg',
    desc: 'How transparent manufacturing pricing and automated landed cost calculations allow cross-border sellers to predict profit margins before scaling advertising campaigns.',
  },
];

export default function InsightsPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="w-full">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
            Knowledge &amp; Industry Insights
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium tracking-tight leading-[1.08] text-[#D4FAE6] font-montserrat mb-6">
            Cross-Border Commerce, <br />
            <span className="text-[#5EFC8D] font-medium">Strategies &amp; Playbooks.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-3xl">
            Actionable blueprints for global e-commerce sellers: optimizing TikTok Shop US dispatch SLAs, automating multi-channel warehouse operations, and maximizing net margins.
          </p>
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {allInsights.map((item) => (
            <Link
              key={item.slug}
              href={`/articles/${item.slug}`}
              className="group rounded-[36px] overflow-hidden bg-[#141718] border border-white/10 hover:border-[#5EFC8D]/40 transition-all duration-300 flex flex-col shadow-2xl hover:-translate-y-1.5"
            >
              <div className="relative h-72 w-full overflow-hidden bg-[#0A0D0E]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 rounded-full bg-[#5EFC8D] text-black font-medium text-xs">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-montserrat">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#5EFC8D]" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#5EFC8D]" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] group-hover:text-[#5EFC8D] transition-colors leading-snug font-montserrat">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#b3b3b3] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#5EFC8D]">
                    Read full article
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#5EFC8D] group-hover:text-black transition duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
