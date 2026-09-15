'use client';

import React from 'react';
import Link from 'next/link';

const testimonials = [
  {
    quote: "Switching our US TikTok Shop fulfillment to E-GEAD was the best operational decision we made in 2025. Sub-24h turnaround and zero late-shipment strikes allowed us to scale from 200 to 2,500 daily orders seamlessly.",
    role: "Founder & CEO, UrbanVibe Apparel (US)",
  },
  {
    quote: "E-GEAD's automated multi-channel sync eliminated our inventory discrepancies across Amazon and Etsy completely. We cut manual fulfillment labor by 70% and doubled our catalog reach.",
    role: "Operations Director, HomeCraft Living",
  },
  {
    quote: "Their performance marketing team transformed our ad economics. Scaling TikTok and Meta Ads while maintaining a 4.8x blended ROAS during Q4 gave us unprecedented seasonal profitability.",
    role: "Head of Growth, Lumina Beauty Group",
  },
  {
    quote: "The barcode WMS integration and sub-24 hour dispatch reliability made our direct-to-garment POD operation rock solid. Zero SLA breaches and 99.9% fulfillment accuracy.",
    role: "Co-Founder & VP Operations, PrintWave Studios",
  },
  {
    quote: "Working with E-GEAD gives us complete peace of mind. Transparent unit economics at $6 all-in with automated US carrier tracking kept our customer satisfaction score above 4.9 stars.",
    role: "Managing Director, Apex Retail Brands",
  },
  {
    quote: "E-GEAD's engineering team built custom API bridges between our ERP and TikTok Shop in less than two weeks. Flawless execution and world-class developer communication.",
    role: "Chief Technology Officer, Global Merch Partners",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="homepage__testimonial" className="homepage__testimonial relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden">
      {/* Header Block - FULL WIDTH matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-normal tracking-widest uppercase text-[#d3f9f5] block mb-3 font-montserrat">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-medium tracking-tight leading-[1.15] text-[#d3f9f5] font-montserrat">
            Discover the <span className="text-[#7ceee0] font-medium">transformative experiences</span> of our clients.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl">
            From accelerated fulfillment to predictable profit margins, our automation solutions deliver measurable growth. See what global e-commerce sellers say about E-GEAD:
          </p>
        </div>

        <Link
          href="/testimonial"
          className="group inline-flex items-center gap-2 self-start lg:self-end px-7 py-3.5 rounded-full border border-white/20 hover:border-[#7ceee0] hover:text-[#7ceee0] hover:bg-white/5 text-[#d3f9f5] font-medium text-sm transition duration-300 shrink-0 font-montserrat"
        >
          <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#d3f9f5] group-hover:fill-[#7ceee0] transition">
            <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
          </svg>
          <span>View All Testimonials</span>
        </Link>
      </div>

      {/* FULL WIDTH HORIZONTAL SLIDER of Cards */}
      <div className="w-full overflow-x-auto scrollbar-none flex gap-6 px-6 sm:px-10 lg:px-14 xl:px-16 pb-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="w-[85vw] sm:w-[48vw] lg:w-[31vw] xl:w-[28vw] shrink-0 p-8 sm:p-9 rounded-[36px] bg-[#141718] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] shadow-xl"
          >
            <div className="testiomonials-card__desc">
              <p className="text-[15px] sm:text-base text-[#d3f9f5] leading-[1.75] font-light italic font-montserrat">
                “{t.quote.replace(/^[“"']+|[”"']+$/g, '')}”
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <p className="text-sm font-medium text-[#7ceee0] font-montserrat">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
