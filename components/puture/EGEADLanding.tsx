'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ROOT_PRERENDER_HTML, SHELL_PRERENDER_HTML } from './puture-html';

interface ScrollStop {
  y: number;
  chapter: string;
}

function collectScrollStops(): ScrollStop[] {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('main [data-chapter]')
  );
  if (sections.length === 0) return [{ y: 0, chapter: 'welcome' }];

  const vh = window.innerHeight || 1;
  const rawStops: ScrollStop[] = [];

  for (const section of sections) {
    const chapter = section.dataset.chapter || 'welcome';
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const isScene = section.classList.contains('scene');
    const layers = isScene
      ? Array.from(section.querySelectorAll<HTMLElement>('[data-in][data-out]'))
      : [];

    if (layers.length > 0) {
      const scrollable = Math.max(0, section.offsetHeight - vh);
      for (const layer of layers) {
        const inVal = Number(layer.dataset.in);
        const outVal = Math.min(1, Number(layer.dataset.out));
        if (Number.isNaN(inVal) || Number.isNaN(outVal)) continue;

        let y: number;
        if (inVal === 0 && section.id === 'welcome') {
          y = 0;
        } else {
          const ratio = layer.classList.contains('studio-scene') ? 0.62 : 0.45;
          const progress = inVal + (outVal - inVal) * ratio;
          y = Math.round(sectionTop + progress * scrollable);
        }
        rawStops.push({ y: Math.max(0, y), chapter });
      }
    } else {
      rawStops.push({ y: Math.max(0, Math.round(sectionTop)), chapter });
    }
  }

  rawStops.sort((a, b) => a.y - b.y);
  const stops: ScrollStop[] = [];
  for (const stop of rawStops) {
    if (stops.length === 0 || stop.y - stops[stops.length - 1].y > 150) {
      stops.push(stop);
    }
  }
  return stops.length > 0 ? stops : [{ y: 0, chapter: 'welcome' }];
}

function findNearestStopIndex(stops: ScrollStop[], scrollY: number): number {
  if (stops.length <= 1) return 0;
  let bestIdx = 0;
  let bestDist = Math.abs(scrollY - stops[0].y);
  for (let i = 1; i < stops.length; i++) {
    const dist = Math.abs(scrollY - stops[i].y);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  }
  return bestIdx;
}

function scrollToPosition(targetY: number, duration = 1.1) {
  const win = typeof window !== 'undefined' ? (window as any) : null;
  const lenis = win?.__egeadLenis;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(targetY, { duration, force: true });
  } else {
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
}

function detectSiteLang(): 'vi' | 'en' {
  if (typeof window === 'undefined') return 'vi';
  if (window.location.pathname.startsWith('/en')) return 'en';
  try {
    if (localStorage.getItem('egead-lang') === 'en') return 'en';
  } catch {
    // ignore storage errors
  }
  return 'vi';
}

function useSiteLang(): 'vi' | 'en' {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    const update = () => setLang(detectSiteLang());
    update();
    window.addEventListener('popstate', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return lang;
}

function ScrollNavigationDock() {
  const lang = useSiteLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalStops, setTotalStops] = useState(1);
  const [isAtTop, setIsAtTop] = useState(true);
  const targetIdxRef = useRef<number | null>(null);
  const lastNavTimeRef = useRef(0);

  const syncFromScroll = useCallback(() => {
    const stops = collectScrollStops();
    setTotalStops(stops.length);
    const scrollY = window.scrollY;
    setIsAtTop(scrollY < 120);

    // Keep displayed index synced to target briefly while Lenis is animating to it
    const now = Date.now();
    if (
      targetIdxRef.current !== null &&
      now - lastNavTimeRef.current < 1250 &&
      targetIdxRef.current < stops.length
    ) {
      const targetY = stops[targetIdxRef.current].y;
      if (Math.abs(scrollY - targetY) <= 60) {
        targetIdxRef.current = null;
      } else {
        setActiveIndex(targetIdxRef.current);
        return;
      }
    }

    targetIdxRef.current = null;
    setActiveIndex(findNearestStopIndex(stops, scrollY));
  }, []);

  useEffect(() => {
    const clearManual = () => {
      targetIdxRef.current = null;
    };

    window.addEventListener('scroll', syncFromScroll, { passive: true });
    window.addEventListener('resize', syncFromScroll, { passive: true });
    window.addEventListener('wheel', clearManual, { passive: true });
    window.addEventListener('touchstart', clearManual, { passive: true });

    const rootEl = document.getElementById('root');
    const observer = rootEl ? new MutationObserver(syncFromScroll) : null;
    if (rootEl && observer) {
      observer.observe(rootEl, { childList: true, subtree: true });
    }

    const initTimer = window.setTimeout(syncFromScroll, 400);
    syncFromScroll();

    return () => {
      window.clearTimeout(initTimer);
      window.removeEventListener('scroll', syncFromScroll);
      window.removeEventListener('resize', syncFromScroll);
      window.removeEventListener('wheel', clearManual);
      window.removeEventListener('touchstart', clearManual);
      observer?.disconnect();
    };
  }, [syncFromScroll]);

  const navigateStep = useCallback((direction: -1 | 1) => {
    const stops = collectScrollStops();
    if (stops.length === 0) return;

    const scrollY = window.scrollY;
    const now = Date.now();
    const inFlight =
      targetIdxRef.current !== null && now - lastNavTimeRef.current < 1250;

    let nextIdx: number;
    if (inFlight && targetIdxRef.current !== null) {
      nextIdx = Math.max(0, Math.min(stops.length - 1, targetIdxRef.current + direction));
    } else if (direction === 1) {
      const found = stops.findIndex((s) => s.y > scrollY + 120);
      nextIdx = found === -1 ? stops.length - 1 : found;
    } else {
      let found = 0;
      for (let i = stops.length - 1; i >= 0; i--) {
        if (stops[i].y < scrollY - 120) {
          found = i;
          break;
        }
      }
      nextIdx = found;
    }

    targetIdxRef.current = nextIdx;
    lastNavTimeRef.current = now;
    setTotalStops(stops.length);
    setActiveIndex(nextIdx);
    scrollToPosition(stops[nextIdx].y, 1.1);
  }, []);

  const handleScrollTop = useCallback(() => {
    targetIdxRef.current = 0;
    lastNavTimeRef.current = Date.now();
    setActiveIndex(0);
    scrollToPosition(0, 1.2);
  }, []);

  const isFirst = activeIndex <= 0 && isAtTop;
  const isLast = activeIndex >= totalStops - 1;
  const currentLabel = String(Math.min(activeIndex + 1, totalStops)).padStart(2, '0');
  const totalLabel = String(totalStops).padStart(2, '0');

  const navLabels = lang === 'en'
    ? {
        dock: 'Page section navigation',
        stepper: 'Switch section',
        prev: 'Previous section',
        next: 'Next section',
        top: 'Back to top',
      }
    : {
        dock: 'Điều hướng phần trang web',
        stepper: 'Chuyển phần',
        prev: 'Section trước',
        next: 'Section tiếp theo',
        top: 'Về đầu trang',
      };

  return (
    <aside
      className="scroll-navigation-dock"
      aria-label={navLabels.dock}
    >
      {/* Cụm chuyển section trước / tiếp theo (mũi tên chevron) */}
      <div className="dock-stepper" role="group" aria-label={navLabels.stepper}>
        <button
          type="button"
          className={`dock-action-btn dock-action-btn--prev ${isFirst ? 'dock-action-btn--disabled' : ''}`}
          onClick={() => navigateStep(-1)}
          disabled={isFirst}
          aria-label={navLabels.prev}
          title={navLabels.prev}
        >
          <svg
            className="dock-action-btn__icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>

        <span className="dock-stepper__count" aria-hidden="true">
          <span className="dock-stepper__current">{currentLabel}</span>
          <span className="dock-stepper__sep">/</span>
          <span className="dock-stepper__total">{totalLabel}</span>
        </span>

        <button
          type="button"
          className={`dock-action-btn dock-action-btn--next ${isLast ? 'dock-action-btn--disabled' : ''}`}
          onClick={() => navigateStep(1)}
          disabled={isLast}
          aria-label={navLabels.next}
          title={navLabels.next}
        >
          <svg
            className="dock-action-btn__icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Nút Về đầu trang tách riêng */}
      <button
        type="button"
        className={`dock-action-btn dock-action-btn--top ${isAtTop ? 'dock-action-btn--dim' : ''}`}
        onClick={handleScrollTop}
        disabled={isAtTop}
        aria-label={navLabels.top}
        title={navLabels.top}
      >
        <svg
          className="dock-action-btn__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          aria-hidden="true"
        >
          <path d="M5 5h14M12 19V9M7 14l5-5 5 5" />
        </svg>
      </button>
    </aside>
  );
}

interface EbayNodeTooltipState {
  active?: boolean;
  exhibitVisible?: boolean;
  id?: string;
  name?: string;
  roleVi?: string;
  roleEn?: string;
  badgeVi?: string;
  badgeEn?: string;
  connections?: number;
  pinned?: boolean;
  x?: number;
  y?: number;
}

function EbayNodeOverlay() {
  const lang = useSiteLang();
  const [info, setInfo] = useState<EbayNodeTooltipState | null>(null);

  useEffect(() => {
    const onHover = (ev: Event) => {
      const detail = (ev as CustomEvent<EbayNodeTooltipState | null>).detail;
      setInfo(detail || null);
    };
    window.addEventListener('egead:node-hover', onHover);
    return () => window.removeEventListener('egead:node-hover', onHover);
  }, []);

  if (!info || !info.exhibitVisible) return null;

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const clampedX = Math.max(150, Math.min(vw - 150, info.x ?? vw * 0.65));
  const clampedY = Math.max(96, info.y ?? 180);
  const roleText = lang === 'en' ? info.roleEn : info.roleVi;
  const connCount = info.connections ?? 0;
  const customBadge = lang === 'en' ? info.badgeEn : info.badgeVi;
  const connBadge =
    customBadge ||
    (lang === 'en'
      ? `${connCount} ${connCount === 1 ? 'connection' : 'connections'}`
      : `${connCount} kết nối`);
  const hintText =
    lang === 'en'
      ? 'Drag to orbit 3D · Hover or click to interact'
      : 'Kéo để xoay 3D · Di chuột hoặc click để tương tác';

  return (
    <>
      {info.active && info.name && (
        <div
          className="ebay-node-tooltip"
          style={{ left: `${clampedX}px`, top: `${clampedY}px` }}
          role="status"
          aria-live="polite"
        >
          <div className="ebay-node-tooltip__head">
            <span className="ebay-node-tooltip__name">{info.name}</span>
            <span className="ebay-node-tooltip__badge">{connBadge}</span>
          </div>
          {roleText && <p className="ebay-node-tooltip__role">{roleText}</p>}
        </div>
      )}

      {!info.active && (
        <div className="ebay-node-hint" aria-hidden="true">
          {hintText}
        </div>
      )}
    </>
  );
}

export default function EGEADLanding() {
  const mountedRef = useRef(false);

  useEffect(() => {
    // Add page-specific class to html and body
    document.documentElement.classList.add('puture-landing-page');
    document.body.classList.add('puture-landing-page');

    if (!mountedRef.current) {
      mountedRef.current = true;

      // Verify #root exists
      const rootEl = document.getElementById('root');
      if (rootEl) {
        // Dynamically inject Puture entry script module
        const script = document.createElement('script');
        script.type = 'module';
        script.src = '/assets/main-v25.js?v=36';
        script.id = 'puture-main-bundle';
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
      }
    }

    return () => {
      document.documentElement.classList.remove('puture-landing-page');
      document.body.classList.remove('puture-landing-page');
      const script = document.getElementById('puture-main-bundle');
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Support deep links from sub-pages like /#work-exhibit-0 .. /#work-exhibit-8
  useEffect(() => {
    const match = /^#work-exhibit-(\d+)$/.exec(window.location.hash || '');
    if (!match) return;
    const workIdx = Number(match[1]);
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const sec = document.querySelector<HTMLElement>('main [data-chapter="work"]');
      const layers = sec ? Array.from(sec.querySelectorAll<HTMLElement>('[data-in][data-out]')) : [];
      const targetEl = layers[workIdx + 1] || layers[workIdx];
      if (sec && targetEl && sec.offsetHeight > window.innerHeight) {
        window.clearInterval(timer);
        const secTop = sec.getBoundingClientRect().top + window.scrollY;
        const span = Math.max(1, sec.offsetHeight - window.innerHeight);
        const dIn = Number(targetEl.dataset.in);
        const dOut = Math.min(1, Number(targetEl.dataset.out));
        const progress = dIn + (dOut - dIn) * 0.45;
        const targetY = Math.max(0, Math.round(secTop + progress * span));
        scrollToPosition(targetY, 1.0);
      } else if (tries > 40) {
        window.clearInterval(timer);
      }
    }, 150);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="puture-root-container">
      {/* Stylesheets directly loaded from Puture */}
      <link rel="stylesheet" href="/assets/navigation-BQ5-cxHW.css?v=3" />
      <link rel="stylesheet" href="/assets/ContactDialog-BPD9mSvP.css" />
      <link rel="stylesheet" href="/assets/main-DAiTGXDI.css" />

      {/* Global CSS overrides strictly for Puture */}
      <style jsx global>{`
        :root,
        html.puture-landing-page,
        body.puture-landing-page {
          --blue: #9CC43B !important;
          --blue-fill: #9CC43B !important;
          --blue-700: #5C7D1B !important;
          --blue-300: #C4E278 !important;
          --font-sans: var(--font-geist-sans), "Geist", system-ui, sans-serif !important;
          --font-mono: var(--font-geist-mono), "Geist Mono", ui-monospace, monospace !important;
          background-color: #000000 !important;
          color: #ffffff !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: clip !important;
          display: block !important;
          font-family: var(--font-geist-sans), "Geist", system-ui, sans-serif !important;
        }

        .puture-landing-page ::selection {
          background-color: #9CC43B !important;
          color: #000000 !important;
        }

        .puture-landing-page .btn--primary {
          background-color: #9CC43B !important;
          color: #000000 !important;
          font-weight: 500 !important;
        }

        .puture-landing-page .indicator__index {
          background-color: #9CC43B !important;
          color: #000000 !important;
          font-weight: 600 !important;
        }

        /* Remove max-w 1440 limitation on all containers */
        .puture-landing-page .container,
        .hero__inner.container {
          max-width: none !important;
          width: 100% !important;
        }

        body.puture-landing-page > main {
          padding: 0 !important;
          margin: 0 !important;
          background: transparent !important;
          max-width: none !important;
        }

        .puture-root-container {
          min-height: 100vh;
          width: 100%;
          background: #000000;
          color: #ffffff;
        }

        /* Ensure .shell and .space-stage take full viewport as intended */
        .puture-landing-page .space-stage {
          position: fixed !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100lvh !important;
          z-index: 0 !important;
        }

        .puture-landing-page .site-header {
          position: fixed !important;
          z-index: 200 !important;
          height: calc(76px + env(safe-area-inset-top)) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 16px !important;
        }

        .puture-landing-page .site-header__brand {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .puture-landing-page .site-header__actions {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 18px;
          position: relative;
          z-index: 2;
          margin-left: auto;
        }

        .puture-landing-page .site-header .nav-links.nav-links--centered {
          margin-left: auto !important;
          margin-right: auto !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 18px !important;
          position: relative;
          z-index: 3;
        }

        @media (min-width: 1380px) {
          .puture-landing-page .site-header .nav-links.nav-links--centered {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            margin: 0 !important;
            gap: 22px !important;
          }
        }

        .puture-landing-page .nav-group {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .puture-landing-page .nav-links--centered .nav-links__item {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          padding: 8px 4px !important;
          font-size: 13.5px !important;
          font-weight: 500 !important;
          letter-spacing: 0 !important;
          text-transform: none !important;
          white-space: nowrap !important;
          color: inherit !important;
          text-decoration: none !important;
          transition: color 0.2s ease !important;
          cursor: pointer;
        }

        .puture-landing-page .nav-links--centered .nav-links__item:hover,
        .puture-landing-page .nav-links--centered .nav-links__item.is-active {
          color: #9CC43B !important;
        }

        .puture-landing-page .is-light .nav-links--centered .nav-links__item:hover,
        .puture-landing-page .is-light .nav-links--centered .nav-links__item.is-active {
          color: #5C7D1B !important;
        }

        .puture-landing-page .nav-links__caret {
          font-size: 10px;
          opacity: 0.68;
          line-height: 1;
          transition: transform 0.2s ease, opacity 0.2s ease;
          display: inline-block;
        }

        .puture-landing-page .nav-group.is-open .nav-links__caret {
          transform: rotate(180deg);
          opacity: 1;
        }

        /* Fuse homepage header cleanly into the Architectural Command Curtain when open */
        .puture-landing-page .site-header:has(.egead-cmd-curtain) {
          background: rgba(5, 8, 17, 0.96) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .puture-landing-page .is-light .site-header:has(.egead-cmd-curtain) {
          background: rgba(246, 248, 251, 0.96) !important;
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        }

        /* Clean responsive collapse before any horizontal crowding */
        @media (max-width: 1120px) {
          .puture-landing-page .site-header .nav-links.nav-links--centered {
            display: none !important;
          }
          .puture-landing-page .site-header .menu-button {
            display: inline-flex !important;
          }
        }

        .puture-landing-page .site-header__logo-img {
          height: 54px !important;
          width: auto !important;
        }

        @media (max-width: 640px) {
          .puture-landing-page .site-header {
            height: calc(68px + env(safe-area-inset-top)) !important;
          }
          .puture-landing-page .site-header__logo-img {
            height: 44px !important;
          }
        }

        /* Completely hide old Awwwards ribbon */
        .awwwards-ribbon {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* Architectural HUD Quick Navigation — symmetric twin to bottom-left .indicator */
        .scroll-navigation-dock {
          position: fixed !important;
          right: 16px !important;
          bottom: calc(16px + env(safe-area-inset-bottom)) !important;
          top: auto !important;
          transform: none !important;
          z-index: 25 !important;
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: stretch !important;
          gap: 12px !important;
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          user-select: none !important;
        }

        .dock-stepper {
          display: inline-flex !important;
          align-items: stretch !important;
          gap: 3px !important;
        }

        .dock-stepper__count {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 2px !important;
          height: 44px !important;
          padding: 0 10px !important;
          background: #000000 !important;
          border-radius: var(--radius, 2px) !important;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16) !important;
          font-family: var(--font-mono) !important;
          font-size: 11px !important;
          line-height: 1 !important;
          font-weight: 500 !important;
          letter-spacing: normal !important;
        }

        .dock-stepper__current {
          color: #9CC43B !important;
        }

        .dock-stepper__sep,
        .dock-stepper__total {
          color: #8a909a !important;
        }

        @media (max-width: 520px) {
          .dock-stepper__count {
            display: none !important;
          }
        }

        .dock-action-btn {
          width: 44px !important;
          height: 44px !important;
          padding: 0 !important;
          border: none !important;
          border-radius: var(--radius, 2px) !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none !important;
          transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease !important;
        }

        .dock-action-btn--prev,
        .dock-action-btn--next {
          background: #000000 !important;
          color: #ffffff !important;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16) !important;
        }

        .dock-action-btn--prev:hover:not(:disabled),
        .dock-action-btn--next:hover:not(:disabled) {
          background: #9CC43B !important;
          color: #000000 !important;
          box-shadow: inset 0 0 0 1px #9CC43B !important;
        }

        .dock-action-btn--disabled,
        .dock-action-btn:disabled {
          background: #0b0d11 !important;
          color: #5e646e !important;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12) !important;
          cursor: not-allowed !important;
        }

        .dock-action-btn--top {
          background: #9CC43B !important;
          color: #000000 !important;
          box-shadow: inset 0 0 0 1px #9CC43B !important;
        }

        .dock-action-btn--top:hover:not(:disabled) {
          background: #000000 !important;
          color: #9CC43B !important;
          box-shadow: inset 0 0 0 1px #9CC43B !important;
        }

        .dock-action-btn--top.dock-action-btn--dim {
          background: #0b0d11 !important;
          color: #5e646e !important;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12) !important;
        }

        .dock-action-btn__icon {
          display: block !important;
          flex-shrink: 0 !important;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .dock-action-btn--prev:hover:not(:disabled) .dock-action-btn__icon,
        .dock-action-btn--top:hover:not(:disabled) .dock-action-btn__icon {
          transform: translateY(-2px) !important;
        }

        .dock-action-btn--next:hover:not(:disabled) .dock-action-btn__icon {
          transform: translateY(2px) !important;
        }

        /* Interactive 3D eBay Node Tooltip & Hint (matching Swiss 2px HUD language) */
        .ebay-node-tooltip {
          position: fixed !important;
          transform: translate(-50%, -100%) translateY(-14px) !important;
          z-index: 30 !important;
          pointer-events: none !important;
          min-width: 210px !important;
          max-width: 280px !important;
          padding: 10px 12px !important;
          background: #000000 !important;
          color: #ffffff !important;
          border-radius: var(--radius, 2px) !important;
          box-shadow: inset 0 0 0 1px rgba(156, 196, 59, 0.55) !important;
        }

        .ebay-node-tooltip__head {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 10px !important;
          margin-bottom: 4px !important;
        }

        .ebay-node-tooltip__name {
          font-family: var(--font-sans) !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          color: #ffffff !important;
          letter-spacing: normal !important;
          text-transform: none !important;
        }

        .ebay-node-tooltip__badge {
          font-family: var(--font-mono) !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          padding: 2px 6px !important;
          border-radius: var(--radius, 2px) !important;
          background: #9CC43B !important;
          color: #000000 !important;
          white-space: nowrap !important;
          letter-spacing: normal !important;
          text-transform: none !important;
        }

        .ebay-node-tooltip__role {
          margin: 0 !important;
          font-family: var(--font-sans) !important;
          font-size: 12px !important;
          line-height: 1.4 !important;
          color: #d9dce1 !important;
          letter-spacing: normal !important;
          text-transform: none !important;
        }

        .ebay-node-hint {
          position: fixed !important;
          right: 16px !important;
          bottom: calc(68px + env(safe-area-inset-bottom)) !important;
          z-index: 24 !important;
          pointer-events: none !important;
          padding: 6px 10px !important;
          background: rgba(0, 0, 0, 0.84) !important;
          color: #d9dce1 !important;
          border-radius: var(--radius, 2px) !important;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16) !important;
          font-family: var(--font-sans) !important;
          font-size: 11px !important;
          line-height: 1.3 !important;
          letter-spacing: normal !important;
          text-transform: none !important;
        }
      `}</style>

      {/* Mount points for Puture React bundle */}
      <div
        id="root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: ROOT_PRERENDER_HTML }}
      />
      <div
        className="shell"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: SHELL_PRERENDER_HTML }}
      />

      {/* Interactive 3D eBay Node HUD Overlay */}
      <EbayNodeOverlay />

      {/* Floating Back to Top & Next Section Navigation Dock */}
      <ScrollNavigationDock />
    </div>
  );
}
