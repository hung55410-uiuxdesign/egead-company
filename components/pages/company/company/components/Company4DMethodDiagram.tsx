'use client';

import React from 'react';
import type { Company4DStep } from '@/lib/services/company-section.service';
import { DEFAULT_4D_METHOD_STEPS } from '@/lib/services/company-section.service';

interface Company4DMethodDiagramProps {
  steps?: Company4DStep[];
  className?: string;
  isInteractive?: boolean;
}

export default function Company4DMethodDiagram({
  steps = DEFAULT_4D_METHOD_STEPS,
  className = '',
}: Company4DMethodDiagramProps) {
  const displaySteps = steps && steps.length > 0 ? steps : DEFAULT_4D_METHOD_STEPS;

  // Canvas Geometry: ViewBox 0 0 1200 280, Center Y = 140
  // 4 identical symmetric rounded diamond modules (width 260, height 180):
  // Module 1 (Design): Center (210, 140), Left (80, 140) [Node 1], Right (340, 140) [Node 2]
  // Module 2 (Build):  Center (470, 140), Left (340, 140) [Node 2], Right (600, 140) [Node 3]
  // Module 3 (Run):    Center (730, 140), Left (600, 140) [Node 3], Right (860, 140) [Node 4]
  // Module 4 (Grow):   Center (990, 140), Left (860, 140) [Node 4], Right (1120, 140) [Right Tip]
  const yc = 140;
  const dx = 130;
  const dy = 90;
  const kx = dx * 0.45; // 58.5
  const ky = dy * 0.45; // 40.5

  // Inner scale 82%
  const dxIn = dx * 0.82; // 106.6
  const dyIn = dy * 0.82; // 73.8
  const kxIn = dxIn * 0.45; // 47.97
  const kyIn = dyIn * 0.45; // 33.21

  const moduleCenters = [210, 470, 730, 990];

  // Helper to construct exact outer diamond path for a given center X
  const createOuterDiamondPath = (xc: number) => {
    const x0 = xc - dx;
    const x1 = xc + dx;
    const yt = yc - dy;
    const yb = yc + dy;

    return (
      `M ${x0},${yc} ` +
      `C ${x0 + kx},${yc - ky} ${xc - kx},${yt} ${xc},${yt} ` +
      `C ${xc + kx},${yt} ${x1 - kx},${yc - ky} ${x1},${yc} ` +
      `C ${x1 - kx},${yc + ky} ${xc + kx},${yb} ${xc},${yb} ` +
      `C ${xc - kx},${yb} ${x0 + kx},${yc + ky} ${x0},${yc} Z`
    );
  };

  // Helper to construct exact inner diamond path
  const createInnerDiamondPath = (xc: number) => {
    const x0 = xc - dxIn;
    const x1 = xc + dxIn;
    const yt = yc - dyIn;
    const yb = yc + dyIn;

    return (
      `M ${x0},${yc} ` +
      `C ${x0 + kxIn},${yc - kyIn} ${xc - kxIn},${yt} ${xc},${yt} ` +
      `C ${xc + kxIn},${yt} ${x1 - kxIn},${yc - kyIn} ${x1},${yc} ` +
      `C ${x1 - kxIn},${yc + kyIn} ${xc + kxIn},${yb} ${xc},${yb} ` +
      `C ${xc - kxIn},${yb} ${x0 + kxIn},${yc + kyIn} ${x0},${yc} Z`
    );
  };

  // FULL CLOSED INFINITY FIGURE-8 CIRCUIT:
  // Traverses BOTH top and bottom of ALL 4 modules in a continuous endless ribbon:
  // 1. Bottom of Design (80 -> 340)
  // 2. Top of Build (340 -> 600)
  // 3. Bottom of Run (600 -> 860)
  // 4. Top of Grow (860 -> 1120)
  // 5. Bottom of Grow (1120 -> 860)
  // 6. Top of Run (860 -> 600)
  // 7. Bottom of Build (600 -> 340)
  // 8. Top of Design (340 -> 80)
  // Exact path length = 2600 px
  const fullFigureEightPath =
    // 1. Module 1: Bottom arc (Node 1 to Node 2)
    `M 80,${yc} ` +
    `C ${80 + kx},${yc + ky} ${210 - kx},${yc + dy} 210,${yc + dy} ` +
    `C ${210 + kx},${yc + dy} ${340 - kx},${yc + ky} 340,${yc} ` +
    // 2. Module 2: Top arc (Node 2 to Node 3)
    `C ${340 + kx},${yc - ky} ${470 - kx},${yc - dy} 470,${yc - dy} ` +
    `C ${470 + kx},${yc - dy} ${600 - kx},${yc - ky} 600,${yc} ` +
    // 3. Module 3: Bottom arc (Node 3 to Node 4)
    `C ${600 + kx},${yc + ky} ${730 - kx},${yc + dy} 730,${yc + dy} ` +
    `C ${730 + kx},${yc + dy} ${860 - kx},${yc + ky} 860,${yc} ` +
    // 4. Module 4: Top arc (Node 4 to Right Tip)
    `C ${860 + kx},${yc - ky} ${990 - kx},${yc - dy} 990,${yc - dy} ` +
    `C ${990 + kx},${yc - dy} ${1120 - kx},${yc - ky} 1120,${yc} ` +
    // 5. Module 4: Bottom arc (Right Tip back to Node 4)
    `C ${1120 - kx},${yc + ky} ${990 + kx},${yc + dy} 990,${yc + dy} ` +
    `C ${990 - kx},${yc + dy} ${860 + kx},${yc + ky} 860,${yc} ` +
    // 6. Module 3: Top arc (Node 4 back to Node 3)
    `C ${860 - kx},${yc - ky} ${730 + kx},${yc - dy} 730,${yc - dy} ` +
    `C ${730 - kx},${yc - dy} ${600 + kx},${yc - ky} 600,${yc} ` +
    // 7. Module 2: Bottom arc (Node 3 back to Node 2)
    `C ${600 - kx},${yc + ky} ${470 + kx},${yc + dy} 470,${yc + dy} ` +
    `C ${470 - kx},${yc + dy} ${340 + kx},${yc + ky} 340,${yc} ` +
    // 8. Module 1: Top arc (Node 2 back to Node 1)
    `C ${340 - kx},${yc - ky} ${210 + kx},${yc - dy} 210,${yc - dy} ` +
    `C ${210 - kx},${yc - dy} ${80 + kx},${yc - ky} 80,${yc} Z`;

  const nodes = [
    { step: 1, x: 80, y: yc },
    { step: 2, x: 340, y: yc },
    { step: 3, x: 600, y: yc },
    { step: 4, x: 860, y: yc },
  ];

  return (
    <div
      className={`relative w-full rounded-[28px] sm:rounded-[36px] border border-[#142320] bg-[#070A0B] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[420px] h-[300px] bg-[#8B5CF6]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[280px] bg-[#29D698]/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-8 right-1/4 w-[380px] h-[260px] bg-[#2DD4BF]/6 rounded-full blur-[120px] pointer-events-none" />

      {/* SVG Interconnected 4D Lozenge Diagram */}
      <div className="relative w-full overflow-x-auto pb-4 sm:pb-6 scrollbar-none">
        <div className="min-w-[800px] lg:min-w-full">
          <svg
            viewBox="0 0 1200 280"
            className="w-full h-auto select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Refined Calm Neon Glow Filter */}
              <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur1" />
                <feGaussianBlur stdDeviation="8" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Node Halo Filter */}
              <filter id="node-halo-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Loop Background Gradients */}
              <linearGradient id="diamond-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0A1414" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#081816" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#050C0C" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="diamond-bg-active" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0D2621" stopOpacity="0.92" />
                <stop offset="50%" stopColor="#0B332A" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#061814" stopOpacity="0.92" />
              </linearGradient>

              {/* Calm, Elegant Flow Animation (7.5s smooth continuous glide) */}
              <style>{`
                @keyframes smoothLaserStream {
                  0% {
                    stroke-dashoffset: 0;
                  }
                  100% {
                    stroke-dashoffset: -2600;
                  }
                }
                .laser-stream {
                  animation: smoothLaserStream 7.5s linear infinite;
                }
              `}</style>
            </defs>

            {/* 4 Identical Symmetric Diamond Modules */}
            {moduleCenters.map((xc, idx) => {
              const stepNumber = idx + 1;
              const stepName = displaySteps[idx]?.name || `Step ${stepNumber}`;

              return (
                <g
                  key={`diamond-${stepNumber}`}
                  className="transition-all duration-300"
                >
                  {/* Outer Diamond Boundary */}
                  <path
                    d={createOuterDiamondPath(xc)}
                    fill="url(#diamond-bg)"
                    stroke="#1A332C"
                    strokeWidth="1.25"
                    strokeOpacity="0.5"
                    className="transition-colors duration-300"
                  />

                  {/* Inner Concentric Diamond Inset */}
                  <path
                    d={createInnerDiamondPath(xc)}
                    fill="none"
                    stroke="#1C3E36"
                    strokeWidth="1.25"
                    strokeOpacity="0.45"
                    className="transition-colors duration-300"
                  />

                  {/* Centered Step Name (Design, Build, Run, Grow) */}
                  <text
                    x={xc}
                    y={148}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="23"
                    fontWeight="600"
                    fontFamily="inherit"
                    className="select-none pointer-events-none"
                  >
                    {stepName}
                  </text>
                </g>
              );
            })}

            {/* STATIC SUBTLE BASE TRACK (Full 4-Module Infinity Circuit) */}
            <path
              d={fullFigureEightPath}
              pathLength="2600"
              fill="none"
              stroke="#15362F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none"
            />
            <path
              d={fullFigureEightPath}
              pathLength="2600"
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#wave-glow)"
              className="pointer-events-none"
            />

            {/* SINGLE CALM, LUXURIOUS ENERGY STREAM (No frantic overlapping or jitter) */}
            {/* Soft Ambient Halo of the pulse */}
            <path
              d={fullFigureEightPath}
              pathLength="2600"
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="5"
              strokeOpacity="0.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="320 2280"
              filter="url(#wave-glow)"
              className="laser-stream pointer-events-none"
            />
            {/* Crisp Radiant Pulse Body */}
            <path
              d={fullFigureEightPath}
              pathLength="2600"
              fill="none"
              stroke="#5EEAD4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="320 2280"
              className="laser-stream pointer-events-none"
            />
            {/* Subtle White Highlight Core inside pulse */}
            <path
              d={fullFigureEightPath}
              pathLength="2600"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="140 2460"
              className="laser-stream pointer-events-none"
            />

            {/* 4 JUNCTION NODES (1, 2, 3, 4) Sitting Exactly on the Vertices */}
            {nodes.map((node) => (
              <g key={`node-${node.step}`}>
                {/* Main Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="15"
                  fill="#2DD4BF"
                  stroke="#A7F3D0"
                  strokeWidth="2"
                  className="shadow-sm"
                />

                {/* Step Number */}
                <text
                  x={node.x}
                  y={145}
                  textAnchor="middle"
                  fill="#031713"
                  fontSize="12.5"
                  fontWeight="700"
                  fontFamily="inherit"
                  className="select-none pointer-events-none"
                >
                  {node.step}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* 4 Bottom Value Proposition Columns (Aligned directly under the 4 loops) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-4 sm:pt-6">
        {displaySteps.map((step, idx) => {
          const stepNumber = idx + 1;

          return (
            <div key={stepNumber} className="p-2">
              {/* Highlight Tagline */}
              <h3 className="text-base sm:text-lg font-bold mb-2 text-[#2DD4BF]">
                {step.tagline || `Step ${stepNumber}`}
              </h3>

              {/* Description */}
              <p className="text-sm font-normal text-[#94A3B8] leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
