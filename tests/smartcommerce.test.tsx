import { describe, test, expect } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import SmartCommercePage, {
  metadata,
} from "../app/(public)/smartcommerce/page";

describe("SmartCommerce Page (Authentic SAI Digital Match)", () => {
  const html = renderToStaticMarkup(<SmartCommercePage />);

  describe("Page Metadata", () => {
    test("contains accurate SEO title and description", () => {
      expect(metadata).toBeDefined();
      expect(metadata.title).toContain("SmartCommerce Solutions and Insights");
      expect(metadata.description).toContain("SmartCommerce");
      expect(metadata.description).toContain("SAI Digital");
    });
  });

  describe("Hero Section", () => {
    test("renders AI Accelerator badge, headline, and Schedule demo CTA", () => {
      expect(html).toContain("AI Accelerator");
      expect(html).toContain("Enterprise Commerce.");
      expect(html).toContain("Shift from transactional to intelligent commerce, faster.");
      expect(html).toContain("Schedule demo");
      expect(html).toContain("/images/smartcommerce/Logo_SmartCommerce.png");
      expect(html).toContain("/images/smartcommerce/BG_01.jpg");
    });
  });

  describe("Compatible With Section", () => {
    test("renders partner platform logos from public/assets/partners", () => {
      expect(html).toContain("Compatible with");
      expect(html).toContain("/assets/partners/09.svg");
      expect(html).toContain("/assets/partners/02.svg");
      expect(html).toContain("/assets/partners/03.svg");
      expect(html).toContain("/assets/partners/20.svg");
      expect(html).toContain("/assets/partners/17.svg");
      expect(html).toContain("/assets/partners/24.svg");
      expect(html).toContain("/assets/partners/26.svg");
      expect(html).toContain("/assets/partners/01.svg");
    });
  });

  describe("30+ AI Modules Capability Block", () => {
    test("renders capability badges with exact icons", () => {
      expect(html).toContain("30+ AI modules");
      expect(html).toContain("strategically designed to");
      expect(html).toContain("accelerate growth");
      expect(html).toContain("boost efficiency");
      expect(html).toContain("&amp; transform");
      expect(html).toContain("/images/smartcommerce/icon_Growth.svg");
      expect(html).toContain("/images/smartcommerce/icon_Efficiency.svg");
      expect(html).toContain("/images/smartcommerce/icon_Transform.svg");
    });
  });

  describe("Module Filtering & Authentic 31 Cards", () => {
    test("renders all 9 category filters", () => {
      expect(html).toContain("All");
      expect(html).toContain("Customer Experience");
      expect(html).toContain("Inventory &amp; Logistics");
      expect(html).toContain("Marketing &amp; Content");
      expect(html).toContain("Order Management");
      expect(html).toContain("Market Insights");
      expect(html).toContain("Pricing &amp; Promotions");
      expect(html).toContain("Search &amp; Discovery");
      expect(html).toContain("Analytics &amp; Decisions");
    });

    test("renders authentic cards with images from sai-digital.com", () => {
      // First card
      expect(html).toContain("Hyper-Personalized Marketing and Content Creation");
      expect(html).toContain("/images/smartcommerce/1a.jpg");
      expect(html).toContain("/images/smartcommerce/1b.jpg");
      // Mid cards
      expect(html).toContain("Dynamic Pricing and Promotions");
      expect(html).toContain("/images/smartcommerce/4a.jpg");
      expect(html).toContain("Smart Cart");
      expect(html).toContain("/images/smartcommerce/28c.jpg");
      // Last card
      expect(html).toContain("Top Brand for Customer Satisfaction");
      expect(html).toContain("/images/smartcommerce/31c.jpg");
      expect(html).toContain("/images/smartcommerce/31d.jpg");
    });
  });

  describe("Industry Applications Section", () => {
    test("renders all 10 major industry badges with icons", () => {
      expect(html).toContain("AI applications");
      expect(html).toContain("across major industries");
      expect(html).toContain("Retail");
      expect(html).toContain("Fashion &amp; Apparel");
      expect(html).toContain("Consumer Electronics");
      expect(html).toContain("Food and Beverage");
      expect(html).toContain("Travel and Hospitality");
      expect(html).toContain("Health and Wellness");
      expect(html).toContain("Automotive");
      expect(html).toContain("Beauty and Healthcare");
      expect(html).toContain("Home &amp; Garden");
      expect(html).toContain("Manufacturing");
      expect(html).toContain("/images/smartcommerce/icon_Retail.svg");
      expect(html).toContain("/images/smartcommerce/icon_Manufacturing.svg");
    });
  });

  describe("Contact CTA Block", () => {
    test("renders high-impact headline and Let's Talk button", () => {
      expect(html).toContain("Don&#x27;t Let Competition");
      expect(html).toContain("Outpace You.");
      expect(html).toContain("Let&#x27;s Talk");
    });
  });
});
