import { Rocket, Scale, Boxes, Gift } from 'lucide-react';
import type {
  NavItem,
  ProductItem,
  ServiceItem,
  IndustryItem,
  PartnerItem,
  CompanyItem,
  MobileProductCard,
  LanguageCode,
} from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'services', label: 'Services & Solutions', href: '/services/all-services', hasDropdown: true },
  { id: 'insights', label: 'Activities', href: '/insights', hasDropdown: true },
  { id: 'careers', label: 'Careers', href: '/careers' },
  { id: 'company', label: 'Company', href: '/company', hasDropdown: true },
];

export const PRODUCT_COLUMNS: { title?: string; items: ProductItem[] }[] = [
  {
    items: [
      { name: 'SpeedX', href: '/speedx', icon: Rocket },
      { name: 'SmartPrice', href: '/smartprice', icon: Scale },
    ],
  },
  {
    items: [{ name: 'SmartCommerce', href: '/smartcommerce', icon: Boxes }],
  },
  {
    items: [{ name: 'SmartLoyalty', href: '/loyalty', icon: Gift }],
  },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    name: 'Strategy & Design',
    href: '/services/all-services/strategy-design',
    icon: '/assets/icon_strategy_design.svg',
  },
  {
    name: 'Data & Analytics',
    href: '/services/all-services/data-analytics',
    icon: '/assets/icon_data_analytics.svg',
  },
  {
    name: 'Enterprise Technology',
    href: '/services/all-services/enterprise-technology',
    icon: '/assets/icon_enterprise_tech.svg',
  },
  {
    name: 'Commerce & CX Operations',
    href: '/services/all-services/commerce-cx--operations',
    icon: '/assets/icon_commerce_cx.svg',
  },
];

export const INDUSTRY_ITEMS: IndustryItem[] = [
  {
    name: 'Automotive',
    href: '/services/all-services/automotive',
    icon: '/assets/icon_automotive.svg',
  },
  {
    name: 'Banking & Insurance',
    href: '/services/all-services/banking-insurance',
    icon: '/assets/icon_banking.svg',
  },
  {
    name: 'Chemicals',
    href: '/services/all-services/chemicals',
    icon: '/assets/icon_chemicals.svg',
  },
  {
    name: 'Consumer Goods',
    href: '/services/all-services/consumer-goods',
    icon: '/assets/icon_consumergoods.svg',
  },
  {
    name: 'Fashion & Lifestyle',
    href: '/services/all-services/fashion',
    icon: '/assets/icon_fashion.svg',
  },
  {
    name: 'Health & Science',
    href: '/services/all-services/health-science',
    icon: '/assets/icon_science.svg',
  },
];

export const PARTNER_ITEMS: PartnerItem[] = [
  { name: 'SAP', href: '/partners/sap' },
  { name: 'Shopify Plus', href: '/partners/shopify-plus' },
  { name: 'Sitecore', href: '/partners/site-core' },
  { name: 'Stripe', href: '/partners/stripe' },
];

export const COMPANY_ITEMS_COL1: CompanyItem[] = [
  {
    key: 'about',
    name: 'About us',
    href: '/company',
    icon: '/assets/icon_about_us.svg',
  },
  {
    key: 'offices',
    name: 'Our Offices',
    href: '/contact-us',
    icon: '/assets/icon_offices.svg',
    hasBorderBottom: true,
  },
];

export const COMPANY_ITEMS_COL2: CompanyItem[] = [
  {
    key: 'work',
    name: 'Our Work',
    href: '/our-work',
    icon: '/assets/icon_strategy_design.svg',
    hasArrow: true,
  },
];

export const COMPANY_ITEMS_COL3: CompanyItem[] = [
  {
    key: 'people',
    name: 'Our People',
    href: '/people',
    icon: '/assets/icon_people.svg',
  },
];

export const MOBILE_PRODUCT_CARDS: MobileProductCard[] = [
  {
    tag: 'Operations Dashboard',
    title: 'Eweb-platform',
    description:
      'Connect storefronts, WMS inventory, and financial reconciliation in real time without manual spreadsheets.',
    href: '/smartcommerce',
    actionText: 'Learn more',
  },
  {
    tag: 'AI/ML Pricing Intelligence',
    title: 'SmartPrice',
    description:
      'Recommend optimal trading prices for pre-owned products using AI/ML real-time market intelligence.',
    href: '/smartprice',
    actionText: 'Learn more',
  },
  {
    tag: 'AI & POD Engine',
    title: 'SpeedX',
    description:
      'Smart AI order normalization, address validation, fraud risk filtering, and sub-24h US POD fulfillment.',
    href: '/speedx',
    actionText: 'Learn more',
  },
  {
    tag: 'High-Converting Storefront',
    title: 'Eweb-builder',
    description:
      'Ultra-fast, SEO-optimized storefront development pre-connected to E-GEAD fulfillment APIs for US and EU markets.',
    href: '/smartcommerce',
    actionText: 'Learn more',
  },
  {
    tag: 'Omnichannel Retention',
    title: 'SmartLoyalty',
    description:
      'Cultivate deeper customer relationships, drive retention, and build sustainable communities across O2O touchpoints.',
    href: '/loyalty',
    actionText: 'Learn more',
  },
  {
    tag: 'Instant Estimator',
    title: 'Rate Calculator',
    description:
      'Calculate print costs, dimensional weights, and multi-state shipping rates in seconds with full margin visibility.',
    href: '/contact-us',
    actionText: 'Calculate rate',
  },
];

export const AVAILABLE_LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'EN', label: 'English (EN)' },
  { code: 'VI', label: 'Tiếng Việt (VI)' },
];
