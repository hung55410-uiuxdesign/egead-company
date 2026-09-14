'use client';

import React, { useState } from 'react';
import { TrendingDown, TrendingUp, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export interface TransformationMetric {
  id: string;
  category: 'sla' | 'cost' | 'marketing' | 'all';
  metricName: string;
  metricLabel: string;
  beforeValue: string;
  beforeContext: string;
  afterValue: string;
  afterContext: string;
  deltaPercent: string;
  trendType: 'decrease-positive' | 'increase-positive';
  impactStatement: string;
}

export interface TransformationMatrixProps {
  id?: string;
  className?: string;
  title?: string;
  description?: string;
}

const METRICS_DATA: TransformationMetric[] = [
  {
    id: 'tiktok-ldr',
    category: 'sla',
    metricName: 'TikTok Shop Late Dispatch Rate (LDR)',
    metricLabel: 'Dispatch SLA',
    beforeValue: '4.5%',
    beforeContext: 'Critical Risk · Algorithmic Throttle',
    afterValue: '0.2%',
    afterContext: 'SLA Shield · Fast Dispatch Badge',
    deltaPercent: '-95.5%',
    trendType: 'decrease-positive',
    impactStatement: 'Eliminates seller account suspension risk and protects unrestricted daily sales volume.',
  },
  {
    id: 'manual-csv-hours',
    category: 'cost',
    metricName: 'Weekly Hours on Manual CSVs & Routing',
    metricLabel: 'Labor Friction',
    beforeValue: '18.5 hrs/wk',
    beforeContext: 'Daily manual file uploads & edits',
    afterValue: '1.2 hrs/wk',
    afterContext: 'Automated webhook sync & exception log',
    deltaPercent: '-93.5%',
    trendType: 'decrease-positive',
    impactStatement: 'Reclaims over 70 hours each month, allowing founders to focus purely on creatives and ROAS.',
  },
  {
    id: 'address-rto',
    category: 'sla',
    metricName: 'Address-Related Return to Origin (RTO)',
    metricLabel: 'Postal Accuracy',
    beforeValue: '6.8%',
    beforeContext: 'Failed carrier delivery & double shipping',
    afterValue: '0.9%',
    afterContext: 'AI CASS pre-dispatch verification',
    deltaPercent: '-86.8%',
    trendType: 'decrease-positive',
    impactStatement: 'Saves thousands in dead garment inventory and carrier reshipment charges across US postal zones.',
  },
  {
    id: 'blended-roas',
    category: 'marketing',
    metricName: 'Blended Advertising ROAS (Meta & TikTok)',
    metricLabel: 'Capital Efficiency',
    beforeValue: '2.1x',
    beforeContext: 'Break-even boundary · Margin pressure',
    afterValue: '4.8x',
    afterContext: 'Confident scaling past $25K/day',
    deltaPercent: '+128.6%',
    trendType: 'increase-positive',
    impactStatement: 'Enables high-margin customer acquisition fueled by sub-24h fulfillment proof in ad comments.',
  },
];

export function TransformationMatrix({
  id = 'transformation-matrix',
  className = '',
  title = 'Quantitative Transformation Matrix',
  description = 'Direct empirical performance comparison across our client portfolio before and after implementing E-GEAD automated logistics.',
}: TransformationMatrixProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sla' | 'cost' | 'marketing'>('all');

  const filteredMetrics = activeCategory === 'all'
    ? METRICS_DATA
    : METRICS_DATA.filter((m) => m.category === activeCategory);

  return (
    <div
      id={id}
      role="region"
      aria-label="Quantitative Before-vs-After Transformation Matrix"
      className={`w-full rounded-[36px] bg-[#141718] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden ${className}`}
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25E2CC]/10 border border-[#25E2CC]/25 text-[#25E2CC] text-xs font-mono font-medium uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            Verified Empirical Data
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-2xl font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Filter Buttons */}
        <div 
          role="group" 
          aria-label="Filter transformation metrics by category"
          className="flex flex-wrap gap-2"
        >
          {[
            { key: 'all', label: 'All Indicators' },
            { key: 'sla', label: 'SLA & Logistics' },
            { key: 'cost', label: 'Labor & Ops' },
            { key: 'marketing', label: 'ROAS & Scale' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key as any)}
              aria-pressed={activeCategory === cat.key}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC] ${
                activeCategory === cat.key
                  ? 'bg-[#25E2CC] text-black font-bold shadow-md shadow-[#25E2CC]/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Screen reader live notification */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Showing {filteredMetrics.length} transformation metrics for category {activeCategory}.
      </div>

      {/* Responsive Table Container */}
      <div className="mt-8 overflow-x-auto">
        <table 
          role="table" 
          aria-label="Before versus After E-GEAD Implementation Matrix"
          className="w-full text-left border-collapse min-w-[720px]"
        >
          <thead>
            <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider text-gray-400">
              <th scope="col" className="py-4 pr-6 font-semibold w-2/5">
                Key Performance Indicator
              </th>
              <th scope="col" className="py-4 px-4 font-semibold text-rose-300 w-1/5">
                Before E-GEAD (Legacy)
              </th>
              <th scope="col" className="py-4 px-4 font-semibold text-[#25E2CC] w-1/5">
                With E-GEAD (Automated)
              </th>
              <th scope="col" className="py-4 pl-4 font-semibold text-right w-1/5">
                Measurable Impact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredMetrics.map((item) => {
              const isPositiveTrend = true; // All our deltas represent positive outcomes

              return (
                <tr 
                  key={item.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Metric Name & Operational Impact */}
                  <th scope="row" className="py-5 pr-6 font-normal">
                    <div className="font-semibold text-white group-hover:text-[#25E2CC] transition-colors">
                      {item.metricName}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-normal leading-relaxed">
                      {item.impactStatement}
                    </div>
                  </th>

                  {/* Before Column */}
                  <td className="py-5 px-4 align-top">
                    <div className="inline-flex items-center gap-1.5 font-mono text-base font-bold text-rose-300">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
                      <span>{item.beforeValue}</span>
                    </div>
                    <div className="text-xs text-rose-200/70 mt-1 font-sans">
                      {item.beforeContext}
                    </div>
                  </td>

                  {/* After Column */}
                  <td className="py-5 px-4 align-top">
                    <div className="inline-flex items-center gap-1.5 font-mono text-base font-bold text-[#25E2CC]">
                      <ShieldCheck className="w-4 h-4 text-[#25E2CC] shrink-0" aria-hidden="true" />
                      <span>{item.afterValue}</span>
                    </div>
                    <div className="text-xs text-[#25E2CC]/80 mt-1 font-sans font-medium">
                      {item.afterContext}
                    </div>
                  </td>

                  {/* Improvement Delta Badge */}
                  <td className="py-5 pl-4 align-top text-right">
                    <span 
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-mono text-xs font-bold ${
                        item.trendType === 'decrease-positive'
                          ? 'bg-[#25E2CC]/15 text-[#25E2CC] border border-[#25E2CC]/30'
                          : 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/30'
                      }`}
                    >
                      {item.trendType === 'decrease-positive' ? (
                        <TrendingDown className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <TrendingUp className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      )}
                      <span>{item.deltaPercent}</span>
                    </span>
                    <span className="sr-only">
                      {item.trendType === 'decrease-positive' ? 'reduction of' : 'increase of'} {item.deltaPercent}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer verification note */}
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-500 font-mono">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
          <span>Verified against 2024–2026 TikTok Shop US Seller Center & Shopify Analytics</span>
        </div>
        <span>Sample Size: 100+ Cross-Border Merchant Stores</span>
      </div>
    </div>
  );
}
