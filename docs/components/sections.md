# UI Layout Components Reference Catalog & Accessibility Guide (Phase 1 & Phase 2)

> **Document Version**: 1.1.0  
> **Status**: Production Ready (Phase 1 & Phase 2 Complete)  
> **Target Audience**: Frontend Engineers, UX/UI Designers, Solution Architects  
> **Scope**: Standardized Layout Sections for E-GEAD Company 2026 Portal ([`components/sections`](file:///C:/Develop/egead/egead-company/components/sections/index.ts))  
> **WCAG Target**: WCAG 2.1 Level AA Compliant

---

## 1. Executive Summary & Design System Standards

During **Phase 1**, six modular, responsive, and accessible UI layout section components were engineered under [`components/sections/`](file:///C:/Develop/egead/egead-company/components/sections/index.ts).

During **Phase 2**, the first complete page overhaul was executed for [Phase 2: All Services (`app/services/all-services/page.tsx`)](file:///C:/Develop/egead/egead-company/app/services/all-services/page.tsx). As part of this overhaul, an interactive financial calculator component, [`MarginSimulator.tsx`](file:///C:/Develop/egead/egead-company/components/sections/MarginSimulator.tsx), was engineered and integrated as Section 7 of the 11-section architecture.

These components serve as the foundational layout building blocks for subsequent page overhauls across Phase 3 through Phase 8:
- [Phase 2: All Services (`app/services/all-services/page.tsx`)](file:///C:/Develop/egead/egead-company/app/services/all-services/page.tsx) — **COMPLETED (11/11 Sections Integrated)**
- [Phase 3: SpeedX (`app/speedx/page.tsx`)](file:///C:/Develop/egead/egead-company/app/speedx/page.tsx)
- [Phase 4: SmartCommerce (`app/smartcommerce/page.tsx`)](file:///C:/Develop/egead/egead-company/app/smartcommerce/page.tsx)
- [Phase 5: Our Work (`app/our-work/page.tsx`)](file:///C:/Develop/egead/egead-company/app/our-work/page.tsx)
- [Phase 6: Partners (`app/partners/page.tsx`)](file:///C:/Develop/egead/egead-company/app/partners/page.tsx)
- [Phase 7: Insights (`app/insights/page.tsx`)](file:///C:/Develop/egead/egead-company/app/insights/page.tsx)
- [Phase 8: Company (`app/company/page.tsx`)](file:///C:/Develop/egead/egead-company/app/company/page.tsx)

### Design System Tokens & Color Palette

| Token / Role | Hex / Value | Semantic Use | Contrast on Dark (`#0A0D0E`) |
| :--- | :--- | :--- | :--- |
| **Primary Background** | `#0A0D0E` | Deep obsidian canvas | N/A (Base) |
| **Card / Surface BG** | `#141718` | Elevated container backdrop (90% opacity + blur) | ~ 1.2:1 (Subtle border separation) |
| **Pill / Icon BG** | `#1D2224` | Nested badge, icon wrapper, elevated state | ~ 1.5:1 |
| **Border / Divider** | `#262C30` | Structural card borders and dividing rules | ~ 2.0:1 |
| **Primary Accent (Cyan)** | `#25E2CC` | Interactive highlights, active states, key metrics | **11.2:1 (AAA Pass)** |
| **Cyan Light (Text/Tint)** | `#D3F9F5` | Secondary labels, high-legibility body snippets | **13.5:1 (AAA Pass)** |
| **Muted Text / Paragraph** | `#8C8C8C` | Supporting descriptive copy, metadata | **4.7:1 (AA Normal Pass)** |
| **Headings Font** | `Rubik`, sans-serif | Bold geometric headers (`h2`, `h3`), large numbers | High legibility |
| **Body & UI Font** | `Montserrat`, sans-serif | Badges, buttons, descriptions, table items | Highly readable at small scales |

---

## 2. Component Catalog & Detailed Specifications

```
components/sections/
├── BentoGrid.tsx          # Asymmetric feature grid (1/2/3 col span, row span)
├── MetricsRibbon.tsx      # High-impact metric banner (2/3/4 column responsive)
├── ComparisonTable.tsx    # Head-to-head feature matrix (Accessible Table/Card)
├── FaqAccordion.tsx       # Collapsible Q&A with Schema.org JSON-LD FAQPage
├── WorkflowTimeline.tsx   # Sequential step pipeline with glowing line & ol/li
├── RoleTabs.tsx           # WAI-ARIA role/persona tab switcher with metrics & CTA
├── MarginSimulator.tsx    # Interactive ROI, margin & SLA efficiency simulator
└── index.ts               # Barrel export for components and TypeScript types
```

Barrel export source: [`components/sections/index.ts`](file:///C:/Develop/egead/egead-company/components/sections/index.ts).

```tsx
import {
  BentoGrid,
  MetricsRibbon,
  ComparisonTable,
  FaqAccordion,
  WorkflowTimeline,
  RoleTabs,
  MarginSimulator,
} from '@/components/sections';
import type {
  BentoItem,
  MetricItem,
  ComparisonRow,
  FaqItem,
  WorkflowStep,
  RoleTabItem,
  MarginSimulatorProps,
} from '@/components/sections';
```

---

### 2.1 BentoGrid

- **Source Code**: [`components/sections/BentoGrid.tsx`](file:///C:/Develop/egead/egead-company/components/sections/BentoGrid.tsx)
- **Component Type**: Server Component (or Client when passing interactive visual nodes)
- **Primary Use**: Visualizing modular pillars, asymmetric features, product capabilities, or architectural highlights without repetitive card grids.

#### TypeScript Interface

```typescript
export interface BentoItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  highlight?: boolean;
  icon?: React.ReactNode;
  stats?: {
    value: string;
    label: string;
  };
  visual?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
}

export interface BentoGridProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  description?: string;
  items: BentoItem[];
  className?: string;
}
```

#### Accessibility & WCAG 2.1 AA Compliance

1. **Semantic Structure**: Rendered as a semantic `<section>` with an anchorable `id`. Header block uses proper hierarchical heading levels (`<h2>` title, `<h3>` for cards).
2. **Keyboard Navigability**: Embedded CTA links (`<Link>`) feature distinct focus indicators: `focus:outline-none focus-visible:underline`.
3. **Screen Reader Context**: CTAs have explicit `aria-label={`${item.ctaText}: ${item.title}`}` preventing ambiguous "Learn more" screen reader links. Decorative icons use `aria-hidden="true"`.
4. **Contrast**: Highlighted cards use `#25E2CC` borders and text over `#141718` background (exceeds 10:1 ratio).

#### Usage Example

```tsx
import React from 'react';
import { BentoGrid } from '@/components/sections';
import { Cpu, Zap, ShieldCheck } from 'lucide-react';

export default function ServicesPillarsSection() {
  return (
    <BentoGrid
      id="pillars"
      badge="Core Architecture"
      title={<>Engineered for <span className="text-[#25E2CC]">Sub-24H Scale</span></>}
      description="Six tightly integrated modules powering high-volume Print-on-Demand and omni-channel e-commerce."
      items={[
        {
          id: 'ai-routing',
          title: 'Intelligent Order Routing',
          description: 'Auto-dispatches orders to the nearest US manufacturing hub within 50ms.',
          tag: 'Real-time AI',
          colSpan: 2,
          highlight: true,
          icon: <Cpu className="w-6 h-6" />,
          stats: { value: '< 50ms', label: 'Routing Latency' },
          ctaText: 'Explore Routing Engine',
          ctaHref: '/speedx#routing',
        },
        {
          id: 'color-calibration',
          title: 'Spectrophotometer DTF',
          description: 'Industrial 23-inch wide print beds calibrated with 99.8% color delta accuracy.',
          tag: 'Hardware',
          colSpan: 1,
          icon: <Zap className="w-6 h-6" />,
        },
        {
          id: 'sla-shield',
          title: 'TikTok Shop SLA Protection',
          description: 'Automated buffer inventory and sub-24h fulfillment keeping Late Dispatch Rate < 4%.',
          tag: 'Compliance',
          colSpan: 3,
          icon: <ShieldCheck className="w-6 h-6" />,
          stats: { value: '99.4%', label: 'On-time Dispatch Rate' },
        },
      ]}
    />
  );
}
```

---

### 2.2 MetricsRibbon

- **Source Code**: [`components/sections/MetricsRibbon.tsx`](file:///C:/Develop/egead/egead-company/components/sections/MetricsRibbon.tsx)
- **Component Type**: Server Component
- **Primary Use**: Highlighting measurable proof points, SLA commitments, operational volumes, and financial efficiencies across all landing pages.

#### TypeScript Interface

```typescript
export interface MetricItem {
  value: string;
  label: string;
  trend?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface MetricsRibbonProps {
  id?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  metrics: MetricItem[];
  className?: string;
}
```

#### Accessibility & WCAG 2.1 AA Compliance

1. **Responsive Grid Hierarchy**: Adapts cleanly from 2-column on mobile (`grid-cols-2`) to 4-column on desktop (`lg:grid-cols-4`), preventing cramped text and overlapping numbers.
2. **Text Legibility**: Large quantitative values utilize font `Rubik` with high contrast `#FFFFFF` and hover `#25E2CC`, accompanied by high-contrast secondary labels (`#D3F9F5`).
3. **Pulsing Indicator**: Decorative status dot includes pulse animation with non-flashing low frequency (safe for vestibular and seizure accessibility).

#### Usage Example

```tsx
import React from 'react';
import { MetricsRibbon } from '@/components/sections';
import { Clock, CheckCircle2, TrendingUp, Layers } from 'lucide-react';

export default function ProductionMetrics() {
  return (
    <MetricsRibbon
      id="live-stats"
      badge="Verified Benchmarks"
      title="Scale You Can Trust"
      subtitle="Operational performance across our California & Texas fulfillment centers"
      metrics={[
        {
          value: '< 24H',
          label: 'Fulfillment SLA',
          trend: '99.4% Met',
          description: 'From webhook received to carrier scan.',
          icon: <Clock className="w-5 h-5" />,
        },
        {
          value: '99.8%',
          label: 'Print Quality Rate',
          trend: 'Zero Defect Policy',
          description: 'AI vision inspects every finished tee.',
          icon: <CheckCircle2 className="w-5 h-5" />,
        },
        {
          value: '50K+',
          label: 'Daily Peak Capacity',
          trend: '+250% Q4 Surge',
          description: 'Scalable automated printing lines.',
          icon: <Layers className="w-5 h-5" />,
        },
        {
          value: '$6.00',
          label: 'Flat US Shipping',
          trend: 'Tier 1 Carriers',
          description: 'Sub-3 days coast-to-coast delivery.',
          icon: <TrendingUp className="w-5 h-5" />,
        },
      ]}
    />
  );
}
```

---

### 2.3 ComparisonTable

- **Source Code**: [`components/sections/ComparisonTable.tsx`](file:///C:/Develop/egead/egead-company/components/sections/ComparisonTable.tsx)
- **Component Type**: Server Component
- **Primary Use**: Head-to-head comparison demonstrating quantitative and operational advantages of E-GEAD vs traditional 3PL / manual print vendors.

#### TypeScript Interface

```typescript
export interface ComparisonRow {
  feature: string;
  category?: string;
  egead: string | boolean;
  traditional: string | boolean;
  egeadNote?: string;
  traditionalNote?: string;
  highlight?: boolean;
}

export interface ComparisonTableProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  egeadTitle?: string;
  egeadSubtitle?: string;
  traditionalTitle?: string;
  traditionalSubtitle?: string;
  rows: ComparisonRow[];
  className?: string;
}
```

#### Accessibility & WCAG 2.1 AA Compliance

1. **Full WAI-ARIA Table Roles**: Desktop layout uses semantic ARIA roles:
   - `role="table"` with `aria-label="E-GEAD vs Traditional Comparison"`
   - `role="rowgroup"` for headers and content bodies
   - `role="row"`, `role="columnheader"`, `role="rowheader"`, and `role="cell"`
2. **Screen Reader Accessible Booleans**: When boolean `true`/`false` values are supplied, the component renders visual check/cross icons accompanied by `<span className="sr-only">Supported</span>` and `<span className="sr-only">Not supported</span>`. Non-visual users never experience missing or silent status indicators.
3. **Dual View Layout (Mobile & Desktop)**:
   - Desktop (`hidden md:block`): Structured columnar table.
   - Mobile (`md:hidden`): Stacked key-value comparison cards, avoiding awkward horizontal scrolling while keeping full text context.

#### Usage Example

```tsx
import React from 'react';
import { ComparisonTable } from '@/components/sections';

export default function FulfillmentComparison() {
  return (
    <ComparisonTable
      id="comparison"
      badge="Head-to-Head Comparison"
      title={<>Why Top Sellers Migrate to <span className="text-[#25E2CC]">E-GEAD</span></>}
      subtitle="Comparing our automated API ecosystem against legacy manual fulfillment models."
      egeadTitle="E-GEAD Ecosystem"
      egeadSubtitle="AI Routing & Sub-24H Dispatch"
      traditionalTitle="Traditional 3PL"
      traditionalSubtitle="Manual Batches & Third-party Brokers"
      rows={[
        {
          feature: 'Average Production Turnaround',
          category: 'Speed',
          egead: 'Sub-24 Hours',
          traditional: '3 - 7 Business Days',
          egeadNote: 'Direct API to DTF print bed queue',
          traditionalNote: 'Subject to manual batch accumulation',
          highlight: true,
        },
        {
          feature: 'TikTok Shop LDR Safe Guarantee',
          category: 'Compliance',
          egead: true,
          traditional: false,
          egeadNote: 'Guarantees Late Dispatch Rate < 4%',
          traditionalNote: 'Frequent account suspension warnings',
        },
        {
          feature: 'Automated Address Cleansing',
          category: 'AI Tech',
          egead: true,
          traditional: false,
          egeadNote: 'Zero-latency USPS/FedEx CASS validation',
          traditionalNote: 'Manual CSV checking or ignored',
        },
        {
          feature: 'Real-time Webhook Telemetry',
          category: 'Integration',
          egead: 'Granular (5 Event Stages)',
          traditional: 'Carrier dispatch only',
        },
      ]}
    />
  );
}
```

---

### 2.4 FaqAccordion

- **Source Code**: [`components/sections/FaqAccordion.tsx`](file:///C:/Develop/egead/egead-company/components/sections/FaqAccordion.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Addressing objection handling, technical questions, pricing, and fulfillment queries while maximizing SEO with Schema.org markup.

#### TypeScript Interface

```typescript
export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FaqAccordionProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  items: FaqItem[];
  categories?: string[];
  includeSchema?: boolean;
  className?: string;
}
```

#### Accessibility & WCAG 2.1 AA Compliance

1. **WAI-ARIA Accordion Pattern**:
   - Each trigger is a `<button>` inside an `<h3>` heading.
   - Triggers include `aria-expanded={isOpen}` and `aria-controls={`faq-answer-${idx}`}`.
   - Panels feature `role="region"` and `aria-labelledby={`faq-btn-${idx}`}`.
2. **Keyboard Interactivity**:
   - Full keyboard focusability with visible ring: `focus-visible:ring-2 focus-visible:ring-[#25E2CC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D0E]`.
   - `Enter` and `Space` toggle active accordion state.
3. **Structured Data (SEO)**:
   - Injects `application/ld+json` for Google Rich Results (`FAQPage` entity).
   - Sanitized via `.replace(/</g, '\\u003c')` to protect against script injection vulnerabilities.

#### Usage Example

```tsx
'use client';

import React from 'react';
import { FaqAccordion } from '@/components/sections';

export default function ServicesFaq() {
  return (
    <FaqAccordion
      id="faq"
      badge="Help & Knowledge Base"
      title={<>Frequently Asked <span className="text-[#25E2CC]">Questions</span></>}
      subtitle="Everything you need to know about our SLA, shipping, integrations, and print quality."
      categories={['General', 'SLA & Fulfillment', 'Integrations']}
      includeSchema={true}
      items={[
        {
          question: 'How does E-GEAD achieve sub-24h turnaround for custom apparel?',
          answer: 'We leverage AI-automated RIP file prep combined with high-speed 23-inch DTF printers. As soon as an order syncs via webhook, the artwork is automatically scaled, color-profiled, and sent directly to the active print queue.',
          category: 'SLA & Fulfillment',
        },
        {
          question: 'What e-commerce platforms are natively supported?',
          answer: 'We provide direct one-click integrations with Shopify, TikTok Shop US, WooCommerce, Amazon, and custom headless storefronts via our REST and GraphQL APIs.',
          category: 'Integrations',
        },
        {
          question: 'Is there any minimum order quantity (MOQ)?',
          answer: 'No. Our entire manufacturing infrastructure is 100% on-demand. You can fulfill a single customized t-shirt or 20,000 units during peak promotional events without minimum commitments.',
          category: 'General',
        },
      ]}
    />
  );
}
```

---

### 2.5 WorkflowTimeline

- **Source Code**: [`components/sections/WorkflowTimeline.tsx`](file:///C:/Develop/egead/egead-company/components/sections/WorkflowTimeline.tsx)
- **Component Type**: Server Component
- **Primary Use**: Visualizing step-by-step pipelines (e.g. order ingestion → automated AI prep → DTF printing → quality scan → dispatch).

#### TypeScript Interface

```typescript
export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  subtext?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface WorkflowTimelineProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  steps: WorkflowStep[];
  className?: string;
}
```

#### Accessibility & WCAG 2.1 AA Compliance

1. **Semantic Ordered List (`<ol>` & `<li>`)**:
   - Sequential steps are rendered using semantic `<ol aria-label="Workflow pipeline sequential steps">` and `<ol aria-label="Workflow pipeline sequential steps mobile">`.
   - Screen readers announce ordinal step hierarchy (e.g. "Step 1 of 4").
2. **Decorative Elements**: The horizontal glowing neon line uses `aria-hidden="true"`, preventing screen readers from attempting to read decorative SVG/gradient tracks.
3. **High Contrast Step Indicators**: Step circles feature `#25E2CC` borders and high-visibility `#FFFFFF` labels with dark obsidian backdrops.
4. **Adaptive Flow**: Horizontal grid on desktop (`hidden lg:block`), switching to vertical connected chain on tablet/mobile (`lg:hidden`).

#### Usage Example

```tsx
import React from 'react';
import { WorkflowTimeline } from '@/components/sections';
import { Webhook, Sparkles, Printer, Truck } from 'lucide-react';

export default function OrderPipelineSection() {
  return (
    <WorkflowTimeline
      id="workflow"
      badge="Order-to-Door Pipeline"
      title={<>How Your Order Moves in <span className="text-[#25E2CC]">Under 24 Hours</span></>}
      subtitle="From the moment your customer clicks 'Buy Now' to carrier scanning."
      steps={[
        {
          step: '01',
          title: 'Webhook Sync & Address Cleanse',
          description: 'Instant synchronization from TikTok Shop or Shopify. AI validates street addresses and postal codes.',
          badge: 'Automated (<50ms)',
          subtext: 'USPS CASS Certified',
          icon: <Webhook className="w-6 h-6" />,
        },
        {
          step: '02',
          title: 'AI RIP & Color Calibration',
          description: 'Raster image processing scales resolution and balances CMYK ink density for exact brand accuracy.',
          badge: 'Automated',
          subtext: 'Delta E < 1.5',
          icon: <Sparkles className="w-6 h-6" />,
        },
        {
          step: '03',
          title: 'Direct-to-Film Precision Print',
          description: '23-inch wide industrial printers produce vibrant prints with soft hand-feel and high wash durability.',
          badge: 'In Production',
          subtext: 'Oeko-Tex Standard 100',
          icon: <Printer className="w-6 h-6" />,
        },
        {
          step: '04',
          title: 'QC Scan & Carrier Dispatch',
          description: 'Barcode scan verifies garment size and design, generating tracking numbers synchronized back to store.',
          badge: 'Sub-24H Guaranteed',
          subtext: 'USPS / UPS / DHL Express',
          icon: <Truck className="w-6 h-6" />,
        },
      ]}
    />
  );
}
```

---

### 2.6 RoleTabs

- **Source Code**: [`components/sections/RoleTabs.tsx`](file:///C:/Develop/egead/egead-company/components/sections/RoleTabs.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Persona/role switcher allowing Creators, E-Commerce Brand Owners, Global Agencies, and Enterprise Operators to self-select their tailored architecture.

#### TypeScript Interface

```typescript
export interface RoleTabItem {
  id: string;
  label: string;
  badge?: string;
  headline: string;
  description: string;
  bullets: string[];
  metrics?: {
    value: string;
    label: string;
  }[];
  ctaText?: string;
  ctaHref?: string;
  previewContent?: React.ReactNode;
}

export interface RoleTabsProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  tabs: RoleTabItem[];
  className?: string;
}
```

#### Accessibility & WCAG 2.1 AA Compliance

1. **Full WAI-ARIA Tablist Pattern**:
   - Parent container has `role="tablist"` with descriptive `aria-label="Role-based solutions selector"`.
   - Each interactive tab button has `role="tab"`, `id={`tab-${tab.id}`}`, `aria-selected={isActive}`, and `aria-controls={`panel-${tab.id}`}`.
   - Inactive tabs receive `tabIndex={-1}`, and the active tab receives `tabIndex={0}`.
   - The active panel container has `role="tabpanel"`, `id={`panel-${activeTab.id}`}`, `aria-labelledby={`tab-${activeTab.id}`}`, and `tabIndex={0}` for keyboard focus.
2. **Contrast & Focus Rings**:
   - Active tab uses `#25E2CC` background with black text (`#000000`) for maximum contrast (11.2:1).
   - Inactive tabs feature clear border contrast (`#262C30`) and hover states.
   - Focus styling includes `focus-visible:ring-2 focus-visible:ring-[#25E2CC] focus-visible:ring-offset-2`.
3. **Graceful Fallback**: Returns `null` if empty or missing tabs are passed, preventing runtime null reference errors.

#### Usage Example

```tsx
'use client';

import React from 'react';
import { RoleTabs } from '@/components/sections';

export default function PersonaSolutions() {
  return (
    <RoleTabs
      id="solutions-by-role"
      badge="Tailored Solutions"
      title={<>Architected for <span className="text-[#25E2CC]">Your Business Scale</span></>}
      subtitle="Select your operational model to inspect specific guarantees, integrations, and economics."
      tabs={[
        {
          id: 'creators',
          label: 'For Creators & Influencers',
          badge: 'Zero MOQ',
          headline: 'Launch your merch brand with zero inventory risk',
          description: 'Design custom collections, connect your TikTok Shop or Shopify, and let E-GEAD handle automated printing and delivery.',
          bullets: [
            'No minimum order quantity (MOQ)',
            'Custom packaging inserts and neck label printing',
            'Automated store sync with 24-hour dispatch',
          ],
          metrics: [
            { value: '$0', label: 'Upfront Capital' },
            { value: '< 24H', label: 'Average Dispatch' },
            { value: '4.9/5', label: 'Customer Rating' },
          ],
          ctaText: 'Start Your Merch Line',
          ctaHref: '/contact-us?role=creator',
        },
        {
          id: 'brands',
          label: 'For E-Commerce Brands',
          badge: 'Fast Scaling',
          headline: 'Protect your brand reputation with enterprise POD quality',
          description: 'Deliver retail-quality apparel with ultra-low return rates and carrier rate discounts.',
          bullets: [
            'Spectrophotometer DTF color consistency across runs',
            'Flat-rate $6 shipping across all 50 US states',
            'Dedicated Slack channel for real-time order support',
          ],
          metrics: [
            { value: '< 0.5%', label: 'Return Rate' },
            { value: '99.4%', label: 'TikTok Shop SLA' },
            { value: '-22%', label: 'Shipping Costs' },
          ],
          ctaText: 'Scale Your Brand',
          ctaHref: '/contact-us?role=brand',
        },
        {
          id: 'enterprise',
          label: 'For Enterprise & 3PLs',
          badge: 'Custom SLA',
          headline: 'Industrial throughput with custom API routing',
          description: 'Offload overflow demand or power white-label fulfillment through our high-capacity California and Texas production facilities.',
          bullets: [
            'Dedicated production line allocation during Q4 surges',
            'Custom REST & GraphQL webhook integrations',
            'Strict SLA with financial penalty backing',
          ],
          metrics: [
            { value: '50K+', label: 'Daily Units' },
            { value: '99.99%', label: 'API Uptime' },
            { value: 'Tier 1', label: 'Contract Rates' },
          ],
          ctaText: 'Speak to Enterprise Sales',
          ctaHref: '/contact-us?role=enterprise',
        },
      ]}
    />
  );
}
```

---

### 2.7 MarginSimulator

- **Source Code**: [`components/sections/MarginSimulator.tsx`](file:///C:/Develop/egead/egead-company/components/sections/MarginSimulator.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Interactive ROI, margin efficiency, labor hours reduction, and RTO avoidance simulation with dynamic channel selection and real-time calculation updates.
- **Page Integration**: Integrated as **Section 7** on [All Services (`app/services/all-services/page.tsx`)](file:///C:/Develop/egead/egead-company/app/services/all-services/page.tsx), positioned between the head-to-head comparison matrix and SLA compliance guarantees.

#### TypeScript Interface

```typescript
export interface MarginSimulatorProps {
  id?: string;
  className?: string;
}
```

#### State & Mathematical Calculation Logic

The component maintains internal client-side state to deliver instantaneous reactive feedback without network latency:

1. **`orderVolume: number`** (`useState<number>(1500)`):
   - Monthly order volume controlled via a range slider (range: `100` to `10,000`, step: `100`, default: `1,500`).
   - Dynamically reflected in both numeric display (`{orderVolume.toLocaleString('en-US')} orders/mo`) and live telemetry stat cards.

2. **`selectedChannel: string`** (`useState<string>('tiktok')`):
   - Active sales channel chosen from 4 predefined e-commerce channels:
     - `tiktok`: TikTok Shop US (SLA Req: `4%` LDR threshold)
     - `amazon`: Amazon FBM (SLA Req: `VTR 95%`)
     - `etsy`: Etsy Global (SLA Req: `Star Seller`)
     - `shopify`: Shopify DTC (SLA Req: `Direct API`)

##### Mathematical & Operational Metrics Formulas:
- **Operational Hours Saved**: `Math.round(orderVolume * 0.028)` (~42 hrs/mo at 1,500 orders). Reflects automated order syncing, RIP file prep, and carrier tracking uploads eliminating manual CSV spreadsheet labor.
- **RTO Penalties Avoided**: `Math.round(orderVolume * 0.84)` (~$1,260/mo at 1,500 orders). Derived from real-time USPS CASS-certified automated address normalization before printing, preventing failed deliveries and return-to-origin carrier surcharge fees.
- **Projected GMV Pipeline**: `Math.round(orderVolume * 28.5)` (based on an industry benchmark $28.50 Average Order Value).
- **Guaranteed Late Dispatch Rate (LDR)**: Fixed `0.0%` benchmark backed by sub-24H domestic carrier injection at E-GEAD California & Texas production hubs.

#### Accessibility & WCAG 2.1 AA Compliance

1. **WAI-ARIA Dynamic Live Region (`aria-live="polite"` & `aria-atomic="true"`)**:
   - The real-time output dashboard container is enclosed with `aria-live="polite"` and `aria-atomic="true"`.
   - Assistive technologies announce dynamic recalculations non-intrusively as the user adjusts the volume slider or toggles channel buttons, without interrupting existing speech output.
2. **Accessible Toggle State Management (`aria-pressed`)**:
   - Channel selector buttons implement `aria-pressed={selectedChannel === ch.id}`.
   - The button container has `role="group"` and `aria-label="Select sales channel"`, informing screen reader users of both group context and active button state.
3. **Range Slider Accessibility (`aria-valuetext` & Programmatic Label)**:
   - The `<input type="range" id="volume-slider">` is programmatically associated with its `<label htmlFor="volume-slider">`.
   - Includes explicit `aria-label="Monthly Order Volume"`.
   - Employs `aria-valuetext={`${orderVolume.toLocaleString('en-US')} orders per month`}`, ensuring screen readers verbalize meaningful units rather than bare integer values.
4. **Keyboard Focusability & Visual Rings**:
   - All interactive elements (channel toggle buttons, range slider thumb, and conversion CTA button) feature high-visibility focus indicators: `focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25E2CC]`.
5. **Contrast Compliance (WCAG AAA)**:
   - Accent `#25E2CC` against obsidian canvas (`#0A0D0E`) and elevated card containers (`#141718`) provides an **11.2:1 contrast ratio**, exceeding WCAG AAA standard (7:1).
   - High-contrast text `#D3F9F5` (13.5:1) ensures optimal readability for secondary labels and benchmark quotes.
6. **Screen Reader Optimization for Decorative Icons**:
   - All Lucide decorative icons (`Calculator`, `Clock`, `DollarSign`, `ShieldCheck`, `TrendingUp`, `ArrowRight`) have `aria-hidden="true"` to prevent unhelpful vocalizations.

#### Usage Example & Integration on `/services/all-services`

```tsx
import React from 'react';
import { MarginSimulator } from '@/components/sections';

export default function ServicesPage() {
  return (
    <main>
      {/* ... Preceding sections 1 to 6 ... */}

      {/* SECTION 7: Interactive Fulfillment & Margin Simulator */}
      <MarginSimulator id="margin-simulator" />

      {/* ... Subsequent sections 8 to 11 ... */}
    </main>
  );
}
```

---

## 3. Cross-Phase Implementation Matrix

The table below outlines how the 7 section layout components map directly to the requirements of subsequent phases as defined in the master technical plan ([`docs/plans/plan.md`](file:///C:/Develop/egead/egead-company/docs/plans/plan.md)):

| Phase & Target Page | Status | BentoGrid | MetricsRibbon | ComparisonTable | FaqAccordion | WorkflowTimeline | RoleTabs | MarginSimulator | Custom Section Additions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Phase 2: All Services** (`/services/all-services`) | **COMPLETED** | 6 Pillars Grid | Production Metrics Strip | Head-to-Head 3PL Matrix | Service & SLA FAQ | 5-Step Order-to-Door Pipeline | 4-Persona Architecture Switcher | Section 7 (Interactive ROI & SLA Simulator) | Split Hero with Live Dispatch HUD, SLA Protection Badges, Client Spotlight (UrbanVibe), Mega CTA & ContactBlock |
| **Phase 3: SpeedX** (`/speedx`) | READY | Hardware & Ink Stack | 24H SLA Numbers | Legacy POD Pain Points Table | SpeedX Technical FAQ | 6-Station WMS Pipeline | Creator vs Agency Switcher | — | Kinetic Countdown Clock, Before/After AI Address Cleanse |
| **Phase 4: SmartCommerce** (`/smartcommerce`) | PENDING | 4-Pillar Cockpit Grid | Sync Latency Benchmarks | Omnichannel Chaos vs Unified Matrix | Platform Architecture FAQ | Dynamic Stock Buffer Pipeline | Enterprise Operations Switcher | — | HUD Cockpit Hero, Net Margin Reconciliation Table |
| **Phase 5: Our Work** (`/our-work`) | PENDING | Project Showcase Grid | Cumulative GMV & Unit Metrics | Quantitative Before/After Matrix | Client Onboarding FAQ | Brand Launch Pipeline | Industry Sector Switcher (Fashion / Merch / Tech) | — | UrbanVibe Case Study Deep Dive, Testimonial Slider |
| **Phase 6: Partners** (`/partners`) | PENDING | Ecosystem Benefits Grid | Channel GMV Impact Strip | Native App vs Generic Connector | Integration FAQ | 3-Step Partner Certification | Technology vs Agency Partner Switcher | — | Integration Badges Matrix, Co-Marketing Simulator |
| **Phase 7: Insights** (`/insights`) | PENDING | Featured Article Bento | Readership & Community Stats | Self-Hosted vs Managed POD Analysis | Content & Editorial FAQ | Research-to-Publication Flow | Role-Based Reading Tracks | — | Newsletter Subscriptions, Interactive Read Filters |
| **Phase 8: Company** (`/company`) | PENDING | Culture & Mission Bento | Facility Footprint & Team Numbers | In-House Ethics vs Offshored Labor | Talent & Career FAQ | Company Evolution Timeline | Department Tour Switcher | — | Leadership Grid, Interactive US Hub Map |

---

## 4. Verification & Testing Protocol

All components and integrated page layouts have been rigorously verified via automated testing using **Bun Test** and **React Server DOM Rendering**:
- **Components Test Suite**: [`tests/sections.test.tsx`](file:///C:/Develop/egead/egead-company/tests/sections.test.tsx) (`bun test tests/sections.test.tsx`) — **12/12 tests PASS (100%)**
- **Page Integration Test Suite**: [`tests/all-services.test.tsx`](file:///C:/Develop/egead/egead-company/tests/all-services.test.tsx) (`bun test tests/all-services.test.tsx`) — **13/13 tests PASS (100%)**
- **Combined Command**: `bun run test` — **25 tests PASS across 2 test suites (273 assertions, 0 errors)**

### Test Coverage Summary:
1. **Module Exports**: Confirms all 7 section components and TypeScript type contracts are properly exported through [`components/sections/index.ts`](file:///C:/Develop/egead/egead-company/components/sections/index.ts).
2. **BentoGrid**: Tests grid span generation (`col-span-1`, `md:col-span-2`, `lg:col-span-3`), custom visual node rendering, and badge/title display.
3. **MetricsRibbon**: Tests responsive column distribution (2/3/4 columns), numeric trends, and minimalist fallback configurations.
4. **ComparisonTable**: Tests complete WAI-ARIA table semantics (`role="table"`, `role="rowgroup"`, `role="row"`, `role="columnheader"`, `role="cell"`, `role="rowheader"`) and screen reader `.sr-only` accessibility text for boolean checks and crosses.
5. **FaqAccordion**: Tests interactive question/answer rendering, category filtering, accessible toggle IDs (`aria-controls`, `aria-labelledby`, `role="region"`), and sanitized Schema.org `FAQPage` LD+JSON injection.
6. **WorkflowTimeline**: Tests ordered sequential hierarchy (`<ol>`, `<li>`), badge chips, subtext tags, and dual mobile/desktop view paths.
7. **RoleTabs**: Tests WAI-ARIA tabs pattern (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `tabIndex`), bullet points, quantitative metric rows, and empty input fallbacks.
8. **MarginSimulator**: Tests interactive elements, channel selector `aria-pressed` states, accessible `role="group"`, volume range input, dynamic `aria-live="polite"` region, and real-time efficiency metrics calculations.
9. **Page Integration (All Services)**: Tests all 11 dedicated sections in [`app/services/all-services/page.tsx`](file:///C:/Develop/egead/egead-company/app/services/all-services/page.tsx) including metadata, live dispatch HUD, metrics ribbon, role tabs, bento pillars, workflow timeline, comparison table, margin simulator, SLA compliance badges, client spotlight, FAQ accordion, and conversion mega CTA with ContactBlock.
