'use client';

import React, { useState } from 'react';
import { Copy, Check, Code2, Zap } from 'lucide-react';

export interface ApiTerminalProps {
  id?: string;
  className?: string;
}

const endpoints = [
  {
    id: 'dispatch',
    method: 'POST',
    path: '/v1/orders/dispatch',
    title: 'Instant Order Dispatch',
    latency: '85ms',
    code: `{
  "marketplace": "tiktok_shop_us",
  "order_id": "TTS-98241029",
  "routing": "nearest_us_hub",
  "customer": {
    "name": "John Smith",
    "street": "125 N Main St Apt 4B",
    "city": "New York",
    "state": "NY",
    "zip": "10001-2834"
  },
  "items": [
    {
      "sku": "TEE-HVY-BLK-XL",
      "blank": "Gildan 5000 (Black / XL)",
      "print_method": "dtf_23_inch_roll",
      "artwork_url": "https://assets.egead.com/art/oversize_front_v3.png",
      "quantity": 1
    }
  ]
}`,
    response: `{
  "status": "queued_for_production",
  "production_hub": "Anaheim_US_Facility_01",
  "sla_deadline": "2026-09-15T08:00:00Z",
  "estimated_first_carrier_scan": "under_18_hours",
  "unit_cost_usd": 6.00
}`,
  },
  {
    id: 'webhook',
    method: 'EVENT',
    path: 'webhook: order.in_transit',
    title: 'Carrier Dispatch Callback',
    latency: 'Real-Time',
    code: `{
  "event": "order.carrier_handed_off",
  "timestamp": "2026-09-14T14:45:10Z",
  "order_id": "TTS-98241029",
  "carrier": "USPS",
  "service": "USPS Ground Advantage",
  "tracking_number": "9400111899562534182941",
  "origin_scan_timestamp": "2026-09-14T14:40:22Z",
  "turnaround_hours": 16.2,
  "tiktok_shop_ldr_compliant": true
}`,
    response: `// Webhook delivered with 200 OK signature verification`,
  },
  {
    id: 'inventory',
    method: 'GET',
    path: '/v1/inventory/blanks',
    title: 'Real-time Blanks Stock',
    latency: '42ms',
    code: `curl -X GET "https://api.egeadcompany.com/v1/inventory/blanks?sku=TEE-HVY-BLK" \\
  -H "Authorization: Bearer sec_live_948a92b49821"`,
    response: `{
  "sku": "TEE-HVY-BLK",
  "brand": "Gildan 5000",
  "color": "Black",
  "facilities": {
    "us_east_hub": { "in_stock": 48200, "status": "optimal" },
    "us_west_hub": { "in_stock": 35400, "status": "optimal" }
  },
  "max_daily_capacity": 15000
}`,
  },
];

export default function ApiTerminal({ id = 'api-terminal', className = '' }: ApiTerminalProps) {
  const [activeTabId, setActiveTabId] = useState<string>('dispatch');
  const [copied, setCopied] = useState<boolean>(false);
  const activeEndpoint = endpoints.find((e) => e.id === activeTabId) || endpoints[0];

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(activeEndpoint.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Graceful fallback for restricted contexts
    }
  };

  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
            Developer-First Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            RESTful API &amp; <span className="text-[#5EFC8D] font-medium">Event-Driven Webhook</span> Terminal
          </h2>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
            Connect custom storefronts, ERPs, or TikTok Shop connector apps in minutes with enterprise-grade sub-150ms JSON endpoints.
          </p>
        </div>

        {/* Terminal Window Container */}
        <div className="rounded-[32px] bg-[#101416] border border-[#262C30] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.7)] backdrop-blur-md">
          {/* Window Title Bar */}
          <div className="bg-[#0A0D0E] px-6 py-4 border-b border-[#262C30] flex flex-wrap items-center justify-between gap-4">
            {/* Window controls */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-montserrat text-[#8C8C8C] hidden sm:inline">
                egead-api-v1.production.egeadcompany.com
              </span>
            </div>

            {/* Endpoint Tabs */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="API Endpoint Selector">
              {endpoints.map((ep) => {
                const isActive = ep.id === activeEndpoint.id;
                return (
                  <button
                    key={ep.id}
                    role="tab"
                    id={`api-tab-${ep.id}`}
                    aria-selected={isActive}
                    aria-controls="api-terminal-panel"
                    onClick={() => setActiveTabId(ep.id)}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-montserrat font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${
                      isActive
                        ? 'bg-[#1D2224] text-white border border-[#10E774]/40 shadow-[0_0_10px_rgba(16, 231, 116, 0.15)]'
                        : 'text-[#8C8C8C] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold ${
                        ep.method === 'POST'
                          ? 'text-[#10E774]'
                          : ep.method === 'EVENT'
                          ? 'text-yellow-400'
                          : 'text-purple-400'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="hidden md:inline">{ep.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Copy code button */}
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy code sample to clipboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141718] border border-[#262C30] text-xs text-[#8C8C8C] hover:text-[#10E774] hover:border-[#10E774]/40 transition-all font-montserrat focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Payload</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Body */}
          <div
            id="api-terminal-panel"
            role="tabpanel"
            aria-labelledby={`api-tab-${activeEndpoint.id}`}
            className="p-6 sm:p-8 font-montserrat text-xs sm:text-sm grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Request Code Column */}
            <div className="lg:col-span-7 bg-[#0A0D0E]/90 rounded-2xl p-5 border border-[#262C30] relative overflow-x-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262C30] text-[11px] text-[#8C8C8C]">
                <span className="text-[#10E774] font-bold">{activeEndpoint.method} {activeEndpoint.path}</span>
                <span>Content-Type: application/json</span>
              </div>
              <pre className="text-[#D4FAE6]/90 leading-relaxed overflow-x-auto">
                <code>{activeEndpoint.code}</code>
              </pre>
            </div>

            {/* Response Output Column */}
            <div className="lg:col-span-5 bg-[#0A0D0E]/90 rounded-2xl p-5 border border-[#262C30] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262C30] text-[11px]">
                  <span className="text-emerald-400 font-bold">HTTP/2 200 OK</span>
                  <span className="text-[#10E774] font-bold">Latency: {activeEndpoint.latency}</span>
                </div>
                <pre className="text-emerald-300/90 leading-relaxed overflow-x-auto text-xs">
                  <code>{activeEndpoint.response}</code>
                </pre>
              </div>

              <div className="pt-4 mt-4 border-t border-[#262C30] flex items-center justify-between text-[11px] text-[#8C8C8C]">
                <span className="flex items-center gap-1 text-[#10E774]">
                  <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                  99.9% Uptime Production Cluster
                </span>
                <span>Auth: Bearer Token</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
