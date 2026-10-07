'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TimezoneLocation {
  name: string;
  tz: string;
}

const locations: TimezoneLocation[] = [
  { name: 'US (Pacific)', tz: 'America/Los_Angeles' },
  { name: 'US (Eastern)', tz: 'America/New_York' },
  { name: 'London (UK)', tz: 'Europe/London' },
  { name: 'Frankfurt (DE)', tz: 'Europe/Berlin' },
  { name: 'Vietnam (HQ)', tz: 'Asia/Ho_Chi_Minh' },
  { name: 'Sydney (AU)', tz: 'Australia/Sydney' },
];

export default function Footer() {
  const pathname = usePathname();
  const [times, setTimes] = useState<Record<string, string>>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  if (pathname?.startsWith('/admin')) {
    return null;
  }

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
        } catch (e) {
          updated[loc.name] = '--:--';
        }
      }
      setTimes(updated);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      alert('Thank you for subscribing!');
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="footer" className="footer w-full bg-white text-gray-700 pt-16 sm:pt-20 pb-12 overflow-hidden">
      {/* FULL WIDTH CONTAINER matching live site */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Top: Logo & Social Media */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-gray-100">
          <Link href="/" className="inline-block">
            <img
              src="https://egeadcompany.com/images/egead/logo-wordmark.png"
              alt="E-GEAD Company"
              className="h-8 sm:h-9 w-auto"
            />
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <span className="text-xs font-bold text-black font-montserrat">
              JOIN OUR NETWORK
            </span>
            <div className="flex items-center gap-4 sm:gap-5">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#10E774] flex items-center justify-center transition p-2"
                aria-label="Facebook"
              >
                <img src="/assets/Facebook_Black.svg" alt="Facebook" className="w-full h-full object-contain" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#10E774] flex items-center justify-center transition p-2"
                aria-label="LinkedIn"
              >
                <img src="/assets/LinkedIn_Black.svg" alt="LinkedIn" className="w-full h-full object-contain" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#10E774] flex items-center justify-center transition p-2"
                aria-label="YouTube"
              >
                <img src="/assets/Youtube_Black.svg" alt="YouTube" className="w-full h-full object-contain" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#10E774] flex items-center justify-center transition p-2"
                aria-label="X"
              >
                <img src="/assets/X_Black.svg" alt="X" className="w-full h-full object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* Middle: Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-gray-100">
          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <span className="text-xs font-bold text-black block mb-4">
                What we do
              </span>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link href="/our-work" className="hover:text-black hover:underline transition">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link href="/services/all-services" className="hover:text-black hover:underline transition">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="hover:text-black hover:underline transition">
                    Our Partners
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-black block mb-4">
                About
              </span>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link href="/company" className="hover:text-black hover:underline transition">
                    Our Company
                  </Link>
                </li>
                <li>
                  <Link href="/people" className="hover:text-black hover:underline transition">
                    Our People
                  </Link>
                </li>
                <li>
                  <Link href="/career" className="hover:text-black hover:underline transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/testimonial" className="hover:text-black hover:underline transition">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="hover:text-black hover:underline transition">
                    Insights
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-black block mb-4">
                Info
              </span>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link href="/contact-us" className="hover:text-black hover:underline transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-black hover:underline transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-black hover:underline transition">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column matching live site */}
          <div className="lg:col-span-4">
            <span className="text-xs font-bold text-black block mb-5">
              Newsletter
            </span>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="name@youremail.com"
                className="w-full bg-white border border-gray-300 rounded-full px-5 py-3.5 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#10E774] pr-14 transition shadow-sm"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1.5 bottom-1.5 w-10 h-10 rounded-full bg-[#10E774] hover:bg-[#0ecb66] text-black flex items-center justify-center transition"
              >
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.79487 2.43379e-07L5.65756 1.0575L10.1584 5.25L0.342041 5.25L0.342041 6.75L10.1584 6.75L5.65756 10.9425L6.79487 12L13.2477 6L6.79487 2.43379e-07Z" fill="white" />
                </svg>
              </button>
            </form>

            <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
              This site is protected by reCAPTCHA and the <a target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy?hl=en" className="underline hover:text-black">Google Privacy Policy</a> and <a target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms?hl=en" className="underline hover:text-black">Terms of Service</a> apply.
            </p>
          </div>
        </div>

        {/* Live World Clocks Bar - 7 Asian/APAC cities */}
        <div className="py-8 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {locations.map((loc) => (
              <div key={loc.name} className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg border border-[#10E774] text-xs font-montserrat font-medium text-black bg-white">
                  {times[loc.name] || '10:00'}
                </span>
                <span className="text-xs font-medium text-gray-700">{loc.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row with Badges SOC */}
        <div className="pt-6 pb-4">
          <img
            src="/assets/Badges_SOC.svg"
            alt="Badges SOC"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Bottom Bar: Language on left, Back to top in center, Copyright on right */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          {/* Language Selector Left */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold text-black hover:text-[#007A3D] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M9.99297 1.66602C5.39297 1.66602 1.66797 5.39935 1.66797 9.99935C1.66797 14.5993 5.39297 18.3327 9.99297 18.3327C14.6013 18.3327 18.3346 14.5993 18.3346 9.99935C18.3346 5.39935 14.6013 1.66602 9.99297 1.66602ZM15.768 6.66602H13.3096C13.043 5.62435 12.6596 4.62435 12.1596 3.69935C13.693 4.22435 14.968 5.29102 15.768 6.66602ZM10.0013 3.36602C10.693 4.36602 11.2346 5.47435 11.593 6.66602H8.40964C8.76797 5.47435 9.30964 4.36602 10.0013 3.36602ZM3.5513 11.666C3.41797 11.1327 3.33464 10.5743 3.33464 9.99935C3.33464 9.42435 3.41797 8.86602 3.5513 8.33268H6.36797C6.3013 8.88268 6.2513 9.43268 6.2513 9.99935C6.2513 10.566 6.3013 11.116 6.36797 11.666H3.5513ZM4.23464 13.3327H6.69297C6.95964 14.3743 7.34297 15.3743 7.84297 16.2993C6.30964 15.7743 5.03464 14.716 4.23464 13.3327ZM6.69297 6.66602H4.23464C5.03464 5.28268 6.30964 4.22435 7.84297 3.69935C7.34297 4.62435 6.95964 5.62435 6.69297 6.66602ZM10.0013 16.6327C9.30964 15.6327 8.76797 14.5243 8.40964 13.3327H11.593C11.2346 14.5243 10.693 15.6327 10.0013 16.6327ZM11.9513 11.666H8.0513C7.9763 11.116 7.91797 10.566 7.91797 9.99935C7.91797 9.43268 7.9763 8.87435 8.0513 8.33268H11.9513C12.0263 8.87435 12.0846 9.43268 12.0846 9.99935C12.0846 10.566 12.0263 11.116 11.9513 11.666ZM12.1596 16.2993C12.6596 15.3743 13.043 14.3743 13.3096 13.3327H15.768C14.968 14.7077 13.693 15.7743 12.1596 16.2993ZM13.6346 11.666C13.7013 11.116 13.7513 10.566 13.7513 9.99935C13.7513 9.43268 13.7013 8.88268 13.6346 8.33268H16.4513C16.5846 8.86602 16.668 9.42435 16.668 9.99935C16.668 10.5743 16.5846 11.1327 16.4513 11.666H13.6346Z" fill="black" />
              </svg>
              <span>Language: {lang}</span>
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                <path d="M10 6.42578L9.295 5.72078L6.5 8.51078V2.42578H5.5V8.51078L2.71 5.71578L2 6.42578L6 10.4258L10 6.42578Z" fill="black" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute left-0 bottom-full mb-2 w-28 rounded-xl bg-white border border-gray-200 shadow-xl p-1 z-50">
                {['EN', 'JA', 'VI'].map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-gray-100 font-semibold text-xs"
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Back to top Center */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4FAE6]/40 hover:bg-[#10E774] text-black font-semibold text-xs transition duration-300 shadow-sm"
          >
            <span>Back to top</span>
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
              <path d="M8.77297 5.72703C8.87864 5.8327 8.93801 5.97603 8.93801 6.12547C8.93801 6.27491 8.87864 6.41823 8.77297 6.52391C8.6673 6.62958 8.52397 6.68894 8.37453 6.68894C8.22509 6.68894 8.08177 6.62958 7.97609 6.52391L5.5625 4.10938V9.5C5.5625 9.64918 5.50324 9.79226 5.39775 9.89775C5.29226 10.0032 5.14918 10.0625 5 10.0625C4.85082 10.0625 4.70774 10.0032 4.60225 9.89775C4.49676 9.79226 4.4375 9.64918 4.4375 9.5V4.10938L2.02297 6.52297C1.9173 6.62864 1.77397 6.68801 1.62453 6.68801C1.47509 6.68801 1.33177 6.62864 1.22609 6.52297C1.12042 6.4173 1.06106 6.27397 1.06106 6.12453C1.06106 5.97509 1.12042 5.83177 1.22609 5.72609L4.60109 2.35109C4.65335 2.29865 4.71545 2.25705 4.78382 2.22866C4.85219 2.20026 4.9255 2.18565 4.99953 2.18565C5.07356 2.18565 5.14687 2.20026 5.21524 2.22866C5.28361 2.25705 5.34571 2.29865 5.39797 2.35109L8.77297 5.72703ZM9.125 0.3125H0.875C0.725816 0.3125 0.582742 0.371763 0.477252 0.477252C0.371763 0.582742 0.3125 0.725816 0.3125 0.875C0.3125 1.02418 0.371763 1.16726 0.477252 1.27275C0.582742 1.37824 0.725816 1.4375 0.875 1.4375H9.125C9.27418 1.4375 9.41726 1.37824 9.52275 1.27275C9.62824 1.16726 9.6875 1.02418 9.6875 0.875C9.6875 0.725816 9.62824 0.582742 9.52275 0.477252C9.41726 0.371763 9.27418 0.3125 9.125 0.3125Z" fill="black" />
            </svg>
          </button>

          {/* Copyright Right */}
          <div className="text-right">
            <span>© 2026 E-Gead Company. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
