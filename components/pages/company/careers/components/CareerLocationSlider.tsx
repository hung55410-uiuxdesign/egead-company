"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, Globe2 } from "lucide-react";

type OfficeLocation = {
  city: string;
  country: string;
  timezone: string;
  role: string;
  address: string;
  image: string;
};

const LOCATIONS: OfficeLocation[] = [
  {
    city: "Buon Ma Thuot",
    country: "Vietnam",
    timezone: "Asia/Bangkok",
    role: "Global Headquarters & WMS Hub",
    address: "217/9 Ngo Quyen, Buon Ma Thuot City, Dak Lak",
    image: "/assets/Rectangle_539.jpg",
  },
  {
    city: "Ho Chi Minh City",
    country: "Vietnam",
    timezone: "Asia/Bangkok",
    role: "Engineering & Delivery Center",
    address: "District 1, Ho Chi Minh City",
    image: "/assets/banner18.png",
  },
  {
    city: "Los Angeles, CA",
    country: "North America",
    timezone: "America/Los_Angeles",
    role: "US POD Fulfillment & Logistics Center",
    address: "Southern California Logistics Corridor",
    image: "/assets/case_brother.jpg",
  },
  {
    city: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    role: "East Asia Partner Network",
    address: "Chiyoda-ku, Tokyo, Japan",
    image: "/assets/case_suntory.jpg",
  },
  {
    city: "Singapore",
    country: "Singapore",
    timezone: "Asia/Singapore",
    role: "Southeast Asia Strategic Hub",
    address: "Marina Bay Financial Centre, Singapore",
    image: "/assets/smartcx-2.png",
  },
  {
    city: "Sydney",
    country: "Australia",
    timezone: "Australia/Sydney",
    role: "Oceania Client Success Hub",
    address: "Barangaroo, Sydney, NSW",
    image: "/assets/case_weir.jpg",
  },
];

export default function CareerLocationSlider() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updated: Record<string, string> = {};
      LOCATIONS.forEach((loc) => {
        try {
          updated[loc.timezone] = new Intl.DateTimeFormat("en-US", {
            timeZone: loc.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }).format(now);
        } catch {
          updated[loc.timezone] = "--:--:--";
        }
      });
      setTimes(updated);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-[#10E774] font-semibold font-montserrat">
        <Globe2 className="w-4 h-4" />
        <span>Our Global Presence</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LOCATIONS.map((loc) => (
          <div
            key={loc.city}
            className="group relative rounded-3xl overflow-hidden bg-[#141718] border border-white/10 hover:border-[#10E774]/50 transition duration-300 flex flex-col justify-between shadow-xl"
          >
            {/* Background Image Preview */}
            <div className="relative h-44 w-full overflow-hidden bg-black">
              <img
                src={loc.image}
                alt={`${loc.city}, ${loc.country}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141718] via-transparent to-black/30" />

              {/* Live Time Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-xs text-white font-mono shadow-md">
                <Clock className="w-3.5 h-3.5 text-[#10E774] animate-pulse" />
                <span>{times[loc.timezone] || "--:--"}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#10E774] uppercase tracking-wider block mb-1 font-montserrat">
                  {loc.country}
                </span>
                <h3 className="text-xl font-bold text-[#D4FAE6] mb-2 font-montserrat">
                  {loc.city}
                </h3>
                <p className="text-xs text-gray-300 font-medium mb-3">
                  {loc.role}
                </p>
              </div>

              <div className="flex items-start gap-1.5 pt-3 border-t border-white/10 text-xs text-gray-400 font-light">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{loc.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
