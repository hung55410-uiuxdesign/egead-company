import React from 'react';
import {
  ContactHeroSection,
  ContactFormSection,
  ContactOfficesSection,
} from './index';
import ContactBlock from '@/components/ContactBlock';
import type { CareersOfficeItem } from '@/lib/services/careers-page-config.service';

interface ContactUsViewProps {
  offices?: CareersOfficeItem[];
}

export default function ContactUsView({ offices }: ContactUsViewProps) {
  const primaryEmail =
    offices?.find((o) => o.email && o.email.trim() !== '')?.email ||
    'contact@egeadcompany.com';

  return (
    <div className="w-full bg-[#0A0D0E] text-white overflow-hidden">
      <ContactHeroSection />
      <ContactFormSection primaryEmail={primaryEmail} />
      <ContactOfficesSection offices={offices} />
      <ContactBlock />
    </div>
  );
}
