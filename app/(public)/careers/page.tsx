import React from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import ContactBlock from '@/components/ContactBlock';
import MotionSection, { MotionHero, MotionDiv, MotionCard } from '@/components/MotionSection';
import { getPublicJobOpenings } from '@/lib/careers';
import CareerJobsList from '@/components/CareerJobsList';
import CareerMomentsBento from '@/components/CareerMomentsBento';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Explore Exciting Career Opportunities at E-GEAD Today!',
  description:
    'Discover rewarding career opportunities at E-GEAD! Join our innovative team and unlock your potential in a dynamic environment. Start your journey today!',
  openGraph: {
    title: 'Explore Exciting Career Opportunities at E-GEAD Today!',
    description:
      'Join our team in Buon Ma Thuot, Vietnam, North America or Remote. Scale global commerce automation and POD fulfillment.',
  },
};

const COMMUNITY_ACTIVITIES = [
  {
    title: 'Highland Youth Tech Education Sponsorship',
    location: 'Buon Ma Thuot, Dak Lak',
    image: '/assets/case_manulife.jpg',
    desc: 'Providing programming scholarships, laptops, and mentorship to aspiring software engineers in the Central Highlands.',
  },
  {
    title: 'Maison Chance Vocational Training Support',
    location: 'Vietnam Delivery Center',
    image: '/assets/case_brother.jpg',
    desc: 'Empowering disadvantaged youth with practical digital commerce, packaging, and design skill training.',
  },
  {
    title: 'Green Highlands Community Tree Planting',
    location: 'Dak Lak Province',
    image: '/assets/case_suntory.jpg',
    desc: 'Partnering with local forestry teams to offset logistics emissions through sustainable reforestation initiatives.',
  },
];

export default async function CareerPage() {
  const jobs = await getPublicJobOpenings();

  return (
    <div className="w-full bg-[#0A0D0E] text-white pt-28 sm:pt-36 overflow-hidden">
      {/* 1. Hero Section: Kinetic Typography */}
      <MotionHero className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16">
        <div className="w-full">
          <p className="text-sm sm:text-base font-semibold uppercase tracking-widest text-[#10E774] mb-4 font-montserrat">
            Careers
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-medium leading-[1.05] text-[#D4FAE6] font-montserrat tracking-tight mb-8">
            BRING FORWARD THE <br />
            <span className="bg-gradient-to-r from-[#5EFC8D] via-[#10E774] to-[#7ceee0] bg-clip-text text-transparent font-medium">
              TRUE YOU.
            </span>
          </h1>
        </div>
      </MotionHero>

      {/* 2. Sticky / Anchor Bar */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-12 sm:mb-16">
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 pb-4 border-b border-white/10 text-sm font-medium font-montserrat">
          <a
            href="#at-sai"
            className="flex items-center gap-2 text-gray-400 hover:text-[#10E774] transition group"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#10E774] transition-transform group-hover:translate-y-0.5" />
            <span>Life At E-GEAD</span>
          </a>
          <a
            href="#job"
            className="flex items-center gap-2 text-gray-400 hover:text-[#10E774] transition group"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#10E774] transition-transform group-hover:translate-y-0.5" />
            <span>Jobs Opening</span>
          </a>
        </div>
      </div>

      {/* 3. Hero Visual Media Banner */}
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32">
        <div className="relative w-full h-[340px] sm:h-[480px] lg:h-[580px] rounded-[32px] sm:rounded-[48px] overflow-hidden shadow-2xl border border-white/10 bg-black group">
          <img
            src="/assets/company.png"
            alt="Life at E-GEAD - Vibrant Global Team"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0E] via-transparent to-black/30" />
          <div className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-[#10E774]/20 text-[#10E774] text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-[#10E774]/30 inline-block mb-3 font-montserrat">
              Culture &amp; Collaboration
            </span>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-white font-montserrat leading-snug">
              Passionate minds building the infrastructure of global intelligent commerce.
            </p>
          </div>
        </div>
      </MotionSection>

      {/* 4. Life at E-GEAD Section (#at-sai) */}
      <div id="at-sai" className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-24 sm:mb-32 scroll-mt-24">
        <div className="max-w-4xl">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#10E774] block mb-3 font-montserrat">
            Life at E-GEAD
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium text-[#D4FAE6] font-montserrat leading-tight mb-8">
            We believe your best work comes from the heart. At all of our offices, we encourage genuine honesty.
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-gray-300 font-light leading-relaxed font-montserrat">
            <p>
              With our hybrid model, we fuse empathetic creative thinking, robust solution architecture capabilities, and automated intelligence to drive operational efficiencies that help cross-border businesses scale and evolve rapidly.
            </p>
            <p>
              As part of our high-velocity e-commerce and logistics network, our teams operate from our headquarters in Buon Ma Thuot and delivery centers supporting brand partners across Vietnam, North America, Japan, Singapore, and Australia.
            </p>
          </div>
        </div>
      </div>


      {/* 5. E-GEAD Moments Section (Bento Grid) */}
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28 sm:mb-36">
        <CareerMomentsBento />
      </MotionSection>

      {/* 7. Jobs Opening White Section (#job) */}
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28 sm:mb-36">
        <CareerJobsList jobs={jobs} />
      </MotionSection>

      {/* 8. CSR & Community Giving Back */}
      <MotionSection className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-28 sm:mb-36">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#10E774] font-semibold block mb-2 font-montserrat">
            Social Responsibility
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#D4FAE6] font-montserrat mb-4">
            Giving Back to the Community
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl font-light">
            Empowering the next generation through digital literacy scholarships, tech vocational workshops, and local environmental stewardship in Buon Ma Thuot and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMUNITY_ACTIVITIES.map((c, idx) => (
            <MotionCard
              key={c.title}
              index={idx}
              className="rounded-3xl overflow-hidden bg-[#141718] border border-white/10 hover:border-white/20 transition flex flex-col justify-between shadow-xl group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-black">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-85"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1 font-montserrat">
                    {c.location}
                  </span>
                  <h3 className="text-lg font-bold text-[#D4FAE6] mb-2 font-montserrat leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </MotionSection>

      {/* 9. Contact Block */}
      <MotionDiv threshold={0.15}>
        <ContactBlock />
      </MotionDiv>
    </div>
  );
}
