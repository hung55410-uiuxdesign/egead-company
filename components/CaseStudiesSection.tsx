'use client';

import React, { useRef } from 'react';
import Link from 'next/link';

const caseStudies = [
  {
    client: 'Suntory',
    title: 'A global beverage and wellness company',
    desc: 'Multi-channel experience and optimized customer engagement.',
    bg: '/assets/case_suntory.jpg',
    href: '/case-studies/multi-channel-experience-and-optimized-customer-engagement',
  },
  {
    client: 'Brother',
    title: 'An international printing and electronics solutions company',
    desc: 'Building a global consolidated experience.',
    bg: '/assets/case_brother.jpg',
    href: '/case-studies/building-a-global-consolidated-experience',
  },
  {
    client: 'Weir',
    title: 'A global mining equipment and mineral processing solutions company',
    desc: 'Digitizing a B2B legacy across 14 markets.',
    bg: '/assets/case_weir.jpg',
    href: '/case-studies/digitizing-a-b2b-legacy-across-14-markets',
  },
  {
    client: 'Manulife',
    title: 'A multi-market financial services and insurance provider',
    desc: 'Making Digital Insurance Transformation Accessible to Everyone.',
    bg: '/assets/case_manulife.jpg',
    href: '/case-studies/navigating-millennials-to-manulife-a-digital-insurance-transformation',
  },
];

export default function CaseStudiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="homepage__casestudy" className="homepage__casestudy relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden">
      {/* Centered Header Block matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 text-center max-w-4xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#25E2CC] block mb-3 font-montserrat">
          Case Studies
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.15] text-white font-rubik">
          <span className="text-[#25E2CC]">Proven results</span> through integration.
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-[#8C8C8C] font-normal leading-relaxed font-montserrat max-w-2xl mx-auto">
          When strategy, technology, and operations work as one continuous team, sustained excellence becomes achievable.
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
            className="group relative block w-[85vw] sm:w-[48vw] lg:w-[31vw] xl:w-[28vw] shrink-0 rounded-[40px] overflow-hidden bg-[#141718] border border-white/10 hover:border-[#25E2CC]/60 transition-all duration-500 shadow-2xl h-[460px] sm:h-[520px] lg:h-[550px]"
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
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#25E2CC] transition-colors leading-snug font-rubik">
                {item.title}
              </h3>
              <p className="mt-2 text-sm sm:text-[15px] text-[#b3b3b3] font-montserrat leading-relaxed">
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
          className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/30 hover:border-[#25E2CC] hover:bg-white/5 text-white font-semibold text-sm transition duration-300 shadow-lg"
        >
          <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-white group-hover:fill-[#25E2CC] transition">
            <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
          </svg>
          <span>All Case Studies</span>
        </Link>
      </div>
    </section>
  );
}
