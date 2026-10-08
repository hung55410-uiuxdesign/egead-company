import MotionSection from '@/components/MotionSection';

export default function IntegratedAdvantageQuote() {
  return (
    <>
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 my-16 sm:my-24">
        <div className="relative w-full rounded-[28px] sm:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl h-[280px] sm:h-[420px] lg:h-[500px]">
          <img
            src="/assets/banner111.png"
            alt="E-GEAD Advanced Operations Infrastructure"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E]/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </MotionSection>
      <MotionSection
        id="integrated"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28 scroll-mt-28"
      >
        <div className="p-8 sm:p-14 lg:p-16 rounded-[32px] bg-[#12131c] border border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#5EFC8D]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="flex flex-col gap-6 max-w-4xl relative z-10">
            <p className="text-base sm:text-lg lg:text-xl font-light text-[#b3b3b3] leading-[1.8] font-montserrat">
              Our strategy and engineering teams build with physical manufacturing feasibility in mind because they work directly alongside our fulfillment centers. Your storefront dispatches in sub-24 hours from day one because barcode WMS validates every station. Your ad campaigns scale profitably over time because performance marketing connects directly to factory-floor landed unit economics.
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent font-montserrat leading-snug">
              One ecosystem. Zero late dispatches. Your global success.
            </h3>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
