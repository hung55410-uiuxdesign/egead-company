'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SpeedXVideoPlayerProps {
  coverSrc?: string;
  videoUrl?: string;
}

export default function SpeedXVideoPlayer({
  coverSrc = '/assets/speedx/cover_demo_video.png',
  videoUrl = 'https://www.youtube.com/embed/TX0agQ8myO4?autoplay=1',
}: SpeedXVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="speedx-right-inner play-false relative w-full aspect-video rounded-[25px] overflow-hidden border-2 border-white/20 hover:border-[#10E774]/60 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.6)] group">
      {isPlaying ? (
        <iframe
          className="responsive-iframe w-full h-full border-0 rounded-[25px]"
          src={videoUrl}
          title="SpeedX Demo Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="w-full h-full relative block text-left cursor-pointer focus:outline-none"
          aria-label="Play SpeedX Demo Video"
        >
          <Image
            src={coverSrc}
            alt="SpeedX Demo Video Thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            priority
          />
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="translate-x-0.5 text-black"
              >
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
