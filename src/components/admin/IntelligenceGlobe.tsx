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
 * DataArc: Animated curved line between two specific hubs
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
      lineWidth={0.4}
      transparent
      opacity={0.2}
      dashed
      dashScale={50}
      dashSize={1}
      dashOffset={0}
    />
  );
}

/**
 * HubPoint: Pulsing geographic marker for key markets
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
    const pulse = 1 + Math.sin(time * 2.5) * 0.15 * intensity;
    if (mesh.current) mesh.current.scale.setScalar(pulse);
    if (glowMesh.current) glowMesh.current.scale.setScalar(pulse * 3);
  });

  return (
    <group position={pos}>
      <mesh ref={mesh} onClick={(e) => { e.stopPropagation(); onClick(region.id); }} cursor="pointer">
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={isSelected ? "#60A5FA" : "#3B82F6"} />
      </mesh>
      {/* Dynamic Aura */}
      <mesh ref={glowMesh}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.25 * intensity} />
      </mesh>
      
      <Html distanceFactor={10}>
        <div className="pointer-events-none select-none">
          {isSelected ? (
            <div className="animate-fade-in -translate-y-36 -translate-x-1/2">
              <div className="w-52 bg-[#111113]/95 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-start border-b border-white/5 pb-3">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">{region.id.toUpperCase()} Hub</p>
                    <h4 className="text-sm font-headline font-bold italic text-white leading-none">{region.name}</h4>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[7px] font-bold text-white/30 uppercase tracking-[0.2em]">Live Yield</p>
                    <p className="text-[11px] font-bold text-white">${(region.revenue / 1000).toFixed(1)}k</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[7px] font-bold text-white/30 uppercase tracking-[0.2em]">Active</p>
                    <p className="text-[11px] font-bold text-white">{region.activeUsers}</p>
                  </div>
                </div>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-blue-500/40 to-transparent mx-auto mt-2" />
            </div>
          ) : (
            <div className="bg-black/40 backdrop-blur-md px-2 py-1 border border-white/5 -translate-y-8 whitespace-nowrap">
              <p className="text-[7px] font-bold text-white/50 uppercase tracking-[0.3em]">{region.id.toUpperCase()}</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function Atmosphere() {
  return (
    <Sphere args={[2.12, 64, 64]}>
      <meshBasicMaterial 
        color="#3B82F6" 
        transparent 
        opacity={0.06} 
        side={THREE.BackSide} 
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
}

function GlobeSphere() {
  const texture = useTexture('https://unpkg.com/three-globe/example/img/earth-dark.jpg');
  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial 
        map={texture}
        roughness={0.9}
        metalness={0.05}
        emissive="#050505"
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
}

function GlobeScene({ regions, onRegionClick }: { regions: Record<string, RegionData>, onRegionClick: (id: string) => void }) {
  const [selectedHub, setSelectedHub] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null!);

  const arcs = useMemo(() => {
    if (!regions.in || !regions.us || !regions.uk || !regions.ae || !regions.sg) return [];
    
    // Focused Jurisdictional Arcs
    const pairs = [
      { s: regions.in, e: regions.us },
      { s: regions.uk, e: regions.ae },
      { s: regions.sg, e: regions.in }
    ];

    return pairs.map(p => ({
      start: latLngToVector3(p.s.lat, p.s.lng, 2),
      end: latLngToVector3(p.e.lat, p.e.lng, 2)
    }));
  }, [regions]);

  useFrame(() => {
    if (groupRef.current && !selectedHub) {
      groupRef.current.rotation.y += 0.0008;
    }
  });

  const handleHubClick = (id: string) => {
    setSelectedHub(id === selectedHub ? null : id);
    onRegionClick(id);
  };

  return (
    <group ref={groupRef}>
      <Atmosphere />
      <Suspense fallback={<Sphere args={[2, 32, 32]}><meshStandardMaterial color="#0A0A0B" /></Sphere>}>
        <GlobeSphere />
      </Suspense>

      {/* Hub Nodes */}
      {Object.values(regions).map(region => (
        <HubPoint 
          key={region.id} 
          region={region} 
          onClick={handleHubClick} 
          isSelected={selectedHub === region.id}
        />
      ))}

      {/* Synchronized Data Arcs */}
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
      <Canvas camera={{ position: [0, 1, 5], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[-5, 5, 5]} intensity={1.2} color="#FFFFFF" />
        <pointLight position={[0, -5, 2]} intensity={0.4} color="#3B82F6" />
        
        <GlobeScene regions={regions} onRegionClick={onRegionClick} />

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3.2} 
          maxDistance={6} 
          rotateSpeed={0.3}
          autoRotate={false}
        />
      </Canvas>

      {/* Focused Network Legend */}
      <div className="absolute bottom-8 left-10 space-y-3 pointer-events-none">
        <div className="flex items-center space-x-3 opacity-30">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
          <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-white">Active Maison Hub</span>
        </div>
        <div className="flex items-center space-x-3 opacity-30">
          <div className="w-6 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
          <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-white">Registry Sync Path</span>
        </div>
      </div>
    </div>
  );
}
