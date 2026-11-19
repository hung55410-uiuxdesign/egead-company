import React from 'react';
import {
  FaqAccordion,
  WorkflowTimeline,
} from '@/components/sections';
import ContactBlock from '@/components/ContactBlock';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import { MotionDiv } from '@/components/MotionSection';
import type { ServiceItemListItem } from '@/lib/services/service-item.service';
import type { HomeSectionModel } from '@/lib/services/home-section.service';
import {
  AllServicesHero,
  AllServicesVisualBanner,
  ServicePillarsSection,
  IntegratedAdvantageQuote,
  ProvenResultsSection,
  SlaComplianceSection,
  FlagshipPlatformsSection,
  allServicesWorkflowSteps,
  allServicesFaqs,
} from './index';

interface AllServicesViewProps {
  serviceItems?: ServiceItemListItem[];
  /** Same "marketplaces-partners" section that feeds the home page marquee. */
  marketplacesSection?: HomeSectionModel | null;
}

export default function AllServicesView({
  serviceItems,
  marketplacesSection,
}: AllServicesViewProps) {
  const rows = marketplacesSection?.data?.rows;
  const row1 = marketplacesSection?.data?.row1Partners;
  const row2 = marketplacesSection?.data?.row2Partners;

  return (
    <div className="flex flex-col w-full bg-[#0A0D0E] min-h-screen text-[#B3B3B3]">
      <AllServicesHero />
      <AllServicesVisualBanner />
      <ServicePillarsSection serviceItems={serviceItems} />
      <IntegratedAdvantageQuote />
      <ProvenResultsSection />
      <CaseStudiesSection
        id="clients-partnerships"
        title={marketplacesSection?.title || undefined}
        description={marketplacesSection?.description || undefined}
        rows={rows && rows.length > 0 ? rows : undefined}
        row1Partners={row1 && row1.length > 0 ? row1 : undefined}
        row2Partners={row2 && row2.length > 0 ? row2 : undefined}
      />
      <WorkflowTimeline
        id="workflow-pipeline"
        badge="The Order Journey"
        title={
          <>
            From Customer Click to{' '}
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent font-semibold">
              US Porch Delivery
            </span>
          </>
        }
        subtitle="Zero-touch fulfillment pipeline turning multi-channel orders into delivered packages in days."
        steps={allServicesWorkflowSteps}
      />
      <SlaComplianceSection />
      <FlagshipPlatformsSection />
      <MotionDiv className="scroll-mt-28">
        <FaqAccordion
          id="services-faq"
          badge="Frequently Answered Inquiries"
          title={
            <>
              Got Questions?{' '}
              <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent font-medium">
                We Have Answers.
              </span>
            </>
          }
          subtitle="Review key details regarding our SLAs, custom integrations, pricing model, and account protections."
          items={allServicesFaqs}
          categories={['Operations & SLA', 'Integrations & API', 'Pricing & Economics', 'Growth & Ads']}
        />
      </MotionDiv>
      <MotionDiv>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
