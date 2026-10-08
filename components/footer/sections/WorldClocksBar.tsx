'use client';

import React from 'react';
import { FOOTER_TIMEZONES } from '../config/timezones';
import { useWorldClocks } from '../hooks/useWorldClocks';

export default function WorldClocksBar() {
  const times = useWorldClocks(FOOTER_TIMEZONES);

  return (
    <div className="py-8 border-b border-gray-100">
      <div className="flex flex-wrap items-center gap-4 sm:gap-5">
        {FOOTER_TIMEZONES.map((loc) => (
          <div key={loc.name} className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg border border-[#10E774] text-xs font-montserrat font-medium text-black bg-white tabular-nums">
              {times[loc.name] || '10:00'}
            </span>
            <span className="text-xs font-medium text-gray-700">{loc.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
