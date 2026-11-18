'use client';

import React, { useEffect, useRef } from 'react';

interface FloatingMote {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  isLime: boolean;
  phase: number;
}

/**
 * Living 3D perspective architectural grid with `+` crosshairs,
 * mouse-reactive parallax, scroll-driven forward glide, continuous ambient drift,
 * luminous EGEAD #9CC43B lime radiance, and softly drifting light motes.
 * Matches the living 3D space grid feel of the EGEAD homepage.
 */
export default function EgeadLiveGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let rafId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();

    // Pointer & scroll state with smooth exponential damping
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetScrollY = window.scrollY || 0;
    let smoothScrollY = targetScrollY;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / Math.max(1, width) - 0.5) * 2;
      targetMouseY = (e.clientY / Math.max(1, height) - 0.5) * 2;
    };
    const onScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Subtle floating ambient light motes
    const motes: FloatingMote[] = Array.from({ length: 34 }, (_, i) => ({
      x: (Math.random() - 0.5) * 2.2,
      y: (Math.random() - 0.5) * 1.6,
      z: 0.2 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.014,
      vy: -0.008 - Math.random() * 0.016,
      size: 1.0 + Math.random() * 1.8,
      isLime: i % 3 === 0,
      phase: Math.random() * Math.PI * 2,
    }));

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    let lastTime = performance.now();
    let driftZ = 0;

    // 3D perspective projection matching homepage space grid aesthetic
    const project = (
      wx: number,
      wy: number,
      wz: number,
      camX: number,
      camY: number,
      pitch: number,
      yaw: number,
      fov: number
    ) => {
      const rx = wx - camX;
      const ry = wy - camY;
      const rz = wz;

      // Yaw rotation around Y
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const x1 = rx * cy - rz * sy;
      const z1 = rx * sy + rz * cy;

      // Pitch rotation around X (positive pitch looks downward onto the 3D floor plane)
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const y2 = ry * cp + z1 * sp;
      const z2 = -ry * sp + z1 * cp;

      if (z2 <= 0.35) return null;
      const scale = fov / z2;
      return {
        sx: width * 0.5 + x1 * scale,
        sy: height * 0.48 - y2 * scale,
        depth: z2,
        scale,
      };
    };

    const drawFrame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = now * 0.001;

      // Smooth damping for mouse & scroll
      const damp = 1 - Math.exp(-6.5 * dt);
      mouseX += (targetMouseX - mouseX) * damp;
      mouseY += (targetMouseY - mouseY) * damp;
      smoothScrollY += (targetScrollY - smoothScrollY) * (1 - Math.exp(-8.0 * dt));

      if (!reducedMotion) {
        driftZ += dt * 0.32;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Deep Midnight Obsidian base (#02040c)
      ctx.fillStyle = '#02040c';
      ctx.fillRect(0, 0, width, height);

      // 2. Living Signature EGEAD #9CC43B Lime Ambient Radiance (gently breathing & mouse-reactive)
      const glowX = width * (0.91 - mouseX * 0.04) + Math.sin(t * 0.45) * 28;
      const glowY = height * (0.30 - mouseY * 0.04) + Math.cos(t * 0.38) * 22;
      const glowR = Math.max(width, height) * 0.62;
      const limeGrad = ctx.createRadialGradient(glowX, glowY, 12, glowX, glowY, glowR);
      limeGrad.addColorStop(0, 'rgba(156, 196, 59, 0.34)');
      limeGrad.addColorStop(0.35, 'rgba(156, 196, 59, 0.12)');
      limeGrad.addColorStop(0.72, 'rgba(156, 196, 59, 0.02)');
      limeGrad.addColorStop(1, 'rgba(2, 4, 12, 0)');
      ctx.fillStyle = limeGrad;
      ctx.fillRect(0, 0, width, height);

      // Secondary subtle cool midnight navy depth glow bottom-left
      const coolGrad = ctx.createRadialGradient(
        width * (0.14 + mouseX * 0.03),
        height * 0.84,
        10,
        width * 0.14,
        height * 0.84,
        width * 0.52
      );
      coolGrad.addColorStop(0, 'rgba(26, 46, 90, 0.26)');
      coolGrad.addColorStop(1, 'rgba(2, 4, 12, 0)');
      ctx.fillStyle = coolGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Real 3D Perspective Aerial Tilted Grid with Crisp `+` Crosshairs (matches Homepage 1:1!)
      const fov = Math.min(width, height) * 1.12;
      const cellSize = 2.4;
      const cols = 16;
      const rows = 20;
      const floorY = -5.8;
      const scrollAdvance = smoothScrollY * 0.0048 + driftZ * 0.85;
      const zOffset = ((scrollAdvance % cellSize) + cellSize) % cellSize;

      const camX = mouseX * 0.85 + Math.sin(t * 0.25) * 0.22;
      const camY = 0.65 - mouseY * 0.45;
      const yaw = -0.36 - mouseX * 0.065;
      const pitch = 0.72 + mouseY * 0.045;

      // Grid lines along Z (sweeping diagonally across the entire viewport!)
      ctx.lineWidth = 1;
      for (let ix = -cols; ix <= cols; ix++) {
        const wx = ix * cellSize;
        const nearP = project(wx, floorY, -4.0, camX, camY, pitch, yaw, fov);
        const farP = project(wx, floorY, rows * cellSize, camX, camY, pitch, yaw, fov);
        if (!nearP || !farP) continue;
        const lg = ctx.createLinearGradient(nearP.sx, nearP.sy, farP.sx, farP.sy);
        lg.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
        lg.addColorStop(0.55, 'rgba(255, 255, 255, 0.08)');
        lg.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
        ctx.strokeStyle = lg;
        ctx.beginPath();
        ctx.moveTo(nearP.sx, nearP.sy);
        ctx.lineTo(farP.sx, farP.sy);
        ctx.stroke();
      }

      // Grid lines along X (gliding smoothly with scroll & ambient drift)
      for (let iz = -2; iz <= rows; iz++) {
        const wz = iz * cellSize - zOffset;
        const leftP = project(-cols * cellSize, floorY, wz, camX, camY, pitch, yaw, fov);
        const rightP = project(cols * cellSize, floorY, wz, camX, camY, pitch, yaw, fov);
        if (!leftP || !rightP) continue;
        const fade = Math.max(0, 1 - Math.max(0, wz) / (rows * cellSize));
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.12 * fade * fade).toFixed(4)})`;
        ctx.beginPath();
        ctx.moveTo(leftP.sx, leftP.sy);
        ctx.lineTo(rightP.sx, rightP.sy);
        ctx.stroke();
      }

      // Bold crisp `+` Crosshair markers at 3D grid intersections (matching Homepage `+` crosses!)
      for (let iz = -2; iz <= rows - 2; iz++) {
        const wz = iz * cellSize - zOffset;
        const fade = Math.max(0, 1 - Math.max(0, wz) / (rows * cellSize));
        const alpha = Math.min(0.48, 0.54 * fade * fade);
        if (alpha < 0.03) continue;

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.lineWidth = Math.max(1.2, Math.min(2.6, 12.0 / Math.max(4, wz + 6)));

        for (let ix = -cols + 1; ix <= cols - 1; ix++) {
          const wx = ix * cellSize;
          const p = project(wx, floorY, wz, camX, camY, pitch, yaw, fov);
          if (!p) continue;
          if (p.sx < -40 || p.sx > width + 40 || p.sy < -40 || p.sy > height + 40) continue;

          const arm = 0.28;
          const px1 = project(wx - arm, floorY, wz, camX, camY, pitch, yaw, fov);
          const px2 = project(wx + arm, floorY, wz, camX, camY, pitch, yaw, fov);
          const pz1 = project(wx, floorY, wz - arm, camX, camY, pitch, yaw, fov);
          const pz2 = project(wx, floorY, wz + arm, camX, camY, pitch, yaw, fov);
          if (px1 && px2 && pz1 && pz2) {
            ctx.beginPath();
            ctx.moveTo(px1.sx, px1.sy);
            ctx.lineTo(px2.sx, px2.sy);
            ctx.moveTo(pz1.sx, pz1.sy);
            ctx.lineTo(pz2.sx, pz2.sy);
            ctx.stroke();
          }
        }
      }

      // 4. Gently drifting ambient light motes (white + EGEAD #9CC43B)
      for (const m of motes) {
        if (!reducedMotion) {
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          if (m.y < -0.95) m.y = 0.95;
          if (m.x < -1.2) m.x = 1.2;
          if (m.x > 1.2) m.x = -1.2;
        }
        const sx = width * 0.5 + (m.x - mouseX * 0.08 * m.z) * width * 0.52;
        const sy = height * 0.5 + (m.y - mouseY * 0.06 * m.z) * height * 0.52;
        const pulse = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.4 + m.phase));
        const a = (m.isLime ? 0.45 : 0.26) * pulse * m.z;
        ctx.fillStyle = m.isLime
          ? `rgba(156, 196, 59, ${a.toFixed(3)})`
          : `rgba(226, 238, 255, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, m.size * m.z, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    rafId = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
