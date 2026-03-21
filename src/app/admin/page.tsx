'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Activity, 
  Globe, 
  X, 
  TrendingUp, 
  Lock, 
  Zap, 
  ArrowUpRight, 
  Crown,
  Eye,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useSimulationData } from '@/hooks/use-simulation-data';
import { IntelligenceGlobe } from '@/components/admin/IntelligenceGlobe';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

/**
 * Institutional Dashboard: Level 3 Tactical Command Center
 * Features 3D Global Intelligence and real-time behavioral signals.
 * Optimized viewport scale for pro-density oversight.
 */
export default function AdminDashboard() {
  const { regions, globalTotal, globalUsers } = useSimulationData();
  const { scopedErrors, adminJurisdiction } = useAppStore();
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  const activeHubData = useMemo(() => 
    selectedHub ? regions[selectedHub] : null, 
  [selectedHub, regions]);

  const highIntentUsers = useMemo(() => Object.values(regions).reduce((acc, r) => acc + r.cart + r.checkout, 0), [regions]);
  const activeNegotiations = useMemo(() => Math.floor(highIntentUsers * 0.15), [highIntentUsers]);

  const jurisdictionLabel = adminJurisdiction === 'global' ? 'Global Core' : adminJurisdiction.toUpperCase() + ' HUB';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 pb-20"
    >
      {/* 1. Tactical Command HUD - Multi-Jurisdictional Yield */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
        <div className="flex space-x-12">
          <SignalNode label="Aggregate Yield" value={`$${(globalTotal / 1000000).toFixed(2)}M`} />
          <SignalNode label="Network Pulse" value={globalUsers.toLocaleString()} />
          <SignalNode label="Active Intent" value={highIntentUsers} color="text-amber-400" />
          <SignalNode label="Negotiations" value={activeNegotiations} color="text-blue-400" />
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-3">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30">Registry Synchronized: {jurisdictionLabel}</span>
          </div>
          <Badge variant="outline" className="bg-plum/10 text-plum border-plum/20 text-[7px] uppercase tracking-widest px-2 py-0.5">
            Institutional v5.2 Active
          </Badge>
        </div>
      </header>

      {/* 2. Tactical Intelligence Viewport (3D Globe) - Optimized Height */}
      <section className="relative h-[480px] w-full bg-[#111113] border border-white/5 rounded-none overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
        
        <IntelligenceGlobe 
          regions={regions} 
          selectedHubId={selectedHub}
          onRegionClick={(id) => setSelectedHub(id || null)} 
        />

        {/* Tactical HUD Overlay (Left) */}
        <div className="absolute top-8 left-8 z-10 space-y-8 pointer-events-none">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 text-white/40">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-[0.5em]">Global Matrix</span>
            </div>
            <p className="text-[8px] text-white/10 uppercase tracking-widest italic">Encrypted Node Access</p>
          </div>

          <div className="space-y-4">
             <HUDMetric icon={<Activity className="w-3 h-3" />} label="Sync Latency" value="12ms" />
             <HUDMetric icon={<Lock className="w-3 h-3" />} label="Security Tier" value="Level 3" />
             <HUDMetric icon={<Zap className="w-3 h-3" />} label="AI Autopilot" value="Optimal" />
             <HUDMetric icon={<AlertTriangle className="w-3 h-3" />} label="Anomalies" value={scopedErrors.filter(e => !e.resolved).length.toString()} />
          </div>
        </div>

        {/* Hub Detail Overlay (Right) */}
        <AnimatePresence>
          {selectedHub && activeHubData && (
            <motion.div 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="absolute right-0 top-0 h-full w-[380px] bg-[#0A0A0B]/95 backdrop-blur-2xl border-l border-white/5 z-20 p-10 space-y-8 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-blue-500">Jurisdictional Node</span>
                  <h3 className="text-3xl font-headline font-bold italic text-white leading-none">{activeHubData.name}</h3>
                </div>
                <button onClick={() => setSelectedHub(null)} className="p-2 hover:bg-white/5 transition-colors rounded-full text-white/40 hover:text-white border-none bg-transparent">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <HubDetailRow label="Market Yield" value={`$${(activeHubData.revenue / 1000).toFixed(1)}k`} trend="+12.4%" />
                <HubDetailRow label="Active Users" value={activeHubData.activeUsers} trend="+5.2%" />
                <HubDetailRow label="Registry Density" value={activeHubData.cart + activeHubData.wishlist} trend="+18.1%" />
                <HubDetailRow label="Acquisition Index" value={`${((activeHubData.purchased / activeHubData.activeUsers) * 100).toFixed(1)}%`} />
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                <div className="flex items-center space-x-3 text-white/20">
                   <Crown className="w-3.5 h-3.5 text-blue-500" />
                   <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Curatorial Insight</span>
                </div>
                <div className="p-5 bg-white/5 border border-white/10 space-y-3">
                   <p className="text-xs text-white/60 italic font-light leading-relaxed">
                     "High intent detected in {activeHubData.id.toUpperCase()}. Recommend immediate allocation of 1924 artifacts."
                   </p>
                   <div className="flex items-center justify-between text-[7px] font-bold uppercase tracking-[0.3em] text-blue-400">
                      <span>CONFIDENCE: 94%</span>
                      <span>AI Autopilot</span>
                   </div>
                </div>
                <button className="w-full h-14 bg-white text-black hover:bg-blue-500 hover:text-white transition-all text-[9px] font-bold uppercase tracking-[0.4em] rounded-none border-none shadow-xl cursor-pointer">
                  OPEN HUB TERMINAL <ArrowRight className="ml-2 w-3.5 h-3.5 inline" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 3. Jurisdictional Market Matrix & High-Resonance Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center space-x-4 text-white/20">
            <div className="h-px w-8 bg-current" />
            <h2 className="text-[9px] font-bold uppercase tracking-[0.6em]">Hub Resonance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(regions).map((hub) => {
              const isSelected = selectedHub === hub.id;
              const yieldIndex = (hub.purchased / hub.activeUsers) * 100;
              
              return (
                <motion.div 
                  key={hub.id}
                  whileHover={{ scale: 1.02, backgroundColor: '#18181B' }}
                  onClick={() => setSelectedHub(hub.id)}
                  className={cn(
                    "bg-[#111113] border p-8 transition-all duration-500 cursor-pointer group flex flex-col justify-between h-full relative overflow-hidden",
                    isSelected ? "border-blue-500/40 shadow-blue-500/5 shadow-2xl" : "border-white/5"
                  )}
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover:text-white/60">
                        {hub.name}
                      </span>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isSelected ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "bg-blue-500/20"
                      )} />
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-3xl font-headline font-bold text-white/90 group-hover:text-white tracking-tighter italic">
                        ${(hub.revenue / 1000).toFixed(0)}k
                      </p>
                      <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">Market Yield</p>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-white/40 pt-3 border-t border-white/5">
                       <span className="flex items-center"><ShoppingCart className="w-2.5 h-2.5 mr-1.5" /> {hub.cart}</span>
                       <span className="flex items-center"><Heart className="w-2.5 h-2.5 mr-1.5" /> {hub.wishlist}</span>
                       <span className="text-blue-400">{yieldIndex.toFixed(1)}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Strategic Alerts & Mitigations */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="flex items-center space-x-4 text-white/20">
            <div className="h-px w-8 bg-current" />
            <h2 className="text-[9px] font-bold uppercase tracking-[0.6em]">Mitigation</h2>
          </div>

          <Card className="bg-[#111113] border-white/5 rounded-none overflow-hidden">
             <CardHeader className="border-b border-white/5 bg-plum/5 p-5">
                <div className="flex items-center space-x-3 text-plum">
                   <Zap className="w-3.5 h-3.5" />
                   <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">AI Mitigation</CardTitle>
                </div>
             </CardHeader>
             <CardContent className="p-6 space-y-4">
                <MitigationItem 
                  hub="India" 
                  issue="Yield Lag" 
                  suggestion="Dispatch Narratives" 
                  status="PENDING"
                />
                <MitigationItem 
                  hub="UAE" 
                  issue="Lead Surge" 
                  suggestion="Authorize Salon" 
                  status="ACTIVE"
                />
             </CardContent>
          </Card>

          <div className="bg-white/5 p-6 border border-white/10 space-y-4">
             <div className="flex items-center space-x-3 text-white/40">
                <Activity className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[8px] font-bold uppercase tracking-[0.4em]">System Pulse</span>
             </div>
             <div className="space-y-3">
                <PerformanceRow label="Global Sync" val={100} />
                <PerformanceRow label="AI Accuracy" val={98} />
             </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

function SignalNode({ label, value, color = "text-white" }: { label: string, value: string | number, color?: string }) {
  return (
    <div className="space-y-2">
      <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/20">{label}</p>
      <p className={cn("text-4xl font-headline font-bold tracking-tighter select-none italic", color)}>{value}</p>
    </div>
  );
}

function HUDMetric({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center space-x-3 group">
       <div className="text-blue-500/40 group-hover:text-blue-500 transition-colors">{icon}</div>
       <div className="flex flex-col">
          <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-white/20">{label}</span>
          <span className="text-[9px] font-bold text-white/60">{value}</span>
       </div>
    </div>
  );
}

function HubDetailRow({ label, value, trend }: { label: string, value: string | number, trend?: string }) {
  return (
    <div className="flex flex-col space-y-0.5 group">
      <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20 group-hover:text-white/40 transition-colors">{label}</p>
      <div className="flex items-baseline space-x-2">
        <p className="text-2xl font-headline font-bold text-white italic tracking-tighter">{value}</p>
        {trend && <span className="text-emerald-400 text-[8px] font-bold">{trend}</span>}
      </div>
    </div>
  );
}

function MitigationItem({ hub, issue, suggestion, status }: { hub: string, issue: string, suggestion: string, status: string }) {
  return (
    <div className="p-4 border border-white/5 bg-white/[0.02] space-y-2 hover:bg-white/5 transition-all cursor-pointer group">
       <div className="flex justify-between items-center">
          <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">{hub} Hub</span>
          <Badge variant="outline" className={cn(
            "text-[6px] uppercase border-none px-1.5 py-0",
            status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-400" : "bg-white/10 text-white/40"
          )}>{status}</Badge>
       </div>
       <div className="space-y-0.5">
          <p className="text-[9px] font-bold uppercase text-white/80">{issue}</p>
          <p className="text-[10px] text-white/40 italic font-light leading-snug">"{suggestion}"</p>
       </div>
    </div>
  );
}

function PerformanceRow({ label, val }: { label: string, val: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest">
        <span className="text-white/30">{label}</span>
        <span className="text-white/60">{val}%</span>
      </div>
      <div className="h-0.5 bg-white/5 w-full">
         <div className="h-full bg-blue-500 opacity-60" style={{ width: `${val}%` }} />
      </div>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("rounded-sm border bg-card text-card-foreground shadow-sm", className)}>
      {children}
    </div>
  );
}

function CardHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("flex flex-col space-y-1 p-6", className)}>{children}</div>;
}

function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h3 className={cn("text-xl font-semibold leading-none tracking-tight", className)}>{children}</h3>;
}

function CardDescription({ children, className }: { children: React.ReactNode, className?: string }) {
  return <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>;
}

function CardContent({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}
