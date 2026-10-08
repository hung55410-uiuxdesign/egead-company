import { useState, useEffect } from 'react';
import type { TimezoneLocation } from '../types';

export function useWorldClocks(locations: TimezoneLocation[]) {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updated: Record<string, string> = {};

      for (const loc of locations) {
        try {
          const str = new Intl.DateTimeFormat('en-US', {
            timeZone: loc.tz,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(now);
          updated[loc.name] = str;
        } catch {
          updated[loc.name] = '--:--';
        }
      }

      setTimes(updated);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [locations]);

  return times;
}
