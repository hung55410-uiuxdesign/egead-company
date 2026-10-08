import type { Metadata } from 'next';
import { ContactUsView } from '@/components/pages/company/contact-us';

export const metadata: Metadata = {
  title: 'Contact Us | E-GEAD: Automate Operations, Scale Globally',
  description:
    "Get in touch with E-GEAD operations and technology directors. Headquarters in Buon Ma Thuot, Vietnam with US POD facilities and 24/7 client support.",
};

export default function ContactUsPage() {
  return <ContactUsView />;
}
