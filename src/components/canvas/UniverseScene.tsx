'use client';

import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

// ─── Module positions (well spread out around Earth) ────────────────────────
const MODULE_NODES = [
  { id: 'governance',   route: '/app/governance',   position: [-5,    3,    0]    as [number,number,number], color: '#d075ff', size: 0.32 },
  { id: 'treasury',     route: '/app/treasury',     position: [5,     2,    0]    as [number,number,number], color: '#f59e0b', size: 0.32 },
  { id: 'contributors', route: '/app/contributors', position: [0,    -4,    2]    as [number,number,number], color: '#89b0ff', size: 0.28 },
  { id: 'security',     route: '/app/security',     position: [1,     4.5,  3]    as [number,number,number], color: '#ff5c16', size: 0.28 },
  { id: 'simulator',    route: '/app/simulator',    position: [-4,   -2,    3]    as [number,number,number], color: '#baf24a', size: 0.28 },
  { id: 'ai',           route: '/app',              position: [3,    -3,   -3]    as [number,number,number], color: '#d075ff', size: 0.28 },
];

const CONNECTIONS: Array<[number, number]> = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [0, 5], [1, 4], [2, 3],
];

// ─── Earth Globe ─────────────────────────────────────────────────────────────
function EarthGlobe() {
  const earthRef  = useRef<THREE.Mesh>(null);
  const glowRef   = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (earthRef.current)  earthRef.current.rotation.y  += delta * 0.18;
    if (glowRef.current)   glowRef.current.rotation.y   -= delta * 0.05;
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[3.85, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* Earth body */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[3.1, 64, 64]} />
        <meshPhongMaterial
          color="#1a1a3e"
          emissive="#001133"
          emissiveIntensity={0.3}
          shininess={40}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[3.14, 24, 24]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.40} />
      </mesh>

      {/* Center glow point */}
      <pointLight position={[0, 0, 0]} color="#00d4ff" intensity={1.5} distance={18} />
      {/* Secondary key light for globe definition */}
      <pointLight position={[6, 4, 6]} color="#ffffff" intensity={0.6} distance={20} />
    </group>
  );
}

// ─── Module node ──────────────────────────────────────────────────────────────
interface NodeSphereProps {
  node: typeof MODULE_NODES[0];
  phase: number;
  onHover: (id: string | null, pos?: [number, number]) => void;
  onClick: (route: string) => void;
}

function NodeSphere({ node, phase, onHover, onClick }: NodeSphereProps) {
  const meshRef  = useRef<THREE.Mesh>(null);
  const glowRef  = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const nodeColor = useMemo(() => new THREE.Color(node.color), [node.color]);

  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current || !lightRef.current) return;
    const t = clock.getElapsedTime();
    const pulse = 1 + 0.1 * Math.sin(t * 1.5 + phase);
    const targetScale = hovered ? pulse * 1.6 : pulse;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    glowRef.current.scale.setScalar(hovered ? 3.5 : 2.8);
    (glowRef.current.material as THREE.MeshBasicMaterial).opacity = hovered
      ? 0.14 + 0.06 * Math.sin(t * 2)
      : 0.05 + 0.03 * Math.sin(t * 1.2 + phase);
    lightRef.current.intensity = hovered ? 0.6 : 0.25;
  });

  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    const screenPos = new THREE.Vector3(...node.position).project(camera);
    const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(screenPos.y * 0.5) + 0.5) * window.innerHeight;
    onHover(node.id, [x, y]);
  }, [camera, node, onHover]);

  const handlePointerOut = useCallback((_e: ThreeEvent<PointerEvent>) => {
    setHovered(false);
    document.body.style.cursor = 'auto';
    onHover(null);
  }, [onHover]);

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick(node.route);
  }, [node.route, onClick]);

  return (
    <group position={node.position}>
      <pointLight ref={lightRef} color={node.color} intensity={0.25} distance={5} />
      <mesh ref={glowRef}>
        <sphereGeometry args={[node.size * 1.5, 12, 12]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[node.size, 20, 20]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={hovered ? 1.6 : 0.7}
          roughness={0.25}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

// ─── Connection line (Earth center → node) ────────────────────────────────────
function ConnectionLine({ to, color }: { to: [number,number,number]; color: string }) {
  const points = useMemo(
    () => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...to)],
    [to]
  );
  const lineColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={lineColor} transparent opacity={0.2} />
    </line>
  );
}

// ─── Node-to-node connection ──────────────────────────────────────────────────
function NodeConnectionLine({ from, to, color }: { from: [number,number,number]; to: [number,number,number]; color: string }) {
  const points = useMemo(
    () => [new THREE.Vector3(...from), new THREE.Vector3(...to)],
    [from, to]
  );
  const lineColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={lineColor} transparent opacity={0.12} />
    </line>
  );
}

// ─── Travelling particle ──────────────────────────────────────────────────────
function TravellingParticle({ from, to, color, speed = 0.22, offset = 0 }: {
  from: [number,number,number]; to: [number,number,number];
  color: string; speed?: number; offset?: number;
}) {
  const meshRef  = useRef<THREE.Mesh>(null);
  const fromVec  = useMemo(() => new THREE.Vector3(...from), [from]);
  const toVec    = useMemo(() => new THREE.Vector3(...to),   [to]);
  const pColor   = useMemo(() => new THREE.Color(color), [color]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    meshRef.current.position.lerpVectors(fromVec, toVec, t);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshBasicMaterial color={pColor} transparent opacity={0.9} />
    </mesh>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ onHover, onNodeClick }: {
  onHover: (id: string | null, pos?: [number, number]) => void;
  onNodeClick: (route: string) => void;
}) {
  return (
    <>
      <fog attach="fog" args={['#050508', 25, 120]} />
      <ambientLight color="#ffffff" intensity={0.12} />
      <pointLight position={[5, 5, 5]}  color="#00d4ff" intensity={0.5} distance={30} />
      <pointLight position={[-5, -3, -5]} color="#d075ff" intensity={0.35} distance={25} />

      <Stars count={5000} radius={150} depth={50} factor={4} fade />
      <EarthGlobe />

      {/* Earth → node lines */}
      {MODULE_NODES.map(n => (
        <ConnectionLine key={`earth-${n.id}`} to={n.position} color={n.color} />
      ))}

      {/* Node → node lines */}
      {CONNECTIONS.map(([a, b], i) => (
        <NodeConnectionLine key={i}
          from={MODULE_NODES[a].position}
          to={MODULE_NODES[b].position}
          color={MODULE_NODES[a].color}
        />
      ))}

      {/* Travelling particles */}
      {MODULE_NODES.map((n, i) => (
        <TravellingParticle key={`p-${n.id}`}
          from={[0, 0, 0]}
          to={n.position}
          color={n.color}
          speed={0.15 + i * 0.04}
          offset={i * 0.17}
        />
      ))}
      {CONNECTIONS.map(([a, b], i) => (
        <TravellingParticle key={`np-${i}`}
          from={MODULE_NODES[a].position}
          to={MODULE_NODES[b].position}
          color={MODULE_NODES[a].color}
          speed={0.12 + i * 0.025}
          offset={i * 0.11}
        />
      ))}

      {/* Module nodes */}
      {MODULE_NODES.map((n, i) => (
        <NodeSphere key={n.id} node={n} phase={i * 1.1} onHover={onHover} onClick={onNodeClick} />
      ))}

      {/* Node labels */}
      {MODULE_NODES.map((n) => (
        <Text
          key={`label-${n.id}`}
          position={[n.position[0], n.position[1] + n.size + 0.6, n.position[2]]}
          fontSize={0.22}
          color={n.color}
          anchorX="center"
          anchorY="bottom"
        >
          {n.id.toUpperCase()}
        </Text>
      ))}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.3}
        enablePan={false}
        minDistance={8}
        maxDistance={36}
      />
    </>
  );
}

// ─── Module labels map ────────────────────────────────────────────────────────
const MODULE_LABELS: Record<string, string> = {
  governance: 'Governance',
  treasury: 'Treasury',
  contributors: 'Contributors',
  security: 'Security',
  simulator: 'Simulator',
  ai: 'AI Agents',
};

// ─── Root export ──────────────────────────────────────────────────────────────
export default function UniverseScene() {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<{ id: string; x: number; y: number } | null>(null);

  const handleHover = useCallback((id: string | null, pos?: [number, number]) => {
    if (!id || !pos) { setTooltip(null); return; }
    setTooltip({ id, x: pos[0], y: pos[1] });
  }, []);

  const handleNodeClick = useCallback((route: string) => {
    router.push(route);
  }, [router]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 24], fov: 70, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#050508', width: '100%', height: '100%' }}
      >
        <Scene onHover={handleHover} onNodeClick={handleNodeClick} />
      </Canvas>

      {/* DOM tooltip */}
      {tooltip && (
        <div style={{
          position: 'absolute',
          left: tooltip.x,
          top: tooltip.y - 40,
          transform: 'translateX(-50%)',
          background: 'rgba(5,5,8,0.92)',
          border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 8,
          padding: '6px 12px',
          pointerEvents: 'none',
          zIndex: 100,
        }}>
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#00d4ff', letterSpacing: '0.1em' }}>
            {MODULE_LABELS[tooltip.id] ?? tooltip.id}
          </span>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>
            Click to open
          </div>
        </div>
      )}
    </div>
  );
}
