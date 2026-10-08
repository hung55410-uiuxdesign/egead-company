"use client";

import ContactBlock from "@/components/ContactBlock";
import { MotionDiv } from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";
import CaseStudyBreadcrumb from "./components/CaseStudyBreadcrumb";
import CaseStudyHeader from "./components/CaseStudyHeader";
import CaseStudyMedia from "./components/CaseStudyMedia";
import CaseStudyOverview from "./components/CaseStudyOverview";
import CaseStudyChallengeSolution from "./components/CaseStudyChallengeSolution";
import CaseStudyTaskSection from "./components/CaseStudyTaskSection";
import CaseStudyNextLink from "./components/CaseStudyNextLink";

type Props = {
  study: CaseStudyDetail;
};

export default function CaseStudyDetailView({ study }: Props) {
  return (
    <main className="ourwork__detail font-montserrat min-h-screen">
      {/* 1. Breadcrumb Navigation */}
      <CaseStudyBreadcrumb />

      {/* 2. Header Block */}
      <CaseStudyHeader study={study} />

      {/* 3. Detail Body Sections */}
      <div className="ourwork__detail--body">
        <CaseStudyMedia study={study} />
        <CaseStudyOverview overview={study.overview} />
        <CaseStudyChallengeSolution
          challengeSolution={study.challengeSolution}
        />
        <CaseStudyTaskSection task={study.task} />
        {study.nextCaseStudy && (
          <CaseStudyNextLink nextCaseStudy={study.nextCaseStudy} />
        )}
      </div>

      {/* 4. Contact Block */}
      <MotionDiv id="contact" className="scroll-mt-28" threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </main>
  );
}
