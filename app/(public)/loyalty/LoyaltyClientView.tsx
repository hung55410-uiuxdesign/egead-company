'use client';

import React from 'react';
import Link from 'next/link';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import './loyalty.css';

export default function LoyaltyClientView() {
  return (
    <div id="main-home" className="catalyzer/loyalty catalyzer-loyalty">
      <div className="service-detail partner">
        {/* ================================================================== */}
        {/* 1. HERO SECTION (service-detail__header)                            */}
        {/* ================================================================== */}
        <div className="service-detail__header">
          <div className="loyalty-hero__container">
            <div className="loyalty-hero__row">
              {/* Left Column: Title, Subtitle, Intro & CTA Button */}
              <div className="loyalty-hero__left">
                <span className="loyalty-hero__badge">Our Products</span>
                <h1 className="loyalty-hero__title">SMARTLOYALTY</h1>
                <h2 className="loyalty-hero__heading">
                  Harness omni-channel loyalty the easy way.
                </h2>
                <p className="loyalty-hero__desc">
                  Cultivate deeper customer relationships, drive retention, and fortify your business growth at every touchpoint.
                </p>
                <div className="loyalty-hero__cta">
                  <Link className="loyalty-hero__btn" href="/contact-us">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="loyalty-hero__btn-icon"
                    >
                      <path
                        d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Schedule demo</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Mockup */}
              <div className="loyalty-hero__right">
                <img
                  src="/assets/loyalty/hero-mockup.png"
                  alt="SmartLoyalty Mobile App Interface"
                  className="loyalty-hero__mockup"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Glowing Ambient Aura & Video Background */}
          <div className="loyalty-hero__ambient-glow" />
          <video
            src="/assets/loyalty/loyalty-bg03.mp4"
            className="loyalty-hero__video"
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
            Is your brand experience connecting or pushing away?
          </p>
          <h2 className="product-overview__intro-subtitle">
            <span>
              Today’s customer craves more than transactions; they want meaningful connections and recognition for their loyalty.
            </span>
          </h2>
          <div className="product-overview__intro-content">
            <div className="video-block" title="SmartLoyalty Overview">
              <img src="/assets/loyalty/loyalty-video-cover.jpg" alt="SmartLoyalty Overview Video Cover" />
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
                <p>Discover SmartLoyalty</p>
                <div className="btn-block">
                  <a
                    className="ant-btn ant-btn-default ant-btn-default--white"
                    download="SmartLoyalty_Onepager.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/assets/loyalty/SmartLoyalty_Onepager.pdf"
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
        {/* 3. STRATEGY SECTION (Full-width matching page.tsx)                 */}
        {/* ================================================================== */}
        <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#000000] text-white overflow-hidden">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header Block */}
            <div className="w-full text-center max-w-4xl mx-auto mb-16 sm:mb-20">
              <p className="text-sm sm:text-base font-medium text-[#6CE8C3] mb-3 font-montserrat tracking-wider uppercase">
                Step into the future of O2O with SmartLoyalty
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white font-montserrat leading-[1.25] tracking-tight">
                <span>Our omnichannel solution leverages social interactions </span>
                <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                  to keep customers engaged, ensuring your brand thrives at every touchpoint.
                </span>
              </h2>
            </div>

            {/* Strategy Card 1: Enterprise-Class Loyalty */}
            <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-7 sm:p-10 lg:p-12 xl:p-16 mb-8 sm:mb-12 shadow-2xl relative overflow-hidden transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
                {/* Left Column: Heading, description, bullet points */}
                <div className="lg:col-span-5 xl:col-span-5 text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                    Enterprise-Class Loyalty.
                  </h3>
                  <p className="text-sm sm:text-base lg:text-[17px] text-[#A1A1AA] font-normal leading-[1.65] mb-7 sm:mb-8 font-montserrat">
                    If you’re looking to boost your enterprise-class business’ Omnichannel marketing strategy on another level, you won’t risk missing this intelligent, data-driven Loyalty technology that offers:
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
                        Versatility through an API-first approach, catering to a spectrum of accrual types, ensuring a loyalty solution finely tuned to your distinct business needs.
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
                        Scalable infrastructure with cloud-native architecture, which seamlessly scales with your business growth, providing a robust and scalable loyalty infrastructure.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Right Column: Img1 Mockup */}
                <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
                  <img
                    src="/assets/loyalty/img1.png"
                    alt="Enterprise-Class Loyalty"
                    className="w-full h-auto max-w-[720px] lg:max-w-[840px] xl:max-w-[940px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Strategy Card 2: Intelligent and Evolving */}
            <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-7 sm:p-10 lg:p-12 xl:p-16 mb-8 sm:mb-12 shadow-2xl relative overflow-hidden transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
                {/* Left Column: Heading, description, bullet points */}
                <div className="lg:col-span-5 xl:col-span-5 text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                    Intelligent and Evolving.
                  </h3>
                  <p className="text-sm sm:text-base lg:text-[17px] text-[#A1A1AA] font-normal leading-[1.65] mb-7 sm:mb-8 font-montserrat">
                    Traditional, manual Loyalty programs no longer cut it in the digital-first era. You need an ever-evolving intelligent Loyalty solution that delivers:
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
                        Cutting-edge AI/ML enhancement, which collects and analyzes vast amounts of customer data, then provides profound insights into individual preferences, behaviors, and purchasing habits.
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
                        Seamless customer engagement using AI-driven recommendation engines, giving each customer targeted offers, rewards, and highly personalized incentives.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Right Column: Img2 Mockup */}
                <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
                  <img
                    src="/assets/loyalty/img2.png"
                    alt="Intelligent and Evolving"
                    className="w-full h-auto max-w-[720px] lg:max-w-[840px] xl:max-w-[940px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Strategy Card 3: Social Sharing of Reward Points */}
            <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-7 sm:p-10 lg:p-12 xl:p-16 relative overflow-hidden shadow-2xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
                {/* Left Column: Heading, description, paragraph */}
                <div className="lg:col-span-5 xl:col-span-5 text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                    Social Sharing of Reward Points.
                  </h3>
                  <p className="text-sm sm:text-base lg:text-[17px] text-[#A1A1AA] font-normal leading-[1.65] mb-5 font-montserrat">
                    It’s more than just keeping your customers coming back; it’s building a sustainable community around your brand.
                  </p>
                  <p className="text-sm sm:text-base lg:text-[16px] text-[#CBD5E1] font-light leading-[1.7] font-montserrat">
                    Make it happen with Loyalty’s social sharing feature that allows your customers to share their reward points with friends and family, thus leading to enhanced customer satisfaction and retention and organic brand reach extension. Let them build their community, then yours.
                  </p>
                </div>

                {/* Right Column: Img3 Mockup */}
                <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
                  <img
                    src="/assets/loyalty/img3.png"
                    alt="Social Sharing of Reward Points"
                    className="w-full h-auto max-w-[720px] lg:max-w-[840px] xl:max-w-[940px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 4. ADVANCE SECTION (Next-gen technology Bento Cards)               */}
        {/* ================================================================== */}
        <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#000000] text-white overflow-hidden border-t border-white/5">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header Block */}
            <div className="w-full text-center max-w-4xl mx-auto mb-16 sm:mb-20">
              <p className="text-sm sm:text-base font-medium text-[#6CE8C3] mb-3 font-montserrat tracking-wider uppercase">
                Next-gen technology
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                <span>Step into the future of </span>
                <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                  customer retention.
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-[19px] text-[#A1A1AA] font-light leading-[1.7] max-w-3xl mx-auto font-montserrat">
                Cultivate deeper customer relationships, drive retention, and propel your enterprise forward.
              </p>
            </div>

            {/* 2 Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* Bento Card 1: MACH Architecture */}
              <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden group hover:border-[#10E774]/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/assets/loyalty/loyalty-1.svg"
                      alt="MACH Architecture"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-montserrat mb-4 group-hover:text-[#6CE8C3] transition-colors">
                    MACH Architecture
                  </h3>
                  <p className="text-base sm:text-[17px] text-[#A1A1AA] font-light leading-[1.7] font-montserrat">
                    SmartLoyalty’s MACH-based architecture elevates shopping experiences, seamlessly supporting both online and offline models while incentivizing in-store actions.
                  </p>
                </div>
              </div>

              {/* Bento Card 2: Blockchain Integration and Smart Contract */}
              <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden group hover:border-[#10E774]/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/assets/loyalty/loyalty-2.svg"
                      alt="Blockchain Integration and Smart Contract Application"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-montserrat mb-4 group-hover:text-[#6CE8C3] transition-colors">
                    Blockchain Integration and Smart Contract Application
                  </h3>
                  <p className="text-base sm:text-[17px] text-[#A1A1AA] font-light leading-[1.7] font-montserrat">
                    Use blockchain technology and smart contracts to provide a secure, transparent, and reliable reward points system that your customers can trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 5. HOW IT WORKS SECTION (Full-width matching Section 3)            */}
        {/* ================================================================== */}
        <section className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#000000] text-white overflow-hidden border-t border-white/5">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            {/* Header Block */}
            <div className="w-full text-center max-w-4xl mx-auto mb-14 sm:mb-18">
              <p className="text-sm sm:text-base font-medium text-[#6CE8C3] mb-3 font-montserrat tracking-wider uppercase">
                How it works
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white font-montserrat leading-[1.25] tracking-tight mb-4 sm:mb-5">
                <span>Effortless integration </span>
                <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                  for impactful results.
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-[19px] text-[#A1A1AA] font-light leading-[1.7] max-w-3xl mx-auto font-montserrat">
                From precise segmentation to seamless O2O experiences, SmartLoyalty drives customer retention with minimal effort.
              </p>
            </div>

            {/* Diagram Card Container */}
            <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#12131C] border border-white/[0.08] p-6 sm:p-10 lg:p-14 xl:p-16 shadow-2xl relative overflow-hidden flex items-center justify-center transition-all duration-300">
              <video
                src="/assets/loyalty/loyalty-how-it-works.mp4"
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
        {/* 6. LOGO SLIDER (Using CaseStudiesSection marquee)                  */}
        {/* ================================================================== */}
        <CaseStudiesSection
          variant="smartprice"
          subtitle="API-first Cloud Native SaaS solution"
          title="Seamlessly integrates with any eCommerce technology provider."
        />

        {/* ================================================================== */}
        {/* 7. VIDEO BADGE CONTAINER (SAP Store Availability)                 */}
        {/* ================================================================== */}
        <section className="relative w-full min-h-[380px] sm:min-h-[420px] flex items-center overflow-hidden border-t border-white/5">
          <video
            src="/assets/loyalty/loyalty-bg02.mp4"
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
                SmartLoyalty is available on:
              </p>
              <a
                href="https://store.sap.com/dcp/en/product/display-2002000100_live_v1/catalyzer-loyalty"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                <img
                  src="/assets/loyalty/available-on-sap-store.png"
                  alt="Available on SAP Store"
                  className="w-[210px] sm:w-[240px] h-auto object-contain"
                />
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 8. CONTACT BLOCK (Transform your customer retention today)         */}
        {/* ================================================================== */}
        <section className="relative w-full py-24 sm:py-32 bg-[#000000] text-white border-t border-white/10 overflow-hidden text-center">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-bold font-montserrat leading-[1.2] mb-10">
              <span>Transform your </span>
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent font-extrabold">
                customer retention
              </span>
              <span> today.</span>
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
