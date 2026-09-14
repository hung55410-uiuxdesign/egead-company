'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, ArrowUpRight } from 'lucide-react';

const offices = [
  {
    country: 'Vietnam',
    city: 'Buon Ma Thuot City, Dak Lak Province',
    address: '217/9 Ngo Quyen Street, Tan An Ward, Buon Ma Thuot City, Dak Lak Province, Vietnam',
    email: 'support@egead.com',
    type: 'Headquarters & Engineering Hub',
  },
  {
    country: 'United States',
    city: 'California & East Coast Centers',
    address: 'High-throughput 23-inch POD manufacturing lines and WMS distribution facilities',
    email: 'contact@egeadcompany.com',
    type: 'US Production & Logistics Network',
  },
  {
    country: 'International Support',
    city: 'US, UK & EU Timezones',
    address: '24/7 client support and real-time SLA operations monitoring',
    email: 'support@egead.com',
    type: '24/7 Operations Desk',
  },
  {
    country: 'Global Developers',
    city: 'Remote & Cloud',
    address: 'RESTful API integration, webhook endpoints, and ERP synchronization',
    email: 'contact@egeadcompany.com',
    type: 'Developer Hub',
  },
];

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'US Print-on-Demand Fulfillment (<24H SLA)',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 pb-28">
      {/* Hero Header */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-24">
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            AUTOMATE OPERATIONS, <br />
            <span className="text-[#7ceee0]">SCALE GLOBALLY.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed">
            Let's discuss how E-GEAD can automate your multi-channel storefronts, guarantee sub-24h US POD fulfillment, and scale your brand across international marketplaces.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Info */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-[#141718] p-8 sm:p-12 rounded-[36px] border border-white/10 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Send us a message
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              Fill out the form below and one of our operations directors will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#7ceee0]/10 border border-[#7ceee0]/30 text-center py-12">
                <CheckCircle className="w-12 h-12 text-[#7ceee0] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Message received!</h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  Thank you for reaching out to E-GEAD. Our operations team has received your inquiry and will be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#7ceee0] text-black text-xs font-bold uppercase tracking-wider"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0A0D0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#7ceee0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0A0D0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#7ceee0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#0A0D0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#7ceee0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                      Area of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0A0D0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7ceee0]"
                    >
                      <option value="US Print-on-Demand Fulfillment (<24H SLA)">US Print-on-Demand Fulfillment (&lt;24H SLA)</option>
                      <option value="Sales Automation & Multi-Channel Sync">Sales Automation & Multi-Channel Sync</option>
                      <option value="Digital Advertising & ROAS Scaling">Digital Advertising & ROAS Scaling</option>
                      <option value="WMS & Open API Systems Integration">WMS & Open API Systems Integration</option>
                      <option value="Eweb Suite Platform Onboarding">Eweb Suite Platform Onboarding</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                    Project Overview or Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your storefront, order volume, or operational challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0A0D0E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#7ceee0]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7ceee0] hover:bg-[#68d8ca] text-black font-bold text-sm px-8 py-4 rounded-full transition shadow-[0_0_20px_rgba(124,238,224,0.3)]"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="p-8 rounded-[32px] bg-[#141718] border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Direct Contacts</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#7ceee0]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold">General & Sales Inquiries</span>
                    <a href="mailto:support@egead.com" className="hover:text-[#7ceee0] transition">
                      support@egead.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#7ceee0]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold">Partnership & US Operations</span>
                    <a href="mailto:contact@egeadcompany.com" className="hover:text-[#7ceee0] transition">
                      contact@egeadcompany.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#7ceee0]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-semibold">Headquarters</span>
                    <span>Buon Ma Thuot City, Dak Lak, Vietnam</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-[#141718] border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">99.9% Fulfillment Accuracy</h3>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                E-GEAD enforces strict barcode verification, enterprise data protection, and 100% marketplace SLA compliance verified across millions of shipments.
              </p>
              <img src="/assets/Badges_SOC.svg" alt="SOC Badge" className="h-10 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices Section */}
      <section id="offices" className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-2">
            Global Operations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Our Headquarters & Operational Network
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offices.map((off, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#141718] border border-white/10 hover:border-[#7ceee0]/40 transition duration-300"
            >
              <span className="text-xs font-mono text-[#7ceee0] uppercase block mb-1">
                {off.type}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{off.country}</h3>
              <p className="text-xs text-gray-300 mb-3">{off.address}</p>
              <a
                href={`mailto:${off.email}`}
                className="text-xs text-[#7ceee0] hover:underline font-mono"
              >
                {off.email}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
