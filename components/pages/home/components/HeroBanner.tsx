"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FadeUp } from "@/components/ui/FadeUp";
import HeroOrbCanvas from "./HeroOrbCanvas";

const HERO_FONT_CSS =
  "https://db.onlinewebfonts.com/c/e66905e07608167a84e6ad52f638c3c6?family=Helvetica+Now+Var";

const HEADING = "WE BUILD END-TO-END AI AUTOMATION SYSTEMS.";
const SUBTEXT = "We provide all-in-one AI automation services in one place.";

const WORD_DELAY_START = 0.15;
const WORD_DELAY_STEP = 0.08;

export default function HeroBanner() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  // The backdrop is fixed to the viewport, so it is only shown (and animated) while the hero is on screen.
  // Otherwise it would sit on top of any later section that does not paint its own background.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* React 19 hoists this into <head>; the font only applies inside the hero below. */}
      <link rel="stylesheet" href={HERO_FONT_CSS} precedence="hero-font" />

      <HeroOrbCanvas active={inView} reducedMotion={reduceMotion} />

      <section
        ref={sectionRef}
        id="big__banner"
        className="big__banner relative z-[1] flex flex-col justify-center px-8 pb-8 pt-[70px] text-white max-[900px]:px-[18px] max-[900px]:pt-[90px]"
        style={{
          height: "100vh",
          fontFamily: "'Helvetica Now Var', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <div className="flex max-w-[720px] flex-col items-start">
          <h2
            aria-label={HEADING}
            className="m-0 flex flex-wrap gap-[0.25em] text-[clamp(26px,3vw,42px)] font-bold uppercase leading-[1.08] tracking-[-0.01em] text-white"
          >
            {HEADING.split(" ").map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                {index > 0 ? " " : null}
                <FadeUp
                  as="span"
                  y={32}
                  delay={WORD_DELAY_START + index * WORD_DELAY_STEP}
                >
                  <span aria-hidden="true">{word}</span>
                </FadeUp>
              </Fragment>
            ))}
          </h2>

          <FadeUp
            as="p"
            delay={0.9}
            className="mt-6 max-w-[260px] text-sm leading-[1.65] text-white/85"
          >
            {SUBTEXT}
          </FadeUp>
        </div>
      </section>
    </>
  );
}
