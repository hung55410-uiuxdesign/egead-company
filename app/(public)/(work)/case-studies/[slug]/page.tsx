import React from "react";
import type { Metadata } from "next";
import { getCaseStudyBySlug } from "@/lib/case-studies-data";
import { CaseStudyDetailView } from "@/components/pages/work/case-studies/[slug]";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

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
  const study = getCaseStudyBySlug(slug);

  return <CaseStudyDetailView study={study} />;
}
