'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import HeroCluster from './HeroCluster';
import WarpTunnel from './WarpTunnel';
import SettlementGrid from './SettlementGrid';
import EclipsePortal from './EclipsePortal';

interface SceneManagerProps {
  progress: number;
}

export default function SceneManager({ progress }: SceneManagerProps) {
  const { camera } = useThree();
  const currentProgressRef = useRef(progress);
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 7.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetFov = useRef(45);

  useFrame((_state, delta) => {
    // Smooth damping (lerp) of scroll progress for 60fps responsiveness
    currentProgressRef.current = THREE.MathUtils.lerp(
      currentProgressRef.current,
      progress,
      Math.min(1, delta * 6)
    );
    const p = currentProgressRef.current;

    // 1. [0% - 18%] Hero: Hero crystal cluster
    if (p < 0.18) {
      targetCameraPos.current.set(0, 0, 7.5);
      targetLookAt.current.set(0, 0, 0);
      targetFov.current = 45;
    }
    // 2. [18% - 35%] Starburst Transition: Camera pushes forward
    else if (p < 0.35) {
      const t = (p - 0.18) / 0.17;
      targetCameraPos.current.set(0, 0, THREE.MathUtils.lerp(7.5, 4.0, t));
      targetLookAt.current.set(0, 0, 0);
      targetFov.current = 45;
    }
    // 3. [35% - 52%] Warp Tunnel: High-speed dolly and FOV expansion (45 -> 85)
    else if (p < 0.52) {
      const t = (p - 0.35) / 0.17;
      targetCameraPos.current.set(0, 0, THREE.MathUtils.lerp(4.0, 1.6, t));
      targetLookAt.current.set(0, 0, -20);
      const warpCurve = Math.sin(t * Math.PI);
      targetFov.current = 45 + warpCurve * 40;
    }
    // 4. [52% - 66%] Trading Terminal: Settle down into calm view
    else if (p < 0.66) {
      const t = (p - 0.52) / 0.14;
      targetCameraPos.current.set(0, THREE.MathUtils.lerp(0, -0.5, t), THREE.MathUtils.lerp(1.6, 6.8, t));
      targetLookAt.current.set(0, 0, 0);
      targetFov.current = THREE.MathUtils.lerp(85, 46, Math.min(1, t * 2));
    }
    // 5. [66% - 82%] Isometric Platform: Platform rises at isometric angle
    else if (p < 0.82) {
      const t = (p - 0.66) / 0.16;
      targetCameraPos.current.set(0, THREE.MathUtils.lerp(-0.5, 1.2, t), 6.2);
      targetLookAt.current.set(0, THREE.MathUtils.lerp(0, 0.2, t), 0);
      targetFov.current = 45;
    }
    // 6. [82% - 91%] MPC Data Matrix: Top-down orthographic view
    else if (p < 0.91) {
      targetCameraPos.current.set(0, 0, 8.5);
      targetLookAt.current.set(0, 0, 0);
      targetFov.current = 48;
    }
    // 7. [91% - 100%] Eclipse Contact Portal: Final centered portal
    else {
      targetCameraPos.current.set(0, 0, 7.0);
      targetLookAt.current.set(0, 0, 0);
      targetFov.current = 45;
    }

    // Apply smoothed camera transformations
    camera.position.lerp(targetCameraPos.current, Math.min(1, delta * 4));
    const perspCam = camera as THREE.PerspectiveCamera;
    if (perspCam.fov !== undefined) {
      perspCam.fov = THREE.MathUtils.lerp(perspCam.fov, targetFov.current, Math.min(1, delta * 4));
      perspCam.updateProjectionMatrix();
    }
    camera.lookAt(targetLookAt.current);
  });

  return (
    <>
      {/* Studio Lighting & Reflections via City Environment + Custom Lightformers */}
      <Environment preset="city">
        <Lightformer
          form="rect"
          intensity={5}
          color="#38bdf8"
          position={[0, 6, -8]}
          scale={[12, 4, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={4}
          color="#1d4ed8"
          position={[-6, 2, -4]}
          scale={[8, 3, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          color="#60a5fa"
          position={[6, -2, -4]}
          scale={[8, 3, 1]}
          target={[0, 0, 0]}
        />
      </Environment>

      {/* Auxiliary Studio Lights */}
      <ambientLight intensity={0.5} color="#081026" />
      <directionalLight position={[10, 15, 10]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#1d4ed8" />
      <pointLight position={[0, 0, 4]} intensity={4.0} color="#60a5fa" distance={16} />

      {/* 4 Dedicated Blender 3D Models (NO Primitive Meshes) */}
      <HeroCluster progress={currentProgressRef.current} />
      <WarpTunnel progress={currentProgressRef.current} />
      <SettlementGrid progress={currentProgressRef.current} />
      <EclipsePortal progress={currentProgressRef.current} />
    </>
  );
}
