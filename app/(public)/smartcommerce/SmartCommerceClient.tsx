'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './smartcommerce.css';

// SAI signature diagonal arrow icon
const SaiArrow = ({ className = 'w-[19px] h-[18px]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z"
      fill="currentColor"
    />
  </svg>
);

// Sparkle star icon for AI Accelerator badge
const SparkleStar = () => (
  <svg
    className="smart-title-spec-icon"
    viewBox="0 0 36 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.7182 16.5C21.368 19.9784 18.5686 22.7955 15.112 30.1922C11.6555 22.7955 8.85609 19.9784 1.50586 16.5C8.85609 13.0216 11.6555 10.2045 15.112 2.80786C18.5686 10.2045 21.368 13.0216 28.7182 16.5Z"
      fill="#141616"
    />
  </svg>
);

// Category Types matching SAI Digital cardsFilter
type CategoryKey =
  | 'all'
  | 'exp'
  | 'inv'
  | 'mak'
  | 'ord'
  | 'ins'
  | 'prp'
  | 'sed'
  | 'ana';

interface CategoryTab {
  id: CategoryKey;
  label: string;
}

const CATEGORIES: CategoryTab[] = [
  { id: 'all', label: 'All' },
  { id: 'exp', label: 'Customer Experience' },
  { id: 'inv', label: 'Inventory & Logistics' },
  { id: 'mak', label: 'Marketing & Content' },
  { id: 'ord', label: 'Order Management' },
  { id: 'ins', label: 'Market Insights' },
  { id: 'prp', label: 'Pricing & Promotions' },
  { id: 'sed', label: 'Search & Discovery' },
  { id: 'ana', label: 'Analytics & Decisions' },
];

interface ModuleItem {
  id: number;
  title: string;
  categories: string[];
  descHtml: string;
  imageFront: string;
  imageHover: string;
  useVideo: boolean;
  video: string | null;
}

// 31 AI Modules in exact SAI Digital CMS order with authentic images and videos
const MODULES_DATA: ModuleItem[] = [
  {
    id: 1,
    title: 'Hyper-Personalized Marketing and Content Creation',
    categories: ['all', 'exp'],
    descHtml:
      '<p>Deliver tailored messages that speak directly to each customer, increasing engagement and driving more sales.</p>',
    imageFront: '/images/smartcommerce/1a.jpg',
    imageHover: '/images/smartcommerce/1b.jpg',
    useVideo: true,
    video: '/images/smartcommerce/1v.mp4',
  },
  {
    id: 2,
    title: 'Dynamic Pricing and Promotions',
    categories: ['all', 'prp'],
    descHtml:
      '<p>Adjust prices in real-time based on market conditions, maximizing profits while staying competitive.</p>',
    imageFront: '/images/smartcommerce/4a.jpg',
    imageHover: '/images/smartcommerce/4b.jpg',
    useVideo: true,
    video: '/images/smartcommerce/4v.mp4',
  },
  {
    id: 3,
    title: 'Dynamic Content Delivery',
    categories: ['all', 'mak'],
    descHtml:
      '<p>Serve the right content at the right time, enhancing user experience and increasing conversion rates.</p>',
    imageFront: '/images/smartcommerce/7c.jpg',
    imageHover: '/images/smartcommerce/7d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 4,
    title: 'Channel-specific Content Tailoring',
    categories: ['all', 'mak'],
    descHtml:
      '<p>Optimize content for each platform, increasing engagement and conversion rates across all channels.</p>',
    imageFront: '/images/smartcommerce/10c.jpg',
    imageHover: '/images/smartcommerce/10d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 5,
    title: 'Beyond Keywords: Top 10 Searches Powered by AI',
    categories: ['all', 'ins'],
    descHtml:
      '<p>Understand customer intent and improve search results by identifying trending queries and topics.</p>',
    imageFront: '/images/smartcommerce/13a.jpg',
    imageHover: '/images/smartcommerce/13b.jpg',
    useVideo: true,
    video: '/images/smartcommerce/13v.mp4',
  },
  {
    id: 6,
    title: 'Inventory Optimization',
    categories: ['all', 'inv'],
    descHtml:
      '<p>Balance stock levels more accurately, reducing costs while ensuring product availability to meet customer demand.</p>',
    imageFront: '/images/smartcommerce/16c.jpg',
    imageHover: '/images/smartcommerce/16d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 7,
    title: 'Backorder Management',
    categories: ['all', 'ord'],
    descHtml:
      '<p>Keep customers informed and satisfied with AI-driven updates on backordered items and expected availability.</p>',
    imageFront: '/images/smartcommerce/19c.jpg',
    imageHover: '/images/smartcommerce/19d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 8,
    title: 'Chatbot Support for Return Inquiries',
    categories: ['all', 'exp'],
    descHtml:
      '<p>Provide instant, 24/7 assistance for return questions, streamlining the process and reducing support load.</p>',
    imageFront: '/images/smartcommerce/22a.jpg',
    imageHover: '/images/smartcommerce/22b.jpg',
    useVideo: true,
    video: '/images/smartcommerce/22v.mp4',
  },
  {
    id: 9,
    title: 'Personalized Customer Communication During Returns',
    categories: ['all', 'ord'],
    descHtml:
      '<p>Keep customers informed and engaged throughout the return process with tailored, timely updates.</p>',
    imageFront: '/images/smartcommerce/25c.jpg',
    imageHover: '/images/smartcommerce/25d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 10,
    title: 'Smart Cart',
    categories: ['all', 'exp'],
    descHtml:
      '<p>Guide customers to complete their purchases with AI-driven suggestions for forgotten or related items.</p>',
    imageFront: '/images/smartcommerce/28c.jpg',
    imageHover: '/images/smartcommerce/28d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 11,
    title: 'Chatbots and Virtual Assistants',
    categories: ['all', 'exp'],
    descHtml:
      '<p>Provide instant, accurate answers to customer queries 24/7, improving satisfaction and reducing support costs.</p>',
    imageFront: '/images/smartcommerce/2c.jpg',
    imageHover: '/images/smartcommerce/2d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 12,
    title: 'Customer Segmentation and Targeting',
    categories: ['all', 'ana'],
    descHtml:
      '<p>Identify and reach your most valuable customer groups, focusing resources where they matter most.</p>',
    imageFront: '/images/smartcommerce/5c.jpg',
    imageHover: '/images/smartcommerce/5d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 13,
    title: 'Content Quality Control',
    categories: ['all', 'mak'],
    descHtml:
      '<p>Ensure consistent, high-quality content across all channels, maintaining brand standards and customer trust.</p>',
    imageFront: '/images/smartcommerce/8a.jpg',
    imageHover: '/images/smartcommerce/8b.jpg',
    useVideo: true,
    video: '/images/smartcommerce/8v.mp4',
  },
  {
    id: 14,
    title: 'Automated Content Resizing and Formatting',
    categories: ['all', 'mak'],
    descHtml:
      '<p>Save time and ensure consistency by automatically adapting content to fit any screen or platform.</p>',
    imageFront: '/images/smartcommerce/11a.jpg',
    imageHover: '/images/smartcommerce/11b.jpg',
    useVideo: false,
    video: '/images/smartcommerce/11v.mp4',
  },
  {
    id: 15,
    title: 'Top 10 Browsed Categories',
    categories: ['all', 'sed'],
    descHtml:
      '<p>Stay ahead of market trends by identifying and capitalizing on the most popular product categories.</p>',
    imageFront: '/images/smartcommerce/14c.jpg',
    imageHover: '/images/smartcommerce/14d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 16,
    title: 'Automated Stock Out Alerts',
    categories: ['all', 'inv'],
    descHtml:
      '<p>Prevent lost sales with timely, AI-driven notifications on low stock and reorder recommendations.</p>',
    imageFront: '/images/smartcommerce/17c.jpg',
    imageHover: '/images/smartcommerce/17d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 17,
    title: 'Logistics Optimizer',
    categories: ['all', 'inv'],
    descHtml:
      '<p>Enhance delivery efficiency and reduce costs with AI-powered route optimization and warehouse management.</p>',
    imageFront: '/images/smartcommerce/20a.jpg',
    imageHover: '/images/smartcommerce/20b.jpg',
    useVideo: true,
    video: '/images/smartcommerce/20v.mp4',
  },
  {
    id: 18,
    title: 'Automated Inventory Replenishment',
    categories: ['all', 'inv'],
    descHtml:
      '<p>Maintain optimal stock levels automatically, reducing stockouts and overstock situations for improved cash flow.</p>',
    imageFront: '/images/smartcommerce/23c.jpg',
    imageHover: '/images/smartcommerce/23d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 19,
    title: 'Delivery Method Optimization',
    categories: ['all', 'inv'],
    descHtml:
      '<p>Select the most cost-effective and timely shipping options automatically, balancing speed and expenses.</p>',
    imageFront: '/images/smartcommerce/26c.jpg',
    imageHover: '/images/smartcommerce/26d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 20,
    title: 'Intelligent Product Pairing',
    categories: ['all', 'sed'],
    descHtml:
      '<p>Enhance cross-selling by automatically identifying and recommending products that work well together.</p>',
    imageFront: '/images/smartcommerce/29c.jpg',
    imageHover: '/images/smartcommerce/29d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 21,
    title: 'Personalized Product Recommendation',
    categories: ['all', 'exp'],
    descHtml:
      '<p>Help customers find products they love, boosting average order value and encouraging repeat purchases.</p>',
    imageFront: '/images/smartcommerce/3c.jpg',
    imageHover: '/images/smartcommerce/3d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 22,
    title: 'Category Tagging, Product List, Related Keywords',
    categories: ['all', 'sed'],
    descHtml:
      '<p>Automatically organize and link products, improving searchability and discovery for increased sales opportunities.</p>',
    imageFront: '/images/smartcommerce/6c.jpg',
    imageHover: '/images/smartcommerce/6d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 23,
    title: 'A/B Testing for Cross-Channel Optimization',
    categories: ['all', 'ana'],
    descHtml:
      '<p>Continuously improve marketing performance by automatically testing and optimizing across all customer touchpoints.</p>',
    imageFront: '/images/smartcommerce/9c.jpg',
    imageHover: '/images/smartcommerce/9d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 24,
    title: 'Real-time Content Updates',
    categories: ['all', 'ana'],
    descHtml:
      '<p>Keep your content fresh and relevant with AI-powered updates based on current trends and data.</p>',
    imageFront: '/images/smartcommerce/12c.jpg',
    imageHover: '/images/smartcommerce/12d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 25,
    title: 'Top 10 Trending Product Categories',
    categories: ['all', 'ins'],
    descHtml:
      '<p>Gain insights into customer interests and optimize your product offerings based on browsing patterns.</p>',
    imageFront: '/images/smartcommerce/15c.jpg',
    imageHover: '/images/smartcommerce/15d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 26,
    title: 'Demand Forecasting',
    categories: ['all', 'inv'],
    descHtml:
      '<p>Predict future sales trends accurately, optimizing inventory and reducing overstock or stockout situations.</p>',
    imageFront: '/images/smartcommerce/18a.jpg',
    imageHover: '/images/smartcommerce/18b.jpg',
    useVideo: false,
    video: '/images/smartcommerce/18v.mp4',
  },
  {
    id: 27,
    title: 'Self-Service Return Portals',
    categories: ['all', 'ord'],
    descHtml:
      '<p>Enable customers to initiate returns easily, reducing support costs and improving satisfaction.</p>',
    imageFront: '/images/smartcommerce/21c.jpg',
    imageHover: '/images/smartcommerce/21d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 28,
    title: 'Automated Order Validation and Fraud Detection',
    categories: ['all', 'ord'],
    descHtml:
      '<p>Protect your business and customers with AI-powered real-time order screening and risk assessment.</p>',
    imageFront: '/images/smartcommerce/24c.jpg',
    imageHover: '/images/smartcommerce/24d.jpg',
    useVideo: false,
    video: null,
  },
  {
    id: 29,
    title: 'Most Purchased Brand in Every Category',
    categories: ['all', 'ins'],
    descHtml:
      '<p>Leverage purchasing trends to optimize inventory and marketing strategies for increased sales.</p>',
    imageFront: '/images/smartcommerce/27c.jpg',
    imageHover: '/images/smartcommerce/27d.jpg',
    useVideo: true,
    video: '/images/smartcommerce/27v.mp4',
  },
  {
    id: 30,
    title: 'Smart Product Substitutions',
    categories: ['all', 'exp'],
    descHtml:
      '<p>Maintain sales when items are out of stock by suggesting the most relevant alternatives.</p>',
    imageFront: '/images/smartcommerce/30c.jpg',
    imageHover: '/images/smartcommerce/30d.jpg',
    useVideo: false,
    video: '/images/smartcommerce/30v.mp4',
  },
  {
    id: 31,
    title: 'Top Brand for Customer Satisfaction',
    categories: ['all', 'prp'],
    descHtml:
      '<p>Highlight top-performing brands based on customer feedback, boosting trust and guiding purchasing decisions.</p>',
    imageFront: '/images/smartcommerce/31c.jpg',
    imageHover: '/images/smartcommerce/31d.jpg',
    useVideo: false,
    video: null,
  },
];

export default function SmartCommerceClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const filteredModules = MODULES_DATA.filter((module) => {
    if (activeCategory === 'all') return true;
    return module.categories.includes(activeCategory);
  });

  return (
    <main className="smartcommerce-page">
      {/* 1. Hero Section (.smartcommerce-area) */}
      <section className="smartcommerce-area">
        <div className="smart-inner">
          <div className="smart-logo">
            <img
              src="/images/smartcommerce/Logo_SmartCommerce.png"
              alt="SmartCommerce Logo"
            />
          </div>
          <div className="smart-title">
            <div className="smart-title-row1">
              <span className="smart-title-spec">
                <SparkleStar />
                AI Accelerator
              </span>
              for
            </div>
            <div className="smart-title-row2">Enterprise Commerce.</div>
          </div>
          <p className="smart-desc">
            Shift from transactional to intelligent commerce, faster.
          </p>
          <Link href="/contact-us" className="smart-button">
            <SaiArrow />
            Schedule demo
          </Link>
        </div>
        <div className="smart-bkg">
          <img
            src="/images/smartcommerce/BG_01.jpg"
            alt="Hero background graphic"
          />
        </div>
      </section>

      {/* 2. Compatible With Section (.logo-slider) */}
      <section className="logo-slider">
        <p className="logo-slider__subtitle">Compatible with</p>
        <div className="logo-slider__list">
          <div className="logo-slider__item">
            <img src="/images/smartcommerce/logo_SAP.png" alt="SAP" />
          </div>
          <div className="logo-slider__item">
            <img src="/images/smartcommerce/logo_Sitecore.png" alt="Sitecore" />
          </div>
          <div className="logo-slider__item">
            <img src="/images/smartcommerce/logo_shopify.svg" alt="Shopify" />
          </div>
          <div className="logo-slider__item">
            <img src="/images/smartcommerce/logo_BigCommerce.png" alt="BigCommerce" />
          </div>
          <div className="logo-slider__item">
            <img src="/images/smartcommerce/logo__WooCommerce.png" alt="WooCommerce" />
          </div>
        </div>
      </section>

      {/* 3. Block 1: 30+ AI Modules & Strategic Objectives (.smart-block1) */}
      <section className="smart-block1">
        <div className="smart-block1-icon">
          <img src="/images/smartcommerce/icon_sparkle3.png" alt="Sparkle" />
        </div>
        <div className="smart-block1-title">
          <span className="smart-block1-title-gradient">30+ AI modules</span>
          <span>strategically designed to</span>
        </div>
        <div className="smart-block1-list">
          <div>
            accelerate growth
            <img src="/images/smartcommerce/icon_Growth.svg" alt="Growth" />
          </div>
          <div>
            boost efficiency
            <img src="/images/smartcommerce/icon_Efficiency.svg" alt="Efficiency" />
          </div>
          <div>
            &amp; transform
            <img src="/images/smartcommerce/icon_Transform.svg" alt="Transform" />
          </div>
        </div>
        <div className="smart-block1-desc">
          every facet of your enterprise digital commerce ecosystem.
        </div>
      </section>

      {/* 4. Background Overlay Graphic */}
      <div className="smart-background">
        <img src="/images/smartcommerce/BG_02.jpg" alt="Background pattern" />
      </div>

      {/* 5. Main AI Module Grid & Filter Toolbar (.smart-main) */}
      <section className="smart-main-container">
        <div className="smart-main-toolbar">
          <ul className="smart-main-toolbar-inner">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-text ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="smart-main-list">
          {filteredModules.map((module) => (
            <div key={module.id} className="sml-element active">
              <div className="sml-element-inner">
                <div className="sml-top">
                  <div className="sml-title">{module.title}</div>
                  <div
                    className="sml-desc"
                    dangerouslySetInnerHTML={{ __html: module.descHtml }}
                  />
                </div>
                <div
                  className={`sml-media media-type-${
                    module.useVideo && module.video ? 'video' : 'image'
                  }`}
                >
                  <div className="sml-img">
                    <img
                      className="sml-img-front"
                      src={module.imageFront}
                      alt={module.title}
                      loading="lazy"
                    />
                    <img
                      className="sml-img-hover"
                      src={module.imageHover}
                      alt={`${module.title} preview`}
                      loading="lazy"
                    />
                  </div>
                  {module.useVideo && module.video && (
                    <div className="sml-video">
                      <video
                        src={module.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Block 2: AI Applications across Industries (.smart-block2) */}
      <section className="smart-block2">
        <div className="smart-block2-icon">
          <img src="/images/smartcommerce/icon_sparkle3.png" alt="Sparkle" />
        </div>
        <div className="smart-block2-title">
          <p>AI applications</p>
          <p>across major industries</p>
        </div>
        <div className="smart-block2-list">
          <div>
            <img src="/images/smartcommerce/icon_Retail.svg" alt="Retail" />
            Retail
          </div>
          <div>
            <img src="/images/smartcommerce/icon_Fashion.svg" alt="Fashion & Apparel" />
            Fashion &amp; Apparel
          </div>
          <div>
            <img src="/images/smartcommerce/icon_Consumer.svg" alt="Consumer Electronics" />
            Consumer Electronics
          </div>
          <div>
            <img src="/images/smartcommerce/icon_FnB.svg" alt="Food and Beverage" />
            Food and Beverage
          </div>
          <div>
            <img src="/images/smartcommerce/icon_TravelnHospitality.svg" alt="Travel and Hospitality" />
            Travel and Hospitality
          </div>
          <div>
            <img src="/images/smartcommerce/icon_Health.svg" alt="Health and Wellness" />
            Health and Wellness
          </div>
          <div>
            <img src="/images/smartcommerce/icon_Automotive.svg" alt="Automotive" />
            Automotive
          </div>
          <div>
            <img src="/images/smartcommerce/icon_Beauty.svg" alt="Beauty and Healthcare" />
            Beauty and Healthcare
          </div>
          <div>
            <img src="/images/smartcommerce/icon_HomenGarden.svg" alt="Home & Garden" />
            Home &amp; Garden
          </div>
          <div>
            <img src="/images/smartcommerce/icon_Manufacturing.svg" alt="Manufacturing" />
            Manufacturing
          </div>
        </div>
      </section>

      {/* 7. Contact CTA Block (.contact-block) */}
      <section className="contact-block">
        <h2 className="contact-block__title">
          Don't Let Competition
          <br />
          Outpace You.
        </h2>
        <Link href="/contact-us" className="ant-btn">
          Let's Talk
        </Link>
      </section>
    </main>
  );
}
