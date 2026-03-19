
'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ShieldCheck, 
  Globe, 
  Activity, 
  RefreshCcw, 
  X, 
  ShoppingCart, 
  Heart, 
  Target, 
  Sparkles,
  ChevronRight,
  Wallet,
  ArrowUpCircle,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useSimulationData } from '@/hooks/use-simulation-data';
import { IntelligenceGlobe } from '@/components/admin/IntelligenceGlobe';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Minimal Command Center: Decision-Signal Architecture
 * Focuses on Revenue, Intent, and Conversion across 5 global hubs.
 */
export default function AdminDashboard() {
  const { regions, globalTotal, globalUsers, totalOrders, conversionRate } = useSimulationData();
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  const selectedRegion = useMemo(() => 
    selectedRegionId ? regions[selectedRegionId] : null, 
    [selectedRegionId, regions]
  );

  // --- Hub Intelligence Strategy ---
  const hubIntelligence = useMemo(() => {
    return Object.values(regions).map(region => {
      const highIntent = region.cart + region.checkout;
      const avgValue = 25000; 
      const probability = (region.purchased / (region.viewing || 1)) * 100;
      const predictedRev = (region.checkout * avgValue) + (region.cart * avgValue * 0.35);
      
      let aiInsight = "Market stability maintained.";
      let status = "Optimal";
      if (region.cart > 40 && region.purchased < 5) {
        aiInsight = "Friction detected — Optimize pricing.";
        status = "Friction";
      } else if (region.checkout > 15) {
        aiInsight = "High conversion window — Push offers.";
        status = "Momentum";
      } else if (region.wishlist > 80) {
        aiInsight = "Archive interest high — Retarget.";
        status = "Strategic";
      }

      return {
        ...region,
        highIntent,
        predictedRev,
        probability,
        aiInsight,
        status
      };
    });
  }, [regions]);

  const globalForecast = useMemo(() => {
    return hubIntelligence.reduce((acc, curr) => acc + curr.predictedRev, 0);
  }, [hubIntelligence]);

  const totalHighIntent = useMemo(() => {
    return hubIntelligence.reduce((acc, curr) => acc + curr.highIntent, 0);
  }, [hubIntelligence]);

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Institutional Top Bar: Global Prediction signals */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-1">
          <nav className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 flex items-center space-x-2 mb-2">
            <span>Maison Core</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-600">Decision Terminal</span>
          </nav>
          <h1 className="text-4xl font-headline font-bold text-slate-900 tracking-tight">Institutional Matrix</h1>
          <p className="text-sm text-slate-500 font-light italic">Real-time jurisdictional yield and connoisseur intent signals.</p>
        </div>
        
        <div className="flex items-center space-x-12">
          <GlobalSignal label="Forecast (1h)" value={`$${(globalForecast / 1000).toFixed(1)}k`} color="text-emerald-600" />
          <GlobalSignal label="Global Intent" value={totalHighIntent.toString()} color="text-blue-600" />
          <GlobalSignal label="Yield Index" value={`${conversionRate}%`} color="text-slate-900" />
          <Button variant="outline" size="sm" className="h-10 border-slate-200 text-[10px] font-bold uppercase tracking-widest px-6 rounded-none">
            <RefreshCcw className="w-3.5 h-3.5 mr-2" /> Sync Node
          </Button>
        </div>
      </header>

      {/* 3D Global Visualization - Sleek & integrated */}
      <section className="relative h-[450px] w-full bg-[#0A1A2F] rounded-sm overflow-hidden shadow-2xl border border-white/5 group">
        <IntelligenceGlobe 
          regions={regions} 
          onRegionClick={(id) => setSelectedRegionId(id)} 
        />
        
        <div className="absolute top-8 left-8 flex items-center space-x-3 bg-black/40 luxury-blur px-4 py-2 border border-white/10 text-white rounded-none">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Global Network Active</span>
        </div>

        <AnimatePresence>
          {selectedRegion && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-8 top-8 w-72 bg-slate-900/90 luxury-blur border border-white/10 p-6 text-white space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-headline text-xl italic">{selectedRegion.name}</h3>
                <button onClick={() => setSelectedRegionId(null)}><X className="w-4 h-4 opacity-40 hover:opacity-100" /></button>
              </div>
              <div className="space-y-4">
                <MetricLine label="Active" value={selectedRegion.activeUsers} />
                <MetricLine label="Wishlist" value={selectedRegion.wishlist} />
                <MetricLine label="Cart" value={selectedRegion.cart} />
                <MetricLine label="Yield" value={`$${(selectedRegion.revenue / 1000).toFixed(1)}k`} highlight />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Decision Matrix: Minimal Signal Cards */}
      <div className="space-y-8">
        <div className="flex items-center space-x-3 text-slate-400">
          <Activity className="w-4 h-4" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em]">Market Hub Decision Matrix</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {hubIntelligence.map(hub => (
            <SignalCard key={hub.id} hub={hub} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GlobalSignal({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex flex-col items-end text-right space-y-1">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <span className={cn("text-2xl font-headline font-bold italic tracking-tighter", color)}>{value}</span>
    </div>
  );
}

function SignalCard({ hub }: { hub: any }) {
  return (
    <Card className="bg-white border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden rounded-none border-t-2 border-t-transparent hover:border-t-blue-600 flex flex-col h-full group">
      <CardHeader className="p-6 pb-4 flex flex-row justify-between items-center bg-slate-50/30">
        <div className="space-y-0.5">
          <h3 className="font-headline text-lg font-bold italic text-slate-900 leading-none">{hub.name}</h3>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">{hub.id}</p>
        </div>
        <Badge variant="outline" className={cn(
          "text-[7px] uppercase tracking-tighter border-none px-2 py-0.5",
          hub.status === 'Momentum' ? "bg-emerald-50 text-emerald-600" :
          hub.status === 'Friction' ? "bg-red-50 text-red-600" :
          "bg-blue-50 text-blue-600"
        )}>
          {hub.status}
        </Badge>
      </CardHeader>
      
      <CardContent className="p-6 space-y-8 flex-1">
        {/* Signal 1: Revenue Velocity */}
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Predicted Yield (1h)</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              ${(hub.predictedRev / 1000).toFixed(1)}k
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-y-[-2px] transition-transform" />
          </div>
        </div>

        {/* Signal 2: Intent Pressure */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">High Intent</p>
            <p className="text-xl font-bold text-slate-900">{hub.highIntent}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Cart Vol</p>
            <p className="text-xl font-bold text-slate-900">{hub.cart}</p>
          </div>
        </div>

        {/* Signal 3: Conversion resonance */}
        <div className="space-y-2 pt-4 border-t border-slate-50">
          <div className="flex justify-between items-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Yield Index</p>
            <span className="text-xs font-bold text-blue-600">{hub.probability.toFixed(1)}%</span>
          </div>
          <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${hub.probability * 5}%` }} // Adjusted scale for visualization
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </CardContent>

      {/* AI Decision Signal Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-600 font-light italic leading-relaxed">
            {hub.aiInsight}
          </p>
        </div>
      </div>
    </Card>
  );
}

function MetricLine({ label, value, highlight }: { label: string, value: any, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
      <span className="opacity-40">{label}</span>
      <span className={cn("font-bold", highlight ? "text-blue-400" : "text-white")}>{value}</span>
    </div>
  );
}

function KPICard({ label, value, trend, trendUp, icon, subtext }: { label: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode, subtext: string }) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors group-hover:scale-110 duration-500">
            {icon}
          </div>
          <div className="flex flex-col items-end">
            <Badge variant="outline" className={cn(
              "text-[9px] uppercase tracking-widest border-transparent font-bold px-2 py-0.5",
              trendUp ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
            )}>
              {trendUp ? <ArrowUpCircle className="w-2.5 h-2.5 mr-1" /> : <AlertTriangle className="w-2.5 h-2.5 mr-1" />}
              {trend}
            </Badge>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{subtext}</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <motion.h3 
            key={value}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-slate-900 tracking-tight"
          >
            {value}
          </motion.h3>
        </div>
      </CardContent>
    </Card>
  );
}
