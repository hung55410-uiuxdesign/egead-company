import type { ReactNode } from 'react';

export type ServiceChildItem = {
  icon: string;
  title: string;
  desc: string;
}

export type ServicePillar = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  iconImg: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  children: ServiceChildItem[];
}

export type ProvenResultMetric = {
  icon: string;
  title: string;
  description: string;
  detail: string;
  badge: string;
}

export type ComplianceBadgeItem = {
  title: string;
  description: string;
  icon: ReactNode;
}
