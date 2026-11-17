'use client';

import React from 'react';

interface ContentTimelineProps {
  progress: number;
}

// Helper to calculate smooth opacity curve for a section
function getSectionOpacity(progress: number, start: number, end: number, fadeDist = 0.035) {
  if (progress < start - fadeDist || progress > end + fadeDist) return 0;
  if (progress < start) return (progress - (start - fadeDist)) / fadeDist;
  if (progress > end) return (end + fadeDist - progress) / fadeDist;
  return 1;
}

export default function ContentTimeline({ progress }: ContentTimelineProps) {
  // Choreography across 700vh
  const op1 = getSectionOpacity(progress, 0.0, 0.15, 0.025);
  const op2 = getSectionOpacity(progress, 0.17, 0.29, 0.03);
  const op3 = getSectionOpacity(progress, 0.31, 0.47, 0.03);
  const op4 = getSectionOpacity(progress, 0.49, 0.61, 0.03);
  const op5 = getSectionOpacity(progress, 0.63, 0.77, 0.03);
  const op6A = getSectionOpacity(progress, 0.79, 0.84, 0.02);
  const op6B = getSectionOpacity(progress, 0.84, 0.90, 0.02);
  const op7 = getSectionOpacity(progress, 0.91, 1.0, 0.025);

  return (
    <div className="relative w-full h-[700vh] pointer-events-none font-sans-geo">
      {/* Sticky Fullscreen HUD & UI Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center px-6 md:px-12 pointer-events-none">

        {/* 1. [0% - 18%] HERO */}
        {op1 > 0 && (
          <div
            style={{ opacity: op1, transform: `translateY(${(1 - op1) * 20}px)` }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none px-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-950/40 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="text-xs font-medium text-cyan-300">
                Introducing Tilde Digital
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-normal max-w-4xl leading-tight">
              Transforming Asset{' '}
              <span className="font-editorial-italic italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400">
                Solutions
              </span>
            </h1>

            <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-xl font-light leading-relaxed">
              Institutional-grade digital asset infrastructure engineered for seamless liquidity, cross-border settlement, and high-frequency trading.
            </p>

            {/* Bottom-left dashboard preview card ($48,296,140 Volume) */}
            <div className="hidden md:flex absolute bottom-12 left-12 flex-col gap-2 p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] pointer-events-auto w-64 text-left">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Institutional Pool Volume</span>
                <span className="text-emerald-400 font-medium">+4.82%</span>
              </div>
              <div className="text-xl font-medium text-white font-mono">
                $48,296,140
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-white/5">
                <span>Spread: 0.01 bps</span>
                <span>Depth: Tier 1</span>
              </div>
            </div>

            {/* Bottom-right dashboard preview card (1.2 ms Latency) */}
            <div className="hidden md:flex absolute bottom-12 right-12 flex-col gap-2 p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] pointer-events-auto w-64 text-left">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Prime Execution Desk</span>
                <span className="text-cyan-400 font-medium">Active</span>
              </div>
              <div className="text-xl font-medium text-white font-mono">
                1.2 ms
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-white/5">
                <span>Direct FIX gateway</span>
                <span>Zero packet loss</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. [18% - 35%] CORPORATE INTRO & STARBURST TRANSITION */}
        {op2 > 0 && (
          <div
            style={{ opacity: op2, transform: `translateY(${(1 - op2) * 20}px)` }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none px-6"
          >
            <div className="max-w-3xl">
              <span className="text-xs font-medium text-cyan-400 mb-4 block">
                Corporate Overview
              </span>
              <p className="text-2xl sm:text-3xl md:text-4xl text-slate-200 font-light leading-relaxed">
                Tilde Digital Tech (TDT) is a leading fintech company offering digital asset solutions, recognized as a{' '}
                <span className="font-editorial-italic italic font-normal text-cyan-300">
                  leading provider
                </span>{' '}
                of global institutional trading infrastructure.
              </p>
              <p className="mt-6 text-sm sm:text-base text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
                Operating at the nexus of quantitative asset pricing, multi-venue liquidity routing, and cryptographic settlement guarantees.
              </p>
            </div>
          </div>
        )}

        {/* 3. [35% - 52%] WARP TUNNEL */}
        {op3 > 0 && (
          <div
            style={{ opacity: op3, transform: `scale(${0.95 + op3 * 0.05})` }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none px-6"
          >
            <div className="max-w-2xl">
              <span className="text-xs font-medium text-cyan-400 mb-3 block">
                Velocity & Execution
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight">
                Hyper-speed low latency execution
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-white/10 text-xs text-slate-300">
                  Sub-millisecond routing
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-white/10 text-xs text-slate-300">
                  Direct fiber POPs
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-white/10 text-xs text-slate-300">
                  Direct FIX 4.4 / WebSocket
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4. [52% - 66%] TRADING TERMINAL */}
        {op4 > 0 && (
          <div
            style={{ opacity: op4, transform: `translateY(${(1 - op4) * 20}px)` }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none px-6 pt-10"
          >
            <div className="mb-5">
              <span className="text-xs font-medium text-cyan-400 mb-2 block">
                Who we are
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white">
                Powerful{' '}
                <span className="font-editorial-italic italic font-normal text-cyan-300">
                  Trading Terminal
                </span>
              </h2>
            </div>

            {/* Realistic dark glass terminal mockup card */}
            <div className="w-full max-w-3xl rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto text-left">
              {/* Terminal Nav Header */}
              <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white font-mono">BTC/USD</span>
                    <span className="text-xs text-emerald-400 font-mono">$96,420.50</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>24h High: $98,100</span>
                    <span>24h Vol: $1.42B</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Feed</span>
                </div>
              </div>

              {/* Terminal Multi-Chart & Orderbook Content */}
              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 flex flex-col gap-3">
                  <div className="text-xs text-slate-400">Order Flow & Execution Depth</div>
                  <div className="h-36 w-full rounded-xl bg-slate-900/60 border border-white/5 p-3 flex flex-col justify-end">
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradTerm" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,70 Q60,30 120,55 T240,25 T340,40 T400,10 L400,100 L0,100 Z"
                        fill="url(#chartGradTerm)"
                      />
                      <path
                        d="M0,70 Q60,30 120,55 T240,25 T340,40 T400,10"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-xs text-slate-400">Depth Matrix</div>
                  <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                    <div className="flex justify-between text-rose-400/90">
                      <span>96,440.00</span>
                      <span>1.428 BTC</span>
                    </div>
                    <div className="flex justify-between text-rose-400/90">
                      <span>96,430.50</span>
                      <span>0.840 BTC</span>
                    </div>
                    <div className="flex justify-between text-emerald-400/90 pt-1 border-t border-white/5">
                      <span>96,420.50</span>
                      <span>2.115 BTC</span>
                    </div>
                    <div className="flex justify-between text-emerald-400/90">
                      <span>96,410.00</span>
                      <span>3.500 BTC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. [66% - 82%] ISOMETRIC PLATFORM */}
        {op5 > 0 && (
          <div
            style={{ opacity: op5, transform: `translateY(${(1 - op5) * 20}px)` }}
            className="absolute inset-0 flex flex-col justify-end items-end p-8 md:p-16 pointer-events-none text-right"
          >
            <div className="max-w-md pointer-events-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <span className="text-xs font-medium text-cyan-400 mb-2 block">
                White-glove Service
              </span>
              <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed">
                Experience high-touch / White-glove service with personalized support and expert guidance for your most complex digital asset needs.
              </p>
              <div className="mt-5 flex flex-wrap justify-end gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
                  Bespoke liquidity
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
                  Zero slippage
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
                  24/7 Dedicated desk
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 6. [82% - 91%] MULTI-CURRENCY MATRIX & MPC DATA WALL */}
        {op6A > 0 && (
          <div
            style={{ opacity: op6A, transform: `translateY(${(1 - op6A) * 20}px)` }}
            className="absolute inset-0 flex flex-col md:flex-row justify-between items-center px-8 md:px-20 pointer-events-none"
          >
            <div className="max-w-md text-left mb-6 md:mb-0">
              <span className="text-xs font-medium text-cyan-400 mb-2 block">
                Global Clearing
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight">
                Multi-
                <span className="font-editorial-italic italic font-normal text-cyan-300">
                  Currency
                </span>{' '}
                Settlement facilities
              </h2>
            </div>
            <div className="max-w-sm text-left md:text-right bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl">
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Direct on-ramp and off-ramp connectivity across USD, EUR, GBP, SGD, and major digital currencies with real-time atomic execution.
              </p>
            </div>
          </div>
        )}

        {op6B > 0 && (
          <div
            style={{ opacity: op6B, transform: `scale(${0.96 + op6B * 0.04})` }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none px-6"
          >
            <div className="max-w-3xl p-8 rounded-3xl bg-slate-950/70 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.2)]">
              <span className="text-xs font-medium text-cyan-400 mb-3 block">
                Cryptographic Security
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
                Institutional-grade settlement infrastructure powered by{' '}
                <span className="font-editorial-italic italic font-normal text-cyan-300">
                  MPC
                </span>{' '}
                technology
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-slate-400 font-light max-w-lg mx-auto">
                Multi-Party Computation eliminates single points of failure with threshold key generation and sub-second transaction validation.
              </p>
            </div>
          </div>
        )}

        {/* 7. [91% - 100%] ECLIPSE PORTAL CONTACT FORM */}
        {op7 > 0 && (
          <div
            style={{ opacity: op7, transform: `scale(${0.92 + op7 * 0.08})` }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none px-6"
          >
            {/* Centered HTML glass overlay framing 04_eclipse_portal_ring.glb */}
            <div className="relative w-[340px] sm:w-[460px] md:w-[500px] aspect-square rounded-full bg-[#030712]/90 border border-cyan-500/35 shadow-[0_0_80px_rgba(56,189,248,0.3),inset_0_0_60px_rgba(37,99,235,0.25)] flex flex-col justify-center items-center p-6 sm:p-10 pointer-events-auto">
              <span className="text-xs font-medium text-cyan-400 mb-1">
                Contact us
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-5">
                How can{' '}
                <span className="font-editorial-italic italic font-normal text-cyan-300">
                  we help?
                </span>
              </h2>

              {/* Minimalist dark glass inputs form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you! Our institutional desk will reach out shortly.');
                }}
                className="w-full max-w-sm flex flex-col gap-2.5 text-left"
              >
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    required
                    placeholder="E-mail"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Message"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all cursor-pointer"
                >
                  Contact us
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
