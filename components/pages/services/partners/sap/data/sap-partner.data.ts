import type {
  SapAdvantageItem,
  SapExpertiseItem,
  SapWhyItem,
  SapCaseStudyItem,
} from '../types';

export const SAP_ADVANTAGES: SapAdvantageItem[] = [
  {
    id: 'years',
    metric: '10+ years',
    description:
      'of experience building custom solutions for medium-to-large merchants seeking rapid growth and increased brand value.',
    iconName: 'years',
  },
  {
    id: 'delivery',
    metric: '100% project delivery',
    description: 'rate on 90+ successful projects across global enterprise implementations.',
    iconName: 'delivery',
  },
  {
    id: 'engineers',
    metric: '150+ SAP engineers',
    description: 'An expert team of 150+ certified SAP technical consultants and solution architects.',
    iconName: 'engineers',
  },
  {
    id: 'support',
    metric: '24/7 support',
    description:
      'Deep industry knowledge in strategies, creative design, and implementation experiences with 24/7 support.',
    iconName: 'support',
  },
];

export const SAP_EXPERTISE: SapExpertiseItem[] = [
  {
    id: 'implementation-customization',
    title: 'SAP Implementation & Customization.',
    paragraphs: [
      'In enterprise eCommerce technologies, one size does not fit all.',
      "Understanding that, we make sure your SAP implementation is not only tailored for your businesses' specific demands but also for excellence.",
      'From module configuration to bespoke solutions, we empower your enterprise with a tailored SAP environment that maximizes efficiency and productivity.',
    ],
    image:
      'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/c32a7a69-6188-4f87-bd1f-0cbad778228b:68c07a2e42bd1f5e6e7b828dc8e7700f775aad47/Img1.png',
    imageFallback: '/images/services/enterprise_tech.jpg',
    alt: 'SAP Implementation and Customization',
  },
  {
    id: 'integration-migration',
    title: 'Integration & Migration.',
    paragraphs: [
      'Staying current is crucial in the ever-evolving realm of SAP technologies.',
      'We implement, but more importantly, we stay vigilant in tracking and adopting the latest SAP technologies. Our continuous support and integration services ensure your SAP landscape remains optimized for peak performance.',
      'We facilitate seamless migration processes, enabling you to transition smoothly to upgraded SAP solutions, minimizing disruptions and maximizing benefits.',
    ],
    image:
      'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/4cad330e-de0b-4049-9611-403898febf53:7b86bdb97ee7e103d71d2bcec816caa7ddc1912c/Img2.png',
    imageFallback: '/images/services/Btm_Automotive.jpg',
    alt: 'SAP Integration and Migration',
  },
  {
    id: 'reporting-analytics',
    title: 'Reporting & Analytics.',
    paragraphs: [
      "Harnessing the full potential of SAP's reporting and analytics capabilities is key to informed decision-making.",
      'Our team employs advanced analytics tools within SAP to extract meaningful insights from your data. This empowers your business leaders to make strategic decisions based on real-time, data-driven intelligence.',
      'From financial reporting to operational analytics, we unlock the power of SAP to provide actionable insights that drive business growth and innovation.',
    ],
    image:
      'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/f06634b9-61b6-48dd-b6dc-62292a491b89:cedf8216f1921cd55981112c6315c3045a13183b/Img3.png',
    imageFallback: '/images/services/data_analytics.jpg',
    alt: 'SAP Reporting and Analytics',
  },
  {
    id: 'training-support',
    title: 'User Training & Support.',
    paragraphs: [
      "Adopting SAP is not just a technology shift; it's a cultural change for your organization.",
      'Our comprehensive training programs ensure that your teams are well-equipped to navigate and leverage the functionalities of SAP effectively.',
      'Beyond training, our reliable support services stand by your side, providing a smooth user experience and quick issue resolution.',
    ],
    image:
      'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/b04cf302-7eb4-4594-8afe-1ee242b0448e:517c5ed763ab0a07eecca61745a5e9a55a4d6bf2/Img4.png',
    imageFallback: '/images/services/strategy_design.jpg',
    alt: 'SAP User Training and Support',
  },
];

export const SAP_WHY_ITEMS: SapWhyItem[] = [
  {
    id: 'streamline',
    title: 'Streamline, optimize, and thrive',
    content:
      'Say goodbye to manual tasks and inefficiencies. SAP empowers you to automate processes, eliminate redundancies, and optimize workflows, driving unparalleled operational efficiency.',
  },
  {
    id: 'decisions',
    title: 'Data-driven decisions',
    content:
      'Harness the power of real-time data and analytics to make informed, strategic decisions that propel your business forward.',
  },
  {
    id: 'adapt',
    title: 'Adapt, grow, and stay ahead',
    content:
      'Scale effortlessly, expand into new markets, and transform your operations with the confidence that SAP provides.',
  },
  {
    id: 'cx',
    title: 'Unforgettable customer experiences, unwavering loyalty',
    content:
      'Unlock the potential of personalized interactions and seamless service delivery that leave a lasting customer impression.',
  },
  {
    id: 'savings',
    title: 'Maximize savings, propel profitability',
    content:
      'Your bottom line matters. SAP empowers you to optimize resource utilization, reduce manual efforts, and eliminate costly inefficiencies.',
  },
];

export const SAP_CASE_STUDIES: SapCaseStudyItem[] = [
  {
    id: 'jsr-materials',
    slug: 'harnessing-data-for-streamlined-business-processes-and-decisions',
    customer: 'A leading Japanese advanced materials manufacturer',
    title: 'Unleashing the power of data to streamline business processes and decision making.',
    tags: ['Technology', 'Engineering/Manufacturing'],
    image:
      'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/1b3c5b2a-d93a-4555-8210-69d300e7c358:435531399b3b343c44848d4119617003d132cbd0/Thumbnail_Services_JSR.jpg',
  },
  {
    id: 'weir-minerals',
    slug: 'digitizing-a-b2b-legacy-across-14-markets',
    customer: 'A global mining equipment and mineral processing solutions company',
    title: 'Digitizing a B2B legacy across 14 markets.',
    tags: ['Technology', 'Creative', 'Engineering/Manufacturing'],
    image:
      'https://www.sai-digital.com/site/sai-website/master/_/attachment/inline/8795d227-0bf0-4ddf-9018-0f631ef77c25:2a2b8a4b06cf09bb13e4f18d28f49550efeef129/Thumbnail_Services_Weir2.jpg',
  },
];
