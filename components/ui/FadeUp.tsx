"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "nav";
  once?: boolean;
};

/** Fade + rise into place the first time the element scrolls into view. */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  y = 24,
  className,
  style,
  as = "div",
  once = true,
}: FadeUpProps) {
  // The union of every motion tag is too wide for JSX; all of them share the same props here.
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export default FadeUp;
