import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const initialCompanySections = [
  {
    key: 'company-hero',
    name: 'Khối Mở đầu (Hero Banner)',
    subtitle: 'Our Values',
    title: 'Transform today, lead tomorrow.',
    description: 'Khối banner mở đầu giới thiệu thông điệp tầm nhìn và hình ảnh trụ sở / mạng lưới toàn cầu E-GEAD.',
    order: 1,
    isActive: true,
    data: {
      subtitle: 'Our Values',
      titlePart1: 'Transform today,',
      titlePart2: 'lead tomorrow.',
      image: '/assets/Rectangle_539.jpg',
      badgeText: 'Buon Ma Thuot HQ & US Fulfillment Network',
      alt: 'E-GEAD Global Transformation',
    },
  },
  {
    key: 'company-intro',
    name: 'Khối Giới thiệu & Định vị giải pháp (Intro)',
    subtitle: 'End-to-end enterprise commerce solutions',
    title: 'We consult Customer Experience transformation across all business functions.',
    description: 'Mô tả chi tiết về mô hình vận hành lai ghép, năng lực kỹ thuật và chuỗi cung ứng fulfillment sub-24h.',
    order: 2,
    isActive: true,
    data: {
      paragraphs: [
        'With our hybrid operations and technology model, we fuse empathetic creative thinking, robust solution architecture capabilities, marketing abilities, and intelligence to drive operational efficiencies that help businesses scale and evolve rapidly.',
        'Our portfolio spans various verticals—from manufacturing, retail, distribution, and fast-moving consumer goods to custom print-on-demand and apparel—boasting collaborations with ambitious brands and sellers across more than 10 countries.',
        'Headquartered with our primary engineering hub in Buon Ma Thuot, Vietnam, paired with high-volume US fulfillment facilities guaranteeing sub-24h order dispatch, we eliminate 99% of manual fulfillment bottlenecks with automated precision.',
      ],
    },
  },
  {
    key: 'company-4d-method',
    name: 'Khối Phương pháp 4D (4D Method Process)',
    subtitle: 'Our 4D Method',
    title: 'End-to-end innovative and forward-thinking solutions to make digital commerce simpler to navigate.',
    description: 'Quy trình 4 bước Design - Build - Run - Grow tối ưu hành trình thương mại số.',
    order: 3,
    isActive: true,
    data: {
      videoUrl: '/assets/4D_Method_2026_Desktop_.mp4',
      steps: [
        {
          step: 1,
          name: 'Design',
          tagline: 'Architect Strategies.',
          description: 'We blueprint conversion using Concentrix TPS design and data insights.',
        },
        {
          step: 2,
          name: 'Build',
          tagline: 'Deploy Faster.',
          description: 'We launch platforms in 6-8 months using pre-built TPS accelerators.',
        },
        {
          step: 3,
          name: 'Run',
          tagline: 'Operate Reliably.',
          description: 'We safeguard business continuity with 24/7 support and 99.9% uptime.',
        },
        {
          step: 4,
          name: 'Grow',
          tagline: 'Drive Revenue.',
          description: 'We drive revenue through data-driven marketing and continuous optimization.',
        },
      ],
    },
  },
  {
    key: 'company-value-system',
    name: 'Khối Hệ giá trị (Value System Cards)',
    subtitle: 'Value System',
    title: 'We believe in building transformative experiences to empower individuals, businesses and communities.',
    description: '3 thẻ giá trị cốt lõi: Outperforming expectations, Breaking new grounds, và Giving back.',
    order: 4,
    isActive: true,
    data: {
      items: [
        {
          number: '01',
          icon: '/assets/icon1.png',
          title: 'Outperforming expectations.',
          description:
            'Our rigorous Project Excellence Assurance methodology (PEA) and sub-24h US fulfillment ensure order delivery within committed timelines, maintaining flawless marketplace SLA metrics.',
        },
        {
          number: '02',
          icon: '/assets/Icon_2.svg',
          title: 'Breaking new grounds.',
          description:
            'Our relentless focus leveraging AI address normalization, multi-channel catalog orchestration, and barcode WMS builds the fastest, most reliable path to market.',
        },
        {
          number: '03',
          icon: '/assets/Icon_3.svg',
          title: 'Giving back.',
          description:
            'Our focus is on building an exemplary engineering culture in Buon Ma Thuot that emphasizes diversity, software talent development, and transparent equal opportunity empowerment.',
        },
      ],
    },
  },
  {
    key: 'company-case-studies',
    name: 'Khối Khách hàng & Đối tác công nghệ (Marquee Logos)',
    subtitle: 'Clients & Technology Partners',
    title: 'We work with established global enterprises and ambitious brands.',
    description: '2 dải logo marquee hiển thị danh sách Khách hàng doanh nghiệp và Đối tác công nghệ chiến lược.',
    order: 5,
    isActive: true,
    data: {
      clientsSubtitle: 'Clients',
      clientsTitle: 'We work with established global enterprises and ambitious brands.',
      clients: [
        { name: 'HRS', src: '/assets/logo_hrs.svg' },
        { name: 'Kashiwagi', src: '/assets/logo_kashiwagi.svg' },
        { name: 'Suntory', src: '/assets/logo_suntory.svg' },
        { name: 'Manulife', src: '/assets/logo_manulife.svg' },
        { name: 'Jim Thompson', src: '/assets/logo_jimthompson.svg' },
        { name: 'TCI', src: '/assets/logo_tci.svg' },
        { name: 'Toyota', src: '/assets/logo_toyota.svg' },
        { name: 'Brother', src: '/assets/logo_brother.svg' },
        { name: 'Beauty Garage', src: '/assets/logo_beautygarage.svg' },
        { name: 'Weir', src: '/assets/logo_weir.svg' },
        { name: 'Saitex', src: '/assets/logo_saitex.svg' },
        { name: 'Dinner Ladies', src: '/assets/logo_dinnerladies.svg' },
        { name: 'Edwin', src: '/assets/logo_edwin.svg' },
        { name: 'Beisia', src: '/assets/logo_beisia.svg' },
      ],
      servicesSubtitle: 'Services',
      servicesTitle: 'We are partnering with leading tech providers.',
      servicePartners: [
        { name: 'SAP Silver', src: '/assets/logo_sapsilver.svg' },
        { name: 'Klaviyo', src: '/assets/logo_klaviyo.svg' },
        { name: 'Emarsys', src: '/assets/logo_emarsys.svg' },
        { name: 'Sitecore', src: '/assets/logo_Sitecore.png' },
        { name: 'Stripe', src: '/assets/logo_stripe.svg' },
        { name: 'Qualtrics', src: '/assets/logo_qualtrics.svg' },
        { name: 'Magento', src: '/assets/logo_magento.svg' },
        { name: 'Shopify', src: '/assets/logo_shopify.svg' },
        { name: 'Salesforce', src: '/assets/logo_salesforce.svg' },
        { name: 'CommerceTools', src: '/assets/logo_commercetools.svg' },
      ],
    },
  },
  {
    key: 'company-portals',
    name: 'Khối Điều hướng Nhân sự & Tuyển dụng (Portals)',
    subtitle: 'Our Portals',
    title: 'Meet the people & Explore opportunities',
    description: 'Ảnh không gian văn phòng lớn cùng 2 thẻ điều hướng sang trang Nhân sự và Cơ hội việc làm.',
    order: 6,
    isActive: true,
    data: {
      bannerImage: '/assets/company.png',
      bannerAlt: 'E-GEAD People and Technology Hub',
      peopleCard: {
        subtitle: 'Our People',
        title: 'Meet the people behind your success.',
        icon: '/assets/icon31.svg',
        hoverIcon: '/assets/icon32.svg',
        buttonText: 'Our people',
        buttonHref: '/people',
      },
      careersCard: {
        subtitle: 'Job Opportunities',
        title: 'Be a Part of our wonderful team.',
        icon: '/assets/Name_Job_Opportunities__Color_BnW.svg',
        hoverIcon: '/assets/Name_Job_Opportunities__Color_Colorful.svg',
        buttonText: 'Careers',
        buttonHref: '/careers',
      },
    },
  },
  {
    key: 'company-contact',
    name: 'Khối Kêu gọi hành động & Tư vấn (Contact CTA)',
    subtitle: 'Get in touch',
    title: "Let's automate your e-commerce operations.",
    description: 'Khối CTA nổi bật cuối trang dẫn tới form liên hệ tư vấn tự động hóa thương mại điện tử.',
    order: 7,
    isActive: true,
    data: {
      buttonText: 'Get Free Consultation',
      buttonHref: '/contact-us',
    },
  },
];

export async function seedCompanySections() {
  console.log('🚀 Bắt đầu nạp cấu hình Section Trang Company vào PostgreSQL...');

  for (const s of initialCompanySections) {
    await (prisma as any).companySection.upsert({
      where: { key: s.key },
      update: {}, // An toàn dữ liệu: Không ghi đè nếu bản ghi đã tồn tại trong DB
      create: {
        key: s.key,
        name: s.name,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        data: s.data as unknown as Prisma.InputJsonValue,
        isActive: s.isActive,
        order: s.order,
      },
    });
    console.log(`✅ Đã nạp/kiểm tra section: ${s.name} (${s.key})`);
  }

  console.log('🎉 Hoàn tất nạp dữ liệu sections trang Company!');
}

if (require.main === module || process.argv[1]?.endsWith('seed-company-sections.ts')) {
  seedCompanySections()
    .catch((e) => {
      console.error('❌ Lỗi khi nạp sections trang Company:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
