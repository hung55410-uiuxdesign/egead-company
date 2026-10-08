import { ArrowDown } from 'lucide-react';
import MotionSection, { MotionHero } from '@/components/MotionSection';

export default function CareerHeroSection() {
  return (
    <>
      {/* 1. Hero Section: Kinetic Typography */}
      <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16">
        <div className="w-full">
          <p className="text-sm sm:text-base font-semibold uppercase tracking-widest text-[#10E774] mb-4 font-montserrat">
            Careers
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-medium leading-[1.05] text-[#D4FAE6] font-montserrat tracking-tight mb-8">
            BRING FORWARD THE <br />
            <span className="bg-gradient-to-r from-[#5EFC8D] via-[#10E774] to-[#7ceee0] bg-clip-text text-transparent font-medium">
              TRUE YOU.
            </span>
          </h1>
        </div>
      </MotionHero>

      {/* 2. Sticky / Anchor Bar */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16">
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 pb-4 border-b border-white/10 text-sm font-medium font-montserrat">
          <a
            href="#at-sai"
            className="flex items-center gap-2 text-gray-400 hover:text-[#10E774] transition group"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#10E774] transition-transform group-hover:translate-y-0.5" />
            <span>Life At E-GEAD</span>
          </a>
          <a
            href="#job"
            className="flex items-center gap-2 text-gray-400 hover:text-[#10E774] transition group"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#10E774] transition-transform group-hover:translate-y-0.5" />
            <span>Jobs Opening</span>
          </a>
        </div>
      </div>

      {/* 3. Hero Visual Media Banner */}
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
        <div className="relative w-full h-[340px] sm:h-[480px] lg:h-[580px] rounded-[32px] sm:rounded-[48px] overflow-hidden shadow-2xl border border-white/10 bg-black group">
          <img
            src="/assets/company.png"
            alt="Life at E-GEAD - Vibrant Global Team"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E] via-transparent to-black/30" />
          <div className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-[#10E774]/20 text-[#10E774] text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-[#10E774]/30 inline-block mb-3 font-montserrat">
              Culture &amp; Collaboration
            </span>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-white font-montserrat leading-snug">
              Passionate minds building the infrastructure of global intelligent commerce.
            </p>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
