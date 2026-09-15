'use client';

import React, { useRef } from 'react';
import Link from 'next/link';

const caseStudies = [
  {
    client: 'UrbanVibe',
    title: 'Under-24H POD fulfillment for TikTok Shop US',
    desc: 'Maintained 0% Late Dispatch Rate (LDR) and 100% account compliance during high-volume Q4 campaigns.',
    bg: 'https://egeadcompany.com/images/egead/why/us-pod.png',
    href: '/our-work',
  },
  {
    client: 'HomeCraft',
    title: 'Automated multi-channel order & inventory sync',
    desc: 'Eliminated stockouts and manual spreadsheet errors across Amazon, Etsy, and Shopify stores.',
    bg: 'https://egeadcompany.com/images/egead/why/sync.png',
    href: '/our-work',
  },
  {
    client: 'Lumina',
    title: 'Scaling international retail with 4.8x ROAS digital ads',
    desc: 'High-intent paid acquisition strategy delivering 92K monthly traffic and $8.4 average CPA.',
    bg: 'https://egeadcompany.com/images/egead/why/ads.png',
    href: '/our-work',
  },
  {
    client: 'PrintWave',
    title: 'Processing 10,000+ daily orders via Open RESTful API',
    desc: 'Direct WMS connectivity, real-time webhooks, and sub-150ms automated print routing.',
    bg: 'https://egeadcompany.com/images/egead/why/api.png',
    href: '/our-work',
  },
];

export default function CaseStudiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="homepage__casestudy" className="homepage__casestudy relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden">
      {/* Centered Header Block matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 text-center max-w-4xl mx-auto mb-12 sm:mb-16">
        <span className="text-sm sm:text-base font-normal text-[#d3f9f5] block mb-3 font-montserrat">
          Client Stories
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-medium tracking-tight leading-[1.15] text-[#d3f9f5] font-montserrat">
          <span className="text-[#7ceee0] font-medium">Proven results</span> for global sellers.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
          When automation technology, US-standard POD fulfillment, and high-performance digital marketing work together, sustained growth becomes achievable.
        </p>
      </div>

      {/* FULL WIDTH HORIZONTAL SLIDER - spans edge-to-edge */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-none flex gap-6 sm:gap-7 px-6 sm:px-10 lg:px-14 xl:px-16 pb-6 cursor-grab active:cursor-grabbing"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {caseStudies.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            style={{ scrollSnapAlign: 'start' }}
            className="group relative block w-[85vw] sm:w-[48vw] lg:w-[31vw] xl:w-[28vw] shrink-0 rounded-[40px] overflow-hidden bg-[#141718] border border-white/10 hover:border-[#7ceee0]/40 transition-all duration-500 shadow-2xl h-[460px] sm:h-[520px] lg:h-[550px]"
          >
            {/* Background Image with Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${item.bg})` }}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            {/* Card Content at bottom - exact live site design */}
            <div className="relative z-10 h-full flex flex-col justify-end p-7 sm:p-9 xl:p-10">
              <h3 className="text-xl sm:text-2xl font-medium text-[#d3f9f5] group-hover:text-[#7ceee0] transition-colors leading-snug font-montserrat">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#b3b3b3] font-light font-montserrat leading-[1.75]">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Centered Button at bottom */}
      <div className="w-full flex justify-center mt-10 sm:mt-12">
        <Link
          href="/our-work"
          className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/20 hover:border-[#7ceee0] hover:text-[#7ceee0] text-[#d3f9f5] font-medium text-sm transition duration-300 shadow-lg"
        >
          <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current transition">
            <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
          </svg>
          <span>All Case Studies</span>
        </Link>
      </div>
    </section>
  );
}
