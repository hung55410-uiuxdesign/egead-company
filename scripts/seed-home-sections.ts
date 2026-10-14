import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const row1Partners = [
  { name: 'Partner 01', src: '/assets/partners/01.svg' },
  { name: 'Partner 02', src: '/assets/partners/02.svg' },
  { name: 'Partner 03', src: '/assets/partners/03.svg' },
  { name: 'Partner 04', src: '/assets/partners/04.png' },
  { name: 'Partner 05', src: '/assets/partners/05.svg' },
  { name: 'Partner 06', src: '/assets/partners/06.svg' },
  { name: 'Partner 07', src: '/assets/partners/07.svg' },
  { name: 'Partner 08', src: '/assets/partners/08.svg' },
  { name: 'Partner 09', src: '/assets/partners/09.svg' },
  { name: 'Partner 10', src: '/assets/partners/10.svg' },
  { name: 'Partner 11', src: '/assets/partners/11.svg' },
  { name: 'Partner 12', src: '/assets/partners/12.svg' },
  { name: 'Partner 13', src: '/assets/partners/13.svg' },
  { name: 'Partner 14', src: '/assets/partners/14.svg' },
  { name: 'Partner 15', src: '/assets/partners/15.svg' },
];

const row2Partners = [
  { name: 'Partner 16', src: '/assets/partners/16.svg' },
  { name: 'Partner 17', src: '/assets/partners/17.svg' },
  { name: 'Partner 18', src: '/assets/partners/18.svg' },
  { name: 'Partner 19', src: '/assets/partners/19.svg' },
  { name: 'Partner 20', src: '/assets/partners/20.svg' },
  { name: 'Partner 21', src: '/assets/partners/21.svg' },
  { name: 'Partner 22', src: '/assets/partners/22.svg' },
  { name: 'Partner 23', src: '/assets/partners/23.svg' },
  { name: 'Partner 24', src: '/assets/partners/24.svg' },
  { name: 'Partner 25', src: '/assets/partners/25.svg' },
  { name: 'Partner 26', src: '/assets/partners/26.svg' },
  { name: 'Partner 27', src: '/assets/partners/27.svg' },
  { name: 'Partner 28', src: '/assets/partners/28.svg' },
  { name: 'Partner 29', src: '/assets/partners/29.svg' },
];

async function seedHomeSections() {
  console.log('🚀 Bắt đầu nạp cấu hình Section Trang chủ vào PostgreSQL...');

  const sectionData = {
    row1Partners,
    row2Partners,
  } as unknown as Prisma.InputJsonValue;

  await prisma.homeSection.upsert({
    where: { key: 'marketplaces-partners' },
    update: {}, // An toàn dữ liệu: Không ghi đè nếu bản ghi đã tồn tại trong DB
    create: {
      key: 'marketplaces-partners',
      name: 'Khối Sàn TMĐT & Đối tác toàn cầu',
      title: "Operating Across the World's Leading Marketplaces & Platforms",
      subtitle: 'LEADING PLATFORMS & MARKETPLACES',
      description:
        'EGEAD drives cross-border e-commerce growth across major global platforms, including TikTok Shop, Shopify, Etsy, and eBay. Combining data-driven marketing via TikTok & Google Ads with streamlined fulfillment and dedicated operating tools, we help products reach international consumers efficiently.',
      data: sectionData,
      isActive: true,
      order: 1,
    },
  });

  const capabilitiesData = {
    buttonText: 'Explore All Capabilities',
    buttonHref: '/services/all-services',
    backgroundImage: '/assets/bg_services.jpg',
    items: [
      {
        num: '01',
        title: 'US Fulfillment & Logistics',
        desc: 'Fast production turnaround, reliable order processing, and full TikTok Shop US compliance for seamless cross-border delivery.',
        icon: '/assets/home-icon__1_.svg',
        href: '/speedx',
      },
      {
        num: '02',
        title: 'Multi-Channel Commerce',
        desc: 'End-to-end store operations and product listings across leading global platforms: TikTok Shop, Etsy, eBay, and Amazon.',
        icon: '/assets/home-icon__2_.svg',
        href: '/smartcommerce',
      },
      {
        num: '03',
        title: 'Digital Growth Marketing',
        desc: 'High-converting performance marketing powered by TikTok Ads, organic TikTok channels, and Google Ads to scale international sales.',
        icon: '/assets/home-icon__3_.svg',
        href: '/services/all-services',
      },
      {
        num: '04',
        title: 'Shopify Stores & Smart Tools',
        desc: 'Optimized D2C Shopify storefronts integrated with dedicated internal tools for automated order tracking, listing, and daily operations.',
        icon: '/assets/home-icon__4_.svg',
        href: '/services/all-services',
      },
    ],
  } as unknown as Prisma.InputJsonValue;

  await prisma.homeSection.upsert({
    where: { key: 'services-capabilities' },
    update: {}, // An toàn dữ liệu: Không ghi đè nếu bản ghi đã tồn tại trong DB
    create: {
      key: 'services-capabilities',
      name: 'Khối Dịch vụ & Năng lực lõi (Our Capabilities)',
      title: 'End-to-End E-Commerce Growth Ecosystem.',
      subtitle: 'Our Capabilities',
      description:
        'E-GEAD cung cấp hệ sinh thái tăng trưởng thương mại điện tử toàn diện từ dịch vụ hoàn tất đơn hàng, bán hàng đa kênh đến tiếp thị số và giải pháp công nghệ bán lẻ.',
      data: capabilitiesData,
      isActive: true,
      order: 2,
    },
  });

  const smartCXData = {
    ctaText: 'Read Customer Stories',
    ctaHref: '/our-work',
    photo1: {
      image: '/assets/success_apparel.jpg',
      alt: 'E-GEAD precision industrial DTF print-on-demand streetwear apparel',
    },
    stat1: {
      brand: 'URBANVIBE',
      tagline: 'URBANVIBE\nACHIEVED SUB-24H DISPATCH\nON TIKTOK SHOP US',
      value: '<24H',
      label: 'Average Production SLA',
    },
    widePhoto: {
      image: '/assets/success_warehouse.jpg',
      alt: 'E-GEAD high-speed automated robotics fulfillment facility',
    },
    quote: {
      quote:
        '“Egead eliminated our fulfillment delays entirely. With sub-24h industrial DTF printing and automated TikTok Shop US compliance, we scaled to 28,000 peak holiday orders with a 0.18% late dispatch rate and zero algorithmic penalties.”',
      author: 'MARCUS VANCE',
      role: 'HEAD OF GLOBAL SUPPLY CHAIN & OPERATIONS',
      brand: 'URBANVIBE',
    },
    photo2: {
      image: '/assets/success_scanner.jpg',
      alt: 'Smart barcode scan warehouse management and error-free dispatch',
    },
    stat2: {
      brand: 'HOMECRAFT',
      tagline: 'HOMECRAFT\nELIMINATED OVERSELLING &\nCUT MANUAL OPS BY 85%',
      value: '99.9%',
      label: 'WMS Barcode Scan Accuracy',
    },
  } as unknown as Prisma.InputJsonValue;

  await prisma.homeSection.upsert({
    where: { key: 'why-brands-ship' },
    update: {}, // An toàn dữ liệu: Không ghi đè nếu bản ghi đã tồn tại trong DB
    create: {
      key: 'why-brands-ship',
      name: 'Khối Lý do chọn E-GEAD (Why Brands Ship with Egead)',
      title: 'Why brands ship with Egead',
      subtitle: 'Customer Success & SLA',
      description:
        'Khối bento grid hiển thị minh chứng thực tế: chỉ số sản xuất <24h, lời chứng thực từ UrbanVibe, cơ sở kho tự động và độ chính xác WMS 99.9%.',
      data: smartCXData,
      isActive: true,
      order: 3,
    },
  });

  const testimonialsData = {
    ratingImage: '/images/star.png',
    items: [
      {
        id: 'shinosuke',
        quote:
          'The AI market intelligence platform continuously aggregates and analyzes consumer behavior across leading e-commerce marketplaces (Amazon, Etsy, eBay, TikTok Shop). Trends delivers pinpoint forecasts on high-potential product niches, automatically recommends real-time POD design ideas, and optimizes SEO listings to help sellers stay ahead of demand and scale revenue effortlessly.',
        name: 'Shinosuke',
        subtitle: 'In-depth resources to help you',
        avatar: '/assets/avatar_shinosuke.jpg',
        partnerLogo: '/assets/partners-short/01.svg',
      },
      {
        id: 'urbanvibe',
        quote:
          'Migrating our DTF printing and fulfillment operations to E-GEAD was the ultimate turning point for our brand. Sub-24h turnaround times and a 0.18% late dispatch rate across 28,000 peak holiday orders preserved our TikTok Shop US Fast Dispatch badge and drove a 180% surge in seasonal revenue.',
        name: 'Marcus Vance',
        subtitle: 'Head of Supply Chain, UrbanVibe',
        avatar: '/assets/avatar_marcus.jpg',
        partnerLogo: '/assets/partners-short/06.svg',
      },
      {
        id: 'homecraft',
        quote:
          "SmartCommerce's multi-channel automation completely eliminated overselling risks between Amazon, Etsy, and Shopify. The real-time safety buffer engine combined with 99.9% barcode scan WMS accuracy reduced manual operational overhead by 85%, saving our logistics team over 15 hours each week.",
        name: 'Elena Rostova',
        subtitle: 'Operations Director, HomeCraft',
        avatar: '/assets/avatar_elena.jpg',
        partnerLogo: '/assets/partners-short/11.svg',
      },
      {
        id: 'lumina',
        quote:
          "E-GEAD's performance marketing team transformed our unit economics, scaling blended ROAS to 4.8x while reducing acquisition costs to $8.40. Leveraging sub-24h fulfillment proof as authentic social proof in creative testing allowed us to scale daily ad spend to $25,000 profitably.",
        name: 'David Chen',
        subtitle: 'Growth Marketing Lead, Lumina DTC',
        avatar: '/assets/avatar_marcus.jpg',
        partnerLogo: '/assets/partners-short/15.svg',
      },
      {
        id: 'printwave',
        quote:
          "E-GEAD's open RESTful API infrastructure and real-time event webhooks connect directly to US production centers with under 120ms latency. From automated order routing and print file validation to carrier label injection, 100% of our order pipeline runs flawlessly with 99.9% uptime.",
        name: 'Sarah Jenkins',
        subtitle: 'VP of Engineering, PrintWave',
        avatar: '/assets/avatar_elena.jpg',
        partnerLogo: '/assets/partners-short/20.svg',
      },
    ],
  } as unknown as Prisma.InputJsonValue;

  await prisma.homeSection.upsert({
    where: { key: 'testimonials' },
    update: {}, // An toàn dữ liệu: Không ghi đè nếu bản ghi đã tồn tại trong DB
    create: {
      key: 'testimonials',
      name: 'Khối Đánh giá khách hàng (Voices of Our Sellers)',
      title: 'Voices of Our Sellers',
      subtitle: 'Testimonials',
      description:
        'Khối trình diễn 3D carousel các trích dẫn đánh giá, xếp hạng sao và thông tin đối tác/khách hàng uy tín hợp tác cùng E-GEAD.',
      data: testimonialsData,
      isActive: true,
      order: 4,
    },
  });

  const headerMenuData = {
    services: [
      {
        name: 'Strategy & Design',
        href: '/services/all-services/strategy-design',
        icon: '/assets/icon_strategy_design.svg',
      },
      {
        name: 'Data & Analytics',
        href: '/services/all-services/data-analytics',
        icon: '/assets/icon_data_analytics.svg',
      },
      {
        name: 'Enterprise Technology',
        href: '/services/all-services/enterprise-technology',
        icon: '/assets/icon_enterprise_tech.svg',
      },
      {
        name: 'Commerce & CX Operations',
        href: '/services/all-services/commerce-cx--operations',
        icon: '/assets/icon_commerce_cx.svg',
      },
    ],
    industries: [
      {
        name: 'Automotive',
        href: '/services/all-services/automotive',
        icon: '/assets/icon_automotive.svg',
      },
      {
        name: 'Banking & Insurance',
        href: '/services/all-services/banking-insurance',
        icon: '/assets/icon_banking.svg',
      },
      {
        name: 'Chemicals',
        href: '/services/all-services/chemicals',
        icon: '/assets/icon_chemicals.svg',
      },
      {
        name: 'Consumer Goods',
        href: '/services/all-services/consumer-goods',
        icon: '/assets/icon_consumergoods.svg',
      },
      {
        name: 'Fashion & Lifestyle',
        href: '/services/all-services/fashion',
        icon: '/assets/icon_fashion.svg',
      },
      {
        name: 'Health & Science',
        href: '/services/all-services/health-science',
        icon: '/assets/icon_science.svg',
      },
    ],
    partners: [
      { name: 'SAP', href: '/partners/sap' },
      { name: 'Shopify Plus', href: '/partners/shopify-plus' },
      { name: 'Sitecore', href: '/partners/site-core' },
      { name: 'Stripe', href: '/partners/stripe' },
    ],
    allServicesText: 'All Our Services',
    allServicesHref: '/services/all-services',
    allIndustriesText: 'All Industries',
    allIndustriesHref: '/services/all-services',
    allPartnersText: 'All Partners',
    allPartnersHref: '/partners',
  } as unknown as Prisma.InputJsonValue;

  await prisma.homeSection.upsert({
    where: { key: 'header-services-menu' },
    update: {}, // An toàn dữ liệu: Không ghi đè nếu bản ghi đã tồn tại trong DB
    create: {
      key: 'header-services-menu',
      name: 'Cấu hình Menu Header (Our Services Mega Menu)',
      title: 'Our Services Mega Menu',
      subtitle: 'Menu điều hướng Header',
      description: 'Cấu hình 3 cột danh sách hiển thị trên thanh Menu dropdown Our Services: Services, Industries và Partners.',
      data: headerMenuData,
      isActive: true,
      order: 99,
    },
  });

  console.log('✅ Đã nạp thành công các cấu hình Menu & Section Trang chủ!');
  await prisma.$disconnect();
}

seedHomeSections().catch(async (e) => {
  console.error('❌ Lỗi khi nạp section:', e);
  await prisma.$disconnect();
  process.exit(1);
});
