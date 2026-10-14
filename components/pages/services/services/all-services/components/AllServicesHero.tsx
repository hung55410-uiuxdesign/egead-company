'use client';

import { MotionHero } from '@/components/MotionSection';

export default function AllServicesHero() {
  return (
    <section
      id="services-hero"
      className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-28 sm:pt-36 lg:pt-40 pb-8 overflow-hidden"
    >
      <MotionHero className="relative z-10">
        {/* Top Eyebrow: Plain text matching SAI Digital */}
        <p className="text-base sm:text-lg font-normal text-white/90 mb-6 sm:mb-8 font-montserrat">
          Our Services
        </p>

        {/* Main Title: Exact SAI Digital 2-Line Punch with Home Page Signature Gradient */}
        <div className="heading-text mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-bold font-montserrat leading-[1.06] tracking-tight">
            <span className="block text-white">FROM CHALLENGES</span>
            <span className="block bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-[#E0FCF4] bg-clip-text text-transparent">
              TO OPPORTUNITIES
            </span>
          </h1>
        </div>

        {/* Anchor Block: Horizontal In-Page Navigation matching SAI Digital .anchor-block */}
        <div className="anchor-block w-full pt-4 pb-2">
          <div className="flex items-center gap-8 sm:gap-12 md:gap-14 overflow-x-auto py-2 no-scrollbar">
            <a
              href="#service"
              className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-normal text-white/80 hover:text-[#7DE8E3] transition-colors whitespace-nowrap"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white/80 group-hover:fill-[#7DE8E3] transition-colors shrink-0"
                aria-hidden="true"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>Services</span>
            </a>

            <a
              href="#integrated"
              className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-normal text-white/80 hover:text-[#7DE8E3] transition-colors whitespace-nowrap"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white/80 group-hover:fill-[#7DE8E3] transition-colors shrink-0"
                aria-hidden="true"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>The Integrated Advantage</span>
            </a>

            <a
              href="#proven-results"
              className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-normal text-white/80 hover:text-[#7DE8E3] transition-colors whitespace-nowrap"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white/80 group-hover:fill-[#7DE8E3] transition-colors shrink-0"
                aria-hidden="true"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>Proven Results</span>
            </a>

            <a
              href="#clients-partnerships"
              className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-normal text-white/80 hover:text-[#7DE8E3] transition-colors whitespace-nowrap"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white/80 group-hover:fill-[#7DE8E3] transition-colors shrink-0"
                aria-hidden="true"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>Clients &amp; Partnerships</span>
            </a>
          </div>
        </div>
      </MotionHero>
    </section>
  );
}
