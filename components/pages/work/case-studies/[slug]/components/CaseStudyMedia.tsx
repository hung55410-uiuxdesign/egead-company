"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";
import { getOptimizedImageUrl } from "@/lib/utils/image";

type Props = {
  study: CaseStudyDetail;
};

export default function CaseStudyMedia({ study }: Props) {
  const optimizedBanner = getOptimizedImageUrl(study.bannerImage, { width: 2400 });

  return (
    <MotionDiv className="banner-media">
      <div className="media-inner shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden bg-[#141718] flex items-center justify-center">
        {study.bannerVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={optimizedBanner}
            className="w-full h-full object-cover"
          >
            <source src={study.bannerVideo} type="video/mp4" />
          </video>
        ) : (
          <>
            {/* Ambient blurred glow backdrop */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Image
                src={optimizedBanner}
                alt=""
                aria-hidden="true"
                fill
                priority
                className="object-cover blur-3xl opacity-35 scale-110"
              />
            </div>
            {/* Main high-resolution banner */}
            <Image
              src={optimizedBanner}
              alt={study.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1440px"
              className="w-full h-full object-cover object-top sm:object-center relative z-10"
            />
          </>
        )}
      </div>
    </MotionDiv>
  );
}

