import { Share2, Facebook, Linkedin, Twitter } from "lucide-react";
import JobApplicationForm from "./JobApplicationForm";
import type { JobOpening } from "@/lib/careers";

type Props = {
  job: JobOpening;
};

export default function JobDetailContent({ job }: Props) {
  const shareUrl = `https://egeadcompany.com/careers/${job.slug}`;

  return (
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
                  {job.responsibilities.map((r: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                    >
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
                  {job.qualifications.map((q: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                    >
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
                  {job.preferredSkills.map((p: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10E774] mt-2 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools & Technologies */}
            {job.toolsAndTechnologies &&
              job.toolsAndTechnologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-[#003D5B] mb-4 font-montserrat">
                    Tools &amp; Technologies:
                  </h3>
                  <ul className="space-y-3">
                    {job.toolsAndTechnologies.map((t: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                      >
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
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-gray-600 hover:text-black"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(job.position + " at E-GEAD")}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition text-gray-600 hover:text-black"
                  aria-label="Share on X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?title=${encodeURIComponent(job.position + " at E-GEAD")}&url=${encodeURIComponent(shareUrl)}`}
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
            <JobApplicationForm jobId={job.id} positionTitle={job.position} />
          </div>
        </div>
      </div>
    </section>
  );
}
