'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, TrendingUp, ShieldCheck, Clock, DollarSign } from 'lucide-react';

export interface MarginSimulatorProps {
  id?: string;
  className?: string;
}

const channels = [
  { id: 'tiktok', name: 'TikTok Shop US', ldrThreshold: '4%' },
  { id: 'amazon', name: 'Amazon FBM', ldrThreshold: 'VTR 95%' },
  { id: 'etsy', name: 'Etsy Global', ldrThreshold: 'Star Seller' },
  { id: 'shopify', name: 'Shopify DTC', ldrThreshold: 'Direct API' },
];

export default function MarginSimulator({
  id = 'margin-simulator',
  className = '',
}: MarginSimulatorProps) {
  const [orderVolume, setOrderVolume] = useState<number>(1500);
  const [selectedChannel, setSelectedChannel] = useState<string>('tiktok');

  // Realistic operational metrics calculations
  const hoursSaved = Math.round(orderVolume * 0.028); // ~42 hrs at 1,500 orders
  const rtoDollarsSaved = Math.round(orderVolume * 0.84); // ~$1,260 at 1,500 orders
  const projectedGMV = Math.round(orderVolume * 28.5); // Average $28.5 AOV
  const currentChannel = channels.find((c) => c.id === selectedChannel) || channels[0];

  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#10E774]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
            ROI &amp; Efficiency Simulator
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            Estimate Your <span className="text-[#5EFC8D] font-medium">Operational Freedom</span>
          </h2>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
            Calculate exactly how much manual spreadsheet labor, RTO penalties, and lost SLA revenue you eliminate by running on E-GEAD.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="rounded-[32px] bg-[#141718]/90 border border-[#262C30] p-8 sm:p-10 lg:p-12 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Controls */}
            <div className="lg:col-span-6 space-y-8">
              {/* Channel Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#8C8C8C] mb-3 font-montserrat">
                  Primary Sales Channel
                </label>
                <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="Select sales channel">
                  {channels.map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      aria-pressed={selectedChannel === ch.id}
                      onClick={() => setSelectedChannel(ch.id)}
                      className={`p-3 rounded-xl text-xs sm:text-sm font-bold font-montserrat transition-all duration-200 border text-left flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${ selectedChannel === ch.id ?'bg-[#10E774]/15 border-[#10E774] text-white shadow-[0_0_15px_rgba(16, 231, 116, 0.15)]'
                          : 'bg-[#101416] border-[#262C30] text-[#8C8C8C] hover:text-white hover:border-[#262C30]/80'
                      }`}
                    >
                      <span>{ch.name}</span>
                      <span className="text-[10px] text-[#10E774] font-montserrat mt-1">
                        SLA Req: {ch.ldrThreshold}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Volume Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="volume-slider" className="text-xs font-medium text-[#b3b3b3] font-montserrat">
                    Monthly Order Volume
                  </label>
                  <span className="text-2xl font-medium text-[#5EFC8D] font-montserrat">
                    {orderVolume.toLocaleString('en-US')}{' '}
                    <span className="text-xs text-[#b3b3b3] font-light">orders/mo</span>
                  </span>
                </div>

                <input
                  id="volume-slider"
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={orderVolume}
                  aria-valuetext={`${orderVolume.toLocaleString('en-US')} orders per month`}
                  onChange={(e) => setOrderVolume(Number(e.target.value))}
                  className="w-full h-2 bg-[#1D2224] rounded-lg appearance-none cursor-pointer accent-[#10E774] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]"
                  aria-label="Monthly Order Volume"
                />

                <div className="flex justify-between text-[11px] text-[#8C8C8C] font-montserrat mt-2">
                  <span>100 orders</span>
                  <span>2,500 orders</span>
                  <span>5,000 orders</span>
                  <span>10,000+ orders</span>
                </div>
              </div>

              {/* Callout Quote */}
              <div className="p-4 rounded-2xl bg-[#101416] border border-[#262C30] text-xs sm:text-sm text-[#D4FAE6]/90 font-montserrat leading-relaxed">
                <span className="text-[#10E774] font-bold">Verified Benchmark: </span>
                Sellers handling {orderVolume.toLocaleString('en-US')} monthly orders on {currentChannel.name} save an estimated{' '}
                <strong className="text-white">{hoursSaved} operational hours</strong> and{' '}
                <strong className="text-white">${rtoDollarsSaved.toLocaleString('en-US')} in avoided RTO penalties</strong> every month.
              </div>
            </div>

            {/* Right: Real-time Output Dashboard */}
            <div
              className="lg:col-span-6 bg-[#0A0D0E]/80 border border-[#262C30] rounded-[24px] p-6 sm:p-8 space-y-6"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#262C30]">
                <div>
                  <span className="text-xs text-[#b3b3b3] font-normal font-montserrat">
                    Projected Savings &amp; Health
                  </span>
                  <h3 className="text-lg font-medium text-[#D4FAE6] font-montserrat mt-0.5">
                    Monthly Efficiency Metrics
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#5EFC8D]/10 text-[#5EFC8D] text-[11px] font-medium font-montserrat">
                  SLA Active
                </span>
              </div>

              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Hours Saved */}
                <div className="p-4 rounded-xl bg-[#141718] border border-white/10">
                  <div className="flex items-center gap-2 text-[#5EFC8D] mb-1">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span className="text-xs font-medium font-montserrat">Time Saved</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-medium text-[#D4FAE6] font-montserrat">
                    {hoursSaved} <span className="text-sm font-light text-[#b3b3b3]">hrs/mo</span>
                  </div>
                  <p className="text-[11px] text-[#b3b3b3] mt-1 font-montserrat font-light">
                    Eliminated CSV exports &amp; manual tracking
                  </p>
                </div>

                {/* RTO Dollars Saved */}
                <div className="p-4 rounded-xl bg-[#141718] border border-white/10">
                  <div className="flex items-center gap-2 text-[#5EFC8D] mb-1">
                    <DollarSign className="w-4 h-4" aria-hidden="true" />
                    <span className="text-xs font-medium font-montserrat">RTO Avoided</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-medium text-[#5EFC8D] font-montserrat">
                    ${rtoDollarsSaved.toLocaleString('en-US')}
                  </div>
                  <p className="text-[11px] text-[#b3b3b3] mt-1 font-montserrat font-light">
                    Via AI USPS address normalization
                  </p>
                </div>

                {/* Late Dispatch Rate */}
                <div className="p-4 rounded-xl bg-[#141718] border border-white/10">
                  <div className="flex items-center gap-2 text-[#5EFC8D] mb-1">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    <span className="text-xs font-medium font-montserrat">Late Dispatch</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-medium text-[#D4FAE6] font-montserrat">
                    0.0%
                  </div>
                  <p className="text-[11px] text-[#b3b3b3] mt-1 font-montserrat font-light">
                    Sub-24H domestic carrier injection
                  </p>
                </div>

                {/* Projected GMV Pipeline */}
                <div className="p-4 rounded-xl bg-[#141718] border border-white/10">
                  <div className="flex items-center gap-2 text-[#5EFC8D] mb-1">
                    <TrendingUp className="w-4 h-4" aria-hidden="true" />
                    <span className="text-xs font-medium font-montserrat">Monthly GMV</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-medium text-[#D4FAE6] font-montserrat">
                    ${projectedGMV.toLocaleString('en-US')}
                  </div>
                  <p className="text-[11px] text-[#b3b3b3] mt-1 font-montserrat font-light">
                    Estimated throughput volume
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href="/contact-us"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#5EFC8D] text-black font-medium text-sm font-montserrat hover:bg-[#4ee37e] transition-all duration-200 shadow-[0_0_20px_rgba(94, 252, 141, 0.3)] hover:scale-[1.02] focus:outline-none"
                >
                  <span>Lock In Your $6 All-In Base Rate</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
