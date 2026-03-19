'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { RegionData } from '@/hooks/use-simulation-data';
import { cn } from '@/lib/utils';

function HubPoint({ region, onClick }: { region: RegionData, onClick: () => void }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  // Convert lat/lng to 3D coordinates
  const position = useMemo(() => {
    const phi = (90 - region.lat) * (Math.PI / 180);
    const theta = (region.lng + 180) * (Math.PI / 180);
    const x = -(2 * Math.sin(phi) * Math.cos(theta));
    const z = 2 * Math.sin(phi) * Math.sin(theta);
    const y = 2 * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }, [region.lat, region.lng]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
  });

  return (
    <group position={position}>
      <mesh ref={mesh} onClick={onClick}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.8} />
      </mesh>
      <Html distanceFactor={10}>
        <div className="pointer-events-none select-none">
          <div className="bg-black/80 luxury-blur px-2 py-1 rounded border border-white/10 -translate-y-8">
            <p className="text-[8px] font-bold text-white uppercase tracking-widest">{region.id.toUpperCase()}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function GlobeRotation({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.001;
  });
  return <group ref={group}>{children}</group>;
}

export function IntelligenceGlobe({ regions, onRegionClick }: { regions: Record<string, RegionData>, onRegionClick: (id: string) => void }) {
  return (
    <div className="w-full h-full bg-[#0A1A2F]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <GlobeRotation>
          {/* Main Globe */}
          <Sphere args={[2, 64, 64]}>
            <meshStandardMaterial 
              color="#132F3F" 
              wireframe={false} 
              transparent 
              opacity={0.9} 
              emissive="#000" 
            />
          </Sphere>
          
          {/* Wireframe Overlay */}
          <Sphere args={[2.01, 32, 32]}>
            <meshBasicMaterial 
              color="#2563EB" 
              wireframe 
              transparent 
              opacity={0.05} 
            />
          </Sphere>

          {/* Hub Points */}
          {Object.values(regions).map(region => (
            <HubPoint 
              key={region.id} 
              region={region} 
              onClick={() => onRegionClick(region.id)} 
            />
          ))}
        </GlobeRotation>
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={8} 
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
