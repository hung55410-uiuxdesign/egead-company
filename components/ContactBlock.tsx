'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactBlock() {
  return (
    <section className="contact-block relative w-full py-24 sm:py-32 lg:py-36 bg-[#0A0D0E] text-white overflow-hidden text-center">
      {/* FULL WIDTH CENTERED BLOCK matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-5xl lg:text-[68px] font-medium tracking-normal leading-[1.18] text-[#D4FAE6] font-montserrat max-w-5xl">
          Let&apos;s <span className="text-[#5EFC8D] font-medium">automate</span> your <br className="hidden sm:inline" />
          e-commerce operations.
        </h2>

        <div className="mt-8 sm:mt-12">
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-2.5 bg-[#10E774] hover:bg-[#0ecb66] text-[#003D5B] font-medium text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition shadow-[0_0_30px_rgba(16, 231, 116, 0.35)] hover:shadow-[0_0_45px_rgba(16, 231, 116, 0.55)]"
          >
            <span>Get Free Consultation</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
