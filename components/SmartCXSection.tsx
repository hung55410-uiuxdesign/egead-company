'use client';

import React from 'react';
import Link from 'next/link';

export default function SmartCXSection() {
  return (
    <section
      id="homepage__customersuccess"
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Top Header Block matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 sm:mb-16">

          {/* Right Column: Title */}
          <div className="lg:col-span-8 xl:col-span-8">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-white font-montserrat leading-[1.2] tracking-tight">
              Why brands ship with Egead
            </h2>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* ================= ROW 1 (TOP) ================= */}
          {/* Row 1 Left: 2 Squares (Faucet Image + Gerber 10% Metric) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Square 1: Faucet Product Image */}
            <div className="relative aspect-square overflow-hidden bg-[#181d1f] border border-white/10 rounded-lg">
              <img
                src="/assets/success_faucet.jpg"
                alt="Gerber modern plumbing"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Square 2: Gerber 10% Metric Card */}
            <div className="flex flex-col justify-between p-6 sm:p-7 xl:p-8 bg-[#141718] border border-white/10 hover:border-white/20 transition-all aspect-square rounded-lg">
              {/* Top: Logo + Divider + Description */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="border border-white/40 px-2 py-0.5 inline-flex items-center shrink-0 rounded-sm">
                  <span className="text-[11px] sm:text-xs font-bold tracking-widest text-white font-mono">
                    GERBER
                  </span>
                </div>
                <div className="w-[1px] h-10 bg-white/20 shrink-0" />
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#b3b3b3] leading-[1.45]">
                  GERBER<br />
                  SAVED 10% ON LANDED<br />
                  COSTS WITH EGEAD
                </p>
              </div>

              {/* Bottom: Huge 10% */}
              <div className="text-6xl sm:text-7xl lg:text-[84px] xl:text-[92px] font-light text-white tracking-tighter leading-none font-montserrat">
                10%
              </div>
            </div>
          </div>

          {/* Row 1 Right: Wide Photo (Cyclists Riding Bikes) */}
          <div className="relative w-full h-[280px] sm:h-[320px] lg:h-full min-h-[260px] overflow-hidden bg-[#181d1f] border border-white/10 rounded-lg">
            <img
              src="/assets/success_bikes.jpg"
              alt="Trek performance cycling"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* ================= ROW 2 (BOTTOM) ================= */}
          {/* Row 2 Left: Wide Quote Card (Trek Testimonial) */}
          <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-10 bg-[#141718] border border-white/10 hover:border-white/20 transition-all min-h-[300px] lg:min-h-full rounded-lg">
            {/* Quote Body */}
            <p className="text-lg sm:text-xl lg:text-[22px] font-normal text-white font-montserrat leading-[1.55] tracking-tight">
              &ldquo;Egead is truly forward thinking – about data quality and how we move the industry forward as a whole. That&apos;s really important to Trek. It makes us better, our partners better, it makes the industry better. And that&apos;s what we&apos;re looking for in a partnership.&rdquo;
            </p>

            {/* Attribution Footer */}
            <div className="flex items-end justify-between mt-8 pt-6 border-t border-white/10">
              <div>
                <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white font-mono">
                  REBECCA BOETTCHER
                </h4>
                <p className="text-[11px] sm:text-xs text-[#a3a3a3] font-mono uppercase tracking-wider mt-1">
                  DIRECTOR OF GLOBAL LOGISTICS
                </p>
              </div>
              <div className="shrink-0">
                <img
                  src="/clients/20.png"
                  alt="TREK"
                  className="h-5 sm:h-6 w-auto object-contain opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Row 2 Right: 2 Squares (Socks Image + Bombas 90% Metric) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Square 1: Bombas Socks Product Image */}
            <div className="relative aspect-square overflow-hidden bg-[#181d1f] border border-white/10 rounded-lg">
              <img
                src="/assets/success_socks.jpg"
                alt="Bombas apparel"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Square 2: Bombas 90% Metric Card */}
            <div className="flex flex-col justify-between p-6 sm:p-7 xl:p-8 bg-[#141718] border border-white/10 hover:border-white/20 transition-all aspect-square rounded-lg">
              {/* Top: Logo + Divider + Description */}
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-xs sm:text-sm font-bold tracking-wider text-white shrink-0 font-montserrat pt-0.5">
                  BOMBAS
                </span>
                <div className="w-[1px] h-10 bg-white/20 shrink-0" />
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#b3b3b3] leading-[1.45]">
                  BOMBAS<br />
                  REDUCED LOGISTICS<br />
                  EMAILS BY 90% AFTER<br />
                  MOVING TO EGEAD
                </p>
              </div>

              {/* Bottom: Huge 90% */}
              <div className="text-6xl sm:text-7xl lg:text-[84px] xl:text-[92px] font-light text-white tracking-tighter leading-none font-montserrat">
                90%
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button matching project design system */}
        <div className="w-full flex justify-center mt-12 sm:mt-16">
          <Link
            href="/our-work"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/20 hover:border-[#5EFC8D] hover:text-[#5EFC8D] hover:bg-white/5 text-[#D4FAE6] font-medium text-sm transition duration-300 shrink-0 font-montserrat shadow-lg hover:scale-105"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-[#D4FAE6] group-hover:fill-[#5EFC8D] transition"
            >
              <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
            </svg>
            <span>Read Customer Stories</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
