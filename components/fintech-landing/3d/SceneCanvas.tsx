'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import SceneManager from './SceneManager';

interface SceneCanvasProps {
  progress: number;
}

export default function SceneCanvas({ progress }: SceneCanvasProps) {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-10 overflow-hidden bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <SceneManager progress={progress} />
          {/* Post-Processing Bloom Pass for Blender Emissive Materials */}
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Bloom
              mipmapBlur
              luminanceThreshold={1.0}
              intensity={1.4}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
