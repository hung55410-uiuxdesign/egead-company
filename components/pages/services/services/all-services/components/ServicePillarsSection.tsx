'use client';

import Link from 'next/link';
import MotionSection from '@/components/MotionSection';
import { servicePillars } from '../data/service-pillars.data';

export default function ServicePillarsSection() {
  return (
    <MotionSection
      id="service"
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28 scroll-mt-28"
    >
      <div className="max-w-4xl mb-12 sm:mb-16">
        <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
          Complete Capabilities Portfolio
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-semibold font-montserrat leading-[1.25] mb-4">
          <span className="text-white">Complete Operational Spectrum:</span> <br />
          <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
            From Ingestion to Delivery &amp; Growth
          </span>
        </h2>
        <p className="text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
          Specialized technology, automated manufacturing, and data-driven performance marketing.
        </p>
      </div>

      {/* List of 6 Service Cards with authentic SAI Digital card structure */}
      <div className="space-y-10 sm:space-y-14">
        {servicePillars.map((service) => (
          <div
            key={service.id}
            className="group rounded-[32px] bg-[#12131c] border border-white/10 hover:border-[#5EFC8D]/40 transition-all duration-300 p-6 sm:p-10 lg:p-12 shadow-xl hover:shadow-[0_0_35px_rgba(94,252,141,0.08)]"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
              {/* Left: 3D Category Icon */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 shrink-0 flex items-center justify-center p-2 rounded-2xl bg-[#181a24] border border-white/5">
                <img
                  src={service.iconImg}
                  alt={service.title}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right: Content Wrapper */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-2xl font-medium text-white/50 font-montserrat">
                    {service.number}
                  </p>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#1A2022] text-[#5EFC8D] border border-[#5EFC8D]/20 font-montserrat">
                    {service.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold font-montserrat mb-3 leading-snug">
                  <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                    {service.title}
                  </span>
                </h3>

                <p className="text-sm sm:text-base text-[#b3b3b3] font-light leading-relaxed font-montserrat max-w-3xl mb-8">
                  {service.description}
                </p>

                {/* 3 Children Sub-cards with SAI Digital Gradient Borders */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                  {service.children.map((child, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-gradient-to-b from-[#5EFC8D]/25 via-[#10E774]/5 to-[#5EFC8D]/15 p-[1px] rounded-[20px] transition-all duration-300 hover:from-[#5EFC8D]/50 hover:to-[#5EFC8D]/30"
                    >
                      <div className="bg-[#0A0D0E] p-6 rounded-[20px] h-full flex flex-col justify-start">
                        <div className="w-10 h-10 mb-4 flex items-center justify-center">
                          <img
                            src={child.icon}
                            alt={child.title}
                            className="w-8 h-8 object-contain filter brightness-110"
                          />
                        </div>
                        <h4 className="text-base sm:text-[17px] font-medium text-[#D4FAE6] font-montserrat mb-2 leading-snug">
                          {child.title}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-[#8C8C8C] font-light leading-relaxed font-montserrat">
                          {child.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Discover More Action Button */}
                <div className="pt-2">
                  <Link
                    href={service.ctaHref}
                    className="group/btn inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#10E774] text-black font-medium text-sm hover:bg-[#5EFC8D] transition-all duration-300 shadow-[0_0_20px_rgba(16,231,116,0.3)] hover:shadow-[0_0_30px_rgba(94,252,141,0.5)] font-montserrat"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-black group-hover/btn:rotate-45 transition-transform duration-300"
                    >
                      <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                    </svg>
                    <span>{service.ctaText}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
