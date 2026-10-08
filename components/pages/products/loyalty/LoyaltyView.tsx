'use client';

import './loyalty.css';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import LoyaltyHeroSection from './components/LoyaltyHeroSection';
import LoyaltyOverviewSection from './components/LoyaltyOverviewSection';
import LoyaltyStrategySection from './components/LoyaltyStrategySection';
import LoyaltyAdvanceSection from './components/LoyaltyAdvanceSection';
import LoyaltyHowItWorksSection from './components/LoyaltyHowItWorksSection';
import LoyaltySapStoreSection from './components/LoyaltySapStoreSection';
import LoyaltyCtaSection from './components/LoyaltyCtaSection';

export default function LoyaltyView() {
  return (
    <div id="main-home" className="catalyzer/loyalty catalyzer-loyalty">
      <div className="service-detail partner">
        <LoyaltyHeroSection />
        <LoyaltyOverviewSection />
        <LoyaltyStrategySection />
        <LoyaltyAdvanceSection />
        <LoyaltyHowItWorksSection />
        <CaseStudiesSection
          variant="smartprice"
          subtitle="API-first Cloud Native SaaS solution"
          title="Seamlessly integrates with any eCommerce technology provider."
        />
        <LoyaltySapStoreSection />
        <LoyaltyCtaSection />
      </div>
    </div>
  );
}
