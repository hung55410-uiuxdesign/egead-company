'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { FooterConfigData } from '@/lib/services/footer-config.service';

interface FooterProps {
  initialConfig?: FooterConfigData | null;
}

interface OfficeLocation {
  code: string;
  nameVi: string;
  nameEn: string;
  cityVi: string;
  cityEn: string;
  addressVi: string;
  addressEn: string;
  hoursVi: string;
  hoursEn: string;
  noteVi: string;
  noteEn: string;
}

const EGEAD_OFFICES: OfficeLocation[] = [
  {
    code: '01',
    nameVi: 'VP BMT',
    nameEn: 'BMT Office',
    cityVi: 'Buôn Ma Thuột',
    cityEn: 'Buon Ma Thuot',
    addressVi: '217/9 Ngô Quyền, P. Tân An, Tỉnh Đắk Lắk',
    addressEn: '217/9 Ngo Quyen, Tan An Ward, Dak Lak Province',
    hoursVi: 'T2–T7 · Sáng: 8h – 11h30 · Chiều: 14h – 17h30',
    hoursEn: 'Mon–Sat · 08:00–11:30 · 14:00–17:30',
    noteVi: 'Riêng chiều T7: 14h – 16h30',
    noteEn: 'Saturday afternoon: 14:00–16:30',
  },
  {
    code: '02',
    nameVi: 'VP HN',
    nameEn: 'Hanoi Office',
    cityVi: 'Hà Nội',
    cityEn: 'Hanoi',
    addressVi: 'Số 47 Liền kề 11B, Khu đô thị Mỗ Lao, Hà Nội',
    addressEn: 'No. 47 Lien Ke 11B, Mo Lao Urban Area, Hanoi',
    hoursVi: 'T2–T7 · Sáng: 8h – 12h · Chiều: 13h30 – 17h30',
    hoursEn: 'Mon–Sat · 08:00–12:00 · 13:30–17:30',
    noteVi: 'Nghỉ thứ 7 cách tuần',
    noteEn: 'Alternate Saturdays off',
  },
  {
    code: '03',
    nameVi: 'VP SG',
    nameEn: 'HCMC Office',
    cityVi: 'TP.HCM',
    cityEn: 'Ho Chi Minh City',
    addressVi: '54B đường 18, phường Hiệp Bình, TP.HCM',
    addressEn: '54B Street 18, Hiep Binh Ward, Ho Chi Minh City',
    hoursVi: 'T2–T7 · Sáng: 8h30 – 12h00 · Chiều: 13h30 – 17h30',
    hoursEn: 'Mon–Sat · 08:30–12:00 · 13:30–17:30',
    noteVi: 'Riêng chiều T7: 13h30 – 16h30',
    noteEn: 'Saturday afternoon: 13:30–16:30',
  },
];

function AutoFitWordmark({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const span = spanRef.current;
    if (!wrap || !span) return;

    let lastWidth = 0;
    const fit = () => {
      if (!wrap || !span) return;
      const cw = wrap.clientWidth;
      if (cw <= 0 || cw === lastWidth) return;
      lastWidth = cw;
      wrap.style.fontSize = '100px';
      const sw = span.getBoundingClientRect().width;
      if (sw > 0) {
        wrap.style.fontSize = `${(100 * cw) / sw}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(() => requestAnimationFrame(fit));
    ro.observe(wrap);
    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          lastWidth = 0;
          fit();
        })
        .catch(() => {});
    }

    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="egead-home-footer__mark">
      <span ref={spanRef}>{text}</span>
    </div>
  );
}

export default function Footer({ initialConfig }: FooterProps) {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    const syncLang = () => {
      try {
        const saved = localStorage.getItem('egead-lang');
        if (saved === 'en' || saved === 'vi') {
          setLang(saved);
          return;
        }
      } catch {
        // ignore
      }
      setLang(window.location.pathname.startsWith('/en') ? 'en' : 'vi');
    };
    syncLang();
    window.addEventListener('storage', syncLang);
    return () => window.removeEventListener('storage', syncLang);
  }, []);

  if (initialConfig?.isActive === false) {
    return null;
  }

  const isEn = lang === 'en';
  const homeHref = isEn ? '/en' : '/';

  const copy = isEn
    ? {
        kicker: 'Start a project',
        titleLines: ['Your next breakthrough,', 'with EGEAD.'],
        bodyLines: [
          'From marketplace automation to e-commerce platforms and AI pipelines.',
          'Tell us the goal and the timeline,',
          'and we’ll propose the best way to get there.',
        ],
        cta: 'Start a project',
        companyName: 'E-GEAD Company',
        email: 'contact@egeadcompany.com',
        privacy: 'Privacy policy',
        links: [
          { label: 'Home', href: homeHref },
          { label: 'About Us', href: '/company' },
          { label: 'Solutions', href: '/services/all-services' },
          { label: 'Our Work', href: '/our-work' },
          { label: 'News & Events', href: '/insights' },
          { label: 'Careers', href: '/careers' },
        ],
      }
    : {
        kicker: 'Khởi đầu dự án',
        titleLines: ['Đột phá tiếp theo của bạn,', 'cùng EGEAD.'],
        bodyLines: [
          'Từ tự động hóa marketplace đến nền tảng e-commerce và pipeline AI.',
          'Hãy cho chúng tôi biết mục tiêu và lộ trình của bạn,',
          'chúng tôi sẽ đề xuất giải pháp mạnh mẽ nhất.',
        ],
        cta: 'Khởi đầu dự án',
        companyName: 'E-GEAD Company',
        email: 'contact@egeadcompany.com',
        privacy: 'Chính sách bảo mật',
        links: [
          { label: 'Trang chủ', href: homeHref },
          { label: 'Về chúng tôi', href: '/company' },
          { label: 'Giải pháp & TMĐT', href: '/services/all-services' },
          { label: 'Dự án', href: '/our-work' },
          { label: 'Tin tức & Sự kiện', href: '/insights' },
          { label: 'Tuyển dụng', href: '/careers' },
        ],
      };

  return (
    <footer
      id="contact"
      className="egead-home-footer relative w-full overflow-hidden text-white border-t border-white/10"
    >
      {/* Subtle matching homepage ambient lime radiance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(52% 65% at 92% 28%, rgba(156, 196, 59, 0.24) 0%, rgba(156, 196, 59, 0.06) 46%, transparent 74%)',
        }}
      />

      <div className="relative z-10 flex flex-col justify-between w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-20 sm:pt-28 pb-0 gap-10 sm:gap-12">
        {/* Top Row: Contact Hero + Quick Nav */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="flex flex-col items-start gap-6 max-w-3xl">
            {/* Label chip [ 05 | Start a project ] */}
            <div className="inline-flex items-stretch gap-[3px] font-mono text-[11px] font-medium">
              <span className="inline-grid place-items-center min-w-[30px] px-2 py-1.5 rounded-[2px] bg-[#9CC43B] text-black font-semibold">
                05
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-[2px] bg-white text-black font-medium">
                {copy.kicker}
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="text-[clamp(42px,5.2vw,88px)] font-normal leading-[1.02] text-white">
              {copy.titleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h2>

            {/* Description */}
            <p className="max-w-[34em] text-[16px] sm:text-[18px] leading-relaxed text-[#c6ced9]">
              {copy.bodyLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </p>

            {/* Primary CTA Button */}
            <div>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-3 rounded-[3px] bg-[#9CC43B] px-6 py-3.5 text-[14px] font-medium text-black transition-colors hover:bg-[#afd64e]"
              >
                <span>{copy.cta}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Right Quick Links + Back to Top */}
          <div className="flex flex-col items-start lg:items-end justify-end gap-5 text-[13.5px]">
            <nav aria-label="Footer navigation" className="flex flex-wrap lg:justify-end gap-x-6 gap-y-2.5">
              {copy.links.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="text-white/75 hover:text-[#9CC43B] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-[3px] border border-white/15 bg-white/[0.04] px-3.5 py-2 text-[12px] font-mono text-white/80 hover:border-[#9CC43B] hover:text-[#9CC43B] transition-colors cursor-pointer"
            >
              <span>{isEn ? 'Back to top' : 'Lên đầu trang'}</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>

        {/* Full-Width Brand Info + 3 Office Locations Grid (VP BMT · VP HN · VP SG) */}
        <div className="egead-footer-brand-block">
          <div className="egead-footer-brand-top">
            <div className="egead-footer-brand-meta">
              <Link href={homeHref} className="inline-block transition-opacity hover:opacity-90">
                <img
                  src="/assets/logo/logo-color.png"
                  alt="E-GEAD"
                  className="egead-footer-brand-logo"
                />
              </Link>
              <div className="egead-footer-brand-info">
                <span className="egead-footer-brand-name">{copy.companyName}</span>
                <span className="egead-footer-brand-sep">·</span>
                <a href={`mailto:${copy.email}`} className="egead-footer-brand-link">
                  {copy.email}
                </a>
                <span className="egead-footer-brand-sep">·</span>
                <Link href="/privacy-policy" className="egead-footer-brand-link">
                  {copy.privacy}
                </Link>
              </div>
            </div>
          </div>

          <div className="egead-footer-offices">
            {EGEAD_OFFICES.map((office) => (
              <div key={office.code} className="egead-footer-office">
                <div className="egead-footer-office__head">
                  <span className="egead-footer-office__code">{office.code}</span>
                  <span className="egead-footer-office__title">
                    {isEn ? office.nameEn : office.nameVi}
                  </span>
                  <span className="egead-footer-office__city">
                    {isEn ? office.cityEn : office.cityVi}
                  </span>
                </div>
                <p className="egead-footer-office__addr">
                  {isEn ? office.addressEn : office.addressVi}
                </p>
                <div className="egead-footer-office__hours">
                  <span>{isEn ? office.hoursEn : office.hoursVi}</span>
                  <span className="egead-footer-office__hours-note">
                    {isEn ? office.noteEn : office.noteVi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-Fit Edge-to-Edge Giant Wordmark — 1:1 with Homepage lr() */}
        <AutoFitWordmark text="EGEAD COMPANY" />
      </div>
    </footer>
  );
}
