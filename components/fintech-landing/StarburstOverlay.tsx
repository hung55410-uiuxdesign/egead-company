'use client';

import React from 'react';

interface StarburstOverlayProps {
  progress: number;
}

export default function StarburstOverlay({ progress }: StarburstOverlayProps) {
  // Active window around 15% - 30% (peaking at 23%)
  if (progress < 0.16 || progress > 0.30) return null;

  const dist = Math.abs(progress - 0.23);
  const maxDist = 0.07;
  const intensity = Math.pow(Math.max(0, 1 - dist / maxDist), 2.0);

  // Horizontal sweep across viewport as scroll advances
  const sweepPercent = 50 + (progress - 0.23) * 240;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden mix-blend-screen transition-opacity duration-75"
      style={{ opacity: intensity }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          left: `${sweepPercent - 50}%`,
          transform: `scale(${0.8 + intensity * 0.8})`,
        }}
      >
        {/* Core pure white circle */}
        <div className="w-12 h-12 rounded-full bg-white shadow-[0_0_60px_#ffffff] blur-[1px]" />

        {/* Cyan radial halo */}
        <div className="absolute w-44 h-44 rounded-full bg-cyan-400/80 blur-2xl" />
        <div className="absolute w-80 h-80 rounded-full bg-blue-600/40 blur-3xl" />

        {/* Anamorphic horizontal laser streak */}
        <div
          className="absolute h-1 bg-gradient-to-r from-transparent via-cyan-200 via-white to-transparent shadow-[0_0_20px_#38bdf8]"
          style={{ width: '120vw' }}
        />

        {/* 4-point star beams */}
        <svg
          className="absolute w-72 h-72 animate-pulse text-cyan-300"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Vertical beam */}
          <polygon points="100,0 102,100 100,200 98,100" fill="currentColor" opacity="0.9" />
          {/* Horizontal beam */}
          <polygon points="0,100 100,102 200,100 100,98" fill="currentColor" opacity="0.9" />
          {/* Diagonal subtle beams */}
          <polygon points="30,30 100,101 170,170 100,99" fill="#93c5fd" opacity="0.4" />
          <polygon points="170,30 99,100 30,170 101,100" fill="#93c5fd" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
