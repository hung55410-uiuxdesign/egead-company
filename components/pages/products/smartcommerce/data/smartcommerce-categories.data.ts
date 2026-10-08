export type CategoryKey =
  | 'all'
  | 'exp'
  | 'inv'
  | 'mak'
  | 'ord'
  | 'ins'
  | 'prp'
  | 'sed'
  | 'ana';

export type CategoryTab = {
  id: CategoryKey;
  label: string;
}

export const CATEGORIES: CategoryTab[] = [
  { id: 'all', label: 'All' },
  { id: 'exp', label: 'Customer Experience' },
  { id: 'inv', label: 'Inventory & Logistics' },
  { id: 'mak', label: 'Marketing & Content' },
  { id: 'ord', label: 'Order Management' },
  { id: 'ins', label: 'Market Insights' },
  { id: 'prp', label: 'Pricing & Promotions' },
  { id: 'sed', label: 'Search & Discovery' },
  { id: 'ana', label: 'Analytics & Decisions' },
];

export type PartnerLogoItem = {
  name: string;
  src: string;
}

export const COMPATIBLE_PARTNERS: PartnerLogoItem[] = [
  { name: 'Amazon', src: '/assets/partners/09.svg' },
  { name: 'Bolt', src: '/assets/partners/02.svg' },
  { name: 'Webflow', src: '/assets/partners/03.svg' },
  { name: 'Gorgias', src: '/assets/partners/20.svg' },
  { name: 'Omnisend', src: '/assets/partners/17.svg' },
  { name: 'Brevo', src: '/assets/partners/24.svg' },
  { name: 'Attentive', src: '/assets/partners/26.svg' },
  { name: 'Typeform', src: '/assets/partners/01.svg' },
];
