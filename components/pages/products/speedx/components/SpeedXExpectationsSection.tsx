import Link from 'next/link';
import Image from 'next/image';
import { MotionDiv, MotionCard } from '@/components/MotionSection';

const SaiArrow = ({ className = 'w-[19px] h-[18px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

const EXPECTATIONS = [
  {
    icon: '/assets/speedx/project-delivery.svg',
    alt: 'Fixed Priced, Fixed Timeline',
    title: 'Fixed Priced,  Fixed Timeline',
  },
  {
    icon: '/assets/speedx/full-adoption.svg',
    alt: 'Full User Adoption within 30 Days',
    title: 'Full User Adoption within 30 Days',
  },
  {
    icon: '/assets/speedx/roi-realization.svg',
    alt: 'ROI Realization within the First Quarter',
    title: 'ROI Realization within the First Quarter​',
  },
];

export default function SpeedXExpectationsSection() {
  return (
    <MotionDiv className="what-speedx relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 text-center py-20 lg:py-28 border-t border-[#262C30]">
      <div className="why-speedx-subtitle-wrapper mb-16 sm:mb-20">
        <div className="why-speedx-subtitle">
          <span>WHAT TO EXPECT WITH SPEEDX</span>
        </div>
      </div>

      {/* 3 Value Cards */}
      <div className="bottom-info flex flex-col md:flex-row items-center justify-between gap-10 sm:gap-12 mb-16 sm:mb-20">
        {EXPECTATIONS.map((item, idx) => (
          <MotionCard
            key={idx}
            index={idx}
            className={`wsb-block${idx + 1} wsb-block w-full md:w-1/3 hover:scale-[1.04] transition-transform duration-300`}
          >
            <div className="wsb-block-img mb-6">
              <Image
                src={item.icon}
                alt={item.alt}
                width={148}
                height={148}
                unoptimized
                priority
                className="w-auto h-28 object-contain mx-auto"
              />
            </div>
            <div className="wsb-block-text">
              <div className="wsb-block-text-inner">
                <span className={`wsb-block-text1${idx === 0 ? '1' : idx === 1 ? '2' : '3'} text-xl sm:text-2xl font-medium text-white`}>
                  {item.title}
                </span>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      {/* CTA Button */}
      <div>
        <Link
          href="/contact-us"
          className="ant-btn ant-btn--link ant-btn-primary shadow-[0_0_20px_rgba(94,252,141,0.25)] hover:shadow-[0_0_30px_rgba(94,252,141,0.4)] transition-all"
        >
          <SaiArrow className="w-[18px] h-[17px] text-black" />
          <span>Book a Demo Now!</span>
        </Link>
      </div>
    </MotionDiv>
  );
}
