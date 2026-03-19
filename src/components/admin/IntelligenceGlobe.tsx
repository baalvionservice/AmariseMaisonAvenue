'use client';

import React, { useRef, useMemo, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, QuadraticBezierLine, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { RegionData } from '@/hooks/use-simulation-data';
import { cn } from '@/lib/utils';
import { Plus, Minus, RefreshCcw, Lock, TrendingUp, Users, ShoppingCart, Zap, Crown, Globe } from 'lucide-react';

/**
 * Institutional Color Palette for Heatmap & Markers
 */
const HUB_COLORS = {
  high: "#22C55E",    // Success Green
  medium: "#F59E0B",  // Focus Amber
  low: "#3B82F6",     // Authority Blue
  selected: "#FFFFFF" // Focus White
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
 * HubPoint: The interactive marker node with Intelligence Overlay
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

  const normalizedHeat = useMemo(() => Math.min(1, region.revenue / (maxRevenue || 1)), [region.revenue, maxRevenue]);
  
  const heatColor = useMemo(() => {
    if (isSelected) return HUB_COLORS.selected;
    if (normalizedHeat > 0.7) return HUB_COLORS.high;
    if (normalizedHeat > 0.35) return HUB_COLORS.medium;
    return HUB_COLORS.low;
  }, [normalizedHeat, isSelected]);

  // Autonomous Insight Generation
  const aiInsight = useMemo(() => {
    if (region.cart > region.purchased * 3) return "High checkout friction detected.";
    if (region.purchased > 5) return "High conversion momentum.";
    if (region.wishlist > 20) return "Strong collection interest.";
    return "Market resonance stable.";
  }, [region.cart, region.purchased, region.wishlist]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(time * 3) * 0.15;
    const heatScale = isSelected ? 1.3 : (0.8 + normalizedHeat * 0.6);
    
    if (mesh.current) mesh.current.scale.setScalar(pulse * heatScale);
    if (glowMesh.current) glowMesh.current.scale.setScalar(pulse * (isSelected ? 5 : 4) * heatScale);
  });

  return (
    <group position={pos}>
      <mesh 
        ref={mesh} 
        onClick={(e) => { e.stopPropagation(); onClick(region.id); }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={heatColor} />
      </mesh>
      
      <mesh ref={glowMesh}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={heatColor} transparent opacity={isSelected ? 0.5 : (0.2 + normalizedHeat * 0.3)} />
      </mesh>
      
      <Html distanceFactor={isSelected ? 8 : 12} zIndexRange={[10, 0]}>
        <div className="pointer-events-none select-none">
          {isSelected ? (
            <div className="animate-fade-in -translate-y-56 -translate-x-1/2">
              <div className="w-72 bg-[#111113]/95 backdrop-blur-2xl border border-white/10 p-8 shadow-[0_40px_80px_rgba(0,0,0,0.6)] space-y-6 relative">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-blue-400">Tactical Node {region.id.toUpperCase()}</p>
                    <h4 className="text-xl font-headline font-bold italic text-white leading-none">{region.name}</h4>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-white/20" />
                </div>

                <div className="space-y-5">
                  <DetailItem label="Revenue Hub" value={`$${(region.revenue / 1000).toFixed(1)}k`} icon={<TrendingUp className="w-3.5 h-3.5 text-emerald-400" />} />
                  <DetailItem label="Active Intent" value={region.activeUsers} icon={<Users className="w-3.5 h-3.5 text-blue-400" />} />
                  <DetailItem label="Cart Density" value={region.cart} icon={<ShoppingCart className="w-3.5 h-3.5 text-amber-400" />} />
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Zap className="w-3 h-3" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Curator Signal</span>
                  </div>
                  <p className="text-[10px] text-white/60 font-light italic leading-relaxed">
                    "{aiInsight}"
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[7px] font-bold text-white/20 uppercase tracking-[0.3em]">Yield probability</span>
                    <span className="text-[9px] font-bold text-blue-400">{((region.purchased / region.activeUsers) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-0.5 bg-white/5 w-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${(region.purchased / region.activeUsers) * 100}%` }} />
                  </div>
                </div>
              </div>
              <div className="w-px h-24 bg-gradient-to-b from-blue-500/50 to-transparent mx-auto mt-2" />
            </div>
          ) : (
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 border border-white/5 -translate-y-10 whitespace-nowrap shadow-2xl transition-all">
              <p className="text-[9px] font-bold text-white/80 uppercase tracking-[0.5em]">{region.id.toUpperCase()}</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function DetailItem({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center group">
      <div className="flex items-center space-x-3">
        <div className="opacity-40 group-hover:opacity-100 transition-opacity">{icon}</div>
        <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">{label}</span>
      </div>
      <span className="text-[13px] font-bold text-white tracking-tighter">{value}</span>
    </div>
  );
}

function DataArc({ start, end, intensity = 1 }: { start: THREE.Vector3, end: THREE.Vector3, intensity?: number }) {
  const mid = start.clone().lerp(end, 0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(2 + distance * 0.25);

  const lineRef = useRef<any>(null);
  
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.dashOffset -= 0.005 * (0.5 + intensity);
    }
  });

  return (
    <group>
      <QuadraticBezierLine
        start={start}
        end={end}
        mid={mid}
        color="#3B82F6"
        lineWidth={0.15}
        transparent
        opacity={0.08}
      />
      <QuadraticBezierLine
        ref={lineRef}
        start={start}
        end={end}
        mid={mid}
        color="#60A5FA"
        lineWidth={0.5}
        transparent
        opacity={0.3}
        dashed
        dashScale={50}
        dashSize={0.4}
        dashOffset={0}
      />
    </group>
  );
}

function GlobeSphere() {
  const texture = useTexture('https://unpkg.com/three-globe/example/img/earth-dark.jpg');
  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial 
        map={texture}
        roughness={0.85}
        metalness={0.1}
        emissive="#050505"
        emissiveIntensity={0.15}
      />
    </Sphere>
  );
}

function Atmosphere() {
  return (
    <Sphere args={[2.15, 64, 64]}>
      <meshBasicMaterial 
        color="#3B82F6" 
        transparent 
        opacity={0.05} 
        side={THREE.BackSide} 
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
}

function GlobeScene({ 
  regions, 
  selectedHubId,
  onRegionClick, 
  controlsRef 
}: { 
  regions: Record<string, RegionData>, 
  selectedHubId: string | null,
  onRegionClick: (id: string | null) => void,
  controlsRef: React.RefObject<any>
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  const maxRevenue = useMemo(() => 
    Math.max(...Object.values(regions).map(r => r.revenue), 1), 
  [regions]);

  const targetCamPos = useRef(new THREE.Vector3(0, 1, 5));
  const targetFocus = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (selectedHubId && regions[selectedHubId]) {
      const reg = regions[selectedHubId];
      const pos = latLngToVector3(reg.lat, reg.lng, 2);
      targetCamPos.current.copy(pos).normalize().multiplyScalar(3.4);
      targetFocus.current.copy(pos);
    } else {
      targetCamPos.current.set(0, 1, 5);
      targetFocus.current.set(0, 0, 0);
    }
  }, [selectedHubId, regions]);

  useFrame((state) => {
    if (groupRef.current && !selectedHubId) {
      groupRef.current.rotation.y += 0.0006;
    }

    camera.position.lerp(targetCamPos.current, 0.06);
    
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetFocus.current, 0.06);
      controlsRef.current.update();
    }
  });

  const arcs = useMemo(() => {
    if (!regions.in || !regions.us || !regions.uk || !regions.ae || !regions.sg) return [];
    const flows = [
      { s: regions.in, e: regions.us }, 
      { s: regions.uk, e: regions.ae }, 
      { s: regions.sg, e: regions.in }
    ];
    return flows.map(f => ({
      start: latLngToVector3(f.s.lat, f.s.lng, 2),
      end: latLngToVector3(f.e.lat, f.e.lng, 2),
      intensity: (f.s.activeUsers + f.e.activeUsers) / 800
    }));
  }, [regions]);

  return (
    <group ref={groupRef} onPointerMissed={() => onRegionClick(null)}>
      <Atmosphere />
      <Suspense fallback={<Sphere args={[2, 32, 32]}><meshStandardMaterial color="#0A0A0B" /></Sphere>}>
        <GlobeSphere />
      </Suspense>

      {Object.values(regions).map(region => (
        <HubPoint 
          key={region.id} 
          region={region} 
          maxRevenue={maxRevenue}
          onClick={onRegionClick} 
          isSelected={selectedHubId === region.id}
        />
      ))}

      {arcs.map((arc, idx) => (
        <DataArc key={idx} start={arc.start} end={arc.end} intensity={arc.intensity} />
      ))}

      <OrbitControls 
        ref={controlsRef}
        enablePan={false} 
        enableZoom={true} 
        minDistance={3.0} 
        maxDistance={6.5} 
        rotateSpeed={0.5}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </group>
  );
}

export function IntelligenceGlobe({ 
  regions, 
  selectedHubId,
  onRegionClick 
}: { 
  regions: Record<string, RegionData>, 
  selectedHubId: string | null,
  onRegionClick: (id: string | null) => void 
}) {
  const controlsRef = useRef<any>(null);

  const handleManualZoom = (direction: 'in' | 'out') => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const zoomFactor = direction === 'in' ? 0.8 : 1.25;
      camera.position.multiplyScalar(zoomFactor);
      controlsRef.current.update();
    }
  };

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing relative">
      <Canvas camera={{ position: [0, 1, 5], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[0, -5, 2]} intensity={0.5} color="#3B82F6" />
        
        <GlobeScene 
          regions={regions} 
          selectedHubId={selectedHubId}
          onRegionClick={onRegionClick} 
          controlsRef={controlsRef} 
        />
      </Canvas>

      {/* Institutional Legend */}
      <div className="absolute bottom-10 left-10 space-y-5 pointer-events-none">
        <div className="space-y-2.5">
          <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/20 mb-3">Market Yield Matrix</p>
          <LegendItem color={HUB_COLORS.high} label="Optimal Yield" />
          <LegendItem color={HUB_COLORS.medium} label="Strategic Flow" />
          <LegendItem color={HUB_COLORS.low} label="Base Resonance" />
        </div>
      </div>

      {/* Tactical Hub Control Matrix */}
      <div className="absolute bottom-10 right-10 flex flex-col space-y-3">
        <button 
          onClick={() => onRegionClick(null)}
          className="w-12 h-12 bg-[#111113]/80 backdrop-blur-xl border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-blue-500/50 transition-all shadow-2xl group"
          aria-label="Master Reset"
        >
          <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
        </button>
        <button 
          onClick={() => handleManualZoom('in')}
          className="w-12 h-12 bg-[#111113]/80 backdrop-blur-xl border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-blue-500/50 transition-all shadow-2xl"
          aria-label="Inc. Zoom"
        >
          <Plus size={18} />
        </button>
        <button 
          onClick={() => handleManualZoom('out')}
          className="w-12 h-12 bg-[#111113]/80 backdrop-blur-xl border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-blue-500/50 transition-all shadow-2xl"
          aria-label="Dec. Zoom"
        >
          <Minus size={18} />
        </button>
      </div>

      <div className="absolute top-10 left-10 z-10 space-y-3 pointer-events-none">
        <div className="flex items-center space-x-4">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <Globe className="w-4 h-4 text-blue-500" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/80">Global Matrix</span>
            <p className="text-[8px] text-white/20 uppercase tracking-widest font-bold">Node sync: Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center space-x-4 opacity-70">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
      <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/80">{label}</span>
    </div>
  );
}
