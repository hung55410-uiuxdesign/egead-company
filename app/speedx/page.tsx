import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Rocket, Timer, Layers, ShieldCheck } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'SpeedX Accelerator | SAI Digital',
  description: 'Launch enterprise multi-region digital commerce platforms in weeks, not quarters.',
};

export default function SpeedXPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Pre-Built Commerce Accelerator
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            SpeedX: <br />
            <span className="text-[#7ceee0]">Velocity Without Compromise.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            SpeedX is our battle-tested enterprise commerce blueprint that dramatically cuts time-to-market. Pre-integrated with SAP, Shopify Plus, payment gateways, and shipping APIs.
          </p>
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[28px] bg-[#141718] border border-white/10">
            <Timer className="w-10 h-10 text-[#7ceee0] mb-4" />
            <h3 className="text-2xl font-bold mb-2">60% Faster Rollout</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Launch initial multi-market storefronts in as little as 8 to 12 weeks with verified architectural patterns.
            </p>
          </div>
          <div className="p-8 rounded-[28px] bg-[#141718] border border-white/10">
            <Layers className="w-10 h-10 text-[#7ceee0] mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready Connectors</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Out-of-the-box middleware connectors for ERP, OMS, PIM, localized taxes, and international payment providers.
            </p>
          </div>
          <div className="p-8 rounded-[28px] bg-[#141718] border border-white/10">
            <ShieldCheck className="w-10 h-10 text-[#7ceee0] mb-4" />
            <h3 className="text-2xl font-bold mb-2">SOC 2 & PCI-DSS</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Enterprise grade security architecture pre-configured for global compliance and data isolation.
            </p>
          </div>
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
