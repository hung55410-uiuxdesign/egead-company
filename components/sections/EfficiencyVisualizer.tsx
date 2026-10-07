'use client';

import React, { useState, useId } from 'react';
import { TrendingUp, Clock, DollarSign, Users, ArrowRight } from 'lucide-react';

export interface EfficiencyVisualizerProps {
  id?: string;
  className?: string;
  initialVolume?: number;
}

const PRESET_VOLUMES = [1000, 4000, 10000, 20000];

export function EfficiencyVisualizer({
  id = 'efficiency-visualizer',
  className = '',
  initialVolume = 4000,
}: EfficiencyVisualizerProps) {
  const [volume, setVolume] = useState<number>(initialVolume);
  const sliderId = useId();

  // Financial model calculations
  // Traditional: 1 full-time ops coordinator per 2,000 orders ($3,200/mo) + manual error/RTO costs ($0.45/order)
  const traditionalFteCount = Math.max(1, Math.ceil(volume / 2000));
  const traditionalStaffCost = traditionalFteCount * 3200;
  const traditionalErrorFrictionCost = Math.round(volume * 0.48);
  const traditionalTotalCost = traditionalStaffCost + traditionalErrorFrictionCost;

  // E-GEAD Automated Infrastructure: 0 manual FTEs needed for routing, automated CASS checks, $0.20/order flat efficiency cost
  const egeadCost = Math.round(volume * 0.22);
  
  // Net savings and reclaimed metrics
  const netMonthlySavings = Math.max(0, traditionalTotalCost - egeadCost);
  const netAnnualSavings = netMonthlySavings * 12;
  const hoursSavedPerMonth = Math.round(volume * 0.042); // ~4.2 mins saved per manual order processed

  // Ratio comparison (clamped for visual progress bars)
  const maxCost = Math.max(traditionalTotalCost, 1);
  const traditionalBarPercent = 100;
  const egeadBarPercent = Math.min(100, Math.max(8, Math.round((egeadCost / maxCost) * 100)));

  return (
    <div
      id={id}
      role="region"
      aria-label="Operational Efficiency & Headcount Savings Visualizer"
      className={`relative w-full rounded-[36px] bg-[#141718] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden ${className}`}
    >
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute -top-24 -right-24 w-96 h-96 bg-[#10E774]/10 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Header & Description */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div className="max-w-2xl">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
            Interactive Scale Simulator
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat leading-[1.3] tracking-tight">
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              Calculate Headcount &amp; Cost Savings
            </span>
          </h3>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
            Drag the slider to your current or target monthly order volume. See how E-GEAD eliminates the traditional headcount scaling trap through pure automation.
          </p>
        </div>

        {/* Live Region for Screen Readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          At {volume.toLocaleString()} orders per month, traditional operational cost is ${traditionalTotalCost.toLocaleString()} per month, E-GEAD automated cost is ${egeadCost.toLocaleString()} per month, yielding net monthly savings of ${netMonthlySavings.toLocaleString()} and reclaiming {hoursSavedPerMonth.toLocaleString()} human hours.
        </div>
      </div>

      {/* Main Interactive Controls & Metrics */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8 items-start">
        
        {/* Left Column: Volume Slider & Quick Presets (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="bg-[#0A0D0E]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <label 
                htmlFor={sliderId} 
                className="text-sm font-semibold text-gray-300 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                Monthly Order Volume
              </label>
              <span className="text-2xl sm:text-3xl font-montserrat font-black text-[#10E774]">
                {volume.toLocaleString()} <span className="text-sm font-sans font-medium text-gray-400">orders/mo</span>
              </span>
            </div>

            {/* Custom Styled Accessible Slider */}
            <div className="relative py-3">
              <input
                id={sliderId}
                type="range"
                min={500}
                max={20000}
                step={500}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Monthly Order Volume"
                aria-valuemin={500}
                aria-valuemax={20000}
                aria-valuenow={volume}
                aria-valuetext={`${volume.toLocaleString()} orders per month`}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#10E774] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141718]"
              />
            </div>

            {/* Scale End Labels */}
            <div className="flex justify-between text-xs font-montserrat text-gray-500 mt-1">
              <span>500 orders</span>
              <span>5,000</span>
              <span>10,000</span>
              <span>20,000 orders</span>
            </div>

            {/* Preset Volume Buttons */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-400 mr-2">Quick Presets:</span>
              {PRESET_VOLUMES.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setVolume(preset)}
                  aria-pressed={volume === preset}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-montserrat font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${ volume === preset ?'bg-[#10E774] text-black shadow-lg shadow-[#10E774]/25 font-bold'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {preset.toLocaleString()}/mo
                </button>
              ))}
            </div>
          </div>

          {/* Visual Cost Comparison Progress Bars */}
          <div className="bg-[#0A0D0E]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5">
            <h4 className="text-xs font-montserrat text-gray-400">
              Monthly Operational Cost Comparison
            </h4>

            {/* Traditional Ops Bar */}
            <div>
              <div className="flex justify-between items-center text-xs font-montserrat mb-1.5">
                <span className="text-rose-300 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-rose-500" aria-hidden="true" />
                  Legacy Headcount & Manual Routing ({traditionalFteCount} FTE)
                </span>
                <span className="text-rose-300 font-bold">${traditionalTotalCost.toLocaleString()}/mo</span>
              </div>
              <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${traditionalBarPercent}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* E-GEAD Automated Bar */}
            <div>
              <div className="flex justify-between items-center text-xs font-montserrat mb-1.5">
                <span className="text-[#10E774] flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#10E774]" aria-hidden="true" />
                  E-GEAD Automated Infrastructure (0 FTEs Needed)
                </span>
                <span className="text-[#10E774] font-bold">${egeadCost.toLocaleString()}/mo</span>
              </div>
              <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-[#10E774] to-cyan-300 rounded-full transition-all duration-300 motion-reduce:transition-none shadow-sm shadow-[#10E774]/50"
                  style={{ width: `${egeadBarPercent}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>
            
            <p className="text-xs text-gray-400 font-normal leading-relaxed pt-2">
              *Traditional model includes base salary for operations managers ($3,200/mo per 2,000 orders), plus labor spent re-typing addresses, fixing CSV sync failures, and managing customer claims.
            </p>
          </div>
        </div>

        {/* Right Column: ROI & Impact Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Main Net Savings Highlight Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#10E774]/15 via-[#1A2224] to-[#0A0D0E] border border-[#10E774]/40 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div 
              aria-hidden="true" 
              className="absolute top-0 right-0 w-32 h-32 bg-[#10E774]/20 rounded-full blur-2xl pointer-events-none" 
            />
            
            <div className="flex items-center gap-2 text-xs font-montserrat font-bold text-[#10E774] mb-2">
              <DollarSign className="w-4 h-4" aria-hidden="true" />
              Net Monthly Cash Saved
            </div>
            
            <div className="text-4xl sm:text-5xl font-montserrat font-black text-white">
              ${netMonthlySavings.toLocaleString()}
              <span className="text-lg font-sans font-medium text-gray-400">/mo</span>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-montserrat">
              <span className="text-gray-400">Projected Annual Savings:</span>
              <span className="text-[#10E774] font-bold text-sm">
                +${netAnnualSavings.toLocaleString()}/yr
              </span>
            </div>
          </div>

          {/* Time & Labor Reclaimed Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Hours Reclaimed */}
            <div className="rounded-2xl bg-[#0A0D0E]/80 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-montserrat text-gray-400 mb-2">
                <Clock className="w-3.5 h-3.5 text-[#10E774]" aria-hidden="true" />
                Human Hours Reclaimed
              </div>
              <div className="text-2xl sm:text-3xl font-montserrat font-black text-white">
                {hoursSavedPerMonth.toLocaleString()}
                <span className="text-xs font-sans text-gray-400 ml-1">hrs/mo</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-2 font-normal">
                Reallocated to product design & ad creatives.
              </div>
            </div>

            {/* FTE Team Avoidance */}
            <div className="rounded-2xl bg-[#0A0D0E]/80 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-montserrat text-gray-400 mb-2">
                <Users className="w-3.5 h-3.5 text-[#10E774]" aria-hidden="true" />
                Headcount Avoidance
              </div>
              <div className="text-2xl sm:text-3xl font-montserrat font-black text-white">
                {traditionalFteCount}
                <span className="text-xs font-sans text-gray-400 ml-1">Ops FTEs</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-2 font-normal">
                Zero payroll overhead or HR recruitment cycles.
              </div>
            </div>

          </div>

          {/* Direct CTA link */}
          <div className="pt-2">
            <a
              href="#work-cta"
              className="inline-flex items-center justify-between w-full px-6 py-4 rounded-xl bg-white/5 hover:bg-[#10E774]/15 border border-white/10 hover:border-[#10E774]/40 text-white font-semibold text-sm transition-all duration-300 group"
            >
              <span>Unlock these savings in your store</span>
              <ArrowRight className="w-4 h-4 text-[#10E774] group-hover:translate-x-1 transition-transform motion-reduce:transform-none" aria-hidden="true" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
