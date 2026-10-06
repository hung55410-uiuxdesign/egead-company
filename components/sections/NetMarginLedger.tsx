'use client';

import React, { useState } from 'react';
import { DollarSign, Download, Check, ShieldCheck } from 'lucide-react';

export interface NetMarginLedgerProps {
  id?: string;
  className?: string;
}

interface LedgerOrder {
  id: string;
  orderNumber: string;
  platform: string;
  item: string;
  grossPayment: number;
  printCost: number;
  postage: number;
  channelFee: number;
  adCpa: number;
  netProfit: number;
  marginPercent: number;
}

const sampleOrders: LedgerOrder[] = [
  {
    id: 'tiktok-1',
    orderNumber: '#TK-89214',
    platform: 'TikTok Shop US',
    item: 'Gildan 5000 (Black / L)',
    grossPayment: 29.99,
    printCost: 6.00,
    postage: 4.20,
    channelFee: 1.80,
    adCpa: 8.50,
    netProfit: 9.49,
    marginPercent: 31.6,
  },
  {
    id: 'amazon-1',
    orderNumber: '#AZ-44912',
    platform: 'Amazon FBM',
    item: 'Comfort Colors 1717 (Pepper / XL)',
    grossPayment: 34.00,
    printCost: 9.50,
    postage: 4.50,
    channelFee: 5.10,
    adCpa: 7.20,
    netProfit: 7.70,
    marginPercent: 22.6,
  },
  {
    id: 'shopify-1',
    orderNumber: '#SP-71028',
    platform: 'Shopify DTC',
    item: 'Heavy Blend Hoodie (Navy / 2XL)',
    grossPayment: 52.00,
    printCost: 14.50,
    postage: 5.80,
    channelFee: 1.51,
    adCpa: 16.00,
    netProfit: 14.19,
    marginPercent: 27.3,
  },
  {
    id: 'etsy-1',
    orderNumber: '#ET-19204',
    platform: 'Etsy Global',
    item: 'Bella+Canvas 3001 (White / M)',
    grossPayment: 28.00,
    printCost: 6.00,
    postage: 4.20,
    channelFee: 1.82,
    adCpa: 4.20,
    netProfit: 11.78,
    marginPercent: 42.1,
  },
];

export default function NetMarginLedger({
  id = 'financial-ledger',
  className = '',
}: NetMarginLedgerProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string>('tiktok-1');
  const [exported, setExported] = useState<boolean>(false);

  const activeOrder = sampleOrders.find((o) => o.id === selectedOrderId) || sampleOrders[0];

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <section
      id={id}
      className={`relative w-full py-20 sm:py-24 lg:py-28 bg-[#0A0D0E] text-white overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat flex items-center justify-center gap-2">
            <DollarSign className="w-4 h-4 text-[#5EFC8D]" aria-hidden="true" />
            Zero-Spreadsheet Financial Control
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            Automated Net Margin &amp; <span className="text-[#5EFC8D] font-medium">Financial Reconciliation</span> Ledger
          </h2>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
            Stop guessing your real profitability across 10 messy Excel sheets. Eweb-platform reconciles revenue, manufacturing, postage, platform fees, and ad spend for every SKU in real time.
          </p>
        </div>

        {/* Ledger Table Container */}
        <div className="rounded-[32px] bg-[#141718]/90 border border-[#262C30] overflow-hidden backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Top Bar: Selector and Export Button */}
          <div className="p-6 bg-[#101416] border-b border-[#262C30] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Select sample order to inspect">
              {sampleOrders.map((order) => {
                const isActive = order.id === activeOrder.id;
                return (
                  <button
                    key={order.id}
                    role="tab"
                    id={`order-tab-${order.id}`}
                    aria-selected={isActive}
                    aria-controls="financial-ledger-details"
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-montserrat font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${ isActive ?'bg-[#1D2224] text-white border border-[#10E774]/40 shadow-[0_0_10px_rgba(16, 231, 116, 0.15)]'
                        : 'text-[#8C8C8C] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{order.orderNumber}</span>
                    <span className="text-[10px] text-[#10E774]">({order.platform})</span>
                  </button>
                );
              })}
            </div>

            {/* Export Button */}
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141718] border border-[#262C30] text-xs text-[#8C8C8C] hover:text-[#10E774] hover:border-[#10E774]/40 transition-all font-montserrat font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]"
            >
              {exported ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-400 font-montserrat">QuickBooks CSV Exported!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Export P&amp;L Ledger (CSV)</span>
                </>
              )}
            </button>
          </div>

          {/* Ledger Main Content Area */}
          <div
            id="financial-ledger-details"
            role="tabpanel"
            aria-labelledby={`order-tab-${activeOrder.id}`}
            aria-live="polite"
            className="p-6 sm:p-8 space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#262C30]">
              <div>
                <span className="text-xs font-montserrat text-[#b3b3b3] block">
                  Order Inspection: {activeOrder.orderNumber} • {activeOrder.platform}
                </span>
                <h3 className="text-lg sm:text-xl font-medium text-[#D4FAE6] font-montserrat mt-0.5">
                  {activeOrder.item}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-[#5EFC8D]/15 text-[#5EFC8D] text-sm font-medium font-montserrat">
                  {activeOrder.marginPercent}% Net Margin
                </span>
              </div>
            </div>

            {/* Full Cost Deduction Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-montserrat text-xs sm:text-sm" role="table">
                <thead className="text-[11px] text-[#b3b3b3] border-b border-white/10 font-montserrat">
                  <tr>
                    <th scope="col" className="pb-3 pr-4 font-medium">Ledger Component</th>
                    <th scope="col" className="pb-3 px-4 font-medium">Operational Category</th>
                    <th scope="col" className="pb-3 px-4 font-medium">Verification Channel</th>
                    <th scope="col" className="pb-3 pl-4 text-right font-medium">Impact (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-montserrat">
                  <tr>
                    <td className="py-3 pr-4 font-medium text-[#D4FAE6] font-montserrat">Gross Customer Payment</td>
                    <td className="py-3 px-4 text-[#b3b3b3]">Storefront Revenue</td>
                    <td className="py-3 px-4 text-emerald-400">Captured via Marketplace API</td>
                    <td className="py-3 pl-4 text-right font-medium text-[#D4FAE6]">${activeOrder.grossPayment.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-red-400 font-montserrat">(-) E-GEAD 23&quot; DTF Print &amp; Blank</td>
                    <td className="py-3 px-4 text-[#b3b3b3]">Manufacturing Base Rate</td>
                    <td className="py-3 px-4 text-[#b3b3b3]">Auto-reconciled with WMS</td>
                    <td className="py-3 pl-4 text-right text-red-400">-${activeOrder.printCost.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-red-400 font-montserrat">(-) US Domestic Postage</td>
                    <td className="py-3 px-4 text-[#b3b3b3]">USPS Ground Advantage</td>
                    <td className="py-3 px-4 text-[#b3b3b3]">Commercial Base Pricing Rate</td>
                    <td className="py-3 pl-4 text-right text-red-400">-${activeOrder.postage.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-red-400 font-montserrat">(-) Marketplace Commission Fee</td>
                    <td className="py-3 px-4 text-[#b3b3b3]">Channel Referral &amp; Processing</td>
                    <td className="py-3 px-4 text-[#b3b3b3]">Auto-calculated per category</td>
                    <td className="py-3 pl-4 text-right text-red-400">-${activeOrder.channelFee.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-red-400 font-montserrat">(-) Attributed Paid Ads CPA</td>
                    <td className="py-3 px-4 text-[#b3b3b3]">Ad Spend Attribution (TikTok/Meta)</td>
                    <td className="py-3 px-4 text-[#b3b3b3]">UTM &amp; Pixel Server Tracking</td>
                    <td className="py-3 pl-4 text-right text-red-400">-${activeOrder.adCpa.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-[#1D2224]/50">
                    <td className="py-4 pr-4 font-medium text-[#5EFC8D] text-base font-montserrat">
                      True Clean Net Profit
                    </td>
                    <td className="py-4 px-4 text-[#D4FAE6] font-medium font-montserrat">
                      Take-Home Operating Income
                    </td>
                    <td className="py-4 px-4 text-[#5EFC8D]">
                      Settled to Merchant Account
                    </td>
                    <td className="py-4 pl-4 text-right font-medium text-2xl text-[#5EFC8D] font-montserrat">
                      +${activeOrder.netProfit.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom summary note */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8C8C8C] font-montserrat">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10E774]" aria-hidden="true" />
                Direct API reconciliation with TikTok Shop, Amazon Seller Central, and Stripe Settlement
              </span>
              <span className="font-montserrat text-[#10E774]">
                Auto-syncs with Xero &amp; QuickBooks Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
