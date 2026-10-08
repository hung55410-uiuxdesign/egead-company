"use client";

import Image from "next/image";
import MotionSection from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";

type Props = {
  overview: CaseStudyDetail["overview"];
};

export default function CaseStudyOverview({ overview }: Props) {
  return (
    <MotionSection className="overview">
      <span className="subtitle font-montserrat">
        {overview.subtitle || "OVERVIEW"}
      </span>
      <h2 className="title font-montserrat">{overview.title}</h2>

      {overview.image && (
        <div className="w-full max-w-[1100px] mt-4 rounded-[20px] md:rounded-[32px] overflow-hidden border border-white/10 bg-[#141718] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <Image
            src={overview.image}
            alt="Strategic overview architecture"
            width={1400}
            height={700}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {overview.description && (
        <p className="text-[#b3b3b3] max-w-3xl text-center text-base md:text-lg mt-6 font-light leading-relaxed">
          {overview.description}
        </p>
      )}
    </MotionSection>
  );
}
