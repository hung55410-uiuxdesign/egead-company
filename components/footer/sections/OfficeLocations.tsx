'use client';

import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useT } from '@/components/providers/LocaleProvider';

export default function OfficeLocations() {
  const t = useT();
  const { title, address, hours, items } = t.footer.offices;

  return (
    <section
      aria-label={title}
      className="py-10 border-b border-gray-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((office) => (
          <div key={office.name}>
            <h3 className="text-sm font-bold text-black mb-3">{office.name}</h3>
            <div className="flex items-start gap-2.5 text-sm font-medium text-gray-700">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-[#10E774]"
                aria-label={address}
              />
              <p>{office.address}</p>
            </div>
            <div className="mt-3 flex items-start gap-2.5 text-sm font-medium text-gray-700">
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-[#10E774]"
                aria-label={hours}
              />
              <ul className="space-y-0.5">
                {office.hours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
