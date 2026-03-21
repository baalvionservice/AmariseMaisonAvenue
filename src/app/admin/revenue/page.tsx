'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  PieChart, 
  Globe, 
  Zap, 
  ChevronRight, 
  LogOut,
  LayoutDashboard,
  Target,
  RefreshCcw,
  BarChart3,
  Search,
  Eye,
  MessageSquare,
  Filter,
  Crown,
  Clock,
  Send,
  MoreVertical,
  LineChart,
  AlertTriangle,
  ArrowDownRight,
  TrendingDown,
  BrainCircuit,
  Scale,
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from '@/lib/store';
import { useSimulationData } from '@/hooks/use-simulation-data';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";
import { getAnalytics } from '@/lib/analytics/mock-data';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  CartesianGrid,
  Area,
  AreaChart
} from 'recharts';

/**
 * Bank-Grade Revenue Matrix: Tactical Yield oversight.
 * Enhanced with 1-Hour Predictive Horizon.
 */
export default function RevenueDashboard() {
  const { scopedInquiries, currentUser, transactions, countryConfigs } = useAppStore();
  const { regions, globalPredictedInflow } = useSimulationData();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const stats = useMemo(() => {
    if (!currentUser) return null;
    return getAnalytics(currentUser.role, currentUser.country);
  }, [currentUser]);

  const revenueByHub = useMemo(() => {
    return countryConfigs.map(c => {
      const hubTransactions = transactions.filter(t => t.country.toLowerCase() === c.code.toLowerCase() && t.status === 'Settled');
      return {
        country: c.name,
        value: hubTransactions.reduce((acc, t) => acc + t.amount, 0),
        code: c.code
      };
    });
  }, [transactions, countryConfigs]);

  const totalSettledRevenue = useMemo(() => 
    revenueByHub.reduce((a, b) => a + b.value, 0),
  [revenueByHub]);

  const funnelData = {
    visitors: 425000,
    leads: scopedInquiries.length * 100, 
    buyers: transactions.filter(t => t.status === 'Settled').length * 50 
  };

  const revenueTrends = [
    { date: '01 Mar', revenue: 42000, forecast: 40000 },
    { date: '05 Mar', revenue: 38000, forecast: 41000 },
    { date: '10 Mar', revenue: 52000, forecast: 45000 },
    { date: '15 Mar', revenue: 48000, forecast: 50000 },
    { date: '20 Mar', revenue: 61000, forecast: 55000 },
    { date: '25 Mar', revenue: 59000, forecast: 62000 },
    { date: '30 Mar', revenue: 74000, forecast: 70000 },
  ];

  if (!stats) return null;

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <header className="flex justify-between items-end border-b border-white/5 pb-10">
        <div className="space-y-2">
          <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 flex items-center space-x-2">
             <Link href="/admin" className="hover:text-white transition-colors">Terminal</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-white">Yield Matrix</span>
          </nav>
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-white uppercase">Revenue Matrix</h1>
          <p className="text-sm text-white/40 font-light italic">Jurisdictional Unit Economics & Predictive Yield</p>
        </div>
        <div className="flex items-center space-x-6">
             <div className="flex bg-[#111113] border border-white/10 p-1">
                {(['daily', 'weekly', 'monthly'] as const).map(range => (
                  <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={cn(
                      "px-5 py-2 text-[9px] font-bold uppercase tracking-widest transition-all",
                      timeRange === range ? "bg-plum text-white" : "text-white/20 hover:text-plum"
                    )}
                  >
                    {range}
                  </button>
                ))}
             </div>
            <div className="w-10 h-10 bg-plum rounded-none flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-xl">RM</div>
          </div>
      </header>

      {/* Primary Metrics: Tactical Density */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard icon={<DollarSign />} label="Net Settled Yield" value={`$${(totalSettledRevenue / 1000).toFixed(1)}k`} trend="+14.2% MoM" positive />
        <StatCard icon={<Zap />} label="1h Incoming Yield" value={`$${(globalPredictedInflow / 1000).toFixed(1)}k`} trend="Predicted Inflow" color="text-blue-400" positive />
        <StatCard icon={<Scale />} label="Tax Compliance" value="Verified" trend="Audited" positive />
        <StatCard icon={<TrendingUp />} label="Mean Acquisition" value="$42.5k" trend="+8.4%" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Yield Chart: Sharp Line Aesthetics */}
        <div className="lg:col-span-8 space-y-10">
           <Card className="bg-[#111113] border-white/5 rounded-none overflow-hidden">
             <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between p-8 bg-white/[0.02]">
               <div className="space-y-1">
                 <div className="flex items-center space-x-3 text-blue-400">
                   <BrainCircuit className="w-5 h-5" />
                   <CardTitle className="font-headline text-2xl uppercase italic">Yield Trajectory</CardTitle>
                 </div>
                 <p className="text-[10px] uppercase tracking-widest text-white/20">Actual revenue vs AI forecasted yield</p>
               </div>
               <div className="flex items-center space-x-6">
                  <LegendNode color="bg-plum" label="ACTUAL" />
                  <LegendNode color="bg-blue-500" label="FORECAST" />
               </div>
             </CardHeader>
             <CardContent className="p-10">
               <div className="h-[380px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={revenueTrends}>
                     <defs>
                       <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#7E3F98" stopOpacity={0.15}/>
                         <stop offset="95%" stopColor="#7E3F98" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                     <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#666', fontWeight: 700}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#666'}} tickFormatter={(val) => `$${val/1000}k`} />
                     <Tooltip 
                       content={({ active, payload }) => {
                         if (active && payload && payload.length) {
                           return (
                             <div className="bg-black text-white p-5 border border-white/10 shadow-2xl space-y-3 rounded-none">
                               <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/40 border-b border-white/5 pb-2">{payload[0].payload.date}</p>
                               <div className="space-y-1.5">
                                  <p className="text-xs font-bold text-plum tabular">Settled: ${(payload[0].value as number).toLocaleString()}</p>
                                  <p className="text-xs font-bold text-blue-400 tabular">Target: ${(payload[1].value as number).toLocaleString()}</p>
                               </div>
                             </div>
                           );
                         }
                         return null;
                       }}
                     />
                     <Area type="monotone" dataKey="revenue" stroke="#7E3F98" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                     <Line type="monotone" dataKey="forecast" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
             </CardContent>
           </Card>

           {/* New: 1-Hour Predictive Horizon Node */}
           <Card className="bg-[#111113] border-white/5 rounded-none overflow-hidden">
              <CardHeader className="border-b border-white/5 p-8 bg-white/[0.02] flex flex-row items-center justify-between">
                 <div className="space-y-1">
                    <div className="flex items-center space-x-3 text-blue-400">
                       <Clock className="w-5 h-5" />
                       <CardTitle className="font-headline text-xl uppercase italic tracking-tight">1-Hour Forecast Horizon</CardTitle>
                    </div>
                    <p className="text-[9px] uppercase tracking-widest text-white/20">Incoming liquidity based on active cart resonance</p>
                 </div>
                 <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-none px-4 h-8 rounded-none text-[8px] font-bold uppercase tracking-widest">
                    Neural Flow Active
                 </Badge>
              </CardHeader>
              <CardContent className="p-0">
                 <Table>
                    <TableHeader className="bg-white/[0.01]">
                       <TableRow className="border-white/5">
                          <TableHead className="text-[9px] uppercase font-bold pl-8 text-white/40">Market Hub</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-white/40">Active Carts</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-white/40">Conversion Prob.</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-right pr-8 text-white/40">Expected Inflow</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {Object.values(regions).map(hub => (
                         <TableRow key={hub.id} className="hover:bg-white/5 transition-colors border-white/5">
                            <TableCell className="pl-8 font-bold text-xs text-white/80 uppercase tracking-widest">{hub.name}</TableCell>
                            <TableCell className="text-sm font-body font-bold text-white/60 tabular">{hub.cart}</TableCell>
                            <TableCell>
                               <div className="flex items-center space-x-3">
                                  <Progress value={((hub.purchased / (hub.activeUsers || 1)) * 100) * 2} className="h-0.5 w-16 bg-white/5" />
                                  <span className="text-[9px] font-bold text-blue-400 tabular">{((hub.purchased / (hub.activeUsers || 1)) * 100).toFixed(1)}%</span>
                               </div>
                            </TableCell>
                            <TableCell className="text-right pr-8">
                               <span className="text-sm font-bold text-blue-400 tabular">${hub.predictedInflow.toLocaleString()}</span>
                            </TableCell>
                         </TableRow>
                       ))}
                    </TableBody>
                 </Table>
              </CardContent>
           </Card>
        </div>

        {/* Tactical Conversion Pipeline */}
        <aside className="lg:col-span-4 space-y-10">
          <Card className="bg-[#111113] border-white/5 rounded-none shadow-2xl">
            <CardHeader className="border-b border-white/5 p-6 bg-white/[0.02]">
              <CardTitle className="font-headline text-xl text-white">Acquisition Funnel</CardTitle>
              <p className="text-[9px] uppercase tracking-widest text-white/20">Institutional Conversion Index</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
              <FunnelStep label="Global Visitors" value={funnelData.visitors} color="bg-white/5" />
              <FunnelStep label="Verified Leads" value={funnelData.leads} color="bg-blue-500/10" percent={(funnelData.leads / funnelData.visitors * 100).toFixed(1) + '%'} />
              <FunnelStep label="Successful Buyers" value={funnelData.buyers} color="bg-plum/20" percent={(funnelData.buyers / funnelData.leads * 100).toFixed(1) + '%'} />
              
              <div className="pt-8 border-t border-white/5 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Pipeline Velocity</span>
                    <span className="text-sm font-bold text-blue-400 tabular">{(funnelData.buyers / funnelData.visitors * 100).toFixed(2)}%</span>
                 </div>
                 <Progress value={(funnelData.buyers / funnelData.visitors * 100) * 10} className="h-0.5 bg-white/5" />
              </div>
            </CardContent>
          </Card>

          {/* Strategic Alert: Yield Volatility */}
          <div className="bg-blue-500/5 border border-blue-500/20 p-8 space-y-4 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                <Sparkles className="w-20 h-20 text-blue-400" />
             </div>
             <div className="flex items-center space-x-3 text-blue-400">
                <ShieldCheck className="w-4 h-4" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest">Inflow Prediction</h4>
             </div>
             <p className="text-xs text-white/60 font-light italic leading-relaxed relative z-10">
               "Significant cart activity detected in UAE Hub. Predictive inflow suggests a potential $85k yield surge in the next 60-minute window."
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function LegendNode({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center space-x-2">
       <div className={cn("w-2 h-2 rounded-full", color)} />
       <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">{label}</span>
    </div>
  );
}

function FunnelStep({ label, value, color, percent }: { label: string, value: number, color: string, percent?: string }) {
  return (
    <div className="space-y-3 group">
      <div className="flex justify-between items-end">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">{label}</span>
        <div className="text-right">
           <span className="text-lg font-body font-bold tabular text-white">{value.toLocaleString()}</span>
           {percent && <span className="text-[8px] font-bold text-blue-400 block leading-none tabular tracking-tighter">{percent} yield</span>}
        </div>
      </div>
      <div className={cn("h-8 w-full border border-white/5 transition-all group-hover:scale-[1.02]", color)} />
    </div>
  );
}

function StatCard({ icon, label, value, trend, positive, color = "text-white" }: { icon: any, label: string, value: string, trend: string, positive: boolean, color?: string }) {
  return (
    <Card className="bg-[#111113] border-white/5 p-8 space-y-6 group hover:border-blue-500/40 transition-all rounded-none shadow-2xl">
      <div className="flex justify-between items-start">
        <div className="p-4 bg-white/5 rounded-none group-hover:bg-blue-500/10 transition-colors text-blue-400 border border-white/5">{icon}</div>
        <div className={cn(
          "flex items-center text-[10px] font-bold tracking-widest uppercase",
          positive ? "text-emerald-400" : "text-red-500"
        )}>
          {trend} {positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
        </div>
      </div>
      <div>
        <div className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-white/40 transition-colors">{label}</div>
        <div className={cn("text-4xl font-body font-bold tabular mt-2 group-hover:text-white", color)}>{value}</div>
      </div>
    </Card>
  );
}