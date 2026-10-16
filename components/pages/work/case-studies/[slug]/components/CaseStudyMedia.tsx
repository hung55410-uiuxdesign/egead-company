"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/MotionSection";
import type { CaseStudyDetail } from "@/lib/case-studies-data";
import { getOptimizedImageUrl } from "@/lib/utils/image";

type Props = {
  study: CaseStudyDetail;
};

// Helper: Tự động phân tích và trích xuất URL nhúng YouTube từ link dán
function getYouTubeEmbedInfo(url?: string | null) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{11})/i
  );
  if (match && match[1]) {
    const videoId = match[1];
    return {
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&controls=1&rel=0&modestbranding=1`,
    };
  }
  return null;
}

export default function CaseStudyMedia({ study }: Props) {
  const optimizedBanner = getOptimizedImageUrl(study.bannerImage, { width: 2400 });
  const ytInfo = getYouTubeEmbedInfo(study.bannerVideo);

  return (
    <MotionDiv className="banner-media">
      <div className="media-inner shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden bg-[#141718] flex items-center justify-center">
        {ytInfo ? (
          /* Trường hợp 1: Link YouTube -> Nhúng iframe chuẩn quốc tế với autoplay, loop & controls */
          <div className="w-full h-full aspect-video min-h-[300px] sm:min-h-[440px] md:min-h-[560px] relative">
            <iframe
              src={ytInfo.embedUrl}
              title={study.title || "Case Study Video"}
              className="w-full h-full absolute inset-0 border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : study.bannerVideo ? (
          /* Trường hợp 2: Tệp video trực tiếp (tải từ máy tính lên Cloudinary hoặc link MP4/WebM) */
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={optimizedBanner}
            className="w-full h-full object-cover"
          >
            <source
              src={study.bannerVideo}
              type={study.bannerVideo.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
            />
          </video>
        ) : (
          /* Trường hợp 3: Ảnh tĩnh chất lượng cao với hiệu ứng glow */
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


