/**
 * Real-time 3D "neural orb" for the home hero, drawn on a plain 2D canvas with a hand-rolled
 * perspective projection (no WebGL / three.js dependency).
 *
 * Layers, back to front: soft grey backdrop + bokeh, thin orbit rings, a hollow wireframe shell
 * (noise-displaced icosphere whose front cap fades out), orbiting ember particles, a small crystal
 * of orange wireframe and radiating spikes, and a pulsing white-orange core.
 */

type Vec3 = [number, number, number];

export interface OrbScene {
  start(): void;
  stop(): void;
  /** Draw a single frame at time `t` seconds (used for reduced motion and for tests). */
  renderAt(t: number): void;
  resize(): void;
  setPointer(nx: number, ny: number): void;
  destroy(): void;
}

// ---------- tiny helpers ----------

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function hash3(x: number, y: number, z: number) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Smooth 3D value noise in [0, 1]. */
function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = x - xi;
  const yf = y - yi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const w = zf * zf * (3 - 2 * zf);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash3(xi + dx, yi + dy, zi + dz);
  return lerp(
    lerp(lerp(c(0, 0, 0), c(1, 0, 0), u), lerp(c(0, 1, 0), c(1, 1, 0), u), v),
    lerp(lerp(c(0, 0, 1), c(1, 0, 1), u), lerp(c(0, 1, 1), c(1, 1, 1), u), v),
    w
  );
}

function normalize(v: Vec3): Vec3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

interface Mesh {
  verts: Vec3[];
  edges: [number, number][];
}

function icosphere(detail: number): { verts: Vec3[]; faces: [number, number, number][] } {
  const t = (1 + Math.sqrt(5)) / 2;
  let verts: Vec3[] = (
    [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
    ] as Vec3[]
  ).map(normalize);
  let faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  for (let d = 0; d < detail; d++) {
    const cache = new Map<number, number>();
    const mid = (a: number, b: number) => {
      const key = a < b ? a * 100000 + b : b * 100000 + a;
      const hit = cache.get(key);
      if (hit !== undefined) return hit;
      const va = verts[a];
      const vb = verts[b];
      verts.push(normalize([(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2]));
      cache.set(key, verts.length - 1);
      return verts.length - 1;
    };
    const next: [number, number, number][] = [];
    for (const [a, b, c] of faces) {
      const ab = mid(a, b);
      const bc = mid(b, c);
      const ca = mid(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = next;
  }
  return { verts, faces };
}

function edgesOf(faces: [number, number, number][]): [number, number][] {
  const seen = new Set<number>();
  const out: [number, number][] = [];
  const add = (a: number, b: number) => {
    const key = a < b ? a * 100000 + b : b * 100000 + a;
    if (seen.has(key)) return;
    seen.add(key);
    out.push([a, b]);
  };
  for (const [a, b, c] of faces) {
    add(a, b);
    add(b, c);
    add(c, a);
  }
  return out;
}

// ---------- sprites ----------

function makeSprite(size: number, stops: [number, string][]) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [at, color] of stops) grad.addColorStop(at, color);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

function makeBokeh(size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,170,80,0.10)");
  grad.addColorStop(0.8, "rgba(255,150,60,0.16)");
  grad.addColorStop(0.93, "rgba(255,190,110,0.32)");
  grad.addColorStop(1, "rgba(255,190,110,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

// ---------- the scene ----------

export function createOrbScene(
  canvas: HTMLCanvasElement,
  options: { lowPower?: boolean } = {}
): OrbScene {
  const ctx = canvas.getContext("2d")!;
  canvas.style.background =
    "radial-gradient(circle at 50% 50%, #c2c4c6 0%, #98999c 50%, #4a4c4f 100%)";
  const rand = mulberry32(20260514);

  // Shell: displaced, jittered icosphere
  const ico = icosphere(3);
  const shellVerts: Vec3[] = ico.verts.map((p) => {
    const n1 = noise3(p[0] * 1.7 + 11, p[1] * 1.7, p[2] * 1.7);
    const n2 = noise3(p[0] * 4.2, p[1] * 4.2 + 5, p[2] * 4.2);
    const r = 0.92 + (n1 - 0.5) * 0.24 + (n2 - 0.5) * 0.1;
    const j = 0.035;
    return [
      p[0] * r + (rand() - 0.5) * j,
      p[1] * r + (rand() - 0.5) * j,
      p[2] * r + (rand() - 0.5) * j,
    ] as Vec3;
  });
  const shell: Mesh = { verts: shellVerts, edges: edgesOf(ico.faces) };
  const sparkIdx: number[] = [];
  shellVerts.forEach((_, i) => {
    if (rand() < 0.07) sparkIdx.push(i);
  });

  // Crystal: small jagged icosphere
  const crystalIco = icosphere(1);
  const crystal: Mesh = {
    verts: crystalIco.verts.map((p) => {
      const r = 0.14 + rand() * 0.2;
      return [p[0] * r, p[1] * r * 1.15, p[2] * r] as Vec3;
    }),
    edges: edgesOf(crystalIco.faces),
  };

  // Spikes radiating from the core
  const spikes = Array.from({ length: 64 }, () => {
    const d = normalize([rand() - 0.5, rand() - 0.5, rand() - 0.5]);
    const len = 0.14 + Math.pow(rand(), 1.6) * 0.5;
    const kink = normalize([rand() - 0.5, rand() - 0.5, rand() - 0.5]);
    return {
      a: [d[0] * 0.04, d[1] * 0.04, d[2] * 0.04] as Vec3,
      m: [
        d[0] * len * 0.55 + kink[0] * 0.05,
        d[1] * len * 0.55 + kink[1] * 0.05,
        d[2] * len * 0.55 + kink[2] * 0.05,
      ] as Vec3,
      b: [d[0] * len, d[1] * len, d[2] * len] as Vec3,
      phase: rand() * Math.PI * 2,
      speed: 0.6 + rand() * 1.6,
    };
  });

  // Ember particles
  const particleCount = options.lowPower ? 200 : 460;
  const particles = Array.from({ length: particleCount }, () => {
    const dir = normalize([rand() - 0.5, rand() - 0.5, rand() - 0.5]);
    const r = Math.cbrt(rand()) * 1.02;
    return {
      p: [dir[0] * r, dir[1] * r, dir[2] * r] as Vec3,
      orbit: (rand() - 0.5) * 0.5,
      size: 0.7 + Math.pow(rand(), 2.2) * 4.2,
      phase: rand() * Math.PI * 2,
      twinkle: 0.8 + rand() * 2.2,
      hot: rand() < 0.3,
    };
  });

  // Bokeh blobs behind everything
  const bokeh = Array.from({ length: 6 }, () => ({
    x: (rand() - 0.5) * 2.2,
    y: (rand() - 0.5) * 1.6,
    r: 0.1 + rand() * 0.22,
    a: 0.5 + rand() * 0.5,
    phase: rand() * Math.PI * 2,
  }));

  const rings = [
    { r: 1.3, tilt: 0.0, speed: 0.02, a: 0.34 },
    { r: 1.62, tilt: 0.12, speed: -0.014, a: 0.22 },
    { r: 1.12, tilt: 0.34, speed: 0.03, a: 0.2 },
  ];

  const glowOrange = makeSprite(64, [
    [0, "rgba(255,150,30,1)"],
    [0.3, "rgba(255,110,10,0.85)"],
    [0.7, "rgba(230,80,0,0.18)"],
    [1, "rgba(220,70,0,0)"],
  ]);
  const glowHot = makeSprite(64, [
    [0, "rgba(255,252,225,1)"],
    [0.25, "rgba(255,214,120,0.95)"],
    [0.65, "rgba(255,150,30,0.25)"],
    [1, "rgba(255,120,0,0)"],
  ]);
  const coreGlow = makeSprite(256, [
    [0, "rgba(255,250,215,1)"],
    [0.1, "rgba(255,222,140,0.95)"],
    [0.3, "rgba(255,160,40,0.7)"],
    [0.6, "rgba(235,100,10,0.22)"],
    [1, "rgba(220,80,0,0)"],
  ]);
  const bokehSprite = makeBokeh(128);

  // state
  let width = 0;
  let height = 0;
  let dpr = 1;
  let cx = 0;
  let cy = 0;
  let R = 1;
  let focal = 1;
  let raf = 0;
  let running = false;
  let startTs = 0;
  let pointerX = 0;
  let pointerY = 0;
  let smoothX = 0;
  let smoothY = 0;

  const CAM_Z = 3.4;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = Math.min(height * 0.46, width * 0.47);
    cx = width / 2;
    cy = height * 0.5;
    focal = R * CAM_Z;
  }

  // projection scratch
  const sx = new Float32Array(shell.verts.length);
  const sy = new Float32Array(shell.verts.length);
  const sz = new Float32Array(shell.verts.length);

  function rotate(v: Vec3, cyaw: number, syaw: number, cp: number, sp: number): Vec3 {
    const x1 = v[0] * cyaw + v[2] * syaw;
    const z1 = -v[0] * syaw + v[2] * cyaw;
    const y2 = v[1] * cp - z1 * sp;
    const z2 = v[1] * sp + z1 * cp;
    return [x1, y2, z2];
  }

  function project(x: number, y: number, z: number, out: { x: number; y: number; k: number }) {
    const k = focal / (CAM_Z - z);
    out.x = cx + x * k;
    out.y = cy - y * k;
    out.k = k / focal;
  }

  const P = { x: 0, y: 0, k: 1 };
  const P2 = { x: 0, y: 0, k: 1 };

  function renderAt(t: number) {
    if (!width) resize();
    smoothX += (pointerX - smoothX) * 0.05;
    smoothY += (pointerY - smoothY) * 0.05;

    const yaw = t * 0.06 + smoothX * 0.35;
    const pitch = -0.18 + Math.sin(t * 0.11) * 0.07 + smoothY * 0.25;
    const cyaw = Math.cos(yaw);
    const syaw = Math.sin(yaw);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);

    // backdrop is the canvas' CSS gradient; just clear the previous frame
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, width, height);

    // bokeh
    ctx.globalCompositeOperation = "source-over";
    for (const b of bokeh) {
      const px = cx + (b.x + Math.sin(t * 0.07 + b.phase) * 0.05 - smoothX * 0.1) * R;
      const py = cy + (b.y + Math.cos(t * 0.05 + b.phase) * 0.04 - smoothY * 0.08) * R;
      const r = b.r * R;
      ctx.globalAlpha = b.a * (0.7 + 0.3 * Math.sin(t * 0.4 + b.phase));
      ctx.drawImage(bokehSprite, px - r, py - r, r * 2, r * 2);
    }

    // orbit rings
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 1;
    for (const ring of rings) {
      ctx.strokeStyle = `rgba(35,37,40,${ring.a})`;
      ctx.beginPath();
      ctx.ellipse(
        cx - smoothX * 14,
        cy - smoothY * 10,
        ring.r * R,
        ring.r * R * Math.cos(ring.tilt),
        t * ring.speed,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }

    // shell vertices
    const verts = shell.verts;
    for (let i = 0; i < verts.length; i++) {
      const r = rotate(verts[i], cyaw, syaw, cp, sp);
      project(r[0], r[1], r[2], P);
      sx[i] = P.x;
      sy[i] = P.y;
      sz[i] = r[2];
    }

    // shell edges, bucketed by alpha
    const BUCKETS = 6;
    const paths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
    for (const [a, b] of shell.edges) {
      const mz = (sz[a] + sz[b]) / 2;
      const mx = (verts[a][0] + verts[b][0]) / 2;
      const my = (verts[a][1] + verts[b][1]) / 2;
      const mzr = (verts[a][2] + verts[b][2]) / 2;
      // fade the front cap so the shell is hollow where the viewer looks in
      const rm = rotate([mx, my, mzr], cyaw, syaw, cp, sp);
      const facing = rm[2] / (Math.hypot(rm[0], rm[1], rm[2]) || 1);
      const hole = 1 - smoothstep(0.5, 0.82, facing);
      if (hole <= 0.02) continue;
      const depth = 0.1 + 0.9 * smoothstep(-0.7, 0.9, mz);
      const alpha = hole * depth;
      const bucket = Math.min(BUCKETS - 1, Math.floor(alpha * BUCKETS));
      paths[bucket].moveTo(sx[a], sy[a]);
      paths[bucket].lineTo(sx[b], sy[b]);
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 1.25;
    for (let b = 0; b < BUCKETS; b++) {
      ctx.strokeStyle = `rgba(16,17,20,${(0.12 + ((b + 0.5) / BUCKETS) * 0.85).toFixed(3)})`;
      ctx.stroke(paths[b]);
    }

    // shell nodes (3 alpha buckets -> 3 fills)
    const nodePaths = [new Path2D(), new Path2D(), new Path2D()];
    for (let i = 0; i < verts.length; i++) {
      const r = rotate(verts[i], cyaw, syaw, cp, sp);
      if (r[2] < -0.3) continue;
      const facing = r[2] / (Math.hypot(r[0], r[1], r[2]) || 1);
      const hole = 1 - smoothstep(0.5, 0.82, facing);
      if (hole <= 0.1) continue;
      const s = 1.4 + 2.8 * smoothstep(-0.7, 0.9, r[2]);
      nodePaths[Math.min(2, Math.floor(hole * 3))].rect(sx[i] - s / 2, sy[i] - s / 2, s, s);
    }
    for (let b = 0; b < 3; b++) {
      ctx.fillStyle = `rgba(14,15,18,${(0.35 + b * 0.3).toFixed(2)})`;
      ctx.fill(nodePaths[b]);
    }

    // sparks on the shell
    ctx.globalCompositeOperation = "source-over";
    for (const i of sparkIdx) {
      const r = rotate(verts[i], cyaw, syaw, cp, sp);
      const facing = r[2] / (Math.hypot(r[0], r[1], r[2]) || 1);
      const hole = 1 - smoothstep(0.5, 0.82, facing);
      if (hole <= 0.1) continue;
      const tw = 0.55 + 0.45 * Math.sin(t * 1.6 + i);
      const s = 16 * smoothstep(-1, 1, r[2]) + 8;
      ctx.globalAlpha = hole * tw * 0.9;
      ctx.drawImage(glowOrange, sx[i] - s / 2, sy[i] - s / 2, s, s);
    }

    // inner animation uses a counter-rotation
    const iyaw = -t * 0.17 + smoothX * 0.2;
    const ciy = Math.cos(iyaw);
    const siy = Math.sin(iyaw);
    const coreOffsetY = -0.06;
    const pulse = 1 + 0.08 * Math.sin(t * 1.7) + 0.04 * Math.sin(t * 3.1 + 1);

    // ember particles
    for (const pt of particles) {
      const a = t * pt.orbit;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const px = pt.p[0] * ca + pt.p[2] * sa;
      const pz = -pt.p[0] * sa + pt.p[2] * ca;
      const py = pt.p[1] + Math.sin(t * 0.4 + pt.phase) * 0.025;
      const r = rotate([px, py + coreOffsetY, pz], cyaw, syaw, cp, sp);
      project(r[0], r[1], r[2], P);
      const tw = 0.45 + 0.55 * Math.sin(t * pt.twinkle + pt.phase) ** 2;
      const s = pt.size * (0.6 + 0.8 * P.k) * (R / 380) * 4.2;
      ctx.globalAlpha = Math.min(1, tw * (0.5 + 0.5 * smoothstep(-1, 1, r[2])));
      ctx.drawImage(pt.hot ? glowHot : glowOrange, P.x - s / 2, P.y - s / 2, s, s);
    }

    // crystal wireframe
    ctx.lineWidth = 1.2;
    const cv = crystal.verts.map((v) => {
      const k = 1 + 0.1 * Math.sin(t * 2.2 + v[0] * 9);
      const r = rotate([v[0] * k * pulse, v[1] * k * pulse + coreOffsetY, v[2] * k * pulse], ciy, siy, cp, sp);
      project(r[0], r[1], r[2], P);
      return [P.x, P.y, r[2]] as Vec3;
    });
    ctx.strokeStyle = "rgba(255,170,60,0.95)";
    ctx.globalAlpha = 1;
    ctx.beginPath();
    for (const [a, b] of crystal.edges) {
      ctx.moveTo(cv[a][0], cv[a][1]);
      ctx.lineTo(cv[b][0], cv[b][1]);
    }
    ctx.stroke();

    // spikes
    for (const sp2 of spikes) {
      const flick = 0.35 + 0.65 * Math.sin(t * sp2.speed + sp2.phase) ** 2;
      const a = rotate([sp2.a[0] * pulse, sp2.a[1] * pulse + coreOffsetY, sp2.a[2] * pulse], ciy, siy, cp, sp);
      const m = rotate([sp2.m[0] * pulse, sp2.m[1] * pulse + coreOffsetY, sp2.m[2] * pulse], ciy, siy, cp, sp);
      const b = rotate([sp2.b[0] * pulse, sp2.b[1] * pulse + coreOffsetY, sp2.b[2] * pulse], ciy, siy, cp, sp);
      project(a[0], a[1], a[2], P);
      project(m[0], m[1], m[2], P2);
      const mx = P2.x;
      const my = P2.y;
      project(b[0], b[1], b[2], P2);
      ctx.strokeStyle = `rgba(255,${170 + Math.floor(flick * 70)},80,${(0.45 + 0.5 * flick).toFixed(3)})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(P.x, P.y);
      ctx.lineTo(mx, my);
      ctx.lineTo(P2.x, P2.y);
      ctx.stroke();
      ctx.globalAlpha = 0.55 * flick;
      const s = 9;
      ctx.drawImage(glowHot, P2.x - s / 2, P2.y - s / 2, s, s);
      ctx.globalAlpha = 1;
    }

    // core glow
    const cr = R * 0.46 * pulse;
    const core = rotate([0, coreOffsetY, 0], cyaw, syaw, cp, sp);
    project(core[0], core[1], core[2], P);
    ctx.globalAlpha = 0.92;
    ctx.drawImage(coreGlow, P.x - cr, P.y - cr, cr * 2, cr * 2);
    const hr = R * 0.15 * pulse;
    ctx.globalAlpha = 1;
    ctx.drawImage(glowHot, P.x - hr, P.y - hr, hr * 2, hr * 2);

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }

  function frame(ts: number) {
    if (!running) return;
    if (!startTs) startTs = ts;
    renderAt((ts - startTs) / 1000);
    raf = requestAnimationFrame(frame);
  }

  return {
    start() {
      if (running) return;
      running = true;
      startTs = 0;
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    renderAt,
    resize() {
      resize();
    },
    setPointer(nx, ny) {
      pointerX = nx;
      pointerY = ny;
    },
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
    },
  };
}
