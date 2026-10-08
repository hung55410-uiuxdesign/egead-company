import Link from 'next/link';
import Image from 'next/image';
import { MotionDiv } from '@/components/MotionSection';

const SaiArrow = ({ className = 'w-[19px] h-[18px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

const HOW_STEPS = [
  {
    title: 'Fast-Track Discovery',
    content: 'Collaborate on industry-specific templates to gather requirements quickly.​',
  },
  {
    title: 'Accelerated User Adoption',
    content: 'Interactive knowledge-hub ensures user readiness within 30 days.​',
  },
  {
    title: 'Pre-visualized Architecture​',
    content: 'Includes Lead & Opportunity Management, Product Catalogue, Analytics, and more.​',
  },
  {
    title: 'Customizable Dashboards',
    content: 'Data-driven decision-making with easy access to reports and snapshots.​',
  },
  {
    title: 'Tailored Customization',
    content: 'Pre-configured solutions and industry-specific workflows for easy customization.​',
  },
];

export default function SpeedXHowSection() {
  return (
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
          {HOW_STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`info-${idx + 1} info-block group p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all`}
            >
              <div className="hsr-heading text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-[#10E774] transition-colors">
                <span>{step.title}</span>
              </div>
              <div className="hsr-content text-base sm:text-lg font-light text-[#b3b3b3] leading-relaxed">
                <span>{step.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
}
