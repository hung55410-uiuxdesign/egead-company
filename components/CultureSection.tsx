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
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
              Our Culture
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight leading-[1.3] text-[#D4FAE6] font-montserrat mb-10">
              Empowering global commerce through <span className="text-[#5EFC8D] font-medium">relentless operational innovation</span>, technology automation, and transparent collaboration.
            </h2>

            {/* 2 Buttons matching live site: About Us & Careers */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/company"
                className="group inline-flex items-center gap-2.5 bg-[#5EFC8D] hover:bg-[#4ee37e] text-black font-medium text-sm sm:text-[15px] px-8 py-3.5 rounded-full transition shadow-lg font-montserrat"
              >
                <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-black">
                  <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                </svg>
                <span>About Us</span>
              </Link>
              <Link
                href="/career"
                className="group inline-flex items-center gap-2.5 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-[#5EFC8D] hover:text-[#5EFC8D] text-[#D4FAE6] font-medium text-sm sm:text-[15px] px-8 py-3.5 rounded-full transition font-montserrat"
              >
                <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
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
                alt="E-GEAD Company Culture"
                className="w-full h-auto object-contain mx-auto transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
