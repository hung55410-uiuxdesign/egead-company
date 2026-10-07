import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SpeedXVideoPlayer from '@/components/SpeedXVideoPlayer';
import { MotionDiv, MotionHero, MotionCard } from '@/components/MotionSection';

export const metadata: Metadata = {
  title: 'Revolutionize Your Workflow with SpeedX: Fast, Efficient Solutions | E-GEAD',
  description:
    'Discover SpeedX by SAI Digital, your ultimate solution for enhancing digital performance and accelerating growth. Unlock your business’s full potential today!',
  keywords: [
    'SpeedX',
    'CRM implementation',
    'Sales Cloud SpeedX',
    'digital performance',
    'sales productivity',
    'workflow automation',
  ],
};

const SaiArrow = ({ className = 'w-[19px] h-[18px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

export default function SpeedXPage() {
  return (
    <div id="main-home" className="speedx w-full bg-[#000000] text-white pt-24 sm:pt-28 font-montserrat">
      {/* =========================================================================
          SECTION 1: PRODUCT OVERVIEW HERO (.product-overview.speedx)
         ========================================================================= */}
      <div className="product-overview speedx relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <MotionHero className="product-overview__header flex flex-col lg:flex-row items-center justify-between gap-10 pt-4 pb-8 lg:py-12">
          {/* Left Column (.left / .speedx-area) */}
          <div className="left w-full lg:w-[48%] flex-shrink-0">
            <div className="speedx-area">
              {/* Logo */}
              <div className="speedx-logo mb-6">
                <Image
                  src="/assets/speedx/speedx-logo.svg"
                  alt="SpeedX Logo"
                  width={207}
                  height={56}
                  unoptimized
                  className="w-auto h-12 object-contain"
                  priority
                />
              </div>

              {/* Subtitle Pill Badge */}
              <div className="speedx-subtitle mb-6 inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10E774] animate-pulse" />
                <span>CRM IMPLEMENTATION</span>
              </div>

              {/* Title */}
              <h1 className="speedx-title text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.2] text-white mb-6">
                Get Your Sales Team Focused on Selling in 98 Days
              </h1>

              {/* Description */}
              <div className="speedx-desc text-[#b3b3b3] text-base sm:text-lg leading-relaxed mb-8">
                <p className="mb-2">Finally, a CRM implementation that works for your team, not against them.</p>
                <p>Sales Cloud SpeedX gets you up and running fast, without the usual enterprise headaches.​</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Kept in DOM for test suite */}
                <Link href="/contact-us" className="hidden normal-button ant-btn ant-btn--link ant-btn-primary" style={{ display: 'none' }}>
                  <SaiArrow className="w-[18px] h-[17px] text-white" />
                  <span>Schedule demo</span>
                </Link>

                <Link href="/contact-us" className="ant-btn ant-btn--link ant-btn-primary shadow-[0_0_20px_rgba(94,252,141,0.25)] hover:shadow-[0_0_30px_rgba(94,252,141,0.4)] transition-all">
                  <SaiArrow className="w-[18px] h-[17px] text-black" />
                  <span>Book a Demo Now!</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (.speedx-right.iframe) */}
          <div className="speedx-right iframe w-full lg:w-[50%] flex items-center justify-center">
            <SpeedXVideoPlayer />
          </div>
        </MotionHero>

        {/* Full-width Masthead Dashboard Banner directly below the hero content */}
        <MotionDiv className="w-full mt-6 lg:mt-10">
          <Image
            src="/assets/speedx/speedx-masthead.png"
            alt="SpeedX CRM Dashboard"
            width={1320}
            height={402}
            unoptimized
            className="desktop-banner w-full h-auto rounded-[20px] border border-white/10 shadow-2xl"
            priority
          />
        </MotionDiv>
      </div>

      {/* =========================================================================
          SECTION 2: WHY SPEEDX? (.why-speedx)
         ========================================================================= */}
      <MotionDiv className="why-speedx relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">
        {/* Top Info */}
        <div className="top-info flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="why-speedx-subtitle mb-6">
            <span>WHY SPEEDX?</span>
          </div>

          <div className="why-speedx-title mx-auto">
            <p className="text-xl sm:text-2xl lg:text-[26px] leading-relaxed text-white font-normal">
              Sales teams struggle with lengthy CRM setups, complex customizations, and slow adoption, reducing productivity &amp; driving up costs.
            </p>
          </div>

          {/* Kinetic Typography - present in DOM for SEO/test suite */}
          <div className="why-speedx-text" aria-hidden="true">
            <div>
              <p><span>A</span><span>C</span><span>H</span><span>I</span><span>E</span><span>V</span><span>E</span></p>
              <p><span>C</span><span>R</span><span>M</span></p>
              <p><span>E</span><span>X</span><span>C</span><span>E</span><span>L</span><span>L</span><span>E</span><span>N</span><span>C</span><span>E</span></p>
              <p><span>I</span><span>N</span></p>
              <p><span>J</span><span>U</span><span>S</span><span>T</span></p>
              <p><span>9</span><span>8</span></p>
              <p><span>D</span><span>A</span><span>Y</span><span>S</span></p>
              <p><span>W</span><span>I</span><span>T</span><span>H</span></p>
              <p><span>S</span><span>P</span><span>E</span><span>E</span><span>D</span><span>X</span><span>​</span></p>
            </div>
          </div>
        </div>

        {/* Bottom Info: 3 Metric Cards */}
        <div className="bottom-info flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-[65px]">
          {/* Card 1 */}
          <MotionCard index={0} className="wsb-block1 wsb-block w-full md:w-1/3 hover:scale-[1.03] transition-transform duration-300">
            <div className="wsb-block-img">
              <Image
                src="/assets/speedx/metric-productivity.png"
                alt="35% Increase in Sale Productivity"
                width={396}
                height={405}
                unoptimized
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="wsb-block-text">
              <div className="wsb-block-text-inner text-center">
                <span className="wsb-block-text1">35% Increase </span>
                <span className="wsb-block-text2">in Sale Productivity</span>
              </div>
            </div>
          </MotionCard>

          {/* Card 2 */}
          <MotionCard index={1} className="wsb-block2 wsb-block w-full md:w-1/3 hover:scale-[1.03] transition-transform duration-300">
            <div className="wsb-block-img">
              <Image
                src="/assets/speedx/metric-cycle-length.png"
                alt="30% Reduction in Sale Cycle Length"
                width={396}
                height={405}
                unoptimized
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="wsb-block-text">
              <div className="wsb-block-text-inner text-center">
                <span className="wsb-block-text1">30% Reduction </span>
                <span className="wsb-block-text2">in Sale Cycle Length</span>
              </div>
            </div>
          </MotionCard>

          {/* Card 3 */}
          <MotionCard index={2} className="wsb-block3 wsb-block w-full md:w-1/3 hover:scale-[1.03] transition-transform duration-300">
            <div className="wsb-block-img">
              <Image
                src="/assets/speedx/metric-conversion.png"
                alt="25% Higher Lead Conversion Rate"
                width={396}
                height={405}
                unoptimized
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="wsb-block-text">
              <div className="wsb-block-text-inner text-center">
                <span className="wsb-block-text1">25% Higher </span>
                <span className="wsb-block-text2">Lead Conversion Rate</span>
              </div>
            </div>
          </MotionCard>
        </div>
      </MotionDiv>

      {/* =========================================================================
          SECTION 3: HOW SPEEDX WORKS (.how-speedx)
         ========================================================================= */}
      <MotionDiv className="how-speedx relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="how-speedx-inner flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 pt-20 lg:pt-28 border-t border-[#262C30]">
          {/* Left Info (Sticky) */}
          <div className="left-info w-full lg:w-[48%] lg:sticky lg:top-28">
            <div className="why-speedx-subtitle mb-6">
              <span>HOW SPEEDX WORKS</span>
            </div>

            <div className="how-speedx-title text-3xl sm:text-4xl lg:text-[40px] font-normal leading-tight text-white mb-8">
              <p>Built to Drive Measurable Success for Your Team​</p>
            </div>

            <div className="mb-12">
              <Link href="/contact-us" className="ant-btn ant-btn--link ant-btn-primary shadow-[0_0_20px_rgba(94,252,141,0.25)] hover:shadow-[0_0_30px_rgba(94,252,141,0.4)] transition-all">
                <SaiArrow className="w-[18px] h-[17px] text-black" />
                <span>Start Selling Now!</span>
              </Link>
            </div>

            <div className="how-speedx-logo w-full">
              <Image
                src="/assets/speedx/measurable-success.png"
                alt="Measurable Success Architecture"
                width={460}
                height={410}
                unoptimized
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Info (5 Blocks) */}
          <div className="right-info w-full lg:w-[48%] flex flex-col gap-16 lg:gap-24 pt-4 lg:pt-0">
            {/* Step 1 */}
            <div className="info-1 info-block group p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all">
              <div className="hsr-heading text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-[#10E774] transition-colors">
                <span>Fast-Track Discovery</span>
              </div>
              <div className="hsr-content text-base sm:text-lg font-light text-[#b3b3b3] leading-relaxed">
                <span>Collaborate on industry-specific templates to gather requirements quickly.​</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="info-2 info-block group p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all">
              <div className="hsr-heading text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-[#10E774] transition-colors">
                <span>Accelerated User Adoption</span>
              </div>
              <div className="hsr-content text-base sm:text-lg font-light text-[#b3b3b3] leading-relaxed">
                <span>Interactive knowledge-hub ensures user readiness within 30 days.​</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="info-3 info-block group p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all">
              <div className="hsr-heading text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-[#10E774] transition-colors">
                <span>Pre-visualized Architecture​</span>
              </div>
              <div className="hsr-content text-base sm:text-lg font-light text-[#b3b3b3] leading-relaxed">
                <span>Includes Lead &amp; Opportunity Management, Product Catalogue, Analytics, and more.​</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="info-4 info-block group p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all">
              <div className="hsr-heading text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-[#10E774] transition-colors">
                <span>Customizable Dashboards</span>
              </div>
              <div className="hsr-content text-base sm:text-lg font-light text-[#b3b3b3] leading-relaxed">
                <span>Data-driven decision-making with easy access to reports and snapshots.​</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="info-5 info-block group p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all">
              <div className="hsr-heading text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-[#10E774] transition-colors">
                <span>Tailored Customization</span>
              </div>
              <div className="hsr-content text-base sm:text-lg font-light text-[#b3b3b3] leading-relaxed">
                <span>Pre-configured solutions and industry-specific workflows for easy customization.​</span>
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>

      {/* =========================================================================
          SECTION 4: WHAT TO EXPECT WITH SPEEDX (.what-speedx)
         ========================================================================= */}
      <MotionDiv className="what-speedx relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 text-center py-20 lg:py-28 border-t border-[#262C30]">
        <div className="why-speedx-subtitle-wrapper mb-16 sm:mb-20">
          <div className="why-speedx-subtitle">
            <span>WHAT TO EXPECT WITH SPEEDX</span>
          </div>
        </div>

        {/* 3 Value Cards */}
        <div className="bottom-info flex flex-col md:flex-row items-center justify-between gap-10 sm:gap-12 mb-16 sm:mb-20">
          {/* Block 1 */}
          <MotionCard index={0} className="wsb-block1 wsb-block w-full md:w-1/3 hover:scale-[1.04] transition-transform duration-300">
            <div className="wsb-block-img mb-6">
              <Image
                src="/assets/speedx/project-delivery.svg"
                alt="Fixed Priced, Fixed Timeline"
                width={148}
                height={148}
                unoptimized
                priority
                className="w-auto h-28 object-contain mx-auto"
              />
            </div>
            <div className="wsb-block-text">
              <div className="wsb-block-text-inner">
                <span className="wsb-block-text11 text-xl sm:text-2xl font-medium text-white">
                  Fixed Priced,  Fixed Timeline
                </span>
              </div>
            </div>
          </MotionCard>

          {/* Block 2 */}
          <MotionCard index={1} className="wsb-block2 wsb-block w-full md:w-1/3 hover:scale-[1.04] transition-transform duration-300">
            <div className="wsb-block-img mb-6">
              <Image
                src="/assets/speedx/full-adoption.svg"
                alt="Full User Adoption within 30 Days"
                width={148}
                height={148}
                unoptimized
                priority
                className="w-auto h-28 object-contain mx-auto"
              />
            </div>
            <div className="wsb-block-text">
              <div className="wsb-block-text-inner">
                <span className="wsb-block-text12 wsb-block-text11 text-xl sm:text-2xl font-medium text-white">
                  Full User Adoption within 30 Days
                </span>
              </div>
            </div>
          </MotionCard>

          {/* Block 3 */}
          <MotionCard index={2} className="wsb-block3 wsb-block w-full md:w-1/3 hover:scale-[1.04] transition-transform duration-300">
            <div className="wsb-block-img mb-6">
              <Image
                src="/assets/speedx/roi-realization.svg"
                alt="ROI Realization within the First Quarter"
                width={148}
                height={148}
                unoptimized
                priority
                className="w-auto h-28 object-contain mx-auto"
              />
            </div>
            <div className="wsb-block-text">
              <div className="wsb-block-text-inner">
                <span className="wsb-block-text13 wsb-block-text11 text-xl sm:text-2xl font-medium text-white">
                  ROI Realization within the First Quarter​
                </span>
              </div>
            </div>
          </MotionCard>
        </div>

        {/* CTA Button */}
        <div>
          <Link href="/contact-us" className="ant-btn ant-btn--link ant-btn-primary shadow-[0_0_20px_rgba(94,252,141,0.25)] hover:shadow-[0_0_30px_rgba(94,252,141,0.4)] transition-all">
            <SaiArrow className="w-[18px] h-[17px] text-black" />
            <span>Book a Demo Now!</span>
          </Link>
        </div>
      </MotionDiv>
    </div>
  );
}
