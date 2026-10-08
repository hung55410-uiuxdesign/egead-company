import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import MotionSection from '@/components/MotionSection';

export default function PartnersCarrierStoriesSection() {
  return (
    <MotionSection
      id="partner-stories"
      role="region"
      aria-label="Partner Co-Innovation and Success Stories"
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
    >
      <div className="w-full">
        <div className="rounded-[36px] bg-[#141718] border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          <div 
            aria-hidden="true" 
            className="absolute -top-32 -right-32 w-96 h-96 bg-[#10E774]/10 rounded-full blur-3xl pointer-events-none" 
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Quote Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
                Carrier Co-Innovation Spotlight
              </p>

              <blockquote className="text-lg sm:text-xl text-gray-200 font-normal leading-relaxed italic">
                &ldquo;E-GEAD&apos;s high-speed barcode manifest scanning ensures that thousands of packages enter our sortation facilities perfectly organized and 100% compliant with origin scan windows. They set the benchmark for modern cross-border fulfillment efficiency.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-white/10">
                <div className="font-bold text-white text-base">Marcus Sterling</div>
                <div className="text-xs text-[#10E774] font-montserrat mt-0.5">
                  Director of Carrier Alliances, North American Postal Network
                </div>
                <div className="text-xs text-gray-500 font-montserrat mt-2 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10E774]" aria-hidden="true" />
                  <span>Handling 500,000+ Verified Scans Per Quarter</span>
                </div>
              </div>
            </div>

            {/* Right Carrier Stat Box (4 cols) */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="p-6 rounded-2xl bg-[#0A0D0E] border border-white/10">
                <span className="text-[11px] font-montserrat text-gray-400 block">USPS Scan Compliance</span>
                <span className="text-3xl sm:text-4xl font-montserrat font-black text-[#10E774] mt-1 block">
                  99.8%
                </span>
                <p className="text-xs text-gray-400 mt-2">
                  Packages receive an origin carrier induction scan within 24 hours of printing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0A0D0E] border border-white/10">
                <span className="text-[11px] font-montserrat text-gray-400 block">Transit Time Average</span>
                <span className="text-3xl sm:text-4xl font-montserrat font-black text-white mt-1 block">
                  2.8 Days
                </span>
                <p className="text-xs text-gray-400 mt-2">
                  Average domestic delivery window across US Postal Zones 1 through 8.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
