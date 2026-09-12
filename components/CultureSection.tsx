'use client';

import React from 'react';
import Link from 'next/link';

export default function CultureSection() {
  return (
    <section id="homepage__culture" className="homepage__culture relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden">
      {/* FULL WIDTH CONTAINER matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#25E2CC] block mb-4 font-montserrat">
              Our Culture
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.2] text-white font-rubik mb-10">
              We believe business without humanity is a failure. Our team shoots for the stars to deliver our partner’s out-of-this-world results.
            </h2>

            {/* 2 Buttons matching live site: About Us (white) & Careers (black border) */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/company"
                className="group inline-flex items-center gap-2.5 bg-white hover:bg-gray-100 text-black font-semibold text-sm sm:text-[15px] px-8 py-3.5 rounded-full transition shadow-lg"
              >
                <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-black">
                  <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                </svg>
                <span>About Us</span>
              </Link>
              <Link
                href="/career"
                className="group inline-flex items-center gap-2.5 bg-black/40 hover:bg-white/10 border border-white/30 text-white font-semibold text-sm sm:text-[15px] px-8 py-3.5 rounded-full transition"
              >
                <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-white">
                  <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                </svg>
                <span>Careers</span>
              </Link>
            </div>
          </div>

          {/* Right Culture Graphic */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg rounded-[40px] overflow-hidden bg-gradient-to-br from-[#141718] to-[#0A0D0E] border border-white/10 p-6 sm:p-10 shadow-2xl">
              <img
                src="/assets/Group_8839.png"
                alt="SAI Digital Culture"
                className="w-full h-auto object-contain mx-auto transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
