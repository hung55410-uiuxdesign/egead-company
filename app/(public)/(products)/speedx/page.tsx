import type { Metadata } from "next";
import { SpeedXView } from "@/components/pages/products/speedx";

export const metadata: Metadata = {
  title:
    "Revolutionize Your Workflow with SpeedX: Fast, Efficient Solutions | E-GEAD",
  description:
    "Discover SpeedX by SAI Digital, your ultimate solution for enhancing digital performance and accelerating growth. Unlock your business’s full potential today!",
  keywords: [
    "SpeedX",
    "CRM implementation",
    "Sales Cloud SpeedX",
    "digital performance",
    "sales productivity",
    "workflow automation",
  ],
};

export default function SpeedXPage() {
  return <SpeedXView />;
}
