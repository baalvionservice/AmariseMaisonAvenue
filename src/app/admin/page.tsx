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
  Database,
  Truck,
  Package,
  Activity,
  Award
} from 'lucide-react';
import { useSimulationData } from '@/hooks/use-simulation-data';
import { IntelligenceGlobe } from '@/components/admin/IntelligenceGlobe';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

/**
 * Maison Master Terminal: Level 3 Tactical Command.
 * Central node for Global Super Admin oversight.
 */
export default function AdminDashboard() {
  const { regions, globalTotal, globalPredictedInflow } = useSimulationData();
  const { scopedErrors, adminJurisdiction, setAdminJurisdiction } = useAppStore();
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  const activeHubData = useMemo(() => 
    selectedHub ? regions[selectedHub] : null, 
  [selectedHub, regions]);

  const jurisdictionLabel = adminJurisdiction === 'global' ? 'GLOBAL MASTER' : adminJurisdiction.toUpperCase() + ' NODE';

  return (
    <div className="space-y-8 animate-fade-in font-body pb-20">
      {/* 1. System Health Ticker */}
      <div className="flex bg-[#111113] border border-white/5 p-1 rounded-sm shadow-2xl relative overflow-hidden h-10">
         <div className="flex-1 overflow-hidden flex items-center">
            <div className="flex items-center space-x-12 px-6 animate-marquee whitespace-nowrap">
               <StatusTick label="GLOBAL SYNC" value="OPTIMAL" color="text-emerald-500" />
               <StatusTick label="AI ACCURACY" value="98.2%" color="text-blue-400" />
               <StatusTick label="LOGISTICS" value="ACTIVE" color="text-emerald-500" />
               <StatusTick label="ANOMALIES" value={scopedErrors.filter(e => !e.resolved).length.toString()} color="text-red-500" />
               <StatusTick label="HUB CONNECTIVITY" value="STABLE" color="text-emerald-500" />
            </div>
         </div>
         <div className="relative z-10 bg-[#111113] px-6 py-2 border-l border-white/10 flex items-center space-x-3 shadow-[-15px_0_20px_rgba(17,17,19,1)]">
            <Server className="w-3 h-3 text-white/40" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 tabular">NODE: {jurisdictionLabel}</span>
         </div>
      </div>

      {/* 2. Primary Yield HUD */}
      <header className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SignalNode label="Aggregate Yield" value={`$${(globalTotal / 1000000).toFixed(2)}M`} trend="+12.4% MoM" href="/admin/revenue" />
        <SignalNode label="Active Dispatch" value="24 Pieces" trend="In Transit" icon={<Truck className="w-4 h-4" />} href="/admin/logistics" />
        <SignalNode 
          label="Liquidity Pipeline (1h)" 
          value={`$${(globalPredictedInflow / 1000).toFixed(1)}k`} 
          color="text-blue-400" 
          trend="Neural Prediction"
          icon={<Zap className="w-4 h-4" />}
          href="/admin/revenue"
        />
        <SignalNode label="Trust Index" value="99.9%" color="text-emerald-400" icon={<ShieldCheck className="w-4 h-4" />} href="/admin/compliance" />
      </header>

      {/* 3. Global Viewport & Predictive Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                  <HubDetailRow label="Active Carts" value={activeHubData.cart} color="text-blue-400" />
                  <HubDetailRow label="In Transit" value={Math.floor(activeHubData.purchased * 0.2)} />
                  <HubDetailRow label="Lead Velocity" value="High" color="text-gold" />
                </div>

                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="p-4 bg-white/5 border border-white/10 space-y-2">
                     <p className="text-[10px] text-white/60 italic leading-relaxed">
                       "Strategic resonance high in {activeHubData.id.toUpperCase()}. Directing curatorial focus to high-jewelry segment."
                     </p>
                     <span className="text-[7px] font-bold uppercase text-blue-400">AI STRATEGY AGENT</span>
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

        <aside className="lg:col-span-4 space-y-8">
          <Card className="bg-[#111113] border-white/5 rounded-none shadow-2xl h-full">
             <CardHeader className="border-b border-white/5 bg-white/5 p-5 flex flex-row items-center justify-between">
                <div className="flex items-center space-x-3 text-blue-400">
                   <Clock className="w-3.5 h-3.5" />
                   <CardTitle className="text-[10px] font-bold uppercase tracking-[0.3em]">Institutional Pulse</CardTitle>
                </div>
                <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                   <RecentActivityItem icon={<Award className="text-gold" />} title="Certificate Issued" desc="Birkin 25 #MA-1924-X" hub="UK" />
                   <RecentActivityItem icon={<Truck className="text-blue-400" />} title="Institutional Dispatch" desc="Order #AM-2004" hub="US" />
                   <RecentActivityItem icon={<ShieldCheck className="text-emerald-400" />} title="Compliance Verified" desc="KYC Level 3 (J.V.)" hub="AE" />
                   <RecentActivityItem icon={<Package className="text-plum" />} title="New Artifact Listed" desc="Kelly 28 Sellier" hub="IN" />
                </div>
                <div className="p-4 bg-white/[0.01] border-t border-white/5">
                   <Link href="/admin/compliance" className="flex items-center justify-center space-x-2 text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-blue-400 transition-colors">
                      <span>VIEW FULL AUDIT LOG</span>
                      <ArrowRight className="w-3 h-3 ml-2" />
                   </Link>
                </div>
             </CardContent>
          </Card>
        </aside>
      </div>

      {/* 5. Terminal Matrix */}
      <section className="space-y-6 pt-12 border-t border-white/5">
         <div className="flex items-center space-x-4">
            <Database className="w-5 h-5 text-white/40" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Tactical Node Matrix</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <NodeCard title="Atelier CMS" desc="Registry management." href="/admin/content" />
            <NodeCard title="Treasury" desc="Global settlement." href="/admin/finance" />
            <NodeCard title="Logistics" desc="White-glove dispatch." href="/admin/logistics" />
            <NodeCard title="Sales CRM" desc="Curatorial dialogue." href="/admin/sales" />
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

function RecentActivityItem({ icon, title, desc, hub }: { icon: any, title: string, desc: string, hub: string }) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-white/5 rounded-none border border-white/10">{icon}</div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{title}</span>
          <span className="text-[8px] text-white/20 uppercase tracking-tighter">{desc}</span>
        </div>
      </div>
      <Badge variant="outline" className="text-[7px] border-white/5 text-white/20">{hub}</Badge>
    </div>
  );
}

function NodeCard({ title, desc, href }: { title: string, desc: string, href: string }) {
  return (
    <Link href={href}>
      <Card className="bg-[#111113] border-white/5 rounded-none p-6 space-y-2 hover:border-plum transition-all group">
        <h4 className="text-sm font-bold uppercase tracking-widest text-white group-hover:text-plum transition-colors">{title}</h4>
        <p className="text-[10px] text-white/20 italic">{desc}</p>
      </Card>
    </Link>
  );
}
