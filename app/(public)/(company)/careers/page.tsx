import { getPublicJobOpenings } from "@/lib/careers";
import { getCareersPageConfig } from "@/lib/services/careers-page-config.service";
import { CareersView } from "@/components/pages/company/careers";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Explore Exciting Career Opportunities at E-GEAD Today!",
  description:
    "Discover rewarding career opportunities at E-GEAD! Join our innovative team and unlock your potential in a dynamic environment. Start your journey today!",
  openGraph: {
    title: "Explore Exciting Career Opportunities at E-GEAD Today!",
    description:
      "Join our team in Buon Ma Thuot, Vietnam, North America or Remote. Scale global commerce automation and POD fulfillment.",
  },
};

export default async function CareerPage() {
  const [jobs, config] = await Promise.all([
    getPublicJobOpenings(),
    getCareersPageConfig(),
  ]);

  return <CareersView jobs={jobs} config={config} />;
}
