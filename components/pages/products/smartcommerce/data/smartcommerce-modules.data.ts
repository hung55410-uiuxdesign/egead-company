export type ModuleItem = {
  id: number;
  title: string;
  categories: string[];
  descHtml: string;
  imageFront: string;
  imageHover: string;
  useVideo: boolean;
  video: string | null;
}

export const MODULES_DATA: ModuleItem[] = [
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
