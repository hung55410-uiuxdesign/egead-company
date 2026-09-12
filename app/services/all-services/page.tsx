import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, Sparkles, Cpu, Activity } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'Our Services | SAI Digital: Complete CX Transformation Capabilities',
  description: 'Explore SAI Digital comprehensive capabilities across Strategy & Design, Data & Analytics, Enterprise Technology, and Commerce Operations.',
};

const servicePillars = [
  {
    id: 'strategy-design',
    number: '01',
    title: 'Strategy & Design',
    desc: 'We define the roadmap for your enterprise digital commerce ecosystem, ensuring user-centric journeys that turn browsers into lifelong brand advocates.',
    icon: '/assets/home-icon__1_.svg',
    subServices: [
      {
        name: 'Commerce Strategy Consulting',
        description: 'Omnichannel roadmaps, business model modernization, marketplace strategies, and international expansion planning.',
      },
      {
        name: 'Experience Design & Brand Architecture',
        description: 'UI/UX systems, user research, customer journey mapping, and conversion rate optimization (CRO).',
      },
      {
        name: 'Marketing Strategy & Planning',
        description: 'Audience segmentation, personalized engagement workflows, and full-funnel retention frameworks.',
      },
    ],
  },
  {
    id: 'data-analytics',
    number: '02',
    title: 'Data & Analytics',
    desc: 'Turn disparate enterprise data streams into actionable predictive intelligence with machine learning and automated forecasting.',
    icon: '/assets/home-icon__2_.svg',
    subServices: [
      {
        name: 'Advanced Analytics & Forecasting',
        description: '93% accurate demand forecasting, inventory level optimization, and dynamic SKU performance prediction.',
      },
      {
        name: 'AI & Machine Learning Services',
        description: 'Predictive customer lifetime value (CLV), churn prevention algorithms, and automated product recommendations.',
      },
      {
        name: 'Business Intelligence & Marketing Analytics',
        description: 'Unified executive dashboards, attribution modeling, and automated cross-channel reporting.',
      },
    ],
  },
  {
    id: 'enterprise-technology',
    number: '03',
    title: 'Enterprise Technology',
    desc: 'Enterprise-grade headless and composable commerce architectures built for extreme scale, security, and sub-second global performance.',
    icon: '/assets/home-icon__3_.svg',
    subServices: [
      {
        name: 'Commerce Platform Implementation',
        description: 'Certified expertise in SAP Commerce Cloud, Shopify Plus, commercetools, and Adobe Magento.',
      },
      {
        name: 'Enterprise Systems Integration',
        description: 'Robust connectors between ERP (SAP, Oracle, NetSuite), CRM (Salesforce), OMS, and payment gateways.',
      },
      {
        name: 'Cloud Infrastructure & MACH Architecture',
        description: 'Microservices, API-first, Cloud-native SaaS, and Headless architectures deployed on AWS and GCP.',
      },
    ],
  },
  {
    id: 'commerce-cx-operations',
    number: '04',
    title: 'Commerce & CX Operations',
    desc: 'Uninterrupted 24/7 operations, creative content updates, and continuous platform enhancements so your business never stops selling.',
    icon: '/assets/home-icon__4_.svg',
    subServices: [
      {
        name: '24/7 Global Commerce Operations',
        description: 'Real-time site reliability monitoring, emergency escalation teams, SLA guarantees, and security patch management.',
      },
      {
        name: 'Marketing & AI Operations',
        description: 'Automated campaign execution, dynamic asset generation, and personalized promo engine management.',
      },
      {
        name: 'Creative Operations & Content Management',
        description: 'Catalog updates, seasonal promotional banners, multi-market localized merchandising, and digital asset workflows.',
      },
    ],
  },
];

export default function AllServicesPage() {
  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      {/* Services Hero Header */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
            Services & Capabilities
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            FROM CHALLENGES <br />
            TO <span className="text-[#7ceee0]">OPPORTUNITIES.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
            We deliver end-to-end digital commerce transformations that merge visionary strategy, robust enterprise technology, and relentless operational care.
          </p>
        </div>
      </section>

      {/* Services Detailed Pillars */}
      <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 space-y-16 sm:space-y-24 mb-28">
        {servicePillars.map((pillar) => (
          <div
            key={pillar.id}
            id={pillar.id}
            className="p-8 sm:p-12 lg:p-16 rounded-[36px] bg-[#141718] border border-white/10 hover:border-[#7ceee0]/40 transition duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-10 border-b border-white/10">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-mono font-bold text-[#7ceee0] bg-[#7ceee0]/10 px-3 py-1 rounded-full border border-[#7ceee0]/30">
                    {pillar.number}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    {pillar.title}
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <img
                  src={pillar.icon}
                  alt={pillar.title}
                  className="w-8 h-8 object-contain filter invert"
                />
              </div>
            </div>

            {/* Sub-capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
              {pillar.subServices.map((sub, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#0A0D0E]/60 border border-white/5 hover:border-white/20 transition"
                >
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7ceee0]" />
                    {sub.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {sub.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <ContactBlock />
    </div>
  );
}
