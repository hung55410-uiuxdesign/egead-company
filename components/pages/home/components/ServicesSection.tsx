"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CapabilityItem } from "@/lib/services/home-section.service";

const defaultServices: CapabilityItem[] = [
  {
    num: "01",
    title: "US Fulfillment & Logistics",
    desc: "Fast production turnaround, reliable order processing, and full TikTok Shop US compliance for seamless cross-border delivery.",
    icon: "/assets/home-icon__1_.svg",
    href: "/speedx",
  },
  {
    num: "02",
    title: "Multi-Channel Commerce",
    desc: "End-to-end store operations and product listings across leading global platforms: TikTok Shop, Etsy, eBay, and Amazon.",
    icon: "/assets/home-icon__2_.svg",
    href: "/smartcommerce",
  },
  {
    num: "03",
    title: "Digital Growth Marketing",
    desc: "High-converting performance marketing powered by TikTok Ads, organic TikTok channels, and Google Ads to scale international sales.",
    icon: "/assets/home-icon__3_.svg",
    href: "/services/all-services",
  },
  {
    num: "04",
    title: "Shopify Stores & Smart Tools",
    desc: "Optimized D2C Shopify storefronts integrated with dedicated internal tools for automated order tracking, listing, and daily operations.",
    icon: "/assets/home-icon__4_.svg",
    href: "/services/all-services",
  },
];

export interface ServicesSectionProps {
  subtitle?: string;
  title?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
  items?: CapabilityItem[];
}

export default function ServicesSection({
  subtitle = "Our Capabilities",
  title = "End-to-End E-Commerce Growth Ecosystem.",
  buttonText = "Explore All Capabilities",
  buttonHref = "/services/all-services",
  backgroundImage = "/assets/bg_services.jpg",
  items,
}: ServicesSectionProps = {}) {
  const displayItems = items && items.length > 0 ? items : defaultServices;

  return (
    <section
      id="block__items__with__button"
      className="block__items__with__button relative w-full py-28 sm:py-36 lg:py-44 xl:py-48 bg-[#0A0D0E] text-white overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage || "/assets/bg_services.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#0A0D0E]/80 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base sm:text-lg font-normal text-[#D4FAE6] mb-3 font-montserrat"
            >
              {subtitle}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-[34px] font-semibold font-montserrat leading-[1.3] tracking-tight"
            >
              <span className="bg-gradient-to-r from-[#6CE8C3] via-[#A8F7E2] to-white bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="self-start md:self-end shrink-0"
          >
            <Link
              href={buttonHref || "/services/all-services"}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[#5EFC8D] hover:text-[#5EFC8D] text-[#D4FAE6] font-medium text-sm transition duration-300"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current transition"
              >
                <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
              </svg>
              <span>{buttonText}</span>
            </Link>
          </motion.div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7">
          {displayItems.map((svc, i) => (
            <motion.div
              key={svc.num || `item-${i}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Link
                href={svc.href || "#"}
                className="group relative flex flex-col justify-between h-full p-8 sm:p-9 xl:p-10 rounded-[32px] bg-[#141718]/85 hover:bg-[#181D1F] border border-white/10 hover:border-[#5EFC8D]/50 transition-all duration-300 min-h-[460px] sm:min-h-[500px] xl:min-h-[530px] backdrop-blur-md shadow-2xl hover:shadow-[0_20px_40px_rgba(16,231,116,0.12)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-medium text-[#D4FAE6] group-hover:text-[#5EFC8D] font-montserrat transition-colors">
                    {svc.num}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#5EFC8D] group-hover:bg-[#10E774] text-[#003D5B] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-[#003D5B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    >
                      <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                    </svg>
                  </div>
                </div>

                <div className="my-8 sm:my-12 flex items-center">
                  <img
                    src={svc.icon}
                    alt={svc.title}
                    className="w-14 h-14 object-contain opacity-95 group-hover:opacity-100 group-hover:scale-115 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/home-icon__1_.svg';
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-[#D4FAE6] group-hover:text-[#5EFC8D] transition-colors duration-300 mb-3 leading-snug font-montserrat">
                    {svc.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#b3b3b3] font-light leading-[1.75] font-montserrat">
                    {svc.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
