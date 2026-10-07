'use client';

import React from 'react';
import Link from 'next/link';

const services = [
  {
    num: '01',
    title: 'US POD Fulfillment',
    desc: 'Under 24H production, 23-inch large-format printing, TikTok Shop US compliance, from $6 all-in.',
    icon: '/assets/home-icon__1_.svg',
    href: '/speedx',
  },
  {
    num: '02',
    title: 'Sales Automation',
    desc: 'Real-time multi-channel order and inventory synchronization across Amazon, Etsy, TikTok Shop, and Shopify.',
    icon: '/assets/home-icon__2_.svg',
    href: '/smartcommerce',
  },
  {
    num: '03',
    title: 'Digital Growth Marketing',
    desc: 'Targeted high-intent conversion campaigns on Meta, Google, and TikTok Ads driving 4.8x average ROAS.',
    icon: '/assets/home-icon__3_.svg',
    href: '/services/all-services',
  },
  {
    num: '04',
    title: 'Developers Hub & WMS',
    desc: 'Open RESTful API infrastructure, real-time webhooks, and 99.9% barcode scan warehouse accuracy.',
    icon: '/assets/home-icon__4_.svg',
    href: '/services/all-services',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="block__items__with__button"
      className="block__items__with__button relative w-full py-28 sm:py-36 lg:py-44 xl:py-48 bg-[#0A0D0E] text-white overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/bg_services.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-[#0A0D0E]/80 backdrop-blur-[2px] pointer-events-none" />

      {/* FULL WIDTH CONTAINER matching live site */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Header Block */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <p className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat">
              Our Capabilities
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#D4FAE6] font-montserrat leading-[1.3]">
              End-to-End <span className="text-[#5EFC8D] font-medium">E-Commerce Growth</span> Ecosystem.
            </h2>
          </div>

          <Link
            href="/services/all-services"
            className="group inline-flex items-center gap-2 self-start md:self-end px-6 py-3 rounded-full border border-white/20 hover:border-[#5EFC8D] hover:text-[#5EFC8D] text-[#D4FAE6] font-medium text-sm transition duration-300 shrink-0"
          >
            <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current transition">
              <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
            </svg>
            <span>Explore All Capabilities</span>
          </Link>
        </div>

        {/* 4 Cards Full Width Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7">
          {services.map((svc) => (
            <Link
              key={svc.num}
              href={svc.href}
              className="group relative flex flex-col justify-between p-8 sm:p-9 xl:p-10 rounded-[32px] bg-[#141718]/85 hover:bg-[#181D1F] border border-white/10 hover:border-[#5EFC8D]/40 transition-all duration-300 min-h-[460px] sm:min-h-[500px] xl:min-h-[530px] backdrop-blur-md shadow-2xl hover:-translate-y-1.5"
            >
              {/* Top row: Number and Action button */}
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-medium text-[#D4FAE6] font-montserrat">
                  {svc.num}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#5EFC8D] text-[#003D5B] flex items-center justify-center transition-transform group-hover:scale-105">
                  <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#003D5B]">
                    <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                  </svg>
                </div>
              </div>

              {/* Center icon */}
              <div className="my-8 sm:my-12 flex items-center">
                <img
                  src={svc.icon}
                  alt={svc.title}
                  className="w-14 h-14 object-contain opacity-95 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Bottom: Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] group-hover:text-[#5EFC8D] transition-colors mb-3 leading-snug font-montserrat">
                  {svc.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
                  {svc.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
