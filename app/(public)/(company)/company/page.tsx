import { CompanyView } from "@/components/pages/company/company";
import { getCompanySections } from "@/lib/services/company-section.service";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "About Us | E-GEAD: More Than An Operations Partner",
  description:
    "Discover E-GEAD’s mission, values, and operational ecosystem. Headquartered in Buon Ma Thuot, Vietnam with sub-24h US POD fulfillment, WMS automation, and multi-channel scale across 10+ countries.",
};

export default async function CompanyPage() {
  const sections = await getCompanySections();
  return <CompanyView sections={sections} />;
}

