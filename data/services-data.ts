export interface ServicePrinciple {
  title: string;
  description: string;
}

export interface RelatedIndustry {
  name: string;
  slug: string;
  desc: string;
}

export interface ServiceDetailItem {
  slug: string;
  category: 'industry' | 'service';
  title: string;
  tagline: string;
  subtitle: string;
  overviewSubTitle: string;
  heroImage: string;
  middleImage: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  approachHeading: string;
  approachIntro: string;
  principles: ServicePrinciple[];
}

export const ALL_INDUSTRIES: RelatedIndustry[] = [
  {
    name: 'Automotive',
    slug: 'automotive',
    desc: 'Empowering automotive businesses to drive success through digital transformation and predictive commerce.',
  },
  {
    name: 'Food & Beverages',
    slug: 'food-beverages',
    desc: 'We help businesses impress their customers with exceptional experiences, ensuring their success in this vibrant industry.',
  },
  {
    name: 'Health & Science',
    slug: 'health-science',
    desc: 'We harness the power of digital innovation to make a positive impact on human life and healthcare systems.',
  },
  {
    name: 'Public Service & Non-profit',
    slug: 'public-service',
    desc: 'We empower organizations to fulfill their missions, engage communities, and create positive change at scale.',
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    desc: 'We help manufacturers identify and unlock new opportunities for growth through smart automation and predictive workflows.',
  },
  {
    name: 'Consumer Goods',
    slug: 'consumer-goods',
    desc: 'We combine our digital prowess and market insights to empower brands to connect with customers, drive brand loyalty, and optimize supply chains.',
  },
  {
    name: 'Fashion & Lifestyle',
    slug: 'fashion',
    desc: 'We leverage our creative flair and digital expertise to help brands engage with their customers through immersive experiences.',
  },
  {
    name: 'Chemicals',
    slug: 'chemicals',
    desc: 'We leverage digital expertise to empower chemical firms to navigate the ever-changing landscape with confidence.',
  },
  {
    name: 'Banking & Insurance',
    slug: 'banking-insurance',
    desc: 'We provide transformative digital solutions that empower financial institutions to optimize processes, enhance security, and deliver personalized experiences.',
  },
];

export const SERVICES_DATA: Record<string, ServiceDetailItem> = {
  automotive: {
    slug: 'automotive',
    category: 'industry',
    title: 'Automotive',
    tagline: 'Automotive E-Commerce & Precision Operations',
    subtitle:
      'The automotive industry is rapidly evolving, with digital technology at the forefront of its transformation.',
    overviewSubTitle:
      'We empower automotive businesses to stay ahead of the curve and drive success in this rapidly evolving landscape.',
    heroImage: '/images/services/industries_automotive.jpg',
    middleImage: '/images/services/Btm_Automotive.jpg',
    overviewHeading:
      'Automate processes, analyze data, and make predictions that lead to better decision-making.',
    overviewParagraphs: [
      "AI is more than just a buzzword; it plays a critical role in driving growth and fostering innovation for businesses of all sizes. Our dedicated team of experts is committed to addressing our clients' distinctive business challenges by harnessing AI technologies, enabling them to maintain a competitive edge.",
      "With years of experience in AI development and implementation, our expert team is uniquely poised to assist businesses spanning a wide range of industries. Whether we're employing predictive analytics to forecast customer behavior or utilizing natural language processing to automate routine tasks, we possess the skills and expertise required to deliver results that actively propel business growth.",
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'With over 10 years of experience in the industry, we have a fantastic track record of helping our automotive clients build and accelerate their digital business. Our approach is centered on the following principles:',
    principles: [
      {
        title: 'Customized solutions',
        description:
          'We understand that each automotive business has unique needs and challenges, and we develop customized solutions that address these issues head-on. Our solutions are tailored to each client’s specific requirements. These may be to improve the customer experience, optimize operations, or ensure compliance and safety.',
      },
      {
        title: 'Data-driven insights',
        description:
          'We use data-driven insights to inform our solutions and help automotive businesses make better decisions. Our solutions are based on rigorous analysis of customer behavior, market trends, and operational performance, ensuring our clients have all the information they need to succeed.',
      },
      {
        title: 'Collaborative approach',
        description:
          'We work closely with our clients to understand their unique needs and challenges and deliver winning results. Collaboration is a key aspect of every stage of the process, from strategy development to solution implementation, to ensure that our solutions are practical and aligned with their goals.',
      },
      {
        title: 'Continuous improvement',
        description:
          'We believe in ongoing adjustments and improvements and are committed to helping our clients stay ahead of the curve. We regularly evaluate our solutions and refine our approach to ensure our clients always get the best possible results.',
      },
    ],
  },
  'banking-insurance': {
    slug: 'banking-insurance',
    category: 'industry',
    title: 'Banking & Insurance',
    tagline: 'Fintech & Insurance Transformation Ecosystem',
    subtitle:
      'Innovative digital strategies are crucial for Banking & Insurance companies to remain competitive.',
    overviewSubTitle:
      'We provide transformative digital solutions that empower financial institutions to optimize processes, enhance security, and deliver personalized experiences.',
    heroImage: '/images/services/industries_banking.jpg',
    middleImage: '/images/services/Btm_Banking.jpg',
    overviewHeading: 'Innovative solutions for the digital age.',
    overviewParagraphs: [
      "The Banking & Insurance industries are facing unprecedented challenges in approaching consumers and operating successfully in today's rapidly-changing world. From increased competition and ever-evolving customer expectations to regulatory changes and complex data management requirements, innovative solutions are crucial for remaining competitive.",
      'In this new digital age, customers expect seamless and personalized experiences across all channels and touchpoints. With the rise of digital disruptors and fintech, traditional banking and insurance companies face increased pressure to innovate and differentiate themselves from their competitors.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'Our approach is centered on robust security, high-scale architecture, and frictionless financial experiences:',
    principles: [
      {
        title: 'Robust data management',
        description:
          'We help businesses leverage data analytics and machine learning algorithms to gain insights into customer behavior and preferences, and enhance their decision-making capabilities.',
      },
      {
        title: 'Advanced security solutions',
        description:
          'In today’s digital world, data security is paramount, especially for banking and insurance companies. We offer advanced security solutions that ensure secure data exchange and proactively prevent cyber threats.',
      },
      {
        title: 'Personalization and automation',
        description:
          'We leverage AI to enable businesses to provide personalized customer experiences. By automating repetitive and time-consuming tasks, companies can focus on delivering high-value advisory services.',
      },
      {
        title: 'Omnichannel experience',
        description:
          'We create seamless omnichannel journeys across mobile applications, self-service portals, and conversational banking channels with bank-grade encryption.',
      },
    ],
  },
  chemicals: {
    slug: 'chemicals',
    category: 'industry',
    title: 'Chemicals',
    tagline: 'Chemical Industry Digital Commerce & Compliance',
    subtitle:
      'Digital solutions can provide major benefits in the Chemical industry, but companies need a winning strategy to succeed.',
    overviewSubTitle:
      'We leverage digital expertise to empower chemical firms to navigate the ever-changing landscape with confidence.',
    heroImage: '/images/services/industries_chemical.jpg',
    middleImage: '/images/services/Btm_Chemical.jpg',
    overviewHeading:
      'Navigating challenges and maximizing opportunities in the chemical industry.',
    overviewParagraphs: [
      'The chemical sector demands uncompromising regulatory compliance, hazardous material documentation, and complex B2B contract pricing models.',
      'We architect digital commerce platforms that handle tiered bulk ordering, MSDS sheet distribution, and automated freight carrier logistics with complete compliance verification.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'We build purpose-driven digital infrastructure for global chemical distributors and manufacturers:',
    principles: [
      {
        title: 'Leveraging digital technology',
        description:
          'Automated configure-price-quote engines tailored for complex chemical compositions and international export requirements.',
      },
      {
        title: 'Developing a customized roadmap',
        description:
          'Iterative modernization connecting enterprise ERP backbones to modern customer and distributor portals.',
      },
      {
        title: 'Emphasizing data-driven decision-making',
        description:
          'Real-time analytics monitor supply chain constraints, commodity spot prices, and customer replenishment cycles.',
      },
      {
        title: 'Ensuring compliance with regulatory requirements',
        description:
          'Built-in safety certification checkpoints, chemical handling disclosures, and automated customs audit trails.',
      },
    ],
  },
  'consumer-goods': {
    slug: 'consumer-goods',
    category: 'industry',
    title: 'Consumer Goods',
    tagline: 'FMCG Omnichannel & Direct-to-Consumer Scale',
    subtitle:
      'In today’s highly competitive world, consumers have more choices than ever. Brands must leverage technology to provide meaningful touchpoints along the whole consumer journey.',
    overviewSubTitle:
      'We combine our digital prowess and market insights to empower brands to connect with customers, drive brand loyalty, and optimize supply chains.',
    heroImage: '/images/services/industries_consumergoods.jpg',
    middleImage: '/images/services/Btm_ConsumerGoods.jpg',
    overviewHeading:
      'The importance of a solid digital presence in the consumer goods sector.',
    overviewParagraphs: [
      'Consumer goods brands must balance rapid wholesale fulfillment with high-margin direct-to-consumer storefronts and marketplace storefronts.',
      'We build synchronized e-commerce networks that centralize product information, automate promotions, and accelerate porch delivery across millions of households.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'Our consumer goods commerce playbook is engineered to drive brand loyalty and repeatable purchase cycles:',
    principles: [
      {
        title: 'Build trust',
        description:
          'Transparent shipping timelines, guaranteed product authenticity, and frictionless returns boost consumer lifetime value.',
      },
      {
        title: 'Customer-centricity',
        description:
          'Mobile-first storefronts optimized for instant checkout and unified loyalty rewards across physical and digital touchpoints.',
      },
      {
        title: 'Personalization',
        description:
          'AI-driven product recommendations and replenishment subscriptions tailored to individual household consumption.',
      },
      {
        title: 'Innovation',
        description:
          'Rapid marketplace expansion into TikTok Shop US, Amazon FBM, and Shopify with zero operational friction.',
      },
    ],
  },
  fashion: {
    slug: 'fashion',
    category: 'industry',
    title: 'Fashion & Lifestyle',
    tagline: 'Apparel E-Commerce & Sub-24H Print-on-Demand',
    subtitle:
      "The Fashion and Lifestyle sector has always been competitive, but today's market presents unique challenges that require creative solutions.",
    overviewSubTitle:
      'We leverage our creative flair and digital expertise to help brands engage with their customers through immersive experiences.',
    heroImage: '/images/services/industries_fashion.jpg',
    middleImage: '/images/services/Btm_Fashion.jpg',
    overviewHeading: 'Empowering Fashion and Lifestyle businesses to thrive.',
    overviewParagraphs: [
      'Fast-fashion velocity and premium brand storytelling demand agile production, zero-dead-inventory models, and viral social commerce readiness.',
      'With E-GEAD industrial DTF print-on-demand technology, fashion brands launch new collections instantly with sub-24h domestic US dispatch.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'We unite cutting-edge streetwear design with automated just-in-time manufacturing:',
    principles: [
      {
        title: 'Technology',
        description:
          'Automated design rendering, high-DPI rasterization, and direct barcode-driven printer injection.',
      },
      {
        title: 'Customer-experience-focused solutions',
        description:
          'Rich 3D product previews, dynamic size guides, and personalized lookbooks that drive conversion.',
      },
      {
        title: 'Hybrid model',
        description:
          'Seamlessly balance stocked hero SKUs with on-demand specialty drops without capital depreciation.',
      },
      {
        title: 'Transformation',
        description:
          'Enable fashion creators and enterprise labels to scale effortlessly on TikTok Shop US and global channels.',
      },
    ],
  },
  'health-science': {
    slug: 'health-science',
    category: 'industry',
    title: 'Health & Science',
    tagline: 'Healthcare & Life Sciences Digital Solutions',
    subtitle:
      "Health & Science businesses face numerous challenges in approaching consumers and operating effectively in today's digital world.",
    overviewSubTitle:
      'We harness the power of digital innovation to make a positive impact on human life.',
    heroImage: '/images/services/industries_science.jpg',
    middleImage: '/images/services/Btm_Health.jpg',
    overviewHeading: 'Empowering businesses with Cutting-Edge Technologies.',
    overviewParagraphs: [
      'Digital healthcare and medical commerce require the utmost precision, strict regulatory data adherence, and patient-first simplicity.',
      'We architect compliant digital channels that facilitate healthcare equipment distribution, telemedicine bookings, and health product replenishment.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'Our health and life sciences solutions prioritize security, accuracy, and patient empathy:',
    principles: [
      {
        title: 'Personalized patient experience',
        description:
          'Intuitive, accessible interfaces designed for all ages and accessibility needs with multilingual support.',
      },
      {
        title: 'Optimized operations',
        description:
          'Automated verification workflows for prescription validation, order processing, and temperature-controlled shipping.',
      },
      {
        title: 'Cybersecurity and data privacy',
        description:
          'HIPAA, GDPR, and SOC2 certified infrastructure safeguarding sensitive patient and medical diagnostic records.',
      },
      {
        title: 'Agile and scalable solutions',
        description:
          'Cloud microservices designed to scale during seasonal surges and rapid new pharmaceutical product rollouts.',
      },
    ],
  },
  'food-beverages': {
    slug: 'food-beverages',
    category: 'industry',
    title: 'Food & Beverages',
    tagline: 'Gourmet FMCG & Quick-Fulfillment Commerce',
    subtitle:
      'Deliver exceptional omnichannel customer journeys in the fast-paced F&B and FMCG retail sectors.',
    overviewSubTitle:
      'We help businesses impress their customers with exceptional experiences, ensuring their success in this vibrant industry.',
    heroImage: '/images/services/industries_consumergoods.jpg',
    middleImage: '/images/services/Btm_ConsumerGoods.jpg',
    overviewHeading:
      'Elevate culinary and beverage commerce with precision inventory and rapid fulfillment.',
    overviewParagraphs: [
      'In the fast-moving Food & Beverage sector, customer loyalty hinges on freshness, availability, and lightning-fast digital interactions.',
      'From direct-to-consumer gourmet brand storefronts to automated B2B distribution networks, our cloud solutions guarantee real-time stock sync and compliant shipping.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'Our F&B commerce framework combines flavor innovation with operational excellence:',
    principles: [
      {
        title: 'Temperature & Expiry Tracking',
        description:
          'Batch-level barcode tracking ensures pristine quality across every warehouse checkpoint.',
      },
      {
        title: 'Sub-24H Dispatch Routing',
        description:
          'Optimized fulfillment algorithms route perishable and high-velocity goods through domestic hubs.',
      },
      {
        title: 'Subscription & Recurring Orders',
        description:
          'Automated recurring billing and predictive restock triggers keep customers supplied seamlessly.',
      },
      {
        title: 'Omnichannel Menu & Catalog Sync',
        description:
          'Synchronize multi-location inventory and menus across mobile apps and delivery aggregators.',
      },
    ],
  },
  manufacturing: {
    slug: 'manufacturing',
    category: 'industry',
    title: 'Manufacturing',
    tagline: 'Industrial B2B Commerce & Automated Factory Integration',
    subtitle:
      'We help manufacturers identify and unlock new opportunities for growth through smart automation and predictive workflows.',
    overviewSubTitle:
      'Empower industrial manufacturers to transition to direct-to-enterprise and digital self-service commerce.',
    heroImage: '/images/services/industries_chemical.jpg',
    middleImage: '/images/services/Btm_Chemical.jpg',
    overviewHeading:
      'Modernize industrial distribution and streamline complex B2B configure-price-quote operations.',
    overviewParagraphs: [
      'Modern manufacturing leaders are moving beyond legacy wholesale channels to embrace intelligent self-service digital commerce.',
      'We architect robust platforms that seamlessly integrate ERP, PLM, and WMS ecosystems to handle custom configurations and high-volume orders.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'Our industrial manufacturing approach focuses on end-to-end integration and resilience:',
    principles: [
      {
        title: 'B2B Custom Pricing Tiers',
        description:
          'Dynamic volume discounts, negotiated contract terms, and tiered catalog access per account.',
      },
      {
        title: 'Deep ERP & Warehouse Handshake',
        description:
          'Bidirectional sync with SAP, Oracle, and proprietary WMS systems for real-time inventory truth.',
      },
      {
        title: 'Automated Proofing & Spec Generation',
        description:
          'Eliminate production errors with instant digital proof approvals and specs dispatch.',
      },
      {
        title: 'Predictive Demand Planning',
        description:
          'Leverage machine learning models to anticipate seasonal production spikes and avoid stockouts.',
      },
    ],
  },
  'public-service': {
    slug: 'public-service',
    category: 'industry',
    title: 'Public Service & Non-profit',
    tagline: 'Mission-Driven Digital Platforms & Civic Engagement',
    subtitle:
      'We empower organizations to fulfill their missions, engage communities, and create positive change at scale.',
    overviewSubTitle:
      'Digital transformation tailored for mission-driven public sector bodies and global non-profit institutions.',
    heroImage: '/images/services/industries_science.jpg',
    middleImage: '/images/services/Btm_Health.jpg',
    overviewHeading:
      'Transparent, accessible, and high-impact digital solutions that serve communities.',
    overviewParagraphs: [
      'Public sector institutions and non-profit organizations require accessible, secure, and user-centric digital tools to serve their communities effectively.',
      'We build human-centric portals that ensure ADA/WCAG compliance, top-tier cybersecurity, and frictionless donation and service workflows.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'Our public service principles emphasize trust, equity, and absolute accessibility:',
    principles: [
      {
        title: 'WCAG 2.1 AAA Accessibility',
        description:
          'Inclusive design architectures ensuring universal access across all devices and abilities.',
      },
      {
        title: 'High-Integrity Data Privacy',
        description:
          'Strict compliance with national data sovereignty, GDPR, and government privacy frameworks.',
      },
      {
        title: 'Transparent Impact Metrics',
        description:
          'Real-time reporting dashboards that demonstrate donor stewardship and program outcomes.',
      },
      {
        title: 'Cost-Effective Cloud Scalability',
        description:
          'Serverless and elastic cloud deployments that minimize operational overhead.',
      },
    ],
  },
  'strategy-design': {
    slug: 'strategy-design',
    category: 'service',
    title: 'Strategy & Design',
    tagline: 'Enterprise Commerce Architecture & User Experience',
    subtitle:
      'Turn market opportunities into actionable commerce strategies and compelling experiences that drive measurable results.',
    overviewSubTitle:
      'Great commerce starts with great strategy. We help you define what to build, how to position it, and why customers will love it.',
    heroImage: '/images/services/strategy_design.jpg',
    middleImage: '/images/services/Btm_Automotive.jpg',
    overviewHeading: 'Turn Market Opportunities into Actionable Commerce Strategies.',
    overviewParagraphs: [
      'In a competitive global marketplace, execution without deep strategic clarity results in wasted capital and slow momentum.',
      'Our senior strategists work alongside your leadership to identify high-leverage growth opportunities, optimize unit economics, and design immersive brand experiences that convert.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'We combine rigorous commercial modeling with world-class product design principles:',
    principles: [
      {
        title: 'Commerce Strategy & Consulting',
        description:
          'Marketplace expansion blueprints, profit margin engineering, and cross-border channel audits.',
      },
      {
        title: 'Experience Design & Brand',
        description:
          'Frictionless UI/UX architectures, design systems, and brand identities tailored for high conversion.',
      },
      {
        title: 'Marketing Strategy & Planning',
        description:
          'Predictive customer acquisition modeling, retention funnels, and algorithmic social commerce optimization.',
      },
      {
        title: 'Omnichannel Roadmapping',
        description:
          'Unified tech stack roadmap aligning business goals with modern composable commerce frameworks.',
      },
    ],
  },
  'data-analytics': {
    slug: 'data-analytics',
    category: 'service',
    title: 'Data & Analytics',
    tagline: 'Predictive Commerce Intelligence & AI Automation',
    subtitle:
      'Transform data into predictive insights and intelligent automation that accelerates growth and reduces risk.',
    overviewSubTitle:
      'Data is only valuable if it drives decisions. We turn your commerce data into predictive insights, intelligent automation, and measurable growth.',
    heroImage: '/images/services/data_analytics.jpg',
    middleImage: '/images/services/Btm_Automotive.jpg',
    overviewHeading: 'Transform Data into Predictive Insights and Intelligent Automation.',
    overviewParagraphs: [
      'Modern commerce produces terabytes of event signals every second across ad networks, storefront sessions, warehouse scans, and carrier tracking.',
      'We unify these disparate data streams into real-time operational telemetry, automated margin dashboards, and self-learning AI algorithms.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'Our data engineering framework turns raw logs into automated commercial decisions:',
    principles: [
      {
        title: 'AI & Machine Learning Services',
        description:
          'Predictive inventory restock triggers, dynamic pricing algorithms, and churn prevention modeling.',
      },
      {
        title: 'Advanced Analytics & Forecasting',
        description:
          'Accurate demand projections prevent stockouts while reducing warehouse storage fees.',
      },
      {
        title: 'Business Intelligence & Dashboards',
        description:
          'Real-time P&L visibility down to the individual SKU, channel, and geographic market.',
      },
      {
        title: 'Data Pipeline Infrastructure',
        description:
          'High-throughput ETL pipelines connecting storefronts, advertising APIs, and financial ledgers.',
      },
    ],
  },
  'enterprise-technology': {
    slug: 'enterprise-technology',
    category: 'service',
    title: 'Enterprise Technology',
    tagline: 'Scalable Composable Commerce & Cloud Infrastructure',
    subtitle:
      'Build commerce platforms and integrations engineered for scale, speed, and reliability.',
    overviewSubTitle:
      'The right platform is the foundation of commerce success. We build, integrate, and secure the technology that powers your business.',
    heroImage: '/images/services/enterprise_tech.jpg',
    middleImage: '/images/services/Btm_Automotive.jpg',
    overviewHeading: 'Build Commerce Platforms Engineered for Scale, Speed, and Reliability.',
    overviewParagraphs: [
      'Legacy monoliths cannot keep pace with modern omnichannel requirements, rapid marketplace API changes, or flash-sale traffic surges.',
      'We engineer headless and composable commerce architectures with zero single points of failure and sub-100ms API response times worldwide.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'Our engineering standards emphasize modularity, security, and developer velocity:',
    principles: [
      {
        title: 'Commerce Platform Implementation',
        description:
          'End-to-end development of modern storefronts on Shopify Plus, Next.js, and headless backends.',
      },
      {
        title: 'Enterprise Systems Integration',
        description:
          'Robust bi-directional connectors between ERPs, WMS systems, CRMs, and payment gateways.',
      },
      {
        title: 'Cloud Application Services',
        description:
          'Edge computing, serverless microservices, and automated CI/CD pipelines ensuring 99.9% uptime.',
      },
      {
        title: 'Security & Compliance',
        description:
          'Bank-grade AES-256 encryption, SOC 2 compliance, and automated vulnerability scanning.',
      },
    ],
  },
  'commerce-cx--operations': {
    slug: 'commerce-cx--operations',
    category: 'service',
    title: 'Commerce & CX Operations',
    tagline: '24/7 Global Storefront & Customer Experience Management',
    subtitle:
      'Operate your commerce ecosystem with proven excellence across platforms, content, and marketing.',
    overviewSubTitle:
      'Building great commerce is one thing. Running it flawlessly 24/7 is another. We operate your platforms, content, marketing, and AI systems so you can focus on growth.',
    heroImage: '/images/services/commerce_cx.jpg',
    middleImage: '/images/services/Btm_Automotive.jpg',
    overviewHeading: '24/7 Operational Excellence for Mission-Critical Storefronts.',
    overviewParagraphs: [
      'Scaling across multiple timezones and platforms requires continuous merchandising updates, instant customer support resolution, and proactive technical monitoring.',
      'Our dedicated operations team acts as an extension of your business, managing daily catalog releases, promotional calendars, and customer satisfaction SLAs.',
    ],
    approachHeading: 'Our approach',
    approachIntro:
      'We combine automated workflow triggers with senior commerce operators:',
    principles: [
      {
        title: 'Creative Operations',
        description:
          'High-volume visual content production, 3D asset generation, and localized marketing collateral.',
      },
      {
        title: 'Marketing AI Operations',
        description:
          'Automated ad creative generation, real-time bid adjustments, and campaign performance monitoring.',
      },
      {
        title: 'Storefront Merchandising & QA',
        description:
          'Continuous regression testing, promo code validation, and checkout conversion rate optimization.',
      },
      {
        title: 'Customer Experience Management',
        description:
          'Multi-channel concierge support resolving queries across email, chat, and social channels within minutes.',
      },
    ],
  },
};

/**
 * Normalizes input slug or slug array to match a service item.
 * Supports single slug string ('automotive') or array (['automotive'], ['strategy-design', 'commerce-strategy-consulting']).
 * Provides intelligent fallback so no route ever errors out.
 */
export function getServiceData(slugOrPath: string | string[]): ServiceDetailItem {
  let normalizedSlug = '';
  if (Array.isArray(slugOrPath)) {
    // Check if the last slug matches, or first slug matches
    const last = slugOrPath[slugOrPath.length - 1];
    const first = slugOrPath[0];
    if (SERVICES_DATA[last]) {
      normalizedSlug = last;
    } else if (SERVICES_DATA[first]) {
      normalizedSlug = first;
    } else {
      normalizedSlug = last;
    }
  } else {
    normalizedSlug = slugOrPath.toLowerCase().trim();
  }

  if (SERVICES_DATA[normalizedSlug]) {
    return SERVICES_DATA[normalizedSlug];
  }

  // Handle aliases
  if (normalizedSlug === 'fashion-lifestyle') return SERVICES_DATA['fashion'];
  if (normalizedSlug === 'science' || normalizedSlug === 'health') return SERVICES_DATA['health-science'];
  if (normalizedSlug === 'banking') return SERVICES_DATA['banking-insurance'];
  if (normalizedSlug === 'consumer') return SERVICES_DATA['consumer-goods'];

  // Formatted title fallback
  const fallbackTitle = normalizedSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    slug: normalizedSlug,
    category: 'service',
    title: fallbackTitle,
    tagline: `${fallbackTitle} Solutions & Infrastructure`,
    subtitle: `Empowering enterprises with intelligent ${fallbackTitle} strategies, automation, and scalable commerce operations.`,
    overviewSubTitle: `We provide specialized digital solutions tailored to solve complex operational challenges in ${fallbackTitle}.`,
    heroImage: '/images/services/industries_automotive.jpg',
    middleImage: '/images/services/Btm_Automotive.jpg',
    overviewHeading: `Accelerating ${fallbackTitle} Through Intelligent Systems & Automation.`,
    overviewParagraphs: [
      `Digital transformation is reshaping ${fallbackTitle}, creating new avenues for efficiency, market expansion, and deeper customer engagement.`,
      `We combine robust enterprise architectures with agile execution to ensure scalable outcomes, rigorous compliance, and tangible commercial return across global markets.`,
    ],
    approachHeading: 'Our approach',
    approachIntro: `With deep industry expertise, our team empowers organizations in ${fallbackTitle} to accelerate their digital ecosystems:`,
    principles: [
      {
        title: 'Customized Solutions',
        description: `Engineered specifically to solve core operational and marketplace challenges in ${fallbackTitle}.`,
      },
      {
        title: 'Data-Driven Precision',
        description:
          'Real-time telemetry, synchronized inventory, and predictive demand analytics inform every workflow.',
      },
      {
        title: 'Seamless Integration',
        description:
          'Direct API pipelines into top marketplaces, ERP systems, and cloud infrastructure.',
      },
      {
        title: 'Continuous Optimization',
        description:
          'Ongoing iterations, SLA guarantees, and performance monitoring to maximize lifetime value.',
      },
    ],
  };
}
