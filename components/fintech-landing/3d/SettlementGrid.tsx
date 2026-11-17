'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.setDecoderPath('/draco/');

interface SettlementGridProps {
  progress: number;
}

export default function SettlementGrid({ progress }: SettlementGridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/03_isometric_settlement_grid.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Extract TopCap tiles and their materials
  const topCaps = useMemo(() => {
    const list: {
      obj: THREE.Mesh;
      col: number;
      row: number;
      isCross: boolean;
      material: THREE.MeshStandardMaterial;
    }[] = [];

    const glowingIndices = new Set([7, 11, 12, 13, 14, 18]);

    clonedScene.traverse((child) => {
      if (child.name.startsWith('TopCap_') && (child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const num = parseInt(child.name.replace('TopCap_', ''), 10);
        const col = (num - 1) % 5;
        const row = Math.floor((num - 1) / 5);
        const isCross = glowingIndices.has(num);

        // Clone material so each cap can have independent emission intensity
        if (mesh.material) {
          const mat = Array.isArray(mesh.material)
            ? (mesh.material[0] as THREE.MeshStandardMaterial).clone()
            : (mesh.material as THREE.MeshStandardMaterial).clone();
          mesh.material = mat;

          list.push({
            obj: mesh,
            col,
            row,
            isCross,
            material: mat,
          });
        }
      }
    });

    return list;
  }, [clonedScene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Active range: 0.60 to 0.92
    if (progress < 0.60 || progress > 0.92) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Entry animation (0.60 to 0.68)
    const entryT = Math.max(0, Math.min(1, (progress - 0.60) / 0.08));
    const easedEntry = 1 - Math.pow(1 - entryT, 3);

    // Section 6 transition towards top-down angle (0.81 to 0.88)
    const topDownT = Math.max(0, Math.min(1, (progress - 0.81) / 0.07));

    // Vertical position: rise from -8 to -0.2
    const baseY = THREE.MathUtils.lerp(-8, -0.2, easedEntry);
    const hoverY = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    groupRef.current.position.y = baseY + hoverY - topDownT * 1.2;

    // Rotation: Isometric [0.6, 0.78, 0] morphing into top-down [1.57, 0, 0]
    groupRef.current.rotation.x = THREE.MathUtils.lerp(0.6, 1.57, topDownT);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      0.78 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03,
      0,
      topDownT
    );
    groupRef.current.rotation.z = 0;

    // Scale
    const s = THREE.MathUtils.lerp(0.75, 1.15, easedEntry);
    groupRef.current.scale.set(s, s, s);

    // Animate wave pulses on TopCap_01..25
    const t = state.clock.elapsedTime;
    topCaps.forEach(({ col, row, isCross, material }) => {
      const wave = Math.sin(col * 0.85 + row * 0.65 - t * 3.8);

      if (isCross) {
        // Cross tiles pulse with bright bloom
        const pulse = 4.0 + Math.max(0, wave) * 3.5;
        material.emissiveIntensity = pulse;
      } else {
        // Subtle wave glow
        const subPulse = 0.5 + Math.max(0, wave) * 1.8;
        material.emissiveIntensity = subPulse;
      }
    });
  });

  return (
    <group ref={groupRef} visible={false}>
      <primitive object={clonedScene} />
    </group>
  );
}
