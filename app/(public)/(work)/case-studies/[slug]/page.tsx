import React from 'react';
import type { Metadata } from 'next';
import { getCaseStudyBySlug as getStaticCaseStudyBySlug, CaseStudyDetail } from '@/lib/case-studies-data';
import { getCaseStudyBySlug as getDbCaseStudyBySlug } from '@/lib/services/casestudy.service';
import { CaseStudyDetailView } from '@/components/pages/work/case-studies/[slug]';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getMergedCaseStudy(slug: string): Promise<CaseStudyDetail> {
  try {
    const dbItem = await getDbCaseStudyBySlug(slug);
    if (dbItem) {
      return {
        slug: dbItem.slug,
        title: dbItem.title,
        customer: dbItem.customer,
        industry: dbItem.industries?.[0] || 'Corporate & B2B',
        service: dbItem.services?.[0] || 'Technology',
        tags: dbItem.tags || [],
        highlight: dbItem.highlight || undefined,
        bannerImage: dbItem.bannerImage || dbItem.image,
        bannerVideo: dbItem.bannerVideo || undefined,
        overview: {
          subtitle: dbItem.overviewSubtitle || 'OVERVIEW',
          title: dbItem.overviewTitle || dbItem.title,
          image: dbItem.overviewImage || undefined,
          description: dbItem.overviewDescription || dbItem.description,
        },
        challengeSolution: {
          challengeTitle: dbItem.challengeTitle || 'The Challenge',
          challengeContent: dbItem.challengeContent || '',
          solutionTitle: dbItem.solutionTitle || 'The Solution',
          solutionContent: dbItem.solutionContent || '',
        },
        task: {
          subtitle: dbItem.taskSubtitle || 'TASK',
          title: dbItem.taskTitle || 'Tasks of The Project',
          images: dbItem.taskImages || [],
          taskItems: Array.isArray(dbItem.taskItems) && dbItem.taskItems.length > 0
            ? dbItem.taskItems
            : [],
        },
        nextCaseStudy: dbItem.nextStudySlug
          ? {
              slug: dbItem.nextStudySlug,
              title: dbItem.nextStudyTitle || '',
              customer: dbItem.nextStudyCustomer || '',
            }
          : undefined,
      };
    }
  } catch (error) {
    console.error('Error fetching case study from DB, using fallback:', error);
  }

  return getStaticCaseStudyBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getMergedCaseStudy(slug);

  return {
    title: `${study.title} | Case Study | E-GEAD`,
    description:
      study.overview.description || study.challengeSolution.challengeTitle,
    openGraph: {
      title: `${study.title} - ${study.customer}`,
      description:
        study.overview.description || study.challengeSolution.challengeTitle,
      images: [study.bannerImage],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = await getMergedCaseStudy(slug);

  return <CaseStudyDetailView study={study} />;
}
