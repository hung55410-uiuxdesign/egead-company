export interface CaseStudyDetail {
  slug: string;
  title: string;
  customer: string;
  industry: string;
  service: string;
  tags: string[];
  highlight?: string;
  bannerImage: string;
  bannerVideo?: string;
  overview: {
    subtitle: string;
    title: string;
    image?: string;
    description?: string;
  };
  challengeSolution: {
    challengeTitle: string;
    challengeContent: string;
    solutionTitle: string;
    solutionContent: string;
  };
  task: {
    subtitle: string;
    title: string;
    images?: string[];
    taskItems: {
      taskTitle: string;
      description: string;
    }[];
  };
  nextCaseStudy?: {
    slug: string;
    title: string;
    customer: string;
  };
}

export const CASE_STUDIES_DETAILS: Record<string, CaseStudyDetail> = {
  'harnessing-data-for-streamlined-business-processes-and-decisions': {
    slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
    title: 'Unleashing the power of data to streamline business processes and decision making.',
    customer: 'A leading Japanese advanced materials manufacturer',
    industry: 'Engineering/Manufacturing',
    service: 'Technology',
    tags: ['MARKETING', 'TECHNOLOGY', 'DATA ANALYTICS'],
    highlight: 'Deployment of 48 Business Sites',
    bannerImage: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/1b3c5b2a-d93a-4555-8210-69d300e7c358:435531399b3b343c44848d4119617003d132cbd0/Thumbnail_Services_JSR.jpg',
    bannerVideo: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/f6143b40-faae-458f-86c9-cd40a4c9f9b6:9fc54a12679c470e3c03e979e25b33d1b8d75314/Summary.mp4',
    overview: {
      subtitle: 'OVERVIEW',
      title: 'Optimizing operational efficiency using custom digital solutions leveraging data at the core.',
      image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/2ea8ec79-da2d-4bab-967c-cf600beb28e1:0d9adebce8a2cec2c1941f80c8732bb3d40a92a0/Overview.jpg',
      description: 'Harnessing enterprise data architecture to modernize disparate global manufacturing subsidiaries into a synchronized commerce and operations ecosystem.',
    },
    challengeSolution: {
      challengeTitle: 'Uncertain sales pipelines and fragmented data impede global expansion.',
      challengeContent: 'The manufacturer faced challenges with uncertain sales processes, difficulty predicting revenue, and limited customer data and insights access. This hindered their ability to make informed decisions and manage the customer lifecycle effectively across international divisions.',
      solutionTitle: 'Improved data sharing aids strategic, lifecycle-driven business decisions.',
      solutionContent: 'Our custom architecture improved information sharing between the group and global accounts, providing real-time visibility into operations. With centralized customer data, the company is now able to manage lifecycles and make strategic, data-driven decisions that secure sustainable profitability.',
    },
    task: {
      subtitle: 'TASK',
      title: 'Leveraging the power of data to deliver an incomparable business experience.',
      images: [
        'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/22f9ff8d-0777-4a81-badc-e8867e1ea779:0f2a255be2b4a5de48e4e4fe8894ffec31efa708/Task1.png',
        'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/799d481c-fbe4-41ab-98d6-76ccc9497aaf:a3a20ea8d44700afb5724862207907d1876426bf/Task2.png',
      ],
      taskItems: [
        {
          taskTitle: 'Accelerating precision in information sharing.',
          description:
            'The implementation of advanced algorithms brought about a decisive operational transformation. This advancement improved coordination across 48 regional business sites, expediting the flow of technical information and eliminating communication bottlenecks.',
        },
        {
          taskTitle: 'Boosting business process visibility.',
          description:
            'Customized digital dashboards augmented visibility into manufacturing throughput and buyer demand. Complex ordering processes were streamlined, allowing agility and swift adaptation to fluctuating raw material market dynamics.',
        },
        {
          taskTitle: 'Securing long-term competitive advantage.',
          description:
            'A data-centric perspective offered in-depth understanding of enterprise procurement trends, empowering leadership to preemptively address customer inquiries and protect global market share.',
        },
        {
          taskTitle: 'Aligning operations with financial objectives.',
          description:
            'By evaluating market forecasts, manufacturing capacities, and margin parameters, every operational deployment was harmonized directly with the enterprise financial roadmap.',
        },
      ],
    },
    nextCaseStudy: {
      slug: 'urbanvibe-apparel',
      title: '100% Sub-24H Dispatch & Preserved TikTok Shop Fast Dispatch Badge.',
      customer: 'UrbanVibe Apparel (US)',
    },
  },
  'urbanvibe-apparel': {
    slug: 'urbanvibe-apparel',
    title: '100% Sub-24H Dispatch & Preserved TikTok Shop Fast Dispatch Badge.',
    customer: 'UrbanVibe Apparel · High-Volume US Streetwear Brand',
    industry: 'Fashion & Lifestyle',
    service: 'Technology & POD Operations',
    tags: ['POD FULFILLMENT', 'TIKTOK SHOP US', 'SLA SAFETY'],
    highlight: 'Zero Late Dispatch Violations',
    bannerImage: '/assets/case_suntory.jpg',
    overview: {
      subtitle: 'OVERVIEW',
      title: 'Eliminating carrier delay penalties on TikTok Shop US with industrial sub-24h DTF fulfillment.',
      image: '/assets/egead_apparel_dtf_1791360436072.jpg',
      description: 'How UrbanVibe handled 28,000 peak holiday orders without a single account strike or throttle from TikTok Shop discovery algorithms.',
    },
    challengeSolution: {
      challengeTitle: 'Legacy 4-day fulfillment delays triggered TikTok Shop account throttling.',
      challengeContent: 'UrbanVibe faced algorithmic demotion and critical late-shipment strikes due to traditional print-on-demand suppliers taking 3 to 5 business days for batch production during flash sales.',
      solutionTitle: 'Sub-24h automated routing with direct USPS carrier injects.',
      solutionContent: 'E-GEAD deployed automated webhook order ingest and direct barcode production routing, guaranteeing carrier scan in under 24 hours at a transparent $6 all-in unit rate.',
    },
    task: {
      subtitle: 'TASK',
      title: 'Architecting an uninterrupted fulfillment pipeline for high-velocity viral drops.',
      images: [
        '/assets/insight_dtf_tech.jpg',
        '/assets/insight_wms_cloud.jpg',
      ],
      taskItems: [
        {
          taskTitle: 'Sub-second API order ingestion.',
          description: 'Synchronized TikTok Shop Partner APIs directly with our US warehouse routing engine, automating SKU assignment and design pre-flight checks.',
        },
        {
          taskTitle: '23-Inch industrial DTF production lines.',
          description: 'Maximized color fidelity and wash durability while maintaining continuous multi-garment output during 5,000+ unit daily order spikes.',
        },
        {
          taskTitle: 'Pre-sorted postal carrier injection.',
          description: 'Direct daily handoffs to regional USPS and UPS distribution hubs, ensuring initial acceptance scans occur on day zero.',
        },
        {
          taskTitle: 'Automated margin reconciliation.',
          description: 'Provided real-time visibility into net unit profitability, giving media buyers certainty to scale daily ad spend profitably.',
        },
      ],
    },
    nextCaseStudy: {
      slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
      title: 'Unleashing the power of data to streamline business processes and decision making.',
      customer: 'A leading Japanese advanced materials manufacturer',
    },
  },
  'beauty-garage': {
    slug: 'beauty-garage',
    title: 'A 150% increase in customer acquisition with omnichannel digital experience.',
    customer: 'Beauty Garage · Japan Beauty Salon Equipment Marketplace',
    industry: 'Consumer Goods',
    service: 'Technology & Marketing',
    tags: ['MARKETING', 'COMMERCE', 'APAC EXPANSION'],
    highlight: '150% Customer Acquisition Surge',
    bannerImage: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/7a0341f2-3744-46fa-9107-5154730edc74:29a205e69ac33b344eeb13bd2123976e5bc54d2a/Thumbnail_Services_BeautyGarage.jpg',
    overview: {
      subtitle: 'OVERVIEW',
      title: 'Modernizing B2B beauty commerce to support rapid domestic and international scale.',
      image: '/assets/insight_omnichannel.jpg',
      description: 'Delivering unified product catalogs, flexible tiered wholesale pricing, and automated dispatch across APAC salons.',
    },
    challengeSolution: {
      challengeTitle: 'Fragmented order channels and legacy wholesale catalogs slowed order processing.',
      challengeContent: 'Manual verification of licensed professional buyer accounts and split fulfillment systems led to slow checkout conversions and cart abandonment.',
      solutionTitle: 'Unified B2B e-commerce platform with automated credential validation.',
      solutionContent: 'Implemented high-speed catalog search, instant professional licensing checks, and multi-warehouse automated dispatch routing.',
    },
    task: {
      subtitle: 'TASK',
      title: 'Building a frictionless procurement platform for beauty professionals.',
      images: [
        '/assets/insight_ai_analytics.jpg',
        '/assets/insight_brand_ip.jpg',
      ],
      taskItems: [
        {
          taskTitle: 'Fast multi-currency checkout.',
          description: 'Tailored payment and tax processing for professional salon owners across regional Asian territories.',
        },
        {
          taskTitle: 'Intelligent inventory replenishment.',
          description: 'Automated predictive restocking notifications, ensuring high-frequency salon supplies never encounter stockouts.',
        },
      ],
    },
    nextCaseStudy: {
      slug: 'urbanvibe-apparel',
      title: '100% Sub-24H Dispatch & Preserved TikTok Shop Fast Dispatch Badge.',
      customer: 'UrbanVibe Apparel (US)',
    },
  },
  'lumina-dtc': {
    slug: 'lumina-dtc',
    title: 'Scaling ad spend from $5,000 to $25,000/day with unit economics assurance.',
    customer: 'Lumina Living · Direct-to-Consumer Lifestyle Brand',
    industry: 'Consumer Goods',
    service: 'Marketing & Technology',
    tags: ['PERFORMANCE ADS', 'SCALE', 'UNIT ECONOMICS'],
    highlight: '+185% Margin Expansion',
    bannerImage: '/assets/insight_dtf_tech.jpg',
    overview: {
      subtitle: 'OVERVIEW',
      title: 'Scaling performance marketing profitably through synchronized supply chain automation.',
      image: '/assets/insight_supply_chain.jpg',
      description: 'Automating the feedback loop between Facebook / TikTok ad spend and warehouse inventory to prevent stockouts and margin erosion.',
    },
    challengeSolution: {
      challengeTitle: 'Uncontrolled CAC spikes and stockouts throttled profitable growth.',
      challengeContent: 'Scaling campaigns rapidly led to out-of-stock notices, delayed customer deliveries, and declining advertising efficiency.',
      solutionTitle: 'Real-time inventory sync tied directly to programmatic ad triggers.',
      solutionContent: 'Automated rules pause ad sets when buffer inventory drops below threshold, while routing orders to regional nodes to preserve 3-day delivery.',
    },
    task: {
      subtitle: 'TASK',
      title: 'Aligning media spend with warehouse fulfillment velocity.',
      images: [
        '/assets/insight_ai_analytics.jpg',
        '/assets/insight_brand_ip.jpg',
      ],
      taskItems: [
        {
          taskTitle: 'Programmatic campaign throttling.',
          description: 'Custom API middleware linking Shopify inventory states to Meta & TikTok Ad accounts in real time.',
        },
        {
          taskTitle: 'Dual-coast US fulfillment nodes.',
          description: 'Optimized East and West Coast shipping zones to reduce cross-country transit fees by 26%.',
        },
      ],
    },
    nextCaseStudy: {
      slug: 'weir-minerals',
      title: 'Digitizing a B2B legacy across 14 markets.',
      customer: 'A global mining equipment and mineral processing solutions company',
    },
  },
  'weir-minerals': {
    slug: 'weir-minerals',
    title: 'Digitizing a B2B legacy across 14 markets.',
    customer: 'A global mining equipment and mineral processing solutions company',
    industry: 'Engineering/Manufacturing',
    service: 'Technology & Creative',
    tags: ['TECHNOLOGY', 'B2B COMMERCE'],
    highlight: 'Unified Commerce Across 14 Markets',
    bannerImage: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/8795d227-0bf0-4ddf-9018-0f631ef77c25:2a2b8a4b06cf09bb13e4f18d28f49550efeef129/Thumbnail_Services_Weir2.jpg',
    overview: {
      subtitle: 'OVERVIEW',
      title: 'Re-engineering enterprise digital infrastructure for heavy machinery replacement parts.',
      image: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/2ea8ec79-da2d-4bab-967c-cf600beb28e1:0d9adebce8a2cec2c1941f80c8732bb3d40a92a0/Overview.jpg',
      description: 'Streamlining complex multi-tier parts catalogs into an intuitive self-service portal for global engineers.',
    },
    challengeSolution: {
      challengeTitle: 'Decentralized catalogs and manual paper purchase orders slowed ordering cycles.',
      challengeContent: 'Industrial clients experienced multi-day lead times just to confirm part compatibility and receive custom enterprise price quotes.',
      solutionTitle: 'Digital 3D exploded parts viewer with real-time stock allocation.',
      solutionContent: 'Engineers can pinpoint exact replacement components visually, instantly verifying regional warehouse stock and agreed contract pricing.',
    },
    task: {
      subtitle: 'TASK',
      title: 'Transforming industrial parts procurement into high-speed digital transactions.',
      images: [
        'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/22f9ff8d-0777-4a81-badc-e8867e1ea779:0f2a255be2b4a5de48e4e4fe8894ffec31efa708/Task1.png',
        'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/799d481c-fbe4-41ab-98d6-76ccc9497aaf:a3a20ea8d44700afb5724862207907d1876426bf/Task2.png',
      ],
      taskItems: [
        {
          taskTitle: 'SAP ERP deep catalog integration.',
          description: 'Synchronized millions of legacy SKUs with dynamic customer contract rules across 14 country subdivisions.',
        },
        {
          taskTitle: 'Multi-language automated technical support.',
          description: 'Provided multilingual spec sheets and automated compatibility validation for field operators.',
        },
      ],
    },
    nextCaseStudy: {
      slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
      title: 'Unleashing the power of data to streamline business processes and decision making.',
      customer: 'A leading Japanese advanced materials manufacturer',
    },
  },
  'suntory-wellness': {
    slug: 'suntory-wellness',
    title: 'Multi-channel experience and optimized customer engagement.',
    customer: 'A global beverage and wellness company',
    industry: 'Health & Wellness',
    service: 'Technology & Experience',
    tags: ['EXPERIENCE', 'OMNICHANNEL'],
    highlight: '42% Lift in Lifetime Subscriber Value',
    bannerImage: 'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/1401a2d5-b9ed-4f38-8416-0bb91b07c87c:da7b9f694a89131e05120bb9414937f637b5e329/Thumbnail_Services_Brands2.jpg',
    overview: {
      subtitle: 'OVERVIEW',
      title: 'Elevating wellness D2C commerce through personalized customer journeys.',
      image: '/assets/insight_omnichannel.jpg',
      description: 'Creating high-retention subscription models and automated lifestyle replenishment journeys across Southeast Asia.',
    },
    challengeSolution: {
      challengeTitle: 'High subscriber churn and complex subscription re-ordering workflows.',
      challengeContent: 'Customers found it tedious to manage monthly deliveries, update payment details, or switch product formulations online.',
      solutionTitle: 'Frictionless headless subscriber portal with 1-click modifications.',
      solutionContent: 'Empowered customers to pause, swap flavors, or change delivery schedules seamlessly via mobile-first web apps.',
    },
    task: {
      subtitle: 'TASK',
      title: 'Engineering sustainable recurring revenue and brand advocacy.',
      images: [
        '/assets/insight_ai_analytics.jpg',
        '/assets/insight_brand_ip.jpg',
      ],
      taskItems: [
        {
          taskTitle: 'Predictive churn intervention.',
          description: 'AI-driven customer health scoring alerting care teams before churn indicators manifest.',
        },
        {
          taskTitle: 'Automated cross-sell cadence.',
          description: 'Tailored recommendations based on customer lifestyle goals and consumption frequency.',
        },
      ],
    },
    nextCaseStudy: {
      slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
      title: 'Unleashing the power of data to streamline business processes and decision making.',
      customer: 'A leading Japanese advanced materials manufacturer',
    },
  },
};

// Aliases
CASE_STUDIES_DETAILS['jsr-materials'] = CASE_STUDIES_DETAILS['harnessing-data-for-streamlined-business-processes-and-decisions'];

export function getCaseStudyBySlug(slug: string): CaseStudyDetail {
  if (CASE_STUDIES_DETAILS[slug]) {
    return CASE_STUDIES_DETAILS[slug];
  }

  // Graceful fallback for any unknown slug
  return {
    slug,
    title: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    customer: 'Enterprise Global Partner',
    industry: 'Technology & E-Commerce',
    service: 'Technology',
    tags: ['STRATEGY', 'COMMERCE', 'LOGISTICS'],
    highlight: 'Global Operational Transformation',
    bannerImage: '/assets/case_suntory.jpg',
    overview: {
      subtitle: 'OVERVIEW',
      title: 'Architecting high-scale digital commerce infrastructure with operational excellence.',
      image: '/assets/egead_smart_hub_1791360531967.jpg',
      description: 'Deploying end-to-end automation, real-time inventory synchronization, and agile cross-border logistics.',
    },
    challengeSolution: {
      challengeTitle: 'Managing rapid scaling demands across fragmented international marketplaces.',
      challengeContent: 'Operational friction and data siloing hindered international expansion and slowed critical supply chain decision-making.',
      solutionTitle: 'Unified digital architecture connecting production to carrier delivery.',
      solutionContent: 'Delivered an integrated technology stack providing sub-second order ingestion, transparent analytics, and automated multi-channel fulfillment.',
    },
    task: {
      subtitle: 'TASK',
      title: 'Delivering end-to-end operational mastery.',
      images: [
        '/assets/egead_wms_scanner_1791360551774.jpg',
        '/assets/insight_dtf_tech.jpg',
      ],
      taskItems: [
        {
          taskTitle: 'System integration and automated routing.',
          description: 'Seamless API orchestration unifying inventory, catalog sync, and order workflows.',
        },
        {
          taskTitle: 'Performance optimization and continuous improvement.',
          description: 'Proactive metrics monitoring ensuring 99.9% uptime and lightning-fast customer delivery.',
        },
      ],
    },
    nextCaseStudy: {
      slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
      title: 'Unleashing the power of data to streamline business processes and decision making.',
      customer: 'A leading Japanese advanced materials manufacturer',
    },
  };
}
