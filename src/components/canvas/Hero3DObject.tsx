'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.2;
      coreRef.current.rotation.x = t * 0.1;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * -0.3;
      ring2Ref.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Central Organic/Distorted Core */}
        <Sphere ref={coreRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial 
            color="#F5F5F0" 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.1} 
            roughness={0.2} 
            distort={0} 
            speed={1} 
          />
        </Sphere>

        {/* Orbiting Tech Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#007a8c" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
        </mesh>
        
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.8, 0.02, 16, 100]} />
          <meshStandardMaterial color="#b38f00" metalness={0.5} roughness={0.5} transparent opacity={0.5} />
        </mesh>
        
        {/* Inner energy glow */}
        <pointLight color="#007a8c" intensity={2} distance={5} />
      </Float>
    </group>
  );
}

export default function Hero3DObject() {
  return (
    <div className="w-full h-full z-10 pointer-events-none md:pointer-events-auto">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" castShadow />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            snap={true}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <AnimatedCore />
          </PresentationControls>
          
          <Environment preset="city" />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#007a8c" />
        </Suspense>
      </Canvas>
    </div>
  );
}
