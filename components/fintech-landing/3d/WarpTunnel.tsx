'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.setDecoderPath('/draco/');

interface WarpTunnelProps {
  progress: number;
}

export default function WarpTunnel({ progress }: WarpTunnelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/warp_tunnel_shards.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Extract shards and needles
  const elements = useMemo(() => {
    const shardList: {
      obj: THREE.Object3D;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      rotSpeed: THREE.Vector3;
    }[] = [];

    const needleList: {
      obj: THREE.Object3D;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
    }[] = [];

    clonedScene.traverse((child) => {
      if (child.name.startsWith('HexShard_')) {
        shardList.push({
          obj: child,
          baseX: child.position.x,
          baseY: child.position.y,
          baseZ: child.position.z,
          speed: 18 + Math.random() * 12,
          rotSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 2.5,
            (Math.random() - 0.5) * 2.5,
            (Math.random() - 0.5) * 2.5
          ),
        });
      } else if (child.name.startsWith('TunnelNeedle_')) {
        needleList.push({
          obj: child,
          baseX: child.position.x,
          baseY: child.position.y,
          baseZ: child.position.z,
          speed: 35 + Math.random() * 25,
        });
      }
    });

    return { shardList, needleList };
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Active range: 0.30 to 0.58
    if (progress < 0.30 || progress > 0.58) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Warp intensity curve (peaks around 0.43)
    const warpT = Math.max(0, Math.min(1, (progress - 0.30) / 0.28));
    const intensity = Math.sin(warpT * Math.PI);

    // Animate hex crystal shards streaming along Z towards and past camera
    elements.shardList.forEach(({ obj, baseX, baseY, speed, rotSpeed }, idx) => {
      const offset = (state.clock.elapsedTime * speed * (1.0 + intensity * 2.5) + idx * 8) % 45;
      const currentZ = -30 + offset;

      // Radial push outward as shard nears camera
      const radialPush = 1.0 + Math.max(0, (currentZ + 10) / 15) * 1.4;
      obj.position.x = baseX * radialPush;
      obj.position.y = baseY * radialPush;
      obj.position.z = currentZ;

      obj.rotation.x += rotSpeed.x * delta * (1.0 + intensity * 2);
      obj.rotation.y += rotSpeed.y * delta * (1.0 + intensity * 2);
      obj.rotation.z += rotSpeed.z * delta * (1.0 + intensity * 2);
    });

    // Animate streak needles streaming at high speed
    elements.needleList.forEach(({ obj, baseX, baseY, speed }, idx) => {
      const offset = (state.clock.elapsedTime * speed * (1.0 + intensity * 3.0) + idx * 4) % 60;
      const currentZ = -45 + offset;

      obj.position.x = baseX;
      obj.position.y = baseY;
      obj.position.z = currentZ;

      const stretchZ = 1.0 + intensity * 2.5;
      obj.scale.set(1.0, 1.0, stretchZ);
    });
  });

  return (
    <group ref={groupRef} visible={false}>
      <primitive object={clonedScene} />
    </group>
  );
}
