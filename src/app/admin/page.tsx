'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Globe, 
  X, 
  TrendingUp, 
  Zap, 
  Server, 
  ChevronRight, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  Database
} from 'lucide-react';
import { useSimulationData } from '@/hooks/use-simulation-data';
import { IntelligenceGlobe } from '@/components/admin/IntelligenceGlobe';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Bank-Grade Command Center: Level 3 Tactical Oversight.
 * Refined layout with high information density and jurisdictional hub matrix.
 */
export default function AdminDashboard() {
  const { regions, globalTotal, globalUsers, globalPredictedInflow } = useSimulationData();
  const { scopedErrors, adminJurisdiction, setAdminJurisdiction, currentUser } = useAppStore();
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  const activeHubData = useMemo(() => 
    selectedHub ? regions[selectedHub] : null, 
  [selectedHub, regions]);

  const jurisdictionLabel = adminJurisdiction === 'global' ? 'GLOBAL MASTER' : adminJurisdiction.toUpperCase() + ' NODE';

  return (
    <div className="space-y-8 animate-fade-in font-body pb-20">
      {/* 1. System Health Ticker: Bank-Grade Status Bar with Clipping Mask */}
      <div className="flex bg-[#111113] border border-white/5 p-1 rounded-sm shadow-2xl relative overflow-hidden h-10">
         <div className="flex-1 overflow-hidden flex items-center">
            <div className="flex items-center space-x-12 px-6 animate-marquee whitespace-nowrap">
               <StatusTick label="GLOBAL SYNC" value="OPTIMAL" color="text-emerald-500" />
               <StatusTick label="AI ACCURACY" value="98.2%" color="text-blue-400" />
               <StatusTick label="LATENCY" value="12ms" color="text-blue-400" />
               <StatusTick label="ANOMALIES" value={scopedErrors.filter(e => !e.resolved).length.toString()} color="text-red-500" />
               <StatusTick label="HUB CONNECTIVITY" value="STABLE" color="text-emerald-500" />
               <StatusTick label="SECURITY MESH" value="ACTIVE" color="text-emerald-500" />
            </div>
         </div>
         {/* Static Mask Node Indicator */}
         <div className="relative z-10 bg-[#111113] px-6 py-2 border-l border-white/10 flex items-center space-x-3 shadow-[-15px_0_20px_rgba(17,17,19,1)]">
            <Server className="w-3 h-3 text-white/40" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 tabular">NODE: {jurisdictionLabel}</span>
         </div>
      </div>

      {/* 2. Primary Yield HUD */}
      <header className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SignalNode label="Aggregate Yield" value={`$${(globalTotal / 1000000).toFixed(2)}M`} trend="+12.4% MoM" href="/admin/revenue" />
        <SignalNode label="Network Pulse" value={globalUsers.toLocaleString()} trend="+5.2%" href="/admin/integrations" />
        <SignalNode 
          label="Liquidity Pipeline (1h)" 
          value={`$${(globalPredictedInflow / 1000).toFixed(1)}k`} 
          color="text-blue-400" 
          trend="Predicted Inflow"
          icon={<Zap className="w-4 h-4" />}
          href="/admin/revenue"
        />
        <SignalNode label="Strategic Win Rate" value="14.2%" color="text-emerald-400" href="/admin/sales" />
      </header>

      {/* 3. Global Viewport & Predictive Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Global Matrix Viewport */}
        <section className="lg:col-span-8 relative h-[520px] bg-[#111113] border border-white/5 overflow-hidden group shadow-2xl rounded-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
          
          <IntelligenceGlobe 
            regions={regions} 
            selectedHubId={selectedHub}
            onRegionClick={(id) => setSelectedHub(id || null)} 
          />

          <AnimatePresence>
            {selectedHub && activeHubData && (
              <motion.div 
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                className="absolute right-0 top-0 h-full w-[320px] bg-[#0A0A0B]/95 backdrop-blur-2xl border-l border-white/5 z-20 p-8 space-y-8 shadow-2xl"
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-blue-500">Jurisdictional Node</span>
                    <h3 className="text-xl font-headline font-bold italic text-white leading-none">{activeHubData.name}</h3>
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
                  <Button 
                    className="w-full h-12 bg-white text-black hover:bg-blue-500 hover:text-white transition-all text-[9px] font-bold uppercase tracking-[0.4em] rounded-none border-none"
                    onClick={() => {
                      setAdminJurisdiction(activeHubData.id as any);
                      setSelectedHub(null);
                    }}
                  >
                    ENTER HUB TERMINAL
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 4. Jurisdictional Predictive Pulse */}
        <aside className="lg:col-span-4 space-y-8">
          <Card className="bg-[#111113] border-white/5 rounded-none shadow-2xl h-full">
             <CardHeader className="border-b border-white/5 bg-white/5 p-5 flex flex-row items-center justify-between">
                <div className="flex items-center space-x-3 text-blue-400">
                   <Clock className="w-3.5 h-3.5" />
                   <CardTitle className="text-[10px] font-bold uppercase tracking-[0.3em]">1h Global Inflow Pulse</CardTitle>
                </div>
                <Zap className="w-3 h-3 text-blue-500 animate-pulse" />
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                   {Object.values(regions).map(hub => (
                     <div key={hub.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                        <div className="flex items-center space-x-4">
                           <span className="text-[9px] font-bold text-white/20 uppercase w-6">{hub.id}</span>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{hub.name}</span>
                              <span className="text-[8px] text-white/20 uppercase tracking-tighter tabular-nums">{hub.cart} ACTIVE CARTS</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className="text-xs font-bold text-blue-400 tabular-nums">${hub.predictedInflow.toLocaleString()}</span>
                           <p className="text-[7px] text-white/20 font-bold uppercase">Expected</p>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="p-4 bg-white/[0.01] border-t border-white/5">
                   <Link href="/admin/revenue" className="flex items-center justify-center space-x-2 text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-blue-400 transition-colors">
                      <span>VIEW REVENUE MATRIX</span>
                      <ArrowRight className="w-3 h-3 ml-2" />
                   </Link>
                </div>
             </CardContent>
          </Card>
        </aside>
      </div>

      {/* 5. Regional Hub Matrix (The Switcher Hub) */}
      <section className="space-y-6 pt-12 border-t border-white/5">
         <div className="flex items-center space-x-4">
            <Database className="w-5 h-5 text-white/40" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Market Terminals</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {Object.values(regions).map(hub => (
              <Card 
                key={hub.id} 
                className={cn(
                  "bg-[#111113] border-white/5 rounded-none p-6 space-y-6 hover:border-blue-500/40 transition-all group cursor-pointer",
                  adminJurisdiction === hub.id && "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                )}
                onClick={() => setAdminJurisdiction(hub.id as any)}
              >
                 <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-blue-400 transition-colors">{hub.name}</span>
                    <Globe className={cn("w-4 h-4", adminJurisdiction === hub.id ? "text-blue-500" : "text-white/10")} />
                 </div>
                 <div className="space-y-1">
                    <p className="text-2xl font-headline font-bold italic text-white">${(hub.revenue / 1000).toFixed(1)}k</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/20">Settled Revenue</p>
                 </div>
                 <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-tighter text-emerald-500">Node Active</span>
                    <ChevronRight className="w-3 h-3 text-white/10 group-hover:text-white transition-all" />
                 </div>
              </Card>
            ))}
         </div>
      </section>
    </div>
  );
}

function StatusTick({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex items-center space-x-3">
       <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">{label}:</span>
       <span className={cn("text-[9px] font-bold uppercase tracking-widest tabular-nums", color)}>{value}</span>
    </div>
  );
}

function SignalNode({ label, value, trend, color = "text-white", icon, href }: { label: string, value: string | number, trend?: string, color?: string, icon?: React.ReactNode, href?: string }) {
  const content = (
    <Card className="bg-[#111113] border-white/5 p-6 space-y-4 group hover:border-blue-500/40 transition-all rounded-none shadow-2xl relative overflow-hidden h-full">
      {icon && <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-20 transition-opacity">{icon}</div>}
      <div className="flex justify-between items-start">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">{label}</p>
        {trend && <span className="text-[8px] font-bold text-blue-400 tabular-nums uppercase">{trend}</span>}
      </div>
      <p className={cn("text-4xl font-body font-bold tracking-tighter italic tabular-nums leading-none", color)}>{value}</p>
    </Card>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return content;
}

function HubDetailRow({ label, value, color = "text-white" }: { label: string, value: string | number, color?: string }) {
  return (
    <div className="flex flex-col space-y-1">
      <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">{label}</p>
      <p className={cn("text-xl font-body font-bold italic tracking-tighter tabular-nums", color)}>{value}</p>
    </div>
  );
}
