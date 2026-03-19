'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { RegionData } from '@/hooks/use-simulation-data';

/**
 * HubPoint: Pulsing geographic marker for jurisdictional hubs.
 */
function HubPoint({ region, onClick }: { region: RegionData, onClick: () => void }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  // Convert lat/lng to 3D coordinates on a sphere of radius 2
  const position = useMemo(() => {
    const phi = (90 - region.lat) * (Math.PI / 180);
    const theta = (region.lng + 180) * (Math.PI / 180);
    const x = -(2 * Math.sin(phi) * Math.cos(theta));
    const z = 2 * Math.sin(phi) * Math.sin(theta);
    const y = 2 * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }, [region.lat, region.lng]);

  // Pulse animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.scale.setScalar(1 + Math.sin(time * 4) * 0.2);
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.8} />
      </mesh>
      {/* Visual Glow Aura */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.1} />
      </mesh>
      <Html distanceFactor={10}>
        <div className="pointer-events-none select-none">
          <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/10 -translate-y-8 whitespace-nowrap">
            <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">{region.id.toUpperCase()}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

/**
 * GlobeRotation: Handles the smooth orbital rotation of the matrix.
 */
function GlobeRotation({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.0015;
  });
  return <group ref={group}>{children}</group>;
}

export function IntelligenceGlobe({ 
  regions, 
  onRegionClick 
}: { 
  regions: Record<string, RegionData>, 
  onRegionClick: (id: string) => void 
}) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3B82F6" />
        
        <GlobeRotation>
          {/* Main Tactical Sphere */}
          <Sphere args={[2, 64, 64]}>
            <meshStandardMaterial 
              color="#0A0A0B" 
              roughness={0.7}
              metalness={0.2}
              transparent 
              opacity={0.95} 
            />
          </Sphere>
          
          {/* Grid/Wireframe Overlay */}
          <Sphere args={[2.01, 36, 36]}>
            <meshBasicMaterial 
              color="#3B82F6" 
              wireframe 
              transparent 
              opacity={0.03} 
            />
          </Sphere>

          {/* Hub Nodes */}
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
          enableZoom={false} 
          minDistance={4} 
          maxDistance={6} 
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
