'use client';

import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export interface PlaybookResource {
  id: string;
  title: string;
  format: 'PDF Guide' | 'Excel / Notion Sheet';
  pagesOrSize: string;
  description: string;
  keyTakeaway: string;
  downloadsCount: string;
}

const PLAYBOOKS_DATA: PlaybookResource[] = [
  {
    id: 'tiktok-sla-guide',
    title: 'The 2026 TikTok Shop US SLA Survival Guide',
    format: 'PDF Guide',
    pagesOrSize: '24 Pages · Comprehensive',
    description:
      'Proven operational tactics to maintain sub-1% Late Dispatch Rate (LDR), retain the TikTok Fast Dispatch badge, and survive viral surges without algorithmic throttling.',
    keyTakeaway: 'Includes CASS address normalization checklist & holiday carrier cut-off matrix.',
    downloadsCount: '1,420+ Downloads',
  },
  {
    id: 'inventory-blueprint',
    title: 'The Omnichannel Inventory & Safety Buffer Blueprint',
    format: 'PDF Guide',
    pagesOrSize: '18 Pages · Architecture',
    description:
      'Step-by-step engineering blueprint to configure dynamic stock holdback rules across Amazon FBM, TikTok Shop, Etsy, and Shopify to eradicate overselling stockouts.',
    keyTakeaway: 'Includes automated webhook throttling logic and safety buffer math formulas.',
    downloadsCount: '980+ Downloads',
  },
  {
    id: 'unit-economics-sheet',
    title: 'Unit Economics & True Net Margin Master Sheet',
    format: 'Excel / Notion Sheet',
    pagesOrSize: 'Interactive Template · Notion & XLSX',
    description:
      'Full financial calculation model mapping gross sales down to clean net profit after USPS commercial rates, DTF print base costs, marketplace fees, and blended advertising CPA.',
    keyTakeaway: 'Includes break-even CPA threshold calculator and QuickBooks chart of accounts.',
    downloadsCount: '2,150+ Downloads',
  },
];

export interface PlaybookDownloadsProps {
  id?: string;
  className?: string;
}

export function PlaybookDownloads({
  id = 'operational-playbooks',
  className = '',
}: PlaybookDownloadsProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});

  const handleDownload = (resourceId: string, title: string) => {
    setDownloadingId(resourceId);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((prev) => ({ ...prev, [resourceId]: true }));
    }, 1200);
  };

  return (
    <div
      id={id}
      role="region"
      aria-label="Operational Playbooks & Strategy Guides"
      className={`w-full rounded-[36px] bg-[#141718] border border-white/10 p-8 sm:p-12 lg:p-14 shadow-2xl ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
            Executive Knowledge Base
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat leading-[1.3] tracking-tight">
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              Operational Playbooks &amp; Strategy Guides
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] max-w-2xl font-light leading-[1.75] font-montserrat">
            Download the battle-tested standard operating procedures (SOPs) and financial templates our enterprise partners use to run high-margin cross-border operations.
          </p>
        </div>

        <div className="text-xs font-montserrat text-[#b3b3b3]">
          <span className="text-[#5EFC8D] font-medium">100% Free</span> · No Credit Card Required
        </div>
      </div>

      {/* Screen reader live notification */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {downloadingId ? 'Preparing your guide for download...' : ''}
      </div>

      {/* Playbooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8">
        {PLAYBOOKS_DATA.map((book) => {
          const isDownloading = downloadingId === book.id;
          const isDownloaded = downloadedIds[book.id];

          return (
            <div
              key={book.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#0A0D0E]/80 border border-white/10 hover:border-[#10E774]/40 transition-all duration-300 relative group"
            >
              <div>
                {/* Format and Page badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-montserrat text-[#10E774] font-semibold">
                    {book.format.includes('PDF') ? (
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <FileSpreadsheet className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    {book.format}
                  </span>
                  <span className="text-[11px] font-montserrat text-gray-500">
                    {book.downloadsCount}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#10E774] transition-colors leading-snug">
                  {book.title}
                </h3>
                
                <p className="text-xs text-gray-400 mt-2.5 font-normal leading-relaxed">
                  {book.description}
                </p>

                {/* Key Takeaway */}
                <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-gray-300">
                  <span className="text-[#10E774] font-semibold block mb-0.5">Key Resource Included:</span>
                  {book.keyTakeaway}
                </div>
              </div>

              {/* Download Action */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleDownload(book.id, book.title)}
                  disabled={isDownloading}
                  aria-label={isDownloaded ? `Downloaded ${book.title}` : `Download ${book.title} (${book.format})`}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs font-montserrat transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${ isDownloaded ?'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : isDownloading
                      ? 'bg-[#10E774]/20 text-[#10E774] border border-[#10E774]/40 cursor-wait'
                      : 'bg-white/5 hover:bg-[#10E774] text-white hover:text-black border border-white/10 hover:border-[#10E774]'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                      <span>Access Granted</span>
                    </>
                  ) : isDownloading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#10E774] border-t-transparent rounded-full animate-spin motion-reduce:animate-none" aria-hidden="true" />
                      <span>Preparing File...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Download Free Guide</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust reassurance banner */}
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-montserrat text-gray-500">
        <div>
          <span>Updated quarterly with the latest 2026 TikTok Shop US, USPS, and Amazon policies.</span>
        </div>
        <span>Direct instant access · Instant digital PDF &amp; sheet download</span>
      </div>
    </div>
  );
}
