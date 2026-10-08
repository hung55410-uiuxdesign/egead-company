import type { FaqItem } from '@/components/sections';

export const allServicesFaqs: FaqItem[] = [
  {
    question: 'How quickly does E-GEAD dispatch US print-on-demand orders?',
    answer:
      'Over 95% of standard orders are printed, quality-inspected, and handed over to US domestic carriers (USPS/UPS) within 12 to 24 hours of receiving the order webhook. Carrier origin scan occurs well within strict marketplace deadlines.',
    category: 'Operations & SLA',
  },
  {
    question: 'Can E-GEAD integrate with our existing custom ERP or Shopify store?',
    answer:
      'Yes. We offer fully documented Open RESTful APIs and real-time Webhooks that allow direct two-way synchronization with any custom ERP, WMS, or Shopify Plus store with sub-150ms response latency.',
    category: 'Integrations & API',
  },
  {
    question: 'What is included in the $6 all-in unit rate?',
    answer:
      'Our transparent $6 base rate covers the premium blank garment, high-resolution 23-inch roll-fed DTF printing, barcode WMS sorting, standard protective packaging, and labor with zero hidden picking or handling fees.',
    category: 'Pricing & Economics',
  },
  {
    question: 'How does E-GEAD safeguard our TikTok Shop seller account health?',
    answer:
      'By ensuring physical carrier origin scans occur well within TikTok Shop US strict 48-hour SLA deadline. This keeps your Late Dispatch Rate (LDR) far below the 4% penalty ceiling, protecting your account from order volume limits (OVL).',
    category: 'Operations & SLA',
  },
  {
    question: 'What advertising channels does your digital growth team manage?',
    answer:
      'We specialize in TikTok Shop Ads, Meta (Facebook & Instagram), and Google Shopping / Performance Max campaigns. We focus on high-intent creative testing, CPA containment, and maximizing blended return on ad spend (ROAS).',
    category: 'Growth & Ads',
  },
  {
    question: 'Is there any minimum order quantity (MOQ) to get started with E-GEAD?',
    answer:
      'No MOQ. Whether you process 10 orders a day as an emerging brand or 5,000 orders daily during Q4 peak holiday campaigns, E-GEAD infrastructure scales elastically to match your demand.',
    category: 'Operations & SLA',
  },
];
