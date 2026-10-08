import React from 'react';
import {
  BentoGrid,
  MetricsRibbon,
  FaqAccordion,
} from '@/components/sections';
import ContactBlock from '@/components/ContactBlock';
import MotionSection, { MotionDiv } from '@/components/MotionSection';
import {
  PartnersHeroSection,
  PartnersAdvantagesSection,
  PartnersCarrierStoriesSection,
  PartnersCtaSection,
  THROUGHPUT_METRICS,
  CERTIFIED_BENTO_ITEMS,
  PARTNERS_FAQ_ITEMS,
} from './index';
import { EcosystemMatrix } from './components/EcosystemMatrix';
import { IntegrationBridgeVisualizer } from './components/IntegrationBridgeVisualizer';

export default function PartnersView() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36">
      <PartnersHeroSection />
      <MotionSection
        id="api-throughput"
        role="region"
        aria-label="Real-Time API Integration Throughput"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="w-full">
          <MetricsRibbon
            id="throughput-ribbon"
            badge="High-Availability Telemetry"
            title="Real-Time API Integration Throughput"
            subtitle="Our resilient microservices mesh processes millions of mission-critical orders, inventory syncs, and tracking updates with sub-second precision."
            metrics={THROUGHPUT_METRICS}
          />
        </div>
      </MotionSection>
      <MotionSection
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28"
        aria-label="5-Tier Ecosystem Matrix Section"
      >
        <div className="w-full">
          <EcosystemMatrix />
        </div>
      </MotionSection>
      <MotionSection
        id="certified-showcase"
        role="region"
        aria-label="Deep Integration & Certified Status Showcase"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="w-full">
          <BentoGrid
            badge="Official Technical Certifications"
            title="Deep Programmatic Integrations & Certified Status"
            description="We build directly against official platform developer APIs and commercial carrier specifications, giving your business guaranteed SLA safety and technical resilience."
            items={CERTIFIED_BENTO_ITEMS}
          />
        </div>
      </MotionSection>
      <MotionSection
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28"
        aria-label="Technical Integration Bridge Architecture Section"
      >
        <div className="w-full">
          <IntegrationBridgeVisualizer />
        </div>
      </MotionSection>
      <PartnersAdvantagesSection />
      <PartnersCarrierStoriesSection />
      <MotionSection
        id="partners-faq"
        role="region"
        aria-label="Partnership and Integration FAQ"
        className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-28 scroll-mt-28"
      >
        <div className="max-w-4xl mx-auto">
          <FaqAccordion
            items={PARTNERS_FAQ_ITEMS}
            title="Ecosystem &amp; Integration FAQs"
            subtitle="Common questions regarding API security, onboarding speeds, multi-tenant store setups, and technical specifications."
          />
        </div>
      </MotionSection>
      <PartnersCtaSection />
      <MotionDiv id="contact" className="scroll-mt-28">
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
