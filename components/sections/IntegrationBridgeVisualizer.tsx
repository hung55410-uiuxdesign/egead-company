'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Lock,
  Boxes,
  Send,
  ShieldCheck,
  Activity,
  Code2,
  Copy,
  Check,
} from 'lucide-react';

export interface BridgeStage {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  latency: string;
  protocol: string;
  description: string;
  telemetry: {
    eventVolume: string;
    encryption: string;
    idempotency: string;
    samplePayload: string;
  };
}

const BRIDGE_STAGES: BridgeStage[] = [
  {
    id: 'input-rails',
    stepNumber: '01',
    title: 'Input Rails: Omnichannel Ingestion',
    category: 'Storefront & Marketplace Ingestion',
    latency: '< 80ms Latency',
    protocol: 'RESTful Webhooks & Open API 3.1',
    description:
      'Listens continuously for purchase events across TikTok Shop US, Amazon FBM, Shopify Plus, Etsy, and custom headless frontends with sub-80ms ingestion latency.',
    telemetry: {
      eventVolume: '10M+ Monthly Webhook Events',
      encryption: 'TLS 1.3 Transport Layer',
      idempotency: 'UUID Header Verification',
      samplePayload: JSON.stringify(
        {
          event: 'order.created',
          marketplace: 'TIKTOK_SHOP_US',
          order_id: 'TT-98421-US',
          sku: 'DTF-TEE-VINTAGE-BLK-XL',
          qty: 2,
          buyer_zip: '90210',
          timestamp: '2026-09-14T10:14:02Z',
        },
        null,
        2
      ),
    },
  },
  {
    id: 'security-gateway',
    stepNumber: '02',
    title: 'Security Gateway: Idempotency & Auth',
    category: 'Authentication & De-Duplication',
    latency: '< 15ms Processing',
    protocol: 'HMAC-SHA256 & OAuth 2.0 PKCE',
    description:
      'Validates marketplace cryptographic signatures, rotates bearer tokens seamlessly, and filters requests through a distributed Redis idempotency buffer to eliminate double-orders.',
    telemetry: {
      eventVolume: '100% Signature Verified',
      encryption: 'AES-256 Field-Level At-Rest',
      idempotency: 'Redis Atomic Lock Buffer',
      samplePayload: JSON.stringify(
        {
          auth_status: 'AUTHORIZED',
          token_validity: 'RENEWED_OAUTH2',
          duplicate_detected: false,
          signature_match: 'VALID_HMAC',
          security_flags: 'ZERO_RISK',
        },
        null,
        2
      ),
    },
  },
  {
    id: 'execution-core',
    stepNumber: '03',
    title: 'Execution Core: WMS & Postal Intelligence',
    category: 'CASS Address Clean & Production Dispatch',
    latency: '< 120ms Ingestion to WMS',
    protocol: 'USPS CASS Certified & Barcode WMS',
    description:
      'Eweb-character AI postal normalization intercepts malformed zip codes and unit numbers before dispatch. Orders route automatically to 23-inch DTF printing lines in the US warehouse.',
    telemetry: {
      eventVolume: '99.9% 1D/2D Barcode Accuracy',
      encryption: 'Internal Encrypted RPC',
      idempotency: 'WMS Station Assignment',
      samplePayload: JSON.stringify(
        {
          cass_validation: 'VERIFIED_CORRECTED',
          original_address: '100 main, apt 4, los angeles',
          normalized_address: '100 MAIN ST APT 4, LOS ANGELES, CA 90012-1402',
          production_line: 'DTF-23-PRESS-04',
          sla_target: 'SUB_24_HOURS',
        },
        null,
        2
      ),
    },
  },
  {
    id: 'output-rails',
    stepNumber: '04',
    title: 'Output Rails: Tracking & Ledger Settlement',
    category: 'Carrier Manifest & Financial Sync',
    latency: '< 200ms Carrier Scan Callback',
    protocol: 'USPS Manifest API & Financial Webhooks',
    description:
      'Dispatches carrier tracking callbacks back to TikTok Shop and Amazon within 12–24h. Automatically records true per-order net margin and exports clean P&L data to accounting software.',
    telemetry: {
      eventVolume: '99.8% On-Time SLA Rate',
      encryption: 'Encrypted Carrier Callback',
      idempotency: 'Financial Ledger Finalized',
      samplePayload: JSON.stringify(
        {
          carrier: 'USPS_GROUND_ADVANTAGE',
          tracking_number: '9400 1118 9956 2301 4589 12',
          carrier_origin_scan: 'CONFIRMED_24H',
          marketplace_ack: 'FAST_DISPATCH_RETAINED',
          net_margin_settled: '$14.28 (41.2%)',
        },
        null,
        2
      ),
    },
  },
];

export interface IntegrationBridgeVisualizerProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function IntegrationBridgeVisualizer({
  id = 'bridge-architecture',
  className = '',
  title = 'The E-GEAD Technical Integration Bridge Architecture',
  subtitle = 'An end-to-end programmatic data highway connecting global storefronts, security gateways, US industrial DTF manufacturing nodes, and national shipping carriers in under 200ms.',
}: IntegrationBridgeVisualizerProps) {
  const [selectedStageId, setSelectedStageId] = useState<string>('input-rails');
  const [copied, setCopied] = useState(false);

  const currentStage = BRIDGE_STAGES.find((s) => s.id === selectedStageId) || BRIDGE_STAGES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentStage.telemetry.samplePayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={id}
      role="region"
      aria-label="The E-GEAD Technical Integration Bridge Architecture"
      className={`w-full rounded-[36px] bg-[#141718] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl ${className}`}
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
            Programmatic Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl">
            {subtitle}
          </p>
        </div>

        <div className="text-xs font-montserrat text-gray-400">
          <span className="text-[#10E774] font-bold">4-Stage Pipeline</span> · Click any block to inspect telemetry
        </div>
      </div>

      {/* Screen reader live notification */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Active architecture stage: {currentStage.title}. {currentStage.description}
      </div>

      {/* 4 Connected Pipeline Stages Bar */}
      <div 
        role="tablist" 
        aria-label="Integration pipeline stages"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
      >
        {BRIDGE_STAGES.map((stage, idx) => {
          const isSelected = selectedStageId === stage.id;
          const StageIcon = [Boxes, Lock, Cpu, Send][idx];

          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              id={`stage-tab-${stage.id}`}
              aria-selected={isSelected}
              aria-controls="stage-telemetry-panel"
              onClick={() => setSelectedStageId(stage.id)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${ isSelected ?'bg-gradient-to-br from-[#10E774]/20 via-[#1A2224] to-[#0A0D0E] border-[#10E774] shadow-xl shadow-[#10E774]/15 scale-[1.02]'
                  : 'bg-[#0A0D0E]/80 border-white/10 hover:border-white/20 text-gray-300 hover:text-white'
              }`}
            >
              {/* Connector dot */}
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-montserrat text-xs font-bold text-[#10E774]">
                  {stage.stepNumber}
                </span>
                <span className="text-[11px] font-montserrat text-[#10E774] font-semibold">
                  {stage.latency}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <StageIcon className="w-4 h-4 text-[#10E774] shrink-0" aria-hidden="true" />
                <h3 className="font-bold text-sm text-white line-clamp-1">
                  {stage.title}
                </h3>
              </div>

              <p className="text-xs text-gray-400 line-clamp-2 font-normal">
                {stage.category}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Deep Telemetry Panel */}
      <div
        id="stage-telemetry-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${selectedStageId}`}
        className="mt-8 rounded-2xl bg-[#0A0D0E] border border-white/10 p-6 sm:p-8 lg:p-10 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Stage Details & Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-montserrat text-[#10E774] mb-2 font-semibold">
                <Activity className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Stage {currentStage.stepNumber} · {currentStage.protocol}</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                {currentStage.title}
              </h3>
              <p className="mt-3 text-sm text-gray-300 font-normal leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Telemetry specs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[11px] font-montserrat text-gray-400">Throughput Scale</div>
                <div className="text-sm font-montserrat font-bold text-white mt-1">
                  {currentStage.telemetry.eventVolume}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[11px] font-montserrat text-gray-400">Security Protocol</div>
                <div className="text-sm font-montserrat font-bold text-[#10E774] mt-1">
                  {currentStage.telemetry.encryption}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[11px] font-montserrat text-gray-400">Reliability Model</div>
                <div className="text-sm font-montserrat font-bold text-white mt-1">
                  {currentStage.telemetry.idempotency}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-montserrat text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
              <span>Full compliance with SOC2 Type II, CCPA, and GDPR data isolation standards.</span>
            </div>
          </div>

          {/* Right Column: Code Payload Telemetry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-xl bg-[#141718] border border-white/10 p-4 font-montserrat text-xs overflow-hidden shadow-inner">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-gray-400">
                <span className="flex items-center gap-1.5 text-[#10E774]">
                  <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Telemetry Payload Event</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? 'Copied payload JSON' : 'Copy payload JSON to clipboard'}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-montserrat text-gray-300 hover:text-white transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#10E774]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#10E774]" aria-hidden="true" />
                      <span className="text-[#10E774]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-gray-400" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre 
                tabIndex={0} 
                aria-label="Sample telemetry JSON stream payload"
                className="text-gray-300 text-[11px] sm:text-xs overflow-x-auto p-1 max-h-64 leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#10E774] rounded"
              >
                <code>{currentStage.telemetry.samplePayload}</code>
              </pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
