import type { FaqItem } from '@/components/sections';

export const PARTNERS_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Does E-GEAD share or sell our store customer data?',
    answer:
      'Strictly no. E-GEAD adheres to strict mutual non-disclosure agreements (NDAs) and complies fully with SOC2 Type II, GDPR, and CCPA data privacy frameworks. Customer shipping details are processed solely for printing, packaging, and carrier delivery verification.',
  },
  {
    question: 'How long does it take to connect a new TikTok Shop or Shopify store?',
    answer:
      'Connecting a new storefront takes less than 5 minutes through our secure OAuth 2.0 authorization interface. Once approved, webhook endpoints activate instantaneously, allowing test orders to route in minutes.',
  },
  {
    question: 'Can we connect multiple stores from different platforms to one E-GEAD account?',
    answer:
      'Yes. Our multi-tenant architecture allows you to connect an unlimited number of TikTok Shop, Amazon, Etsy, and Shopify stores into a single centralized Eweb-platform dashboard with unified inventory buffers and margin reconciliation.',
  },
  {
    question: 'What happens if a marketplace API experiences unexpected downtime?',
    answer:
      'E-GEAD employs an enterprise event retry queue with Exponential Backoff and dead-letter queue (DLQ) safeguards. Ingestion events are securely buffered in Redis memory, ensuring zero dropped orders or missed tracking updates during third-party outages.',
  },
  {
    question: 'Are there any ongoing API connection fees or hidden platform surcharges?',
    answer:
      'No. Standard marketplace and storefront integrations are completely free with zero ongoing monthly API connection fees. You only pay for manufacturing base costs and postage with our transparent $6 all-in pricing structure.',
  },
];
