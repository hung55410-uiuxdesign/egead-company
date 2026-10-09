import React from 'react';
import {
  ContactHeroSection,
  ContactFormSection,
  ContactOfficesSection,
} from './index';
import ContactBlock from '@/components/ContactBlock';

export default function ContactUsView() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white overflow-hidden">
      <ContactHeroSection />
      <ContactFormSection />
      <ContactOfficesSection />
      <ContactBlock />
    </div>
  );
}
