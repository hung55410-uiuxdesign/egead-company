import { HomeView } from '@/components/pages/home';
import { getHomeSectionByKey } from '@/lib/services/home-section.service';
import { getAllPosts } from '@/lib/blogs';

export const revalidate = 60;

export default async function HomePage() {
  const [
    marketplacesSection,
    servicesSection,
    smartCXSection,
    testimonialsSection,
    latestPosts,
  ] = await Promise.all([
    getHomeSectionByKey('marketplaces-partners').catch(() => null),
    getHomeSectionByKey('services-capabilities').catch(() => null),
    getHomeSectionByKey('why-brands-ship').catch(() => null),
    getHomeSectionByKey('testimonials').catch(() => null),
    getAllPosts({ status: 'published', limit: 10 }).catch(() => []),
  ]);

  return (
    <HomeView
      marketplacesSection={marketplacesSection}
      servicesSection={servicesSection}
      smartCXSection={smartCXSection}
      testimonialsSection={testimonialsSection}
      latestPosts={latestPosts}
    />
  );
}
