import type { Metadata } from 'next';
import { OurWorkView } from '@/components/pages/work/our-work';
import { getCaseStudies } from '@/lib/services/casestudy.service';
import type { CaseStudyItem } from '@/components/pages/work/our-work/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Explore Our Innovative Projects and Success Stories | E-GEAD',
  description:
    'Discover our innovative projects and success stories at E-GEAD, showcasing how we transform ideas into impactful digital solutions for diverse industries.',
  keywords: [
    'ecommerce case studies',
    'tiktok shop us success story',
    'pod fulfillment case study',
    'cross-border scaling results',
    'sub 24h dispatch SLA proof',
    'SAI Digital our work',
  ],
};

export default async function OurWorkPage() {
  let studies: CaseStudyItem[] = [];
  try {
    const rawStudies = await getCaseStudies({ status: 'published' });
    studies = rawStudies.map((s) => ({
      id: s.id,
      slug: s.slug,
      customer: s.customer,
      title: s.title,
      description: s.description,
      image: s.image,
      services: s.services,
      industries: s.industries,
      tags: s.tags,
      highlight: s.highlight || undefined,
      order: s.order,
    }));
  } catch (error) {
    console.error('Error fetching studies for our-work page:', error);
  }

  return <OurWorkView initialStudies={studies} />;
}
