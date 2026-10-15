'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Facebook, Linkedin, Twitter } from 'lucide-react';
import JobApplicationForm from './JobApplicationForm';
import type { JobOpening } from '@/lib/careers';

interface JobDetailContentProps {
  job: JobOpening;
}

export default function JobDetailContent({ job }: JobDetailContentProps) {
  const [shareUrl, setShareUrl] = useState(
    `https://egeadcompany.com/careers/${job.slug}`
  );

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-16 sm:mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Job Description & Specifications */}
        <div className="lg:col-span-7 space-y-10">
          {/* Excerpt / Overview */}
          {job.excerpt && (
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Mô tả công việc (Job Description)
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                {job.excerpt}
              </p>
            </div>
          )}

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Trách nhiệm chính (Your Responsibilities)
              </h3>
              <ul className="space-y-2.5">
                {job.responsibilities.map((r, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#189B8C] mt-2 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualifications */}
          {job.qualifications && job.qualifications.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Yêu cầu ứng viên (Qualifications)
              </h3>
              <ul className="space-y-2.5">
                {job.qualifications.map((q, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#189B8C] mt-2 shrink-0" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preferred Skills */}
          {job.preferredSkills && job.preferredSkills.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Kỹ năng ưu tiên (Preferred Skills)
              </h3>
              <ul className="space-y-2.5">
                {job.preferredSkills.map((p, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#189B8C] mt-2 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Quyền lợi được hưởng (Benefits)
              </h3>
              <ul className="space-y-2.5">
                {job.benefits.map((b, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#189B8C] mt-2 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Share Block */}
          <div className="pt-6 border-t border-slate-200/80 flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-slate-400" />
              Chia sẻ cơ hội này:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition text-slate-600 hover:text-slate-900"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(job.position + ' at The Human Inc')}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition text-slate-600 hover:text-slate-900"
                aria-label="Share on X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?title=${encodeURIComponent(job.position + ' at The Human Inc')}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition text-slate-600 hover:text-slate-900"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-5 bg-[#FAF6EE] p-6 sm:p-8 rounded-[28px] sm:rounded-[36px] border border-[#F2ECE0] lg:sticky lg:top-32 shadow-xs">
          <JobApplicationForm jobId={job.id} positionTitle={job.position} />
        </div>
      </div>
    </section>
  );
}
