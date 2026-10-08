"use client";

import NextCaseStudyLink from "./NextCaseStudyLink";
import { MotionDiv } from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";

type Props = {
  nextCaseStudy: NonNullable<CaseStudyDetail["nextCaseStudy"]>;
};

export default function CaseStudyNextLink({ nextCaseStudy }: Props) {
  return (
    <MotionDiv className="next-case-study">
      <p className="label font-montserrat">NEXT CASE STUDY</p>
      <NextCaseStudyLink
        href={`/case-studies/${nextCaseStudy.slug}`}
        title={nextCaseStudy.title}
      />
    </MotionDiv>
  );
}
