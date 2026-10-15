'use client';

import React from 'react';
import { FOOTER_TIMEZONES } from '../config/timezones';
import { useWorldClocks } from '../hooks/useWorldClocks';
import type { TimezoneLocation } from '../types';

interface WorldClocksBarProps {
  timezones?: TimezoneLocation[];
}

export default function WorldClocksBar({ timezones }: WorldClocksBarProps) {
  const activeTimezones =
    timezones && timezones.length > 0 ? timezones : FOOTER_TIMEZONES;
  const times = useWorldClocks(activeTimezones);

  return (
    <div className="py-8 border-b border-gray-100">
      <div className="flex flex-wrap items-center gap-4 sm:gap-5">
        {activeTimezones.map((loc) => (
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
