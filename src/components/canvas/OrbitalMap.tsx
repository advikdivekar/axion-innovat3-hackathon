'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

export function OrbitalMap() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const systemRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = elapsed * 0.15;
      ring1Ref.current.rotation.y = elapsed * 0.2;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = elapsed * -0.1;
      ring2Ref.current.rotation.z = elapsed * 0.15;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = elapsed * -0.12;
      ring3Ref.current.rotation.z = elapsed * -0.08;
    }

    if (systemRef.current) {
      systemRef.current.rotation.y = elapsed * 0.05;
      systemRef.current.position.y = Math.sin(elapsed) * 0.2;
    }
  });

  return (
    <group ref={systemRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Inner Gold Ring */}
        <Torus ref={ring1Ref} args={[2.5, 0.015, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
          <meshBasicMaterial color="#b38f00" transparent opacity={0.8} />
        </Torus>

        {/* Middle Cyan Ring */}
        <Torus ref={ring2Ref} args={[3.2, 0.015, 16, 100]} rotation={[0, Math.PI / 3, 0]}>
          <meshBasicMaterial color="#007a8c" transparent opacity={0.8} />
        </Torus>

        {/* Outer Purple Ring */}
        <Torus ref={ring3Ref} args={[4.0, 0.015, 16, 100]} rotation={[Math.PI / 6, Math.PI / 6, 0]}>
          <meshBasicMaterial color="#5c14cc" transparent opacity={0.6} />
        </Torus>

        {/* Center Glow Effect (subtle) */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial 
            color="#007a8c" 
            transparent 
            opacity={0.03} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      {/* Deep Space Stars */}
      <Stars radius={10} depth={20} count={300} factor={4} saturation={0} fade speed={0.5} />
      
      <ambientLight intensity={1} />
    </group>
  );
}
