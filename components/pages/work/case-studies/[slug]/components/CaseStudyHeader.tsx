"use client";

import { MotionHero } from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";

type Props = {
  study: CaseStudyDetail;
};

export default function CaseStudyHeader({ study }: Props) {
  return (
    <MotionHero className="ourwork__detail--header">
      <div className="info__container">
        {/* Customer & Main Headline */}
        <div className="info">
          <p className="subtitle">{study.customer}</p>
          <h1 className="title font-montserrat">
            <span className="bg-gradient-to-r from-[#d3f9f5] via-[#a3f7eb] to-[#7ceee0] bg-clip-text text-transparent">
              {study.title}
            </span>
          </h1>
        </div>

        {/* Highlight Spec Table */}
        <div className="highlight shadow-[0_20px_50px_rgba(0,104,117,0.18)]">
          <table>
            <tbody>
              <tr>
                <td>
                  <span className="title">Industry</span>
                </td>
                <td>
                  <span className="content">{study.industry}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="title">Service</span>
                </td>
                <td>
                  <span className="content">{study.service}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="title">Tags</span>
                </td>
                <td>
                  <span className="content">{study.tags.join(", ")}</span>
                </td>
              </tr>
              {study.highlight && (
                <tr>
                  <td>
                    <span className="title">Highlight</span>
                  </td>
                  <td>
                    <span className="content font-semibold text-[#7ceee0]">
                      {study.highlight}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MotionHero>
  );
}
