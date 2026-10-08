import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SmartPricePage, { metadata } from '../app/(public)/(products)/smartprice/page';

describe('SmartPrice Page (Framer Motion & Fidelity Verification)', () => {
  const html = renderToStaticMarkup(<SmartPricePage />);

  describe('Page Metadata', () => {
    test('contains comprehensive SEO title and description', () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain('SmartPrice');
      expect(metadata.description).toContain('AI/ML');
      expect(metadata.keywords).toBeArray();
    });
  });

  describe('Section 1: Hero Section', () => {
    test('renders hero title, heading, description, schedule demo CTA, and mockup', () => {
      expect(html).toContain('SMARTPRICE');
      expect(html).toContain('Maximize profits on pre-owned products.');
      expect(html).toContain('Catalyzer SmartPrice uses real-time intelligence');
      expect(html).toContain('Schedule Demo');
      expect(html).toContain('/assets/smartprice/Top.png');
      expect(html).toContain('/assets/smartprice/SmartPrice_BG.mp4');
      expect(html).toContain('smartprice-hero__ambient-glow');
    });
  });

  describe('Section 2: Overview Section', () => {
    test('renders intro titles and video block with one pager download', () => {
      expect(html).toContain('Don&#x27;t let your profits be lost in the guessing game');
      expect(html).toContain('Finding the sweet spot for pre-owned product pricing');
      expect(html).toContain('/assets/smartprice/SmartPrice.jpg');
      expect(html).toContain('One pager');
      expect(html).toContain('/assets/smartprice/OnePager.pdf');
    });
  });

  describe('Section 3: Strategy Section (2 Cards)', () => {
    test('renders strategy header and both strategic cards with descriptions and mockups', () => {
      expect(html).toContain('The future of pricing strategies');
      expect(html).toContain('Streamline your appraisal &amp; pricing process.');
      expect(html).toContain('/assets/smartprice/Img2.png');
      expect(html).toContain('Generate profitable pricing with real-time market intelligence.');
      expect(html).toContain('/assets/smartprice/Img1.png');
    });
  });

  describe('Section 4: How It Works Section', () => {
    test('renders How it works heading and diagram video', () => {
      expect(html).toContain('How it works');
      expect(html).toContain('AI-Driven');
      expect(html).toContain('SmartPrice.');
      expect(html).toContain('/assets/smartprice/Diagram_Desktop.mp4');
    });
  });

  describe('Section 5: SAP Store Availability Banner', () => {
    test('renders SAP Store availability banner and link', () => {
      expect(html).toContain('Catalyzer SmartPrice is available on:');
      expect(html).toContain('https://store.sap.com/dcp/en/product/display-2001016288_live_v1/catalyzer-smartprice');
      expect(html).toContain('/assets/smartprice/Available-on-SAP-Store.png');
    });
  });

  describe('Section 6: Contact Block', () => {
    test('renders contact title and CTA button', () => {
      expect(html).toContain('Boost profits');
      expect(html).toContain('with SmartPrice.');
      expect(html).toContain("Let&#x27;s talk");
      expect(html).toContain('/contact-us');
    });
  });
});
