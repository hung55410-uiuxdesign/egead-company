import React from 'react';

export const metadata = {
  title: 'Privacy Policy | E-GEAD Company',
  description: 'E-GEAD commitment to data privacy, GDPR, CCPA, and secure e-commerce fulfillment.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-black mb-6">Privacy Policy</h1>
        <p className="text-xs font-mono text-[#25E2CC] mb-8">Last Updated: January 2026</p>

        <div className="space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed">
          <p>
            E-GEAD Company is committed to safeguarding the privacy and security of your personal and commercial data. This Privacy Policy details how we collect, use, process, and protect information gathered through our website, APIs, WMS software, and digital services.
          </p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information that you voluntarily provide when contacting us, requesting consultations, integrating storefronts, or submitting order fulfillment payloads. This includes customer shipping details (recipient name, address, phone number), merchant business contact details, and transaction metadata necessary to execute orders.
          </p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Use of E-Commerce Data</h2>
          <p>
            Customer shipping information received via marketplace APIs (Amazon, TikTok Shop, Etsy, Shopify) is processed solely for manufacturing, packaging, and carrier dispatch purposes. We strictly adhere to marketplace data governance policies and never sell, rent, or monetize end-consumer data.
          </p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Security & Compliance</h2>
          <p>
            E-GEAD implements enterprise-grade technical and organizational safeguards including 256-bit TLS data transmission encryption, restricted database access, and strict compliance with GDPR and CCPA regulations to prevent unauthorized access or disclosure.
          </p>
        </div>
      </div>
    </div>
  );
}
