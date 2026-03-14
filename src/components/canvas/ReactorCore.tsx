'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Float, Trail, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface ReactorCoreProps {
  morphState?: number; // 0-5, controls visual appearance per section
}

// Color presets per morph state
const MORPH_CONFIGS = [
  { core: '#007a8c', ring1: '#0088ff', ring2: '#5c14cc', emissive: 2.0, ringScale: 1.0 },    // 0: Default/Hero — cyan core
  { core: '#3399ff', ring1: '#0066ff', ring2: '#00ccff', emissive: 2.5, ringScale: 1.2 },    // 1: Governance — blue expansion
  { core: '#b38f00', ring1: '#ff9900', ring2: '#ffcc00', emissive: 2.0, ringScale: 0.9 },    // 2: Treasury — gold compact
  { core: '#aa55ff', ring1: '#5c14cc', ring2: '#cc66ff', emissive: 2.5, ringScale: 1.3 },    // 3: Contributors — purple expand
  { core: '#ff3366', ring1: '#ff0044', ring2: '#ff6688', emissive: 3.0, ringScale: 1.1 },    // 4: Security — red alert
  { core: '#00ffcc', ring1: '#007a8c', ring2: '#008a47', emissive: 2.5, ringScale: 1.0 },    // 5: AI Commander — green-cyan
  { core: '#ff6633', ring1: '#ff3366', ring2: '#5c14cc', emissive: 2.0, ringScale: 1.4 },    // 6: Simulator — rainbow expand
];

export function ReactorCore({ morphState = 0 }: ReactorCoreProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);
  const particleGroupRef = useRef<THREE.Group>(null);
  
  // Current colors (lerped for smooth transitions)
  const currentColors = useRef({
    core: new THREE.Color('#007a8c'),
    ring1: new THREE.Color('#0088ff'),
    ring2: new THREE.Color('#5c14cc'),
    emissive: 2.0,
    ringScale: 1.0,
  });

  const targetConfig = MORPH_CONFIGS[Math.min(morphState, MORPH_CONFIGS.length - 1)];

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const delta = state.clock.getDelta();
    const lerpSpeed = 2.0 * Math.max(delta, 0.016);

    // Smoothly lerp colors
    const cc = currentColors.current;
    cc.core.lerp(new THREE.Color(targetConfig.core), lerpSpeed);
    cc.ring1.lerp(new THREE.Color(targetConfig.ring1), lerpSpeed);
    cc.ring2.lerp(new THREE.Color(targetConfig.ring2), lerpSpeed);
    cc.emissive = THREE.MathUtils.lerp(cc.emissive, targetConfig.emissive, lerpSpeed);
    cc.ringScale = THREE.MathUtils.lerp(cc.ringScale, targetConfig.ringScale, lerpSpeed);

    // Core sphere rotation + pulse
    if (coreRef.current) {
      coreRef.current.rotation.y = elapsed * 0.3;
      coreRef.current.rotation.x = elapsed * 0.15;
      const pulse = 1 + Math.sin(elapsed * 3) * 0.03;
      coreRef.current.scale.set(pulse, pulse, pulse);
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.color.copy(cc.core);
      mat.emissive.copy(cc.core);
      mat.emissiveIntensity = cc.emissive;
    }

    // Inner glow
    if (innerGlowRef.current) {
      const glowPulse = 0.8 + Math.sin(elapsed * 2) * 0.2;
      innerGlowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
      const mat = innerGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.color.copy(cc.core);
    }

    // Ring animations with morph scaling
    const rs = cc.ringScale;
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = elapsed * 0.3;
      ring1Ref.current.rotation.y = elapsed * 0.6;
      ring1Ref.current.scale.set(rs, rs, rs);
      const mat = ring1Ref.current.material as THREE.MeshStandardMaterial;
      mat.color.copy(cc.ring1);
      mat.emissive.copy(cc.ring1);
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = elapsed * -0.4;
      ring2Ref.current.rotation.z = elapsed * 0.35;
      ring2Ref.current.scale.set(rs, rs, rs);
      const mat = ring2Ref.current.material as THREE.MeshStandardMaterial;
      mat.color.copy(cc.ring2);
      mat.emissive.copy(cc.ring2);
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = elapsed * -0.2;
      ring3Ref.current.rotation.z = elapsed * 0.5;
      const outerScale = rs * 1.1;
      ring3Ref.current.scale.set(outerScale, outerScale, outerScale);
    }

    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y = elapsed * 0.08;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* Inner Glow */}
        <Sphere ref={innerGlowRef} args={[0.8, 16, 16]}>
          <meshBasicMaterial 
            color="#007a8c" 
            transparent 
            opacity={0.08}
          />
        </Sphere>

        {/* Core Sphere */}
        <Sphere ref={coreRef} args={[1.0, 32, 32]}>
          <meshStandardMaterial 
            color="#007a8c" 
            emissive="#007a8c" 
            emissiveIntensity={2} 
            wireframe={true} 
            transparent
            opacity={0.7}
          />
        </Sphere>

        {/* Inner Ring */}
        <Torus ref={ring1Ref} args={[1.6, 0.04, 16, 80]}>
          <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={1.5} />
        </Torus>

        {/* Middle Ring */}
        <Torus ref={ring2Ref} args={[2.2, 0.025, 16, 80]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#5c14cc" emissive="#5c14cc" emissiveIntensity={2} />
        </Torus>

        {/* Outer Ring (hexagonal) */}
        <Torus ref={ring3Ref} args={[2.8, 0.06, 16, 6]} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#007a8c" wireframe={true} transparent opacity={0.4} />
        </Torus>

        {/* Orbiting Energy Trail */}
        <Trail
          width={1.5}
          length={3}
          color={new THREE.Color('#007a8c')}
          attenuation={(t) => t * t}
        >
          <mesh position={[1.8, 0, 0]}>
            <sphereGeometry args={[0.06]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </Trail>
      </Float>

      {/* Ambient Stars */}
      <group ref={particleGroupRef}>
        <Stars radius={4} depth={8} count={200} factor={3} saturation={0.5} fade speed={0.8} />
      </group>

      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} color="#007a8c" intensity={4} distance={8} />
    </group>
  );
}
