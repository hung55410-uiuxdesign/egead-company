import type { WorkflowStep } from '@/components/sections';

export const allServicesWorkflowSteps: WorkflowStep[] = [
  {
    step: '01',
    title: 'Order Ingestion',
    description: 'Webhook automatically triggers order capture across TikTok Shop, Amazon, Etsy, or Shopify.',
    subtext: 'Latency < 1s • Instant Webhook Event',
    badge: 'Real-Time',
  },
  {
    step: '02',
    title: 'AI Sanitization & Verification',
    description: 'AI normalizes USPS postal standards, validates Zip+4, and flags high-risk fraudulent orders.',
    subtext: 'USPS CASS Certified • Zero RTO',
    badge: 'AI Precision',
  },
  {
    step: '03',
    title: 'Automated DTF Production',
    description: 'High-res 23-inch print files are automatically auto-ganged, printed, and heat-pressed onto blanks.',
    subtext: 'Sub-12H Print Queue • OEKO-TEX Inks',
    badge: 'Industrial DTF',
  },
  {
    step: '04',
    title: 'Barcode QC & Scan Injection',
    description: 'Technicians scan barcode checkpoints, inspect garment finish, and automatically dispatch tracking to platform.',
    subtext: 'Sub-20H First Carrier Scan',
    badge: '99.9% Accuracy',
  },
  {
    step: '05',
    title: 'Domestic Delivery Handshake',
    description: 'Packages handed over to USPS / UPS hubs with real-time end-customer tracking updates.',
    subtext: '2-4 Days Domestic US Transit',
    badge: 'Delivered',
  },
];
