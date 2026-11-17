'use client';

import React from 'react';
import { Globe, Send, Linkedin } from 'lucide-react';

interface HUDOverlayProps {
  progress: number;
}

export default function HUDOverlay({ progress }: HUDOverlayProps) {
  const percentage = Math.round(Math.min(100, Math.max(0, progress * 100)));

  return (
    <aside aria-label="HUD Navigation" className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-sans-geo select-none">
      {/* 1. TOP NAVBAR */}
      <header className="absolute top-0 left-0 right-0 px-6 py-5 md:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 pointer-events-auto cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <div className="w-full h-full bg-[#030712] rounded-[6px] flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-cyan-400"
              >
                <polygon
                  points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="rgba(56, 189, 248, 0.15)"
                />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>
          <span className="text-lg font-semibold text-white tracking-normal group-hover:text-cyan-400 transition-colors">
            TDA
          </span>
        </div>

        {/* Center Glassmorphic Pill Menu */}
        <nav className="hidden md:flex items-center gap-7 px-7 py-2.5 rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] pointer-events-auto">
          <a
            href="#solutions"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Solutions
          </a>
          <a
            href="#trade"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Trade with us
          </a>
          <a
            href="#about"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            About us
          </a>
          <a
            href="#contact"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Action Stack */}
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Language Selector */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>English</span>
          </button>

          {/* Log in */}
          <button
            type="button"
            className="text-sm text-slate-200 hover:text-white px-3.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            Log in
          </button>

          {/* Glowing Sign up Pill */}
          <button
            type="button"
            className="text-sm font-medium text-white px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(37,99,235,0.45)] hover:shadow-[0_0_28px_rgba(56,189,248,0.6)] cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </header>

      {/* 2. LEFT VERTICAL SCROLL INDICATOR */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3">
        <span className="text-[11px] font-mono text-cyan-400/90 font-medium">
          {percentage}%
        </span>
        <div className="w-1 h-36 bg-slate-800/80 rounded-full relative overflow-hidden backdrop-blur-sm">
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600 rounded-full transition-all duration-150"
            style={{ height: `${percentage}%` }}
          />
        </div>
        <div className="flex flex-col gap-1.5 opacity-60">
          <div className={`w-1 h-1 rounded-full ${percentage >= 15 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
          <div className={`w-1 h-1 rounded-full ${percentage >= 40 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
          <div className={`w-1 h-1 rounded-full ${percentage >= 70 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
          <div className={`w-1 h-1 rounded-full ${percentage >= 95 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
        </div>
      </div>

      {/* 3. RIGHT SOCIAL FLOATING STACK */}
      <div className="hidden sm:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-3 pointer-events-auto">
        {/* X / Twitter */}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter X"
          className="w-10 h-10 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all shadow-lg"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-10 h-10 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all shadow-lg"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* Telegram / Mail */}
        <a
          href="https://telegram.org"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="w-10 h-10 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all shadow-lg"
        >
          <Send className="w-4 h-4" />
        </a>
      </div>

      {/* 4. BOTTOM-RIGHT HINT */}
      <div className="fixed right-8 bottom-8 flex items-center gap-2.5 text-xs text-slate-400 font-sans-geo pointer-events-auto">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="text-slate-400/90 font-light">Scroll to explore</span>
      </div>
    </aside>
  );
}
