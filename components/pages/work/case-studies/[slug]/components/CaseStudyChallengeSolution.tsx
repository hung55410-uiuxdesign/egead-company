"use client";

import MotionSection from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";

type Props = {
  challengeSolution: CaseStudyDetail["challengeSolution"];
};

export default function CaseStudyChallengeSolution({
  challengeSolution,
}: Props) {
  return (
    <MotionSection className="challenge__solution">
      <div className="challenge">
        <span className="subtitle font-montserrat">CHALLENGE</span>
        <h3 className="title font-montserrat">
          {challengeSolution.challengeTitle}
        </h3>
        <p className="content font-montserrat">
          {challengeSolution.challengeContent}
        </p>
      </div>

      <div className="solution">
        <span className="subtitle font-montserrat">SOLUTION</span>
        <h3 className="title font-montserrat">
          {challengeSolution.solutionTitle}
        </h3>
        <p className="content font-montserrat">
          {challengeSolution.solutionContent}
        </p>
      </div>
    </MotionSection>
  );
}
