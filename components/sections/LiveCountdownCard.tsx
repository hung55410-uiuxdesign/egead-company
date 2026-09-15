'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export interface LiveCountdownCardProps {
  className?: string;
}

export default function LiveCountdownCard({ className = '' }: LiveCountdownCardProps) {
  // Simulated dynamic countdown seconds
  const [secondsRemaining, setSecondsRemaining] = useState<number>(23 * 3600 + 58 * 60 + 42);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 24 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(secondsRemaining / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsRemaining % 60).padStart(2, '0');

  return (
    <div
      className={`w-full rounded-[32px] bg-[#141718]/95 border border-[#262C30] p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-[#262C30] mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#10E774] animate-spin motion-reduce:animate-none" style={{ animationDuration: '6s' }} aria-hidden="true" />
          <span className="text-xs uppercase tracking-widest font-bold text-white font-montserrat">
            24-Hour Production SLA Clock
          </span>
        </div>
        <span className="text-[10px] font-montserrat font-bold bg-[#10E774]/10 text-[#10E774] px-2.5 py-1 rounded-full border border-[#10E774]/20">
          Carrier SLA: Active
        </span>
      </div>

      {/* Countdown Visual Digits */}
      <div className="text-center py-4 bg-[#0A0D0E]/90 rounded-2xl border border-[#262C30] mb-6">
        <span className="text-[11px] uppercase tracking-wider text-[#8C8C8C] font-montserrat block mb-1">
          Guaranteed Carrier Origin Scan Window
        </span>
        <time
          dateTime={`PT${hours}H${minutes}M${seconds}S`}
          aria-label={`${hours} hours, ${minutes} minutes, and ${seconds} seconds remaining`}
          className="text-4xl sm:text-5xl font-extrabold text-[#10E774] font-montserrat tracking-wider drop-shadow-[0_0_20px_rgba(16, 231, 116, 0.3)] block"
        >
          {hours}:{minutes}:{seconds}
        </time>
        <span className="text-[10px] text-emerald-400 font-montserrat mt-1 inline-block">
          ● Target: Same-Day Domestic Hand-Off
        </span>
      </div>

      {/* 3 Step Timeline Milestones */}
      <div className="space-y-3 font-montserrat text-xs">
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A0D0E]/60 border border-[#262C30]">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
            <span className="text-white font-semibold">08:00 AM • Order Ingestion</span>
          </div>
          <span className="text-[11px] text-[#8C8C8C] font-montserrat">Webhook Pull</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A0D0E]/60 border border-[#262C30]">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
            <span className="text-white font-semibold">11:30 AM • 23&quot; DTF Printed</span>
          </div>
          <span className="text-[11px] text-[#8C8C8C] font-montserrat">Roll Cured</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-[#10E774]/10 border border-[#10E774]/30">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
            <span className="text-white font-bold">03:45 PM • Carrier Physical Scan</span>
          </div>
          <span className="text-[11px] text-[#10E774] font-montserrat font-bold">USPS / UPS</span>
        </div>
      </div>

      {/* TikTok Protection Tag */}
      <div className="mt-6 pt-4 border-t border-[#262C30] flex items-center justify-between text-xs text-[#8C8C8C] font-montserrat">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10E774]" aria-hidden="true" />
          TikTok Shop US Compliance
        </span>
        <span className="font-montserrat text-[11px] text-emerald-400 font-semibold">
          LDR: 0.18%
        </span>
      </div>
    </div>
  );
}
