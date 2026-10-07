'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ContactBlock from '@/components/ContactBlock';

export interface CaseStudyItem {
  id: string;
  slug?: string;
  customer: string;
  title: string;
  description: string;
  image: string;
  services: string[];
  industries: string[];
  tags: string[];
  highlight?: string;
  order?: number;
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'urbanvibe-apparel',
    slug: 'urbanvibe-apparel',
    customer: 'UrbanVibe Apparel · High-Volume US Streetwear Brand',
    title: '100% Sub-24H Dispatch & Preserved TikTok Shop Fast Dispatch Badge.',
    description: 'Eliminated late-shipment strikes by deploying industrial DTF routing with sub-24h carrier injection across 28,000 peak holiday orders.',
    image: '/assets/case_suntory.jpg',
    services: ['Technology', 'Operations'],
    industries: ['Fashion & Lifestyle', 'Consumer Goods'],
    tags: ['POD FULFILLMENT', 'TIKTOK SHOP US'],
    highlight: 'Zero LDR Violations',
    order: 1,
  },
  {
    id: 'jsr-materials',
    slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
    customer: 'A leading Japanese advanced materials manufacturer',
    title: 'Unleashing the power of data to streamline business processes and decision making.',
    description: 'Harnessing data for streamlined business processes and decisions with deployment of 48 Business Sites.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/1b3c5b2a-d93a-4555-8210-69d300e7c358:435531399b3b343c44848d4119617003d132cbd0/Thumbnail_Services_JSR.jpg',
    services: ['Technology'],
    industries: ['Engineering/Manufacturing'],
    tags: ['MARKETING', 'TECHNOLOGY'],
    highlight: 'Deployment of 48 Business Sites',
    order: 2,
  },
  {
    id: 'beauty-garage',
    customer: 'A premier beauty salon equipment and product supplier',
    title: 'A 150% increase in customer acquisition with omnichannel digital experience.',
    description: 'Transforming e-commerce operations and inventory fulfillment to serve salon professionals across APAC.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/7a0341f2-3744-46fa-9107-5154730edc74:29a205e69ac33b344eeb13bd2123976e5bc54d2a/Thumbnail_Services_BeautyGarage.jpg',
    services: ['Technology', 'Marketing'],
    industries: ['Consumer Goods'],
    tags: ['MARKETING', 'COMMERCE'],
    highlight: 'A 150% increase in customer acquisition',
    order: 3,
  },
  {
    id: 'lumina-dtc',
    customer: 'A high-growth direct-to-consumer lifestyle brand',
    title: 'Scaling ad spend from $5,000 to $25,000/day with unit economics assurance.',
    description: 'Synchronized ad creative testing with automated fulfillment pipelines, unlocking +185% net margin expansion.',
    image: '/assets/insight_dtf_tech.jpg',
    services: ['Marketing', 'Technology'],
    industries: ['Consumer Goods', 'Fashion & Lifestyle'],
    tags: ['PERFORMANCE ADS', 'SCALE'],
    highlight: '+185% Margin Expansion',
    order: 4,
  },
  {
    id: 'weir-minerals',
    customer: 'A global mining equipment and mineral processing solutions company',
    title: 'Digitizing a B2B legacy across 14 markets.',
    description: 'Unified digital commerce and localized catalog architecture powering seamless replacement part ordering across 14 international territories.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/8795d227-0bf0-4ddf-9018-0f631ef77c25:2a2b8a4b06cf09bb13e4f18d28f49550efeef129/Thumbnail_Services_Weir2.jpg',
    services: ['Technology', 'Creative'],
    industries: ['Engineering/Manufacturing'],
    tags: ['TECHNOLOGY', 'B2B COMMERCE'],
    order: 5,
  },
  {
    id: 'suntory-wellness',
    customer: 'A global beverage and wellness company',
    title: 'Multi-channel experience and optimized customer engagement.',
    description: 'Architecting high-conversion D2C wellness storefronts with automated recurring subscriptions and localized logistics.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/1401a2d5-b9ed-4f38-8416-0bb91b07c87c:da7b9f694a89131e05120bb9414937f637b5e329/Thumbnail_Services_Brands2.jpg',
    services: ['Technology', 'Experience'],
    industries: ['Health & Wellness', 'Consumer Goods'],
    tags: ['EXPERIENCE', 'OMNICHANNEL'],
    order: 6,
  },
  {
    id: 'homecraft-studio',
    customer: 'Omnichannel home decor seller on TikTok Shop, Amazon & Etsy',
    title: 'Zero overselling incidents across 4 channels during peak holiday rush.',
    description: 'Real-time bidirectional inventory safety buffer engine preventing order cancellations and channel penalties.',
    image: '/assets/insight_wms_cloud.jpg',
    services: ['Technology'],
    industries: ['Marketplace', 'Consumer Goods'],
    tags: ['INVENTORY SYNC', 'WMS'],
    order: 7,
  },
  {
    id: 'hirose-electric',
    customer: 'A Japanese manufacturer of electronic connectors and components',
    title: 'SAP Marketing Cloud revolutionizes international connector operations.',
    description: 'Consolidating global lead intelligence and technical inquiry workflows into automated real-time sales pipelines.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/c407ae15-b525-4175-85db-d4a0d91eaf5e:675f0c4961aa3e125d0248305a921b0b0d2c8157/Thumbnail_Services_Hirose.jpg',
    services: ['Technology', 'Marketing'],
    industries: ['Engineering/Manufacturing'],
    tags: ['MARKETING', 'CLOUD'],
    order: 8,
  },
  {
    id: 'beisia-retail',
    customer: 'A Japanese retail and supermarket chain',
    title: 'Driving a thriving ecommerce transformation.',
    description: 'Seamless online-to-offline supermarket ordering and localized micro-fulfillment across regional Japanese networks.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/9feec46e-2c76-468e-9d2c-5c9093d8c400:65bdd1cef76b20c72030be1f60b1a03dc5aa3969/Thumbnail_Services_Beisia.jpg',
    services: ['Technology', 'Experience'],
    industries: ['Consumer Goods', 'Food & Beverages'],
    tags: ['RETAIL', 'O2O'],
    order: 9,
  },
  {
    id: 'edwin-denim',
    customer: 'A leading American denim brand',
    title: 'Navigating new market entry with targeted ecommerce and marketing strategies.',
    description: 'High-touch localized brand storytelling paired with frictionless cross-border payments and order fulfillment.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/01fe2434-2f28-404e-91af-99d1507b9ccd:cebe943a65c206a058b55d41510978a3bbc908b7/Thumbnail_Services_Edwin.jpg',
    services: ['Creative', 'Marketing', 'Technology'],
    industries: ['Fashion & Lifestyle'],
    tags: ['FASHION', 'BRANDING'],
    order: 10,
  },
  {
    id: 'saitex-circular',
    customer: 'A worldwide denim manufacturing and innovation company',
    title: 'Crafting digital circularity: Saitex\'s digitized supply chain transformation.',
    description: 'Full traceability from raw yarn to finished garments with automated ESG reporting and production scheduling.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/bc94542e-5ea2-47a5-a409-5c0e3ddafdd2:6c12e382a61253a716fe3f7830338b51d0aa7369/Thumbnail_Services_Saitex.jpg',
    services: ['Creative', 'Experience', 'Marketing', 'Technology'],
    industries: ['Engineering/Manufacturing', 'Fashion & Lifestyle'],
    tags: ['CIRCULARITY', 'SUPPLY CHAIN'],
    order: 11,
  },
  {
    id: 'manulife-asia',
    customer: 'A multi-market financial services and insurance provider',
    title: 'Navigating millennials to Manulife: a digital insurance transformation.',
    description: 'Human-centered self-service onboarding flows that reduced customer acquisition drop-off by 42%.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/8539f88d-bc1d-497f-a09c-c97b3376605c:b7fd497cc20efd2a903db65e34d8d78a6f0ceb65/Thumbnail_Services_Manulife.jpg',
    services: ['Creative', 'Experience', 'Marketing'],
    industries: ['Banking & Insurance'],
    tags: ['FINTECH', 'EXPERIENCE'],
    order: 12,
  },
  {
    id: 'goodsmile-collectibles',
    customer: 'A Japanese character merchandise and collectibles company',
    title: 'Soaring sales with SAP commerce and human-centered redesign.',
    description: 'Scalable cloud infrastructure handling 50,000 concurrent collectors during limited-run product drops.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/cb263582-6839-4573-b1ac-7e23c6075f68:e8f22fdc55f3dab27575f07d5410019fe1568b98/Thumbnail_Services_GoodSmile.jpg',
    services: ['Creative', 'Technology'],
    industries: ['Consumer Goods'],
    tags: ['COLLECTIBLES', 'HIGH TRAFFIC'],
    order: 13,
  },
  {
    id: 'brother-electronics',
    customer: 'An international printing and electronics solutions company',
    title: 'Building a global consolidated experience.',
    description: 'Unified customer portal connecting enterprise printer fleet management, consumable auto-reordering, and field service dispatch.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/379a455b-581c-4f4c-94b3-dd3fdba3d79f:0a8cd0b670df3638cffb30d8df035550c5336a10/Thumbnail_Services_Brother.jpg',
    services: ['Creative', 'Technology'],
    industries: ['Consumer Goods', 'Engineering/Manufacturing'],
    tags: ['IOT', 'ENTERPRISE'],
    order: 14,
  },
  {
    id: 'printwave-network',
    customer: 'Enterprise on-demand print manufacturer',
    title: 'Automated dynamic order routing across 3 US fulfillment hubs.',
    description: 'Sub-second webhook execution and automated carrier rate shopping, slashing shipping cost by $1.85 per package.',
    image: '/assets/insight_supply_chain.jpg',
    services: ['Technology'],
    industries: ['Marketplace', 'Engineering/Manufacturing'],
    tags: ['API ROUTING', 'WMS'],
    order: 15,
  },
  {
    id: 'haas-machining',
    customer: 'A large-scale manufacturer of machining and industrial equipment',
    title: 'Unlocking the power of manufacturing B2B2C commerce.',
    description: 'Streamlined spare part ordering catalogs with real-time distributor inventory checks across global dealer networks.',
    image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/668a1d85-ca35-42a3-8728-246574a35d89:4bf904ab24d6489f263275cb0688685b5dce9bdb/Thumbnail_Services_Haas.jpg',
    services: ['Technology'],
    industries: ['Engineering/Manufacturing'],
    tags: ['B2B2C', 'MANUFACTURING'],
    order: 16,
  },
];

export const SERVICE_OPTIONS = [
  'All Services',
  'Technology',
  'Marketing',
  'Creative',
  'Experience',
];

export const INDUSTRY_OPTIONS = [
  'All Industries',
  'Engineering/Manufacturing',
  'Consumer Goods',
  'Fashion & Lifestyle',
  'Health & Wellness',
  'Banking & Insurance',
  'Food & Beverages',
  'Marketplace',
];

export default function OurWorkClient() {
  const [selectedService, setSelectedService] = useState('All Services');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');

  const filteredStudies = useMemo(() => {
    return CASE_STUDIES.filter((item) => {
      const matchService =
        selectedService === 'All Services' ||
        item.services.includes(selectedService);
      const matchIndustry =
        selectedIndustry === 'All Industries' ||
        item.industries.includes(selectedIndustry);
      return matchService && matchIndustry;
    });
  }, [selectedService, selectedIndustry]);

  return (
    <div className="ourwork" id="ourwork">
      {/* 1. SAI DIGITAL SIGNATURE HEADER TOP */}
      <div className="ourwork__header" id="ourwork__header">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="ourwork__header--top"
        >
          <span className="subtitle font-montserrat">Our Work</span>
          <div className="title">
            <h1 className="font-montserrat">
              <span className="bg-gradient-to-r from-[#7ceee0] via-[#5EFC8D] to-[#10E774] bg-clip-text text-transparent">
                Impactful Experiences
              </span>{' '}
              from <br className="hidden sm:inline" />
              Strategy to Deployment.
            </h1>
          </div>
        </motion.div>

        {/* 2. FILTER BAR MATCHING SAI DIGITAL .ourwork__header--bottom */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="ourwork__header--bottom"
          id="case-study-filters"
        >
          <div className="filter">
            <form className="flex flex-wrap items-center gap-3 sm:gap-4" onSubmit={(e) => e.preventDefault()}>
              {/* Service Filter Select */}
              <div className="relative min-w-[200px] sm:min-w-[260px]">
                <label htmlFor="service-filter" className="sr-only">Filter by Service</label>
                <select
                  id="service-filter"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full h-[46px] px-4 py-2.5 rounded-lg border border-[#444] bg-[#000000] text-white text-sm font-montserrat appearance-none cursor-pointer hover:border-[#7ceee0] transition-colors focus:outline-none focus:border-[#7ceee0] shadow-[0_2px_0_0_#2e2e2e]"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#141718] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C8C8C]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 14 14">
                    <path d="M4.3225 4.83789L7 7.50956L9.6775 4.83789L10.5 5.66039L7 9.16039L3.5 5.66039L4.3225 4.83789Z" />
                  </svg>
                </div>
              </div>

              {/* Industry Filter Select */}
              <div className="relative min-w-[200px] sm:min-w-[260px]">
                <label htmlFor="industry-filter" className="sr-only">Filter by Industry</label>
                <select
                  id="industry-filter"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full h-[46px] px-4 py-2.5 rounded-lg border border-[#444] bg-[#000000] text-white text-sm font-montserrat appearance-none cursor-pointer hover:border-[#7ceee0] transition-colors focus:outline-none focus:border-[#7ceee0] shadow-[0_2px_0_0_#2e2e2e]"
                >
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#141718] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8C8C8C]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 14 14">
                    <path d="M4.3225 4.83789L7 7.50956L9.6775 4.83789L10.5 5.66039L7 9.16039L3.5 5.66039L4.3225 4.83789Z" />
                  </svg>
                </div>
              </div>

              {/* Reset if active */}
              {(selectedService !== 'All Services' || selectedIndustry !== 'All Industries') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedService('All Services');
                    setSelectedIndustry('All Industries');
                  }}
                  className="text-xs text-[#7ceee0] hover:underline px-2 py-1 font-montserrat"
                >
                  Reset filters
                </button>
              )}
            </form>
          </div>

          {/* Results count matching SAI Digital */}
          <div className="result flex items-center gap-2 text-sm text-[#8c8c8c] font-montserrat">
            <span className="w-2 h-2 rounded-full bg-[#7ceee0]" />
            <span>Showing <strong className="text-white font-medium">{filteredStudies.length}</strong> Results</span>
          </div>
        </motion.div>
      </div>

      {/* 3. 2-COLUMN CASE STUDIES GRID MATCHING SAI DIGITAL .ourwork__body */}
      <div className="ourwork__body" id="case-studies-grid">
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.75,
                delay: (idx % 2) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="w-full"
            >
              <Link
                href={`/case-studies/${study.slug || study.id}`}
                className="ourwork__item group block"
              >
                {/* Visual Media Container */}
                <div className="image shadow-[0_12px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_40px_rgba(124,238,224,0.15)] transition-shadow duration-500">
                  <Image
                    src={study.image}
                    alt={study.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Information Block */}
                <div className="info">
                  {/* Category & Capability Tags */}
                  <div className="tag">
                    {study.tags.map((tag) => (
                      <span key={tag} className="tag--item">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Customer subtitle */}
                  <div className="customer font-montserrat">
                    {study.customer}
                  </div>

                  {/* Cyan highlighted Title */}
                  <h2 className="title font-montserrat group-hover:text-[#7ceee0] transition-colors duration-300">
                    {study.title}
                  </h2>

                  {/* Descriptive Overview */}
                  <p className="description font-montserrat">
                    {study.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State if filter yields 0 */}
      {filteredStudies.length === 0 && (
        <div className="ourwork__no__results text-center py-20 text-[#b3b3b3] font-montserrat">
          <p className="text-xl">No case studies match the selected filters.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedService('All Services');
              setSelectedIndustry('All Industries');
            }}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#10E774] text-black font-semibold text-sm"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* 4. SIGNATURE CONTACT BLOCK AT BOTTOM */}
      <motion.div
        id="contact"
        className="scroll-mt-28"
        initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <ContactBlock />
      </motion.div>
    </div>
  );
}
