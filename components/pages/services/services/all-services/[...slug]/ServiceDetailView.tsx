"use client";

import type { ServiceDetailItem } from "@/data/services-data";
import ServiceDetailHero from "./components/ServiceDetailHero";
import ServiceDetailOverview from "./components/ServiceDetailOverview";
import ServiceDetailVisualBanner from "./components/ServiceDetailVisualBanner";
import ServiceDetailApproach from "./components/ServiceDetailApproach";
import ServiceDetailOtherIndustries from "./components/ServiceDetailOtherIndustries";
import ServiceDetailCta from "./components/ServiceDetailCta";

type Props = {
  service: ServiceDetailItem;
};

export default function ServiceDetailView({ service }: Props) {
  return (
    <div className="service-detail industries w-full bg-[#0A0D0E] text-white select-none">
      <ServiceDetailHero service={service} />
      <ServiceDetailOverview service={service} />
      <ServiceDetailVisualBanner
        imageSrc={service.middleImage}
        title={service.title}
      />
      <ServiceDetailApproach service={service} />
      <ServiceDetailOtherIndustries currentSlug={service.slug} />
      <ServiceDetailCta />
    </div>
  );
}
