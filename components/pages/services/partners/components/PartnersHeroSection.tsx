import { ArrowRight } from 'lucide-react';
import { MotionHero } from '@/components/MotionSection';
import { EcosystemHeroGraphic } from './EcosystemHeroGraphic';

export default function PartnersHeroSection() {
  return (
    <section
      id="partners-hero"
      role="region"
      aria-label="Partners Ecosystem Hero"
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28 scroll-mt-28"
    >
      <MotionHero className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Headline & Positioning */}
          <div className="lg:col-span-7">
            <p className="text-sm sm:text-base font-normal text-[#D4FAE6] mb-6 font-montserrat flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10E774] animate-pulse" />
              Global Commerce Alliances
            </p>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-medium leading-[1.08] text-[#D4FAE6] font-montserrat mb-6">
              Integrated with the World&apos;s <br />
              <span className="bg-gradient-to-r from-[#5EFC8D] via-[#10E774] to-[#7ceee0] bg-clip-text text-transparent font-medium">Leading Commerce Ecosystems.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mb-8">
              E-GEAD bridges your business directly with the world&apos;s most powerful marketplaces, storefront technologies, advertising platforms, and national logistics networks. Seamless, secure, and fully automated operations from day one.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#ecosystem-matrix"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#5EFC8D] text-black font-medium text-sm sm:text-base font-montserrat hover:bg-[#4ee37e] transition duration-300 shadow-[0_0_20px_rgba(94,252,141,0.25)] hover:shadow-[0_0_30px_rgba(94,252,141,0.4)]"
              >
                <span>Explore Partner Matrix</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#partners-cta"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#141718] border border-white/20 text-[#D4FAE6] font-medium text-sm sm:text-base font-montserrat hover:border-[#5EFC8D] hover:text-[#5EFC8D] transition duration-300"
              >
                <span>Become an Ecosystem Partner</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Topology Card */}
          <div className="lg:col-span-5">
            <EcosystemHeroGraphic />
          </div>
        </div>
      </MotionHero>
    </section>
  );
}
