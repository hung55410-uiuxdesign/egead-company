# UI Layout Components Reference Catalog & Accessibility Guide (Phases 1 - 6)

> **Document Version**: 1.5.0  
> **Status**: Production Ready (Phases 1 - 6 Complete)  
> **Target Audience**: Frontend Engineers, UX/UI Designers, Solution Architects  
> **Scope**: Standardized Layout Sections for E-GEAD Company 2026 Portal ([`components/sections`](file:///C:/Develop/egead/egead-company/components/sections/index.ts))  
> **WCAG Target**: WCAG 2.1 Level AA Compliant

---

## 1. Executive Summary & Design System Standards

During **Phase 1**, six modular, responsive, and accessible UI layout section components were engineered under [`components/sections/`](file:///C:/Develop/egead/egead-company/components/sections/index.ts).

During **Phase 2**, the first complete page overhaul was executed for [Phase 2: All Services (`app/services/all-services/page.tsx`)](file:///C:/Develop/egead/egead-company/app/services/all-services/page.tsx), introducing the [`MarginSimulator.tsx`](file:///C:/Develop/egead/egead-company/components/sections/MarginSimulator.tsx) operational efficiency component.

During **Phase 3**, the comprehensive page overhaul for [Phase 3: SpeedX (`app/speedx/page.tsx`)](file:///C:/Develop/egead/egead-company/app/speedx/page.tsx) was delivered, engineering four specialized interactive section components:
- [`AddressDemo.tsx`](file:///C:/Develop/egead/egead-company/components/sections/AddressDemo.tsx): Interactive raw vs USPS CASS normalized delivery points demonstration with sub-35ms AI risk scoring.
- [`PricingCalculator.tsx`](file:///C:/Develop/egead/egead-company/components/sections/PricingCalculator.tsx): Transparent $6 all-in unit economics calculator with live net margin projection and negative loss styling.
- [`ApiTerminal.tsx`](file:///C:/Develop/egead/egead-company/components/sections/ApiTerminal.tsx): Dark developer terminal with tabbed endpoints (dispatch, webhook, inventory) and safe clipboard interaction.
- [`LiveCountdownCard.tsx`](file:///C:/Develop/egead/egead-company/components/sections/LiveCountdownCard.tsx): Real-time 24H SLA production countdown clock with milestone timestamps, semantic `<time>` tag, and motion-reduction guard.

During **Phase 4**, the enterprise platform page overhaul for [Phase 4: SmartCommerce (`app/smartcommerce/page.tsx`)](file:///C:/Develop/egead/egead-company/app/smartcommerce/page.tsx) was delivered, engineering four specialized interactive section components:
- [`CockpitHudCard.tsx`](file:///C:/Develop/egead/egead-company/components/sections/CockpitHudCard.tsx): Real-time operations cockpit HUD with live multi-channel stream ingestion (TikTok Shop US, Amazon FBM, Shopify Plus DTC, Etsy Global), throughput counter, sub-second sync latency, and `motion-reduce:animate-none`.
- [`InventoryBufferEngine.tsx`](file:///C:/Develop/egead/egead-company/components/sections/InventoryBufferEngine.tsx): Interactive multi-channel inventory buffer allocation simulator with physical blank range slider (500 - 10,000 units), 10/15/20% safety holdback options, dynamic channel distribution (Amazon 40%, TikTok Shop 40%, Etsy 20%), and zero-overselling guarantee status with polite live regions.
- [`NetMarginLedger.tsx`](file:///C:/Develop/egead/egead-company/components/sections/NetMarginLedger.tsx): Interactive financial reconciliation ledger table with selectable sample orders, cost deductions breakdown (Gross Payment, Print Cost, Postage, Channel Fee, Ad CPA, True Net Profit & Net Margin %), simulated CSV/QuickBooks export, and WAI-ARIA table semantics.
- [`BusinessRulesBuilder.tsx`](file:///C:/Develop/egead/egead-company/components/sections/BusinessRulesBuilder.tsx): Visual If-This-Then-That automation workflow builder with accessible switch toggles (`role="switch"`, `aria-checked`), keyboard-selectable rule cards (`role="button"`, `tabIndex={0}`), condition evaluator, and proven business ROI metrics.

During **Phase 5**, the case studies & client transformation page overhaul for [Phase 5: Our Work (`app/our-work/page.tsx`)](file:///C:/Develop/egead/egead-company/app/our-work/page.tsx) was delivered, engineering four specialized interactive section components:
- [`EfficiencyVisualizer.tsx`](file:///C:/Develop/egead/egead-company/components/sections/EfficiencyVisualizer.tsx): Interactive operational scale simulator with volume range slider (500 to 25,000 orders/mo), 1K/4K/10K/20K presets, automated headcount calculation (Ops FTEs avoidance), net annual cost savings, reclaimed founder hours (~4.2 mins/order), and dual polite ARIA live regions.
- [`TransformationMatrix.tsx`](file:///C:/Develop/egead/egead-company/components/sections/TransformationMatrix.tsx): Empirical Before-vs-After comparison table with WAI-ARIA table semantics (`role="table"`, `<th scope="col">`), 4 category filters (SLA & Logistics, Labor & Ops, ROAS & Scale, All Indicators), delta metrics (`-95.5% LDR`, `-93.5% CSV Hours`, `-86.8% RTO`, `+128.6% ROAS`), and active filter live regions.
- [`CaseStudiesPortfolio.tsx`](file:///C:/Develop/egead/egead-company/components/sections/CaseStudiesPortfolio.tsx): Comprehensive portfolio showcase featuring an interactive category filter bar (`role="tablist"`), flagship deep dive into UrbanVibe Apparel (100% sub-24h dispatch, 0.18% LDR, +180% Q4 growth), and a responsive 6-brand portfolio grid with Next.js optimized `<Image>` components, verified SLA tags, and metric chips.
- [`PlaybookDownloads.tsx`](file:///C:/Develop/egead/egead-company/components/sections/PlaybookDownloads.tsx): Executive knowledge base component with 3 downloadable strategy resources (TikTok Shop US SLA Survival Guide, Omnichannel Inventory & Safety Buffer Blueprint, Unit Economics & True Net Margin Master Sheet), simulated download feedback states (1.2s timeout), and polite ARIA announcement regions.

During **Phase 6**, the strategic partners & global commerce ecosystem page overhaul for [Phase 6: Partners (`app/partners/page.tsx`)](file:///C:/Develop/egead/egead-company/app/partners/page.tsx) was delivered, engineering three specialized section components:
- [`EcosystemMatrix.tsx`](file:///C:/Develop/egead/egead-company/components/sections/EcosystemMatrix.tsx): Interactive 5-tier categorized alliance hub (Marketplaces, Storefront Platforms, Ad & Growth Networks, Logistics Carriers, Payment Rails) with 17 certified partners, WAI-ARIA tablist navigation (`role="tablist"`, `role="tab"`), dynamic partner count badges, and screen reader polite live regions.
- [`IntegrationBridgeVisualizer.tsx`](file:///C:/Develop/egead/egead-company/components/sections/IntegrationBridgeVisualizer.tsx): Interactive 4-stage programmatic integration pipeline diagram (Input Rails, Security Gateway, Execution Core, Carrier Dispatch) with clickable telemetry JSON inspector, safe clipboard copy execution, and WAI-ARIA tabpanel semantics.
- [`EcosystemHeroGraphic.tsx`](file:///C:/Develop/egead/egead-company/components/sections/EcosystemHeroGraphic.tsx): High-performance Server Component displaying a global commerce mesh topology with active telemetry nodes for TikTok Shop US, Amazon SP-API, Shopify Plus, USPS Network, Meta CAPI, and Stripe.

These components serve as the foundational layout building blocks for subsequent page overhauls across Phase 7 through Phase 8:
- [Phase 2: All Services (`app/services/all-services/page.tsx`)](file:///C:/Develop/egead/egead-company/app/services/all-services/page.tsx) — **COMPLETED (11/11 Sections Integrated)**
- [Phase 3: SpeedX (`app/speedx/page.tsx`)](file:///C:/Develop/egead/egead-company/app/speedx/page.tsx) — **COMPLETED (12/12 Sections Integrated)**
- [Phase 4: SmartCommerce (`app/smartcommerce/page.tsx`)](file:///C:/Develop/egead/egead-company/app/smartcommerce/page.tsx) — **COMPLETED (11/11 Sections Integrated)**
- [Phase 5: Our Work (`app/our-work/page.tsx`)](file:///C:/Develop/egead/egead-company/app/our-work/page.tsx) — **COMPLETED (10/10 Sections Integrated)**
- [Phase 6: Partners (`app/partners/page.tsx`)](file:///C:/Develop/egead/egead-company/app/partners/page.tsx) — **COMPLETED (9/9 Sections Integrated)**
- [Phase 7: Insights (`app/insights/page.tsx`)](file:///C:/Develop/egead/egead-company/app/insights/page.tsx)
- [Phase 8: Company (`app/company/page.tsx`)](file:///C:/Develop/egead/egead-company/app/company/page.tsx)

### Design System Tokens & Color Palette

| Token / Role | Hex / Value | Semantic Use | Contrast on Dark (`#0A0D0E`) |
| :--- | :--- | :--- | :--- |
| **Primary Background** | `#0A0D0E` | Deep obsidian canvas | N/A (Base) |
| **Card / Surface BG** | `#141718` | Elevated container backdrop (90% opacity + blur) | ~ 1.2:1 (Subtle border separation) |
| **Pill / Icon BG** | `#1D2224` | Nested badge, icon wrapper, elevated state | ~ 1.5:1 |
| **Border / Divider** | `#262C30` | Structural card borders and dividing rules | ~ 2.0:1 |
| **Primary Accent (Cyan)** | `#10E774` | Interactive highlights, active states, key metrics | **11.2:1 (AAA Pass)** |
| **Cyan Light (Text/Tint)** | `#D4FAE6` | Secondary labels, high-legibility body snippets | **13.5:1 (AAA Pass)** |
| **Muted Text / Paragraph** | `#8C8C8C` | Supporting descriptive copy, metadata | **4.7:1 (AA Normal Pass)** |
| **Headings Font** | `Rubik`, sans-serif | Bold geometric headers (`h2`, `h3`), large numbers | High legibility |
| **Body & UI Font** | `Montserrat`, sans-serif | Badges, buttons, descriptions, table items | Highly readable at small scales |

---

## 2. Component Catalog & Detailed Specifications

```
components/sections/
├── BentoGrid.tsx                  # Asymmetric feature grid (1/2/3 col span, row span)
├── MetricsRibbon.tsx              # High-impact metric banner (2/3/4 column responsive)
├── ComparisonTable.tsx            # Head-to-head feature matrix (Accessible Table/Card)
├── FaqAccordion.tsx               # Collapsible Q&A with Schema.org JSON-LD FAQPage
├── WorkflowTimeline.tsx           # Sequential step pipeline with glowing line & ol/li
├── RoleTabs.tsx                   # WAI-ARIA role/persona tab switcher with metrics & CTA
├── MarginSimulator.tsx            # Interactive ROI, margin & SLA efficiency simulator
├── AddressDemo.tsx                # Interactive raw vs USPS CASS normalized delivery points demo
├── PricingCalculator.tsx          # Transparent per-unit base pricing & live net margin calculator
├── ApiTerminal.tsx                # Tabbed dark developer terminal (REST dispatch, webhooks, inventory)
├── LiveCountdownCard.tsx          # Real-time 24H SLA production countdown clock & milestones
├── CockpitHudCard.tsx             # Real-time operations cockpit HUD with multi-channel telemetry
├── InventoryBufferEngine.tsx      # Multi-channel dynamic safety buffer allocation simulator
├── NetMarginLedger.tsx            # Automated net margin reconciliation ledger table
├── BusinessRulesBuilder.tsx       # Visual If-This-Then-That automation workflow builder
├── EfficiencyVisualizer.tsx       # Interactive headcount avoidance & net savings simulator
├── TransformationMatrix.tsx       # Quantitative before-vs-after empirical transformation matrix
├── CaseStudiesPortfolio.tsx       # Interactive filter bar, UrbanVibe deep dive & 6-brand portfolio
├── PlaybookDownloads.tsx          # Executive strategy guides & SOP downloads with live feedback
├── EcosystemMatrix.tsx            # Interactive 5-tier categorized alliance hub & partner cards
├── IntegrationBridgeVisualizer.tsx # 4-stage programmatic integration architecture & telemetry
├── EcosystemHeroGraphic.tsx       # Global commerce mesh topology visual with real-time status
└── index.ts                       # Barrel export for components and TypeScript types
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
  AddressDemo,
  PricingCalculator,
  ApiTerminal,
  LiveCountdownCard,
  CockpitHudCard,
  InventoryBufferEngine,
  NetMarginLedger,
  BusinessRulesBuilder,
  EfficiencyVisualizer,
  TransformationMatrix,
  CaseStudiesPortfolio,
  PlaybookDownloads,
  EcosystemMatrix,
  IntegrationBridgeVisualizer,
  EcosystemHeroGraphic,
} from '@/components/sections';
import type {
  BentoItem,
  MetricItem,
  ComparisonRow,
  FaqItem,
  WorkflowStep,
  RoleTabItem,
  MarginSimulatorProps,
  AddressDemoProps,
  PricingCalculatorProps,
  ApiTerminalProps,
  LiveCountdownCardProps,
  CockpitHudCardProps,
  InventoryBufferEngineProps,
  NetMarginLedgerProps,
  BusinessRulesBuilderProps,
  EfficiencyVisualizerProps,
  TransformationMatrixProps,
  TransformationMetric,
  CaseStudiesPortfolioProps,
  CaseStudyItem,
  PlaybookDownloadsProps,
  PlaybookResource,
  EcosystemMatrixProps,
  EcosystemPartner,
  IntegrationBridgeVisualizerProps,
  BridgeStage,
  EcosystemHeroGraphicProps,
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
4. **Contrast**: Highlighted cards use `#10E774` borders and text over `#141718` background (exceeds 10:1 ratio).

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
      title={<>Engineered for <span className="text-[#10E774]">Sub-24H Scale</span></>}
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
2. **Text Legibility**: Large quantitative values utilize font `Rubik` with high contrast `#FFFFFF` and hover `#10E774`, accompanied by high-contrast secondary labels (`#D4FAE6`).
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
      title={<>Why Top Sellers Migrate to <span className="text-[#10E774]">E-GEAD</span></>}
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
   - Full keyboard focusability with visible ring: `focus-visible:ring-2 focus-visible:ring-[#10E774] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D0E]`.
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
      title={<>Frequently Asked <span className="text-[#10E774]">Questions</span></>}
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
3. **High Contrast Step Indicators**: Step circles feature `#10E774` borders and high-visibility `#FFFFFF` labels with dark obsidian backdrops.
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
      title={<>How Your Order Moves in <span className="text-[#10E774]">Under 24 Hours</span></>}
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
   - Active tab uses `#10E774` background with black text (`#000000`) for maximum contrast (11.2:1).
   - Inactive tabs feature clear border contrast (`#262C30`) and hover states.
   - Focus styling includes `focus-visible:ring-2 focus-visible:ring-[#10E774] focus-visible:ring-offset-2`.
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
      title={<>Architected for <span className="text-[#10E774]">Your Business Scale</span></>}
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
   - All interactive elements (channel toggle buttons, range slider thumb, and conversion CTA button) feature high-visibility focus indicators: `focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]`.
5. **Contrast Compliance (WCAG AAA)**:
   - Accent `#10E774` against obsidian canvas (`#0A0D0E`) and elevated card containers (`#141718`) provides an **11.2:1 contrast ratio**, exceeding WCAG AAA standard (7:1).
   - High-contrast text `#D4FAE6` (13.5:1) ensures optimal readability for secondary labels and benchmark quotes.
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

### 2.8 AddressDemo

- **Source Code**: [`components/sections/AddressDemo.tsx`](file:///C:/Develop/egead/egead-company/components/sections/AddressDemo.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Interactive address comparison demo showing raw marketplace payloads vs USPS CASS normalized delivery points, RTO risk scoring, test cases selector, and polite ARIA live regions.
- **Page Integration**: Serves as **Section 4** on [SpeedX (`app/speedx/page.tsx`)](file:///C:/Develop/egead/egead-company/app/speedx/page.tsx) (`<AddressDemo id="ai-address-normalization" />`).

#### TypeScript Interface

```typescript
export interface AddressDemoProps {
  id?: string;
  className?: string;
}
```

#### State & Comparison Mechanics

- `selectedCaseId: string` (`useState<string>('missing-zip')`): Interactive scenario switcher providing 3 real-world e-commerce test cases:
  1. **Incomplete Zip & Abbreviation**: `jhn smth`, `apt 4b 125 n main st`, `new york, ny 1000` (92% RTO Risk) → Sanitized to `John Smith`, `125 N Main St Apt 4B`, `New York, NY 10001-2834`, Carrier Route `C012`, USPS DPV Confirmed Delivery Point, 0.1% Safe Risk.
  2. **Typo in Street & City**: `emily rodriguz`, `742 evergreen terrce`, `spriengfield, oregon 97477` (84% RTO Risk) → Sanitized to `Emily Rodriguez`, `742 Evergreen Ter`, `Springfield, OR 97477-5246`, Carrier Route `R004`, USPS CASS Standardized & Corrected, 0.2% Safe Risk.
  3. **Missing Suite / Unit Number**: `marcus vance`, `1600 amphitheatre pkwy bldg 43`, `mountain view, ca 94043` (76% RTO Risk) → Sanitized to `Marcus Vance`, `1600 Amphitheatre Pkwy Bldg 43`, `Mountain View, CA 94043-1351`, Carrier Route `C031`, USPS Commercial Drop Point Validated, 0.1% Safe Risk.

#### Accessibility & WCAG 2.1 AA Compliance

1. **Polite ARIA Live Region (`aria-live="polite"` & `aria-atomic="true"`)**:
   - The AI sanitized output card container is equipped with `aria-live="polite"` and `aria-atomic="true"`.
   - When users toggle between test scenarios, assistive technologies gracefully announce the normalized fields without interrupting active voice synthesis.
2. **Accessible Scenario Button Group (`role="group"` & `aria-pressed`)**:
   - Case switcher pills are contained in `<div role="group" aria-label="Select address test scenario">`.
   - Buttons implement dynamic `aria-pressed={isActive}`, providing clear active state announcement to screen reader users.
3. **Keyboard Focusability & Visual Rings**:
   - Buttons utilize visible focus indicators: `focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]`.
4. **Color Contrast & Semantic Alert Badging**:
   - Hazardous input card features high-visibility red contrast styling (`text-red-400`, `border-red-500/30`, `bg-[#101416]`) paired with `AlertTriangle`.
   - Verified output card uses signature cyan `#10E774` (11.2:1 contrast ratio) and emerald accents (`text-emerald-400`).
5. **Decorative Icon Hiding**:
   - Icons (`Sparkles`, `CheckCircle2`, `AlertTriangle`, `ShieldCheck`) include `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { AddressDemo } from '@/components/sections';

export default function AddressValidationSection() {
  return <AddressDemo id="ai-address-normalization" />;
}
```

---

### 2.9 PricingCalculator

- **Source Code**: [`components/sections/PricingCalculator.tsx`](file:///C:/Develop/egead/egead-company/components/sections/PricingCalculator.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Interactive per-unit margin calculator with base blanks pricing, marketplace fee calculation, shipping rates, and live net margin projection with negative loss styling.
- **Page Integration**: Serves as **Section 7** on [SpeedX (`app/speedx/page.tsx`)](file:///C:/Develop/egead/egead-company/app/speedx/page.tsx) (`<PricingCalculator id="pricing-calculator" />`).

#### TypeScript Interface

```typescript
export interface PricingCalculatorProps {
  id?: string;
  className?: string;
}
```

#### State & Mathematical Calculation Model

- `selectedTierId: string` (`useState<string>('tee')`): Selection among 3 production garment tiers:
  - `Classic Streetwear Tee (Gildan 5000)`: Base cost $6.00, default retail $24.99 (5.3 oz, 23-inch DTF).
  - `Vintage Washed Tee (Comfort Colors 1717)`: Base cost $9.50, default retail $32.00 (Ringspun garment-dyed 6.1 oz).
  - `Heavy Blend Fleece Hoodie (Gildan 18500)`: Base cost $14.50, default retail $48.00 (Warm 8.0 oz poly-fleece).
- `retailPrice: number` (`useState<number>(activeTier.defaultRetail)`): Range slider ($15.00 to $65.00, step $0.50).
- **Formulas**:
  - `platformFee = Math.round(retailPrice * 0.06 * 100) / 100` (6% average marketplace commission fee)
  - `shippingEst = 4.50` (USPS Ground Advantage domestic baseline)
  - `totalLandedCost = activeTier.baseCost + platformFee + shippingEst`
  - `netProfit = Math.round((retailPrice - totalLandedCost) * 100) / 100`
  - `marginPercent = retailPrice > 0 ? Math.round((netProfit / retailPrice) * 100) : 0`
  - `monthlyProfitAt1000 = netProfit * 1000`

#### Dynamic Negative Loss Alert Styling

- When `netProfit < 0` (retail selling price set below total landed cost):
  - Label dynamically changes from `"Your Net Profit Per Garment:"` to `"Net Loss Per Garment:"` with `text-red-400`.
  - Negative value is formatted as `-$X.XX` with large `font-rubik text-red-400`.
  - Net Margin badge switches from cyan `bg-[#10E774]/15 text-[#10E774]` to warning `bg-red-500/15 text-red-400`.
  - Monthly projection card displays `"Estimated Net Loss"` in red, providing sellers with an unambiguous safeguard against underpriced listings.

#### Accessibility & WCAG 2.1 AA Compliance

1. **Dynamic ARIA Live Region (`aria-live="polite"` & `aria-atomic="true"`)**:
   - Encloses the live P&L analysis card, announcing recalculations when either garment tier or retail price slider changes.
2. **Accessible Garment Tier Group (`role="group"` & `aria-pressed`)**:
   - Garment tier cards container features `role="group"` and `aria-label="Select Garment Blank"`.
   - Tier selection buttons include `aria-pressed={selectedTierId === tier.id}`.
3. **Range Slider Accessibility**:
   - Linked to `<label htmlFor="retail-slider">`, explicitly labeled via `aria-label="Retail Selling Price"`, and outputs formatted currency units through `aria-valuetext={`$${retailPrice.toFixed(2)} retail price`}`.
4. **Keyboard Focusability & Ring Styling**:
   - Interactive buttons, slider thumb, and CTA link include `focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]`.
5. **Decorative Icons**: All icons (`DollarSign`, `ArrowRight`, `Percent`, `Check`) use `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { PricingCalculator } from '@/components/sections';

export default function UnitEconomicsSection() {
  return <PricingCalculator id="pricing-calculator" />;
}
```

---

### 2.10 ApiTerminal

- **Source Code**: [`components/sections/ApiTerminal.tsx`](file:///C:/Develop/egead/egead-company/components/sections/ApiTerminal.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Tabbed dark developer terminal demonstrating RESTful dispatch, event-driven webhooks, and real-time inventory queries with safe clipboard execution and WAI-ARIA tab pattern.
- **Page Integration**: Serves as **Section 10** on [SpeedX (`app/speedx/page.tsx`)](file:///C:/Develop/egead/egead-company/app/speedx/page.tsx) (`<ApiTerminal id="api-terminal" />`).

#### TypeScript Interface

```typescript
export interface ApiTerminalProps {
  id?: string;
  className?: string;
}
```

#### Endpoints & Architectural Payloads

1. **`POST /v1/orders/dispatch`** (Latency: `85ms`): Ingests TikTok Shop US and Shopify orders with routing rules, USPS normalized customer address, SKU, blank specifications, artwork URL, and 23-inch DTF print method. Output returns production hub assignment, SLA deadline, and unit cost.
2. **`EVENT webhook: order.in_transit`** (Latency: `Real-Time`): Granular event-driven webhook broadcast upon carrier physical handoff, containing tracking number, origin scan timestamp, turnaround hours (e.g. 16.2h), and `tiktok_shop_ldr_compliant: true`.
3. **`GET /v1/inventory/blanks`** (Latency: `42ms`): Real-time curl query for blanks availability across US East and US West facilities with facility-level stock counters and daily capacity limits.

#### Accessibility & WCAG 2.1 AA Compliance

1. **WAI-ARIA Tablist Pattern**:
   - Parent tab container uses `role="tablist"` with `aria-label="API Endpoint Selector"`.
   - Each endpoint button renders with `role="tab"`, unique `id={`api-tab-${ep.id}`}`, `aria-selected={isActive}`, and `aria-controls="api-terminal-panel"`.
   - Active code panel is marked with `id="api-terminal-panel"`, `role="tabpanel"`, and `aria-labelledby={`api-tab-${activeEndpoint.id}`}`.
2. **Safe Clipboard Execution**:
   - `handleCopy` checks for `typeof navigator !== 'undefined' && navigator?.clipboard?.writeText` inside a safe `try/catch` wrapper to prevent runtime exceptions in restricted iframes or non-HTTPS contexts.
   - Screen reader users receive feedback via dynamic accessible label `"Copied!"` along with visual check icon for 2000ms.
   - Copy button features explicit `aria-label="Copy code sample to clipboard"`.
3. **Code Contrast & Semantic Tags**:
   - Code blocks render inside semantic `<pre>` and `<code>` elements with text color `#D4FAE6` (13.5:1 contrast) and emerald responses (`text-emerald-300`).
4. **Decorative Window Controls & Icons**:
   - Window dots and icons (`Code2`, `Copy`, `Check`, `Zap`) carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { ApiTerminal } from '@/components/sections';

export default function DeveloperArchitectureSection() {
  return <ApiTerminal id="api-terminal" />;
}
```

---

### 2.11 LiveCountdownCard

- **Source Code**: [`components/sections/LiveCountdownCard.tsx`](file:///C:/Develop/egead/egead-company/components/sections/LiveCountdownCard.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Real-time 24H SLA production countdown clock with milestone timestamps, motion-reduction support (`motion-reduce:animate-none`), semantic `<time>` tag, and TikTok Shop compliance badge.
- **Page Integration**: Serves as the interactive floating widget in **Section 1 (Hero)** on [SpeedX (`app/speedx/page.tsx`)](file:///C:/Develop/egead/egead-company/app/speedx/page.tsx).

#### TypeScript Interface

```typescript
export interface LiveCountdownCardProps {
  className?: string;
}
```

#### State & Dynamic Clock Mechanics

- `secondsRemaining: number` (`useState<number>(23 * 3600 + 58 * 60 + 42)`): Simulated real-time 1-second interval timer. Automatically resets if reaching zero.
- Formatted as zero-padded two-digit strings for `hours`, `minutes`, and `seconds` (`HH:MM:SS`).
- **Production Milestone Pipeline**:
  - `08:00 AM • Order Ingestion` (Webhook Pull)
  - `11:30 AM • 23" DTF Printed` (Roll Cured)
  - `03:45 PM • Carrier Physical Scan` (USPS / UPS Carrier Hand-Off)
- **Compliance Badge**: Highlights active TikTok Shop US Compliance with verified `LDR: 0.18%` status.

#### Accessibility & WCAG 2.1 AA Compliance

1. **Motion Reduction Guard (`motion-reduce:animate-none`)**:
   - The spinning clock icon uses `animate-spin motion-reduce:animate-none`.
   - Users with vestibular disorders or who configured `prefers-reduced-motion: reduce` in their operating system experience zero distracting or disorienting spinning animations.
2. **Semantic `<time>` Element**:
   - The countdown timer uses semantic `<time dateTime={`PT${hours}H${minutes}M${seconds}S`} aria-label={`${hours} hours, ${minutes} minutes, and ${seconds} seconds remaining`}>`.
   - Conveys ISO 8601 machine-readable duration and announces fully expanded, human-comprehensible time strings to screen readers.
3. **High Contrast Display**:
   - Digits utilize font `mono` with glowing `#10E774` (11.2:1 contrast ratio against obsidian dark container `#0A0D0E`).
4. **Decorative Icons**:
   - Icons (`Clock`, `CheckCircle2`, `ShieldCheck`, `Zap`) carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { LiveCountdownCard } from '@/components/sections';

export default function HeroVisual() {
  return <LiveCountdownCard className="w-full max-w-lg" />;
}
```

---

### 2.12 CockpitHudCard

- **Source Code**: [`components/sections/CockpitHudCard.tsx`](file:///C:/Develop/egead/egead-company/components/sections/CockpitHudCard.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Real-time operations cockpit HUD with live multi-channel stream ingestion (TikTok Shop US, Amazon FBM, Shopify Plus DTC, Etsy Global), dynamic global throughput counter (~1420 orders/hr), sub-second sync latency monitoring, and zero-overselling safety guarantee.
- **Page Integration**: Serves as the interactive centerpiece in **Section 1 (Enterprise Cockpit Hero)** on [SmartCommerce (`app/smartcommerce/page.tsx`)](file:///C:/Develop/egead/egead-company/app/smartcommerce/page.tsx).

#### TypeScript Interface

```typescript
export interface CockpitHudCardProps {
  className?: string;
}
```

#### Channel Streams & Dynamic Telemetry Model

1. **Simulated Real-Time Throughput**: Dynamic interval timer updating `throughput: number` every 2400ms with natural throughput fluctuation around ~1,420 orders/hr.
2. **Channel Stream Ingestion Telemetry**:
   - **TikTok Shop US**: Active status `"Syncing in 0.8s"`, 618 queued orders, 820ms sync latency, brand accent `#10E774`.
   - **Amazon FBM**: Active status `"Automated Ingestion"`, Prime VTR 99.2%, 429 queued orders, 1.1s sync latency, brand accent `#F59E0B`.
   - **Shopify Plus DTC**: Active status `"Real-Time Sync"`, Direct Webhook, 284 queued orders, 340ms sync latency, brand accent `#10B981`.
   - **Etsy Global**: Active status `"Catalog Linked"`, Star Seller Sync, 89 queued orders, 940ms sync latency, brand accent `#EC4899`.
3. **Multi-Channel Mesh Status**: Monospace badge displaying `"Multi-Channel Mesh: Optimal"` and median sync latency of 0.8s ("Zero Desync").

#### Accessibility & WCAG 2.1 AA Compliance

1. **Motion Reduction Support (`motion-reduce:animate-none`)**:
   - The pulsing activity icon, spinning refresh sync indicators, and ping status dot utilize `motion-reduce:animate-none`.
   - Users with vestibular sensitivities or `prefers-reduced-motion` enabled experience completely static, distraction-free monitoring widgets.
2. **Semantic Region Landmark**:
   - Storefront streams container is explicitly designated as `role="region"` with `aria-label="Active Storefront Connections"`.
3. **High Contrast Color System**:
   - Telemetry metrics and numbers use font `mono` with high-contrast text (`#10E774`, `#10B981`, white) exceeding 11:1 contrast on `#0A0D0E` / `#141718` surfaces.
4. **Decorative Graphics**:
   - Icons (`Activity`, `RefreshCw`, `CheckCircle2`) and status color dots carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { CockpitHudCard } from '@/components/sections';

export default function SmartCommerceHeroSection() {
  return <CockpitHudCard className="w-full max-w-lg lg:max-w-none" />;
}
```

---

### 2.13 InventoryBufferEngine

- **Source Code**: [`components/sections/InventoryBufferEngine.tsx`](file:///C:/Develop/egead/egead-company/components/sections/InventoryBufferEngine.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Interactive multi-channel inventory buffer allocation simulator with physical blank range slider, 10/15/20% safety holdback options, dynamic channel distribution, and zero-overselling guarantee status.
- **Page Integration**: Serves as **Section 5** on [SmartCommerce (`app/smartcommerce/page.tsx`)](file:///C:/Develop/egead/egead-company/app/smartcommerce/page.tsx) (`<InventoryBufferEngine id="inventory-buffer-engine" />`).

#### TypeScript Interface

```typescript
export interface InventoryBufferEngineProps {
  id?: string;
  className?: string;
}
```

#### State & Mathematical Calculation Model

- `totalPool: number` (`useState<number>(3000)`): Range slider from 500 to 10,000 units in increments of 250 units (representing physical blanks in US hubs).
- `bufferPercent: number` (`useState<number>(15)`): Interactive selector for safety buffer protection thresholds (10% Aggressive, 15% Balanced, 20% High Protection).
- **Formulas**:
  - `safetyBufferUnits = Math.round((totalPool * bufferPercent) / 100)`: Unlisted safety reserve held back in warehouse.
  - `availableToSell = totalPool - safetyBufferUnits`: Net active stock distributed to connected storefronts.
  - `amazonUnits = Math.round(availableToSell * 0.4)` (40% allocation for Prime-eligible orders).
  - `tiktokUnits = Math.round(availableToSell * 0.4)` (40% allocation for viral sales fast lane).
  - `etsyUnits = availableToSell - amazonUnits - tiktokUnits` (Remaining 20% allocation for organic niche demand).

#### Dynamic Protection Mechanics

- The algorithm ensures that even during massive viral sales spikes on TikTok Shop, the safety buffer retains reserve units locally, throttling downstream channels within 800ms before any out-of-stock cancellation or marketplace penalty occurs.
- Active display badge reinforces `"Overselling Risk: 0.0%"`.

#### Accessibility & WCAG 2.1 AA Compliance

1. **Dynamic ARIA Live Region (`aria-live="polite"` & `aria-atomic="true"`)**:
   - Encloses the live channel allocation matrix container, immediately notifying assistive technologies whenever the user modifies total stock or buffer thresholds.
2. **Accessible Buffer Threshold Group (`role="group"` & `aria-pressed`)**:
   - Container has `role="group"` and `aria-label="Safety Buffer Protection Threshold"`.
   - Each percentage button includes `aria-pressed={bufferPercent === pct}` for screen reader state tracking.
3. **Range Slider Accessibility**:
   - Linked to `<label htmlFor="total-pool-slider">`, explicitly labeled with `aria-label="Physical Blank Inventory in US Hubs"`, `aria-valuemin={500}`, `aria-valuemax={10000}`, `aria-valuenow={totalPool}`, and formatted `aria-valuetext={`${totalPool.toLocaleString()} physical blanks in warehouse`}`.
4. **Keyboard Focus & Contrast**:
   - All interactive controls feature distinct `focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]`.
   - Metric numerals use high-contrast cyan (`#10E774`) and yellow (`#FACC15`) against dark containers.
5. **Decorative Icons**: All icons (`Layers`, `ShieldCheck`, `CheckCircle2`) use `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { InventoryBufferEngine } from '@/components/sections';

export default function InventoryControlSection() {
  return <InventoryBufferEngine id="inventory-buffer-engine" />;
}
```

---

### 2.14 NetMarginLedger

- **Source Code**: [`components/sections/NetMarginLedger.tsx`](file:///C:/Develop/egead/egead-company/components/sections/NetMarginLedger.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Interactive financial reconciliation ledger table with selectable sample orders, full transparent cost deductions breakdown, simulated QuickBooks/CSV export, and WAI-ARIA tablist/table semantics.
- **Page Integration**: Serves as **Section 7** on [SmartCommerce (`app/smartcommerce/page.tsx`)](file:///C:/Develop/egead/egead-company/app/smartcommerce/page.tsx) (`<NetMarginLedger id="financial-ledger" />`).

#### TypeScript Interface

```typescript
export interface NetMarginLedgerProps {
  id?: string;
  className?: string;
}
```

#### Order Data & Financial P&L Model

- `selectedOrderId: string` (`useState<string>('tiktok-1')`): Tab selection across 4 real-world channel orders:
  - `#TK-89214` (**TikTok Shop US**): Gildan 5000 (Black / L) — Gross $29.99, Print $6.00, Postage $4.20, Fee $1.80, Ad CPA $8.50 -> **Net Profit +$9.49 (31.6% Margin)**.
  - `#AZ-44912` (**Amazon FBM**): Comfort Colors 1717 (Pepper / XL) — Gross $34.00, Print $9.50, Postage $4.50, Fee $5.10, Ad CPA $7.20 -> **Net Profit +$7.70 (22.6% Margin)**.
  - `#SP-71028` (**Shopify DTC**): Heavy Blend Hoodie (Navy / 2XL) — Gross $52.00, Print $14.50, Postage $5.80, Fee $1.51, Ad CPA $16.00 -> **Net Profit +$14.19 (27.3% Margin)**.
  - `#ET-19204` (**Etsy Global**): Bella+Canvas 3001 (White / M) — Gross $28.00, Print $6.00, Postage $4.20, Fee $1.82, Ad CPA $4.20 -> **Net Profit +$11.78 (42.1% Margin)**.
- `exported: boolean` (`useState<boolean>(false)`): Simulates a QuickBooks P&L CSV export with a 2.5-second success feedback state.

#### Full Cost Deduction Breakdown Table

| Ledger Component | Operational Category | Verification Channel | Mathematical Impact |
| :--- | :--- | :--- | :--- |
| **Gross Customer Payment** | Storefront Revenue | Captured via Marketplace API | `+$XX.XX` (Positive revenue) |
| **(-) E-GEAD 23" DTF Print & Blank** | Manufacturing Base Rate | Auto-reconciled with WMS | `-$X.XX` (COGS base rate) |
| **(-) US Domestic Postage** | USPS Ground Advantage | Commercial Base Pricing Rate | `-$X.XX` (Postage) |
| **(-) Marketplace Commission Fee** | Channel Referral & Processing | Auto-calculated per category | `-$X.XX` (Platform fee) |
| **(-) Attributed Paid Ads CPA** | Ad Spend Attribution | UTM & Pixel Server Tracking | `-$X.XX` (Acquisition ad spend) |
| **True Clean Net Profit** | **Take-Home Operating Income** | **Settled to Merchant Account** | **`+$XX.XX` (Net Margin %)** |

#### Accessibility & WCAG 2.1 AA Compliance

1. **WAI-ARIA Tablist Pattern**:
   - Order selector uses `role="tablist"` with `aria-label="Select sample order to inspect"`.
   - Each order tab uses `role="tab"`, unique `id={`order-tab-${order.id}`}`, `aria-selected={isActive}`, and `aria-controls="financial-ledger-details"`.
   - The details container features `id="financial-ledger-details"`, `role="tabpanel"`, and `aria-labelledby={`order-tab-${activeOrder.id}`}`.
2. **Polite ARIA Live Region (`aria-live="polite"`)**:
   - The tabpanel dynamically announces updated financial breakdown rows when a user selects a different sample order.
3. **Semantic Table Hierarchy**:
   - Renders with `role="table"`, `<thead role="rowgroup">`, `<tbody role="rowgroup">`, and `<th scope="col">` column headers.
4. **Accessible Export Action**:
   - CSV export button features explicit label transitions: `"Export P&L Ledger (CSV)"` -> `"QuickBooks CSV Exported!"` with green check icon.
5. **Color & Decorative Elements**:
   - Positive profits highlighted in `#10E774` (11.2:1 contrast); negative deductions in `text-red-400` (5.4:1 contrast); icons (`DollarSign`, `Download`, `Check`, `ShieldCheck`) carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { NetMarginLedger } from '@/components/sections';

export default function FinancialReconciliationSection() {
  return <NetMarginLedger id="financial-ledger" />;
}
```

---

### 2.15 BusinessRulesBuilder

- **Source Code**: [`components/sections/BusinessRulesBuilder.tsx`](file:///C:/Develop/egead/egead-company/components/sections/BusinessRulesBuilder.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Visual If-This-Then-That automation workflow builder with accessible switch toggles, keyboard-selectable rule cards, conditional logic evaluator, and proven business ROI metrics.
- **Page Integration**: Serves as **Section 8** on [SmartCommerce (`app/smartcommerce/page.tsx`)](file:///C:/Develop/egead/egead-company/app/smartcommerce/page.tsx) (`<BusinessRulesBuilder id="rules-engine" />`).

#### TypeScript Interface

```typescript
export interface BusinessRulesBuilderProps {
  id?: string;
  className?: string;
}
```

#### Pre-Configured Automation Rules & Logic Model

1. **High-Value VIP Order Acceleration (`rule-vip`)**:
   - Category: Carrier Routing (842 runs/mo).
   - Trigger: `New Order Ingestion`.
   - Condition: `Cart Gross Value > $100.00`.
   - Action: `Auto-upgrade to USPS Priority Mail & insert custom branded unboxing card`.
   - Proven ROI: `+18% Repeat Purchase Rate on TikTok Shop & Shopify`.
2. **Non-Contiguous Surcharge Shield (`rule-remote`)**:
   - Category: Cost Optimization (314 runs/mo).
   - Trigger: `Address Validation Check`.
   - Condition: `State IN (Alaska, Hawaii, Puerto Rico, Guam)`.
   - Action: `Route through regional USPS consolidation hub to bypass $6.50 commercial carrier surcharges`.
   - Proven ROI: `$2,041 Saved in Unexpected Domestic Freight Penalties`.
3. **Automated CASS Address Intercept (`rule-rto`)**:
   - Category: Risk Mitigation (529 runs/mo).
   - Trigger: `USPS DPV Validation Failure`.
   - Condition: `Secondary Unit (Apt/Suite) missing OR Zip mismatch`.
   - Action: `Trigger automated SMS verification link to buyer with 6-hour response window before printing`.
   - Proven ROI: `-84% RTO (Return to Sender) Packages Across US Hubs`.

#### Accessibility & WCAG 2.1 AA Compliance

1. **Accessible Switch Toggles (`role="switch"` & `aria-checked`)**:
   - Each rule toggle button uses `role="switch"`, `aria-checked={rule.active}`, and explicit `aria-label={`Toggle ${rule.title}`}`.
   - Smooth sliding circle indicator (`aria-hidden="true"`) provides immediate visual confirmation alongside color transition.
2. **Accessible Rule Cards (`role="button"` & `tabIndex={0}`)**:
   - Rule list items render with `role="button"`, `tabIndex={0}`, and `aria-pressed={isSelected}`.
   - Fully keyboard operable: `onKeyDown` handles both `Enter` and `Space` (`e.key === 'Enter' || e.key === ' '`) to switch selected rule views without triggering page scroll.
3. **Polite ARIA Live Region (`aria-live="polite"`)**:
   - The visual automation logic panel carries `aria-live="polite"`, announcing updated trigger, condition (IF), and action (THEN) descriptions upon switching rules or toggling status.
4. **Contrast & Semantic Code Formatting**:
   - Conditional evaluation logic renders inside semantic `<code>IF (...)</code>` blocks with amber accent (`text-amber-400`).
   - Active status badges display `"LIVE TRIGGER"` (`text-emerald-400`) or `"DISABLED"` (`text-[#8C8C8C]`).
5. **Decorative Icons**: All icons (`Cpu`, `Check`, `Sparkles`, `Zap`) carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { BusinessRulesBuilder } from '@/components/sections';

export default function AutomationWorkflowsSection() {
  return <BusinessRulesBuilder id="rules-engine" />;
}
```

---

### 2.16 EfficiencyVisualizer

- **Source Code**: [`components/sections/EfficiencyVisualizer.tsx`](file:///C:/Develop/egead/egead-company/components/sections/EfficiencyVisualizer.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Interactive operational efficiency and scale simulator calculating traditional manual fulfillment costs vs E-GEAD automated infrastructure, displaying headcount avoidance (Ops FTEs), net annual savings, and reclaimed founder hours.
- **Page Integration**: Serves as **Section 6** on [Our Work (`app/our-work/page.tsx`)](file:///C:/Develop/egead/egead-company/app/our-work/page.tsx) (`<EfficiencyVisualizer id="efficiency-calculator" initialVolume={4000} />`).

#### TypeScript Interface

```typescript
export interface EfficiencyVisualizerProps {
  id?: string;
  className?: string;
  initialVolume?: number;
}
```

#### State & Financial Mathematical Model

- `volume: number` (`useState<number>(initialVolume)`): Range slider from 500 to 25,000 monthly orders (step 250), with quick-preset pill buttons (1,000, 4,000, 10,000, 20,000).
- `traditionalFteCount = Math.max(1, Math.ceil(volume / 2000))`: 1 full-time ops coordinator required per 2,000 orders.
- `traditionalStaffCost = traditionalFteCount * 3200`: $3,200/month average salary per FTE.
- `traditionalErrorFrictionCost = Math.round(volume * 0.48)`: $0.48/order in manual errors, missed cut-offs, and RTO reshipments.
- `traditionalTotalCost = traditionalStaffCost + traditionalErrorFrictionCost`.
- `egeadCost = Math.round(volume * 0.22)`: $0.22/order flat efficiency cost (0 manual FTEs needed).
- `netMonthlySavings = Math.max(0, traditionalTotalCost - egeadCost)`.
- `netAnnualSavings = netMonthlySavings * 12`.
- `hoursSavedPerMonth = Math.round(volume * 0.042)`: Reclaims ~4.2 minutes per order in manual processing.

#### Accessibility & WCAG 2.1 AA Compliance

1. **Dynamic ARIA Live Regions (`aria-live="polite"` & `aria-atomic="true"`)**:
   - Encloses the live financial results and provides dedicated hidden live regions for assistive technologies announcing recalculated metrics on volume change.
2. **Range Slider Accessibility**:
   - Linked to unique `useId()` label, labeled with `aria-label="Monthly Order Volume"`, `aria-valuemin={500}`, `aria-valuemax={25000}`, `aria-valuenow={volume}`, and `aria-valuetext={`${volume.toLocaleString()} orders per month`}`.
3. **Accessible Preset Group (`role="group"` & `aria-pressed`)**:
   - Preset buttons container features `role="group"` with `aria-label="Select common order volume presets"`.
   - Each preset pill includes `aria-pressed={volume === preset}`.
4. **Keyboard Focus & Contrast**:
   - All interactive controls feature distinct `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]`.
   - Large metrics formatted in high-contrast monospace typography (`#10E774`, `#10B981`, white) exceeding 11:1 contrast on `#141718`.
5. **Decorative Graphics**:
   - Icons (`TrendingUp`, `Clock`, `DollarSign`, `Users`, `Sparkles`, `ArrowRight`) carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { EfficiencyVisualizer } from '@/components/sections';

export default function OperationalScaleSection() {
  return <EfficiencyVisualizer id="efficiency-calculator" initialVolume={4000} />;
}
```

---

### 2.17 TransformationMatrix

- **Source Code**: [`components/sections/TransformationMatrix.tsx`](file:///C:/Develop/egead/egead-company/components/sections/TransformationMatrix.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Empirical Before-vs-After transformation comparison matrix with category filtering, displaying validated client performance deltas across SLA compliance, labor reduction, postal accuracy, and blended ROAS scaling.
- **Page Integration**: Serves as **Section 5** on [Our Work (`app/our-work/page.tsx`)](file:///C:/Develop/egead/egead-company/app/our-work/page.tsx) (`<TransformationMatrix id="transformation-matrix" />`).

#### TypeScript Interface

```typescript
export interface TransformationMetric {
  id: string;
  category: 'sla' | 'cost' | 'marketing' | 'all';
  metricName: string;
  metricLabel: string;
  beforeValue: string;
  beforeContext: string;
  afterValue: string;
  afterContext: string;
  deltaPercent: string;
  trendType: 'decrease-positive' | 'increase-positive';
  impactStatement: string;
}

export interface TransformationMatrixProps {
  id?: string;
  className?: string;
  title?: string;
  description?: string;
}
```

#### Empirical Indicators & Delta Performance

1. **TikTok Shop Late Dispatch Rate (LDR)**: Before `4.5%` (Critical Risk · Algorithmic Throttle) -> After `0.2%` (SLA Shield · Fast Dispatch Badge) | **`-95.5%` Delta**.
2. **Weekly Hours on Manual CSVs & Routing**: Before `18.5 hrs/wk` (Manual file uploads) -> After `1.2 hrs/wk` (Automated webhook sync) | **`-93.5%` Delta** (Reclaims 70+ hours each month).
3. **Address-Related Return to Origin (RTO)**: Before `6.8%` (Failed carrier delivery) -> After `0.9%` (AI CASS pre-dispatch verification) | **`-86.8%` Delta**.
4. **Blended Advertising ROAS (Meta & TikTok)**: Before `2.1x` (Break-even boundary) -> After `4.8x` (Confident scaling past $25K/day) | **`+128.6%` Delta**.

#### Accessibility & WCAG 2.1 AA Compliance

1. **Semantic WAI-ARIA Table**:
   - Rendered with `role="table"`, `<th scope="col">` column headers, and explicit `aria-label="Before versus After E-GEAD Implementation Matrix"`.
2. **Accessible Category Filter Group (`role="group"` & `aria-pressed`)**:
   - Filter container carries `role="group"` with `aria-label="Filter transformation metrics by category"`.
   - Category buttons include `aria-pressed={activeCategory === cat.key}`.
3. **Polite Screen Reader Live Region (`aria-live="polite"` & `aria-atomic="true"`)**:
   - Announces filtered indicator counts when switching categories (`"Showing X transformation metrics for category Y."`).
4. **Visual Contrast**:
   - Clear semantic differentiation between legacy problem states (`text-rose-300`, 7.2:1 contrast) and optimized automated states (`text-[#10E774]`, 11.2:1 contrast).
5. **Decorative Icons**: All icons (`TrendingDown`, `TrendingUp`, `CheckCircle2`, `AlertTriangle`, `ShieldCheck`, `Zap`) carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { TransformationMatrix } from '@/components/sections';

export default function EmpiricalResultsSection() {
  return <TransformationMatrix id="transformation-matrix" />;
}
```

---

### 2.18 CaseStudiesPortfolio

- **Source Code**: [`components/sections/CaseStudiesPortfolio.tsx`](file:///C:/Develop/egead/egead-company/components/sections/CaseStudiesPortfolio.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Comprehensive multi-section client transformation portfolio combining an interactive category filter bar (`role="tablist"`), flagship case study deep dive for UrbanVibe Apparel, and a 6-brand portfolio grid with Next.js optimized `<Image>` assets.
- **Page Integration**: Powers **Section 2 (Filter Bar)**, **Section 3 (Flagship UrbanVibe Deep Dive)**, and **Section 4 (6-Brand Portfolio Grid)** on [Our Work (`app/our-work/page.tsx`)](file:///C:/Develop/egead/egead-company/app/our-work/page.tsx).

#### TypeScript Interface

```typescript
export interface CaseStudyItem {
  id: string;
  client: string;
  location: string;
  category: string;
  industry: 'pod-fulfillment' | 'marketplace-sync' | 'performance-ads' | 'api-integration';
  title: string;
  summary: string;
  image: string;
  metrics: string[];
  resultsBreakdown: {
    highlight: string;
    description: string;
  };
  linkHref?: string;
}

export interface CaseStudiesPortfolioProps {
  className?: string;
}
```

#### Portfolio Clients & Capabilities

1. **UrbanVibe Apparel** (Los Angeles, CA): Print-on-Demand Fashion | Sub-24H Dispatch SLA, 0.18% Late Dispatch Rate, +180% Q4 Revenue ($420K GMV over 28,000 orders).
2. **HomeCraft Studio** (London & Seattle): Home Living & Custom Gifts | 99.9% WMS barcode accuracy, -85% manual ops, zero Amazon stockout cancellations.
3. **Lumina DTC Brand** (Singapore & US): Performance Fashion & DTC | Scaled blended ROAS to 4.8x, CPA reduced to $8.40, ad spend expanded to $25K/day.
4. **PrintWave Enterprise Network** (Austin, TX): Enterprise API Infrastructure | 10,000+ daily orders, 99.9% API uptime, <120ms webhook dispatch latency.
5. **Nordic Threads** (Berlin & Stockholm): Apparel & Merch Expansion | Cross-border US expansion at flat $6 all-in DTF rate with 34% net profit margin.
6. **AuraGlow Custom Decor** (Melbourne, Australia): Personalized Decor | -91% RTO return losses, 99.7% postal delivery rate, $38K reclaimed via AI CASS normalization.

#### Accessibility & WCAG 2.1 AA Compliance

1. **WAI-ARIA Tablist Pattern**:
   - Category filter pills render with `role="tablist"`, `role="tab"`, unique `id={`tab-${tab.id}`}`, `aria-selected={isActive}`, and `aria-controls="case-studies-grid"`.
2. **Next.js Image Optimization**:
   - Visual cards use Next.js `<Image>` with descriptive `alt` tags, `fill`, responsive `sizes`, and `priority` on above-the-fold flagship assets.
3. **Live Screen Reader Announcements**:
   - Polite live region (`aria-live="polite"` & `aria-atomic="true"`) announces the number of displayed case studies when filtering by domain.
4. **Reduced Motion Support (`motion-reduce:transition-none`)**:
   - Smooth zoom on hover disables when `prefers-reduced-motion: reduce` is active.
5. **Semantic Headings**:
   - Structured `<h2>` for flagship narrative and `<h3>` for grid case study cards.

#### Usage Example

```tsx
import React from 'react';
import { CaseStudiesPortfolio } from '@/components/sections';

export default function CaseStudiesSection() {
  return <CaseStudiesPortfolio className="w-full" />;
}
```

---

### 2.19 PlaybookDownloads

- **Source Code**: [`components/sections/PlaybookDownloads.tsx`](file:///C:/Develop/egead/egead-company/components/sections/PlaybookDownloads.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Executive resource and strategy guide distribution component featuring downloadable SOPs, Notion/Excel financial models, simulated downloading state feedback, and screen reader announcements.
- **Page Integration**: Serves as **Section 8** on [Our Work (`app/our-work/page.tsx`)](file:///C:/Develop/egead/egead-company/app/our-work/page.tsx) (`<PlaybookDownloads id="operational-playbooks" />`).

#### TypeScript Interface

```typescript
export interface PlaybookResource {
  id: string;
  title: string;
  format: 'PDF Guide' | 'Excel / Notion Sheet';
  pagesOrSize: string;
  description: string;
  keyTakeaway: string;
  downloadsCount: string;
}

export interface PlaybookDownloadsProps {
  id?: string;
  className?: string;
}
```

#### Curated Executive Playbooks

1. **The 2026 TikTok Shop US SLA Survival Guide** (24 Pages · Comprehensive PDF): CASS normalization SOPs, carrier cut-offs, maintaining sub-1% LDR.
2. **The Omnichannel Inventory & Safety Buffer Blueprint** (18 Pages · Architecture PDF): Dynamic holdback math formulas and webhook throttling algorithms across Amazon, TikTok Shop, Etsy, and Shopify.
3. **Unit Economics & True Net Margin Master Sheet** (Interactive Template · Notion & XLSX): Full financial waterfall mapping gross GMV to clean net profit after DTF print costs, postage, and blended CPA.

#### Accessibility & WCAG 2.1 AA Compliance

1. **Dynamic Polite Live Region (`aria-live="polite"` & `aria-atomic="true"`)**:
   - Announces `"Preparing your guide for download..."` and completed download states to screen readers.
2. **Accessible Action Buttons**:
   - Download triggers carry explicit `aria-label={`Download ${book.title} (${book.format})`}` and `aria-busy={downloadingId === book.id}` during file generation.
3. **Clear State Feedback**:
   - Visual transition from `Download` icon to animated spinner, resolving to emerald `CheckCircle2` with `"Downloaded (Ready)"` confirmation.
4. **Keyboard Accessibility**:
   - All buttons feature `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]`.
5. **Decorative Graphics**:
   - Icons (`Download`, `FileText`, `FileSpreadsheet`, `CheckCircle2`, `BookOpen`, `Sparkles`) carry `aria-hidden="true"`.

##### Usage Example

```tsx
import React from 'react';
import { PlaybookDownloads } from '@/components/sections';

export default function OperationalPlaybooksSection() {
  return <PlaybookDownloads id="operational-playbooks" />;
}
```

---

### 2.20 EcosystemMatrix

- **Source Code**: [`components/sections/EcosystemMatrix.tsx`](file:///C:/Develop/egead/egead-company/components/sections/EcosystemMatrix.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Interactive 5-tier categorized commerce alliance hub and verified partner directory with real-time sync latencies, integration schemas, capability tags, and direct documentation links.
- **Page Integration**: Serves as **Section 3** on [Partners (`app/partners/page.tsx`)](file:///C:/Develop/egead/egead-company/app/partners/page.tsx) (`<EcosystemMatrix id="ecosystem-matrix" />`).

#### TypeScript Interface

```typescript
export interface EcosystemPartner {
  id: string;
  name: string;
  tier: 'marketplaces' | 'storefronts' | 'advertising' | 'logistics' | 'payments';
  integrationType: string;
  syncLatency: string;
  description: string;
  capabilities: string[];
  certifiedBadge: string;
  docHref?: string;
}

export interface EcosystemMatrixProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}
```

#### 5 Alliance Tiers & Schema Specifications

1. **Tier 1: Global Marketplaces (`marketplaces`)**:
   - `TikTok Shop US`: Native Two-Way Open API (< 800ms) with sub-24h tracking push, Fast Dispatch retention, idempotent routing.
   - `Amazon Global Selling`: Selling Partner API (SP-API) (< 1.1s) with FBM auto-confirmation, buffer throttling, barcode verification.
   - `Etsy & eBay Global`: Multi-Variant REST Bridge (< 950ms) for bespoke garment decomposition into 23" DTF production queues.
   - `Walmart Marketplace`: Direct Marketplace API (< 1.4s) with automated 2-day tags and domestic retail compliance.
2. **Tier 2: Storefront Platforms (`storefronts`)**:
   - `Shopify & Shopify Plus`: Native Webhook Architecture (< 340ms) with OAuth 2.0 and instant fulfillment event listening.
   - `WooCommerce & WordPress`: REST API v3 Bridge (< 620ms) for self-hosted independent creator storefronts.
   - `BigCommerce Enterprise`: GraphQL & Webhooks (< 480ms) for multi-location inventory allocation.
   - `Custom Headless Frontends`: Open API 3.1 & SDKs (< 120ms) for Next.js, Nuxt, and custom merchant microservices.
3. **Tier 3: Growth & Performance Ads (`advertising`)**:
   - `TikTok For Business`: Server-to-Server Conversions API (< 180ms) for closed-loop ROAS attribution and event deduplication.
   - `Meta Conversions API (CAPI)`: Direct Server CAPI (< 150ms) bypassing browser ad-blockers and iOS privacy restrictions.
   - `Google Performance Max`: Enhanced Offline Conversions (< 220ms) for high-margin search and shopping ads.
4. **Tier 4: Tier-1 Logistics & Carriers (`logistics`)**:
   - `United States Postal Service (USPS)`: Direct Manifest & CASS Barcoding (< 90ms) with Ground Advantage, Priority Mail, and CASS AI normalization.
   - `United Parcel Service (UPS)`: UPS Ready Certified (< 110ms) with Next Day Air and SurePost routing.
   - `DHL Express International`: Global Borderless API (< 210ms) with DDP landed duty pre-calculation.
5. **Tier 5: Financial Settlements & Payments (`payments`)**:
   - `Stripe Connect`: Automated Split Settlement (< 95ms) for net margin payout automation and multi-vendor escrow.
   - `PayPal International & Venmo`: REST Payments v2 (< 290ms) with automated seller protection tracking upload.

#### Accessibility & WCAG 2.1 AA Compliance

1. **WAI-ARIA Tablist Navigation**:
   - Category selector renders with `role="tablist"` and `aria-label="Ecosystem partner categories"`.
   - Each tier pill renders with `role="tab"`, unique `id={`tier-tab-${tier.id}`}`, `aria-selected={isActive}`, and `aria-controls="ecosystem-cards"`.
2. **Dynamic Screen Reader Live Region (`aria-live="polite"` & `aria-atomic="true"`)**:
   - Enclosed polite live region announces: `"Now displaying X partner alliances in category Y."` whenever users switch active tiers.
3. **High Contrast Typography & Badges**:
   - Monospace badges use `#10E774` on `#141718` (> 11:1 contrast) and emerald pills (`bg-emerald-500/10 text-emerald-400`).
4. **Keyboard Accessibility**:
   - Tab buttons and partner card documentation links include `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10E774]`.
5. **Decorative Icons**: All icons (`ShoppingBag`, `Store`, `Megaphone`, `Truck`, `CreditCard`, `CheckCircle2`, `ShieldCheck`, `Zap`, `Layers`, `ArrowRight`) carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { EcosystemMatrix } from '@/components/sections';

export default function AllianceDirectorySection() {
  return <EcosystemMatrix id="ecosystem-matrix" />;
}
```

---

### 2.21 IntegrationBridgeVisualizer

- **Source Code**: [`components/sections/IntegrationBridgeVisualizer.tsx`](file:///C:/Develop/egead/egead-company/components/sections/IntegrationBridgeVisualizer.tsx)
- **Component Type**: Client Component (`'use client'`)
- **Primary Use**: Interactive 4-stage programmatic integration architecture data highway, featuring clickable stage blocks, live telemetry JSON schema viewer, and safe clipboard copying.
- **Page Integration**: Serves as **Section 5** on [Partners (`app/partners/page.tsx`)](file:///C:/Develop/egead/egead-company/app/partners/page.tsx) (`<IntegrationBridgeVisualizer id="tech-bridge" />`).

#### TypeScript Interface

```typescript
export interface BridgeStage {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  latency: string;
  protocol: string;
  description: string;
  telemetry: {
    eventVolume: string;
    encryption: string;
    idempotency: string;
    samplePayload: string;
  };
}

export interface IntegrationBridgeVisualizerProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}
```

#### 4 Programmatic Pipeline Stages

1. **Stage 01: Input Rails (Omnichannel Ingestion)**:
   - Latency: `< 80ms` | Protocol: `RESTful Webhooks & Open API 3.1`
   - Telemetry: 10M+ Monthly Webhook Events, TLS 1.3 encryption, UUID idempotency header verification.
2. **Stage 02: Security Gateway (Idempotency & Auth)**:
   - Latency: `< 15ms` | Protocol: `HMAC-SHA256 & OAuth 2.0 PKCE`
   - Telemetry: 100% Signature Verified, AES-256 field-level encryption, Redis atomic lock buffer.
3. **Stage 03: Execution Core (WMS & Postal Intelligence)**:
   - Latency: `< 120ms` | Protocol: `USPS CASS Certified & Barcode WMS`
   - Telemetry: 99.9% 1D/2D Barcode Accuracy, internal encrypted RPC, automated 23" DTF production line routing.
4. **Stage 04: Carrier Dispatch (Physical Hand-Off & Callback)**:
   - Latency: `< 24h Hand-Off` | Protocol: `USPS / UPS Carrier Manifest & Webhook Push`
   - Telemetry: Sub-24H Guaranteed Scan, commercial base pricing, direct marketplace delivery status callbacks.

#### Accessibility & WCAG 2.1 AA Compliance

1. **WAI-ARIA Tablist Pattern**:
   - Pipeline stages container features `role="tablist"` and `aria-label="Integration pipeline stages"`.
   - Each step button features `role="tab"`, unique `id={`stage-tab-${stage.id}`}`, `aria-selected={isSelected}`, and `aria-controls="stage-telemetry-panel"`.
   - Active telemetry panel uses `id="stage-telemetry-panel"`, `role="tabpanel"`, and `aria-labelledby={`stage-tab-${currentStage.id}`}`.
2. **Polite Screen Reader Notification**:
   - `aria-live="polite" aria-atomic="true"` announces: `"Active architecture stage: [title]. [description]"` on stage change.
3. **Safe Clipboard Interaction**:
   - Copy handler uses `navigator.clipboard.writeText` with visual check feedback (`Copied!` badge) for 2000ms and explicit `aria-label="Copy telemetry payload sample"`.
4. **Semantic Code Elements**:
   - Formatted JSON payloads render inside semantic `<pre>` and `<code>` blocks with syntax highlighting against `#0A0D0E`.
5. **Decorative Elements**: Icons (`Cpu`, `Lock`, `Boxes`, `Send`, `ShieldCheck`, `Activity`, `Code2`, `Copy`, `Check`) carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { IntegrationBridgeVisualizer } from '@/components/sections';

export default function TechnicalArchitectureSection() {
  return <IntegrationBridgeVisualizer id="tech-bridge" />;
}
```

---

### 2.22 EcosystemHeroGraphic

- **Source Code**: [`components/sections/EcosystemHeroGraphic.tsx`](file:///C:/Develop/egead/egead-company/components/sections/EcosystemHeroGraphic.tsx)
- **Component Type**: Server Component
- **Primary Use**: Interactive visual graphic rendering an interconnected global commerce mesh topology with 6 active nodes (TikTok Shop US, Amazon SP-API, Shopify Plus, USPS Network, Meta & Google CAPI, Stripe) and live status badges.
- **Page Integration**: Powers the hero visual in **Section 1 (Ecosystem Hero)** on [Partners (`app/partners/page.tsx`)](file:///C:/Develop/egead/egead-company/app/partners/page.tsx).

#### TypeScript Interface

```typescript
export interface EcosystemHeroGraphicProps {
  className?: string;
}
```

#### Topology Nodes & Telemetry Visual Architecture

1. **TikTok Shop US**: Direct Open API (< 800ms) with `Sub-24h` SLA badge.
2. **Amazon SP-API**: FBM & Stock Sync (Real-Time) with `99.9% VTR` badge.
3. **Shopify & Plus**: Native Webhooks (340ms) with `OAuth 2.0` badge.
4. **USPS Network**: Origin Post Office Manifest with `Ground Adv` badge.
5. **Meta & Google CAPI**: Server-Side Conversion Feed with `4.8x ROAS` badge.
6. **Stripe Financial Rail**: Automated Merchant Payouts with `Instant Settle` badge.
7. **Footer Telemetry Strip**: Highlights 99.99% Uptime SLA and SOC2 Type II Cloud Data Security.

#### Accessibility & WCAG 2.1 AA Compliance

1. **Semantic Landmark**:
   - Container features `role="region"` and `aria-label="Ecosystem Integration Hub Topology"`.
2. **Motion Reduction Support (`motion-reduce:animate-none`)**:
   - The pulsing live node indicators include `animate-pulse motion-reduce:animate-none` to protect users with vestibular sensitivity.
3. **High Contrast Ratios**:
   - Uses `#10E774` badges on deep `#0A0D0E` surface, exceeding 11:1 AAA contrast ratio.
4. **Zero Client Runtime Overhead**:
   - Rendered as a lightweight Server Component with zero hydration overhead or layout shifts.
5. **Decorative Graphics**:
   - Icons (`Activity`, `Lock`) and ambient blur elements carry `aria-hidden="true"`.

#### Usage Example

```tsx
import React from 'react';
import { EcosystemHeroGraphic } from '@/components/sections';

export default function PartnersHeroVisual() {
  return <EcosystemHeroGraphic className="w-full max-w-lg lg:max-w-none" />;
}
```

---

## 3. Cross-Phase Implementation Matrix

The table below outlines how the 22 section layout components map directly to the requirements of subsequent phases as defined in the master technical plan ([`docs/plans/plan.md`](file:///C:/Develop/egead/egead-company/docs/plans/plan.md)):

| Phase & Target Page | Status | BentoGrid | MetricsRibbon | ComparisonTable | FaqAccordion | WorkflowTimeline | RoleTabs | MarginSimulator | AddressDemo | PricingCalculator | ApiTerminal | LiveCountdownCard | CockpitHudCard | InventoryBufferEngine | NetMarginLedger | BusinessRulesBuilder | EfficiencyVisualizer | TransformationMatrix | CaseStudiesPortfolio | PlaybookDownloads | EcosystemMatrix | IntegrationBridgeVisualizer | EcosystemHeroGraphic | Custom Section Additions |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Phase 2: All Services** (`/services/all-services`) | **COMPLETED** | 6 Pillars Grid | Production Metrics Strip | Head-to-Head 3PL Matrix | Service & SLA FAQ | 5-Step Order-to-Door Pipeline | 4-Persona Architecture Switcher | Section 7 (Interactive ROI & SLA Simulator) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | Split Hero with Live Dispatch HUD, SLA Protection Badges, Client Spotlight (UrbanVibe), Mega CTA & ContactBlock |
| **Phase 3: SpeedX** (`/speedx`) | **COMPLETED** | Section 5 (23" DTF Tech Deep Dive) | Section 2 (SpeedX SLA Metrics) | Section 3 (Legacy POD Crisis Matrix) | Section 11 (SpeedX Technical FAQ) | Section 6 (6-Station WMS Pipeline) | — | — | Section 4 (AI Normalization Demo) | Section 7 ($6 All-In Base Rate Calculator) | Section 10 (REST & Webhook Developer Terminal) | Section 1 (Live 24H SLA Countdown Card in Hero) | — | — | — | — | — | — | — | — | — | — | — | Section 8 (TikTok Shop LDR Shield), Section 9 (Blanks Catalog), Section 12 (High-Octane Mega CTA & ContactBlock) |
| **Phase 4: SmartCommerce** (`/smartcommerce`) | **COMPLETED** | Section 4 (Central Operations Bento Grid) | Section 2 (Platform KPIs Strip) | Section 3 (Omnichannel Chaos Matrix) | — | Section 6 (4-Step WMS Flow) | — | — | — | — | — | — | Section 1 (Telemetry Cockpit HUD in Hero) | Section 5 (Multi-Channel Dynamic Safety Buffer) | Section 7 (Automated Net Margin Reconciliation Ledger) | Section 8 (Intelligent No-Code Rules Engine) | — | — | — | — | — | — | — | Section 9 (Enterprise Cloud Resilience Standards), Section 10 (Platform Integrations Ecosystem), Section 11 (High-Velocity Conversion Mega CTA & ContactBlock) |
| **Phase 5: Our Work** (`/our-work`) | **COMPLETED** | — | Section 1 (Impact Hero Aggregate Portfolio Metrics Strip) | — | Section 9 (Case Studies & Partnership FAQ Accordion) | — | — | — | — | — | — | — | — | — | — | — | Section 6 (Headcount & Scale Savings Simulator) | Section 5 (Quantitative Before-vs-After Transformation Matrix) | Sections 2, 3 & 4 (Filter Bar, Flagship UrbanVibe Deep Dive, 6-Brand Portfolio Grid) | Section 8 (Executive Knowledge Base & Downloadable SOPs) | — | — | — | Section 7 (Verified Founder Audio/Video Quotes), Section 10 (High-Conversion Growth Audit Booking CTA & ContactBlock) |
| **Phase 6: Partners** (`/partners`) | **COMPLETED** | Section 6 (Exclusive Merchant Benefits Grid) | Section 2 (Real-Time API Integration Throughput Ticker) | Section 7 (Co-Innovation Technology Stories Matrix) | Section 8 (Ecosystem & Integrations FAQ Accordion) | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | Section 3 (5-Tier Categorized Alliance Hub) | Section 5 (4-Stage Programmatic Integration Bridge) | Section 1 (Topology Mesh Graphic in Hero) | Section 4 (Enterprise Certified Partner Badges Grid), Section 9 (Partner Application Portal CTA & ContactBlock) |
| **Phase 7: Insights** (`/insights`) | PENDING | Featured Article Bento | Readership & Community Stats | Self-Hosted vs Managed POD Analysis | Content & Editorial FAQ | Research-to-Publication Flow | Role-Based Reading Tracks | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | Newsletter Subscriptions, Interactive Read Filters |
| **Phase 8: Company** (`/company`) | PENDING | Culture & Mission Bento | Facility Footprint & Team Numbers | In-House Ethics vs Offshored Labor | Talent & Career FAQ | Company Evolution Timeline | Department Tour Switcher | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | Leadership Grid, Interactive US Hub Map |

---

## 4. Verification & Testing Protocol

All components and integrated page layouts have been rigorously verified via automated testing using **Bun Test** and **React Server DOM Rendering**:
- **Components Test Suite**: [`tests/sections.test.tsx`](file:///C:/Develop/egead/egead-company/tests/sections.test.tsx) (`bun test tests/sections.test.tsx`) — **27/27 tests PASS (100%)**
- **All Services Page Suite**: [`tests/all-services.test.tsx`](file:///C:/Develop/egead/egead-company/tests/all-services.test.tsx) (`bun test tests/all-services.test.tsx`) — **13/13 tests PASS (100%)**
- **SpeedX Page Suite**: [`tests/speedx.test.tsx`](file:///C:/Develop/egead/egead-company/tests/speedx.test.tsx) (`bun test tests/speedx.test.tsx`) — **17/17 tests PASS (100%)**
- **SmartCommerce Page Suite**: [`tests/smartcommerce.test.tsx`](file:///C:/Develop/egead/egead-company/tests/smartcommerce.test.tsx) (`bun test tests/smartcommerce.test.tsx`) — **16/16 tests PASS (100%)**
- **Our Work Page Suite**: [`tests/our-work.test.tsx`](file:///C:/Develop/egead/egead-company/tests/our-work.test.tsx) (`bun test tests/our-work.test.tsx`) — **15/15 tests PASS (100%)**
- **Partners Page Suite**: [`tests/partners.test.tsx`](file:///C:/Develop/egead/egead-company/tests/partners.test.tsx) (`bun test tests/partners.test.tsx`) — **13/13 tests PASS (100%)**
- **Combined Command**: `bun run test` — **101 tests PASS across 6 test suites (925 assertions, 0 errors)**

### Test Coverage Summary:
1. **Module Exports**: Confirms all 22 section components and TypeScript type contracts are properly exported through [`components/sections/index.ts`](file:///C:/Develop/egead/egead-company/components/sections/index.ts).
2. **BentoGrid**: Tests grid span generation (`col-span-1`, `md:col-span-2`, `lg:col-span-3`), custom visual node rendering, and badge/title display.
3. **MetricsRibbon**: Tests responsive column distribution (2/3/4 columns), numeric trends, and minimalist fallback configurations.
4. **ComparisonTable**: Tests complete WAI-ARIA table semantics (`role="table"`, `role="rowgroup"`, `role="row"`, `role="columnheader"`, `role="cell"`, `role="rowheader"`) and screen reader `.sr-only` accessibility text for boolean checks and crosses.
5. **FaqAccordion**: Tests interactive question/answer rendering, category filtering, accessible toggle IDs (`aria-controls`, `aria-labelledby`, `role="region"`), and sanitized Schema.org `FAQPage` LD+JSON injection.
6. **WorkflowTimeline**: Tests ordered sequential hierarchy (`<ol>`, `<li>`), badge chips, subtext tags, and dual mobile/desktop view paths.
7. **RoleTabs**: Tests WAI-ARIA tabs pattern (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `tabIndex`), bullet points, quantitative metric rows, and empty input fallbacks.
8. **MarginSimulator**: Tests interactive elements, channel selector `aria-pressed` states, accessible `role="group"`, volume range input, dynamic `aria-live="polite"` region, and real-time efficiency metrics calculations.
9. **AddressDemo**: Tests address comparison cards, interactive scenario pills (`role="group"`, `aria-pressed`), and polite ARIA live region (`aria-live="polite"`, `aria-atomic="true"`).
10. **PricingCalculator**: Tests garment tier selector (`role="group"`), retail price slider (`aria-valuetext`), dynamic `aria-live="polite"` region, and negative profit warning styles.
11. **ApiTerminal**: Tests tabbed developer terminal with full WAI-ARIA tablist pattern (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls`), endpoint switching, and safe clipboard execution.
12. **LiveCountdownCard**: Tests real-time 24H SLA countdown clock, semantic `<time>` tag formatting, and motion reduction guard (`motion-reduce:animate-none`).
13. **CockpitHudCard**: Tests live operations cockpit HUD, multi-channel connections (TikTok Shop US, Amazon FBM, Shopify Plus DTC, Etsy Global), throughput counter, sub-second sync latency, and `motion-reduce:animate-none`.
14. **InventoryBufferEngine**: Tests multi-channel buffer engine with physical blanks range slider (`aria-valuetext`), 10/15/20% safety holdback options (`role="group"`, `aria-pressed`), and polite ARIA live region (`aria-live="polite"`, `aria-atomic="true"`).
15. **NetMarginLedger**: Tests financial reconciliation ledger with selectable order tabs (`role="tablist"`, `role="tab"`, `role="tabpanel"`), WAI-ARIA semantic table (`role="table"`, `<th scope="col">`), live cost deduction breakdown, and CSV export state.
16. **BusinessRulesBuilder**: Tests visual If-This-Then-That workflow builder with accessible switch toggles (`role="switch"`, `aria-checked`), keyboard-navigable rule cards (`role="button"`, `tabIndex={0}`, `aria-pressed`), and conditional evaluation logic.
17. **Page Integration (All Services)**: Tests all 11 dedicated sections in [`app/services/all-services/page.tsx`](file:///C:/Develop/egead/egead-company/app/services/all-services/page.tsx) including metadata, live dispatch HUD, metrics ribbon, role tabs, bento pillars, workflow timeline, comparison table, margin simulator, SLA compliance badges, client spotlight, FAQ accordion, and conversion mega CTA with ContactBlock.
18. **Page Integration (SpeedX)**: Tests all 12 dedicated sections in [`app/speedx/page.tsx`](file:///C:/Develop/egead/egead-company/app/speedx/page.tsx) including metadata, kinetic hero with LiveCountdownCard, metrics strip, legacy POD crisis comparison, AddressDemo, DTF technology deep dive, 6-station WMS workflow, PricingCalculator, TikTok Shop LDR shield, blanks catalog, ApiTerminal, FAQ accordion, and high-octane conversion CTA with ContactBlock.
19. **Page Integration (SmartCommerce)**: Tests all 11 dedicated sections in [`app/smartcommerce/page.tsx`](file:///C:/Develop/egead/egead-company/app/smartcommerce/page.tsx) including metadata, enterprise cockpit hero with CockpitHudCard, core performance metrics ribbon, omnichannel chaos comparison matrix, central operations bento grid, InventoryBufferEngine, barcode-verified WMS module, NetMarginLedger, BusinessRulesBuilder, cloud resilience standards, native platform integrations ecosystem, and high-velocity conversion mega CTA with ContactBlock.
20. **EfficiencyVisualizer**: Tests interactive volume slider (500 to 25,000 orders/mo), volume preset buttons (`role="group"`, `aria-pressed`), headcount calculation (Ops FTEs avoidance), net annual savings, and polite ARIA live region (`aria-live="polite"`).
21. **TransformationMatrix**: Tests empirical before-vs-after comparison table with WAI-ARIA table semantics (`role="table"`, `<th scope="col">`), category filtering (`role="group"`, `aria-pressed`), delta metrics (`-95.5% LDR`, `-93.5% CSV Hours`, `-86.8% RTO`, `+128.6% ROAS`), and polite ARIA live region.
22. **CaseStudiesPortfolio**: Tests interactive capability filter bar (`role="tablist"`, `role="tab"`), flagship UrbanVibe deep dive section, 6-brand portfolio grid, Next.js optimized `<Image>` tags, verified SLA badges, and live filter notifications.
23. **PlaybookDownloads**: Tests executive strategy resources cards, download action buttons (`aria-label`, `aria-busy`), simulated download transition states, and polite ARIA announcement regions (`aria-live="polite"`).
24. **Page Integration (Our Work)**: Tests all 10 dedicated sections in [`app/our-work/page.tsx`](file:///C:/Develop/egead/egead-company/app/our-work/page.tsx) including metadata, impact-driven hero with aggregate portfolio metrics, interactive capability filter bar, flagship UrbanVibe deep dive, 6-brand case study grid, quantitative transformation matrix, efficiency visualizer, verified founder quotes, operational playbooks, FAQ accordion with Schema JSON-LD, and high-conversion audit booking CTA with ContactBlock.
25. **EcosystemMatrix**: Tests 5 alliance tier categories (`role="tablist"`, `role="tab"`), partner cards across Marketplaces, Storefronts, Advertising, Logistics, and Payments, certified badges, capability lists, and dynamic polite live regions.
26. **IntegrationBridgeVisualizer**: Tests 4-stage programmatic integration architecture (`role="tablist"`, `role="tab"`, `role="tabpanel"`), stage switching, live telemetry payload display, safe clipboard execution, and screen reader announcements.
27. **EcosystemHeroGraphic**: Tests Server Component topology mesh visual with 6 active partner nodes (TikTok Shop US, Amazon SP-API, Shopify Plus, USPS Network, Meta CAPI, Stripe), live status badges, and motion reduction guards.
28. **Page Integration (Partners)**: Tests all 9 dedicated sections in [`app/partners/page.tsx`](file:///C:/Develop/egead/egead-company/app/partners/page.tsx) including metadata, ecosystem hero with EcosystemHeroGraphic, real-time API throughput ticker with MetricsRibbon, 5-tier ecosystem matrix with EcosystemMatrix, enterprise certified partner badges, 4-stage integration bridge with IntegrationBridgeVisualizer, exclusive merchant benefits with BentoGrid, co-innovation technology stories with ComparisonTable, ecosystem FAQ accordion with FaqAccordion, and partner application portal CTA with ContactBlock.
