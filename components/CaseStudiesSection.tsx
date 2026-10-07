'use client';

import React from 'react';

const row1Clients = [
  { name: 'adidas', src: '/clients/01.png' },
  { name: 'Caraway', src: '/clients/02.png' },
  { name: 'Life Fitness', src: '/clients/03.png' },
  { name: 'Niagara', src: '/clients/04.png' },
  { name: 'Ooni', src: '/clients/05.png' },
  { name: 'rag & bone', src: '/clients/06.png' },
  { name: 'RTIC', src: '/clients/07.png' },
  { name: 'Simple Modern', src: '/clients/08.png' },
  { name: 'BÉIS', src: '/clients/09.png' },
  { name: 'Tatcha', src: '/clients/10.png' },
];

const row2Clients = [
  { name: 'THULE', src: '/clients/11.png' },
  { name: 'IGLOO', src: '/clients/12.png' },
  { name: 'Extreme Networks', src: '/clients/13.png' },
  { name: 'Jabra GN', src: '/clients/14.png' },
  { name: 'SimpliSafe', src: '/clients/15.png' },
  { name: 'AWAY', src: '/clients/16.png' },
  { name: 'Fjällräven', src: '/clients/17.png' },
  { name: 'FIGS', src: '/clients/18.png' },
  { name: 'Suitsupply', src: '/clients/19.png' },
  { name: 'TREK', src: '/clients/20.png' },
];

export default function CaseStudiesSection() {
  const row1Doubled = [...row1Clients, ...row1Clients];
  const row2Doubled = [...row2Clients, ...row2Clients];

  return (
    <section
      id="homepage__customers"
      className="relative w-full py-24 sm:py-32 lg:py-36 xl:py-40 bg-[#0A0D0E] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        {/* Header Block */}
        <div className="max-w-4xl">
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-normal text-white font-montserrat leading-[1.18] tracking-tight mb-7">
            Trusted by the world&apos;s
            <br className="hidden sm:inline" /> leading brands
          </h2>
          <p className="text-base sm:text-lg lg:text-[19px] text-[#b3b3b3] font-light leading-[1.8] font-montserrat max-w-3xl">
            More than 13,000 companies trust Egead to manage their global e-commerce logistics and digital infrastructure across 24 time zones. From Fortune 500s to emerging direct-to-consumer brands, companies rely on our fulfillment, sales automation, and growth marketing to drive supply chain efficiencies.
          </p>
        </div>
      </div>

      {/* 2 Marquee Rows */}
      <div className="relative w-full overflow-hidden space-y-8 sm:space-y-12">
        {/* Row 1 Marquee (Flows Left) */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle Left & Right Edge Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />

          <div className="flex w-max animate-marquee pause-hover items-center gap-4 sm:gap-6 lg:gap-10">
            {row1Doubled.map((client, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex items-center justify-center min-w-[160px] sm:min-w-[200px] lg:min-w-[220px] h-16 sm:h-20 lg:h-24 opacity-80 hover:opacity-100 transition-all duration-300 group"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Marquee (Flows Right / Reverse) */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle Left & Right Edge Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />

          <div
            className="flex w-max pause-hover items-center gap-10 sm:gap-14 lg:gap-20"
            style={{ animation: 'marquee 36s linear infinite reverse' }}
          >
            {row2Doubled.map((client, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex items-center justify-center min-w-[160px] sm:min-w-[200px] lg:min-w-[220px] h-16 sm:h-20 lg:h-24 opacity-80 hover:opacity-100 transition-all duration-300 group"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
