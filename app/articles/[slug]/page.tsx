import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, ArrowUpRight } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';

interface ArticleData {
  title: string;
  subtitle?: string;
  tag: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: string[];
}

const articlesMap: Record<string, ArticleData> = {
  'Concentrix-Acquires-SAI-Digital': {
    title: 'Concentrix Acquires SAI Digital to Supercharge its Digital Commerce and Customer Experience Tech Solutions',
    subtitle: 'Further strengthening its technology capabilities in the Asia Pacific region',
    tag: 'Announcement',
    date: 'September 09, 2025',
    readTime: '5 mins read',
    heroImage: '/assets/SAI_x_CNX_Announcement_Blog__1_.png',
    content: [
      'NEWARK, Calif. (Sep. 3, 2025) – Concentrix Corporation (NASDAQ: CNXC), a global technology and services leader, today announced its acquisition of SAI Digital—an end-to-end digital commerce and customer experience (CX) technology solutions company—scaling its presence in Vietnam as a strategic hub to deliver innovation and intelligent experiences for global brands.',
      'SAI Digital brings deep expertise in e-commerce and technology solutions—designing, building, and running platforms that scale. It has strategic partnerships with leading technology providers in digital commerce and CX, complemented by a proprietary AI solution suite to accelerate online businesses. The company has a strong presence in the Asia Pacific (APAC) region and an established delivery center in Vietnam that supports clients across Japan, Korea, Singapore and more.',
      'By integrating SAI Digital into its APAC business, Concentrix is boosting its digital and AI capabilities across digital commerce and customer experience, expanding its reach into high-growth markets, and building on its ability to support global clients looking to scale and grow in the region.',
      '“SAI Digital’s high-performing technical talent, deep commerce expertise, and proprietary suite of AI-powered commerce tools enhance our ability to design, build, and run intelligent commerce ecosystems for leading enterprise brands,” said Concentrix Leadership.',
      '“Joining Concentrix marks an exhilarating next step in our journey,” said the leadership team at SAI Digital. “Together, we unlock boundless opportunities to deliver transformative digital experiences on a global scale.”',
    ],
  },
  'how-to-use-MACH-architecture-in-eCommerce': {
    title: 'How to use MACH architecture in eCommerce to scale global operations',
    subtitle: 'A strategic blueprint for modern composable commerce platforms',
    tag: 'Technology',
    date: 'August 15, 2025',
    readTime: '7 mins read',
    heroImage: '/assets/image-20250416171203-2.jpeg',
    content: [
      'As consumer expectations evolve at breakneck speeds, enterprise brands are recognizing that traditional monolithic commerce platforms often hold back innovation. MACH architecture—standing for Microservices, API-first, Cloud-native SaaS, and Headless—provides the architectural backbone for the next generation of digital commerce.',
      '1. Microservices: By decoupling system capabilities into independent modular services (e.g., search, checkout, dynamic pricing, recommendation), enterprises can deploy and update individual features without risking system-wide downtime.',
      '2. API-first: All data contracts and platform capabilities are exposed via standardized REST and GraphQL APIs, allowing seamless integration with ERPs, CRMs, mobile applications, POS systems, and social commerce endpoints.',
      '3. Cloud-Native SaaS: Leveraging elastic cloud infrastructure means your commerce site automatically scales during peak flash sales and holiday shopping traffic while eliminating server maintenance overhead.',
      '4. Headless: Separating the frontend presentation layer from backend logic empowers UX designers and engineers to create bespoke, ultra-fast interfaces using modern frameworks like Next.js and React.',
      'At SAI Digital, our SmartCommerce and SpeedX accelerators empower enterprise brands to transition to composable MACH architecture incrementally without risky rip-and-replace disruptions.',
    ],
  },
  'use-MACH-architecture-in-eCommerce': {
    title: 'How to use MACH architecture in eCommerce to scale global operations',
    subtitle: 'A strategic blueprint for modern composable commerce platforms',
    tag: 'Technology',
    date: 'August 15, 2025',
    readTime: '7 mins read',
    heroImage: '/assets/image-20250416171203-2.jpeg',
    content: [
      'As consumer expectations evolve at breakneck speeds, enterprise brands are recognizing that traditional monolithic commerce platforms often hold back innovation. MACH architecture—standing for Microservices, API-first, Cloud-native SaaS, and Headless—provides the architectural backbone for the next generation of digital commerce.',
      '1. Microservices: Decoupled modular micro-units for inventory, pricing, and catalog.',
      '2. API-first: Connect effortlessly across touchpoints.',
      '3. Cloud-native SaaS: Instant auto-scaling and resilience.',
      '4. Headless: Lightning fast frontends.',
    ],
  },
};

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = articlesMap[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full bg-[#0A0D0E] text-white pt-32 sm:pt-40">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-[#25E2CC] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#25E2CC] text-black font-bold text-xs uppercase tracking-wider">
            {article.tag}
          </span>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#25E2CC]" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#25E2CC]" />
              {article.readTime}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] mb-6">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-lg sm:text-xl text-[#25E2CC] font-medium leading-relaxed">
            {article.subtitle}
          </p>
        )}
      </header>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#141718]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 space-y-6 text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <ContactBlock />
    </article>
  );
}
