'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, ReactNode } from 'react';

interface CosmicSceneProps {
  children: ReactNode;
  className?: string;
}

export default function CosmicScene({ children, className = '' }: CosmicSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
          <pointLight position={[-10, -5, 5]} intensity={0.5} color="#ff6b9d" />
          <pointLight position={[0, 5, -10]} intensity={0.3} color="#00ff88" />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
