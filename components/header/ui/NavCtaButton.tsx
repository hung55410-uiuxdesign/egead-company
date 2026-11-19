'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavArrowIcon from './NavArrowIcon';
import { useLocalizeHref, useT } from '@/components/providers/LocaleProvider';

interface NavCtaButtonProps {
  href?: string;
  label?: string;
  onClick?: () => void;
}

export default function NavCtaButton({
  href = '/contact-us',
  label,
  onClick,
}: NavCtaButtonProps) {
  const t = useT();
  const lh = useLocalizeHref();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Link
        href={lh(href)}
        onClick={onClick}
        className="inline-flex items-center gap-2 bg-[#10E774] hover:bg-[#0ecb66] text-[#003D5B] font-semibold text-[15px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition duration-200 shadow-[0_0_20px_rgba(16,231,116,0.35)] hover:shadow-[0_0_25px_rgba(16,231,116,0.5)] shrink-0"
      >
        <NavArrowIcon className="fill-[#003D5B]" size={16} />
        <span>{label ?? t.common.letsTalk}</span>
      </Link>
    </motion.div>
  );
}
