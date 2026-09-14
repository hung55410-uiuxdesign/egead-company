'use client';

import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw, CheckCircle2 } from 'lucide-react';

export interface CockpitHudCardProps {
  className?: string;
}

interface ChannelStream {
  id: string;
  name: string;
  badge: string;
  status: string;
  activeOrders: number;
  syncLatency: string;
  color: string;
}

const initialChannels: ChannelStream[] = [
  {
    id: 'tiktok',
    name: 'TikTok Shop US',
    badge: 'Live Stream Sales',
    status: 'Syncing in 0.8s',
    activeOrders: 618,
    syncLatency: '820ms',
    color: '#25E2CC',
  },
  {
    id: 'amazon',
    name: 'Amazon FBM',
    badge: 'Prime VTR 99.2%',
    status: 'Automated Ingestion',
    activeOrders: 429,
    syncLatency: '1.1s',
    color: '#F59E0B',
  },
  {
    id: 'shopify',
    name: 'Shopify Plus DTC',
    badge: 'Direct Webhook',
    status: 'Real-Time Sync',
    activeOrders: 284,
    syncLatency: '340ms',
    color: '#10B981',
  },
  {
    id: 'etsy',
    name: 'Etsy Global',
    badge: 'Star Seller Sync',
    status: 'Catalog Linked',
    activeOrders: 89,
    syncLatency: '940ms',
    color: '#EC4899',
  },
];

export default function CockpitHudCard({ className = '' }: CockpitHudCardProps) {
  const [throughput, setThroughput] = useState<number>(1420);

  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full rounded-[32px] bg-[#141718]/95 border border-[#262C30] p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden ${className}`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#262C30] mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#25E2CC] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          <span className="text-xs uppercase tracking-widest font-bold text-white font-montserrat">
            Live Operations Cockpit HUD
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping motion-reduce:animate-none" />
          <span className="text-[10px] font-mono font-bold bg-[#25E2CC]/10 text-[#25E2CC] px-2.5 py-1 rounded-full border border-[#25E2CC]/20">
            Multi-Channel Mesh: Optimal
          </span>
        </div>
      </div>

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-2 gap-3 mb-6 font-montserrat">
        <div className="p-3.5 rounded-2xl bg-[#0A0D0E]/90 border border-[#262C30]">
          <span className="text-[11px] uppercase tracking-wider text-[#8C8C8C] block mb-1">
            Global Throughput Rate
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {throughput.toLocaleString()}
            </span>
            <span className="text-xs text-[#25E2CC] font-semibold">orders/hr</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0A0D0E]/90 border border-[#262C30]">
          <span className="text-[11px] uppercase tracking-wider text-[#8C8C8C] block mb-1">
            Median Sync Latency
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#25E2CC] font-mono">
              0.8s
            </span>
            <span className="text-xs text-emerald-400 font-semibold">Zero Desync</span>
          </div>
        </div>
      </div>

      {/* 4 Active Channel Streams */}
      <div className="space-y-3 font-montserrat" role="region" aria-label="Active Storefront Connections">
        {initialChannels.map((channel) => (
          <div
            key={channel.id}
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#0A0D0E]/70 border border-[#262C30] hover:border-[#25E2CC]/30 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: channel.color }}
                aria-hidden="true"
              />
              <div>
                <span className="text-sm font-bold text-white block">
                  {channel.name}
                </span>
                <span className="text-[10px] text-[#8C8C8C] font-mono block">
                  {channel.badge}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-[#25E2CC] block">
                {channel.activeOrders} queued
              </span>
              <span className="text-[10px] text-emerald-400/90 font-mono inline-flex items-center gap-1">
                <RefreshCw className="w-2.5 h-2.5 animate-spin motion-reduce:animate-none" style={{ animationDuration: '4s' }} aria-hidden="true" />
                {channel.syncLatency}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Buffer Guarantee Footer */}
      <div className="mt-6 pt-4 border-t border-[#262C30] flex items-center justify-between text-xs text-[#8C8C8C] font-montserrat">
        <span className="flex items-center gap-1.5 text-white">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
          Safety Stock Buffer Protected
        </span>
        <span className="font-mono text-[11px] text-emerald-400 font-semibold">
          0 Overselling Incidents
        </span>
      </div>
    </div>
  );
}
