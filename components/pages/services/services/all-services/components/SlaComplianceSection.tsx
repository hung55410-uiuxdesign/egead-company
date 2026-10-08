import { ShieldCheck } from 'lucide-react';
import MotionSection, { MotionCard } from '@/components/MotionSection';
import { complianceBadges } from '../data/compliance-badges.data';

export default function SlaComplianceSection() {
  return (
    <MotionSection
      id="sla-compliance"
      className="relative w-full py-20 sm:py-24 bg-[#0A0D0E] border-t border-[#262C30] text-white overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
            Account Safety &amp; SLAs
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat leading-[1.3]">
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              Enterprise SLA Protection &amp; Compliance Badges
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] leading-[1.75] font-light font-montserrat max-w-2xl mx-auto">
            Automated operations maintaining strict compliance with marketplace algorithms.
          </p>
        </div>

        {/* 4 Compliance Cards matching /company card aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceBadges.map((badge, idx) => (
            <MotionCard
              key={idx}
              index={idx}
              className="group p-8 rounded-[32px] bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#1D2224] border border-[#262C30] flex items-center justify-center text-[#5EFC8D] mb-6 group-hover:scale-105 group-hover:border-[#10E774]/40 group-hover:shadow-[0_0_20px_rgba(16,231,116,0.2)] transition-all">
                  {badge.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#D4FAE6] font-montserrat mb-3 group-hover:text-[#5EFC8D] transition-colors leading-snug">
                  {badge.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#b3b3b3] font-light font-montserrat leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </MotionCard>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
