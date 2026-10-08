import Link from 'next/link';
import Image from 'next/image';
import SpeedXVideoPlayer from './SpeedXVideoPlayer';
import { MotionDiv, MotionHero } from '@/components/MotionSection';

const SaiArrow = ({ className = 'w-[19px] h-[18px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

export default function SpeedXHeroSection() {
  return (
    <div className="product-overview speedx relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
      <MotionHero className="product-overview__header flex flex-col lg:flex-row items-center justify-between gap-10 pt-4 pb-8 lg:py-12">
        {/* Left Column */}
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

        {/* Right Column */}
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
  );
}
