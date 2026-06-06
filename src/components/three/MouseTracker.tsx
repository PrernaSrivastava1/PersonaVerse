'use client';

import { useRef, ReactNode } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseTrackerProps {
  children: ReactNode;
}

export default function MouseTracker({ children }: MouseTrackerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth parallax rotation based on mouse position
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.08,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.05,
      0.03
    );
  });

  return <group ref={groupRef}>{children}</group>;
}
