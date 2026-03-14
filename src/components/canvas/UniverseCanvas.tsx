'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitalMap } from './OrbitalMap';
import { Preload, OrbitControls } from '@react-three/drei';

export default function UniverseCanvas() {
  return (
    <div className="fixed inset-0 z-0 bg-void-deepest">
      <Canvas
        shadows
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <OrbitalMap />
          <Preload all />
        </Suspense>

        {/* Dynamic Controls based on state could be added here */}
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={10}
          maxDistance={30}
          rotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(245,245,240,0.6)_70%,#F5F5F0_100%)]"></div>
    </div>
  );
}
