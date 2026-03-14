'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export function CleanMascot() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Subtle continuous rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Float
        speed={2} 
        rotationIntensity={0.5} 
        floatIntensity={1}
      >
        <group ref={groupRef} scale={[1.2, 1.2, 1.2]} position={[0, 0.5, 0]}>
          
          {/* Core Block - Clean White Ceramic Look */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshPhysicalMaterial 
              color="#FFFFFF"
              roughness={0.2}
              metalness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>

          {/* Orange Accents (ChainGPT Style) */}
          <mesh position={[0, 0, 1.01]}>
            <planeGeometry args={[1.5, 1.5]} />
            <meshBasicMaterial color="#FF7A00" />
          </mesh>
          
          {/* 'Face' Details - Dark Glass */}
          <mesh position={[0, 0, 1.02]}>
            <planeGeometry args={[1.2, 0.8]} />
            <meshStandardMaterial color="#111111" roughness={0} metalness={0.8} />
          </mesh>
          
          {/* 'Eyes' */}
          <mesh position={[-0.3, 0, 1.03]}>
            <boxGeometry args={[0.2, 0.2, 0.05]} />
            <meshBasicMaterial color="#FF7A00" />
          </mesh>
          <mesh position={[0.3, 0, 1.03]}>
            <boxGeometry args={[0.2, 0.2, 0.05]} />
            <meshBasicMaterial color="#FF7A00" />
          </mesh>

          {/* Framing brackets */}
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[1.5, 0.2, 1.5]} />
            <meshStandardMaterial color="#E5E5E5" roughness={0.5} />
          </mesh>
          <mesh position={[0, -1.1, 0]}>
            <boxGeometry args={[1.5, 0.2, 1.5]} />
            <meshStandardMaterial color="#E5E5E5" roughness={0.5} />
          </mesh>
          
        </group>
      </Float>

      {/* Soft Contact Shadow beneath the floating mascot */}
      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
        far={4} 
        color="#000000"
      />
    </>
  );
}
