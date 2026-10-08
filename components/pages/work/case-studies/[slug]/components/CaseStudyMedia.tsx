"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";

type Props = {
  study: CaseStudyDetail;
};

export default function CaseStudyMedia({ study }: Props) {
  return (
    <MotionDiv className="banner-media">
      <div className="media-inner shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {study.bannerVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={study.bannerImage}
            className="w-full h-auto max-h-[640px] object-cover"
          >
            <source src={study.bannerVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={study.bannerImage}
            alt={study.title}
            width={1600}
            height={800}
            priority
            className="w-full h-auto max-h-[640px] object-cover"
          />
        )}
      </div>
    </MotionDiv>
  );
}
