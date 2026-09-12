'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactBlock() {
  return (
    <section className="contact-block relative w-full py-24 sm:py-32 lg:py-36 bg-[#0A0D0E] text-white overflow-hidden text-center">
      {/* FULL WIDTH CENTERED BLOCK matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 flex flex-col items-center justify-center">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight leading-[1.12] text-white font-rubik max-w-5xl">
          Let's <span className="text-[#7ceee0] font-extrabold">boost</span> your <br />
          commerce outcomes.
        </h2>

        <div className="mt-10 sm:mt-12">
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-2.5 bg-[#25E2CC] hover:bg-[#1ec2af] text-[#003D5B] font-semibold text-base sm:text-lg px-9 sm:px-11 py-3.5 sm:py-4 rounded-full transition shadow-[0_0_30px_rgba(37,226,204,0.35)] hover:shadow-[0_0_45px_rgba(37,226,204,0.55)]"
          >
            <span>Let's talk</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
