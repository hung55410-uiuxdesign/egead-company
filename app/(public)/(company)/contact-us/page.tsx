import React from 'react';
import ContactUsView from '@/components/pages/company/contact-us/ContactUsView';
import { getCareersPageConfig } from '@/lib/services/careers-page-config.service';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact Us | E-GEAD',
  description: 'Connect with E-GEAD regional headquarters across Asia-Pacific.',
};

export default async function ContactUsPage() {
  const careersConfig = await getCareersPageConfig();

  return <ContactUsView offices={careersConfig.offices} />;
}
