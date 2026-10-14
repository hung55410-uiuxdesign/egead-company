'use client';

import React from 'react';
import SapHeroSection from './components/SapHeroSection';
import SapAdvantagesSection from './components/SapAdvantagesSection';
import SapExpertiseSection from './components/SapExpertiseSection';
import SapWhySection from './components/SapWhySection';
import SapCasesSection from './components/SapCasesSection';
import SapCtaSection from './components/SapCtaSection';

export default function SapPartnerView() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white selection:bg-[#10E774]/30 selection:text-white">
      <SapHeroSection />
      <SapAdvantagesSection />
      <SapExpertiseSection />
      <SapWhySection />
      <SapCasesSection />
      <SapCtaSection />
    </div>
  );
}
