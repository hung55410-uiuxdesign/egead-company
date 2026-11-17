'use client';

import React, { useMemo } from 'react';

interface MatrixGridOverlayProps {
  progress: number;
}

export default function MatrixGridOverlay({ progress }: MatrixGridOverlayProps) {
  // Active in Section 6: 0.81 to 0.92
  if (progress < 0.81 || progress > 0.92) return null;

  const dist = Math.min(1, Math.max(0, (progress - 0.81) / 0.04));
  const exit = Math.min(1, Math.max(0, (0.92 - progress) / 0.03));
  const opacity = Math.min(dist, exit) * 0.85;

  // Generate static pseudo-random cells for cryptographic grid
  const cells = useMemo(() => {
    const list: { id: number; hex: string; active: boolean; delay: number }[] = [];
    const hexChars = '0123456789ABCDEF';
    for (let i = 0; i < 48; i++) {
      const h1 = hexChars[Math.floor(Math.random() * 16)];
      const h2 = hexChars[Math.floor(Math.random() * 16)];
      list.push({
        id: i,
        hex: `0x${h1}${h2}`,
        active: Math.random() > 0.65,
        delay: (i % 8) * 0.15,
      });
    }
    return list;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-15 flex flex-col justify-center items-center overflow-hidden transition-opacity duration-150"
      style={{ opacity }}
    >
      {/* Background radial matrix glow */}
      <div className="absolute w-[80vw] h-[60vh] bg-blue-900/15 rounded-full blur-[100px]" />

      {/* Grid of cryptographic telemetry packets */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3 p-6 max-w-5xl opacity-40">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className={`flex flex-col items-center justify-center p-2 rounded-lg border font-mono text-[10px] transition-colors duration-500 ${
              cell.active
                ? 'border-cyan-400/40 bg-cyan-950/30 text-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                : 'border-white/5 bg-slate-950/40 text-slate-600'
            }`}
          >
            <span className="font-semibold">{cell.hex}</span>
            <span className="text-[8px] opacity-60">MPC</span>
          </div>
        ))}
      </div>
    </div>
  );
}
