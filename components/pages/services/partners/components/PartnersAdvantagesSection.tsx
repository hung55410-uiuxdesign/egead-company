import { Truck, Headphones, Zap } from 'lucide-react';
import MotionSection, { MotionCard } from '@/components/MotionSection';

export default function PartnersAdvantagesSection() {
  return (
    <MotionSection
      id="merchant-advantages"
      role="region"
      aria-label="Exclusive Merchant Advantages"
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
    >
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
              Strategic Benefits
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
              Exclusive Advantages from Our Alliances
            </h2>
          </div>
          <p className="text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-md">
            Selling through E-GEAD unlocks institutional advantages and cost structures individual merchants cannot negotiate on their own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <MotionCard
            index={0}
            className="p-8 rounded-3xl bg-[#141718] border border-white/10 hover:border-[#10E774]/50 hover:shadow-[0_12px_32px_rgba(16,231,116,0.12)] transition-all duration-300 shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#10E774]/10 border border-[#10E774]/25 flex items-center justify-center text-[#10E774] mb-6 group-hover:scale-105 transition-transform motion-reduce:transform-none">
                <Truck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#10E774] transition-colors">
                Commercial Postage Discounts
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-normal">
                Save between <span className="text-[#10E774] font-bold font-montserrat">$1.50 and $3.00</span> on every US parcel. Benefit from E-GEAD&apos;s aggregated multi-million package volume contracts with USPS Ground Advantage and UPS Express.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-xs font-montserrat text-gray-500">
              Direct Origin Manifest Rates
            </div>
          </MotionCard>

          {/* Benefit 2 */}
          <MotionCard
            index={1}
            className="p-8 rounded-3xl bg-[#141718] border border-white/10 hover:border-[#10E774]/50 hover:shadow-[0_12px_32px_rgba(16,231,116,0.12)] transition-all duration-300 shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#10E774]/10 border border-[#10E774]/25 flex items-center justify-center text-[#10E774] mb-6 group-hover:scale-105 transition-transform motion-reduce:transform-none">
                <Headphones className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#10E774] transition-colors">
                Priority Policy Escalation
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-normal">
                Enjoy direct engineering and account health escalation desks with TikTok Shop US and Amazon Seller Central. Rapidly resolve algorithmic false positives and preserve seller privileges.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-xs font-montserrat text-gray-500">
              Dedicated Partner Support Desks
            </div>
          </MotionCard>

          {/* Benefit 3 */}
          <MotionCard
            index={2}
            className="p-8 rounded-3xl bg-[#141718] border border-white/10 hover:border-[#10E774]/50 hover:shadow-[0_12px_32px_rgba(16,231,116,0.12)] transition-all duration-300 shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#10E774]/10 border border-[#10E774]/25 flex items-center justify-center text-[#10E774] mb-6 group-hover:scale-105 transition-transform motion-reduce:transform-none">
                <Zap className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#10E774] transition-colors">
                Early Access Alpha APIs
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-normal">
                Access cutting-edge platform capabilities before public release: TikTok Live automated order ingestion, Amazon Custom direct print APIs, and Meta Instant Checkout social triggers.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-xs font-montserrat text-gray-500">
              Quarterly Alpha Testing Cohorts
            </div>
          </MotionCard>
        </div>
      </div>
    </MotionSection>
  );
}
