import Link from 'next/link';
import { Globe2, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import MotionSection from '@/components/MotionSection';

export default function PartnersCtaSection() {
  return (
    <MotionSection
      id="partners-cta"
      role="region"
      aria-label="Join the E-GEAD Ecosystem"
      className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 scroll-mt-28"
    >
      <div className="w-full">
        <div className="rounded-[36px] bg-gradient-to-br from-[#1A2224] via-[#141718] to-[#0A0D0E] border border-[#10E774]/40 p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden">
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-80 h-80 bg-[#6CE8C3]/15 rounded-full blur-3xl pointer-events-none" 
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm sm:text-base font-normal text-[#D4FAE6] mb-6 font-montserrat">
              <Globe2 className="w-4 h-4 text-[#6CE8C3]" aria-hidden="true" />
              Alliance Partnership Program
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-medium text-[#D4FAE6] font-montserrat leading-[1.15]">
              Expand Your Reach Within the <br />
              <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-[#E0FCF4] bg-clip-text text-transparent font-medium">E-GEAD Global Network.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
              Are you a software vendor, logistics provider, blank apparel manufacturer, or marketplace platform? Partner with E-GEAD to deliver unprecedented operational velocity to thousands of high-growth global e-commerce merchants.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5EFC8D] text-black font-medium text-sm sm:text-base font-montserrat hover:bg-[#4ee37e] transition duration-300 shadow-[0_0_20px_rgba(94,252,141,0.25)] hover:shadow-[0_0_30px_rgba(94,252,141,0.4)]"
              >
                <span>Apply for Technology Partnership</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                href="/services/all-services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#141718] border border-white/20 text-[#D4FAE6] font-medium text-sm sm:text-base font-montserrat hover:border-[#5EFC8D] hover:text-[#5EFC8D] transition duration-300"
              >
                <span>Access Developer Sandbox</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-montserrat text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                <span>Open API 3.1 &amp; Webhook Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                <span>Free Sandbox Testing Environment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                <span>Dedicated Developer Technical Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
