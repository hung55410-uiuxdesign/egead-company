import React from 'react';
import ContactBlock from '@/components/ContactBlock';
import { MotionDiv } from '@/components/MotionSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import {
  CompanyHeroSection,
  CompanyIntroSection,
  Company4DMethodSection,
  CompanyValueSystemSection,
  CompanyPortalsSection,
} from './index';

export default function CompanyView() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36 overflow-hidden">
      <CompanyHeroSection />
      <CompanyIntroSection />
      <Company4DMethodSection />
      <CompanyValueSystemSection />
      <div className="w-full mb-16 sm:mb-24">
        <CaseStudiesSection variant="company" />
      </div>
      <CompanyPortalsSection />
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
