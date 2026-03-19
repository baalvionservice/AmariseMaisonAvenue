'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Activity, Globe, X, TrendingUp, Lock, Zap, ArrowUpRight, Crown } from 'lucide-react';
import { useSimulationData } from '@/hooks/use-simulation-data';
import { IntelligenceGlobe } from '@/components/admin/IntelligenceGlobe';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

/**
 * Institutional Dashboard: Level 3 Tactical Command Center
 * Features 3D Global Intelligence and real-time behavioral signals.
 */
export default function AdminDashboard() {
  const { regions, globalTotal, globalUsers, conversionRate } = useSimulationData();
  const { scopedErrors, scopedProducts } = useAppStore();
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  const activeHubData = useMemo(() => 
    selectedHub ? regions[selectedHub] : null, 
  [selectedHub, regions]);

  // Aggregate Predictions (Mocked Logic)
  const predictedRevenue = globalTotal * 0.05; // 5% growth projection
  const highIntentUsers = Object.values(regions).reduce((acc, r) => acc + r.cart + r.checkout, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16 pb-32"
    >
      {/* 1. Tactical Signals - Global Yield */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-12">
        <div className="flex space-x-20">
          <SignalNode label="Aggregate Yield" value={`$${(globalTotal / 1000000).toFixed(2)}M`} />
          <SignalNode label="Active Intent" value={globalUsers.toLocaleString()} />
          <SignalNode label="60m Forecast" value={`+$${(predictedRevenue / 1000).toFixed(1)}k`} color="text-emerald-400" />
          <SignalNode label="High Intent" value={highIntentUsers} color="text-amber-400" />
        </div>
        
        <div className="flex items-center space-x-4 mb-1">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">Registry Synchronized</span>
        </div>
      </header>

      {/* 2. Tactical Intelligence Viewport (3D Globe) */}
      <section className="relative h-[600px] w-full bg-[#111113] border border-white/5 rounded-sm overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Globe Component */}
        <IntelligenceGlobe 
          regions={regions} 
          selectedHubId={selectedHub}
          onRegionClick={(id) => setSelectedHub(id || null)} 
        />

        {/* Tactical HUD Overlay (Left) */}
        <div className="absolute top-10 left-10 z-10 space-y-10 pointer-events-none">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-white/40">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Global Matrix v5.2</span>
            </div>
            <p className="text-[9px] text-white/10 uppercase tracking-widest italic">Encrypted Node Access Active</p>
          </div>

          <div className="space-y-6">
             <HUDMetric icon={<Activity className="w-3 h-3" />} label="Sync Latency" value="12ms" />
             <HUDMetric icon={<Lock className="w-3 h-3" />} label="Security Tier" value="Institutional" />
             <HUDMetric icon={<Zap className="w-3 h-3" />} label="AI Autopilot" value="Optimal" />
          </div>
        </div>

        {/* Hub Detail Overlay (Right) */}
        <AnimatePresence>
          {selectedHub && activeHubData && (
            <motion.div 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="absolute right-0 top-0 h-full w-96 bg-[#0A0A0B]/90 backdrop-blur-2xl border-l border-white/5 z-20 p-12 space-y-12"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-500">Jurisdictional Node</span>
                  <h3 className="text-3xl font-headline font-bold italic text-white">{activeHubData.name}</h3>
                </div>
                <button onClick={() => setSelectedHub(null)} className="p-3 hover:bg-white/5 transition-colors rounded-full">
                  <X className="w-5 h-5 text-white/40" />
                </button>
              </div>

              <div className="space-y-10">
                <HubDetailRow label="Market Yield" value={`$${(activeHubData.revenue / 1000).toFixed(1)}k`} trend="+12.4%" />
                <HubDetailRow label="Connoisseur Volume" value={activeHubData.activeUsers} trend="+5.2%" />
                <HubDetailRow label="Archive Pressure" value={activeHubData.cart + activeHubData.wishlist} trend="+18.1%" />
                <HubDetailRow label="Acquisition Index" value={`${((activeHubData.purchased / activeHubData.activeUsers) * 100).toFixed(1)}%`} />
              </div>

              <div className="pt-12 border-t border-white/5 space-y-6">
                <div className="flex items-center space-x-3 text-white/20">
                   <Crown className="w-4 h-4 text-blue-500" />
                   <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Curatorial Insight</span>
                </div>
                <p className="text-xs text-white/40 italic font-light leading-relaxed">
                  "Connoisseur intent in the {activeHubData.id.toUpperCase()} hub is currently trending toward high-complication horological assets. Recommend immediate allocation of Heritage Series 1924 artifacts."
                </p>
                <button className="w-full h-12 bg-white text-black hover:bg-blue-500 hover:text-white transition-all text-[9px] font-bold uppercase tracking-widest rounded-none border-none">
                  Open Hub Terminal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 3. Jurisdictional Market Matrix */}
      <div className="space-y-12">
        <div className="flex items-center space-x-6 text-white/20">
          <div className="h-px w-12 bg-current" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.6em]">Hub Resonance</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {Object.values(regions).map((hub) => {
            const isSelected = selectedHub === hub.id;
            const yieldIndex = (hub.purchased / hub.activeUsers) * 100;
            
            return (
              <motion.div 
                key={hub.id}
                whileHover={{ scale: 1.02, backgroundColor: '#18181B' }}
                onClick={() => setSelectedHub(hub.id)}
                className={cn(
                  "bg-[#111113] border p-10 transition-all duration-500 cursor-pointer group flex flex-col justify-between h-full min-h-[380px] relative overflow-hidden",
                  isSelected ? "border-blue-500/40 shadow-blue-500/5 shadow-2xl" : "border-white/5"
                )}
              >
                {isSelected && <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500" />}
                
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover:text-white/60">
                      {hub.name}
                    </span>
                    <div className={cn(
                      "w-2 h-2 rounded-full transition-all duration-500",
                      isSelected ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" : "bg-blue-500/40"
                    )} />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-4xl font-headline font-bold text-white/90 group-hover:text-white tracking-tighter italic">
                      ${(hub.revenue / 1000).toFixed(0)}k
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">Market Yield</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-white/60 group-hover:text-white">{hub.cart}</p>
                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 flex items-center">
                        <ShoppingCart className="w-3 h-3 mr-2 opacity-40" /> In Cart
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-white/60 group-hover:text-white">{hub.wishlist}</p>
                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 flex items-center">
                        <Heart className="w-3 h-3 mr-2 opacity-40" /> Saved
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Resonance</span>
                      <span className="text-[11px] font-bold text-blue-400/80">{yieldIndex.toFixed(1)}%</span>
                    </div>
                    <div className="h-0.5 w-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${yieldIndex * 10}%` }} />
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-white/5">
                  <p className="text-[11px] text-white/40 italic font-light leading-relaxed">
                    "Momentum stable in {hub.id.toUpperCase()} hub."
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function SignalNode({ label, value, color = "text-white" }: { label: string, value: string | number, color?: string }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">{label}</p>
      <p className={cn("text-5xl font-headline font-bold tracking-tighter select-none italic", color)}>{value}</p>
    </div>
  );
}

function HUDMetric({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center space-x-4 group">
       <div className="text-blue-500/40 group-hover:text-blue-500 transition-colors">{icon}</div>
       <div className="flex flex-col">
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">{label}</span>
          <span className="text-[10px] font-bold text-white/60">{value}</span>
       </div>
    </div>
  );
}

function HubDetailRow({ label, value, trend }: { label: string, value: string | number, trend?: string }) {
  return (
    <div className="flex justify-between items-end group">
      <div className="space-y-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 group-hover:text-white/40 transition-colors">{label}</p>
        <p className="text-3xl font-headline font-bold text-white italic tracking-tighter">{value}</p>
      </div>
      {trend && (
        <div className="flex items-center text-emerald-400 text-[10px] font-bold bg-emerald-400/5 px-2 py-1 mb-1">
          <ArrowUpRight className="w-3 h-3 mr-1" /> {trend}
        </div>
      )}
    </div>
  );
}
