import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicJobOpeningBySlug, getPublicJobOpenings } from "@/lib/careers";
import { JobDetailView } from "@/components/pages/company/careers/[slug]";
import { getJobSiblings } from "@/lib/services/career.service";
import { localizeHref } from "@/lib/i18n/config";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const jobs = await getPublicJobOpenings();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const job = await getPublicJobOpeningBySlug(params.slug);
  if (!job) {
    return { title: "Position Not Found | E-GEAD Careers" };
  }

  // hreflang only when the posting really exists in both languages
  const siblings = await getJobSiblings(
    { id: job.id, groupId: job.groupId },
    { publishedOnly: true }
  );
  const languages: Record<string, string> = {};
  if (siblings.length > 1) {
    siblings.forEach((s) => {
      languages[s.locale] = localizeHref(`/careers/${s.slug}`, s.locale);
    });
  }

  return {
    ...(Object.keys(languages).length > 0 ? { alternates: { languages } } : {}),
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

  const [allJobs, siblings] = await Promise.all([
    getPublicJobOpenings(job.locale || "en"),
    getJobSiblings({ id: job.id, groupId: job.groupId }, { publishedOnly: true }),
  ]);
  const relatedJobs = allJobs.filter((j) => j.slug !== job.slug).slice(0, 3);

  return (
    <JobDetailView job={job} relatedJobs={relatedJobs} siblings={siblings} />
  );
}
