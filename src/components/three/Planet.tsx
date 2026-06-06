'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetPath } from '@/types';

interface PlanetProps {
  type: PlanetPath;
  position: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
}

const PLANET_CONFIG = {
  mind: {
    color: '#0066cc',
    emissive: '#00d4ff',
    label: 'Mind',
    emoji: '🧠',
    geometry: 'icosahedron' as const,
  },
  emotion: {
    color: '#cc3366',
    emissive: '#ff6b9d',
    label: 'Emotion',
    emoji: '❤️',
    geometry: 'sphere' as const,
  },
  chaos: {
    color: '#cc6600',
    emissive: '#ff8c42',
    label: 'Chaos',
    emoji: '🔥',
    geometry: 'dodecahedron' as const,
  },
};

export default function Planet({ type, position, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const config = PLANET_CONFIG[type];
  const hovered = useRef(false);

  const particleAttr = useMemo(() => {
    const arr = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.5;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Type-specific rotation
    if (type === 'chaos') {
      meshRef.current.rotation.x += 0.015;
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.z += 0.008;
    } else if (type === 'emotion') {
      meshRef.current.rotation.y += 0.005;
      const pulse = 1 + Math.sin(t * 1.5) * 0.03;
      if (!isSelected && !hovered.current) meshRef.current.scale.setScalar(pulse);
    } else {
      meshRef.current.rotation.y += 0.008;
    }

    // Hover/selection scale
    const targetScale = isSelected ? 1.3 : hovered.current ? 1.15 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );
  });

  const Geometry = () => {
    switch (config.geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[0.8, 2]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.8, 0]} />;
      default:
        return <sphereGeometry args={[0.8, 32, 32]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        {/* Main planet */}
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerEnter={() => { hovered.current = true; document.body.style.cursor = 'pointer'; }}
          onPointerLeave={() => { hovered.current = false; document.body.style.cursor = 'default'; }}
        >
          <Geometry />
          <meshStandardMaterial
            color={config.color}
            emissive={config.emissive}
            emissiveIntensity={isSelected ? 0.6 : 0.25}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh>
          <Geometry />
          <meshStandardMaterial
            color={config.emissive}
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Ambient particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particleAttr, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color={config.emissive}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* Label */}
        <Text
          position={[0, -1.3, 0]}
          fontSize={0.25}
          color="#e8e6f0"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {`${config.emoji} ${config.label}`}
        </Text>
      </group>
    </Float>
  );
}
