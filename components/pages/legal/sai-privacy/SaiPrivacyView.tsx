'use client';

import { MotionHero, MotionDiv } from '@/components/MotionSection';

export default function SaiPrivacyView() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 pb-28">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <MotionHero className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-medium text-[#D4FAE6] font-montserrat mb-6">
            <span className="bg-gradient-to-r from-[#5EFC8D] via-[#10E774] to-[#7ceee0] bg-clip-text text-transparent">
              Terms &amp; Conditions
            </span>
          </h1>
          <p className="text-xs font-montserrat text-[#5EFC8D] mb-8 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10E774] animate-pulse" />
            Effective Date: January 2026
          </p>
        </MotionHero>

        <MotionDiv className="space-y-6 text-sm sm:text-base text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-4xl">
          <p>
            By accessing or browsing this website, or connecting your storefronts to E-GEAD fulfillment services, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] mt-8 mb-4 font-montserrat">
            1. Proprietary Rights
          </h2>
          <p>
            All software architectures, platform algorithms (including Eweb Suite, Eweb-platform, Eweb-character), trademarks, logos, diagrams, and content contained on this site are the intellectual property of E-GEAD Company and are protected under international copyright treaties.
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] mt-8 mb-4 font-montserrat">
            2. Permitted Use &amp; Service Levels
          </h2>
          <p>
            Storefront integrations and API usage are subject to standard acceptable use guidelines. E-GEAD commits to industry-leading sub-24h fulfillment execution for on-demand production, subject to timely carrier transit and normal operating conditions. Any unauthorized reproduction or reverse-engineering is strictly prohibited.
          </p>
        </MotionDiv>
      </div>
    </div>
  );
}
