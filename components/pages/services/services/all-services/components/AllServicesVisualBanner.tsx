'use client';

import MotionSection from '@/components/MotionSection';

export default function AllServicesVisualBanner() {
  return (
    <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-24">
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-white/10 shadow-2xl h-[320px] sm:h-[460px] lg:h-[580px] xl:h-[640px]">
        <img
          src="/assets/banner18.png"
          alt="Services Visual Ecosystem Banner"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </MotionSection>
  );
}
