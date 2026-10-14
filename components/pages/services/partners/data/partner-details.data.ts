import type { PartnerDetailData } from '../sap/types';
import {
  SAP_ADVANTAGES,
  SAP_EXPERTISE,
  SAP_WHY_ITEMS,
  SAP_CASE_STUDIES,
} from '../sap/data/sap-partner.data';

export const SAP_PARTNER_DATA: PartnerDetailData = {
  slug: 'sap',
  name: 'SAP',
  metaTitle: 'SAP Partner Solutions & Enterprise Commerce | E-GEAD',
  metaDescription:
    'Give your enterprise business an unparalleled advantage with our tailored SAP solutions. We can help you streamline processes, enhance efficiency, and drive profitability.',
  hero: {
    name: 'SAP',
    badge: 'Qualified SAP Gold Partner',
    bannerImage:
      'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/86de0e07-7dd4-4ddd-afdc-723c96eba1dd:335aa49d18ee1cefc92c820c337d1f354a080065/SAP_banner_sept24.png',
    bannerFallback: '/images/services/enterprise_tech.jpg',
    bannerAlt: 'SAP Enterprise Solutions',
    headline: 'Unlock enterprise operational excellence.',
    description:
      'Give your enterprise business an unparalleled advantage with our tailored SAP solutions. We can help you streamline processes, enhance efficiency, and drive profitability.',
    ctaText: 'Schedule demo',
    ctaHref: '/contact-us?subject=sap-demo',
  },
  advantages: {
    subtitle: 'E-GEAD advantages',
    headline: 'Qualified SAP Gold Partner Specializing in CX Enterprise eCommerce Technologies.',
    items: SAP_ADVANTAGES,
  },
  expertise: {
    subtitle: 'Our expertise',
    headline: 'We are fluent in',
    items: SAP_EXPERTISE,
  },
  why: {
    titlePrefix: 'Why SAP',
    headline: 'Join +404,000 enterprise businesses who trust SAP.',
    description:
      'Global leaders choose SAP to orchestrate end-to-end commerce, ERP infrastructure, and multi-market scale.',
    items: SAP_WHY_ITEMS,
  },
  caseStudies: {
    subtitle: 'Proven outcomes',
    headline: 'Read our cases',
    items: SAP_CASE_STUDIES,
  },
  cta: {
    headingPart1: 'Unleash your ',
    headingHighlight: 'growth potential',
    headingPart2: ' with SAP now.',
    description:
      'Connect with our certified SAP solutions team to explore bespoke architectures, seamless migrations, and high-velocity commerce operations.',
    buttonText: "Let's talk",
    buttonHref: '/contact-us?subject=sap-consultation',
  },
};

export const SHOPIFY_PLUS_PARTNER_DATA: PartnerDetailData = {
  slug: 'shopify-plus',
  name: 'Shopify Plus',
  metaTitle: 'Shopify Plus Enterprise Partner & Global Commerce | E-GEAD',
  metaDescription:
    'Scale your enterprise omnichannel commerce with E-GEAD certified Shopify Plus solutions, custom checkout extensibility, and high-volume integrations.',
  hero: {
    name: 'Shopify Plus',
    badge: 'Certified Shopify Plus Partner',
    bannerImage: '/images/services/Top_Automotive.jpg',
    bannerFallback: '/images/services/Top_Automotive.jpg',
    bannerAlt: 'Shopify Plus Enterprise Commerce Platform',
    headline: 'Scale high-velocity D2C and B2B commerce globally.',
    description:
      'Deliver lightning-fast shopping experiences, customized checkout extensibility, headless storefronts, and seamless enterprise ERP synchronization.',
    ctaText: 'Explore Shopify solutions',
    ctaHref: '/contact-us?subject=shopify-plus',
  },
  advantages: {
    subtitle: 'Shopify Plus advantages',
    headline: 'Engineered for High-Growth Brands Handling Millions in Global GMV.',
    items: [
      {
        id: 'shopify-experience',
        metric: '10+ years',
        description:
          'of dedicated experience architecting high-converting Shopify Plus stores for leading global brands.',
        iconName: 'years',
      },
      {
        id: 'shopify-uptime',
        metric: '99.99% uptime',
        description:
          'during massive Black Friday & Cyber Monday flash sales processing over 50,000 orders per minute.',
        iconName: 'delivery',
      },
      {
        id: 'shopify-engineers',
        metric: '60+ engineers',
        description:
          'Certified Shopify Plus developers, Liquid specialists, and Hydrogen/Remix headless architects.',
        iconName: 'engineers',
      },
      {
        id: 'shopify-support',
        metric: '24/7 hypercare',
        description:
          'Continuous proactive monitoring, performance audits, and instant support for high-stakes launches.',
        iconName: 'support',
      },
    ],
  },
  expertise: {
    subtitle: 'Our technical capabilities',
    headline: 'We specialize in',
    items: [
      {
        id: 'shopify-headless',
        title: 'Headless Commerce & Hydrogen.',
        paragraphs: [
          'Modern consumers expect instant page loads and app-like shopping journeys.',
          'We engineer bespoke headless storefronts using Shopify Hydrogen, Oxygen, and Next.js, separating your frontend experience from backend logic for ultimate speed and flexibility.',
          'Unlock unlimited design freedom while maintaining full native access to Shopify Plus checkout, inventory, and promotions.',
        ],
        image: '/images/services/enterprise_tech.jpg',
        imageFallback: '/images/services/enterprise_tech.jpg',
        alt: 'Shopify Plus Headless Commerce',
      },
      {
        id: 'shopify-integrations',
        title: 'ERP, WMS & Marketplace Sync.',
        paragraphs: [
          'Enterprise commerce requires harmonious bi-directional data flow.',
          'We build robust programmatic middleware linking Shopify Plus to enterprise systems including SAP S/4HANA, NetSuite, Microsoft Dynamics, and custom warehouse management platforms.',
          'Real-time automated inventory allocation, order dispatching, and return reconciliation at any volume.',
        ],
        image: '/images/services/Btm_Automotive.jpg',
        imageFallback: '/images/services/Btm_Automotive.jpg',
        alt: 'Shopify Plus ERP Integration',
      },
      {
        id: 'shopify-checkout',
        title: 'Checkout Extensibility & Custom Apps.',
        paragraphs: [
          'Maximize average order value with customized post-purchase upsells and personalized checkout rules.',
          'We leverage Shopify Checkout Extensibility and Shopify Functions to inject custom validation, dynamic delivery options, and corporate loyalty rewards directly into the checkout flow.',
          'Full PCI compliance maintained with zero security liability for your business.',
        ],
        image: '/images/services/data_analytics.jpg',
        imageFallback: '/images/services/data_analytics.jpg',
        alt: 'Shopify Plus Checkout Extensibility',
      },
      {
        id: 'shopify-b2b',
        title: 'Wholesale & B2B Omnichannel.',
        paragraphs: [
          'Operate both your consumer D2C and wholesale B2B business from a unified Shopify Plus admin.',
          'Custom price lists, net payment terms, volume tiered discounting, and company access profiles allow enterprise buyers to order self-serve 24/7.',
          'Reduce manual sales processing time by over 70% while improving B2B customer retention.',
        ],
        image: '/images/services/strategy_design.jpg',
        imageFallback: '/images/services/strategy_design.jpg',
        alt: 'Shopify Plus B2B Commerce',
      },
    ],
  },
  why: {
    titlePrefix: 'Why Shopify Plus',
    headline: 'Chosen by over 10,000 top enterprise brands worldwide.',
    description:
      'From global retail giants to hyper-growth digital native direct-to-consumer icons, Shopify Plus delivers unbeatable agility.',
    items: [
      {
        id: 'tco',
        title: 'Drastically lower total cost of ownership',
        content:
          'Eliminate server maintenance overhead, costly hosting patches, and complex upgrades while scaling infinitely with managed cloud reliability.',
      },
      {
        id: 'speed-to-market',
        title: 'Unrivaled time-to-market',
        content:
          'Launch new international storefronts, localized campaigns, and experimental product lines in weeks instead of months.',
      },
      {
        id: 'checkout-rate',
        title: 'Industry-leading checkout conversion',
        content:
          'Shop Pay delivers up to 50% higher checkout conversion compared to standard guest checkout options.',
      },
      {
        id: 'omnichannel',
        title: 'Unified retail POS and digital commerce',
        content:
          'Connect physical brick-and-mortar stores with digital sales channels for real-time inventory visibility and omnichannel fulfillment.',
      },
      {
        id: 'ecosystem',
        title: 'Massive app ecosystem and APIs',
        content:
          'Tap into thousands of pre-built integrations and powerful GraphQL APIs to assemble a best-of-breed commerce stack.',
      },
    ],
  },
  caseStudies: {
    subtitle: 'Client success stories',
    headline: 'Realized business impact',
    items: [
      {
        id: 'lumina-home',
        slug: 'lumina-home-shopify-google-shopping',
        customer: 'Lumina Home Living & Decor',
        title: 'Achieving 240% GMV expansion with customized Shopify Plus headless infrastructure.',
        tags: ['Shopify Plus', 'Headless', 'Omnichannel'],
        image: '/images/services/Top_Automotive.jpg',
      },
      {
        id: 'weir-minerals-case',
        slug: 'digitizing-a-b2b-legacy-across-14-markets',
        customer: 'Global Equipment Manufacturer',
        title: 'Transforming legacy catalog orders into automated B2B self-service commerce.',
        tags: ['B2B eCommerce', 'Integration', 'Global Scale'],
        image:
          'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/8795d227-0bf0-4ddf-9018-0f631ef77c25:2a2b8a4b06cf09bb13e4f18d28f49550efeef129/Thumbnail_Services_Weir2.jpg',
      },
    ],
  },
  cta: {
    headingPart1: 'Supercharge your ',
    headingHighlight: 'commerce velocity',
    headingPart2: ' with Shopify Plus.',
    description:
      'Collaborate with our certified Shopify Plus engineering team to design, migrate, and scale your global eCommerce platform.',
    buttonText: 'Start your project',
    buttonHref: '/contact-us?subject=shopify-consultation',
  },
};

export const SITECORE_PARTNER_DATA: PartnerDetailData = {
  slug: 'sitecore',
  name: 'Sitecore',
  metaTitle: 'Sitecore Solution Partner & Composable DXP | E-GEAD',
  metaDescription:
    'Deliver personalized, content-rich customer experiences at scale with E-GEAD certified Sitecore XM Cloud, OrderCloud, and Content Hub solutions.',
  hero: {
    name: 'Sitecore',
    badge: 'Certified Sitecore Solution Partner',
    bannerImage: '/images/services/enterprise_tech.jpg',
    bannerFallback: '/images/services/enterprise_tech.jpg',
    bannerAlt: 'Sitecore Composable Digital Experience Platform',
    headline: 'Composable digital experience and content orchestration at scale.',
    description:
      'Orchestrate 1:1 personalized customer journeys, unified digital asset management, and composable commerce with Sitecore XM Cloud and Content Hub.',
    ctaText: 'Schedule architecture review',
    ctaHref: '/contact-us?subject=sitecore-demo',
  },
  advantages: {
    subtitle: 'Sitecore expertise',
    headline: 'Certified Sitecore Specialists Driving Enterprise Digital Experience Maturity.',
    items: [
      {
        id: 'sitecore-years',
        metric: '8+ years',
        description:
          'delivering enterprise Sitecore digital experience platforms across APAC, Europe, and the Americas.',
        iconName: 'years',
      },
      {
        id: 'sitecore-cloud',
        metric: '100% cloud native',
        description:
          'architectures leveraging Sitecore XM Cloud, modern headless rendering, and edge delivery.',
        iconName: 'delivery',
      },
      {
        id: 'sitecore-engineers',
        metric: '45+ specialists',
        description:
          'Certified Sitecore developers, solution architects, and content governance consultants.',
        iconName: 'engineers',
      },
      {
        id: 'sitecore-support',
        metric: '24/7 SLA assurance',
        description:
          'Strict enterprise service-level agreements guaranteeing 99.95% availability and rapid incident response.',
        iconName: 'support',
      },
    ],
  },
  expertise: {
    subtitle: 'Our technical domains',
    headline: 'Deep experience across',
    items: [
      {
        id: 'xm-cloud',
        title: 'Sitecore XM Cloud & Headless DXP.',
        paragraphs: [
          'Empower your marketing teams with intuitive visual editing while developers build modern Next.js frontends.',
          'Sitecore XM Cloud provides lightning-fast edge delivery, automatic upgrades, and seamless authoring workflows without traditional monolithic infrastructure burdens.',
          'Deliver blazing fast localized content across hundreds of global brand domains from a unified instance.',
        ],
        image: '/images/services/enterprise_tech.jpg',
        imageFallback: '/images/services/enterprise_tech.jpg',
        alt: 'Sitecore XM Cloud Headless Architecture',
      },
      {
        id: 'ordercloud',
        title: 'OrderCloud & Composable Commerce.',
        paragraphs: [
          'Complex B2B buyer hierarchies and custom workflows demand flexible API-first architecture.',
          'We engineer custom marketplace and procurement experiences powered by Sitecore OrderCloud, seamlessly orchestrating buyer approvals, custom catalogs, and punchout integrations.',
          'Scalable headless commerce infrastructure built to adapt to evolving enterprise requirements.',
        ],
        image: '/images/services/Btm_Automotive.jpg',
        imageFallback: '/images/services/Btm_Automotive.jpg',
        alt: 'Sitecore OrderCloud Composable Commerce',
      },
      {
        id: 'content-hub',
        title: 'Content Hub & DAM Strategy.',
        paragraphs: [
          'Eliminate content silos and fragmented digital assets across global marketing units.',
          'We configure Sitecore Content Hub (DAM, CMP, MRM) to create a single source of truth for all creative media, product information, and campaign timelines.',
          'Automated AI tagging, rights management, and instantaneous syndication to downstream publishing channels.',
        ],
        image: '/images/services/data_analytics.jpg',
        imageFallback: '/images/services/data_analytics.jpg',
        alt: 'Sitecore Content Hub DAM Strategy',
      },
      {
        id: 'cdp-personalize',
        title: 'Sitecore CDP & 1:1 Personalization.',
        paragraphs: [
          'Turn anonymous visitors into lifelong loyal brand advocates with predictive real-time intelligence.',
          'By connecting Sitecore Customer Data Platform (CDP) with Personalize, we enable contextual experiments, dynamic next-best-action prompts, and cross-channel profile unification.',
          'Measurable improvements in engagement, conversion rates, and lifetime customer value.',
        ],
        image: '/images/services/strategy_design.jpg',
        imageFallback: '/images/services/strategy_design.jpg',
        alt: 'Sitecore CDP and Real-Time Personalization',
      },
    ],
  },
  why: {
    titlePrefix: 'Why Sitecore',
    headline: 'Trusted by global Fortune 500 enterprises for brand authority.',
    description:
      'Deliver seamless digital journeys across web, mobile, portals, and smart devices with enterprise governance.',
    items: [
      {
        id: 'omnichannel-content',
        title: 'Omnichannel content velocity',
        content:
          'Create and review content once, then publish instantly across all digital properties, mobile apps, and self-service portals.',
      },
      {
        id: 'edge-performance',
        title: 'Sub-second edge delivery',
        content:
          'Edge caching and static page pre-generation ensure optimal Core Web Vitals and lightning-fast global page loads.',
      },
      {
        id: 'ai-personalization',
        title: 'Real-time contextual personalization',
        content:
          'Leverage machine learning algorithms to personalize content based on customer segment, intent, and historical purchase data.',
      },
      {
        id: 'composable-choice',
        title: 'Composable modular architecture',
        content:
          'Adopt the exact digital capabilities your business needs without being locked into rigid monolithic platform suites.',
      },
      {
        id: 'multilingual-scale',
        title: 'Global multi-site & multilingual management',
        content:
          'Orchestrate dozens of localized market websites with granular role-based permissions and translation workflows.',
      },
    ],
  },
  caseStudies: {
    subtitle: 'Proven outcomes',
    headline: 'Client success stories',
    items: [
      {
        id: 'jsr-materials-sitecore',
        slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
        customer: 'Leading Advanced Materials Manufacturer',
        title: 'Harmonizing global digital properties into a unified composable experience platform.',
        tags: ['Sitecore', 'Composable DXP', 'Global Architecture'],
        image:
          'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/1b3c5b2a-d93a-4555-8210-69d300e7c358:435531399b3b343c44848d4119617003d132cbd0/Thumbnail_Services_JSR.jpg',
      },
      {
        id: 'weir-sitecore-case',
        slug: 'digitizing-a-b2b-legacy-across-14-markets',
        customer: 'Global Mining & Industrial Solutions',
        title: 'Digitizing customer experience and multi-language content across 14 international markets.',
        tags: ['Content Hub', 'Localization', 'B2B'],
        image:
          'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/8795d227-0bf0-4ddf-9018-0f631ef77c25:2a2b8a4b06cf09bb13e4f18d28f49550efeef129/Thumbnail_Services_Weir2.jpg',
      },
    ],
  },
  cta: {
    headingPart1: 'Elevate your ',
    headingHighlight: 'digital experiences',
    headingPart2: ' with Sitecore.',
    description:
      'Consult our certified Sitecore solution architects to map out your migration to XM Cloud and composable digital experience architectures.',
    buttonText: 'Talk to an architect',
    buttonHref: '/contact-us?subject=sitecore-consultation',
  },
};

export const STRIPE_PARTNER_DATA: PartnerDetailData = {
  slug: 'stripe',
  name: 'Stripe',
  metaTitle: 'Stripe Payments Partner & Global Financial Infrastructure | E-GEAD',
  metaDescription:
    'Integrate seamless global payments, recurring subscriptions, marketplace payouts, and fraud protection with E-GEAD certified Stripe solutions.',
  hero: {
    name: 'Stripe',
    badge: 'Official Stripe Verified Partner',
    bannerImage: '/images/services/data_analytics.jpg',
    bannerFallback: '/images/services/data_analytics.jpg',
    bannerAlt: 'Stripe Global Financial Infrastructure and Payments',
    headline: 'Unified programmatic payments and global monetization infrastructure.',
    description:
      'Accelerate revenue growth, eliminate checkout friction, automate recurring billing, and stop fraud with certified Stripe enterprise integrations.',
    ctaText: 'Explore payment solutions',
    ctaHref: '/contact-us?subject=stripe-payments',
  },
  advantages: {
    subtitle: 'Stripe capabilities',
    headline: 'Financial Infrastructure Engineered for Unstoppable Enterprise Scale.',
    items: [
      {
        id: 'stripe-uptime',
        metric: '99.999% uptime',
        description:
          'historical reliability across global payment rails handling hundreds of billions in annual transaction volume.',
        iconName: 'delivery',
      },
      {
        id: 'stripe-currencies',
        metric: '135+ currencies',
        description:
          'and dozens of regional payment methods supported natively with automated local entity settlement.',
        iconName: 'years',
      },
      {
        id: 'stripe-engineers',
        metric: '30+ payment experts',
        description:
          'Specialized in Stripe Connect multi-party payouts, custom billing engines, and Radar fraud scoring.',
        iconName: 'engineers',
      },
      {
        id: 'stripe-support',
        metric: 'Zero-friction compliance',
        description:
          'End-to-end PCI-DSS Level 1 compliance, automated SCA 3D Secure, and localized tax calculation.',
        iconName: 'support',
      },
    ],
  },
  expertise: {
    subtitle: 'Our integration expertise',
    headline: 'We build directly with',
    items: [
      {
        id: 'stripe-connect',
        title: 'Stripe Connect & Marketplace Payouts.',
        paragraphs: [
          'Building multi-vendor platforms and creator economies requires complex money movement.',
          'We engineer custom Stripe Connect architectures handling automated split payments, tiered vendor commissions, instant seller onboarding, and cross-border bank payouts.',
          'Maintain compliance with global financial regulations while providing a frictionless onboarding experience for your partners.',
        ],
        image: '/images/services/enterprise_tech.jpg',
        imageFallback: '/images/services/enterprise_tech.jpg',
        alt: 'Stripe Connect Marketplace Infrastructure',
      },
      {
        id: 'stripe-billing',
        title: 'Stripe Billing & Subscription Engines.',
        paragraphs: [
          'Monetize SaaS, digital goods, and recurring physical replenishment seamlessly.',
          'We implement flexible subscription logic including usage-based pricing, seat-based billing, enterprise invoicing, and automated smart dunning to recover failed payments.',
          'Reduce customer churn and eliminate manual accounting reconciliation through real-time webhooks.',
        ],
        image: '/images/services/Btm_Automotive.jpg',
        imageFallback: '/images/services/Btm_Automotive.jpg',
        alt: 'Stripe Billing and Subscriptions',
      },
      {
        id: 'stripe-radar',
        title: 'Stripe Radar & ML Fraud Protection.',
        paragraphs: [
          'Protect enterprise revenue without turning away genuine paying customers.',
          'We configure custom Stripe Radar machine learning rules, dynamic 3D Secure triggers, and risk thresholds trained on billions of global data points.',
          'Minimize costly chargeback fees and friendly fraud while maximizing authorization approval rates.',
        ],
        image: '/images/services/data_analytics.jpg',
        imageFallback: '/images/services/data_analytics.jpg',
        alt: 'Stripe Radar Machine Learning Fraud Defense',
      },
      {
        id: 'stripe-checkout',
        title: 'Global Checkout & Local Payment Rails.',
        paragraphs: [
          'Accept the payment methods your international buyers expect and trust.',
          'From Apple Pay and Google Pay to Klarna, WeChat Pay, Alipay, and European SEPA bank transfers, we provide localized checkout funnels optimized for conversion.',
          'Adaptive Acceptance technology uses AI to automatically retry cards through optimal network routes.',
        ],
        image: '/images/services/strategy_design.jpg',
        imageFallback: '/images/services/strategy_design.jpg',
        alt: 'Stripe Global Payment Methods',
      },
    ],
  },
  why: {
    titlePrefix: 'Why Stripe',
    headline: 'The financial technology backbone of millions of ambitious companies.',
    description:
      'From ambitious startups to global tech leaders like Amazon, Shopify, and Salesforce, businesses rely on Stripe.',
    items: [
      {
        id: 'higher-auth',
        title: 'Higher authorization rates',
        content:
          'Direct connections to global card networks and machine learning optimizations recover billions in revenue.',
      },
      {
        id: 'global-payouts',
        title: 'Rapid global expansion',
        content:
          'Accept payments from over 195 countries and settle in local currencies with minimal currency conversion drag.',
      },
      {
        id: 'developer-first',
        title: 'Best-in-class developer platform',
        content:
          'Comprehensive APIs, reliable webhooks, sandbox simulation environments, and official SDKs for rapid deployment.',
      },
      {
        id: 'automated-tax',
        title: 'Automated tax and revenue recognition',
        content:
          'Calculate and collect sales tax, VAT, and GST in real-time, coupled with GAAP/IFRS compliant automated revenue reporting.',
      },
      {
        id: 'unified-commerce',
        title: 'Unified online and point-of-sale commerce',
        content:
          'Unify digital checkout with in-person retail card readers using Stripe Terminal for a singular customer transaction ledger.',
      },
    ],
  },
  caseStudies: {
    subtitle: 'Proven outcomes',
    headline: 'Client success stories',
    items: [
      {
        id: 'jsr-materials-stripe',
        slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
        customer: 'Global Enterprise B2B Distributor',
        title: 'Automating multi-currency credit invoicing and automated invoice payment capture.',
        tags: ['Stripe Invoicing', 'Enterprise Billing', 'Automation'],
        image:
          'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/1b3c5b2a-d93a-4555-8210-69d300e7c358:435531399b3b343c44848d4119617003d132cbd0/Thumbnail_Services_JSR.jpg',
      },
      {
        id: 'lumina-home-stripe',
        slug: 'lumina-home-shopify-google-shopping',
        customer: 'Lumina Home Living',
        title: 'Accelerating international checkout conversion with localized payment methods.',
        tags: ['Global Payments', 'Apple Pay', 'Radar'],
        image: '/images/services/Top_Automotive.jpg',
      },
    ],
  },
  cta: {
    headingPart1: 'Modernize your ',
    headingHighlight: 'payment infrastructure',
    headingPart2: ' with Stripe.',
    description:
      'Partner with our certified Stripe integration team to boost card authorization rates, reduce fraud, and launch global checkout capabilities.',
    buttonText: 'Consult our payment team',
    buttonHref: '/contact-us?subject=stripe-consultation',
  },
};

export const TIKTOK_SHOP_PARTNER_DATA: PartnerDetailData = {
  slug: 'tiktok-shop-tiktok-ads',
  name: 'TikTok Shop & TikTok Ads',
  metaTitle: 'TikTok Shop & TikTok Ads Partner | E-GEAD E-Commerce Acceleration',
  metaDescription:
    'Bùng nổ doanh số bán hàng đa kênh tại Mỹ với giải pháp Shoppertainment, Video Shopping Ads (VSA) bản địa và quy trình fulfillment chuẩn SLA trên TikTok Shop.',
  hero: {
    name: 'TikTok Shop & TikTok Ads',
    badge: 'Official TikTok Shop US Partner',
    bannerImage: '/assets/insight_tiktok.jpg',
    bannerFallback: '/images/services/enterprise_tech.jpg',
    bannerAlt: 'TikTok Shop & Video Shopping Ads Acceleration',
    headline: 'Shoppertainment & Video Shopping Ads đột phá doanh số tại thị trường Mỹ.',
    description:
      'Khai thác tối đa thuật toán mua sắm của TikTok Shop US kết hợp chiến dịch Video Shopping Ads (VSA) bản địa và quy trình fulfillment tuân thủ SLA nghiêm ngặt.',
    ctaText: 'Đăng ký tư vấn TikTok Shop',
    ctaHref: '/contact-us?subject=tiktok-shop-consultation',
  },
  advantages: {
    subtitle: 'Ưu thế TikTok Shop cùng E-GEAD',
    headline: 'Khai Phá Kênh Bán Hàng Trực Tuyến Tăng Trưởng Nhanh Nhất Tại Mỹ.',
    items: [
      {
        id: 'tiktok-sla',
        metric: '99.8% On-time SLA',
        description: 'Quy trình đóng gói và điều phối vận chuyển nội địa Mỹ đáp ứng chuẩn xác quy chuẩn kiểm duyệt khắt khe của TikTok Shop US.',
        iconName: 'delivery',
      },
      {
        id: 'tiktok-roas',
        metric: '3.2x ROAS mục tiêu',
        description: 'Tối ưu chiến dịch Video Shopping Ads (VSA) với kịch bản bản địa hóa giữ chân khách hàng ngay trong 3 giây đầu tiên.',
        iconName: 'years',
      },
      {
        id: 'tiktok-volume',
        metric: '500K+ đơn hàng',
        description: 'Kinh nghiệm vận hành và scale đơn hàng trong các chiến dịch Mega Sales và mùa mua sắm cao điểm Black Friday/Cyber Monday.',
        iconName: 'engineers',
      },
      {
        id: 'tiktok-support',
        metric: '24/7 Shop Health',
        description: 'Theo dõi sát sao các chỉ số Shop Performance Score, bảo vệ gian hàng trước rủi ro khóa shop và tối ưu hiển thị giỏ hàng.',
        iconName: 'support',
      },
    ],
  },
  expertise: {
    subtitle: 'Năng lực chuyên sâu',
    headline: 'Chúng tôi tập trung vào',
    items: [
      {
        id: 'tiktok-vsa',
        title: 'Video Shopping Ads (VSA) Chuyển Đổi Cao.',
        paragraphs: [
          'Sản xuất video ngắn bản địa hóa tại Mỹ phù hợp thị hiếu tiêu dùng, gắn thẻ sản phẩm trực tiếp (Product Anchor Links).',
          'Tối ưu hóa phễu quảng cáo chuyển đổi từ Discovery đến Add to Cart và Checkout ngay trong ứng dụng TikTok.',
          'Kết hợp Affiliate Creator Network mở rộng độ phủ thương hiệu mà không phát sinh chi phí trả trước.',
        ],
        image: '/assets/insight_tiktok.jpg',
        imageFallback: '/images/services/enterprise_tech.jpg',
        alt: 'TikTok Video Shopping Ads',
      },
      {
        id: 'tiktok-fulfillment',
        title: 'Fulfillment & Quản Trị Gian Hàng Chuẩn SLA.',
        paragraphs: [
          'Kết nối trực tiếp kho fulfillment nội địa Mỹ (California, Texas) đảm bảo thời gian quét mã vận đơn trong vòng 24-48 giờ.',
          'Quản lý tồn kho đa kho và tự động hóa xử lý yêu cầu hoàn đơn, trả hàng nhanh chóng theo chính sách TikTok Shop.',
          'Duy trì đánh giá Shop Performance 4.8+ sao để nhận ưu đãi phân phối lưu lượng truy cập từ thuật toán.',
        ],
        image: '/assets/insight_wms_cloud.jpg',
        imageFallback: '/images/services/Btm_Automotive.jpg',
        alt: 'TikTok Shop Fulfillment SLA',
      },
      {
        id: 'tiktok-live',
        title: 'Livestream Commerce & Creator Affiliates.',
        paragraphs: [
          'Tổ chức và vận hành các buổi Livestream bán hàng chuyên nghiệp với host người bản địa am hiểu sản phẩm.',
          'Thiết lập chính sách hoa hồng tự động thu hút hàng trăm nhà sáng tạo nội dung hàng đầu quảng bá sản phẩm.',
          'Tối ưu hóa ưu đãi chớp nhoáng (Flash Sale) và voucher độc quyền đẩy mạnh doanh thu tức thì.',
        ],
        image: '/assets/solution_smartcommerce.png',
        imageFallback: '/images/services/data_analytics.jpg',
        alt: 'TikTok Livestream Commerce',
      },
      {
        id: 'tiktok-brand',
        title: 'Bảo Vệ Thương Hiệu & Brand Registry.',
        paragraphs: [
          'Đăng ký Brand Authorization chính thống bảo vệ quyền sở hữu trí tuệ và mẫu thiết kế độc quyền.',
          'Xử lý nhanh các hành vi giả mạo, vi phạm bản quyền và sao chép nội dung trái phép trên nền tảng TikTok.',
          'Đảm bảo tuân thủ đầy đủ các quy định về chính sách hàng hóa nhạy cảm và chứng chỉ an toàn tại Mỹ.',
        ],
        image: '/assets/insight_brand_ip.jpg',
        imageFallback: '/images/services/strategy_design.jpg',
        alt: 'TikTok Brand Protection',
      },
    ],
  },
  why: {
    titlePrefix: 'Tại sao chọn TikTok Shop',
    headline: 'Khai thác làn sóng Shoppertainment lớn nhất trong lịch sử thương mại điện tử.',
    description:
      'TikTok Shop xóa nhòa ranh giới giữa giải trí và mua sắm, biến người xem video thành khách hàng thực tế chỉ sau vài lượt chạm.',
    items: [
      {
        id: 'why-viral',
        title: 'Hiệu ứng viral bùng nổ doanh số theo cấp số nhân',
        content: 'Một video viral có thể mang lại hàng nghìn đơn hàng trong 24 giờ mà không cần ngân sách quảng cáo khổng lồ.',
      },
      {
        id: 'why-frictionless',
        title: 'Trải nghiệm mua hàng liền mạch không gián đoạn',
        content: 'Khách hàng chốt đơn trực tiếp trong ứng dụng với thông tin thanh toán và địa chỉ đã lưu sẵn, giảm tỷ lệ bỏ rơi giỏ hàng.',
      },
      {
        id: 'why-young',
        title: 'Tiếp cận người tiêu dùng trẻ sẵn sàng chi tiêu',
        content: 'Tệp người dùng Gen Z và Millennials chiếm đa số với thói quen mua sắm dựa trên đề xuất xu hướng và trải nghiệm thị giác.',
      },
      {
        id: 'why-algorithm',
        title: 'Thuật toán đề xuất thông minh ưu tiên sản phẩm hữu ích',
        content: 'Hệ thống AI của TikTok liên tục phân phối sản phẩm đến đúng đối tượng có xu hướng quan tâm và mua hàng cao nhất.',
      },
    ],
  },
  caseStudies: {
    subtitle: 'Thành tựu thực tế',
    headline: 'Dự án thành công trên TikTok Shop',
    items: [
      {
        id: 'case-tiktok-1',
        title: 'Tăng trưởng doanh thu 450% trong 60 ngày cho thương hiệu thời trang D2C trên TikTok Shop US.',
        customer: 'Thương hiệu Thời trang Nữ D2C',
        image: '/assets/success_apparel.jpg',
        tags: ['TikTok Shop', 'VSA Ads', 'Fulfillment'],
        slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
      },
      {
        id: 'case-tiktok-2',
        title: 'Xây dựng mạng lưới 200+ Creator Affiliates mang lại hơn 30,000 đơn hàng mùa Black Friday.',
        customer: 'Thương hiệu Quà tặng & Lifestyle',
        image: '/assets/insight_supplychain_genai.jpg',
        tags: ['Creator Affiliates', 'Live Commerce', 'Shoppertainment'],
        slug: 'lumina-home-shopify-google-shopping',
      },
    ],
  },
  cta: {
    headingPart1: 'Bùng nổ doanh số cùng ',
    headingHighlight: 'TikTok Shop US',
    headingPart2: ' ngay hôm nay.',
    description:
      'Hợp tác cùng đội ngũ chuyên gia E-GEAD để xây dựng gian hàng chuẩn hóa, chiến dịch quảng cáo hiệu suất cao và chuỗi cung ứng fulfillment vượt trội.',
    buttonText: 'Liên hệ chuyên gia TikTok Shop',
    buttonHref: '/contact-us?subject=tiktok-shop-acceleration',
  },
};

export const SHOPIFY_ECOMMERCE_PARTNER_DATA: PartnerDetailData = {
  slug: 'shopify-e-commerce',
  name: 'Shopify E-Commerce',
  metaTitle: 'Shopify E-Commerce Solutions & D2C Storefronts | E-GEAD',
  metaDescription:
    'Làm chủ kênh bán hàng trực tuyến D2C độc lập với nền tảng Shopify linh hoạt, hạ tầng đám mây tin cậy và tích hợp sâu chuỗi cung ứng fulfillment quốc tế.',
  hero: {
    name: 'Shopify E-Commerce',
    badge: 'Official Shopify Certified Partner',
    bannerImage: '/assets/solution_smartcommerce.png',
    bannerFallback: '/images/services/Top_Automotive.jpg',
    bannerAlt: 'Shopify E-Commerce Enterprise Platform',
    headline: 'Hạ tầng website thương mại điện tử chuẩn quốc tế cho thương hiệu D2C.',
    description:
      'Làm chủ kênh bán hàng trực tuyến độc lập và dữ liệu khách hàng với nền tảng Shopify linh hoạt, tốc độ cao và tối ưu tỷ lệ chuyển đổi checkout.',
    ctaText: 'Khám phá giải pháp Shopify',
    ctaHref: '/contact-us?subject=shopify-ecommerce',
  },
  advantages: {
    subtitle: 'Ưu thế Shopify cùng E-GEAD',
    headline: 'Nền Tảng Bán Hàng Trực Tuyến D2C Hàng Đầu Thế Giới.',
    items: [
      {
        id: 'shopify-uptime',
        metric: '99.99% Uptime',
        description: 'Hạ tầng máy chủ đám mây toàn cầu chịu tải hàng chục nghìn lượt truy cập đồng thời trong các đợt flash sale lớn.',
        iconName: 'delivery',
      },
      {
        id: 'shopify-checkout',
        metric: '1-Click Checkout',
        description: 'Tích hợp Shop Pay và các cổng thanh toán quốc tế giảm ma sát thanh toán, nâng cao tỷ lệ hoàn tất đơn hàng thêm 35%.',
        iconName: 'years',
      },
      {
        id: 'shopify-omni',
        metric: 'Tích hợp đa kênh',
        description: 'Đồng bộ danh mục sản phẩm, tồn kho và đơn hàng tự động với Google Shopping, TikTok Shop, Meta Ads và hệ thống ERP.',
        iconName: 'engineers',
      },
      {
        id: 'shopify-speed',
        metric: 'Tối ưu PageSpeed',
        description: 'Tối ưu mã nguồn giao diện Liquid/Hydrogen đạt điểm Core Web Vitals xanh và tốc độ tải trang dưới 1.5 giây trên thiết bị di động.',
        iconName: 'support',
      },
    ],
  },
  expertise: {
    subtitle: 'Năng lực triển khai',
    headline: 'Kỹ thuật chuyên sâu trên Shopify',
    items: [
      {
        id: 'shopify-theme',
        title: 'Thiết Kế Giao Diện Tùy Biến Cao Cấp.',
        paragraphs: [
          'Phát triển giao diện độc quyền chuẩn UI/UX theo nhận diện thương hiệu, tối ưu hiển thị mượt mà trên mọi kích cỡ màn hình.',
          'Tích hợp các tính năng thông minh: Upsell, Cross-sell, Bundle sản phẩm và chương trình khách hàng thân thiết.',
          'Tối ưu hóa cấu trúc điều hướng giúp người mua tìm kiếm sản phẩm nhanh chóng chỉ với 2 lần nhấp chuột.',
        ],
        image: '/assets/solution_smartcommerce.png',
        imageFallback: '/images/services/enterprise_tech.jpg',
        alt: 'Shopify Storefront Design',
      },
      {
        id: 'shopify-app',
        title: 'Tự Động Hóa Vận Hành Qua API & Custom Apps.',
        paragraphs: [
          'Xây dựng các ứng dụng nội bộ kết nối trực tiếp Shopify với kho fulfillment E-GEAD tại Mỹ để tự động bắn đơn và cập nhật tracking.',
          'Đồng bộ hóa lượng tồn kho đa kho hàng theo thời gian thực (Real-time Inventory Sync) chống bán quá số lượng.',
          'Thiết lập luồng email marketing tự động qua Klaviyo phục vụ chăm sóc khách hàng và nuôi dưỡng khách hàng trọn đời.',
        ],
        image: '/assets/insight_wms_cloud.jpg',
        imageFallback: '/images/services/Btm_Automotive.jpg',
        alt: 'Shopify API and Automation',
      },
      {
        id: 'shopify-cro',
        title: 'Tối Ưu Hóa Tỷ Lệ Chuyển Đổi (CRO).',
        paragraphs: [
          'Phân tích bản đồ nhiệt (Heatmaps) và hành vi cuộn trang để loại bỏ các điểm nghẽn trong phễu mua hàng.',
          'Thử nghiệm A/B Testing liên tục tiêu đề, hình ảnh sản phẩm, nút kêu gọi hành động và chính sách bảo hành.',
          'Tích hợp đánh giá chân thực kèm ảnh/video của khách hàng (Social Proof) để gia tăng niềm tin và động lực mua hàng.',
        ],
        image: '/assets/insight_ai_analytics.jpg',
        imageFallback: '/images/services/data_analytics.jpg',
        alt: 'Shopify CRO Optimization',
      },
      {
        id: 'shopify-intl',
        title: 'Mở Rộng Bán Hàng Toàn Cầu (Shopify Markets).',
        paragraphs: [
          'Cấu hình đa tiền tệ, đa ngôn ngữ và tự động tính toán thuế nhập khẩu theo từng quốc gia nhận hàng.',
          'Định giá sản phẩm linh hoạt phù hợp với sức mua và chi phí vận chuyển của từng thị trường mục tiêu.',
          'Tự động định tuyến đơn hàng đến kho hàng gần người nhận nhất để tiết kiệm chi phí logistics.',
        ],
        image: '/assets/company.png',
        imageFallback: '/images/services/strategy_design.jpg',
        alt: 'Shopify Global Markets',
      },
    ],
  },
  why: {
    titlePrefix: 'Tại sao chọn Shopify',
    headline: 'Nền tảng thương mại điện tử tin cậy của hàng triệu thương hiệu toàn cầu.',
    description:
      'Shopify mang đến sự tự chủ hoàn toàn về nhận diện thương hiệu, tệp dữ liệu khách hàng và tự do phát triển mà không bị giới hạn bởi sàn trung gian.',
    items: [
      {
        id: 'why-own',
        title: 'Sở hữu hoàn toàn thương hiệu và dữ liệu khách hàng',
        content: 'Xây dựng tài sản thương hiệu bền vững lâu dài, trực tiếp thu thập email, số điện thoại và lịch sử mua sắm để tái tiếp thị miễn phí.',
      },
      {
        id: 'why-scale',
        title: 'Khả năng scale không giới hạn hạ tầng kỹ thuật',
        content: 'Không cần lo lắng về sự cố máy chủ, cập nhật bảo mật hay băng thông khi lượng truy cập tăng vọt hàng trăm lần.',
      },
      {
        id: 'why-ecosystem',
        title: 'Hệ sinh thái ứng dụng và tích hợp rộng lớn nhất',
        content: 'Dễ dàng kết nối với hàng nghìn công cụ hỗ trợ bán hàng, quảng cáo, kế toán và quản lý đơn hàng hàng đầu thế giới.',
      },
      {
        id: 'why-security',
        title: 'Tiêu chuẩn bảo mật thanh toán cấp độ cao nhất',
        content: 'Chứng nhận bảo mật PCI-DSS Level 1 và giao thức SSL tích hợp sẵn bảo vệ an toàn tuyệt đối mọi thông tin thẻ tín dụng.',
      },
    ],
  },
  caseStudies: {
    subtitle: 'Dự án thực tế',
    headline: 'Câu chuyện thành công cùng Shopify',
    items: [
      {
        id: 'case-shopify-1',
        title: 'Tái thiết kế cửa hàng trực tuyến D2C giúp nâng tỷ lệ hoàn tất checkout từ 1.8% lên 3.6% sau 30 ngày.',
        customer: 'Thương hiệu Đồ gia dụng Lumina Home',
        image: '/assets/solution_smartcommerce.png',
        tags: ['Shopify D2C', 'CRO', 'UX Design'],
        slug: 'lumina-home-shopify-google-shopping',
      },
      {
        id: 'case-shopify-2',
        title: 'Xây dựng hệ thống tự động hóa đơn hàng đa thị trường với Shopify Markets và kho fulfillment US.',
        customer: 'Thương hiệu Thời trang Xuất khẩu',
        image: '/assets/insight_omnichannel.jpg',
        tags: ['Shopify Markets', 'WMS Integration', 'Multi-Currency'],
        slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
      },
    ],
  },
  cta: {
    headingPart1: 'Khởi tạo cửa hàng ',
    headingHighlight: 'Shopify D2C chuẩn quốc tế',
    headingPart2: ' cùng E-GEAD.',
    description:
      'Đội ngũ kỹ sư giải pháp của E-GEAD sẵn sàng đồng hành cùng bạn xây dựng website bán hàng hiện đại, tối ưu tốc độ và tỷ lệ chuyển đổi.',
    buttonText: 'Tư vấn giải pháp Shopify',
    buttonHref: '/contact-us?subject=shopify-consultation',
  },
};

export const ETSY_EBAY_PARTNER_DATA: PartnerDetailData = {
  slug: 'etsy-ebay-marketplaces',
  name: 'Etsy & eBay Marketplaces',
  metaTitle: 'Etsy & eBay Marketplaces Solutions | E-GEAD Commerce',
  metaDescription:
    'Khai thác nguồn lưu lượng tự nhiên khổng lồ từ hàng trăm triệu người mua sẵn có trên Etsy & eBay bằng kỹ thuật Marketplace SEO và vận hành chuẩn mực.',
  hero: {
    name: 'Etsy & eBay Marketplaces',
    badge: 'Top-Rated Marketplace Solution Partner',
    bannerImage: '/assets/case_brother.jpg',
    bannerFallback: '/images/services/strategy_design.jpg',
    bannerAlt: 'Etsy and eBay Marketplaces E-Commerce Solutions',
    headline: 'Khai thác nguồn lưu lượng tự nhiên khổng lồ từ hàng trăm triệu người mua sẵn có.',
    description:
      'Tối ưu hóa hiển thị nội sàn (Marketplace SEO) và vận hành hàng loạt trên Etsy & eBay cho các dòng sản phẩm thiết kế độc bản, quà tặng cá nhân hóa và bán lẻ đa ngành.',
    ctaText: 'Khám phá giải pháp Marketplace',
    ctaHref: '/contact-us?subject=etsy-ebay-marketplace',
  },
  advantages: {
    subtitle: 'Ưu thế Etsy & eBay cùng E-GEAD',
    headline: 'Hai Sàn Thương Mại Điện Tử Uy Tín Lâu Đời Hàng Đầu Tại Mỹ.',
    items: [
      {
        id: 'marketplace-traffic',
        metric: '150M+ Người mua tích cực',
        description: 'Tiếp cận ngay tệp khách hàng khổng lồ có sẵn nhu cầu mua sắm và thói quen tìm kiếm trực tiếp trên thanh công cụ của sàn.',
        iconName: 'years',
      },
      {
        id: 'marketplace-badge',
        metric: 'Star & Top Rated Seller',
        description: 'Duy trì các chứng chỉ huy hiệu uy tín nhất của sàn nhờ tỷ lệ phản hồi tin nhắn nhanh và giao hàng đúng hạn 100%.',
        iconName: 'delivery',
      },
      {
        id: 'marketplace-seo',
        metric: 'Tối ưu SEO nội sàn',
        description: 'Nghiên cứu từ khóa ngách dài và tối ưu thẻ Tag, tiêu đề giúp sản phẩm đứng top tìm kiếm mà không phụ thuộc vào chi phí Ads.',
        iconName: 'engineers',
      },
      {
        id: 'marketplace-auto',
        metric: 'Vận hành tự động hóa',
        description: 'Tự động gom đơn hàng từ nhiều gian hàng, đẩy sản xuất và gửi mã vận đơn tracking tức thì về sàn hạn chế rủi ro trễ hạn.',
        iconName: 'support',
      },
    ],
  },
  expertise: {
    subtitle: 'Năng lực vận hành',
    headline: 'Chiến lược phát triển trên Etsy & eBay',
    items: [
      {
        id: 'mkt-seo',
        title: 'Nghiên Cứu Từ Khóa & Tối Ưu Hóa Listing.',
        paragraphs: [
          'Sử dụng các công cụ phân tích dữ liệu chuyên dụng để săn tìm các thị trường ngách ít cạnh tranh nhưng nhu cầu cao.',
          'Chuẩn hóa cấu trúc tiêu đề, 13 thẻ Tags Etsy và thông số thuộc tính eBay Item Specifics tối đa điểm tìm kiếm thuật toán.',
          'Xây dựng bộ ảnh sản phẩm thực tế kết hợp video 360 độ làm nổi bật chất lượng chi tiết và kích thước.',
        ],
        image: '/assets/case_brother.jpg',
        imageFallback: '/images/services/enterprise_tech.jpg',
        alt: 'Etsy eBay Listing Optimization',
      },
      {
        id: 'mkt-pod',
        title: 'Quy Trình Print-on-Demand & Cá Nhân Hóa.',
        paragraphs: [
          'Tích hợp công cụ tự động hóa thiết kế cá nhân hóa cho phép người mua nhập tên, ngày kỷ niệm và ảnh gia đình.',
          'Kết nối chuỗi xưởng in ấn và sản xuất nội địa Mỹ cho dòng sản phẩm quà tặng, áo thun, cốc sứ và tranh canvas.',
          'Kiểm soát chất lượng in nghiêm ngặt trước khi đóng gói và xuất xưởng đến tay khách hàng.',
        ],
        image: '/assets/insight_dtf_tech.jpg',
        imageFallback: '/images/services/Btm_Automotive.jpg',
        alt: 'Print on Demand Personalization',
      },
      {
        id: 'mkt-ads',
        title: 'Quảng Cáo Nội Sàn Etsy Ads & eBay Promoted Listings.',
        paragraphs: [
          'Cài đặt giá thầu quảng cáo tối ưu lợi nhuận cho từng nhóm sản phẩm chủ lực (Winning Products).',
          'Tận dụng chương trình Promoted Listings Standard và Advanced của eBay để phủ kín các vị trí hiển thị đắc địa.',
          'Kiểm soát chỉ số ACOS / ROAS chặt chẽ đảm bảo doanh số tăng trưởng song hành cùng biên lợi nhuận ròng.',
        ],
        image: '/assets/data_analytics.jpg',
        imageFallback: '/images/services/data_analytics.jpg',
        alt: 'Etsy and eBay Ads Management',
      },
      {
        id: 'mkt-safety',
        title: 'Quản Trị An Toàn Tài Khoản & Chăm Sóc Khách Hàng.',
        paragraphs: [
          'Hệ thống phản hồi tin nhắn khách hàng 24/7 dưới 1 giờ đảm bảo duy trì tiêu chuẩn Etsy Star Seller.',
          'Quy trình xử lý tranh chấp khiếu nại chuyên nghiệp, bảo vệ gian hàng khỏi các đánh giá tiêu cực bất công.',
          'Chủ động rà soát bản quyền thương hiệu (IP & Trademark) loại bỏ rủi ro vi phạm chính sách của sàn.',
        ],
        image: '/assets/insight_brand_ip.jpg',
        imageFallback: '/images/services/strategy_design.jpg',
        alt: 'Account Health and Customer Care',
      },
    ],
  },
  why: {
    titlePrefix: 'Tại sao chọn Etsy & eBay',
    headline: 'Thị trường có sẵn nhu cầu tiêu dùng và lưu lượng khách hàng khổng lồ.',
    description:
      'Không cần mất nhiều tháng xây dựng nhận diện từ con số không, doanh nghiệp có thể tiếp cận ngay hàng triệu người mua có sẵn ý định chi tiêu.',
    items: [
      {
        id: 'why-buyers',
        title: 'Lượng người mua tự nhiên chất lượng cao',
        content: 'Người tiêu dùng tìm đến Etsy để mua quà tặng ý nghĩa và eBay để tìm các món đồ chuyên biệt, mang lại tỷ lệ chuyển đổi cao.',
      },
      {
        id: 'why-cost',
        title: 'Tiết kiệm chi phí quảng cáo trả phí ban đầu',
        content: 'Chỉ cần tối ưu hóa nội dung listing chuẩn SEO, sản phẩm có thể thu hút đơn hàng tự nhiên mà không tốn phí chạy ads liên tục.',
      },
      {
        id: 'why-trust',
        title: 'Độ tin cậy và chính sách bảo vệ uy tín lâu năm',
        content: 'Chính sách bảo vệ người mua và thanh toán của hai sàn lớn tạo niềm tin tuyệt đối cho khách hàng khi giao dịch.',
      },
      {
        id: 'why-diverse',
        title: 'Phù hợp đa dạng ngành hàng độc bản và cá nhân hóa',
        content: 'Mảnh đất màu mỡ cho các sản phẩm thủ công, thiết kế sáng tạo, quà tặng mùa lễ hội và đồ gia dụng độc đáo.',
      },
    ],
  },
  caseStudies: {
    subtitle: 'Thành tựu thực tế',
    headline: 'Các gian hàng Marketplace tiêu biểu',
    items: [
      {
        id: 'case-mkt-1',
        title: 'Phát triển chuỗi gian hàng Etsy đạt danh hiệu Star Seller và vượt mốc 25,000 đơn hàng quà tặng cá nhân hóa trong năm đầu.',
        customer: 'Thương hiệu Quà Tặng Thủ Công',
        image: '/assets/case_brother.jpg',
        tags: ['Etsy Star Seller', 'Personalization', 'POD'],
        slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
      },
      {
        id: 'case-mkt-2',
        title: 'Tối ưu hóa Promoted Listings trên eBay nâng trưởng doanh số phụ kiện và đồ gia dụng thêm 180%.',
        customer: 'Nhà Phân Phối Bán Lẻ Đa Ngành',
        image: '/assets/success_warehouse.jpg',
        tags: ['eBay Top Rated', 'Promoted Listings', 'Marketplace SEO'],
        slug: 'lumina-home-shopify-google-shopping',
      },
    ],
  },
  cta: {
    headingPart1: 'Chinh phục thị trường ',
    headingHighlight: 'Etsy & eBay US',
    headingPart2: ' cùng E-GEAD.',
    description:
      'Bắt đầu khai thác lượng khách hàng tự nhiên khổng lồ ngay hôm nay với quy trình vận hành và tối ưu hóa chuyên nghiệp từ E-GEAD.',
    buttonText: 'Tư vấn mở rộng Marketplace',
    buttonHref: '/contact-us?subject=marketplace-expansion',
  },
};

export const GOOGLE_ADS_SHOPPING_PARTNER_DATA: PartnerDetailData = {
  slug: 'google-ads-shopping',
  name: 'Google Ads & Shopping',
  metaTitle: 'Google Ads & Shopping Enterprise Partner | E-GEAD Marketing',
  metaDescription:
    'Chuyển đổi nhu cầu tìm kiếm trên Google thành đơn hàng thực tế với chiến dịch Google Shopping, Performance Max và tối ưu hóa Google Merchant Center Feed.',
  hero: {
    name: 'Google Ads & Shopping',
    badge: 'Official Google Premier Partner',
    bannerImage: '/assets/solution_smartcommerce.png',
    bannerFallback: '/images/services/data_analytics.jpg',
    bannerAlt: 'Google Ads & Google Shopping Platform',
    headline: 'Chuyển hóa nhu cầu tìm kiếm trên Google thành đơn hàng thực tế.',
    description:
      'Chiến dịch Performance Max và Google Shopping tối ưu hóa nguồn cấp dữ liệu sản phẩm (Google Merchant Center) để tiếp cận khách hàng đúng thời điểm phát sinh nhu cầu mua sắm.',
    ctaText: 'Tối ưu Google Ads ngay',
    ctaHref: '/contact-us?subject=google-ads-optimization',
  },
  advantages: {
    subtitle: 'Ưu thế Google Ads cùng E-GEAD',
    headline: 'Hệ Thống Quảng Cáo Tìm Kiếm & Mua Sắm Lớn Nhất Toàn Cầu.',
    items: [
      {
        id: 'google-intent',
        metric: 'Ý định mua sắm cao',
        description: 'Tiếp cận người tiêu dùng ngay khoảnh khắc họ đang chủ động gõ từ khóa tìm mua sản phẩm cụ thể trên Google Search.',
        iconName: 'years',
      },
      {
        id: 'google-pmax',
        metric: 'Performance Max AI',
        description: 'Khai thác thuật toán học máy Smart Bidding phân phối quảng cáo đồng thời trên Search, Shopping, YouTube, Gmail và Maps.',
        iconName: 'engineers',
      },
      {
        id: 'google-feed',
        metric: 'Chuẩn hóa Feed dữ liệu',
        description: 'Làm giàu thuộc tính sản phẩm trên Google Merchant Center nâng cao điểm chất lượng và giảm chi phí nhấp chuột CPC.',
        iconName: 'delivery',
      },
      {
        id: 'google-roas',
        metric: '3.5x - 5x Target ROAS',
        description: 'Chiến lược đặt giá thầu theo giá trị chuyển đổi (Value-based Bidding) tối đa hóa tổng doanh thu trên từng đồng ngân sách.',
        iconName: 'support',
      },
    ],
  },
  expertise: {
    subtitle: 'Năng lực chuyên sâu',
    headline: 'Giải pháp Google Ads toàn diện',
    items: [
      {
        id: 'google-feed-opt',
        title: 'Tối Ưu Nguồn Cấp Sản Phẩm (Merchant Center Feed).',
        paragraphs: [
          'Chuẩn hóa cấu trúc tiêu đề sản phẩm chèn từ khóa tìm kiếm quan trọng nhất (Brand + Product + Color + Size/Specification).',
          'Phân bổ danh mục sản phẩm Google Product Category chi tiết đến cấp độ sâu nhất để tăng độ hiển thị chính xác.',
          'Khắc phục triệt để các lỗi cảnh báo vi phạm chính sách của Merchant Center như thiếu mã GTIN/MPN hay chính sách đổi trả.',
        ],
        image: '/assets/insight_ai_analytics.jpg',
        imageFallback: '/images/services/enterprise_tech.jpg',
        alt: 'Google Merchant Center Feed Optimization',
      },
      {
        id: 'google-pmax-campaign',
        title: 'Chiến Dịch Performance Max & Phân Bổ Nhóm Tín Hiệu.',
        paragraphs: [
          'Tạo các nhóm thành phần tài nguyên (Asset Groups) chất lượng cao với hình ảnh sản phẩm sắc nét, video và thông điệp kêu gọi hành động.',
          'Cung cấp tín hiệu đối tượng (Audience Signals) dựa trên dữ liệu khách hàng cũ (Customer Match) để AI học nhanh hơn.',
          'Loại bỏ các từ khóa thương hiệu (Brand Exclusions) để đánh giá trung thực hiệu quả tiếp cận khách hàng mới hoàn toàn.',
        ],
        image: '/assets/solution_smartcommerce.png',
        imageFallback: '/images/services/Btm_Automotive.jpg',
        alt: 'Performance Max Campaigns',
      },
      {
        id: 'google-remarketing',
        title: 'Tiếp Thị Lại Động (Dynamic Remarketing).',
        paragraphs: [
          'Hiển thị chính xác sản phẩm mà khách hàng đã xem hoặc bỏ vào giỏ hàng khi họ lướt web trên mạng hiển thị Google Display Network.',
          'Thiết lập thông điệp giảm giá đặc biệt hoặc ưu đãi miễn phí vận chuyển thúc đẩy khách hàng quay lại hoàn tất thanh toán.',
          'Phân tầng đối tượng theo số ngày kể từ lần ghé thăm cuối cùng (1-3 ngày, 7 ngày, 30 ngày) để tối ưu ngân sách.',
        ],
        image: '/assets/insight_o2o.jpg',
        imageFallback: '/images/services/data_analytics.jpg',
        alt: 'Google Dynamic Remarketing',
      },
      {
        id: 'google-tracking',
        title: 'Đo Lường Chuyển Đổi Nâng Cao (Enhanced Conversions).',
        paragraphs: [
          'Cài đặt chuyển đổi nâng cao qua Google Tag Manager đảm bảo đo lường chính xác cả khi dữ liệu cookie bên thứ ba bị hạn chế.',
          'Theo dõi chi tiết giá trị từng đơn hàng, lợi nhuận biên và chi phí giao hàng theo thời gian thực.',
          'Kết nối dữ liệu chuyển đổi ngoại tuyến (Offline Conversion Tracking) cho các đơn hàng xử lý qua điện thoại hoặc đối tác.',
        ],
        image: '/assets/insight_supply_chain.jpg',
        imageFallback: '/images/services/strategy_design.jpg',
        alt: 'Enhanced Conversions Measurement',
      },
    ],
  },
  why: {
    titlePrefix: 'Tại sao chọn Google Ads',
    headline: 'Công cụ tìm kiếm số 1 thế giới với hơn 8.5 tỷ lượt tìm kiếm mỗi ngày.',
    description:
      'Google Shopping đưa sản phẩm của bạn xuất hiện ngay trước mắt người mua đúng vào giây phút họ đang khao khát tìm giải pháp cho nhu cầu của mình.',
    items: [
      {
        id: 'why-demand',
        title: 'Đón đầu nhu cầu chủ động thay vì làm phiền người dùng',
        content: 'Khác với quảng cáo mạng xã hội, người dùng Google tìm kiếm với chủ đích mua hàng rõ ràng, mang lại tỷ lệ hoàn tất đơn hàng cao hơn.',
      },
      {
        id: 'why-shopping-visual',
        title: 'Hiển thị hình ảnh và giá cả trực quan ngay kết quả tìm kiếm',
        content: 'Khách hàng nhìn thấy giá và hình ảnh trước khi nhấp chuột, giúp lọc những lượt truy cập không phù hợp và tiết kiệm ngân sách.',
      },
      {
        id: 'why-machine-learning',
        title: 'Trí tuệ nhân tạo Smart Bidding tự động tối ưu hóa giá thầu',
        content: 'Thuật toán của Google phân tích hàng triệu tín hiệu bối cảnh mỗi giây để đấu thầu với mức giá tối ưu nhất cho từng khách hàng.',
      },
      {
        id: 'why-full-funnel',
        title: 'Phủ sóng toàn bộ hành trình khách hàng từ nhận biết đến mua lại',
        content: 'Kết hợp hài hòa giữa tìm kiếm, mua sắm, video YouTube và mạng hiển thị để xây dựng phễu bán hàng khép kín vững chắc.',
      },
    ],
  },
  caseStudies: {
    subtitle: 'Thành tựu thực tế',
    headline: 'Hiệu quả chiến dịch Google Ads & Shopping',
    items: [
      {
        id: 'case-google-1',
        title: 'Tối ưu hóa nguồn cấp Google Merchant Center và triển khai Performance Max đạt ROAS 4.8x cho thương hiệu đồ gia dụng.',
        customer: 'Lumina Home Living',
        image: '/assets/solution_smartcommerce.png',
        tags: ['Google Shopping', 'Performance Max', 'Target ROAS'],
        slug: 'lumina-home-shopify-google-shopping',
      },
      {
        id: 'case-google-2',
        title: 'Chiến dịch Dynamic Remarketing và Search Ads phục hồi 28% giỏ hàng bị bỏ rơi mùa mua sắm cuối năm.',
        customer: 'Thương hiệu Quà Tặng Trực Tuyến',
        image: '/assets/insight_ai_analytics.jpg',
        tags: ['Dynamic Remarketing', 'Search Ads', 'CRO'],
        slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
      },
    ],
  },
  cta: {
    headingPart1: 'Tăng tốc doanh thu cùng ',
    headingHighlight: 'Google Ads & Shopping',
    headingPart2: ' với E-GEAD.',
    description:
      'Liên hệ ngay với đội ngũ chuyên gia được Google chứng nhận của E-GEAD để kiểm tra tài khoản miễn phí và xây dựng chiến lược quảng cáo tối ưu.',
    buttonText: 'Liên hệ chuyên gia Google Ads',
    buttonHref: '/contact-us?subject=google-ads-consultation',
  },
};

/**
 * Registry mapping slug to partner profile data
 */
const PARTNER_REGISTRY: Record<string, PartnerDetailData> = {
  // Menu Header Strategic Partners
  'tiktok-shop-tiktok-ads': TIKTOK_SHOP_PARTNER_DATA,
  'tiktok-shop-and-ads': TIKTOK_SHOP_PARTNER_DATA,
  'shopify-e-commerce': SHOPIFY_ECOMMERCE_PARTNER_DATA,
  'shopify-ecommerce': SHOPIFY_ECOMMERCE_PARTNER_DATA,
  'etsy-ebay-marketplaces': ETSY_EBAY_PARTNER_DATA,
  'google-ads-shopping': GOOGLE_ADS_SHOPPING_PARTNER_DATA,

  // Enterprise Partners
  sap: SAP_PARTNER_DATA,
  'shopify-plus': SHOPIFY_PLUS_PARTNER_DATA,
  sitecore: SITECORE_PARTNER_DATA,
  'site-core': SITECORE_PARTNER_DATA,
  stripe: STRIPE_PARTNER_DATA,
};

/**
 * Creates dynamic partner data for arbitrary slugs so all partner routes render
 * the identical, full 6-section UI without empty stubs or missing sections.
 */
function createGenericPartnerData(rawSlug: string): PartnerDetailData {
  const formattedName = rawSlug
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    slug: rawSlug,
    name: formattedName,
    metaTitle: `${formattedName} Partner Solutions & Enterprise Integration | E-GEAD`,
    metaDescription: `Discover E-GEAD deep programmatic integration, enterprise architecture, and global commerce capabilities powered by ${formattedName}.`,
    hero: {
      name: formattedName,
      badge: `Certified ${formattedName} Integration Partner`,
      bannerImage: '/images/services/enterprise_tech.jpg',
      bannerFallback: '/images/services/enterprise_tech.jpg',
      bannerAlt: `${formattedName} Enterprise Integration Partner`,
      headline: `Scale your enterprise ecosystem with tailored ${formattedName} solutions.`,
      description: `We help enterprises streamline technical architectures, synchronize data in real-time, and drive high-growth operational efficiency with ${formattedName}.`,
      ctaText: `Schedule ${formattedName} consultation`,
      ctaHref: `/contact-us?subject=${encodeURIComponent(rawSlug)}-inquiry`,
    },
    advantages: {
      subtitle: `${formattedName} advantages`,
      headline: `Official Technical Integration & Certified Enterprise Architecture.`,
      items: [
        {
          id: 'generic-years',
          metric: '10+ years',
          description: `of experience building custom programmatic integrations and commerce architectures with ${formattedName}.`,
          iconName: 'years',
        },
        {
          id: 'generic-delivery',
          metric: '100% delivery',
          description: 'rate across mission-critical enterprise implementations with zero disruption.',
          iconName: 'delivery',
        },
        {
          id: 'generic-engineers',
          metric: '50+ engineers',
          description: `Dedicated certified consultants, API specialists, and solution architects fluent in ${formattedName}.`,
          iconName: 'engineers',
        },
        {
          id: 'generic-support',
          metric: '24/7 hypercare',
          description: 'Continuous proactive monitoring, real-time alerting, and dedicated SLA support.',
          iconName: 'support',
        },
      ],
    },
    expertise: {
      subtitle: 'Our technical capabilities',
      headline: 'We specialize in',
      items: [
        {
          id: 'generic-integration',
          title: 'Custom Integration & Architecture.',
          paragraphs: [
            `Tailored programmatic connections engineered to meet the unique operational demands of your enterprise.`,
            `We build resilient middleware and API orchestrations that link ${formattedName} directly with your core ERP, CRM, and order fulfillment systems.`,
            'Zero data loss, high throughput, and guaranteed message delivery across distributed systems.',
          ],
          image: '/images/services/enterprise_tech.jpg',
          imageFallback: '/images/services/enterprise_tech.jpg',
          alt: `${formattedName} Custom Integration`,
        },
        {
          id: 'generic-optimization',
          title: 'Performance & Scalability Optimization.',
          paragraphs: [
            `Ensure your ${formattedName} implementation remains fast, scalable, and responsive during extreme traffic surges.`,
            'We optimize data indexing, caching layers, and asynchronous background workers to ensure predictable sub-second latency.',
            'Continuous telemetry monitoring guarantees maximum platform stability and uptime.',
          ],
          image: '/images/services/Btm_Automotive.jpg',
          imageFallback: '/images/services/Btm_Automotive.jpg',
          alt: `${formattedName} Performance Optimization`,
        },
        {
          id: 'generic-automation',
          title: 'Automated Workflows & Synchronization.',
          paragraphs: [
            'Eliminate error-prone manual administrative tasks through intelligent automation.',
            `Our team creates automated reconciliation routines, event-driven webhooks, and audit logging to keep all systems aligned.`,
            'Gain immediate visibility into real-time business performance with actionable reporting dashboards.',
          ],
          image: '/images/services/data_analytics.jpg',
          imageFallback: '/images/services/data_analytics.jpg',
          alt: `${formattedName} Automated Workflows`,
        },
        {
          id: 'generic-support',
          title: 'Ongoing Support & Technical Governance.',
          paragraphs: [
            'Enterprise digital ecosystems require continuous vigilance and active maintenance.',
            `We partner with your team on an ongoing basis to provide version upgrades, security patches, and strategic roadmap consultation.`,
            `Maximize your long-term return on investment with guaranteed SLA commitments.`,
          ],
          image: '/images/services/strategy_design.jpg',
          imageFallback: '/images/services/strategy_design.jpg',
          alt: `${formattedName} Support and Governance`,
        },
      ],
    },
    why: {
      titlePrefix: `Why ${formattedName}`,
      headline: `Empowering enterprise agility, resilience, and multi-market scale.`,
      description: `Organizations worldwide trust ${formattedName} to streamline core business operations and connect with modern consumers.`,
      items: [
        {
          id: 'why-efficiency',
          title: 'Streamline operations and eliminate friction',
          content: `Automate end-to-end workflows and eliminate manual redundancies across your digital ecosystem.`,
        },
        {
          id: 'why-data',
          title: 'Actionable real-time intelligence',
          content: 'Make confident, data-driven executive decisions based on accurate telemetry and unified reporting.',
        },
        {
          id: 'why-scalability',
          title: 'Built for enterprise growth and global expansion',
          content: 'Scale into new international territories and channels without architectural rework.',
        },
        {
          id: 'why-reliability',
          title: 'Enterprise reliability and guaranteed uptime',
          content: 'High-availability infrastructure designed to protect mission-critical revenue streams 24/7.',
        },
        {
          id: 'why-roi',
          title: 'Maximize efficiency and operational ROI',
          content: 'Optimize resource allocation and accelerate business velocity with streamlined technology.',
        },
      ],
    },
    caseStudies: {
      subtitle: 'Proven outcomes',
      headline: 'Read our cases',
      items: SAP_CASE_STUDIES,
    },
    cta: {
      headingPart1: 'Accelerate your ',
      headingHighlight: 'digital transformation',
      headingPart2: ` with ${formattedName}.`,
      description: `Connect with our certified integration specialists to explore custom architectures, automated workflows, and enterprise scale.`,
      buttonText: "Let's talk",
      buttonHref: `/contact-us?subject=${encodeURIComponent(rawSlug)}-consultation`,
    },
  };
}

/**
 * Retrieve PartnerDetailData for any given slug.
 * Handles known partners (SAP, Shopify Plus, Sitecore, Stripe) and dynamically generates
 * rich fallback profiles for any custom or new partner slug.
 */
export function getPartnerDetailData(slug: string): PartnerDetailData {
  const normalized = slug.trim().toLowerCase();
  if (PARTNER_REGISTRY[normalized]) {
    return PARTNER_REGISTRY[normalized];
  }
  return createGenericPartnerData(normalized);
}
