'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrystalData {
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
  size: number;
  color: string;
  yOffset: number;
}

function Crystal({ data }: { data: CrystalData }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Orbital motion
    const angle = data.startAngle + t * data.orbitSpeed;
    meshRef.current.position.x = Math.cos(angle) * data.orbitRadius;
    meshRef.current.position.z = Math.sin(angle) * data.orbitRadius;
    meshRef.current.position.y = data.yOffset + Math.sin(t * 0.5 + data.startAngle) * 0.3;

    // Individual rotation
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[data.size, 0]} />
      <meshStandardMaterial
        color={data.color}
        emissive={data.color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function FloatingCrystals() {
  const crystals = useMemo<CrystalData[]>(() => [
    { orbitRadius: 2.8, orbitSpeed: 0.15, startAngle: 0, size: 0.12, color: '#00d4ff', yOffset: 0.5 },
    { orbitRadius: 3.2, orbitSpeed: -0.12, startAngle: Math.PI * 0.5, size: 0.15, color: '#ff6b9d', yOffset: -0.3 },
    { orbitRadius: 2.5, orbitSpeed: 0.18, startAngle: Math.PI, size: 0.1, color: '#00ff88', yOffset: 0.8 },
    { orbitRadius: 3.5, orbitSpeed: -0.1, startAngle: Math.PI * 1.5, size: 0.13, color: '#00d4ff', yOffset: -0.6 },
    { orbitRadius: 3.0, orbitSpeed: 0.14, startAngle: Math.PI * 0.25, size: 0.11, color: '#ff6b9d', yOffset: 0.2 },
    { orbitRadius: 2.7, orbitSpeed: -0.16, startAngle: Math.PI * 0.75, size: 0.14, color: '#00ff88', yOffset: -0.4 },
    { orbitRadius: 3.3, orbitSpeed: 0.11, startAngle: Math.PI * 1.25, size: 0.09, color: '#ffd700', yOffset: 0.6 },
    { orbitRadius: 2.9, orbitSpeed: -0.13, startAngle: Math.PI * 1.75, size: 0.12, color: '#00d4ff', yOffset: -0.1 },
  ], []);

  return (
    <group>
      {crystals.map((data, i) => (
        <Crystal key={i} data={data} />
      ))}
    </group>
  );
}
