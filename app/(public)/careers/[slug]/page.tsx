import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, MapPin, Briefcase, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';
import { getPublicJobOpeningBySlug, getPublicJobOpenings } from '@/lib/careers';
import JobApplicationForm from '@/components/JobApplicationForm';
import ContactBlock from '@/components/ContactBlock';
import MotionSection, { MotionHero, MotionDiv, MotionCard } from '@/components/MotionSection';

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const jobs = await getPublicJobOpenings();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata(props: JobPageProps): Promise<Metadata> {
  const params = await props.params;
  const job = await getPublicJobOpeningBySlug(params.slug);
  if (!job) {
    return { title: 'Position Not Found | E-GEAD Careers' };
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

export default async function JobDetailPage(props: JobPageProps) {
  const params = await props.params;
  const job = await getPublicJobOpeningBySlug(params.slug);

  if (!job) {
    notFound();
  }

  const allJobs = await getPublicJobOpenings();
  const relatedJobs = allJobs.filter((j) => j.slug !== job.slug).slice(0, 3);

  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36 overflow-hidden">
      {/* Top Header Section */}
      <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-[#b3b3b3] hover:text-[#10E774] transition mb-8 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to careers</span>
        </Link>

        <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-medium text-[#D4FAE6] font-montserrat leading-tight mb-6">
          {job.position}
        </h1>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded bg-[#1C1E24] border border-[#414348] text-[#b3b3b3] text-xs font-semibold uppercase tracking-wider">
            {job.department}
          </span>
          <span className="px-3 py-1 rounded bg-[#1C1E24] border border-[#414348] text-[#b3b3b3] text-xs font-semibold uppercase tracking-wider">
            {job.locationCountry}
          </span>
          <span className="px-3 py-1 rounded bg-[#1C1E24] border border-[#414348] text-[#b3b3b3] text-xs font-semibold uppercase tracking-wider">
            {job.jobType}
          </span>
        </div>
      </MotionHero>

      {/* Main Content White Container */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="w-full bg-white text-black rounded-[32px] sm:rounded-[44px] shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Job Description & Specifications */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <h2 className="text-2xl sm:text-[28px] font-bold text-[#003D5B] mb-6 font-montserrat">
                  Job Description
                </h2>
                <p className="text-gray-700 leading-relaxed font-montserrat text-[15px] mb-8">
                  {job.excerpt}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#003D5B] mb-4 font-montserrat">
                    Your Responsibilities:
                  </h3>
                  <ul className="space-y-3">
                    {job.responsibilities.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10E774] mt-2 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualifications */}
              {job.qualifications && job.qualifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#003D5B] mb-4 font-montserrat">
                    Qualifications:
                  </h3>
                  <ul className="space-y-3">
                    {job.qualifications.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10E774] mt-2 shrink-0" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preferred Skills */}
              {job.preferredSkills && job.preferredSkills.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#003D5B] mb-4 font-montserrat">
                    Preferred Skills:
                  </h3>
                  <ul className="space-y-3">
                    {job.preferredSkills.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10E774] mt-2 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tools & Technologies */}
              {job.toolsAndTechnologies && job.toolsAndTechnologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#003D5B] mb-4 font-montserrat">
                    Tools &amp; Technologies:
                  </h3>
                  <ul className="space-y-3">
                    {job.toolsAndTechnologies.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10E774] mt-2 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Share Block */}
              <div className="pt-8 border-t border-gray-100 flex items-center gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-montserrat">
                <span className="flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-gray-400" />
                  Share this opening
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://egeadcompany.com/careers/' + job.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-gray-600 hover:text-black"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(job.position + ' at E-GEAD')}&url=${encodeURIComponent('https://egeadcompany.com/careers/' + job.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-gray-600 hover:text-black"
                    aria-label="Share on X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?title=${encodeURIComponent(job.position + ' at E-GEAD')}&url=${encodeURIComponent('https://egeadcompany.com/careers/' + job.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-gray-600 hover:text-black"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-5 bg-gray-50/70 p-6 sm:p-8 rounded-3xl border border-gray-100 lg:sticky lg:top-28">
              <JobApplicationForm positionTitle={job.position} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Open Positions */}
      {relatedJobs.length > 0 && (
        <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-medium text-[#D4FAE6] font-montserrat">
              Other Open Positions
            </h2>
            <Link
              href="/careers#job"
              className="text-xs sm:text-sm font-semibold text-[#10E774] hover:underline inline-flex items-center gap-1"
            >
              <span>View all openings</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedJobs.map((r, idx) => (
              <MotionCard
                key={r.slug}
                index={idx}
                className="p-6 rounded-2xl bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition duration-300 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <span className="text-[11px] font-semibold text-[#10E774] uppercase tracking-wider block mb-2 font-montserrat">
                    {r.department}
                  </span>
                  <h3 className="text-lg font-medium text-[#D4FAE6] group-hover:text-[#10E774] transition mb-3 font-montserrat leading-snug">
                    {r.position}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-[#10E774]" />
                    <span>{r.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-light">{r.jobType}</span>
                  <Link
                    href={`/careers/${r.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#10E774] group-hover:underline"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </MotionCard>
            ))}
          </div>
        </MotionSection>
      )}

      {/* Contact Block */}
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
