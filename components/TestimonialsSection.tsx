'use client';

import React from 'react';
import Link from 'next/link';

const testimonials = [
  {
    quote: "The professionalism shown has impressed me immensely. On behalf of the Suntory management, I'd like to extend our appreciation for the amazing work done by SAI team.",
    role: "IT Manager",
  },
  {
    quote: "SAI Digital's agile methodology matched the speed we were looking for.",
    role: "CEO",
  },
  {
    quote: "We chose SAI Digital for their strategic partnership rather than contractual, their experience with large-scale international projects, and their track record of delivering Commerce Cloud projects successfully.",
    role: "SAP director, APAC",
  },
  {
    quote: "SAI Digital was instrumental in our move to Shopify, their expertise in front-end development, UX/UI, and general eCommerce best practices allowed a seamless transition.",
    role: "The Dinner Ladies CMO",
  },
  {
    quote: "Despite our initial apprehension about offshoring our implementation, everything went smoothly from start to finish thanks to SAI expertise and commitment.",
    role: "Head of IT and Systems",
  },
  {
    quote: "Bringing brilliant creativity and strategic alignment, SAI developed a great integrated marketing plan. We have earned massive records for both customer engagements and distribution sales, specifically reaching our KPIs' targets in less than two weeks.",
    role: "Product Manager",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="homepage__testimonial" className="homepage__testimonial relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden">
      {/* Header Block - FULL WIDTH matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#25E2CC] block mb-3 font-montserrat">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-bold tracking-tight leading-[1.15] text-[#d3f9f5] font-rubik">
            Discover the transformative experiences of our clients.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8C8C8C] font-normal leading-relaxed font-montserrat max-w-2xl">
            From enhanced productivity to unparalleled satisfaction, our services have made an impact. Don't just take our word for it:
          </p>
        </div>

        <Link
          href="/testimonial"
          className="group inline-flex items-center gap-2 self-start lg:self-end px-6 py-3 rounded-full border border-white/30 hover:border-[#25E2CC] hover:bg-white/5 text-white font-medium text-sm transition duration-300 shrink-0"
        >
          <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-white group-hover:fill-[#25E2CC] transition">
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
              <p className="text-[15px] sm:text-base text-[#e4e4e4] leading-relaxed font-normal italic font-montserrat">
                “{t.quote.replace(/^[“"']+|[”"']+$/g, '')}”
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <p className="text-sm font-semibold text-white font-montserrat">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
