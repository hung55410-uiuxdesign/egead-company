'use client';

import React from 'react';
import Link from 'next/link';
import { FOOTER_NAV_COLUMNS } from '../config/footer-links';

export default function FooterNavColumns() {
  return (
    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
      {FOOTER_NAV_COLUMNS.map((col) => (
        <div key={col.title}>
          <span className="text-xs font-bold text-black block mb-4">
            {col.title}
          </span>
          <ul className="space-y-3 text-sm font-medium">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-black hover:underline transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
