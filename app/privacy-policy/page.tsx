import React from 'react';

export const metadata = {
  title: 'Privacy Policy | SAI Digital',
  description: 'SAI Digital commitment to data privacy, GDPR, CCPA, and enterprise confidentiality.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-black mb-6">Privacy Policy</h1>
        <p className="text-xs font-mono text-[#25E2CC] mb-8">Last Updated: September 2025</p>

        <div className="space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed">
          <p>
            SAI Digital, a Concentrix Company, is committed to safeguarding the privacy and security of your personal data. This Privacy Policy details how we collect, use, disclose, and protect information gathered through our website and digital services.
          </p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide when contacting us, requesting demonstrations, or subscribing to our newsletters. This may include your name, business email address, company affiliation, telephone number, and job title.
          </p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Use of Information</h2>
          <p>
            Information collected is utilized to respond to your inquiries, deliver requested services, provide insights and updates, maintain security, and optimize our digital platforms.
          </p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Security & Compliance</h2>
          <p>
            SAI Digital implements industry-leading administrative, technical, and physical safeguards in accordance with SOC 2 Type II audit standards to prevent unauthorized access or disclosure.
          </p>
        </div>
      </div>
    </div>
  );
}
