'use client';

import React from 'react';
import Link from 'next/link';

interface NextCaseStudyLinkProps {
  href: string;
  title: string;
}

export default function NextCaseStudyLink({ href, title }: NextCaseStudyLinkProps) {
  const handleClick = () => {
    // Explicit instant scroll to top on click
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  return (
    <Link
      href={href}
      scroll={true}
      onClick={handleClick}
      className="link-title font-montserrat"
    >
      {title}
    </Link>
  );
}
