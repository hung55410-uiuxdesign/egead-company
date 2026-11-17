'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.setDecoderPath('/draco/');

interface DigitalMatrixWallProps {
  progress: number;
}

export default function DigitalMatrixWall({ progress }: DigitalMatrixWallProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/digital_matrix_wall.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Active range: 0.80 to 0.92
    if (progress < 0.80 || progress > 0.92) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Entry & exit alpha curves
    const entryT = Math.max(0, Math.min(1, (progress - 0.80) / 0.04));
    const exitT = Math.max(0, Math.min(1, (progress - 0.88) / 0.04));
    const scale = (0.7 + entryT * 0.3) * (1.0 - exitT * 0.3);

    groupRef.current.scale.set(scale, scale, scale);
    groupRef.current.position.set(0, 0, -2.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1);
    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
  });

  return (
    <group ref={groupRef} visible={false}>
      <primitive object={clonedScene} />
    </group>
  );
}
