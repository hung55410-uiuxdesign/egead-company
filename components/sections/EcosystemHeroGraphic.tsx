import React from 'react';
import {
  Activity,
  Lock,
} from 'lucide-react';

export interface EcosystemHeroGraphicProps {
  className?: string;
}

export function EcosystemHeroGraphic({ className = '' }: EcosystemHeroGraphicProps) {
  return (
    <div
      role="region"
      aria-label="Ecosystem Integration Hub Topology"
      className={`relative w-full rounded-3xl bg-[#141718] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden ${className}`}
    >
      {/* Ambient background glow */}
      <div 
        aria-hidden="true" 
        className="absolute -top-20 -right-20 w-64 h-64 bg-[#25E2CC]/15 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono">
        <span className="text-gray-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
          <Activity className="w-3.5 h-3.5 text-[#25E2CC]" aria-hidden="true" />
          Global Commerce Mesh
        </span>
        <span className="flex items-center gap-1.5 text-[#25E2CC] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#25E2CC] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          17 Endpoints Active
        </span>
      </div>

      {/* Topology Grid of Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative z-10">
        
        {/* Node 1: TikTok Shop US */}
        <div className="p-3.5 rounded-xl bg-[#0A0D0E]/90 border border-[#25E2CC]/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">TikTok Shop US</div>
            <div className="text-[11px] text-gray-400 font-mono">Direct Open API · &lt; 800ms</div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#25E2CC]/15 text-[#25E2CC] text-[10px] font-mono font-bold">
            Sub-24h
          </span>
        </div>

        {/* Node 2: Amazon SP-API */}
        <div className="p-3.5 rounded-xl bg-[#0A0D0E]/90 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Amazon SP-API</div>
            <div className="text-[11px] text-gray-400 font-mono">FBM &amp; Stock Sync · Real-Time</div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-[10px] font-mono font-bold">
            99.9% VTR
          </span>
        </div>

        {/* Node 3: Shopify Plus */}
        <div className="p-3.5 rounded-xl bg-[#0A0D0E]/90 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Shopify &amp; Plus</div>
            <div className="text-[11px] text-gray-400 font-mono">Native Webhooks · 340ms</div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-mono font-bold">
            OAuth 2.0
          </span>
        </div>

        {/* Node 4: USPS Carrier */}
        <div className="p-3.5 rounded-xl bg-[#0A0D0E]/90 border border-[#25E2CC]/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">USPS Network</div>
            <div className="text-[11px] text-gray-400 font-mono">Origin Post Office Manifest</div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#25E2CC]/15 text-[#25E2CC] text-[10px] font-mono font-bold">
            Ground Adv
          </span>
        </div>

        {/* Node 5: Meta & Google CAPI */}
        <div className="p-3.5 rounded-xl bg-[#0A0D0E]/90 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Meta &amp; Google CAPI</div>
            <div className="text-[11px] text-gray-400 font-mono">Server-Side Conversion Feed</div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-mono font-bold">
            4.8x ROAS
          </span>
        </div>

        {/* Node 6: Stripe Financial Rail */}
        <div className="p-3.5 rounded-xl bg-[#0A0D0E]/90 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Stripe &amp; PayPal</div>
            <div className="text-[11px] text-gray-400 font-mono">Per-Order Margin Ledger</div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-mono font-bold">
            Clean Net P&amp;L
          </span>
        </div>

      </div>

      {/* Central E-GEAD Core Orchestrator Bar */}
      <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-[#25E2CC]/15 via-[#1A2224] to-[#25E2CC]/15 border border-[#25E2CC]/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#25E2CC] text-black flex items-center justify-center font-black text-sm">
            EG
          </div>
          <div>
            <div className="text-xs font-bold text-white">E-GEAD Core Orchestration Highway</div>
            <div className="text-[11px] text-gray-400 font-mono">Zero Single Point of Failure (SPOF) · 99.99% Uptime</div>
          </div>
        </div>
        <Lock className="w-4 h-4 text-[#25E2CC]" aria-hidden="true" />
      </div>

      {/* Footer Meta */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
        <span>Verified Cryptographic Handshake</span>
        <span className="text-[#25E2CC]">TLS 1.3 · HMAC SHA-256</span>
      </div>
    </div>
  );
}
