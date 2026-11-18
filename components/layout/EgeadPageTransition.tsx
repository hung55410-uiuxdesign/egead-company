'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const SESSION_KEY = 'egead-page-transition';
const CELL = 32;

function isHomePath(p: string): boolean {
  return p === '/' || p === '/en' || p === '/en/';
}

interface WaveCell {
  x: number;
  y: number;
  dist: number;
  jitter: number;
}

function buildWaveCells(w: number, h: number, ox: number, oy: number) {
  const cols = Math.ceil(w / CELL);
  const rows = Math.ceil(h / CELL);
  const maxDist = Math.max(
    Math.hypot(ox, oy),
    Math.hypot(w - ox, oy),
    Math.hypot(ox, h - oy),
    Math.hypot(w - ox, h - oy),
    1
  );
  const cells: WaveCell[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * CELL + CELL * 0.5;
      const cy = r * CELL + CELL * 0.5;
      const dist = Math.hypot(cx - ox, cy - oy) / maxDist;
      const hash = Math.sin(c * 127.1 + r * 311.7) * 43758.5453;
      const jitter = (hash - Math.floor(hash)) * 0.14;
      cells.push({ x: c * CELL, y: r * CELL, dist, jitter });
    }
  }
  return cells;
}

/**
 * Architectural Radial Pixel-Grid Wave Page Transition (Obsidian #04060e + EGEAD #9CC43B leading edge).
 * Works seamlessly across SPA transitions between sub-pages AND full transitions to/from the 3D Homepage.
 */
export default function EgeadPageTransition() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(false);
  const pendingRevealRef = useRef<{ x: number; y: number } | null>(null);
  const prevPathRef = useRef(pathname);

  const runWave = (
    mode: 'cover' | 'reveal',
    originX: number,
    originY: number,
    durationMs: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve();
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve();
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.display = 'block';

      const cells = buildWaveCells(w, h, originX, originY);
      const start = performance.now();

      const step = (now: number) => {
        const raw = Math.min(1, (now - start) / durationMs);
        // Smooth cubic ease-in-out
        const progress = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
        const frontier = progress * 1.28;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        if (mode === 'cover') {
          for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const d = frontier - (cell.dist + cell.jitter);
            if (d <= 0) continue;
            if (d < 0.14) {
              // Leading glowing EGEAD #9CC43B pixel frontier!
              ctx.fillStyle = d < 0.06 ? 'rgba(156, 196, 59, 0.85)' : 'rgba(92, 125, 27, 0.92)';
            } else {
              ctx.fillStyle = '#04060e';
            }
            ctx.fillRect(cell.x, cell.y, CELL + 0.5, CELL + 0.5);
          }
        } else {
          for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const d = frontier - (cell.dist + cell.jitter);
            if (d >= 0.14) continue;
            if (d > 0) {
              ctx.fillStyle = d < 0.07 ? 'rgba(92, 125, 27, 0.88)' : 'rgba(156, 196, 59, 0.72)';
            } else {
              ctx.fillStyle = '#04060e';
            }
            ctx.fillRect(cell.x, cell.y, CELL + 0.5, CELL + 0.5);
          }
        }

        if (raw < 1) {
          requestAnimationFrame(step);
        } else {
          if (mode === 'cover') {
            ctx.fillStyle = '#04060e';
            ctx.fillRect(0, 0, w, h);
          } else {
            ctx.clearRect(0, 0, w, h);
            canvas.style.display = 'none';
          }
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  };

  // Arrival reveal after full reload (e.g. entering/leaving the 3D Homepage)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        sessionStorage.removeItem(SESSION_KEY);
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.at === 'number' && Date.now() - parsed.at < 5000) {
          const ox = typeof parsed.x === 'number' ? parsed.x : window.innerWidth * 0.5;
          const oy = typeof parsed.y === 'number' ? parsed.y : window.innerHeight * 0.5;
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
              canvas.style.width = `${window.innerWidth}px`;
              canvas.style.height = `${window.innerHeight}px`;
              canvas.style.display = 'block';
              ctx.fillStyle = '#04060e';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              runWave('reveal', ox, oy, 420).finally(() => {
                activeRef.current = false;
              });
            });
          });
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Arrival reveal on Next.js SPA route change between sub-pages
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      const pending = pendingRevealRef.current;
      pendingRevealRef.current = null;
      const ox = pending?.x ?? window.innerWidth * 0.5;
      const oy = pending?.y ?? window.innerHeight * 0.5;
      requestAnimationFrame(() => {
        runWave('reveal', ox, oy, 400).finally(() => {
          activeRef.current = false;
        });
      });
    }
  }, [pathname]);

  // Global internal link click interceptor + window.__egeadNavigate bridge
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    const triggerNavigate = (href: string, ox: number, oy: number) => {
      if (activeRef.current) return;
      let targetUrl: URL;
      try {
        targetUrl = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (targetUrl.origin !== window.location.origin) {
        window.location.href = href;
        return;
      }
      if (targetUrl.pathname.startsWith('/admin')) {
        window.location.href = href;
        return;
      }

      const destPath = targetUrl.pathname;
      const currentPath = window.location.pathname;
      if (destPath === currentPath) {
        if (targetUrl.hash) {
          window.location.hash = targetUrl.hash;
        }
        return;
      }

      if (reduced) {
        if (isHomePath(destPath) || isHomePath(currentPath)) {
          window.location.assign(targetUrl.pathname + targetUrl.search + targetUrl.hash);
        } else {
          router.push(targetUrl.pathname + targetUrl.search + targetUrl.hash);
        }
        return;
      }

      activeRef.current = true;
      const needsFullReload = isHomePath(destPath) || isHomePath(currentPath);

      runWave('cover', ox, oy, 320).then(() => {
        const dest = targetUrl.pathname + targetUrl.search + targetUrl.hash;
        if (needsFullReload) {
          try {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify({ at: Date.now(), x: ox, y: oy }));
          } catch {
            // ignore
          }
          window.location.assign(dest);
        } else {
          pendingRevealRef.current = { x: ox, y: oy };
          router.push(dest);
          // Safety fallback in case route does not emit pathname change
          window.setTimeout(() => {
            if (activeRef.current && pendingRevealRef.current) {
              pendingRevealRef.current = null;
              runWave('reveal', ox, oy, 360).finally(() => {
                activeRef.current = false;
              });
            }
          }, 1800);
        }
      });
    };

    (window as unknown as { __egeadNavigate?: typeof triggerNavigate }).__egeadNavigate = triggerNavigate;

    const onCaptureClick = (ev: MouseEvent) => {
      if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) {
        return;
      }
      const target = ev.target as Element | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const rawHref = anchor.getAttribute('href') || '';
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith('/admin')) return;
      if (url.pathname === window.location.pathname) return;

      // Intercept internal page change and play the radial pixel-grid wave transition!
      ev.preventDefault();
      ev.stopPropagation();
      triggerNavigate(url.pathname + url.search + url.hash, ev.clientX, ev.clientY);
    };

    document.addEventListener('click', onCaptureClick, true);
    return () => {
      document.removeEventListener('click', onCaptureClick, true);
    };
  }, [router]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ display: 'none' }}
    />
  );
}
