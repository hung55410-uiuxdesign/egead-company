'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export interface AddressDemoProps {
  id?: string;
  className?: string;
}

const sampleCases = [
  {
    id: 'missing-zip',
    title: 'Incomplete Zip & Abbreviation',
    raw: {
      name: 'jhn smth',
      street: 'apt 4b 125 n main st',
      city: 'new york',
      state: 'ny',
      zip: '1000',
      risk: '92% RTO Risk',
    },
    sanitized: {
      name: 'John Smith',
      street: '125 N Main St Apt 4B',
      city: 'New York',
      state: 'NY',
      zipPlus4: '10001-2834',
      carrierRoute: 'C012',
      validation: 'USPS DPV Confirmed Delivery Point',
      risk: '0.1% (Safe)',
    },
  },
  {
    id: 'unformatted-address',
    title: 'Typo in Street & City',
    raw: {
      name: 'emily rodriguz',
      street: '742 evergreen terrce',
      city: 'spriengfield',
      state: 'oregon',
      zip: '97477',
      risk: '84% RTO Risk',
    },
    sanitized: {
      name: 'Emily Rodriguez',
      street: '742 Evergreen Ter',
      city: 'Springfield',
      state: 'OR',
      zipPlus4: '97477-5246',
      carrierRoute: 'R004',
      validation: 'USPS CASS Standardized & Corrected',
      risk: '0.2% (Safe)',
    },
  },
  {
    id: 'missing-suite',
    title: 'Missing Suite / Unit Number',
    raw: {
      name: 'marcus vance',
      street: '1600 amphitheatre pkwy bldg 43',
      city: 'mountain view',
      state: 'ca',
      zip: '94043',
      risk: '76% RTO Risk',
    },
    sanitized: {
      name: 'Marcus Vance',
      street: '1600 Amphitheatre Pkwy Bldg 43',
      city: 'Mountain View',
      state: 'CA',
      zipPlus4: '94043-1351',
      carrierRoute: 'C031',
      validation: 'USPS Commercial Drop Point Validated',
      risk: '0.1% (Safe)',
    },
  },
];

export default function AddressDemo({ id = 'ai-address-normalization', className = '' }: AddressDemoProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(sampleCases[0].id);
  const activeCase = sampleCases.find((c) => c.id === selectedCaseId) || sampleCases[0];

  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
            Proprietary AI Algorithm
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            Watch AI <span className="text-[#5EFC8D] font-medium">Sanitize &amp; Fix</span> Addresses in 35ms
          </h2>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
            Over 80% of Return-To-Origin (RTO) returns stem from customer typos, missing Zip+4 codes, and abbreviations. Eweb-character resolves them before print production begins.
          </p>
        </div>

        {/* Case Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10" role="group" aria-label="Select address test scenario">
          {sampleCases.map((sc) => {
            const isActive = sc.id === activeCase.id;
            return (
              <button
                key={sc.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCaseId(sc.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-montserrat transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${
                  isActive
                    ? 'bg-[#10E774] text-black border-[#10E774] shadow-[0_0_20px_rgba(16, 231, 116, 0.3)]'
                    : 'bg-[#141718] text-[#8C8C8C] border-[#262C30] hover:text-white hover:border-[#10E774]/40'
                }`}
              >
                {sc.title}
              </button>
            );
          })}
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left: Raw Marketplace Input (Hazardous) */}
          <div className="rounded-[28px] bg-[#141718]/90 border border-red-500/30 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-[0_0_30px_rgba(239,68,68,0.06)]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#262C30] mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="text-xs uppercase font-bold tracking-wider text-red-400 font-montserrat">
                    Raw Marketplace Payload
                  </span>
                </div>
                <span className="text-[10px] font-montserrat font-bold bg-red-500/10 text-red-400 px-2.5 py-1 rounded border border-red-500/20">
                  {activeCase.raw.risk}
                </span>
              </div>

              <div className="space-y-4 font-montserrat text-sm">
                <div>
                  <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">Customer Name</span>
                  <div className="text-red-300/90 font-medium bg-[#101416] p-2.5 rounded-xl border border-[#262C30]">
                    {activeCase.raw.name}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">Street Line</span>
                  <div className="text-red-300/90 font-medium bg-[#101416] p-2.5 rounded-xl border border-[#262C30]">
                    {activeCase.raw.street}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">City</span>
                    <div className="text-red-300/90 font-medium bg-[#101416] p-2.5 rounded-xl border border-[#262C30]">
                      {activeCase.raw.city}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">State</span>
                    <div className="text-red-300/90 font-medium bg-[#101416] p-2.5 rounded-xl border border-[#262C30]">
                      {activeCase.raw.state}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">ZIP</span>
                    <div className="text-red-300/90 font-medium bg-[#101416] p-2.5 rounded-xl border border-red-500/40 text-red-400">
                      {activeCase.raw.zip}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#262C30] flex items-center gap-2 text-xs text-red-400 font-montserrat">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>Likely USPS return to sender if printed without sanitization.</span>
            </div>
          </div>

          {/* Right: AI Sanitized Output (Clean) */}
          <div
            className="rounded-[28px] bg-[#141718]/90 border border-[#10E774]/40 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-[0_0_35px_rgba(16, 231, 116, 0.1)]"
            aria-live="polite"
            aria-atomic="true"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#262C30] mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10E774] animate-pulse" />
                  <span className="text-xs uppercase font-bold tracking-wider text-[#10E774] font-montserrat">
                    Eweb-character AI Sanitized
                  </span>
                </div>
                <span className="text-[10px] font-montserrat font-bold bg-[#10E774]/10 text-[#10E774] px-2.5 py-1 rounded border border-[#10E774]/20">
                  Latency: 35ms
                </span>
              </div>

              <div className="space-y-4 font-montserrat text-sm">
                <div>
                  <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">Normalized Name</span>
                  <div className="text-white font-medium bg-[#0A0D0E] p-2.5 rounded-xl border border-[#262C30] flex items-center justify-between">
                    <span>{activeCase.sanitized.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">Standardized Street</span>
                  <div className="text-white font-medium bg-[#0A0D0E] p-2.5 rounded-xl border border-[#262C30] flex items-center justify-between">
                    <span>{activeCase.sanitized.street}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">City</span>
                    <div className="text-white font-medium bg-[#0A0D0E] p-2.5 rounded-xl border border-[#262C30]">
                      {activeCase.sanitized.city}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">State</span>
                    <div className="text-white font-medium bg-[#0A0D0E] p-2.5 rounded-xl border border-[#262C30]">
                      {activeCase.sanitized.state}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase text-[#8C8C8C] block font-montserrat">ZIP+4</span>
                    <div className="text-[#10E774] font-bold bg-[#0A0D0E] p-2.5 rounded-xl border border-[#10E774]/40">
                      {activeCase.sanitized.zipPlus4}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#10E774]/10 border border-[#10E774]/20 text-xs font-montserrat space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#8C8C8C]">Carrier Route:</span>
                    <span className="text-white font-montserrat font-bold">{activeCase.sanitized.carrierRoute}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8C8C]">Verification:</span>
                    <span className="text-[#10E774] font-medium">{activeCase.sanitized.validation}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#262C30] flex items-center justify-between text-xs text-[#10E774] font-montserrat">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                Auto-approved for instant print queue
              </span>
              <span className="font-montserrat text-[11px] text-emerald-400">
                Risk: {activeCase.sanitized.risk}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
