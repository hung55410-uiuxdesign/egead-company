import React from 'react';
import ContactBlock from '@/components/ContactBlock';
import { MotionDiv } from '@/components/MotionSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import type { CompanySectionModel } from '@/lib/services/company-section.service';
import {
  CompanyHeroSection,
  CompanyIntroSection,
  Company4DMethodSection,
  CompanyValueSystemSection,
  CompanyPortalsSection,
} from './index';

interface CompanyViewProps {
  sections?: CompanySectionModel[];
}

export default function CompanyView({ sections = [] }: CompanyViewProps) {
  const sectionMap = React.useMemo(() => {
    const map = new Map<string, CompanySectionModel>();
    sections.forEach((s) => map.set(s.key, s));
    return map;
  }, [sections]);

  const heroSection = sectionMap.get('company-hero');
  const introSection = sectionMap.get('company-intro');
  const methodSection = sectionMap.get('company-4d-method');
  const valueSection = sectionMap.get('company-value-system');
  const caseStudiesSection = sectionMap.get('company-case-studies');
  const portalsSection = sectionMap.get('company-portals');
  const contactSection = sectionMap.get('company-contact');

  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36 overflow-hidden">
      {heroSection?.isActive !== false && (
        <CompanyHeroSection section={heroSection} />
      )}

      {introSection?.isActive !== false && (
        <CompanyIntroSection section={introSection} />
      )}

      {methodSection?.isActive !== false && (
        <Company4DMethodSection section={methodSection} />
      )}

      {valueSection?.isActive !== false && (
        <CompanyValueSystemSection section={valueSection} />
      )}

      {caseStudiesSection?.isActive !== false && (
        <div className="w-full mb-16 sm:mb-24">
          <CaseStudiesSection variant="company" companySection={caseStudiesSection} />
        </div>
      )}

      {portalsSection?.isActive !== false && (
        <CompanyPortalsSection section={portalsSection} />
      )}

      {contactSection?.isActive !== false && (
        <MotionDiv threshold={0.15}>
          <ContactBlock section={contactSection} />
        </MotionDiv>
      )}
    </div>
  );
}

