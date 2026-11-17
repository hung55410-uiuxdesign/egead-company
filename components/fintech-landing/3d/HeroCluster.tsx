'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.setDecoderPath('/draco/');

interface HeroClusterProps {
  progress: number;
}

export default function HeroCluster({ progress }: HeroClusterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/01_hero_crystal_cluster.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Extract all 27 HeroCubes and record initial positions
  const cubes = useMemo(() => {
    const list: {
      obj: THREE.Object3D;
      initialPos: THREE.Vector3;
      initialRot: THREE.Euler;
      dir: THREE.Vector3;
      rotSpeed: THREE.Vector3;
    }[] = [];

    clonedScene.traverse((child) => {
      if (child.name.startsWith('HeroCube_')) {
        const initialPos = child.position.clone();
        const initialRot = child.rotation.clone();
        const dir = initialPos.lengthSq() > 0.01 
          ? initialPos.clone().normalize() 
          : new THREE.Vector3(0, 1, 0);

        list.push({
          obj: child,
          initialPos,
          initialRot,
          dir,
          rotSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 4.5,
            (Math.random() - 0.5) * 4.5,
            (Math.random() - 0.5) * 4.5
          ),
        });
      }
    });

    return list;
  }, [clonedScene]);

  // Find inner core meshes to also disperse & fade
  const innerCores = useMemo(() => {
    const list: THREE.Object3D[] = [];
    clonedScene.traverse((child) => {
      if (child.name.startsWith('InnerCore_')) {
        list.push(child);
      }
    });
    return list;
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Active range: 0% to 28% scroll
    if (progress > 0.28) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Explosion begins at 8% and completes around 22%
    const explodeT = Math.max(0, Math.min(1, (progress - 0.08) / 0.14));
    const eased = 1 - Math.pow(1 - explodeT, 3);

    // Group gentle idle rotation
    groupRef.current.rotation.y += delta * (0.18 + (1 - explodeT) * 0.08);
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;

    // Animate each of the 27 cubes individually
    cubes.forEach(({ obj, initialPos, initialRot, dir, rotSpeed }) => {
      const dist = eased * 8.5;
      obj.position.x = initialPos.x + dir.x * dist;
      obj.position.y = initialPos.y + dir.y * dist;
      obj.position.z = initialPos.z + dir.z * dist;

      obj.rotation.x = initialRot.x + rotSpeed.x * eased * 2.8;
      obj.rotation.y = initialRot.y + rotSpeed.y * eased * 2.8;
      obj.rotation.z = initialRot.z + rotSpeed.z * eased * 2.8;

      const s = Math.max(0.001, 1 - eased * 1.05);
      obj.scale.set(s, s, s);
    });

    // Fade inner core meshes
    innerCores.forEach((core) => {
      const s = Math.max(0.001, 1 - eased * 1.2);
      core.scale.set(s, s, s);
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}
