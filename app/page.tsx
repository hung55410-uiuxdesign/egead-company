import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import ServicesSection from '@/components/ServicesSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import SmartCXSection from '@/components/SmartCXSection';
import PartnerSlider from '@/components/PartnerSlider';
import TestimonialsSection from '@/components/TestimonialsSection';
import InsightsSection from '@/components/InsightsSection';
import CultureSection from '@/components/CultureSection';
import ContactBlock from '@/components/ContactBlock';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroBanner />
      <ServicesSection />
      <CaseStudiesSection />
      <SmartCXSection />
      <TestimonialsSection />
      <InsightsSection />
      <CultureSection />
      <ContactBlock />
    </div>
  );
}
