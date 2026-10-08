import MotionSection from '@/components/MotionSection';

export default function Company4DMethodSection() {
  return (
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
  );
}
