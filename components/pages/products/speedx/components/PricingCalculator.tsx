'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DollarSign, ArrowRight, Percent, Check } from 'lucide-react';

export interface PricingCalculatorProps {
  id?: string;
  className?: string;
}

const garmentTiers = [
  { id: 'tee', name: 'Classic Streetwear Tee (Gildan 5000)', baseCost: 6.00, defaultRetail: 24.99, desc: 'Heavyweight 5.3 oz, 23-inch DTF' },
  { id: 'vintage', name: 'Vintage Washed Tee (Comfort Colors 1717)', baseCost: 9.50, defaultRetail: 32.00, desc: 'Ringspun garment-dyed 6.1 oz' },
  { id: 'hoodie', name: 'Heavy Blend Fleece Hoodie (Gildan 18500)', baseCost: 14.50, defaultRetail: 48.00, desc: 'Warm 8.0 oz poly-fleece, pouch pocket' },
];

export default function PricingCalculator({ id = 'pricing-calculator', className = '' }: PricingCalculatorProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>('tee');
  const activeTier = garmentTiers.find((t) => t.id === selectedTierId) || garmentTiers[0];
  const [retailPrice, setRetailPrice] = useState<number>(activeTier.defaultRetail);

  // Platform and shipping constants
  const platformFee = Math.round(retailPrice * 0.06 * 100) / 100; // 6% average marketplace fee
  const shippingEst = 4.50; // USPS Ground Advantage
  const totalLandedCost = activeTier.baseCost + platformFee + shippingEst;
  const netProfit = Math.round((retailPrice - totalLandedCost) * 100) / 100;
  const marginPercent = retailPrice > 0 ? Math.round((netProfit / retailPrice) * 100) : 0;

  const handleTierChange = (tier: typeof garmentTiers[0]) => {
    setSelectedTierId(tier.id);
    setRetailPrice(tier.defaultRetail);
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
            Transparent Unit Economics
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
            Transparent <span className="text-[#5EFC8D] font-medium">$6 All-In Base Rate</span> &amp; Profit Calculator
          </h2>
          <p className="mt-4 text-base sm:text-[17px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat max-w-2xl mx-auto">
            Test real-world profit margins across blank garments, 23-inch DTF prints, and domestic USPS postage with zero hidden surcharges.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="rounded-[32px] bg-[#141718]/90 border border-[#262C30] p-8 sm:p-10 lg:p-12 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Product Picker & Retail Slider */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[#8C8C8C] mb-3 font-montserrat">
                  Select Garment Blank
                </label>
                <div className="space-y-2.5" role="group" aria-label="Select Garment Blank">
                  {garmentTiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      aria-pressed={selectedTierId === tier.id}
                      onClick={() => handleTierChange(tier)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774] ${ selectedTierId === tier.id ?'bg-[#10E774]/15 border-[#10E774] text-white shadow-[0_0_20px_rgba(16, 231, 116, 0.15)]'
                          : 'bg-[#101416] border-[#262C30] text-[#8C8C8C] hover:text-white hover:border-[#262C30]/80'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-[#D4FAE6] text-sm sm:text-base font-montserrat">
                          {tier.name}
                        </div>
                        <div className="text-xs text-[#b3b3b3] font-light font-montserrat mt-0.5">
                          {tier.desc}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg sm:text-xl font-medium text-[#5EFC8D] font-montserrat">
                          ${tier.baseCost.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[#b3b3b3] block font-montserrat">All-In</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Retail Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="retail-slider" className="text-xs font-medium text-[#b3b3b3] font-montserrat">
                    Your Retail Selling Price
                  </label>
                  <span className="text-2xl sm:text-3xl font-medium text-[#D4FAE6] font-montserrat">
                    ${retailPrice.toFixed(2)}
                  </span>
                </div>

                <input
                  id="retail-slider"
                  type="range"
                  min="15"
                  max="65"
                  step="0.5"
                  value={retailPrice}
                  aria-valuetext={`$${retailPrice.toFixed(2)} retail price`}
                  onChange={(e) => setRetailPrice(Number(e.target.value))}
                  className="w-full h-2 bg-[#1D2224] rounded-lg appearance-none cursor-pointer accent-[#10E774] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]"
                  aria-label="Retail Selling Price"
                />

                <div className="flex justify-between text-[11px] text-[#8C8C8C] font-montserrat mt-2">
                  <span>$15.00 min</span>
                  <span>$35.00 avg</span>
                  <span>$65.00 premium</span>
                </div>
              </div>

              {/* What $6 includes checklist */}
              <div className="p-4 rounded-2xl bg-[#0A0D0E]/80 border border-[#262C30] space-y-2 text-xs font-montserrat">
                <span className="text-xs font-bold text-[#10E774] block mb-1">
                  What&apos;s Included in E-GEAD Base Rate:
                </span>
                <div className="flex items-center gap-2 text-white">
                  <Check className="w-3.5 h-3.5 text-[#10E774]" aria-hidden="true" />
                  Premium garment blank (pre-shrunk, 100% cotton)
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Check className="w-3.5 h-3.5 text-[#10E774]" aria-hidden="true" />
                  23-inch full-coverage roll-fed DTF printing
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Check className="w-3.5 h-3.5 text-[#10E774]" aria-hidden="true" />
                  Barcode WMS optical quality scan &amp; sorting
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Check className="w-3.5 h-3.5 text-[#10E774]" aria-hidden="true" />
                  Protective poly-mailer packaging &amp; carrier dispatch
                </div>
              </div>
            </div>

            {/* Right Column: Live Net Profit Dashboard */}
            <div
              className="lg:col-span-6 bg-[#0A0D0E]/90 border border-[#262C30] rounded-[28px] p-6 sm:p-8 space-y-6"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#262C30]">
                <div>
                  <span className="text-xs text-[#8C8C8C] font-semibold font-montserrat">
                    Live P&amp;L Analysis
                  </span>
                  <h3 className="text-lg font-medium text-[#D4FAE6] font-montserrat mt-0.5">
                    Per-Unit Profitability
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium font-montserrat ${ marginPercent >= 0 ?'bg-[#5EFC8D]/15 text-[#5EFC8D]'
                      : 'bg-red-500/15 text-red-400'
                  }`}
                >
                  {marginPercent}% Net Margin
                </span>
              </div>

              {/* Cost Deductions Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm font-montserrat">
                <div className="flex justify-between items-center text-[#b3b3b3]">
                  <span>Gross Retail Revenue:</span>
                  <span className="font-montserrat text-[#D4FAE6] font-medium">${retailPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-red-400/90">
                  <span>(-) E-GEAD All-In Base Rate:</span>
                  <span className="font-montserrat">-${activeTier.baseCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-red-400/90">
                  <span>(-) Est. Marketplace Fee (6%):</span>
                  <span className="font-montserrat">-${platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-red-400/90">
                  <span>(-) Est. US Domestic Shipping:</span>
                  <span className="font-montserrat">-${shippingEst.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-base sm:text-lg font-medium">
                  <span className={netProfit >= 0 ? 'text-[#5EFC8D]' : 'text-red-400'}>
                    {netProfit >= 0 ? 'Your Net Profit Per Garment:' : 'Net Loss Per Garment:'}
                  </span>
                  <span
                    className={`text-3xl font-medium font-montserrat ${ netProfit >= 0 ?'text-[#5EFC8D]' : 'text-red-400'
                    }`}
                  >
                    {netProfit < 0 ? `-$${Math.abs(netProfit).toFixed(2)}` : `$${netProfit.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Monthly projection card */}
              <div className="p-4 rounded-2xl bg-[#141718] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#b3b3b3] font-montserrat block">
                    At 1,000 Orders/Month
                  </span>
                  <span
                    className={`text-2xl font-medium font-montserrat ${ netProfit >= 0 ?'text-[#D4FAE6]' : 'text-red-400'
                    }`}
                  >
                    {netProfit >= 0
                      ? `$${(netProfit * 1000).toLocaleString('en-US')}`
                      : `-$${(Math.abs(netProfit) * 1000).toLocaleString('en-US')}`}
                  </span>
                  <span className="text-xs text-[#b3b3b3] font-light font-montserrat block">
                    {netProfit >= 0 ? 'Clean Net Profit' : 'Estimated Net Loss'}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#10E774]/10 border border-[#10E774]/30 flex items-center justify-center text-[#10E774]">
                  <Percent className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact-us"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#10E774] text-black font-bold text-sm font-montserrat hover:bg-[#0ecb66] transition-all duration-200 shadow-[0_0_20px_rgba(16, 231, 116, 0.3)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]"
              >
                <span>Start Fulfilling at $6 All-In</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
