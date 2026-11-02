'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Facebook, Linkedin, Twitter } from 'lucide-react';
import JobApplicationForm from './JobApplicationForm';
import type { JobOpening } from '@/lib/careers';

interface JobDetailContentProps {
  job: JobOpening;
}

const DEFAULT_REQ_PLACEHOLDER =
  '<ul><li>Tối thiểu 2 năm kinh nghiệm thực chiến ở vị trí tương đương.</li><li>Thành thạo kỹ năng chuyên môn và có tư duy giải quyết vấn đề tốt.</li><li>Kỹ năng giao tiếp và làm việc nhóm hiệu quả.</li></ul>';

const DEFAULT_BEN_PLACEHOLDER =
  '<ul><li>Mức lương cạnh tranh theo năng lực + Thưởng hiệu suất hàng quý.</li><li>Đóng bảo hiểm đầy đủ (BHXH, BHYT) theo quy định và bảo hiểm sức khỏe nâng cao.</li><li>Môi trường quốc tế, năng động, trang thiết bị làm việc hiện đại.</li></ul>';

function hasMeaningfulHtml(html?: string): boolean {
  if (!html) return false;
  const stripped = html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
  return stripped.length > 0;
}

export default function JobDetailContent({ job }: JobDetailContentProps) {
  const [shareUrl, setShareUrl] = useState(
    `https://egeadcompany.com/careers/${job.slug}`
  );

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const descHtml = job.descriptionHtml?.trim() || '';
  const reqHtml = job.requirementsHtml?.trim() || '';
  const benHtml = job.benefitsHtml?.trim() || '';

  const hasDescHtml = hasMeaningfulHtml(descHtml);

  // Detect if user wrote the full job post (including Requirements / Benefits) inside descriptionHtml
  const descLower = descHtml.toLowerCase();
  const descAlreadyHasReq =
    descLower.includes('yêu cầu ứng viên') ||
    descLower.includes('qualifications') ||
    descLower.includes('requirements');
  const descAlreadyHasBen =
    descLower.includes('quyền lợi') ||
    descLower.includes('đãi ngộ') ||
    descLower.includes('benefits');

  const hasCustomReqHtml =
    hasMeaningfulHtml(reqHtml) &&
    !(descAlreadyHasReq && reqHtml === DEFAULT_REQ_PLACEHOLDER);

  const hasCustomBenHtml =
    hasMeaningfulHtml(benHtml) &&
    !(descAlreadyHasBen && benHtml === DEFAULT_BEN_PLACEHOLDER);

  // Check if descriptionHtml already starts with its own heading or numbered list (e.g. "1. Mô tả công việc")
  const descHasOwnHeading =
    /^<(h[1-4]|ol)/i.test(descHtml) ||
    descLower.startsWith('<p><strong>mô tả công việc') ||
    descLower.startsWith('<p><strong>1.');

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-16 sm:mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Job Description & Specifications */}
        <div className="lg:col-span-7 space-y-8">
          {/* Excerpt / Short Summary */}
          {job.excerpt && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-medium">
                {job.excerpt}
              </p>
            </div>
          )}

          {/* Main Description (Rich Text HTML) */}
          {hasDescHtml ? (
            <div className="space-y-4">
              {!descHasOwnHeading && (
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Mô tả công việc (Job Description)
                </h2>
              )}
              <div
                className="career-rich-content text-slate-800 leading-relaxed font-open-sans"
                dangerouslySetInnerHTML={{ __html: descHtml }}
              />
            </div>
          ) : (
            job.responsibilities &&
            job.responsibilities.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Mô tả công việc (Job Description)
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
            )
          )}

          {/* Requirements / Qualifications (Rich Text HTML) */}
          {hasCustomReqHtml && (
            <div className="space-y-4">
              {!/^<(h[1-4]|ol)/i.test(reqHtml) && (
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Yêu cầu ứng viên (Qualifications)
                </h3>
              )}
              <div
                className="career-rich-content text-slate-800 leading-relaxed font-open-sans"
                dangerouslySetInnerHTML={{ __html: reqHtml }}
              />
            </div>
          )}

          {/* Preferred Skills (legacy array fallback) */}
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

          {/* Benefits (Rich Text HTML) */}
          {hasCustomBenHtml && (
            <div className="space-y-4">
              {!/^<(h[1-4]|ol)/i.test(benHtml) && (
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Quyền lợi &amp; Đãi ngộ (Benefits)
                </h3>
              )}
              <div
                className="career-rich-content text-slate-800 leading-relaxed font-open-sans"
                dangerouslySetInnerHTML={{ __html: benHtml }}
              />
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
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(job.position + ' at E-GEAD')}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition text-slate-600 hover:text-slate-900"
                aria-label="Share on X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?title=${encodeURIComponent(job.position + ' at E-GEAD')}&url=${encodeURIComponent(shareUrl)}`}
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

      {/* 100% Visual Parity Styles matching Admin TipTap Preview */}
      <style jsx global>{`
        .career-rich-content {
          outline: none;
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #334155;
          font-size: 1rem;
        }
        .career-rich-content p {
          margin-bottom: 1rem;
          line-height: 1.8;
          color: #334155;
        }
        .career-rich-content li > p {
          margin-bottom: 0.35rem;
          display: inline;
        }
        .career-rich-content h1 {
          font-size: 1.875rem;
          font-weight: 800;
          color: #0f172a;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
          line-height: 1.3;
        }
        .career-rich-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.35;
        }
        .career-rich-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 1.35rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .career-rich-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #334155;
          margin-top: 1.15rem;
          margin-bottom: 0.5rem;
        }
        .career-rich-content strong,
        .career-rich-content b {
          font-weight: 700;
          color: #0f172a;
        }
        .career-rich-content em {
          font-style: italic;
        }
        .career-rich-content u {
          text-decoration: underline;
        }
        .career-rich-content s {
          text-decoration: line-through;
        }
        .career-rich-content a {
          color: #059669;
          text-decoration: underline;
          font-weight: 500;
        }
        .career-rich-content ul:not([data-type='taskList']) {
          list-style-type: disc;
          padding-left: 1.75rem;
          margin-bottom: 1.25rem;
          color: #334155;
        }
        .career-rich-content ol {
          list-style-type: decimal;
          padding-left: 1.75rem;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          color: #0f172a;
          font-weight: 600;
        }
        .career-rich-content li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }
        .career-rich-content ul li {
          font-weight: 400;
        }
        .career-rich-content blockquote {
          border-left: 4px solid #10b981;
          padding: 0.85rem 1.25rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #475569;
          background: #f8fafc;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .career-rich-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.5rem 0;
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
        }
        .career-rich-content th,
        .career-rich-content td {
          border: 1px solid #cbd5e1;
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
        }
        .career-rich-content th {
          background-color: #f8fafc;
          font-weight: 700;
          color: #0f172a;
        }
        .career-rich-content img {
          border-radius: 0.75rem;
          max-width: 100%;
          height: auto;
          margin: 1.25rem auto;
          display: block;
          border: 1px solid #e2e8f0;
        }
        .career-rich-content div[data-youtube-video] {
          width: 100%;
          margin: 1.25rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .career-rich-content div[data-youtube-video] iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: none;
        }
      `}</style>
    </section>
  );
}
