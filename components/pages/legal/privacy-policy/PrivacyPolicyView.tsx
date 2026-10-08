'use client';

import { MotionHero, MotionDiv } from '@/components/MotionSection';

export default function PrivacyPolicyView() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 pb-28">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <MotionHero className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-medium text-[#D4FAE6] font-montserrat mb-6">
            <span className="bg-gradient-to-r from-[#5EFC8D] via-[#10E774] to-[#7ceee0] bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-xs font-montserrat text-[#5EFC8D] mb-8 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10E774] animate-pulse" />
            Last Updated: January 2026
          </p>
        </MotionHero>

        <MotionDiv className="space-y-6 text-sm sm:text-base text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-4xl">
          <p>
            E-GEAD Company is committed to safeguarding the privacy and security of your personal and commercial data. This Privacy Policy details how we collect, use, process, and protect information gathered through our website, APIs, WMS software, and digital services.
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] mt-8 mb-4 font-montserrat">
            1. Information We Collect
          </h2>
          <p>
            We collect information that you voluntarily provide when contacting us, requesting consultations, integrating storefronts, or submitting order fulfillment payloads. This includes customer shipping details (recipient name, address, phone number), merchant business contact details, and transaction metadata necessary to execute orders.
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] mt-8 mb-4 font-montserrat">
            2. Use of E-Commerce Data
          </h2>
          <p>
            Customer shipping information received via marketplace APIs (Amazon, TikTok Shop, Etsy, Shopify) is processed solely for manufacturing, packaging, and carrier dispatch purposes. We strictly adhere to marketplace data governance policies and never sell, rent, or monetize end-consumer data.
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] mt-8 mb-4 font-montserrat">
            3. Security &amp; Compliance
          </h2>
          <p>
            E-GEAD implements enterprise-grade technical and organizational safeguards including 256-bit TLS data transmission encryption, restricted database access, and strict compliance with GDPR and CCPA regulations to prevent unauthorized access or disclosure.
          </p>
        </MotionDiv>
      </div>
    </div>
  );
}
