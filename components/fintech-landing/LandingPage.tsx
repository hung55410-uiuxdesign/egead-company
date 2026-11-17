'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HUDOverlay from './HUDOverlay';
import ContentTimeline from './ContentTimeline';
import StarburstOverlay from './StarburstOverlay';
import MatrixGridOverlay from './MatrixGridOverlay';

// Dynamically import Three.js SceneCanvas to avoid SSR issues
const SceneCanvas = dynamic(() => import('./3d/SceneCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#020617] flex items-center justify-center z-10">
      <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function LandingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(1, docHeight - winHeight);
      const currentP = Math.max(0, Math.min(1, scrollY / maxScroll));

      setProgress(currentP);
    };

    const onScrollLoop = () => {
      handleScroll();
      rafId = requestAnimationFrame(onScrollLoop);
    };

    rafId = requestAnimationFrame(onScrollLoop);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[700vh] bg-[#020617] text-white selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">
      {/* Deep Space Void Radial Background Gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 40%, #071330 0%, #030a1c 45%, #020617 100%)',
        }}
      />

      {/* Subtle Cyan / Blue Ambient Atmospheric Glow Blobs */}
      <div className="fixed top-1/4 left-1/3 w-96 h-96 rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[32rem] h-[32rem] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none z-0" />

      {/* Persistent HUD & Navigation Chrome (z-50) */}
      <HUDOverlay progress={progress} />

      {/* 2D Additive Starburst Lens Flare Sprite Overlay (z-30) */}
      <StarburstOverlay progress={progress} />

      {/* 2D Cryptographic MPC Data Matrix Grid Overlay (z-15) */}
      <MatrixGridOverlay progress={progress} />

      {/* Sticky 3D WebGL Canvas loading only Blender .glb Models (z-10) */}
      <SceneCanvas progress={progress} />

      {/* 700vh Synchronized Content Timeline (z-20) */}
      <ContentTimeline progress={progress} />
    </div>
  );
}
