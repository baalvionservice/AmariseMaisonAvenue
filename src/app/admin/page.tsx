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
  ShieldCheck,
  Cpu,
  BarChart3,
  Server,
  TrendingDown,
  Coins
} from 'lucide-react';
import { useSimulationData } from '@/hooks/use-simulation-data';
import { IntelligenceGlobe } from '@/components/admin/IntelligenceGlobe';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

/**
 * Bank-Grade Command Center: Level 3 Tactical Oversight.
 * Optimized for information density and predictive revenue signals.
 */
export default function AdminDashboard() {
  const { regions, globalTotal, globalUsers, globalPredictedInflow } = useSimulationData();
  const { scopedErrors, adminJurisdiction } = useAppStore();
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  const activeHubData = useMemo(() => 
    selectedHub ? regions[selectedHub] : null, 
  [selectedHub, regions]);

  const jurisdictionLabel = adminJurisdiction === 'global' ? 'GLOBAL MASTER' : adminJurisdiction.toUpperCase() + ' NODE';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. System Health Ticker: Bank-Grade Status Bar */}
      <div className="flex bg-[#111113] border border-white/5 p-1">
         <div className="flex-1 overflow-hidden flex items-center">
            <div className="flex items-center space-x-8 px-6 animate-marquee whitespace-nowrap">
               <StatusTick label="GLOBAL SYNC" value="OPTIMAL" color="text-emerald-500" />
               <StatusTick label="AI ACCURACY" value="98.2%" color="text-blue-400" />
               <StatusTick label="LATENCY" value="12ms" color="text-blue-400" />
               <StatusTick label="ANOMALIES" value={scopedErrors.filter(e => !e.resolved).length.toString()} color="text-red-500" />
               <StatusTick label="CRYPTO NODES" value="SECURE" color="text-emerald-500" />
               <StatusTick label="HK HUB" value="ONLINE" color="text-emerald-500" />
            </div>
         </div>
         <div className="bg-white/5 px-6 py-2 border-l border-white/10 flex items-center space-x-3">
            <Server className="w-3 h-3 text-white/40" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 tabular">NODE: {jurisdictionLabel}</span>
         </div>
      </div>

      {/* 2. Primary Yield HUD */}
      <header className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <SignalNode label="Aggregate Yield" value={`$${(globalTotal / 1000000).toFixed(2)}M`} trend="+12.4% MoM" />
        <SignalNode label="Network Pulse" value={globalUsers.toLocaleString()} trend="+5.2%" />
        <SignalNode 
          label="Liquidity Pipeline (1h)" 
          value={`$${(globalPredictedInflow / 1000).toFixed(1)}k`} 
          color="text-blue-400" 
          trend="Neural Confidence: 92%"
        />
        <SignalNode label="Strategic Win Rate" value="14.2%" color="text-emerald-400" />
      </header>

      {/* 3. Viewport & Local Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Global Matrix Viewport */}
        <section className="lg:col-span-8 relative h-[480px] bg-[#111113] border border-white/5 overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
          
          <IntelligenceGlobe 
            regions={regions} 
            selectedHubId={selectedHub}
            onRegionClick={(id) => setSelectedHub(id || null)} 
          />

          {/* Tactical Overlays */}
          <div className="absolute top-6 left-6 z-10 space-y-6 pointer-events-none">
            <div className="flex items-center space-x-3 text-white/40">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-[0.5em]">Global Matrix v5.2</span>
            </div>
            <div className="space-y-3">
               <HUDMetric icon={<Activity className="w-3 h-3" />} label="TRAFFIC" value="STABLE" />
               <HUDMetric icon={<Lock className="w-3 h-3" />} label="VAULT" value="LOCKED" />
               <HUDMetric icon={<Cpu className="w-3 h-3" />} label="AI AGENT" value="ACTIVE" />
            </div>
          </div>

          <AnimatePresence>
            {selectedHub && activeHubData && (
              <motion.div 
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                className="absolute right-0 top-0 h-full w-[340px] bg-[#0A0A0B]/95 backdrop-blur-2xl border-l border-white/5 z-20 p-8 space-y-8 shadow-2xl"
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-blue-500">Jurisdictional Node</span>
                    <h3 className="text-2xl font-headline font-bold italic text-white leading-none">{activeHubData.name}</h3>
                  </div>
                  <button onClick={() => setSelectedHub(null)} className="p-2 hover:bg-white/5 text-white/40 border-none bg-transparent cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <HubDetailRow label="Yield" value={`$${(activeHubData.revenue / 1000).toFixed(1)}k`} />
                  <HubDetailRow label="1h Inflow" value={`$${(activeHubData.predictedInflow / 1000).toFixed(1)}k`} color="text-blue-400" />
                  <HubDetailRow label="Cart Density" value={activeHubData.cart} />
                  <HubDetailRow label="Win Rate" value={`${((activeHubData.purchased / activeHubData.activeUsers) * 100).toFixed(1)}%`} />
                </div>

                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="p-4 bg-white/5 border border-white/10 space-y-2">
                     <p className="text-[10px] text-white/60 italic leading-relaxed">
                       "Strategic resonance high in {activeHubData.id.toUpperCase()}. Predicted inflow surge of ${activeHubData.predictedInflow.toLocaleString()} in the next horizon."
                     </p>
                     <span className="text-[7px] font-bold uppercase text-blue-400">AI PREDICTION AGENT</span>
                  </div>
                  <button className="w-full h-12 bg-white text-black hover:bg-blue-500 hover:text-white transition-all text-[9px] font-bold uppercase tracking-[0.4em] rounded-none border-none cursor-pointer">
                    HUB TERMINAL
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Tactical Mitigation & Alerts */}
        <aside className="lg:col-span-4 space-y-8">
          <Card className="bg-[#111113] border-white/5 rounded-none">
             <CardHeader className="border-b border-white/5 bg-white/5 p-5 flex flex-row items-center justify-between">
                <div className="flex items-center space-x-3 text-blue-400">
                   <Zap className="w-3.5 h-3.5" />
                   <CardTitle className="text-[10px] font-bold uppercase tracking-[0.3em]">Neural Pipeline</CardTitle>
                </div>
                <Badge variant="outline" className="text-[7px] text-white/40 border-white/10 uppercase">Incoming Liquidity</Badge>
             </CardHeader>
             <CardContent className="p-6 space-y-4">
                <MitigationItem hub="IN" issue="Cart Surge" suggestion="Expected +$12k" status="MONITORING" />
                <MitigationItem hub="AE" issue="VIP Intent" suggestion="Expected +$85k" status="ACTIVE" />
                <MitigationItem hub="US" issue="Checkout Flow" suggestion="Expected +$42k" status="OPTIMIZED" />
             </CardContent>
          </Card>

          <Card className="bg-[#111113] border-white/5 rounded-none p-6 space-y-6">
             <div className="flex items-center space-x-3 text-white/20">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                <h4 className="text-[9px] font-bold uppercase tracking-[0.4em]">Predictive accuracy</h4>
             </div>
             <div className="space-y-4">
                <PerformanceRow label="1H FORECAST" val={96} />
                <PerformanceRow label="USER INTENT" val={92} />
                <PerformanceRow label="CART RESONANCE" val={99} />
             </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function StatusTick({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex items-center space-x-3">
       <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">{label}:</span>
       <span className={cn("text-[9px] font-bold uppercase tracking-widest tabular", color)}>{value}</span>
    </div>
  );
}

function SignalNode({ label, value, trend, color = "text-white" }: { label: string, value: string | number, trend?: string, color?: string }) {
  return (
    <Card className="bg-[#111113] border-white/5 p-6 space-y-4 group hover:border-blue-500/40 transition-all rounded-none shadow-2xl">
      <div className="flex justify-between items-start">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">{label}</p>
        {trend && <span className="text-[8px] font-bold text-blue-400 tabular uppercase">{trend}</span>}
      </div>
      <p className={cn("text-4xl font-body font-bold tracking-tighter italic tabular leading-none", color)}>{value}</p>
    </Card>
  );
}

function HUDMetric({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center space-x-3 group">
       <div className="text-blue-500/40 group-hover:text-blue-500 transition-colors">{icon}</div>
       <div className="flex flex-col">
          <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-white/20">{label}</span>
          <span className="text-[9px] font-bold text-white/60 tabular">{value}</span>
       </div>
    </div>
  );
}

function HubDetailRow({ label, value, color = "text-white" }: { label: string, value: string | number, color?: string }) {
  return (
    <div className="flex flex-col space-y-1">
      <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">{label}</p>
      <p className={cn("text-xl font-body font-bold italic tracking-tighter tabular", color)}>{value}</p>
    </div>
  );
}

function MitigationItem({ hub, issue, suggestion, status }: { hub: string, issue: string, suggestion: string, status: string }) {
  return (
    <div className="p-4 border border-white/5 bg-white/[0.02] space-y-2 hover:bg-white/5 transition-all cursor-pointer group">
       <div className="flex justify-between items-center">
          <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">{hub} HUB</span>
          <Badge variant="outline" className={cn(
            "text-[6px] uppercase border-none px-1.5 py-0",
            status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-400" : 
            status === 'MONITORING' ? "bg-blue-500/10 text-blue-400" :
            "bg-white/10 text-white/40"
          )}>{status}</Badge>
       </div>
       <div className="space-y-0.5">
          <p className="text-[9px] font-bold uppercase text-white/80">{issue}</p>
          <p className="text-[10px] text-white/40 italic font-light line-clamp-1">"{suggestion}"</p>
       </div>
    </div>
  );
}

function PerformanceRow({ label, val }: { label: string, val: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest">
        <span className="text-white/30">{label}</span>
        <span className="text-white/60 tabular">{val}%</span>
      </div>
      <div className="h-0.5 bg-white/5 w-full">
         <div className="h-full bg-blue-500 opacity-60" style={{ width: `${val}%` }} />
      </div>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("rounded-none border bg-card text-card-foreground shadow-sm", className)}>
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