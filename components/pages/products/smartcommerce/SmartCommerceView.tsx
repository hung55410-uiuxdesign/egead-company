'use client';

import './smartcommerce.css';
import SmartCommerceHeroSection from './components/SmartCommerceHeroSection';
import SmartCommercePartnersSection from './components/SmartCommercePartnersSection';
import SmartCommerceObjectivesSection from './components/SmartCommerceObjectivesSection';
import SmartCommerceModulesSection from './components/SmartCommerceModulesSection';
import SmartCommerceIndustriesSection from './components/SmartCommerceIndustriesSection';
import SmartCommerceCtaSection from './components/SmartCommerceCtaSection';

export default function SmartCommerceView() {
  return (
    <main className="smartcommerce-page">
      <SmartCommerceHeroSection />
      <SmartCommercePartnersSection />
      <SmartCommerceObjectivesSection />
      <SmartCommerceModulesSection />
      <SmartCommerceIndustriesSection />
      <SmartCommerceCtaSection />
    </main>
  );
}
