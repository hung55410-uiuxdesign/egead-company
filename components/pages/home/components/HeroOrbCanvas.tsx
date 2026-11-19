"use client";

import { useEffect, useRef } from "react";
import { createOrbScene, type OrbScene } from "@/lib/hero/orbScene";

interface HeroOrbCanvasProps {
  /** Animate only while true (the hero is on screen). */
  active: boolean;
  reducedMotion?: boolean | null;
}

/** Fixed, full-viewport 3D backdrop for the hero (replaces the old background video). */
export default function HeroOrbCanvas({ active, reducedMotion }: HeroOrbCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<OrbScene | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = createOrbScene(canvas, { lowPower: window.innerWidth < 768 });
    sceneRef.current = scene;
    scene.resize();
    scene.renderAt(4);

    const onResize = () => {
      scene.resize();
      if (!activeRef.current) scene.renderAt(4);
    };
    const onPointer = (e: PointerEvent) => {
      scene.setPointer((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      scene.destroy();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (active && !reducedMotion) scene.start();
    else scene.stop();
  }, [active, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        visibility: active ? "visible" : "hidden",
      }}
    />
  );
}
