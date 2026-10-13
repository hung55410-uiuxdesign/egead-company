import { HomeView } from '@/components/pages/home';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';

export const revalidate = 60;

export default async function HomePage() {
  const [marketplacesSection, servicesSection] = await Promise.all([
    getHomeSectionByKey('marketplaces-partners').catch(() => null),
    getHomeSectionByKey('services-capabilities').catch(() => null),
  ]);

  return (
    <HomeView
      marketplacesSection={marketplacesSection}
      servicesSection={servicesSection}
    />
  );
}
