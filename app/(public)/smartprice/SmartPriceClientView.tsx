'use client';

import React from 'react';
import Link from 'next/link';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import './smartprice.css';

export default function SmartPriceClientView() {
  return (
    <div id="main-home" className="catalyzer/smartprice catalyzer-smartprice">
      <div className="service-detail partner">
        {/* ================================================================== */}
        {/* 1. HERO SECTION (service-detail__header)                            */}
        {/* ================================================================== */}
        <div className="service-detail__header">
          <div className="smartprice-hero__container">
            <div className="smartprice-hero__row">
              {/* Left Column: Title, Subtitle, Intro & CTA Button */}
              <div className="smartprice-hero__left">
                <h1 className="smartprice-hero__title">SMARTPRICE</h1>
                <h2 className="smartprice-hero__heading">
                  Maximize profits on pre-owned products.
                </h2>
                <p className="smartprice-hero__desc">
                  Catalyzer SmartPrice uses real-time intelligence to help enterprise businesses standardize their pricing for pre-owned products.
                </p>
                <div className="smartprice-hero__cta">
                  <Link className="smartprice-hero__btn" href="/contact-us">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="smartprice-hero__btn-icon"
                    >
                      <path
                        d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Schedule Demo</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Dual-Phone Mockups */}
              <div className="smartprice-hero__right">
                <img
                  src="/assets/smartprice/Top.png"
                  alt="SmartPrice Mobile App Mockup"
                  className="smartprice-hero__mockup"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Glowing Ambient Aura & Video Background */}
          <div className="smartprice-hero__ambient-glow" />
          <video
            src="/assets/smartprice/SmartPrice_BG.mp4"
            className="smartprice-hero__video"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* ================================================================== */}
        {/* 2. OVERVIEW SECTION (product-overview__intro)                       */}
        {/* ================================================================== */}
        <div className="product-overview__intro">
          <p className="product-overview__intro-title">
            Don&apos;t let your profits be lost in the guessing game
          </p>
          <h2 className="product-overview__intro-subtitle">
            <span>
              Finding the sweet spot for pre-owned product pricing is <br />
            </span>
            <span>
              more art than science... until now.
            </span>
          </h2>
          <div className="product-overview__intro-content">
            <div className="video-block" title="SmartPrice Overview">
              <img src="/assets/smartprice/SmartPrice.jpg" alt="SmartPrice Overview" />
              <div className="video-block__icon">
                <span role="img" aria-label="play" className="anticon">
                  <svg width="80" height="80" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="0.7"
                      y="0.7"
                      width="93.6"
                      height="93.6"
                      rx="46.8"
                      stroke="white"
                      strokeOpacity="0.32"
                      strokeWidth="1.4"
                    />
                    <rect x="16" y="16" width="63" height="63" rx="31.5" fill="white" />
                    <rect
                      x="16.7"
                      y="16.7"
                      width="61.6"
                      height="61.6"
                      rx="30.8"
                      stroke="white"
                      strokeOpacity="0.2"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M42.8085 34.1436C40.2953 32.6983 38.2578 33.8823 38.2578 36.786V58.214C38.2578 61.1206 40.2953 62.303 42.8085 60.8591L61.4896 50.1181C64.0036 48.6723 64.0036 46.3299 61.4896 44.8844L42.8085 34.1436Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="video-text">
              <div className="video-text__inner">
                <p>Discover SmartPrice</p>
                <div className="btn-block">
                  <a
                    className="ant-btn ant-btn-default ant-btn-default--white"
                    download="CASmartPrice_OnePager_EN_231018.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/assets/smartprice/OnePager.pdf"
                  >
                    <span role="img" aria-label="download" className="anticon">
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="file_download">
                          <path
                            id="Vector"
                            d="M12.0013 10.5013V12.5013H4.0013V10.5013H2.66797V12.5013C2.66797 13.2346 3.26797 13.8346 4.0013 13.8346H12.0013C12.7346 13.8346 13.3346 13.2346 13.3346 12.5013V10.5013H12.0013ZM11.3346 7.83464L10.3946 6.89464L8.66797 8.61463V3.16797H7.33464V8.61463L5.60797 6.89464L4.66797 7.83464L8.0013 11.168L11.3346 7.83464Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                    </span>
                    One pager
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. STRATEGY SECTION (full-width matching page.tsx)                 */}
        {/* ================================================================== */}
        <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#000000] text-white overflow-hidden">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header Block */}
            <div className="w-full text-center max-w-4xl mx-auto mb-16 sm:mb-20">
              <p className="text-sm sm:text-base font-medium text-[#6CE8C3] mb-3 font-montserrat tracking-wider uppercase">
                The future of pricing strategies
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white font-montserrat leading-[1.25] tracking-tight">
                <span>Accurate prices of pre-owned products in minute with </span>
                <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                  the power of AI/ML.
                </span>
              </h2>
            </div>

            {/* Strategy Card 1: Streamline appraisal */}
            <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-7 sm:p-10 lg:p-12 xl:p-16 mb-8 sm:mb-12 shadow-2xl relative overflow-hidden transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
                {/* Left Column: Heading, description, bullet points */}
                <div className="lg:col-span-5 xl:col-span-5 text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                    Streamline your appraisal &amp; pricing process.
                  </h3>
                  <p className="text-sm sm:text-base lg:text-[17px] text-[#A1A1AA] font-normal leading-[1.65] mb-7 sm:mb-8 font-montserrat">
                    SmartPrice transforms the appraisal and pricing process by automating and streamlining operations.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3.5">
                      <svg
                        className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                      </svg>
                      <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                        Reduce operational complexity by automating price setting
                      </span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <svg
                        className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                      </svg>
                      <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                        Generate multiple, real-time pricing scenarios.
                      </span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <svg
                        className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                      </svg>
                      <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                        Move the entire appraisal process online for easy tracking.
                      </span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <svg
                        className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                      </svg>
                      <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                        Simplify data integration &amp; management with an API-led solution.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Right Column: Car top view & inspection mockup */}
                <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
                  <img
                    src="/assets/smartprice/Img2.png"
                    alt="Streamline your appraisal & pricing process"
                    className="w-full h-auto max-w-[720px] lg:max-w-[840px] xl:max-w-[940px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Strategy Card 2: Market intelligence */}
            <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-7 sm:p-10 lg:p-12 xl:p-16 relative overflow-hidden shadow-2xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
                {/* Left Column: Heading, description, bullet points */}
                <div className="lg:col-span-5 xl:col-span-5 text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                    Generate profitable pricing with real-time market intelligence.
                  </h3>
                  <p className="text-sm sm:text-base lg:text-[17px] text-[#A1A1AA] font-normal leading-[1.65] mb-7 sm:mb-8 font-montserrat">
                    If your business seeks to optimize its revenue and remain competitive in the dynamic pre-own market, start with SmartPrice technology.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3.5">
                      <svg
                        className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                      </svg>
                      <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                        Generate optimal prices with the best possible margin.
                      </span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <svg
                        className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                      </svg>
                      <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                        Capture market share by creating a trustworthy trading platform.
                      </span>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <svg
                        className="w-4 h-4 text-[#3B82F6] shrink-0 mt-1 fill-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                      </svg>
                      <span className="text-sm sm:text-[15px] lg:text-[16px] text-[#E2E8F0] font-light leading-relaxed font-montserrat">
                        Make comparison shopping easier by displaying prices from competitors.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Right Column: Pricing Result & Models mockup */}
                <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
                  <img
                    src="/assets/smartprice/Img1.png"
                    alt="Generate profitable pricing with real-time market intelligence"
                    className="w-full h-auto max-w-[720px] lg:max-w-[840px] xl:max-w-[940px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 4. HOW IT WORKS SECTION (full-width matching page.tsx)             */}
        {/* ================================================================== */}
        <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#000000] text-white overflow-hidden border-t border-white/5">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header Block */}
            <div className="w-full text-center max-w-4xl mx-auto mb-14 sm:mb-18">
              <p className="text-sm sm:text-base font-medium text-[#6CE8C3] mb-3 font-montserrat tracking-wider uppercase">
                How it works
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                <span>AI-Driven </span>
                <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                  SmartPrice.
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-[19px] text-[#A1A1AA] font-light leading-[1.7] max-w-3xl mx-auto font-montserrat">
                The self-learning model progressively improves pricing accuracy as more data and feedback is provided.
              </p>
            </div>

            {/* Diagram Card Container - Full width matching Section 3 */}
            <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-6 sm:p-10 lg:p-14 xl:p-16 shadow-2xl relative overflow-hidden flex items-center justify-center transition-all duration-300">
              <video
                src="/assets/smartprice/Diagram_Desktop.mp4"
                className="w-full h-auto max-w-[1360px] xl:max-w-[1500px] object-contain rounded-[18px] sm:rounded-[24px] block drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 5. LOGO SLIDER (Using CaseStudiesSection marquee)                  */}
        {/* ================================================================== */}
        <CaseStudiesSection variant="smartprice" />

        {/* ================================================================== */}
        {/* 6. VIDEO BADGE CONTAINER (SAP Store Availability)                 */}
        {/* ================================================================== */}
        <section className="relative w-full min-h-[380px] sm:min-h-[420px] flex items-center overflow-hidden border-t border-white/5">
          <video
            src="/assets/smartprice/SmartPrice_BG02.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 py-16 sm:py-20">
            <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C]/90 border border-white/[0.12] backdrop-blur-md p-8 sm:p-12 lg:p-14 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
              <p className="text-xl sm:text-2xl lg:text-[28px] font-medium text-white font-montserrat text-center sm:text-left">
                Catalyzer SmartPrice is available on:
              </p>
              <a
                href="https://store.sap.com/dcp/en/product/display-2001016288_live_v1/catalyzer-smartprice"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                <img
                  src="/assets/smartprice/Available-on-SAP-Store.png"
                  alt="Available on SAP Store"
                  className="w-[210px] sm:w-[240px] h-auto object-contain"
                />
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 7. CONTACT BLOCK (Boost profits now with SmartPrice)               */}
        {/* ================================================================== */}
        <section className="relative w-full py-24 sm:py-32 bg-[#000000] text-white border-t border-white/10 overflow-hidden text-center">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-bold font-montserrat leading-[1.2] mb-10">
              <span className="text-white font-extrabold">Boost profits</span> now <br className="hidden sm:inline" />
              with SmartPrice.
            </h2>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-[#10E774] hover:bg-[#0ecb66] text-[#003D5B] font-bold text-base font-montserrat transition-all duration-300 shadow-[0_0_30px_rgba(16,231,116,0.4)] hover:shadow-[0_0_40px_rgba(16,231,116,0.7)] hover:scale-105"
            >
              Let&apos;s talk
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
