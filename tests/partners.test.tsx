import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PartnersPage, { metadata } from '../app/(public)/(services)/partners/page';
import {
  EcosystemMatrix,
  IntegrationBridgeVisualizer,
  EcosystemHeroGraphic,
} from '../components/pages/services/partners';

describe('Phase 6 Partners Ecosystem Page Verification', () => {
  const html = renderToStaticMarkup(<PartnersPage />);

  describe('Page Metadata', () => {
    test('contains comprehensive SEO title, description, and keywords', () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain('Strategic Partners');
      expect(metadata.title).toContain('Global Commerce Ecosystem');
      expect(metadata.description).toContain('TikTok Shop US');
      expect(metadata.description).toContain('Amazon SP-API');
      expect(metadata.keywords).toBeDefined();
      const keywords = metadata.keywords as string[];
      expect(keywords).toBeArray();
      expect(keywords.length).toBeGreaterThanOrEqual(6);
      expect(keywords).toContain('ecommerce marketplace integrations');
      expect(keywords).toContain('tiktok shop api partner');
      expect(keywords).toContain('amazon sp-api integration');
      expect(keywords).toContain('shopify pod fulfillment partner');
      expect(keywords).toContain('usps commercial shipping partner');
    });
  });

  describe('All 9 Dedicated Sections Present and Rendered', () => {
    // 1. Ecosystem Hero & Alliances Statement
    test('renders Section 1: Ecosystem Hero & Global Alliances Statement', () => {
      expect(html).toContain('id="partners-hero"');
      expect(html).toContain('Global Commerce Alliances');
      expect(html).toContain("Integrated with the World&#x27;s");
      expect(html).toContain('Leading Commerce Ecosystems.');
      expect(html).toContain('Explore Partner Matrix');
      expect(html).toContain('Become an Ecosystem Partner');
    });

    // 2. Real-Time API Integration Throughput Ticker
    test('renders Section 2: Real-Time API Integration Throughput Ticker with core KPIs', () => {
      expect(html).toContain('id="api-throughput"');
      expect(html).toContain('id="throughput-ribbon"');
      expect(html).toContain('&lt; 120ms');
      expect(html).toContain('API Response Latency');
      expect(html).toContain('10,000,000+');
      expect(html).toContain('Monthly Webhook Events');
      expect(html).toContain('100%');
      expect(html).toContain('OAuth 2.0 Compliance');
      expect(html).toContain('99.9%');
      expect(html).toContain('Carrier Scan Rate');
    });

    // 3. 5-Tier Categorized Ecosystem Matrix
    test('renders Section 3: 5-Tier Categorized Ecosystem Matrix with category tabs', () => {
      expect(html).toContain('id="ecosystem-matrix"');
      expect(html).toContain('5-Tier Categorized Ecosystem Matrix');
      expect(html).toContain('All Alliances');
      expect(html).toContain('Marketplaces');
      expect(html).toContain('Storefront Platforms');
      expect(html).toContain('Ad &amp; Growth Networks');
      expect(html).toContain('Carriers &amp; Logistics');
      expect(html).toContain('Payment Rails');
    });

    // 4. Deep Integration & Certified Status Showcase
    test('renders Section 4: Deep Integration & Certified Status Showcase (BentoGrid)', () => {
      expect(html).toContain('id="certified-showcase"');
      expect(html).toContain('Official Technical Certifications');
      expect(html).toContain('Deep Programmatic Integrations &amp; Certified Status');
      expect(html).toContain('TikTok Shop US: Certified Fast Dispatch Partner');
      expect(html).toContain('Amazon Selling Partner API (SP-API Certified)');
      expect(html).toContain('Etsy &amp; eBay: Multi-Variant Catalog Bridge');
      expect(html).toContain('Shopify &amp; Shopify Plus: Verified App Infrastructure');
      expect(html).toContain('USPS Commercial Plus Carrier Network');
      expect(html).toContain('Meta &amp; Google Growth Alliances');
    });

    // 5. The E-GEAD Technical Integration Bridge Architecture
    test('renders Section 5: The E-GEAD Technical Integration Bridge Architecture', () => {
      expect(html).toContain('id="bridge-architecture"');
      expect(html).toContain('The E-GEAD Technical Integration Bridge Architecture');
      expect(html).toContain('Input Rails: Omnichannel Ingestion');
      expect(html).toContain('Security Gateway: Idempotency &amp; Auth');
      expect(html).toContain('Execution Core: WMS &amp; Postal Intelligence');
      expect(html).toContain('Output Rails: Tracking &amp; Ledger Settlement');
    });

    // 6. Exclusive Merchant Advantages from Our Alliances
    test('renders Section 6: Exclusive Merchant Advantages from Our Alliances', () => {
      expect(html).toContain('id="merchant-advantages"');
      expect(html).toContain('Exclusive Advantages from Our Alliances');
      expect(html).toContain('Commercial Postage Discounts');
      expect(html).toContain('Priority Policy Escalation');
      expect(html).toContain('Early Access Alpha APIs');
      expect(html).toContain('Save between');
      expect(html).toContain('$1.50 and $3.00');
    });

    // 7. Partner Co-Innovation & Success Stories
    test('renders Section 7: Partner Co-Innovation & Success Stories', () => {
      expect(html).toContain('id="partner-stories"');
      expect(html).toContain('Carrier Co-Innovation Spotlight');
      expect(html).toContain('Marcus Sterling');
      expect(html).toContain('Director of Carrier Alliances, North American Postal Network');
      expect(html).toContain('Handling 500,000+ Verified Scans Per Quarter');
      expect(html).toContain('99.8%');
      expect(html).toContain('2.8 Days');
    });

    // 8. Integration & Ecosystem FAQ Accordion
    test('renders Section 8: Integration & Ecosystem FAQ Accordion', () => {
      expect(html).toContain('id="partners-faq"');
      expect(html).toContain('Ecosystem &amp; Integration FAQs');
      expect(html).toContain('Does E-GEAD share or sell our store customer data?');
      expect(html).toContain('How long does it take to connect a new TikTok Shop or Shopify store?');
      expect(html).toContain('Can we connect multiple stores from different platforms to one E-GEAD account?');
      expect(html).toContain('What happens if a marketplace API experiences unexpected downtime?');
      expect(html).toContain('Are there any ongoing API connection fees or hidden platform surcharges?');
    });

    // 9. High-Velocity Alliance CTA: Join the Ecosystem
    test('renders Section 9: High-Velocity Alliance CTA & Contact Block', () => {
      expect(html).toContain('id="partners-cta"');
      expect(html).toContain('Expand Your Reach Within the');
      expect(html).toContain('E-GEAD Global Network.');
      expect(html).toContain('Apply for Technology Partnership');
      expect(html).toContain('Access Developer Sandbox');
      expect(html).toContain('id="contact"');
    });
  });

  describe('Interactive Section Island Accessibility and Mechanics', () => {
    test('EcosystemMatrix renders tablist, tab buttons with ARIA controls, and live region', () => {
      const matrixHtml = renderToStaticMarkup(<EcosystemMatrix />);
      expect(matrixHtml).toContain('role="region"');
      expect(matrixHtml).toContain('aria-label="5-Tier Categorized Ecosystem Matrix"');
      expect(matrixHtml).toContain('role="tablist"');
      expect(matrixHtml).toContain('role="tab"');
      expect(matrixHtml).toContain('aria-controls="ecosystem-cards"');
      expect(matrixHtml).toContain('aria-live="polite"');
      expect(matrixHtml).toContain('TikTok Shop US');
      expect(matrixHtml).toContain('Amazon Global Selling');
      expect(matrixHtml).toContain('Shopify &amp; Shopify Plus');
      expect(matrixHtml).toContain('Stripe Global Infrastructure');
    });

    test('IntegrationBridgeVisualizer renders 4 interactive stages and code telemetry panel', () => {
      const bridgeHtml = renderToStaticMarkup(<IntegrationBridgeVisualizer />);
      expect(bridgeHtml).toContain('role="region"');
      expect(bridgeHtml).toContain('aria-label="The E-GEAD Technical Integration Bridge Architecture"');
      expect(bridgeHtml).toContain('role="tablist"');
      expect(bridgeHtml).toContain('role="tab"');
      expect(bridgeHtml).toContain('role="tabpanel"');
      expect(bridgeHtml).toContain('aria-live="polite"');
      expect(bridgeHtml).toContain('&lt; 80ms Latency');
      expect(bridgeHtml).toContain('TIKTOK_SHOP_US');
      expect(bridgeHtml).toContain('Telemetry Payload Event');
    });

    test('EcosystemHeroGraphic renders topology mesh and real-time status badges', () => {
      const heroGraphicHtml = renderToStaticMarkup(<EcosystemHeroGraphic />);
      expect(heroGraphicHtml).toContain('role="region"');
      expect(heroGraphicHtml).toContain('aria-label="Ecosystem Integration Hub Topology"');
      expect(heroGraphicHtml).toContain('Global Commerce Mesh');
      expect(heroGraphicHtml).toContain('17 Endpoints Active');
      expect(heroGraphicHtml).toContain('TikTok Shop US');
      expect(heroGraphicHtml).toContain('Amazon SP-API');
      expect(heroGraphicHtml).toContain('Shopify &amp; Plus');
      expect(heroGraphicHtml).toContain('USPS Network');
      expect(heroGraphicHtml).toContain('E-GEAD Core Orchestration Highway');
    });
  });
});
