'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function CosmicOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Breathing animation
    const scale = 1 + Math.sin(t * 0.8) * 0.05;
    meshRef.current.scale.setScalar(scale);

    // Slow rotation
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.001;

    // React to mouse — subtle lean
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      pointer.x * 0.15,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.1,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshStandardMaterial
          color="#3D3520"
          emissive="#FFD700"
          emissiveIntensity={0.15}
          metalness={0.3}
          roughness={0.4}
          wireframe={false}
        />
      </mesh>
      {/* Wireframe overlay for crystalline effect */}
      <mesh>
        <icosahedronGeometry args={[1.52, 2]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#1A1A14"
          emissive="#E6A817"
          emissiveIntensity={0.08}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}
