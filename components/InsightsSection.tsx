'use client';

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    slug: 'Concentrix-Acquires-SAI-Digital',
    title: 'Concentrix Acquires SAI Digital to Supercharge its Digital Commerce and Customer Experience Tech Solutions',
    tag: 'BLOG',
    readTime: '5 MINS READ',
    date: 'September 09, 2025',
    excerpt: 'NEWARK, Calif. (Sep. 3, 2025) – Concentrix Corporation (NASDAQ: CNXC), a global technology and services leader, today announced its acquisition of SAI Digital— an end-to-end digital commerce and customer experience (CX) technology solutions company— scaling its presence in Vietnam as a strategic hub to deliver innovation and intelligent experiences for global brands.',
  },
  {
    slug: 'how-to-use-MACH-architecture-in-eCommerce',
    title: 'How to use MACH architecture in eCommerce',
    tag: 'BLOG',
    readTime: '5 MINS READ',
    date: 'July 28, 2025',
    excerpt: 'Abstract: This article examines the adoption and impact of MACH (Microservices, API-first, Cloud-native, Headless) architecture in enterprise digital commerce, providing actionable architectural frameworks for composable systems.',
  },
  {
    slug: 'scaling-with-shopify-plus',
    title: 'Scaling E-Commerce with Shopify Plus: Your Path to Global Success',
    tag: 'BLOG',
    readTime: '5 MINS READ',
    date: 'April 16, 2025',
    excerpt: 'Is your e-commerce platform struggling to keep up with your business scales, slow performance, fragmented data, and rising costs can hold you back. Enter Shopify Plus, a modern enterprise platform.',
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
