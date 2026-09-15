'use client';

import React from 'react';

const partnersRow1 = [
  { name: 'Shopify', logo: '/assets/Logo_Brands-8.png' },
  { name: 'Stripe', logo: '/assets/Logo_Brands-5.png' },
  { name: 'TikTok Shop', logo: '/assets/Logo_Brands-4.png' },
  { name: 'Amazon', logo: '/assets/Logo_Brands-7.png' },
  { name: 'eBay', logo: '/assets/Logo_Brands-6.png' },
  { name: 'Etsy', logo: '/assets/Logo_Brands-9.png' },
  { name: 'Klaviyo', logo: '/assets/Logo_Brands-1.png' },
];

const partnersRow2 = [
  { name: 'Meta Ads', logo: '/assets/Logo_Brands-3.png' },
  { name: 'Google Ads', logo: '/assets/Logo_Brands-10.png' },
  { name: 'WooCommerce', logo: '/assets/Logo_Brands-11.png' },
  { name: 'USPS', logo: '/assets/Logo_Brands-12.png' },
  { name: 'FedEx', logo: '/assets/Logo_Brands-13.png' },
  { name: 'DHL Express', logo: '/assets/logo_sapsilver.svg' },
  { name: 'Printify Network', logo: '/assets/logo_commercetools.svg' },
];

export default function PartnerSlider() {
  const row1Doubled = [...partnersRow1, ...partnersRow1, ...partnersRow1];
  const row2Doubled = [...partnersRow2, ...partnersRow2, ...partnersRow2];

  return (
    <section className="logo-slider relative w-full py-16 sm:py-20 bg-[#0A0D0E] overflow-hidden">
      {/* Subtitle matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-8 sm:mb-10">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#10E774] font-montserrat">
          Partners
        </p>
      </div>

      {/* Row 1 Marquee - edge to edge */}
      <div className="relative w-full overflow-hidden mb-6">
        <div className="flex w-max animate-marquee pause-hover items-center gap-12 sm:gap-16 lg:gap-20">
          {row1Doubled.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center min-w-[130px] sm:min-w-[160px] h-14 px-4 filter brightness-200 hover:brightness-100 transition-all duration-300 opacity-75 hover:opacity-100"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-9 sm:max-h-11 max-w-[150px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 Marquee - edge to edge reverse */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-max pause-hover items-center gap-12 sm:gap-16 lg:gap-20"
          style={{ animation: 'marquee 40s linear infinite reverse' }}
        >
          {row2Doubled.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center min-w-[130px] sm:min-w-[160px] h-14 px-4 filter brightness-200 hover:brightness-100 transition-all duration-300 opacity-75 hover:opacity-100"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-9 sm:max-h-11 max-w-[150px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
