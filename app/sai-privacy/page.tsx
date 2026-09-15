import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | E-GEAD Company',
  description: 'Terms and Conditions governing the use of E-GEAD websites, APIs, and fulfillment services.',
};

export default function SaiPrivacyPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 pb-28">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-medium text-[#d3f9f5] font-montserrat mb-6">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs font-mono text-[#7ceee0] mb-8">Effective Date: January 2026</p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-4xl">
          <p>
            By accessing or browsing this website, or connecting your storefronts to E-GEAD fulfillment services, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-[#d3f9f5] mt-8 mb-4 font-montserrat">
            1. Proprietary Rights
          </h2>
          <p>
            All software architectures, platform algorithms (including Eweb Suite, Eweb-platform, Eweb-character), trademarks, logos, diagrams, and content contained on this site are the intellectual property of E-GEAD Company and are protected under international copyright treaties.
          </p>
          <h2 className="text-xl sm:text-2xl font-medium text-[#d3f9f5] mt-8 mb-4 font-montserrat">
            2. Permitted Use &amp; Service Levels
          </h2>
          <p>
            Storefront integrations and API usage are subject to standard acceptable use guidelines. E-GEAD commits to industry-leading sub-24h fulfillment execution for on-demand production, subject to timely carrier transit and normal operating conditions. Any unauthorized reproduction or reverse-engineering is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
