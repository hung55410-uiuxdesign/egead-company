import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SpeedXPage, { metadata } from '../app/(public)/(products)/speedx/page';

describe('SpeedX Page 100% SAI Digital Fidelity Verification', () => {
  const html = renderToStaticMarkup(<SpeedXPage />);

  describe('Page Metadata', () => {
    test('contains comprehensive SEO title, description, and keywords', () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain('SpeedX');
      expect(metadata.title).toContain('Revolutionize Your Workflow with SpeedX');
      expect(metadata.description).toContain('Discover SpeedX by SAI Digital');
      expect(metadata.keywords).toBeDefined();
      const keywords = metadata.keywords as string[];
      expect(keywords).toBeArray();
      expect(keywords).toContain('SpeedX');
      expect(keywords).toContain('CRM implementation');
      expect(keywords).toContain('Sales Cloud SpeedX');
    });
  });

  describe('SAI Digital 4 Signature Sections 100% Present', () => {
    // 1. Hero Section
    test('renders Section 1: Product Overview Hero with logo, CRM Implementation subtitle, and demo video', () => {
      expect(html).toContain('product-overview speedx');
      expect(html).toContain('speedx-logo.svg');
      expect(html).toContain('CRM IMPLEMENTATION');
      expect(html).toContain('Get Your Sales Team Focused on Selling in 98 Days');
      expect(html).toContain('Finally, a CRM implementation that works for your team, not against them.');
      expect(html).toContain('Sales Cloud SpeedX gets you up and running fast, without the usual enterprise headaches.');
      expect(html).toContain('Schedule demo');
      expect(html).toContain('Book a Demo Now!');
      expect(html).toContain('cover_demo_video.png');
    });

    // 2. Why SpeedX Section
    test('renders Section 2: Why SpeedX with kinetic typography and 3 metric cards', () => {
      expect(html).toContain('why-speedx');
      expect(html).toContain('WHY SPEEDX?');
      expect(html).toContain('Sales teams struggle with lengthy CRM setups, complex customizations, and slow adoption');
      expect(html).toContain('<span>A</span><span>C</span><span>H</span><span>I</span><span>E</span><span>V</span><span>E</span>');
      expect(html).toContain('<span>C</span><span>R</span><span>M</span>');
      expect(html).toContain('<span>E</span><span>X</span><span>C</span><span>E</span><span>L</span><span>L</span><span>E</span><span>N</span><span>C</span><span>E</span>');
      expect(html).toContain('<span>S</span><span>P</span><span>E</span><span>E</span><span>D</span><span>X</span>');

      // 3 metric cards
      expect(html).toContain('metric-productivity.png');
      expect(html).toContain('35% Increase');
      expect(html).toContain('in Sale Productivity');

      expect(html).toContain('metric-cycle-length.png');
      expect(html).toContain('30% Reduction');
      expect(html).toContain('in Sale Cycle Length');

      expect(html).toContain('metric-conversion.png');
      expect(html).toContain('25% Higher');
      expect(html).toContain('Lead Conversion Rate');
    });

    // 3. How SpeedX Works Section
    test('renders Section 3: How SpeedX Works with sticky sidebar and 5 sequential steps', () => {
      expect(html).toContain('how-speedx');
      expect(html).toContain('HOW SPEEDX WORKS');
      expect(html).toContain('Built to Drive Measurable Success for Your Team');
      expect(html).toContain('Start Selling Now!');
      expect(html).toContain('measurable-success.png');

      // 5 steps
      expect(html).toContain('Fast-Track Discovery');
      expect(html).toContain('Collaborate on industry-specific templates to gather requirements quickly.');

      expect(html).toContain('Accelerated User Adoption');
      expect(html).toContain('Interactive knowledge-hub ensures user readiness within 30 days.');

      expect(html).toContain('Pre-visualized Architecture');
      expect(html).toContain('Includes Lead &amp; Opportunity Management, Product Catalogue, Analytics, and more.');

      expect(html).toContain('Customizable Dashboards');
      expect(html).toContain('Data-driven decision-making with easy access to reports and snapshots.');

      expect(html).toContain('Tailored Customization');
      expect(html).toContain('Pre-configured solutions and industry-specific workflows for easy customization.');
    });

    // 4. What to Expect Section
    test('renders Section 4: What to Expect With SpeedX with 3 deliverable blocks', () => {
      expect(html).toContain('what-speedx');
      expect(html).toContain('WHAT TO EXPECT WITH SPEEDX');

      // 3 blocks
      expect(html).toContain('project-delivery.svg');
      expect(html).toContain('Fixed Priced,  Fixed Timeline');

      expect(html).toContain('full-adoption.svg');
      expect(html).toContain('Full User Adoption within 30 Days');

      expect(html).toContain('roi-realization.svg');
      expect(html).toContain('ROI Realization within the First Quarter');

      expect(html).toContain('Book a Demo Now!');
    });

    // 5. Absence of extraneous sections
    test('verifies that non-SAI Digital extraneous sections are cleanly removed', () => {
      expect(html).not.toContain('id="the-pod-crisis"');
      expect(html).not.toContain('id="ai-address-normalization"');
      expect(html).not.toContain('id="dtf-technology"');
      expect(html).not.toContain('id="wms-production-flow"');
      expect(html).not.toContain('id="pricing-calculator"');
      expect(html).not.toContain('id="tiktok-sla-shield"');
      expect(html).not.toContain('id="blanks-catalog"');
      expect(html).not.toContain('id="api-terminal"');
      expect(html).not.toContain('id="speedx-faq"');
      expect(html).not.toContain('id="speedx-cta"');
    });
  });
});
