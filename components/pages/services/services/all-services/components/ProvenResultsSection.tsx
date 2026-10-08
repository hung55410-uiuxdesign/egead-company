import MotionSection, { MotionCard } from '@/components/MotionSection';
import { provenResults } from '../data/proven-results.data';

export default function ProvenResultsSection() {
  return (
    <MotionSection
      id="proven-results"
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 py-16 sm:py-24 bg-[#0A0D0E] border-t border-b border-white/5 scroll-mt-28"
    >
      <div className="max-w-3xl mb-12 sm:mb-16">
        <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
          Enterprise Performance
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold font-montserrat leading-[1.3] mb-3">
          <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
            Backed by Proven Operating Benchmarks
          </span>
        </h2>
        <p className="text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
          Proven operating benchmarks achieved across 100+ global storefronts
        </p>
      </div>

      {/* 6 Grid Cards with SAI Digital 148px Glossy 3D Icons & Gradient Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {provenResults.map((metric, idx) => (
          <MotionCard
            key={idx}
            index={idx}
            className="group bg-gradient-to-b from-[#5EFC8D]/35 via-[#10E774]/10 to-[#5EFC8D]/20 p-[1px] rounded-[20px] transition-all duration-300 hover:from-[#5EFC8D]/65 hover:to-[#5EFC8D]/40 hover:shadow-[0_0_30px_rgba(94,252,141,0.15)]"
          >
            <div className="bg-[#040404] p-8 rounded-[20px] h-full flex flex-col items-center text-center justify-between min-h-[340px]">
              {/* 148x148 Glossy 3D Icon */}
              <div className="w-[148px] h-[148px] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={metric.icon}
                  alt={metric.description}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full">
                <p className="text-2xl lg:text-[28px] font-semibold text-[#D4FAE6] font-montserrat mb-1 group-hover:text-[#5EFC8D] transition-colors">
                  {metric.title}
                </p>
                <p className="text-sm font-medium text-[#D4FAE6] font-montserrat mb-2">
                  {metric.description}
                </p>
                <p className="text-xs text-[#8C8C8C] font-light font-montserrat leading-relaxed">
                  {metric.detail}
                </p>
              </div>

              <span className="mt-4 px-3 py-1 rounded-full text-[11px] font-medium bg-[#5EFC8D]/10 text-[#5EFC8D] border border-[#5EFC8D]/20 font-montserrat">
                {metric.badge}
              </span>
            </div>
          </MotionCard>
        ))}
      </div>
    </MotionSection>
  );
}
