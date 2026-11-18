'use client';

export interface ContactBlockProps {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
  section?: any;
}

/**
 * Superseded by the unified EGEAD homepage-identical Footer (<footer id="contact">)
 * rendered automatically across all public sub-pages via PublicLayoutClient.
 */
export default function ContactBlock(_props: ContactBlockProps = {}) {
  return null;
}
