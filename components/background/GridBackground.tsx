'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Site-wide animated background.
 *
 * A fixed canvas draws a perspective grid floor that drifts toward the viewer and tilts with the
 * mouse, "+" marks on the grid intersections, two soft glows and a few floating particles.
 * Everything inside <main data-grid-bg> that has an opaque dark full-width background is made
 * transparent (see globals.css and `markSeeThroughSections`) so the grid shows on every page.
 */

const BASE_COLOR = '#04080A';
const ACCENT = '16, 231, 116'; // brand green #10E774

const PARTICLE_COUNT = 34;
const GRID_STEP = 2.4;
const GRID_Y = -5.8;

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  accent: boolean;
  phase: number;
}

interface Projected {
  sx: number;
  sy: number;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  // --- Canvas animation ---------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let rafId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    // The grid is soft, thin lines: rendering at 1x is visually the same but 2-4x cheaper to paint.
    const dpr = 1;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    // Cap the frame rate: the grid drifts slowly, 30 fps (24 on weak machines) is indistinguishable from 60.
    const frameInterval = 1000 / (lowEnd ? 24 : 30);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // With reduced motion there is no loop, so repaint the static frame after a resize.
      if (reduceMotion && drawFrame) drawFrame(performance.now());
    };
    let drawFrame: ((now: number) => void) | null = null;
    resize();

    // Mouse target (-1..1), smoothed value, scroll target and smoothed scroll.
    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let scrollY = window.scrollY || 0;
    let smoothScroll = scrollY;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / Math.max(1, width) - 0.5) * 2;
      mouseY = (e.clientY / Math.max(1, height) - 0.5) * 2;
    };
    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 2.2,
      y: (Math.random() - 0.5) * 1.6,
      z: 0.2 + 0.8 * Math.random(),
      vx: (Math.random() - 0.5) * 0.014,
      vy: -0.008 - 0.016 * Math.random(),
      size: 1 + 1.8 * Math.random(),
      accent: i % 3 === 0,
      phase: Math.random() * Math.PI * 2,
    }));

    let lastTime = performance.now();
    let lastDrawn = 0;
    let travel = 0; // forward drift of the grid

    // Camera state for the current frame, used by `project`.
    let camX = 0;
    let camY = 0;
    let pitch = 0;
    let yaw = 0;
    let focal = 1;

    const project = (wx: number, wy: number, wz: number): Projected | null => {
      const dx = wx - camX;
      const dy = wy - camY;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const p = dx * sinYaw + wz * cosYaw;
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const depth = -dy * sinPitch + p * cosPitch;
      if (depth <= 0.35) return null;
      const scale = focal / depth;
      return {
        sx: 0.5 * width + (dx * cosYaw - wz * sinYaw) * scale,
        sy: 0.48 * height - (dy * cosPitch + p * sinPitch) * scale,
      };
    };

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = now * 0.001;

      smoothX += (mouseX - smoothX) * (1 - Math.exp(-6.5 * dt));
      smoothY += (mouseY - smoothY) * (1 - Math.exp(-6.5 * dt));
      smoothScroll += (scrollY - smoothScroll) * (1 - Math.exp(-8 * dt));
      if (!reduceMotion) travel += 0.32 * dt;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BASE_COLOR;
      ctx.fillRect(0, 0, width, height);

      // Accent glow (top right) follows the mouse a little.
      const gx = width * (0.91 - 0.04 * smoothX) + 28 * Math.sin(0.45 * time);
      const gy = height * (0.3 - 0.04 * smoothY) + 22 * Math.cos(0.38 * time);
      const glow = ctx.createRadialGradient(gx, gy, 12, gx, gy, 0.62 * Math.max(width, height));
      glow.addColorStop(0, `rgba(${ACCENT}, 0.26)`);
      glow.addColorStop(0.35, `rgba(${ACCENT}, 0.09)`);
      glow.addColorStop(0.72, `rgba(${ACCENT}, 0.015)`);
      glow.addColorStop(1, 'rgba(4, 8, 10, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Cool secondary glow (bottom left).
      const cx = width * (0.14 + 0.03 * smoothX);
      const cool = ctx.createRadialGradient(cx, 0.84 * height, 10, 0.14 * width, 0.84 * height, 0.52 * width);
      cool.addColorStop(0, 'rgba(12, 70, 62, 0.22)');
      cool.addColorStop(1, 'rgba(4, 8, 10, 0)');
      ctx.fillStyle = cool;
      ctx.fillRect(0, 0, width, height);

      // Camera: tilts with the mouse.
      focal = 1.12 * Math.min(width, height);
      const offset =
        (((0.0048 * smoothScroll + 0.85 * travel) % GRID_STEP) + GRID_STEP) % GRID_STEP;
      camX = 0.85 * smoothX + 0.22 * Math.sin(0.25 * time);
      camY = 0.65 - 0.45 * smoothY;
      yaw = -0.36 - 0.065 * smoothX;
      pitch = 0.72 + 0.045 * smoothY;

      // Lines running away from the viewer.
      ctx.lineWidth = 1;
      for (let i = -16; i <= 16; i++) {
        const x = GRID_STEP * i;
        const near = project(x, GRID_Y, -4);
        const far = project(x, GRID_Y, 48);
        if (!near || !far) continue;
        const g = ctx.createLinearGradient(near.sx, near.sy, far.sx, far.sy);
        g.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
        g.addColorStop(0.55, 'rgba(255, 255, 255, 0.08)');
        g.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(near.sx, near.sy);
        ctx.lineTo(far.sx, far.sy);
        ctx.stroke();
      }

      // Lines across, fading with distance.
      for (let i = -2; i <= 20; i++) {
        const z = GRID_STEP * i - offset;
        const left = project(-38.4, GRID_Y, z);
        const right = project(38.4, GRID_Y, z);
        if (!left || !right) continue;
        const fade = Math.max(0, 1 - Math.max(0, z) / 48);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.12 * fade * fade).toFixed(4)})`;
        ctx.beginPath();
        ctx.moveTo(left.sx, left.sy);
        ctx.lineTo(right.sx, right.sy);
        ctx.stroke();
      }

      // "+" marks on the intersections.
      for (let i = -2; i <= 18; i++) {
        const z = GRID_STEP * i - offset;
        const fade = Math.max(0, 1 - Math.max(0, z) / 48);
        const alpha = Math.min(0.48, 0.54 * fade * fade);
        if (alpha < 0.03) continue;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.lineWidth = Math.max(1.2, Math.min(2.6, 12 / Math.max(4, z + 6)));
        for (let j = -15; j <= 15; j++) {
          const x = GRID_STEP * j;
          const c = project(x, GRID_Y, z);
          if (!c || c.sx < -40 || c.sx > width + 40 || c.sy < -40 || c.sy > height + 40) continue;
          const l = project(x - 0.28, GRID_Y, z);
          const r = project(x + 0.28, GRID_Y, z);
          const u = project(x, GRID_Y, z - 0.28);
          const d = project(x, GRID_Y, z + 0.28);
          if (!l || !r || !u || !d) continue;
          ctx.beginPath();
          ctx.moveTo(l.sx, l.sy);
          ctx.lineTo(r.sx, r.sy);
          ctx.moveTo(u.sx, u.sy);
          ctx.lineTo(d.sx, d.sy);
          ctx.stroke();
        }
      }

      // Floating particles.
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.y < -0.95) p.y = 0.95;
          if (p.x < -1.2) p.x = 1.2;
          if (p.x > 1.2) p.x = -1.2;
        }
        const px = 0.5 * width + (p.x - 0.08 * smoothX * p.z) * width * 0.52;
        const py = 0.5 * height + (p.y - 0.06 * smoothY * p.z) * height * 0.52;
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(1.4 * time + p.phase));
        const a = (p.accent ? 0.45 : 0.26) * twinkle * p.z;
        ctx.fillStyle = p.accent
          ? `rgba(${ACCENT}, ${a.toFixed(3)})`
          : `rgba(226, 238, 255, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * p.z, 0, Math.PI * 2);
        ctx.fill();
      }

    };
    drawFrame = draw;

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      // Small tolerance so a display refreshing at ~30 Hz does not lose every other frame to jitter.
      if (now - lastDrawn < frameInterval * 0.85) return;
      lastDrawn = now;
      draw(now);
    };

    if (reduceMotion) {
      // Static grid, no animation loop at all.
      draw(performance.now());
    } else {
      rafId = requestAnimationFrame(loop);
    }

    // Stop painting while the tab is hidden and resume (without a big time jump) when it is back.
    const onVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // --- Let the grid show through opaque dark full-width sections ------------
  useEffect(() => {
    let timer: number | undefined;

    const run = () => {
      const main = document.querySelector<HTMLElement>('main[data-grid-bg]');
      if (main) markSeeThroughSections(main);
    };
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(run, 150);
    };

    schedule();
    const main = document.querySelector('main[data-grid-bg]');
    const observer = main ? new MutationObserver(schedule) : null;
    if (main && observer) observer.observe(main, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}

/** Marks full-width elements with an opaque dark background so CSS can make them transparent. */
function markSeeThroughSections(main: HTMLElement) {
  const minWidth = window.innerWidth * 0.95;
  const candidates = main.querySelectorAll<HTMLElement>(
    'section, main > *, main > * > *, main > * > * > *',
  );

  candidates.forEach((el) => {
    if (el.hasAttribute('data-grid-see-through')) return;
    if (el.offsetWidth < minWidth || el.offsetHeight < 120) return;
    const style = getComputedStyle(el);
    if (style.backgroundImage !== 'none' || style.position === 'fixed') return;
    const match = style.backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (!match) return;
    const [r, g, b, a = '1'] = match[1].split(/[\s,/]+/).filter(Boolean);
    if (Number(a) < 0.95) return;
    if (Number(r) < 40 && Number(g) < 40 && Number(b) < 40) {
      el.setAttribute('data-grid-see-through', '');
    }
  });
}
