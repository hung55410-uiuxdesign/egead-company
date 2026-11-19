"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Layers, Package, Play, RefreshCw, Zap } from "lucide-react";

// Transparent hero (VP9 + alpha WebM). The poster is the same first frame as a transparent WebP.
const HERO_POSTER = "/assets/hero/hero-poster.webp";
const HERO_VIDEO = "/assets/hero/egead-warehouse-hero.webm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PILLARS = [
  {
    icon: Layers,
    title: "Every channel",
    description: "One unified order hub for all your sales channels.",
  },
  {
    icon: Zap,
    title: "Automated workflows",
    description: "Multi-marketplace operations run on autopilot.",
  },
  {
    icon: RefreshCw,
    title: "Real-time inventory",
    description: "Stock levels synchronized the moment they change.",
  },
];

export default function HeroBanner() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  // Safari ignores the alpha channel of VP9 WebM (it would draw a solid box), so it keeps the static poster.
  const [supportsAlphaVideo, setSupportsAlphaVideo] = useState(true);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari = /safari/i.test(ua) && !/chrome|chromium|crios|fxios|edg|android/i.test(ua);
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    if (isSafari || isIOS) setSupportsAlphaVideo(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, [reduceMotion]);

  const scrollToServices = () => {
    const el =
      document.getElementById("block__items__with__button") ||
      document.getElementById("homepage__service");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      id="big__banner"
      className="big__banner relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[#040A0D] font-montserrat text-white select-none"
    >
      {/* Background layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_78%_58%,rgba(16,231,116,0.16),transparent_70%),radial-gradient(40%_40%_at_8%_4%,rgba(255,255,255,0.07),transparent_70%),radial-gradient(50%_50%_at_20%_100%,rgba(16,231,116,0.1),transparent_70%)]"
      />

      <div className="grid w-full items-center gap-12 px-6 pb-20 pt-28 sm:px-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:px-14 lg:pb-24 xl:px-16">
        {/* ============ Copy ============ */}
        <div className="max-w-[680px]">
          <h1 className="text-[2.1rem] font-bold leading-[1.06] sm:text-5xl lg:text-[clamp(2.2rem,3.4vw,3.6rem)]">
            <motion.span
              {...reveal(0.15)}
              className="block bg-gradient-to-b from-white to-[#C9F9E1] bg-clip-text pb-1 text-transparent lg:whitespace-nowrap"
            >
              Automate Operations.
            </motion.span>
            <motion.span
              {...reveal(0.28)}
              className="block bg-gradient-to-r from-[#8FF5C4] via-[#10E774] to-[#0FCB66] bg-clip-text pb-2 text-transparent lg:whitespace-nowrap"
            >
              Scale Global Sales.
            </motion.span>
          </h1>

          <motion.p
            {...reveal(0.4)}
            className="mt-5 max-w-[52ch] text-sm font-medium leading-[1.75] text-white/75 sm:text-base lg:text-[17px]"
          >
            Unify order management across every channel, automate multi-marketplace workflows, and
            synchronize inventory in real time — cutting costs while accelerating revenue growth.
          </motion.p>

          {/* CTAs */}
          <motion.div {...reveal(0.5)} className="mt-8 flex flex-wrap items-center gap-3.5">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact-us"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#10E774] px-7 py-3.5 text-sm font-semibold text-[#003D5B] shadow-[0_0_24px_rgba(16,231,116,0.35)] transition-all duration-300 hover:bg-[#0ecb66] hover:shadow-[0_0_36px_rgba(16,231,116,0.6)] sm:w-auto sm:text-base"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#003D5B] transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M15.125 10.875L10.625 15.375L9.56 14.31L12.2525 11.625H3.875V2.625H5.375V10.125H12.2525L9.56 7.44L10.625 6.375L15.125 10.875Z" />
                </svg>
                <span>Explore E-GEAD</span>
              </Link>
            </motion.div>

            <button
              type="button"
              onClick={scrollToServices}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 sm:w-auto sm:text-base"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>See how it works</span>
            </button>
          </motion.div>

          {/* Pillars */}
          <motion.ul
            {...reveal(0.62)}
            className="mt-10 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-6"
          >
            {PILLARS.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-center gap-3.5 sm:flex-col sm:items-start sm:gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#10E774]/25 bg-[#10E774]/10 text-[#4FF0A4]">
                  <Icon className="h-[19px] w-[19px]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold leading-snug text-white">{title}</p>
                  <p className="mt-1.5 hidden text-[12.5px] font-medium leading-relaxed text-white/55 sm:block">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ============ 3D stage ============ */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="relative mx-auto w-full max-w-[780px] lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-[8%] -inset-y-[10%] -z-10 bg-[radial-gradient(closest-side,rgba(16,231,116,0.38),transparent_70%)] blur-[30px]"
          />

          <div
            role="img"
            aria-label="3D isometric animation of an E-GEAD fulfillment warehouse: conveyor, workers, trucks and a live dashboard"
            className="relative aspect-[4/3] w-full"
          >
            {/* The render has wide transparent margins, so the media layer is scaled up to make the scene larger */}
            <div className="absolute inset-0 origin-center scale-[1.2] sm:scale-[1.25] lg:scale-[1.3]">
              {/* Transparent poster (also the fallback while the video loads, with reduced motion, or in Safari) */}
              <Image
                src={HERO_POSTER}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className={`object-contain transition-opacity duration-300 ${
                  videoPlaying ? "opacity-0" : "opacity-100"
                }`}
              />
              {supportsAlphaVideo && (
                <video
                  ref={videoRef}
                  autoPlay={!reduceMotion}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  tabIndex={-1}
                  onPlaying={() => setVideoPlaying(true)}
                  className="absolute inset-0 h-full w-full object-contain"
                >
                  <source src={HERO_VIDEO} type='video/webm; codecs="vp9"' />
                </video>
              )}
            </div>
          </div>

          {/* Floating chips */}
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: -3.2 }}
            className="absolute right-2 top-2 z-20 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[#030C10]/80 py-2 pl-2 pr-3 text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:-right-[3%] sm:top-[1%] sm:gap-3 sm:py-2.5 sm:pl-3 sm:pr-4"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-b from-[#34F09A] to-[#10E774] text-[#04301B] sm:h-[34px] sm:w-[34px] sm:rounded-[10px]">
              <Check className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.6} />
            </span>
            <div>
              <p className="text-[11.5px] font-bold leading-tight sm:text-[13px]">Orders synced</p>
              <p className="mt-0.5 hidden text-[11.5px] font-medium leading-tight text-white/65 sm:block">
                Every channel, in real time
              </p>
            </div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="absolute -bottom-3 left-2 z-20 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[#030C10]/80 py-2 pl-2 pr-3 text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:-left-[6%] sm:-bottom-[2%] sm:gap-3 sm:py-2.5 sm:pl-3 sm:pr-4"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-b from-[#34F09A] to-[#10E774] text-[#04301B] sm:h-[34px] sm:w-[34px] sm:rounded-[10px]">
              <Package className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-[11.5px] font-bold leading-tight sm:text-[13px]">Inventory updated</p>
              <p className="mt-0.5 hidden text-[11.5px] font-medium leading-tight text-white/65 sm:block">
                Across all marketplaces
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Center: Scroll Button */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 lg:block"
      >
        <motion.button
          type="button"
          onClick={scrollToServices}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to services"
          className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-white/80 bg-black/60 text-white shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-black/85"
        >
          <ChevronDown
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </motion.button>
      </motion.div>
    </section>
  );
}
