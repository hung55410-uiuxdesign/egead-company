'use client';

import SapHeroSection from './components/SapHeroSection';
import SapAdvantagesSection from './components/SapAdvantagesSection';
import SapExpertiseSection from './components/SapExpertiseSection';
import SapWhySection from './components/SapWhySection';
import SapCasesSection from './components/SapCasesSection';
import SapCtaSection from './components/SapCtaSection';

import type { PartnerDetailData } from './types';

export interface SapPartnerViewProps {
  data?: PartnerDetailData;
}

export default function SapPartnerView({ data }: SapPartnerViewProps = {}) {
  const partnerName = data?.name ?? 'SAP';

  return (
    <div className="w-full bg-[#0A0D0E] text-white selection:bg-[#10E774]/30 selection:text-white">
      <SapHeroSection data={data?.hero} />
      <SapAdvantagesSection
        partnerName={partnerName}
        subtitle={data?.advantages?.subtitle}
        headline={data?.advantages?.headline}
        items={data?.advantages?.items}
      />
      <SapExpertiseSection
        partnerName={partnerName}
        subtitle={data?.expertise?.subtitle}
        headline={data?.expertise?.headline}
        items={data?.expertise?.items}
      />
      <SapWhySection partnerName={partnerName} data={data?.why} />
      <SapCasesSection
        subtitle={data?.caseStudies?.subtitle}
        headline={data?.caseStudies?.headline}
        items={data?.caseStudies?.items}
      />
      <SapCtaSection partnerName={partnerName} data={data?.cta} />
    </div>
  );
}

export { SapPartnerView as PartnerDetailView };

