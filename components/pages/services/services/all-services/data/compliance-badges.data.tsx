import { Flame, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import type { ComplianceBadgeItem } from '../types';

export const complianceBadges: ComplianceBadgeItem[] = [
  {
    title: 'TikTok Shop US LDR Shield',
    description:
      'Maintains Late Dispatch Rate under 1% (platform threshold < 4%), securing Fast Dispatch badges and algorithm visibility.',
    icon: <Flame className="w-6 h-6" aria-hidden="true" />,
  },
  {
    title: 'Amazon FBM VTR Guarantee',
    description:
      'Automated origin tracking injection ensures Valid Tracking Rate (VTR) stays above 95% across all Amazon FBM orders.',
    icon: <CheckCircle2 className="w-6 h-6" aria-hidden="true" />,
  },
  {
    title: 'Bank-Grade Data Privacy',
    description:
      'Customer PII data is secured with AES-256 encryption, fully compliant with GDPR and California CCPA privacy standards.',
    icon: <Lock className="w-6 h-6" aria-hidden="true" />,
  },
  {
    title: '99.9% Uptime Cloud SLA',
    description:
      'Enterprise cloud routing across AWS and Cloudflare Edge guarantees uninterrupted storefront operations during peak holiday rushes.',
    icon: <ShieldCheck className="w-6 h-6" aria-hidden="true" />,
  },
];
