'use client';

import React, { useState } from 'react';
import { ShieldCheck, Layers, CheckCircle2 } from 'lucide-react';

export interface InventoryBufferEngineProps {
  id?: string;
  className?: string;
}

export default function InventoryBufferEngine({
  id = 'inventory-buffer-engine',
  className = '',
}: InventoryBufferEngineProps) {
  const [totalPool, setTotalPool] = useState<number>(3000);
  const [bufferPercent, setBufferPercent] = useState<number>(15);

  // Computed buffer and allocated quantities
  const safetyBufferUnits = Math.round((totalPool * bufferPercent) / 100);
  const availableToSell = totalPool - safetyBufferUnits;

  // Channel allocations (Amazon 40%, TikTok Shop 40%, Etsy 20%)
  const amazonUnits = Math.round(availableToSell * 0.4);
  const tiktokUnits = Math.round(availableToSell * 0.4);
  const etsyUnits = availableToSell - amazonUnits - tiktokUnits;

  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141718] border border-white/10 text-[#d3f9f5] text-xs sm:text-sm font-normal tracking-wider uppercase mb-4 font-montserrat">
            <Layers className="w-3.5 h-3.5 text-[#7ceee0]" aria-hidden="true" />
            Dynamic Multi-Channel Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#d3f9f5] font-montserrat leading-[1.2]">
            Multi-Channel Real-Time Inventory &amp; <span className="text-[#7ceee0] font-medium">Safety Buffer Engine</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
            When viral TikTok sales surge 10x overnight, our automated safety buffer protects your Amazon and Etsy accounts from stockout cancellations and algorithm de-ranking.
          </p>
        </div>

        {/* Engine Interactive Container */}
        <div className="rounded-[32px] bg-[#141718]/90 border border-[#262C30] p-6 sm:p-10 lg:p-12 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Controls Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="total-pool-slider" className="text-sm font-medium text-[#d3f9f5] font-montserrat">
                    Physical Blank Inventory in US Hubs
                  </label>
                  <span className="font-mono text-base font-medium text-[#7ceee0]">
                    {totalPool.toLocaleString()} units
                  </span>
                </div>
                <input
                  id="total-pool-slider"
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={totalPool}
                  onChange={(e) => setTotalPool(Number(e.target.value))}
                  aria-label="Physical Blank Inventory in US Hubs"
                  aria-valuemin={500}
                  aria-valuemax={10000}
                  aria-valuenow={totalPool}
                  aria-valuetext={`${totalPool.toLocaleString()} physical blanks in warehouse`}
                  className="w-full h-2 bg-[#1D2224] rounded-lg appearance-none cursor-pointer accent-[#7ceee0] focus:outline-none"
                />
                <div className="flex justify-between text-[11px] text-[#b3b3b3] font-mono mt-1">
                  <span>500 (Boutique)</span>
                  <span>5,000 (Growth)</span>
                  <span>10,000 (Enterprise)</span>
                </div>
              </div>

              {/* Safety Buffer Percent Selector */}
              <div>
                <span className="text-sm font-medium text-[#d3f9f5] font-montserrat block mb-2">
                  Safety Buffer Protection Threshold
                </span>
                <div
                  className="grid grid-cols-3 gap-2.5"
                  role="group"
                  aria-label="Safety Buffer Protection Threshold"
                >
                  {[10, 15, 20].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setBufferPercent(pct)}
                      aria-pressed={bufferPercent === pct}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold font-montserrat transition-all duration-200 border text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC] ${
                        bufferPercent === pct
                          ? 'bg-[#25E2CC]/15 border-[#25E2CC] text-[#25E2CC] shadow-[0_0_12px_rgba(37,226,204,0.2)]'
                          : 'bg-[#0A0D0E] border-[#262C30] text-[#8C8C8C] hover:text-white hover:border-[#8C8C8C]/50'
                      }`}
                    >
                      <span className="block font-bold">{pct}% Reserve</span>
                      <span className="text-[10px] text-[#8C8C8C] font-mono">
                        {pct === 10 ? 'Aggressive' : pct === 15 ? 'Balanced' : 'High Protection'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mechanism Explanation */}
              <div className="p-4 rounded-2xl bg-[#0A0D0E]/80 border border-[#262C30] text-xs font-montserrat text-[#8C8C8C] leading-relaxed space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
                  <span>Dynamic Safety Buffer Algorithm</span>
                </div>
                <p>
                  Eweb-platform holds <strong className="text-[#25E2CC]">{safetyBufferUnits.toLocaleString()} units</strong> as an unlisted safety reserve in the warehouse. If a viral spike instantly consumes inventory on TikTok Shop, the system auto-throttles downstream channels within 800ms before any overselling penalty triggers.
                </p>
              </div>
            </div>

            {/* Right Architecture & Output Column */}
            <div
              className="lg:col-span-6 bg-[#0A0D0E]/90 border border-[#262C30] rounded-[28px] p-6 sm:p-8 space-y-6"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#262C30]">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8C8C8C] font-semibold font-montserrat">
                    Live Channel Allocation Matrix
                  </span>
                  <h3 className="text-lg font-medium text-[#d3f9f5] font-montserrat mt-0.5">
                    Synchronized Virtual Queues
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Overselling Risk: 0.0%
                </span>
              </div>

              {/* Pool Breakdown Card */}
              <div className="grid grid-cols-2 gap-3 font-montserrat">
                <div className="p-3.5 rounded-xl bg-[#141718] border border-[#262C30]">
                  <span className="text-[11px] text-[#8C8C8C] uppercase block mb-1">
                    Safety Reserve (Unlisted)
                  </span>
                  <span className="text-2xl font-extrabold text-yellow-400 font-mono">
                    {safetyBufferUnits.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#8C8C8C] block mt-0.5">Holdback Buffer</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141718] border border-[#262C30]">
                  <span className="text-[11px] text-[#8C8C8C] uppercase block mb-1">
                    Active Available Stock
                  </span>
                  <span className="text-2xl font-extrabold text-[#25E2CC] font-mono">
                    {availableToSell.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#8C8C8C] block mt-0.5">Distributed to Channels</span>
                </div>
              </div>

              {/* 3 Channel Allocations */}
              <div className="space-y-3 font-montserrat text-xs">
                {/* TikTok Shop US */}
                <div className="p-3 rounded-xl bg-[#141718] border border-[#262C30] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25E2CC]" aria-hidden="true" />
                    <div>
                      <span className="text-white font-bold block">TikTok Shop US (40%)</span>
                      <span className="text-[10px] text-[#8C8C8C] font-mono">Viral sales fast lane</span>
                    </div>
                  </div>
                  <span className="text-base font-bold font-mono text-white">
                    {tiktokUnits.toLocaleString()} units
                  </span>
                </div>

                {/* Amazon FBM */}
                <div className="p-3 rounded-xl bg-[#141718] border border-[#262C30] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" aria-hidden="true" />
                    <div>
                      <span className="text-white font-bold block">Amazon FBM (40%)</span>
                      <span className="text-[10px] text-[#8C8C8C] font-mono">Prime-eligible orders</span>
                    </div>
                  </div>
                  <span className="text-base font-bold font-mono text-white">
                    {amazonUnits.toLocaleString()} units
                  </span>
                </div>

                {/* Etsy Global */}
                <div className="p-3 rounded-xl bg-[#141718] border border-[#262C30] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-400" aria-hidden="true" />
                    <div>
                      <span className="text-white font-bold block">Etsy Global (20%)</span>
                      <span className="text-[10px] text-[#8C8C8C] font-mono">Organic niche demand</span>
                    </div>
                  </div>
                  <span className="text-base font-bold font-mono text-white">
                    {etsyUnits.toLocaleString()} units
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
