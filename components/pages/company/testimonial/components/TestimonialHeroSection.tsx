import { MotionHero } from '@/components/MotionSection';

export default function TestimonialHeroSection() {
  return (
    <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
      <div className="w-full">
        <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-4 font-montserrat">
          Client Success &amp; Reviews
        </p>
        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium leading-[1.08] text-[#D4FAE6] font-montserrat mb-6">
          What Our <br />
          <span className="bg-gradient-to-r from-[#5EFC8D] via-[#10E774] to-[#7ceee0] bg-clip-text text-transparent font-medium">
            Partners Say.
          </span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-3xl">
          From high-growth DTC apparel brands to high-volume marketplace sellers, discover how E-GEAD automates fulfillment, protects SLAs, and drives global e-commerce scale.
        </p>
      </div>
    </MotionHero>
  );
}
