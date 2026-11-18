import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicJobOpeningBySlug, getPublicJobOpenings } from "@/lib/careers";
import { JobDetailView } from "@/components/pages/company/careers/[slug]";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const jobs = await getPublicJobOpenings();
    return jobs.map((j) => ({ slug: j.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const job = await getPublicJobOpeningBySlug(params.slug);
  if (!job) {
    return { title: "Position Not Found | E-GEAD Careers" };
  }

  return {
    title: `${job.position} | Careers at E-GEAD`,
    description: job.excerpt,
    openGraph: {
      title: `${job.position} - E-GEAD Careers`,
      description: job.excerpt,
    },
  };
}

export default async function JobDetailPage(props: Props) {
  const params = await props.params;
  const job = await getPublicJobOpeningBySlug(params.slug);

  if (!job) {
    notFound();
  }

  const allJobs = await getPublicJobOpenings();
  const relatedJobs = allJobs.filter((j) => j.slug !== job.slug).slice(0, 3);

  return <JobDetailView job={job} relatedJobs={relatedJobs} />;
}
