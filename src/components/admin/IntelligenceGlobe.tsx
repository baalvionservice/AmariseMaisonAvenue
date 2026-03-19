
'use client';

import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, QuadraticBezierLine, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { RegionData } from '@/hooks/use-simulation-data';
import { cn } from '@/lib/utils';

/**
 * Utility: Convert Lat/Lng to Vector3 on a sphere
 */
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/**
 * DataArc: Animated curved line between two hubs
 */
function DataArc({ start, end }: { start: THREE.Vector3, end: THREE.Vector3 }) {
  const mid = start.clone().lerp(end, 0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(2 + distance * 0.2);

  const lineRef = useRef<any>(null);
  
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.dashOffset -= 0.005;
    }
  });

  return (
    <QuadraticBezierLine
      ref={lineRef}
      start={start}
      end={end}
      mid={mid}
      color="#3B82F6"
      lineWidth={0.5}
      transparent
      opacity={0.3}
      dashed
      dashScale={50}
      dashSize={1}
      dashOffset={0}
    />
  );
}

/**
 * HubPoint: Pulsing geographic marker with activity-based intensity
 */
function HubPoint({ 
  region, 
  onClick, 
  isSelected 
}: { 
  region: RegionData, 
  onClick: (id: string) => void,
  isSelected: boolean 
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const glowMesh = useRef<THREE.Mesh>(null!);
  const pos = useMemo(() => latLngToVector3(region.lat, region.lng, 2), [region.lat, region.lng]);

  const intensity = useMemo(() => 0.5 + (region.activeUsers / 600), [region.activeUsers]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(time * 3) * 0.15 * intensity;
    if (mesh.current) mesh.current.scale.setScalar(pulse);
    if (glowMesh.current) glowMesh.current.scale.setScalar(pulse * 2.5);
  });

  return (
    <group position={pos}>
      <mesh ref={mesh} onClick={(e) => { e.stopPropagation(); onClick(region.id); }}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={isSelected ? "#60A5FA" : "#3B82F6"} />
      </mesh>
      {/* Outer Glow */}
      <mesh ref={glowMesh}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.3 * intensity} />
      </mesh>
      
      {/* Label & Intelligence Panel */}
      <Html distanceFactor={10}>
        <div className="pointer-events-none select-none">
          {isSelected ? (
            <div className="animate-fade-in -translate-y-32 -translate-x-1/2">
              <div className="w-48 bg-[#111113]/90 backdrop-blur-xl border border-white/10 p-5 shadow-2xl space-y-4">
                <div className="flex justify-between items-start border-b border-white/5 pb-3">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{region.id.toUpperCase()}</p>
                    <h4 className="text-sm font-headline font-bold italic text-white">{region.name}</h4>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Revenue</p>
                    <p className="text-xs font-bold text-white">${(region.revenue / 1000).toFixed(1)}k</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Active</p>
                    <p className="text-xs font-bold text-white">{region.activeUsers}</p>
                  </div>
                </div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-2" />
            </div>
          ) : (
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 border border-white/5 -translate-y-8 whitespace-nowrap">
              <p className="text-[7px] font-bold text-white/40 uppercase tracking-[0.2em]">{region.id.toUpperCase()}</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

/**
 * Atmosphere: Outer glow halo
 */
function Atmosphere() {
  return (
    <Sphere args={[2.15, 64, 64]}>
      <meshBasicMaterial 
        color="#3B82F6" 
        transparent 
        opacity={0.08} 
        side={THREE.BackSide} 
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
}

/**
 * GlobeSphere: The textured core of the planet
 */
function GlobeSphere() {
  const texture = useTexture('https://unpkg.com/three-globe/example/img/earth-dark.jpg');
  
  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial 
        map={texture}
        roughness={0.8}
        metalness={0.1}
        emissive="#111111"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

/**
 * Globe Controller: Handles rotation and interaction logic
 */
function GlobeScene({ regions, onRegionClick }: { regions: Record<string, RegionData>, onRegionClick: (id: string) => void }) {
  const [selectedHub, setSelectedHub] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null!);

  // Connection arcs
  const arcs = useMemo(() => {
    const keys = Object.keys(regions);
    const pairs = [];
    for (let i = 0; i < keys.length; i++) {
      const start = regions[keys[i]];
      const end = regions[keys[(i + 1) % keys.length]];
      pairs.push({
        start: latLngToVector3(start.lat, start.lng, 2),
        end: latLngToVector3(end.lat, end.lng, 2)
      });
    }
    return pairs;
  }, [regions]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const handleHubClick = (id: string) => {
    setSelectedHub(id);
    onRegionClick(id);
  };

  return (
    <group ref={groupRef}>
      <Atmosphere />
      
      {/* Textured Main Globe */}
      <Suspense fallback={<Sphere args={[2, 32, 32]}><meshStandardMaterial color="#0A0A0B" /></Sphere>}>
        <GlobeSphere />
      </Suspense>

      {/* Subtle Grid Overlay */}
      <Sphere args={[2.01, 48, 48]}>
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
          onClick={handleHubClick} 
          isSelected={selectedHub === region.id}
        />
      ))}

      {/* Data Flow Arcs */}
      {arcs.map((arc, idx) => (
        <DataArc key={idx} start={arc.start} end={arc.end} />
      ))}
    </group>
  );
}

export function IntelligenceGlobe({ 
  regions, 
  onRegionClick 
}: { 
  regions: Record<string, RegionData>, 
  onRegionClick: (id: string) => void 
}) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        {/* Directional light from top-left */}
        <directionalLight position={[-5, 5, 5]} intensity={1.5} color="#FFFFFF" />
        {/* Soft fill from the bottom */}
        <pointLight position={[0, -5, 2]} intensity={0.5} color="#3B82F6" />
        
        <GlobeScene regions={regions} onRegionClick={onRegionClick} />

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3.5} 
          maxDistance={7} 
          rotateSpeed={0.4}
        />
      </Canvas>

      {/* Legend Overlay */}
      <div className="absolute bottom-8 left-10 space-y-4 pointer-events-none">
        <div className="flex items-center space-x-3 opacity-40">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white">Institutional Hub</span>
        </div>
        <div className="flex items-center space-x-3 opacity-40">
          <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0" />
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white">Registry Sync Path</span>
        </div>
      </div>
    </div>
  );
}
