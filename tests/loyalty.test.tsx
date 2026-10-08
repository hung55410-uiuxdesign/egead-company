import { describe, test, expect } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import LoyaltyPage, { metadata } from '../app/(public)/loyalty/page';

describe('SmartLoyalty Page (Framer Motion & Fidelity Verification)', () => {
  const html = renderToStaticMarkup(<LoyaltyPage />);

  describe('Page Metadata', () => {
    test('contains comprehensive SEO title and description', () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain('SmartLoyalty');
      expect(metadata.description).toContain('omnichannel retention solution');
      expect(metadata.keywords).toBeArray();
    });
  });

  describe('Section 1: Hero Section', () => {
    test('renders hero badge, title, subtitle, schedule demo CTA, and mockup', () => {
      expect(html).toContain('Our Products');
      expect(html).toContain('SMARTLOYALTY');
      expect(html).toContain('Harness omni-channel loyalty the easy way.');
      expect(html).toContain('Cultivate deeper customer relationships');
      expect(html).toContain('Schedule demo');
      expect(html).toContain('/assets/loyalty/hero-mockup.png');
      expect(html).toContain('/assets/loyalty/loyalty-bg03.mp4');
    });
  });

  describe('Section 2: Overview Section', () => {
    test('renders intro titles and video block with one pager download', () => {
      expect(html).toContain('Is your brand experience connecting or pushing away?');
      expect(html).toContain('meaningful connections and recognition for their loyalty');
      expect(html).toContain('/assets/loyalty/loyalty-video-cover.jpg');
      expect(html).toContain('One pager');
      expect(html).toContain('/assets/loyalty/SmartLoyalty_Onepager.pdf');
    });
  });

  describe('Section 3: Strategy Section (3 Cards)', () => {
    test('renders all 3 strategic cards with descriptions and mockups', () => {
      expect(html).toContain('Step into the future of O2O with SmartLoyalty');
      expect(html).toContain('Enterprise-Class Loyalty.');
      expect(html).toContain('/assets/loyalty/img1.png');
      expect(html).toContain('Intelligent and Evolving.');
      expect(html).toContain('/assets/loyalty/img2.png');
      expect(html).toContain('Social Sharing of Reward Points.');
      expect(html).toContain('/assets/loyalty/img3.png');
    });
  });

  describe('Section 4: Next-Gen Technology Bento Cards', () => {
    test('renders MACH Architecture and Blockchain cards', () => {
      expect(html).toContain('Next-gen technology');
      expect(html).toContain('MACH Architecture');
      expect(html).toContain('/assets/loyalty/loyalty-1.svg');
      expect(html).toContain('Blockchain Integration and Smart Contract Application');
      expect(html).toContain('/assets/loyalty/loyalty-2.svg');
    });
  });

  describe('Section 5: How It Works Section', () => {
    test('renders How it works heading and diagram video', () => {
      expect(html).toContain('How it works');
      expect(html).toContain('Effortless integration');
      expect(html).toContain('/assets/loyalty/loyalty-how-it-works.mp4');
    });
  });

  describe('Section 6: SAP Store Availability Banner', () => {
    test('renders SAP Store availability banner and link', () => {
      expect(html).toContain('SmartLoyalty is available on:');
      expect(html).toContain('https://store.sap.com/dcp/en/product/display-2002000100_live_v1/catalyzer-loyalty');
      expect(html).toContain('/assets/loyalty/available-on-sap-store.png');
    });
  });

  describe('Section 7: Contact Block', () => {
    test('renders contact title and CTA button', () => {
      expect(html).toContain('Transform your');
      expect(html).toContain('customer retention');
      expect(html).toContain("Let&#x27;s talk");
      expect(html).toContain('/contact-us');
    });
  });
});
