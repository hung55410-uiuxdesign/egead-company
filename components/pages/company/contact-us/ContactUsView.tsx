import React from 'react';
import {
  ContactHeroSection,
  ContactFormSection,
  ContactOfficesSection,
} from './index';

export default function ContactUsView() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 pb-28 overflow-hidden">
      <ContactHeroSection />
      <ContactFormSection />
      <ContactOfficesSection />
    </div>
  );
}
