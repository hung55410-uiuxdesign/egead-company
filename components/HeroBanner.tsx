'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setLocalTime(timeString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    const el = document.getElementById('block__items__with__button') || document.getElementById('homepage__service');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="big__banner" className="big__banner relative h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 lg:px-14 xl:px-16 bg-black text-white select-none">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center banner__video"
        >
          <source src="/assets/bg_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 z-[1]" />
      </div>

      {/* Sub-header Bar: Center Announcement Pill & Right Local Time */}
      <div className="relative z-10 w-full flex items-center justify-between pt-2 sm:pt-4">
        <div className="hidden sm:block w-32 shrink-0"></div>

        {/* Center: US POD Announcement Pill */}
        <div className="mx-auto sm:mx-0">
          <Link
            href="/speedx"
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-[#D4FAE6]/10 hover:bg-[#D4FAE6]/20 backdrop-blur-md border border-[#D4FAE6]/30 text-white text-[11px] sm:text-xs tracking-wider uppercase font-medium transition shadow-lg"
          >
            <img src="/assets/icon.svg" alt="" className="w-3.5 h-3.5 object-contain" />
            <span>
              US PRINT-ON-DEMAND ·{' '}
              <span className="underline decoration-[#5EFC8D] font-medium text-[#D4FAE6] group-hover:text-[#5EFC8D] transition">
                FULFILLED IN UNDER 24 HOURS
              </span>
            </span>
          </Link>
        </div>

        {/* Right: Live Local Time with White Dot */}
        <div className="shrink-0 flex items-center gap-2 text-white text-xs sm:text-[13px] font-sans tracking-wider font-montserrat">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="5" fill="white" />
          </svg>
          <span>{localTime || '09:25:26 AM'}</span>
        </div>
      </div>

      {/* Main Hero Typography: Full Width bottom-left */}
      <div className="relative z-10 w-full mb-12 sm:mb-16">
        <h1 className="font-montserrat font-medium text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight uppercase leading-[1.08] text-[#D4FAE6] max-w-5xl">
          AUTOMATE <span className="text-[#5EFC8D] font-medium">OPERATIONS.</span>
          <br />
          SCALE <span className="text-[#5EFC8D] font-medium">GLOBAL SALES.</span>
        </h1>

        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#b3b3b3] font-light max-w-3xl leading-[1.75] font-montserrat">
          Unify order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time — cutting costs while accelerating revenue growth.
        </p>
      </div>

      {/* Bottom Center: Scroll Button matching live site SVG */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          type="button"
          onClick={scrollToServices}
          aria-label="Scroll to services"
          className="transition-transform hover:scale-110 cursor-pointer"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="39.25" y="0.75" width="38.5" height="38.5" rx="19.25" transform="rotate(90 39.25 0.75)" fill="black" fillOpacity="0.6" />
            <rect x="39.25" y="0.75" width="38.5" height="38.5" rx="19.25" transform="rotate(90 39.25 0.75)" stroke="white" strokeWidth="1.5" />
            <path d="M14.5107 16.0762L13.3307 17.2562L19.9974 23.9228L26.6641 17.2562L25.4841 16.0762L19.9974 21.5628L14.5107 16.0762Z" fill="white" />
          </svg>
        </button>
      </div>
    </section>
  );
}
