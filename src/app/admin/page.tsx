
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ArrowUpRight, 
  ArrowRight,
  Clock,
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowDownRight, 
  Activity, 
  Cpu, 
  RefreshCcw, 
  X, 
  ShoppingCart, 
  Heart, 
  Eye, 
  Target, 
  BarChart3, 
  AlertTriangle,
  BrainCircuit,
  Sparkles,
  ChevronRight,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useSimulationData, RegionData } from '@/hooks/use-simulation-data';
import { IntelligenceGlobe } from '@/components/admin/IntelligenceGlobe';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const { products, privateInquiries, scopedErrors, scopedProducts } = useAppStore();
  const { regions, globalTotal, globalUsers, totalOrders, globalCart, globalWishlist, conversionRate } = useSimulationData();
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [insights, setInsights] = useState<string[]>([]);

  const selectedRegion = useMemo(() => 
    selectedRegionId ? regions[selectedRegionId] : null, 
    [selectedRegionId, regions]
  );

  // --- Prediction & Insight Engine ---
  const predictions = useMemo(() => {
    return Object.values(regions).map(region => {
      const highIntent = region.cart + region.checkout;
      const avgValue = 25000; // Maison Avg Artifact Value
      const probability = (region.purchased / (region.viewing || 1)) * 100;
      
      // Predicted Revenue = (Checkout * Value) + (Cart * Value * Probability Factor)
      const predictedRev = (region.checkout * avgValue) + (region.cart * avgValue * 0.35);
      
      let aiInsight = "Market stability maintained. Monitor resonance.";
      if (region.cart > 40 && region.purchased < 5) aiInsight = "Checkout friction detected — optimize pricing.";
      else if (region.checkout > 15) aiInsight = "High conversion window — push private offers now.";
      else if (region.wishlist > 80) aiInsight = "Strong archive interest — retarget collectors.";
      else if (region.revenue > 1200000) aiInsight = "Momentum detected — scale jurisdictional traffic.";

      return {
        ...region,
        highIntent,
        predictedRev,
        probability,
        aiInsight
      };
    });
  }, [regions]);

  const globalForecast = useMemo(() => {
    return predictions.reduce((acc, curr) => acc + curr.predictedRev, 0);
  }, [predictions]);

  useEffect(() => {
    const generateInsights = () => {
      const newInsights: string[] = [];
      const regionalVals = Object.values(regions);
      
      const highCart = regionalVals.find(r => r.cart > 40);
      if (highCart) newInsights.push(`High cart activity detected in ${highCart.name}. Recommend T1 outreach.`);
      
      const lowConv = regionalVals.find(r => (r.purchased / r.viewing) < 0.05);
      if (lowConv) newInsights.push(`Conversion drift in ${lowConv.name} hub. Check local price logic.`);
      
      const revenueSpike = regionalVals.find(r => r.revenue > 1500000);
      if (revenueSpike) newInsights.push(`Institutional goal exceeded in ${revenueSpike.name}.`);

      setInsights(newInsights.slice(0, 3));
    };

    generateInsights();
  }, [regions]);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <nav className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center space-x-2 mb-2">
            <span>Maison OS</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600">Command Center</span>
          </nav>
          <h1 className="text-3xl font-headline font-bold text-slate-900">Institutional Dashboard</h1>
          <p className="text-sm text-slate-500 max-w-2xl">Real-time global yield monitoring and curatorial oversight.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end mr-6 text-right">
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aggregate Forecast (1h)</span>
             <span className="text-xl font-headline font-bold text-emerald-600 italic tracking-tighter">+${(globalForecast / 1000).toFixed(1)}k</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-[10px] h-11 px-6 rounded-md shadow-lg shadow-blue-600/20">
            <RefreshCcw className="w-4 h-4 mr-2" /> Sync Registry
          </Button>
        </div>
      </header>

      {/* Global Intelligence Globe */}
      <section className="relative h-[550px] w-full bg-[#0A1A2F] rounded-xl overflow-hidden shadow-2xl border border-white/5">
        <IntelligenceGlobe 
          regions={regions} 
          onRegionClick={(id) => setSelectedRegionId(id)} 
        />

        {/* Global HUD Overlay */}
        <div className="absolute top-8 left-8 z-10 flex flex-col space-y-4">
          <div className="flex items-center space-x-3 bg-white/5 luxury-blur px-4 py-2 border border-white/10 rounded-md">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Global Status: Optimal</span>
          </div>
          <div className="p-4 bg-black/40 luxury-blur border border-white/5 rounded-md space-y-1">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Active Connoisseurs</p>
            <p className="text-2xl font-headline font-bold text-white italic">{globalUsers.toLocaleString()}</p>
          </div>
        </div>

        {/* Region Detail Panel */}
        <AnimatePresence>
          {selectedRegion && (
            <motion.div 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="absolute right-0 top-0 h-full w-80 bg-slate-900/95 luxury-blur border-l border-white/10 z-30 p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-headline font-bold text-white italic tracking-tight">{selectedRegion.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Institutional Node: {selectedRegion.id.toUpperCase()}</p>
                </div>
                <button onClick={() => setSelectedRegionId(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                <MetricBlock label="Hub Yield" value={`$${selectedRegion.revenue.toLocaleString()}`} />
                
                <div className="space-y-4 pt-4 border-t border-white/5">
                   <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Acquisition Funnel</p>
                   <FunnelRow icon={<Eye className="w-3 h-3" />} label="Viewing" value={selectedRegion.viewing} color="text-slate-400" />
                   <FunnelRow icon={<Heart className="w-3 h-3" />} label="Wishlist" value={selectedRegion.wishlist} color="text-blue-400" />
                   <FunnelRow icon={<ShoppingCart className="w-3 h-3" />} label="Cart" value={selectedRegion.cart} color="text-amber-400" />
                   <FunnelRow icon={<ShieldCheck className="w-3 h-3" />} label="Checkout" value={selectedRegion.checkout} color="text-purple-400" />
                   <FunnelRow icon={<Target className="w-3 h-3" />} label="Purchased" value={selectedRegion.purchased} color="text-emerald-400" />
                </div>

                <div className="pt-4 border-t border-white/5">
                   <MetricBlock label="Local Conversion" value={`${((selectedRegion.purchased / (selectedRegion.viewing || 1)) * 100).toFixed(2)}%`} positive />
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-[9px] h-12 rounded-none">
                  VIEW HUB ANALYTICS
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-8 left-8 z-10 flex flex-col items-start space-y-4">
           {insights.map((insight, idx) => (
             <div key={idx} className="flex items-center space-x-3 bg-plum/20 luxury-blur px-4 py-3 border border-plum/30 rounded-sm animate-fade-in">
                <Zap className="w-3.5 h-3.5 text-plum" />
                <p className="text-[10px] font-bold text-white/90 uppercase tracking-tight italic">{insight}</p>
             </div>
           ))}
        </div>

        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[9px] font-bold uppercase text-white/60 tracking-widest">Simulation Frequency: 2Hz</span>
          </div>
          <div className="text-[18px] font-headline font-bold text-white italic tracking-tighter">Yield Synchronisation: ACTIVE</div>
        </div>
      </section>

      {/* Strategic KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="Global Yield (Est)" 
          value={`$${globalTotal.toLocaleString()}`} 
          trend="+14.2%" 
          trendUp={true} 
          icon={<TrendingUp className="text-blue-600" />} 
          subtext="vs last sync"
        />
        <KPICard 
          label="Conversion Index" 
          value={`${conversionRate}%`} 
          trend="Steady" 
          trendUp={true} 
          icon={<Target className="text-teal-500" />} 
          subtext="High Intent"
        />
        <KPICard 
          label="Global Cart Volume" 
          value={globalCart.toString()} 
          trend={`+${Math.floor(globalCart * 0.1)}`} 
          trendUp={true} 
          icon={<ShoppingCart className="text-amber-500" />} 
          subtext="Unclosed Yield"
        />
        <KPICard 
          label="Acquisition Success" 
          value={totalOrders.toString()} 
          trend="High" 
          trendUp={true} 
          icon={<ShieldCheck className="text-emerald-500" />} 
          subtext="Fulfillment Stream"
        />
      </div>

      {/* Market Intelligence Matrix (NEW) */}
      <section className="space-y-8">
        <div className="flex items-center space-x-4">
           <div className="p-3 bg-plum/10 rounded-full text-plum"><BrainCircuit className="w-6 h-6" /></div>
           <div>
              <h2 className="text-2xl font-headline font-bold italic text-gray-900 uppercase tracking-tight">Market Intelligence Matrix</h2>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Jurisdictional Acquisition Forecasts</p>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
           {predictions.map(pred => (
             <PredictionCard key={pred.id} data={pred} />
           ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
        {/* Action Matrix */}
        <Card className="lg:col-span-12 bg-white border-slate-200 shadow-sm luxury-card-lift flex flex-col">
          <CardHeader className="border-b border-slate-100 p-8 bg-slate-50/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-900 rounded text-white"><ShieldCheck size={16} /></div>
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900 uppercase tracking-tight">Institutional Task Registry</CardTitle>
                  <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Priority Curatorial Matrix</CardDescription>
                </div>
              </div>
              <Badge className="bg-blue-600 text-white text-[10px] px-4 py-1.5 rounded-none font-bold uppercase tracking-widest">
                {Math.floor(totalOrders / 10)} Tasks Pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-slate-100">
              <ActionBlock 
                priority="CRITICAL"
                count={scopedErrors.filter(e => !e.resolved).length}
                title="System Anomalies" 
                desc="Jurisdictional sync drift detected." 
                color="bg-red-500"
              />
              <ActionBlock 
                priority="STRATEGIC"
                count={privateInquiries.filter(i => i.leadTier === 1).length}
                title="Tier 1 Responding" 
                desc="High-intent connoisseur dialogue." 
                color="bg-blue-500"
              />
              <ActionBlock 
                priority="NOMINAL"
                count={scopedProducts.filter(p => p.status === 'review').length}
                title="SEO Audits" 
                desc="Metadata generation cycles queued." 
                color="bg-slate-400"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PredictionCard({ data }: { data: any }) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden hover:border-plum transition-all duration-500 group">
       <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
             <div className="space-y-1">
                <h4 className="text-lg font-headline font-bold italic text-gray-900">{data.name}</h4>
                <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Hub ID: {data.id.toUpperCase()}</p>
             </div>
             <Sparkles className="w-4 h-4 text-plum/40 group-hover:text-plum transition-colors" />
          </div>

          <div className="space-y-4">
             <div className="space-y-1">
                <p className="text-[9px] font-bold uppercase text-slate-400">Forecast (1h)</p>
                <p className="text-2xl font-headline font-bold text-emerald-600 italic tracking-tighter">${data.predictedRev.toLocaleString()}</p>
             </div>

             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div className="space-y-1">
                   <p className="text-[8px] font-bold uppercase text-slate-400">Intent Users</p>
                   <p className="text-sm font-bold text-orange-500">{data.highIntent}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[8px] font-bold uppercase text-slate-400">Probability</p>
                   <p className="text-sm font-bold text-blue-500">{data.probability.toFixed(1)}%</p>
                </div>
             </div>
          </div>

          <div className="pt-4 border-t border-slate-50">
             <p className="text-[10px] text-gray-500 font-light italic leading-relaxed h-10 overflow-hidden line-clamp-2">
               "{data.aiInsight}"
             </p>
          </div>
       </div>
       <div className="h-1 w-full bg-slate-50 relative overflow-hidden">
          <motion.div 
            className="h-full bg-plum absolute left-0" 
            initial={{ width: 0 }}
            animate={{ width: `${data.probability}%` }}
            transition={{ duration: 1 }}
          />
       </div>
    </Card>
  );
}

function MetricBlock({ label, value, positive }: { label: string, value: string, positive?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
      <p className={cn(
        "text-xl font-headline font-bold italic",
        positive ? "text-emerald-400" : "text-white"
      )}>{value}</p>
    </div>
  );
}

function FunnelRow({ icon, label, value, color }: { icon: any, label: string, value: number, color: string }) {
  return (
    <div className="flex items-center justify-between group">
       <div className="flex items-center space-x-3">
          <div className={cn("p-1.5 rounded-sm bg-white/5", color)}>{icon}</div>
          <span className="text-[10px] font-bold uppercase tracking-tight text-white/60">{label}</span>
       </div>
       <span className="text-xs font-bold text-white">{value.toLocaleString()}</span>
    </div>
  );
}

function ActionBlock({ priority, count, title, desc, color }: { priority: string, count: number, title: string, desc: string, color: string }) {
  return (
    <div className="p-8 group hover:bg-slate-50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <span className={cn("text-[8px] font-bold text-white px-2 py-0.5 rounded uppercase tracking-tighter", color)}>{priority}</span>
        <span className="text-2xl font-headline font-bold italic text-slate-900">{count}</span>
      </div>
      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-1">{title}</h4>
      <p className="text-xs text-slate-500 font-light italic">{desc}</p>
      <div className="pt-6">
        <button className="flex items-center text-[9px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">
          Resolve Actions <ArrowRight className="w-3 h-3 ml-2" />
        </button>
      </div>
    </div>
  );
}

function KPICard({ label, value, trend, trendUp, icon, subtext }: { label: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode, subtext: string }) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden luxury-card-lift">
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
              {trendUp ? <ArrowUpRight className="w-2.5 h-2.5 mr-1" /> : <ArrowDownRight className="w-2.5 h-2.5 mr-1" />}
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
