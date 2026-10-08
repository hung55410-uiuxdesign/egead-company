import React from 'react';
import ContactBlock from '@/components/ContactBlock';
import { MotionDiv } from '@/components/MotionSection';
import {
  TestimonialHeroSection,
  TestimonialGridSection,
} from './index';

export default function TestimonialView() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 overflow-hidden">
      <TestimonialHeroSection />
      <TestimonialGridSection />
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
