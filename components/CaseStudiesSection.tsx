'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface LogoItem {
  name: string;
  src: string;
  invert?: boolean;
}

// Homepage default partner logos
const row1Partners: LogoItem[] = [
  { name: 'Partner 01', src: '/assets/partners/01.svg' },
  { name: 'Partner 02', src: '/assets/partners/02.svg' },
  { name: 'Partner 03', src: '/assets/partners/03.svg' },
  { name: 'Partner 04', src: '/assets/partners/04.png' },
  { name: 'Partner 05', src: '/assets/partners/05.svg' },
  { name: 'Partner 06', src: '/assets/partners/06.svg' },
  { name: 'Partner 07', src: '/assets/partners/07.svg' },
  { name: 'Partner 08', src: '/assets/partners/08.svg' },
  { name: 'Partner 09', src: '/assets/partners/09.svg' },
  { name: 'Partner 10', src: '/assets/partners/10.svg' },
  { name: 'Partner 11', src: '/assets/partners/11.svg' },
  { name: 'Partner 12', src: '/assets/partners/12.svg' },
  { name: 'Partner 13', src: '/assets/partners/13.svg' },
  { name: 'Partner 14', src: '/assets/partners/14.svg' },
  { name: 'Partner 15', src: '/assets/partners/15.svg' },
];

const row2Partners: LogoItem[] = [
  { name: 'Partner 16', src: '/assets/partners/16.svg' },
  { name: 'Partner 17', src: '/assets/partners/17.svg' },
  { name: 'Partner 18', src: '/assets/partners/18.svg' },
  { name: 'Partner 19', src: '/assets/partners/19.svg' },
  { name: 'Partner 20', src: '/assets/partners/20.svg' },
  { name: 'Partner 21', src: '/assets/partners/21.svg' },
  { name: 'Partner 22', src: '/assets/partners/22.svg' },
  { name: 'Partner 23', src: '/assets/partners/23.svg' },
  { name: 'Partner 24', src: '/assets/partners/24.svg' },
  { name: 'Partner 25', src: '/assets/partners/25.svg' },
  { name: 'Partner 26', src: '/assets/partners/26.svg' },
  { name: 'Partner 27', src: '/assets/partners/27.svg' },
  { name: 'Partner 28', src: '/assets/partners/28.svg' },
  { name: 'Partner 29', src: '/assets/partners/29.svg' },
];

// Company page authentic Client logos
export const companyClientLogos: LogoItem[] = [
  { name: 'HRS', src: '/assets/logo_hrs.svg' },
  { name: 'Kashiwagi', src: '/assets/logo_kashiwagi.svg' },
  { name: 'Suntory', src: '/assets/logo_suntory.svg' },
  { name: 'Manulife', src: '/assets/logo_manulife.svg' },
  { name: 'Jim Thompson', src: '/assets/logo_jimthompson.svg' },
  { name: 'TCI', src: '/assets/logo_tci.svg' },
  { name: 'Toyota', src: '/assets/logo_toyota.svg' },
  { name: 'Brother', src: '/assets/logo_brother.svg' },
  { name: 'Beauty Garage', src: '/assets/logo_beautygarage.svg' },
  { name: 'Weir', src: '/assets/logo_weir.svg' },
  { name: 'Saitex', src: '/assets/logo_saitex.svg' },
  { name: 'Dinner Ladies', src: '/assets/logo_dinnerladies.svg' },
  { name: 'Edwin', src: '/assets/logo_edwin.svg' },
  { name: 'Beisia', src: '/assets/logo_beisia.svg' },
];

// Company page authentic Service / Tech Partner logos
export const companyServiceLogos: LogoItem[] = [
  { name: 'SAP Silver', src: '/assets/logo_sapsilver.svg' },
  { name: 'Klaviyo', src: '/assets/logo_klaviyo.svg' },
  { name: 'Emarsys', src: '/assets/logo_emarsys.svg' },
  { name: 'Sitecore', src: '/assets/logo_Sitecore.png' },
  { name: 'Stripe', src: '/assets/logo_stripe.svg' },
  { name: 'Qualtrics', src: '/assets/logo_qualtrics.svg' },
  { name: 'Magento', src: '/assets/logo_magento.svg' },
  { name: 'Shopify', src: '/assets/logo_shopify.svg' },
  { name: 'Salesforce', src: '/assets/logo_salesforce.svg' },
  { name: 'CommerceTools', src: '/assets/logo_commercetools.svg' },
];

// SmartPrice eCommerce technology provider partner logos
export const smartpricePartnerLogos: LogoItem[] = [
  { name: 'SAP Gold Partner', src: '/assets/smartprice/logo_sapgold.svg' },
  { name: 'Shopify Plus', src: '/assets/smartprice/logo_shopifyplus.svg' },
  { name: 'Sitecore', src: '/assets/smartprice/logo_sitecore.svg' },
  { name: 'Magento', src: '/assets/smartprice/logo_magento.svg' },
  { name: 'Shopify', src: '/assets/smartprice/logo_shopify.svg' },
  { name: 'CommerceTools', src: '/assets/smartprice/logo_commercetools.svg' },
];

export interface CaseStudiesSectionProps {
  variant?: 'default' | 'company' | 'smartprice' | 'services';
  id?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  row1Partners?: LogoItem[];
  row2Partners?: LogoItem[];
  rows?: LogoItem[][];
  logos?: LogoItem[];
  companySection?: any;
}

export default function CaseStudiesSection({
  variant = 'default',
  id = 'homepage__customers',
  subtitle,
  title,
  description,
  row1Partners: customRow1,
  row2Partners: customRow2,
  rows: customRows,
  logos,
  companySection,
}: CaseStudiesSectionProps) {
  // If used on Services Page / Single Partners Slider
  if (variant === 'services') {
    const list = logos && logos.length > 0 ? logos : companyServiceLogos;
    const doubled = [...list, ...list, ...list, ...list];

    return (
      <section
        id={id || 'clients-partnerships'}
        className="relative w-full py-14 sm:py-20 bg-[#0D1011] text-white border-b border-white/5 overflow-hidden scroll-mt-28"
      >
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-8">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-2 font-montserrat"
          >
            {subtitle || 'Enterprise Partners'}
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl sm:text-2xl lg:text-[34px] font-semibold font-montserrat leading-snug"
          >
            <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
              {title || 'Seamlessly connected with leading marketplace and cloud platforms.'}
            </span>
          </motion.h3>
        </div>

        {/* Marquee Track */}
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#0D1011] via-[#0D1011]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#0D1011] via-[#0D1011]/80 to-transparent z-10" />

          <div
            className="flex w-max pause-hover items-center gap-12 sm:gap-16 lg:gap-20 py-4"
            style={{ animation: 'marquee 50s linear infinite' }}
          >
            {doubled.map((partner, idx) => (
              <motion.div
                key={`service-partner-${idx}`}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center justify-center min-w-[130px] sm:min-w-[160px] h-16 opacity-70 hover:opacity-100 transition-opacity duration-300 group cursor-pointer"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-w-full max-h-12 object-contain invert drop-shadow-sm group-hover:drop-shadow-[0_0_12px_rgba(108,232,195,0.6)] transition-all duration-300 pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If used on SmartPrice Page
  if (variant === 'smartprice') {
    const list = logos && logos.length > 0 ? logos : smartpricePartnerLogos;
    const doubled = [...list, ...list, ...list, ...list];

    return (
      <section
        id={id}
        className="relative w-full py-16 sm:py-24 bg-[#000000] text-white border-t border-white/5 overflow-hidden"
      >
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20 mb-8 sm:mb-12">
          <p className="text-sm sm:text-base font-medium text-[#6CE8C3] mb-3 font-montserrat tracking-wider uppercase">
            {subtitle || 'API-first Cloud Native SaaS solution'}
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-white font-montserrat leading-snug max-w-4xl">
            {title || 'Seamlessly integrates with any eCommerce technology provider.'}
          </h3>
        </div>

        {/* Marquee Track for SmartPrice & Loyalty Partners */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle Left & Right Edge Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#000000] via-[#000000]/80 to-transparent z-10" />

          <div
            className="flex w-max pause-hover items-center gap-14 sm:gap-18 lg:gap-24 py-6"
            style={{ animation: 'marquee 40s linear infinite' }}
          >
            {doubled.map((partner, idx) => (
              <motion.div
                key={`smartprice-${idx}`}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center justify-center min-w-[200px] sm:min-w-[240px] lg:min-w-[280px] h-20 sm:h-24 lg:h-28 opacity-85 hover:opacity-100 transition-all duration-300 group cursor-pointer px-4"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-16 sm:h-20 lg:h-24 w-auto max-w-[200px] sm:max-w-[240px] lg:max-w-[260px] object-contain drop-shadow-sm group-hover:drop-shadow-[0_0_16px_rgba(108,232,195,0.8)] transition-all duration-300 pointer-events-none"
                  style={{ filter: 'brightness(1.5) contrast(1.1)' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If used on Company Page
  if (variant === 'company') {
    const data = (companySection?.data || {}) as any;
    const clientsList = (data.clients && data.clients.length > 0) ? data.clients : companyClientLogos;
    const servicesList = (data.servicePartners && data.servicePartners.length > 0) ? data.servicePartners : companyServiceLogos;
    const clientsSubtitle = data.clientsSubtitle || companySection?.subtitle || 'Clients';
    const clientsTitle = data.clientsTitle || companySection?.title || 'We work with established global enterprises and ambitious brands.';
    const servicesSubtitle = data.servicesSubtitle || 'Services';
    const servicesTitle = data.servicesTitle || 'We are partnering with leading tech providers.';

    const clientsDoubled = [...clientsList, ...clientsList, ...clientsList];
    const servicesDoubled = [...servicesList, ...servicesList, ...servicesList];

    return (
      <section
        id={id}
        className="relative w-full bg-[#0A0D0E] text-white overflow-hidden py-14 sm:py-20 scroll-mt-28"
      >
        {/* =========================================================
            ROW 1: CLIENTS
        ========================================================= */}
        <div className="w-full pb-16 sm:pb-24 border-b border-white/5">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-10 sm:mb-12">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base font-normal text-[#D4FAE6] mb-2.5 font-montserrat"
            >
              {clientsSubtitle}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl lg:text-[34px] font-normal text-white font-montserrat leading-snug max-w-4xl"
            >
              {clientsTitle}
            </motion.h3>
          </div>

          {/* Marquee Track for Clients */}
          <div className="relative w-full overflow-hidden">
            {/* Edge Gradients */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />

            <div
              className="flex w-max pause-hover items-center gap-12 sm:gap-16 lg:gap-20 py-4 sm:py-6"
              style={{ animation: 'marquee 50s linear infinite' }}
            >
              {clientsDoubled.map((client, idx) => (
                <motion.div
                  key={`client-${idx}`}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="flex items-center justify-center min-w-[160px] sm:min-w-[200px] lg:min-w-[240px] h-16 sm:h-20 lg:h-24 opacity-80 hover:opacity-100 transition-all duration-300 group cursor-pointer px-4"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className={`h-12 sm:h-16 lg:h-20 w-auto max-w-[170px] sm:max-w-[210px] lg:max-w-[240px] object-contain drop-shadow-sm group-hover:drop-shadow-[0_0_16px_rgba(108,232,195,0.7)] transition-all duration-300 pointer-events-none ${client.invert !== false ? 'brightness-0 invert' : ''}`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            ROW 2: SERVICES / TECH PARTNERS
        ========================================================= */}
        <div className="w-full pt-16 sm:pt-24">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-10 sm:mb-12">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base font-normal text-[#D4FAE6] mb-2.5 font-montserrat"
            >
              {servicesSubtitle}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl lg:text-[34px] font-normal text-white font-montserrat leading-snug max-w-4xl"
            >
              {servicesTitle}
            </motion.h3>
          </div>

          {/* Marquee Track for Services */}
          <div className="relative w-full overflow-hidden">
            {/* Edge Gradients */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />

            <div
              className="flex w-max pause-hover items-center gap-12 sm:gap-16 lg:gap-20 py-4 sm:py-6"
              style={{ animation: 'marquee 55s linear infinite reverse' }}
            >
              {servicesDoubled.map((service, idx) => (
                <motion.div
                  key={`service-${idx}`}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="flex items-center justify-center min-w-[160px] sm:min-w-[200px] lg:min-w-[240px] h-16 sm:h-20 lg:h-24 opacity-80 hover:opacity-100 transition-all duration-300 group cursor-pointer px-4"
                >
                  <img
                    src={service.src}
                    alt={service.name}
                    className={`h-12 sm:h-16 lg:h-20 w-auto max-w-[170px] sm:max-w-[210px] lg:max-w-[240px] object-contain drop-shadow-sm group-hover:drop-shadow-[0_0_16px_rgba(108,232,195,0.7)] transition-all duration-300 pointer-events-none ${service.invert !== false ? 'brightness-0 invert' : ''}`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================
  // HOMEPAGE DEFAULT VARIANT
  // =========================================================
  const effectiveRows: LogoItem[][] = (() => {
    if (customRows && customRows.length > 0) {
      const valid = customRows.filter((r) => Array.isArray(r) && r.length > 0);
      if (valid.length > 0) return valid;
    }
    const r1 = customRow1 && customRow1.length > 0 ? customRow1 : row1Partners;
    const r2 = customRow2 && customRow2.length > 0 ? customRow2 : row2Partners;
    return [r1, r2];
  })();

  return (
    <section
      id={id}
      className="relative w-full py-24 sm:py-32 lg:py-36 xl:py-40 bg-[#0A0D0E] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
        {/* Header Block */}
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-normal text-white font-montserrat leading-[1.18] tracking-tight mb-7 whitespace-pre-line"
          >
            {title ? (
              title
            ) : (
              <>
                Operating Across the World&apos;s
                <br className="hidden sm:inline" /> Leading Marketplaces &amp; Platforms
              </>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg lg:text-[19px] text-[#b3b3b3] font-light leading-[1.8] font-montserrat max-w-3xl whitespace-pre-line"
          >
            {description ||
              'EGEAD drives cross-border e-commerce growth across major global platforms, including TikTok Shop, Shopify, Etsy, and eBay. Combining data-driven marketing via TikTok & Google Ads with streamlined fulfillment and dedicated operating tools, we help products reach international consumers efficiently.'}
          </motion.p>
        </div>
      </div>

      {/* Dynamic Marquee Rows (Xen kẽ: Hàng 1, 3, 5... cuộn sang trái; Hàng 2, 4, 6... cuộn sang phải) */}
      <div className="relative w-full overflow-hidden space-y-8 sm:space-y-12">
        {effectiveRows.map((rowLogos, rowIndex) => {
          const isReverse = rowIndex % 2 === 1;
          const doubled = rowLogos.length < 8
            ? [...rowLogos, ...rowLogos, ...rowLogos, ...rowLogos]
            : [...rowLogos, ...rowLogos];
          const animDuration = 55 + (rowIndex % 3) * 5;

          return (
            <div key={`row-${rowIndex}`} className="relative w-full overflow-hidden">
              {/* Subtle Left & Right Edge Gradients */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#0A0D0E] via-[#0A0D0E]/80 to-transparent z-10" />

              <div
                className="flex w-max pause-hover items-center gap-8 sm:gap-12 lg:gap-16"
                style={{
                  animation: `marquee ${animDuration}s linear infinite ${isReverse ? 'reverse' : 'normal'}`,
                }}
              >
                {doubled.map((partner, idx) => {
                  const shouldInvert =
                    partner.invert ?? partner.src?.startsWith('/assets/partners/');

                  return (
                    <motion.div
                      key={`r${rowIndex}-${idx}`}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="flex items-center justify-center min-w-[140px] sm:min-w-[170px] lg:min-w-[200px] h-12 sm:h-14 lg:h-16 opacity-75 hover:opacity-100 transition-opacity duration-300 group cursor-pointer"
                    >
                      <img
                        src={partner.src}
                        alt={partner.name}
                        className={`h-full w-auto max-h-10 sm:max-h-12 max-w-[160px] object-contain drop-shadow-sm group-hover:drop-shadow-[0_0_12px_rgba(108,232,195,0.6)] transition-all duration-300 pointer-events-none ${
                          shouldInvert ? 'invert' : ''
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
