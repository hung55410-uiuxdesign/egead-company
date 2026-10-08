import Link from 'next/link';
import MotionSection, { MotionCard } from '@/components/MotionSection';

export default function FlagshipPlatformsSection() {
  return (
    <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
      <div className="w-full mb-10 sm:mb-14">
        <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
          Flagship Platforms
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat leading-[1.3]">
          <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
            Dedicated engines built for automated scale.
          </span>
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Card 1: SpeedX US POD Engine */}
        <MotionCard
          index={0}
          className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px]"
        >
          <div>
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
              SpeedX POD Fulfillment
            </p>
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
              <img
                src="/assets/icon31.svg"
                alt="SpeedX POD fulfillment icon"
                className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="/assets/icon32.svg"
                alt="SpeedX POD fulfillment color icon"
                className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat mb-4 leading-snug">
              <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                Sub-24H US printing &amp; direct domestic dispatch.
              </span>
            </h3>
            <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-relaxed font-montserrat">
              23-inch roll-fed DTF, automated barcode WMS, and 100% TikTok Shop US compliance.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/speedx"
              className="group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-[#10E774] transition-all duration-300 font-montserrat"
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
              <span>SpeedX Fulfillment</span>
            </Link>
          </div>
        </MotionCard>

        {/* Card 2: SmartCommerce Platform */}
        <MotionCard
          index={1}
          className="group p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between min-h-[380px]"
        >
          <div>
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
              SmartCommerce Platform
            </p>
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
              <img
                src="/assets/Name_Job_Opportunities__Color_BnW.svg"
                alt="SmartCommerce platform icon"
                className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="/assets/Name_Job_Opportunities__Color_Colorful.svg"
                alt="SmartCommerce platform color icon"
                className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat mb-4 leading-snug">
              <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                Unified multi-channel catalog &amp; order sync.
              </span>
            </h3>
            <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-relaxed font-montserrat">
              Bidirectional synchronization across Amazon, Etsy, TikTok Shop, and Shopify with zero stockouts.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/smartcommerce"
              className="group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-[#10E774] transition-all duration-300 font-montserrat"
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
              <span>SmartCommerce</span>
            </Link>
          </div>
        </MotionCard>
      </div>
    </MotionSection>
  );
}
