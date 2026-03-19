'use client';

import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, QuadraticBezierLine, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { RegionData } from '@/hooks/use-simulation-data';
import { cn } from '@/lib/utils';

/**
 * Institutional Color Palette for Heatmap
 */
const HEAT_COLORS = {
  low: "#3B82F6",    // Authority Blue
  medium: "#F59E0B", // Focus Amber
  high: "#10B981"    // Success Emerald
};

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
 * DataArc: Animated curved line between hubs with moving light particles
 */
function DataArc({ start, end, intensity = 1 }: { start: THREE.Vector3, end: THREE.Vector3, intensity?: number }) {
  const mid = start.clone().lerp(end, 0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(2 + distance * 0.2);

  const lineRef = useRef<any>(null);
  
  useFrame(() => {
    if (lineRef.current) {
      // Moves the light particles along the line
      lineRef.current.dashOffset -= 0.004 * (0.5 + intensity);
    }
  });

  return (
    <group>
      {/* Base Path Line */}
      <QuadraticBezierLine
        start={start}
        end={end}
        mid={mid}
        color="#3B82F6"
        lineWidth={0.2}
        transparent
        opacity={0.1}
      />
      {/* Animated Light Flow */}
      <QuadraticBezierLine
        ref={lineRef}
        start={start}
        end={end}
        mid={mid}
        color="#60A5FA"
        lineWidth={0.6}
        transparent
        opacity={0.4}
        dashed
        dashScale={40}
        dashSize={0.5}
        dashOffset={0}
      />
    </group>
  );
}

/**
 * HubPoint: Revenue Heatmap Marker
 * Coupling size, color, and glow to simulated revenue intensity.
 */
function HubPoint({ 
  region, 
  maxRevenue,
  onClick, 
  isSelected 
}: { 
  region: RegionData, 
  maxRevenue: number,
  onClick: (id: string) => void,
  isSelected: boolean 
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const glowMesh = useRef<THREE.Mesh>(null!);
  const pos = useMemo(() => latLngToVector3(region.lat, region.lng, 2), [region.lat, region.lng]);

  // Normalize revenue for heatmap (0 to 1)
  const normalizedHeat = useMemo(() => Math.min(1, region.revenue / (maxRevenue || 1)), [region.revenue, maxRevenue]);
  
  // Determine color based on normalized heat
  const heatColor = useMemo(() => {
    if (normalizedHeat > 0.7) return HEAT_COLORS.high;
    if (normalizedHeat > 0.35) return HEAT_COLORS.medium;
    return HEAT_COLORS.low;
  }, [normalizedHeat]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(time * 2) * 0.1;
    const heatScale = 0.8 + normalizedHeat * 0.5;
    
    if (mesh.current) mesh.current.scale.setScalar(pulse * heatScale);
    if (glowMesh.current) glowMesh.current.scale.setScalar(pulse * 3.5 * heatScale);
  });

  return (
    <group position={pos}>
      <mesh ref={mesh} onClick={(e) => { e.stopPropagation(); onClick(region.id); }} cursor="pointer">
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={isSelected ? "#FFFFFF" : heatColor} />
      </mesh>
      
      {/* Outer Heat Aura */}
      <mesh ref={glowMesh}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={heatColor} transparent opacity={0.2 + normalizedHeat * 0.2} />
      </mesh>
      
      <Html distanceFactor={10}>
        <div className="pointer-events-none select-none">
          {isSelected ? (
            <div className="animate-fade-in -translate-y-36 -translate-x-1/2">
              <div className="w-52 bg-[#111113]/95 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-start border-b border-white/5 pb-3">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: heatColor }}>{region.id.toUpperCase()} Hub</p>
                    <h4 className="text-sm font-headline font-bold italic text-white leading-none">{region.name}</h4>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: heatColor }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[7px] font-bold text-white/30 uppercase tracking-[0.2em]">Yield</p>
                    <p className="text-[11px] font-bold text-white">${(region.revenue / 1000).toFixed(1)}k</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[7px] font-bold text-white/30 uppercase tracking-[0.2em]">Active</p>
                    <p className="text-[11px] font-bold text-white">{region.activeUsers}</p>
                  </div>
                </div>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-2" />
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

  // Find max revenue for normalization
  const maxRevenue = useMemo(() => 
    Math.max(...Object.values(regions).map(r => r.revenue), 1), 
  [regions]);

  const arcs = useMemo(() => {
    if (!regions.in || !regions.us || !regions.uk || !regions.ae || !regions.sg) return [];
    
    // Configurable Flow Pairs
    const flows = [
      { s: regions.in, e: regions.us },
      { s: regions.uk, e: regions.ae },
      { s: regions.sg, e: regions.in }
    ];

    return flows.map(f => ({
      start: latLngToVector3(f.s.lat, f.s.lng, 2),
      end: latLngToVector3(f.e.lat, f.e.lng, 2),
      intensity: (f.s.activeUsers + f.e.activeUsers) / 1000
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

      {/* Hub Points with Heatmap logic */}
      {Object.values(regions).map(region => (
        <HubPoint 
          key={region.id} 
          region={region} 
          maxRevenue={maxRevenue}
          onClick={handleHubClick} 
          isSelected={selectedHub === region.id}
        />
      ))}

      {/* User Flow Arcs */}
      {arcs.map((arc, idx) => (
        <DataArc key={idx} start={arc.start} end={arc.end} intensity={arc.intensity} />
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

      {/* Institutional Network Legend */}
      <div className="absolute bottom-8 left-10 space-y-4 pointer-events-none">
        <div className="space-y-2">
          <p className="text-[7px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Revenue Heatmap</p>
          <LegendItem color={HEAT_COLORS.high} label="Optimal Yield" />
          <LegendItem color={HEAT_COLORS.medium} label="Strategic Flow" />
          <LegendItem color={HEAT_COLORS.low} label="Initial Resonance" />
        </div>
        
        <div className="pt-4 border-t border-white/5 space-y-2">
          <p className="text-[7px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Active Protocols</p>
          <div className="flex items-center space-x-3 opacity-30">
            <div className="w-6 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
            <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-white">Registry Sync Path</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center space-x-3 opacity-60">
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-white">{label}</span>
    </div>
  );
}
