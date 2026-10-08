import React from 'react';
import Link from 'next/link';
import ContactBlock from '@/components/ContactBlock';
import MotionSection, { MotionHero, MotionDiv, MotionCard } from '@/components/MotionSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';

export const metadata = {
  title: 'About Us | E-GEAD: More Than An Operations Partner',
  description:
    'Discover E-GEAD’s mission, values, and operational ecosystem. Headquartered in Buon Ma Thuot, Vietnam with sub-24h US POD fulfillment, WMS automation, and multi-channel scale across 10+ countries.',
};

export default function CompanyPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36 overflow-hidden">
      {/* SECTION 1: Top Heading Title matching Sai Digital */}
      <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-6 pb-12 sm:pb-16">
        <div className="w-full">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
            Our Values
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium leading-[1.15] font-montserrat text-[#D4FAE6]">
            <span className="block">Transform today,</span>
            <span className="bg-gradient-to-r from-[#5EFC8D] via-[#10E774] to-[#7ceee0] bg-clip-text text-transparent block font-medium">
              lead tomorrow.
            </span>
          </h1>
        </div>
      </MotionHero>

      {/* SECTION 2: Big Visual Banner Image matching Rectangle 539 */}
      <MotionDiv className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-2xl h-[360px] sm:h-[500px] lg:h-[620px]">
          <img
            src="/assets/Rectangle_539.jpg"
            alt="E-GEAD Global Transformation"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex items-center gap-3">
            <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-montserrat text-xs text-white">
              Buon Ma Thuot HQ &amp; US Fulfillment Network
            </span>
          </div>
        </div>
      </MotionDiv>

      {/* SECTION 3: Intro & Transformation Overview (image-text has-content) */}
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Subtitle & Big Heading */}
          <div className="lg:col-span-6 space-y-4">
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] font-montserrat">
              End-to-end enterprise commerce solutions
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#D4FAE6] font-montserrat leading-[1.25]">
              We consult Customer Experience transformation across all business functions.
            </h2>
          </div>

          {/* Right Column: In-depth narrative based on E-GEAD content */}
          <div className="lg:col-span-6 space-y-6 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
            <p>
              With our hybrid operations and technology model, we fuse empathetic creative thinking, robust solution architecture capabilities, marketing abilities, and intelligence to drive operational efficiencies that help businesses scale and evolve rapidly.
            </p>
            <p>
              Our portfolio spans various verticals—from manufacturing, retail, distribution, and fast-moving consumer goods to custom print-on-demand and apparel—boasting collaborations with ambitious brands and sellers across more than 10 countries.
            </p>
            <p>
              Headquartered with our primary engineering hub in Buon Ma Thuot, Vietnam, paired with high-volume US fulfillment facilities guaranteeing sub-24h order dispatch, we eliminate 99% of manual fulfillment bottlenecks with automated precision.
            </p>
          </div>
        </div>
      </MotionSection>

      {/* SECTION 4: Our 4D Method (video-text) */}
      <MotionSection id="our-4d-method" className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
        <div className="w-full mb-8 sm:mb-12">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
            Our 4D Method
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            End-to-end innovative and forward-thinking solutions to make digital commerce simpler to navigate.
          </h2>
        </div>

        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-2xl bg-black">
          <video
            src="/assets/4D_Method_2026_Desktop_.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-cover rounded-[28px] sm:rounded-[36px]"
          />
        </div>
      </MotionSection>

      {/* SECTION 5: Value System (3 Items Cards matching Sai Digital) */}
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
        <div className="w-full mb-12 sm:mb-16">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
            Value System
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            We believe in building transformative experiences to empower individuals, businesses and communities.
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 01 */}
          <MotionCard index={0} className="group p-8 sm:p-10 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[360px] shadow-xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]">
            <div>
              <p className="text-2xl sm:text-3xl font-medium text-white/50 font-montserrat mb-6 group-hover:text-[#5EFC8D] transition-colors">
                01
              </p>
              <div className="w-14 h-14 mb-6 flex items-center justify-center">
                <img
                  src="/assets/icon1.png"
                  alt="Outperforming expectations"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 font-montserrat leading-snug">
                Outperforming expectations.
              </h3>
              <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-[1.7] font-montserrat">
                Our rigorous Project Excellence Assurance methodology (PEA) and sub-24h US fulfillment ensure order delivery within committed timelines, maintaining flawless marketplace SLA metrics.
              </p>
            </div>
          </MotionCard>

          {/* Card 02 */}
          <MotionCard index={1} className="group p-8 sm:p-10 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[360px] shadow-xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]">
            <div>
              <p className="text-2xl sm:text-3xl font-medium text-white/50 font-montserrat mb-6 group-hover:text-[#5EFC8D] transition-colors">
                02
              </p>
              <div className="w-14 h-14 mb-6 flex items-center justify-center">
                <img
                  src="/assets/Icon_2.svg"
                  alt="Breaking new grounds"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 font-montserrat leading-snug">
                Breaking new grounds.
              </h3>
              <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-[1.7] font-montserrat">
                Our relentless focus leveraging AI address normalization, multi-channel catalog orchestration, and barcode WMS builds the fastest, most reliable path to market.
              </p>
            </div>
          </MotionCard>

          {/* Card 03 */}
          <MotionCard index={2} className="group p-8 sm:p-10 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[360px] shadow-xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]">
            <div>
              <p className="text-2xl sm:text-3xl font-medium text-white/50 font-montserrat mb-6 group-hover:text-[#5EFC8D] transition-colors">
                03
              </p>
              <div className="w-14 h-14 mb-6 flex items-center justify-center">
                <img
                  src="/assets/Icon_3.svg"
                  alt="Giving back"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 font-montserrat leading-snug">
                Giving back.
              </h3>
              <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-[1.7] font-montserrat">
                Our focus is on building an exemplary engineering culture in Buon Ma Thuot that emphasizes diversity, software talent development, and transparent equal opportunity empowerment.
              </p>
            </div>
          </MotionCard>
        </div>
      </MotionSection>

      {/* SECTION 6 & 7: Clients & Services Marquee Section using CaseStudiesSection */}
      <div className="w-full mb-16 sm:mb-24">
        <CaseStudiesSection variant="company" />
      </div>

      {/* SECTION 8: Full-Width Image Divider (company.png) */}
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-2xl h-[320px] sm:h-[460px] lg:h-[580px]">
          <img
            src="/assets/company.png"
            alt="E-GEAD People and Technology Hub"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>
      </MotionSection>

      {/* SECTION 9: Two Columns Portal Cards (Our People & Careers) */}
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28 sm:mb-36">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Our People */}
          <MotionCard index={0} className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px] shadow-2xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]">
            <div>
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
                Our People
              </p>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
                <img
                  src="/assets/icon31.svg"
                  alt="Our people icon"
                  className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="/assets/icon32.svg"
                  alt="Our people hover icon"
                  className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] mb-6 font-montserrat leading-snug">
                Meet the people behind your success.
              </h3>
            </div>

            <div>
              <Link
                href="/people"
                className="group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-[#10E774] transition-all duration-300"
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
                <span>Our people</span>
              </Link>
            </div>
          </MotionCard>

          {/* Card 2: Job Opportunities */}
          <MotionCard index={1} className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px] shadow-2xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]">
            <div>
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
                Job Opportunities
              </p>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
                <img
                  src="/assets/Name_Job_Opportunities__Color_BnW.svg"
                  alt="Job opportunities icon"
                  className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="/assets/Name_Job_Opportunities__Color_Colorful.svg"
                  alt="Job opportunities colorful hover"
                  className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] mb-6 font-montserrat leading-snug">
                Be a Part of our wonderful team.
              </h3>
            </div>

            <div>
              <Link
                href="/careers"
                className="group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-[#10E774] transition-all duration-300"
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
                <span>Careers</span>
              </Link>
            </div>
          </MotionCard>
        </div>
      </MotionSection>

      {/* SECTION 10: Contact Block */}
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
