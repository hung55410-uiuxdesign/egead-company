import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | SAI Digital',
  description: 'Terms and Conditions governing the use of SAI Digital websites and enterprise services.',
};

export default function SaiPrivacyPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-black mb-6">Terms & Conditions</h1>
        <p className="text-xs font-mono text-[#25E2CC] mb-8">Effective Date: September 2025</p>

        <div className="space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed">
          <p>
            By accessing or browsing this website, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern SAI Digital's relationship with you in relation to this website.
          </p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Proprietary Rights</h2>
          <p>
            All content, trademarks, logos, diagrams, and software contained on this site are the intellectual property of SAI Digital and Concentrix Corporation, and are protected under international copyright treaties.
          </p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Permitted Use</h2>
          <p>
            You may browse this website and view its materials solely for informational, non-commercial purposes. Any reproduction or distribution without prior written consent is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
