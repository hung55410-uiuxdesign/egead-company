import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Cpu, BarChart3, Zap, ShieldAlert } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'SmartCommerce | SAI Digital: Intelligent Enterprise Commerce Engine',
  description: '40+ intelligent modules for predictive demand forecasting, real-time dynamic pricing, and automated omnichannel orchestration.',
};

export default function SmartCommercePage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      {/* Hero */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Proprietary Innovation
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            SmartCommerce & <br />
            <span className="text-[#7ceee0]">SmartCX AI Suite</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            Born from 15+ years of enterprise digital commerce implementations, SmartCommerce brings 40+ modular microservices that plug seamlessly into your existing platform to unlock double-digit revenue lift.
          </p>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24">
        <div className="relative rounded-[36px] overflow-hidden border border-white/10 bg-[#141718] p-8 sm:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#7ceee0] block mb-3">
                Core Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Predictive Demand Forecasting & Dynamic Pricing
              </h2>
              <ul className="space-y-4 text-sm sm:text-base text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#7ceee0] flex-shrink-0 mt-0.5" />
                  <span><strong>93% Accuracy:</strong> Machine learning models trained on regional seasonality, weather, and consumer buying trends.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#7ceee0] flex-shrink-0 mt-0.5" />
                  <span><strong>Real-time Margin Optimization:</strong> Dynamically adjust prices and promotional bundles based on stock velocity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#7ceee0] flex-shrink-0 mt-0.5" />
                  <span><strong>Omnichannel Stock Allocation:</strong> Prevent out-of-stock scenarios across warehouses, dark stores, and retail locations.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/assets/smartcx-2.png"
                alt="SmartCommerce Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
