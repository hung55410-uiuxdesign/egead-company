'use client';

import React from 'react';
import Link from 'next/link';

export default function SmartCXSection() {
  return (
    <section id="homepage__difference" className="homepage__difference relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden">
      {/* FULL WIDTH CENTERED BLOCK */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 flex flex-col items-center text-center">
        {/* Top Graphic Logo */}
        <div className="mb-6">
          <img
            src="/assets/SmartCX_1_1.png"
            alt="SmartCX"
            className="h-10 sm:h-12 w-auto object-contain mx-auto opacity-90"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3] max-w-4xl">
          <span className="text-[#5EFC8D] font-medium">Intelligent automation</span> for global commerce.
        </h2>

        {/* Description */}
        <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-3xl mx-auto">
          Proprietary software suite engineered for high-velocity global sellers. Connect multiple storefronts, automate order dispatching, eliminate fulfillment errors with 99.9% barcode accuracy, and track net profit margins in real time.
        </p>

        {/* Large Center Diagram Graphic */}
        <div className="w-full max-w-5xl my-10 sm:my-14 flex justify-center">
          <img
            src="/assets/smartcx-2.png"
            alt="Eweb Suite Architecture"
            className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Bottom Button */}
        <div>
          <Link
            href="/smartcommerce"
            className="group inline-flex items-center gap-2.5 bg-[#5EFC8D] hover:bg-[#4ee37e] text-black font-medium text-sm sm:text-base px-8 sm:px-9 py-3 sm:py-3.5 rounded-full transition duration-300"
          >
            <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-black">
              <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
            </svg>
            <span>Discover Eweb Suite</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
