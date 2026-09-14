'use client';

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    slug: 'expanding-cross-border-ecommerce-playbook',
    title: 'The 2026 Global E-Commerce Playbook: Expanding Across US, UK, and Australian Marketplaces',
    tag: 'GUIDE',
    readTime: '6 MINS READ',
    date: 'January 15, 2026',
    excerpt: 'A comprehensive operational blueprint for cross-border merchants: multi-channel catalog orchestration, automated US fulfillment routing, and currency risk mitigation.',
  },
  {
    slug: 'tiktok-shop-us-sla-compliance-guide',
    title: 'Conquering TikTok Shop US: How Sub-24h Fulfillment Eliminates Late Dispatch Penalties',
    tag: 'OPERATIONS',
    readTime: '5 MINS READ',
    date: 'February 02, 2026',
    excerpt: 'TikTok Shop US enforces strict 48-hour order-to-tracking SLA windows. Learn how automated WMS routing and on-demand US manufacturing ensure zero late-dispatch strikes.',
  },
  {
    slug: 'wms-barcode-automation-inventory-accuracy',
    title: 'Achieving 99.9% Fulfillment Accuracy: Why Barcode WMS is Essential for High-Volume Sellers',
    tag: 'TECHNOLOGY',
    readTime: '5 MINS READ',
    date: 'February 20, 2026',
    excerpt: 'Manual packing errors destroy margins through return shipping costs and platform strikes. Discover how barcode scanning workflows safeguard your seller metrics.',
  },
];

export default function InsightsSection() {
  return (
    <section id="homepage__insight" className="homepage__insight relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden">
      {/* Header Block - Full Width */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#25E2CC] block mb-3 font-montserrat">
            Insights
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.15] text-white font-rubik">
            Our latest news.
          </h2>
        </div>

        <Link
          href="/insights"
          className="group inline-flex items-center gap-2 self-start md:self-end px-6 py-3 rounded-full border border-white/30 hover:border-[#25E2CC] hover:bg-white/5 text-white font-medium text-sm transition duration-300 shrink-0"
        >
          <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-white group-hover:fill-[#25E2CC] transition">
            <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
          </svg>
          <span>View All Insights</span>
        </Link>
      </div>

      {/* FULL WIDTH STACKED ACCORDION / LIST matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="w-full rounded-[40px] bg-[#141718] border border-white/10 overflow-hidden divide-y divide-white/10 p-6 sm:p-10 lg:p-12">
          {articles.map((item) => (
            <Link
              key={item.slug}
              href={`/articles/${item.slug}`}
              className="group block py-8 sm:py-10 first:pt-2 last:pb-2 transition-colors hover:bg-white/[0.02] -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                {/* Left col: Badges, Title, Date */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full border border-white/20 text-[11px] font-semibold tracking-wider text-gray-300 uppercase font-mono">
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-[#8C8C8C] font-semibold tracking-wider uppercase font-mono">
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white group-hover:text-[#25E2CC] transition-colors leading-snug font-rubik mb-4">
                    {item.title}
                  </h3>

                  <div className="text-xs sm:text-sm text-[#8C8C8C] font-montserrat">
                    {item.date}
                  </div>
                </div>

                {/* Right col: Excerpt / Preview text */}
                <div className="lg:col-span-5 pt-1 lg:pt-8 text-sm sm:text-[15px] text-[#8C8C8C] leading-relaxed font-montserrat line-clamp-4">
                  {item.excerpt}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
