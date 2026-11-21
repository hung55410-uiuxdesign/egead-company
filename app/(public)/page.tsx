import { HomeView } from '@/components/pages/home';
import { getCachedHomeSectionByKey, getCachedLatestPosts } from '@/lib/cache/public-data';
import { getLocale } from '@/lib/i18n/server';

export default async function HomePage() {
  const locale = await getLocale();
  const [
    marketplacesSection,
    servicesSection,
    smartCXSection,
    testimonialsSection,
    latestPosts,
  ] = await Promise.all([
    getCachedHomeSectionByKey('marketplaces-partners').catch(() => null),
    getCachedHomeSectionByKey('services-capabilities').catch(() => null),
    getCachedHomeSectionByKey('why-brands-ship').catch(() => null),
    getCachedHomeSectionByKey('testimonials').catch(() => null),
    getCachedLatestPosts(locale, 10).catch(() => []),
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
