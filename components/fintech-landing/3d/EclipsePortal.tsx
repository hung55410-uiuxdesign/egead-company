'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.setDecoderPath('/draco/');

interface EclipsePortalProps {
  progress: number;
}

export default function EclipsePortal({ progress }: EclipsePortalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/04_eclipse_portal_ring.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Find sub-elements
  const parts = useMemo<{
    torus: THREE.Object3D | null;
    disc: THREE.Object3D | null;
    halo: THREE.Object3D | null;
  }>(() => {
    let torus: THREE.Object3D | null = null;
    let disc: THREE.Object3D | null = null;
    let halo: THREE.Object3D | null = null;

    clonedScene.traverse((child) => {
      if (child.name === 'Eclipse_TorusRing') torus = child;
      if (child.name === 'Eclipse_VoidDisc') disc = child;
      if (child.name === 'Eclipse_HaloRing') halo = child;
    });

    return { torus, disc, halo };
  }, [clonedScene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Active range: 0.88 to 1.0
    if (progress < 0.88) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Entry animation (0.88 to 0.95)
    const entryT = Math.max(0, Math.min(1, (progress - 0.88) / 0.07));
    const eased = 1 - Math.pow(1 - entryT, 3);

    // Rise from y = -7 to center y = 0
    const y = THREE.MathUtils.lerp(-7, 0.05, eased);
    groupRef.current.position.set(0, y, 0);

    const s = THREE.MathUtils.lerp(0.6, 1.0, eased);
    groupRef.current.scale.set(s, s, s);

    // Dynamic rotation & subtle coronal pulse
    const t = state.clock.elapsedTime;
    if (parts.torus) {
      parts.torus.rotation.z = t * 0.18;
    }
    if (parts.halo) {
      parts.halo.rotation.z = -t * 0.12;
      const pulse = 1.0 + Math.sin(t * 2.8) * 0.04;
      parts.halo.scale.set(pulse, pulse, 1.0);
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <primitive object={clonedScene} />
    </group>
  );
}
