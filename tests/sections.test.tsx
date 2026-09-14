import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
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
} from '../components/sections';
import type {
  BentoItem,
  BentoGridProps,
  MetricItem,
  MetricsRibbonProps,
  ComparisonRow,
  ComparisonTableProps,
  FaqItem,
  FaqAccordionProps,
  WorkflowStep,
  WorkflowTimelineProps,
  RoleTabItem,
  RoleTabsProps,
  MarginSimulatorProps,
  AddressDemoProps,
  PricingCalculatorProps,
  ApiTerminalProps,
  LiveCountdownCardProps,
  CockpitHudCardProps,
  InventoryBufferEngineProps,
  NetMarginLedgerProps,
  BusinessRulesBuilderProps,
} from '../components/sections';

describe('Phase 1, 2, 3 & 4 Components Verification', () => {
  describe('Module Exports', () => {
    test('all 15 section components are exported and defined', () => {
      expect(BentoGrid).toBeDefined();
      expect(typeof BentoGrid).toBe('function');

      expect(MetricsRibbon).toBeDefined();
      expect(typeof MetricsRibbon).toBe('function');

      expect(ComparisonTable).toBeDefined();
      expect(typeof ComparisonTable).toBe('function');

      expect(FaqAccordion).toBeDefined();
      expect(typeof FaqAccordion).toBe('function');

      expect(WorkflowTimeline).toBeDefined();
      expect(typeof WorkflowTimeline).toBe('function');

      expect(RoleTabs).toBeDefined();
      expect(typeof RoleTabs).toBe('function');

      expect(MarginSimulator).toBeDefined();
      expect(typeof MarginSimulator).toBe('function');

      expect(AddressDemo).toBeDefined();
      expect(typeof AddressDemo).toBe('function');

      expect(PricingCalculator).toBeDefined();
      expect(typeof PricingCalculator).toBe('function');

      expect(ApiTerminal).toBeDefined();
      expect(typeof ApiTerminal).toBe('function');

      expect(LiveCountdownCard).toBeDefined();
      expect(typeof LiveCountdownCard).toBe('function');

      expect(CockpitHudCard).toBeDefined();
      expect(typeof CockpitHudCard).toBe('function');

      expect(InventoryBufferEngine).toBeDefined();
      expect(typeof InventoryBufferEngine).toBe('function');

      expect(NetMarginLedger).toBeDefined();
      expect(typeof NetMarginLedger).toBe('function');

      expect(BusinessRulesBuilder).toBeDefined();
      expect(typeof BusinessRulesBuilder).toBe('function');
    });
  });

  describe('BentoGrid Component', () => {
    test('renders with required props and items without error', () => {
      const mockItems: BentoItem[] = [
        {
          id: 'item-1',
          title: 'Feature Alpha',
          description: 'Description for Alpha',
          colSpan: 2,
          rowSpan: 1,
          tag: 'Core',
          stats: { value: '99.9%', label: 'Uptime' },
          ctaText: 'Explore',
          ctaHref: '/alpha',
        },
        {
          id: 'item-2',
          title: 'Feature Beta',
          description: 'Description for Beta',
          colSpan: 3,
          highlight: true,
        },
      ];

      const html = renderToStaticMarkup(
        <BentoGrid
          id="bento-test"
          badge="Technology"
          title="Modular Architecture"
          description="Testing bento grid functionality"
          items={mockItems}
        />
      );

      expect(html).toContain('bento-test');
      expect(html).toContain('Technology');
      expect(html).toContain('Modular Architecture');
      expect(html).toContain('Description for Alpha');
      expect(html).toContain('Feature Beta');
      expect(html).toContain('99.9%');
      expect(html).toContain('Uptime');
      expect(html).toContain('Explore');
      expect(html).toContain('md:col-span-2 lg:col-span-3');
    });

    test('supports custom visual element and default props', () => {
      const mockItems: BentoItem[] = [
        {
          id: 'item-visual',
          title: 'Visual Feature',
          description: 'Has visual node',
          visual: <div data-testid="custom-visual">Visual Box</div>,
        },
      ];

      const html = renderToStaticMarkup(
        <BentoGrid title="Visual Grid" items={mockItems} />
      );

      expect(html).toContain('Visual Box');
      expect(html).toContain('Visual Feature');
    });
  });

  describe('MetricsRibbon Component', () => {
    test('renders metric items with badge and subtitles', () => {
      const metrics: MetricItem[] = [
        { value: '<24H', label: 'Turnaround Time', trend: '+40% Faster' },
        { value: '99.8%', label: 'Print Accuracy', description: 'Zero defect tolerance' },
        { value: '50K+', label: 'Daily Units' },
      ];

      const html = renderToStaticMarkup(
        <MetricsRibbon
          id="metrics-test"
          badge="By The Numbers"
          title="Industry Benchmark"
          subtitle="Our real-time production stats"
          metrics={metrics}
        />
      );

      expect(html).toContain('metrics-test');
      expect(html).toContain('By The Numbers');
      expect(html).toContain('Industry Benchmark');
      expect(html).toContain('Our real-time production stats');
      expect(html).toContain('&lt;24H');
      expect(html).toContain('Turnaround Time');
      expect(html).toContain('+40% Faster');
      expect(html).toContain('99.8%');
      expect(html).toContain('Zero defect tolerance');
    });

    test('renders cleanly with minimalist props', () => {
      const metrics: MetricItem[] = [
        { value: '100%', label: 'Guaranteed' },
      ];

      const html = renderToStaticMarkup(<MetricsRibbon metrics={metrics} />);
      expect(html).toContain('100%');
      expect(html).toContain('Guaranteed');
    });
  });

  describe('ComparisonTable Component', () => {
    test('renders rows with accessible boolean indicators and ARIA table roles', () => {
      const rows: ComparisonRow[] = [
        {
          feature: 'Turnaround Speed',
          category: 'Fulfillment',
          egead: 'Sub-24 Hours',
          traditional: '3-7 Business Days',
          egeadNote: 'Direct API dispatch',
          traditionalNote: 'Batch manual processing',
          highlight: true,
        },
        {
          feature: 'Real-time AI Color Matching',
          category: 'Quality',
          egead: true,
          traditional: false,
        },
      ];

      const html = renderToStaticMarkup(
        <ComparisonTable
          id="comparison-test"
          badge="Why Choose Us"
          title="E-GEAD vs Traditional"
          subtitle="Clear breakdown of operational advantages"
          rows={rows}
        />
      );

      expect(html).toContain('comparison-test');
      expect(html).toContain('role="table"');
      expect(html).toContain('role="rowgroup"');
      expect(html).toContain('role="row"');
      expect(html).toContain('role="columnheader"');
      expect(html).toContain('role="cell"');
      expect(html).toContain('Supported');
      expect(html).toContain('Not supported');
      expect(html).toContain('Why Choose Us');
      expect(html).toContain('E-GEAD vs Traditional');
      expect(html).toContain('Turnaround Speed');
      expect(html).toContain('Sub-24 Hours');
      expect(html).toContain('3-7 Business Days');
      expect(html).toContain('Direct API dispatch');
      expect(html).toContain('Real-time AI Color Matching');
    });
  });

  describe('FaqAccordion Component', () => {
    test('renders questions and answers, and includes FAQ schema ld+json with sanitized markup and ARIA tags', () => {
      const faqs: FaqItem[] = [
        {
          question: 'What is the production turnaround time?',
          answer: 'All POD orders are printed and dispatched within 24 hours.',
          category: 'Operations',
        },
        {
          question: 'How do we integrate via API?',
          answer: 'We provide REST and GraphQL endpoints with webhooks.',
          category: 'Tech',
        },
      ];

      const html = renderToStaticMarkup(
        <FaqAccordion
          id="faq-test"
          badge="Help Center"
          title="Common Inquiries"
          items={faqs}
          categories={['Operations', 'Tech']}
          includeSchema={true}
        />
      );

      expect(html).toContain('faq-test');
      expect(html).toContain('Help Center');
      expect(html).toContain('Common Inquiries');
      expect(html).toContain('What is the production turnaround time?');
      expect(html).toContain('application/ld+json');
      expect(html).toContain('https://schema.org');
      expect(html).toContain('FAQPage');
      expect(html).toContain('aria-controls="faq-answer-0"');
      expect(html).toContain('role="region"');
    });
  });

  describe('WorkflowTimeline Component', () => {
    test('renders steps with sequence and details using semantic ol/li', () => {
      const steps: WorkflowStep[] = [
        {
          step: '01',
          title: 'Order Ingestion',
          description: 'Instant webhook sync from Shopify or TikTok Shop.',
          badge: 'Automated',
          subtext: 'Latency < 50ms',
        },
        {
          step: '02',
          title: 'AI Rip & Color Profile',
          description: 'Automated color matching and print file generation.',
        },
        {
          step: '03',
          title: 'Dispatch & Track',
          description: 'Handover to USPS/FedEx with real-time tracking.',
        },
      ];

      const html = renderToStaticMarkup(
        <WorkflowTimeline
          id="workflow-test"
          badge="Fulfillment Lifecycle"
          title="How It Works"
          subtitle="From customer click to porch delivery"
          steps={steps}
        />
      );

      expect(html).toContain('workflow-test');
      expect(html).toContain('<ol');
      expect(html).toContain('<li');
      expect(html).toContain('Fulfillment Lifecycle');
      expect(html).toContain('How It Works');
      expect(html).toContain('Order Ingestion');
      expect(html).toContain('Step 01');
      expect(html).toContain('Automated');
      expect(html).toContain('Latency &lt; 50ms');
      expect(html).toContain('AI Rip &amp; Color Profile');
      expect(html).toContain('Dispatch &amp; Track');
    });
  });

  describe('RoleTabs Component', () => {
    test('renders role tabs with WAI-ARIA tab pattern, bullets, metrics, and cta', () => {
      const tabs: RoleTabItem[] = [
        {
          id: 'creators',
          label: 'For Creators',
          badge: 'No MOQ',
          headline: 'Launch your merchandise line without upfront inventory',
          description: 'On-demand production means zero financial risk.',
          bullets: [
            'Sub-24 hour fulfillment guarantee',
            'Custom branded packaging inserts',
            'Automated store sync',
          ],
          metrics: [
            { value: '0', label: 'Upfront Cost' },
            { value: '24H', label: 'Avg Production' },
          ],
          ctaText: 'Start Creating',
          ctaHref: '/contact-us',
        },
        {
          id: 'enterprise',
          label: 'For Enterprise',
          headline: 'High volume SLA backed infrastructure',
          description: 'Dedicated account manager and priority routing.',
          bullets: ['Dedicated fleet SLA', 'Volume tier discounts'],
        },
      ];

      const html = renderToStaticMarkup(
        <RoleTabs
          id="roles-test"
          badge="Tailored Solutions"
          title="Built for Every Business Scale"
          subtitle="Choose your business tier below"
          tabs={tabs}
        />
      );

      expect(html).toContain('roles-test');
      expect(html).toContain('role="tablist"');
      expect(html).toContain('role="tab"');
      expect(html).toContain('role="tabpanel"');
      expect(html).toContain('aria-selected="true"');
      expect(html).toContain('Tailored Solutions');
      expect(html).toContain('Built for Every Business Scale');
      expect(html).toContain('For Creators');
      expect(html).toContain('No MOQ');
      expect(html).toContain('For Enterprise');
      expect(html).toContain('Launch your merchandise line without upfront inventory');
      expect(html).toContain('Sub-24 hour fulfillment guarantee');
      expect(html).toContain('Upfront Cost');
      expect(html).toContain('Start Creating');
    });

    test('returns null when tabs array is empty', () => {
      const html = renderToStaticMarkup(
        <RoleTabs title="Empty" tabs={[]} />
      );
      expect(html).toBe('');
    });
  });

  describe('MarginSimulator Component', () => {
    test('renders interactive calculator with channel options, volume slider, and live region', () => {
      const html = renderToStaticMarkup(
        <MarginSimulator id="custom-simulator" className="custom-calc-class" />
      );

      expect(html).toContain('id="custom-simulator"');
      expect(html).toContain('custom-calc-class');
      expect(html).toContain('ROI &amp; Efficiency Simulator');
      expect(html).toContain('Estimate Your');
      expect(html).toContain('Operational Freedom');
      expect(html).toContain('role="group"');
      expect(html).toContain('aria-label="Select sales channel"');
      expect(html).toContain('aria-pressed="true"');
      expect(html).toContain('TikTok Shop US');
      expect(html).toContain('Amazon FBM');
      expect(html).toContain('Etsy Global');
      expect(html).toContain('Shopify DTC');
      expect(html).toContain('Monthly Order Volume');
      expect(html).toContain('type="range"');
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain('aria-atomic="true"');
      expect(html).toContain('Monthly Efficiency Metrics');
      expect(html).toContain('Time Saved');
      expect(html).toContain('RTO Avoided');
      expect(html).toContain('Late Dispatch');
      expect(html).toContain('Monthly GMV');
    });
  });

  describe('AddressDemo Component', () => {
    test('renders address comparison card with interactive pills and live region', () => {
      const html = renderToStaticMarkup(
        <AddressDemo id="custom-address-demo" className="custom-demo-class" />
      );

      expect(html).toContain('id="custom-address-demo"');
      expect(html).toContain('custom-demo-class');
      expect(html).toContain('Watch AI');
      expect(html).toContain('Sanitize &amp; Fix');
      expect(html).toContain('role="group"');
      expect(html).toContain('aria-label="Select address test scenario"');
      expect(html).toContain('Incomplete Zip &amp; Abbreviation');
      expect(html).toContain('Typo in Street &amp; City');
      expect(html).toContain('Missing Suite / Unit Number');
      expect(html).toContain('Raw Marketplace Payload');
      expect(html).toContain('Eweb-character AI Sanitized');
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain('aria-atomic="true"');
      expect(html).toContain('USPS DPV Confirmed Delivery Point');
    });
  });

  describe('PricingCalculator Component', () => {
    test('renders pricing calculator with garment options, retail slider, and live margin analysis', () => {
      const html = renderToStaticMarkup(
        <PricingCalculator id="custom-pricing-calc" className="custom-pricing-class" />
      );

      expect(html).toContain('id="custom-pricing-calc"');
      expect(html).toContain('custom-pricing-class');
      expect(html).toContain('$6 All-In Base Rate');
      expect(html).toContain('role="group"');
      expect(html).toContain('aria-label="Select Garment Blank"');
      expect(html).toContain('Classic Streetwear Tee (Gildan 5000)');
      expect(html).toContain('Vintage Washed Tee (Comfort Colors 1717)');
      expect(html).toContain('Heavy Blend Fleece Hoodie (Gildan 18500)');
      expect(html).toContain('Your Retail Selling Price');
      expect(html).toContain('type="range"');
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain('aria-atomic="true"');
      expect(html).toContain('Live P&amp;L Analysis');
      expect(html).toContain('Per-Unit Profitability');
      expect(html).toContain('Gross Retail Revenue:');
      expect(html).toContain('(-) E-GEAD All-In Base Rate:');
      expect(html).toContain('(-) Est. Marketplace Fee (6%):');
      expect(html).toContain('(-) Est. US Domestic Shipping:');
    });
  });

  describe('ApiTerminal Component', () => {
    test('renders developer terminal with WAI-ARIA tabs and copy button', () => {
      const html = renderToStaticMarkup(
        <ApiTerminal id="custom-api-terminal" className="custom-terminal-class" />
      );

      expect(html).toContain('id="custom-api-terminal"');
      expect(html).toContain('custom-terminal-class');
      expect(html).toContain('RESTful API &amp;');
      expect(html).toContain('Event-Driven Webhook');
      expect(html).toContain('role="tablist"');
      expect(html).toContain('aria-label="API Endpoint Selector"');
      expect(html).toContain('role="tab"');
      expect(html).toContain('aria-controls="api-terminal-panel"');
      expect(html).toContain('id="api-terminal-panel"');
      expect(html).toContain('role="tabpanel"');
      expect(html).toContain('aria-label="Copy code sample to clipboard"');
      expect(html).toContain('/v1/orders/dispatch');
      expect(html).toContain('HTTP/2 200 OK');
    });
  });

  describe('LiveCountdownCard Component', () => {
    test('renders countdown clock with semantic time tag and motion-reduction class', () => {
      const html = renderToStaticMarkup(
        <LiveCountdownCard className="custom-countdown-class" />
      );

      expect(html).toContain('custom-countdown-class');
      expect(html).toContain('24-Hour Production SLA Clock');
      expect(html).toContain('motion-reduce:animate-none');
      expect(html).toContain('<time');
      expect(html).toContain('Guaranteed Carrier Origin Scan Window');
      expect(html).toContain('08:00 AM • Order Ingestion');
      expect(html).toContain('11:30 AM • 23&quot; DTF Printed');
      expect(html).toContain('03:45 PM • Carrier Physical Scan');
      expect(html).toContain('TikTok Shop US Compliance');
    });
  });

  describe('CockpitHudCard Component', () => {
    test('renders operations cockpit HUD with channels and throughput indicators', () => {
      const html = renderToStaticMarkup(
        <CockpitHudCard className="custom-hud-class" />
      );

      expect(html).toContain('custom-hud-class');
      expect(html).toContain('Live Operations Cockpit HUD');
      expect(html).toContain('Multi-Channel Mesh: Optimal');
      expect(html).toContain('Global Throughput Rate');
      expect(html).toContain('Median Sync Latency');
      expect(html).toContain('TikTok Shop US');
      expect(html).toContain('Amazon FBM');
      expect(html).toContain('Shopify Plus DTC');
      expect(html).toContain('Etsy Global');
      expect(html).toContain('Safety Stock Buffer Protected');
    });
  });

  describe('InventoryBufferEngine Component', () => {
    test('renders multi-channel buffer engine with slider and live region', () => {
      const html = renderToStaticMarkup(
        <InventoryBufferEngine id="custom-buffer-engine" className="custom-engine-class" />
      );

      expect(html).toContain('id="custom-buffer-engine"');
      expect(html).toContain('custom-engine-class');
      expect(html).toContain('Physical Blank Inventory in US Hubs');
      expect(html).toContain('type="range"');
      expect(html).toContain('Safety Buffer Protection Threshold');
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain('aria-atomic="true"');
      expect(html).toContain('Synchronized Virtual Queues');
      expect(html).toContain('Safety Reserve (Unlisted)');
      expect(html).toContain('Active Available Stock');
      expect(html).toContain('TikTok Shop US (40%)');
      expect(html).toContain('Amazon FBM (40%)');
      expect(html).toContain('Etsy Global (20%)');
    });
  });

  describe('NetMarginLedger Component', () => {
    test('renders financial reconciliation ledger with selectable tabs and ARIA table', () => {
      const html = renderToStaticMarkup(
        <NetMarginLedger id="custom-ledger" className="custom-ledger-class" />
      );

      expect(html).toContain('id="custom-ledger"');
      expect(html).toContain('custom-ledger-class');
      expect(html).toContain('role="tablist"');
      expect(html).toContain('role="tab"');
      expect(html).toContain('role="tabpanel"');
      expect(html).toContain('role="table"');
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain('Export P&amp;L Ledger (CSV)');
      expect(html).toContain('Gross Customer Payment');
      expect(html).toContain('True Clean Net Profit');
      expect(html).toContain('Auto-syncs with Xero &amp; QuickBooks Online');
    });
  });

  describe('BusinessRulesBuilder Component', () => {
    test('renders business rules builder with accessible switches and If-Then visualizer', () => {
      const html = renderToStaticMarkup(
        <BusinessRulesBuilder id="custom-rules" className="custom-rules-class" />
      );

      expect(html).toContain('id="custom-rules"');
      expect(html).toContain('custom-rules-class');
      expect(html).toContain('role="switch"');
      expect(html).toContain('aria-checked="true"');
      expect(html).toContain('role="button"');
      expect(html).toContain('High-Value VIP Order Acceleration');
      expect(html).toContain('Non-Contiguous Surcharge Shield');
      expect(html).toContain('Automated CASS Address Intercept');
      expect(html).toContain('Step 1: Ingestion Trigger');
      expect(html).toContain('Step 2: Conditional Evaluation (IF)');
      expect(html).toContain('Step 3: Automated Action (THEN)');
      expect(html).toContain('Proven Merchant ROI Impact');
    });
  });

  describe('Type Definition Verification', () => {
    test('TypeScript interface contract assignments compile correctly', () => {
      const bentoProps: BentoGridProps = {
        title: 'Title',
        items: [],
      };
      const metricsProps: MetricsRibbonProps = {
        metrics: [],
      };
      const comparisonProps: ComparisonTableProps = {
        title: 'Title',
        rows: [],
      };
      const faqProps: FaqAccordionProps = {
        title: 'Title',
        items: [],
      };
      const workflowProps: WorkflowTimelineProps = {
        title: 'Title',
        steps: [],
      };
      const roleProps: RoleTabsProps = {
        title: 'Title',
        tabs: [],
      };
      const simulatorProps: MarginSimulatorProps = {
        id: 'sim',
        className: 'sim-class',
      };
      const addressProps: AddressDemoProps = {
        id: 'address',
        className: 'address-class',
      };
      const pricingProps: PricingCalculatorProps = {
        id: 'pricing',
        className: 'pricing-class',
      };
      const apiProps: ApiTerminalProps = {
        id: 'api',
        className: 'api-class',
      };
      const countdownProps: LiveCountdownCardProps = {
        className: 'countdown-class',
      };
      const hudProps: CockpitHudCardProps = {
        className: 'hud-class',
      };
      const bufferProps: InventoryBufferEngineProps = {
        id: 'buffer',
        className: 'buffer-class',
      };
      const ledgerProps: NetMarginLedgerProps = {
        id: 'ledger',
        className: 'ledger-class',
      };
      const rulesProps: BusinessRulesBuilderProps = {
        id: 'rules',
        className: 'rules-class',
      };

      expect(bentoProps.title).toBe('Title');
      expect(metricsProps.metrics).toBeArray();
      expect(comparisonProps.rows).toBeArray();
      expect(faqProps.items).toBeArray();
      expect(workflowProps.steps).toBeArray();
      expect(roleProps.tabs).toBeArray();
      expect(simulatorProps.id).toBe('sim');
      expect(addressProps.id).toBe('address');
      expect(pricingProps.id).toBe('pricing');
      expect(apiProps.id).toBe('api');
      expect(countdownProps.className).toBe('countdown-class');
      expect(hudProps.className).toBe('hud-class');
      expect(bufferProps.id).toBe('buffer');
      expect(ledgerProps.id).toBe('ledger');
      expect(rulesProps.id).toBe('rules');
    });
  });
});
