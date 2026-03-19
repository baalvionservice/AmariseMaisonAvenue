
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
  TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from '@/lib/store';
import { MOCK_REVENUE_METRICS } from '@/lib/mock-monetization';
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
import { guardPage } from '@/lib/access/routeGuard';
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

export default function RevenueDashboard() {
  const { scopedInquiries, currentUser, transactions, countryConfigs } = useAppStore();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  // Institution Analytics Access
  const stats = useMemo(() => {
    if (!currentUser) return null;
    return getAnalytics(currentUser.role, currentUser.country);
  }, [currentUser]);

  useEffect(() => {
    if (!guardPage(currentUser, 'view_revenue', currentUser?.country)) {
      console.warn("Security Alert: Scoped revenue access attempt blocked.");
    }
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

  const funnelData = {
    visitors: 425000,
    leads: scopedInquiries.length * 100, // Simulated scale
    buyers: transactions.filter(t => t.status === 'Settled').length * 50 // Simulated scale
  };

  const revenueTrends = [
    { date: '01 Mar', revenue: 42000 },
    { date: '05 Mar', revenue: 38000 },
    { date: '10 Mar', revenue: 52000 },
    { date: '15 Mar', revenue: 48000 },
    { date: '20 Mar', revenue: 61000 },
    { date: '25 Mar', revenue: 59000 },
    { date: '30 Mar', revenue: 74000 },
  ];

  if (!stats) return null;

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">SALES</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{currentUser?.country.toUpperCase()} Acquisition Terminal</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <RevenueNavItem icon={<LayoutDashboard />} label="Revenue Matrix" active={true} />
          <RevenueNavItem icon={<Target />} label="Conversion Funnel" active={false} />
          <RevenueNavItem icon={<Zap />} label="Market Resonance" active={false} />
          <RevenueNavItem icon={<Globe />} label="Global Yield" active={false} />
          <RevenueNavItem icon={<BarChart3 />} label="Forecasts" active={false} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">Revenue Matrix</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Institutional Yield & Unit Economics</p>
          </div>
          <div className="flex items-center space-x-6">
             <div className="flex bg-ivory border border-border p-1">
                {(['daily', 'weekly', 'monthly'] as const).map(range => (
                  <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={cn(
                      "px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all",
                      timeRange === range ? "bg-plum text-white" : "text-gray-400 hover:text-plum"
                    )}
                  >
                    {range}
                  </button>
                ))}
             </div>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">AS</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {/* Dashboard Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={<DollarSign />} label="Net Settled Yield" value={`$${(revenueByHub.reduce((a, b) => a + b.value, 0) / 1000).toFixed(1)}k`} trend="+14.2%" positive />
            <StatCard icon={<Target />} label="Lead Conversion" value="12.4%" trend="+2.1%" positive />
            <StatCard icon={<ShieldCheck />} label="Registry Integrity" value="100%" trend="Audited" positive />
            <StatCard icon={<TrendingUp />} label="Avg. Acquisition" value="$42.5k" trend="+8.4%" positive />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Primary Trend Chart */}
            <Card className="lg:col-span-8 bg-white border-border shadow-luxury overflow-hidden">
              <CardHeader className="border-b border-border flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-2xl">Acquisition Trajectory</CardTitle>
                  <CardDescription className="text-[10px] uppercase tracking-widest">Global revenue velocity over 30 days</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-plum" />
                   <span className="text-[8px] font-bold uppercase text-gray-400">Hub Revenue</span>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueTrends}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7E3F98" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#7E3F98" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9}} tickFormatter={(val) => `$${val/1000}k`} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-black text-white p-4 shadow-2xl border border-white/10">
                                <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">{payload[0].payload.date}</p>
                                <p className="text-xl font-headline font-bold italic">${(payload[0].value as number).toLocaleString()}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#7E3F98" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card className="lg:col-span-4 bg-white border-border shadow-luxury">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-headline text-xl">Acquisition Funnel</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Institutional Conversion index</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-10">
                <FunnelStep label="Global Visitors" value={funnelData.visitors} color="bg-gray-100" />
                <FunnelStep label="Verified Leads" value={funnelData.leads} color="bg-lavender/30" percent={(funnelData.leads / funnelData.visitors * 100).toFixed(1) + '%'} />
                <FunnelStep label="Successful Buyers" value={funnelData.buyers} color="bg-plum/10" percent={(funnelData.buyers / funnelData.leads * 100).toFixed(1) + '%'} />
                
                <div className="pt-6 border-t border-border space-y-4">
                   <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Total Pipeline Win Rate</span>
                      <span className="text-sm font-bold text-plum">{(funnelData.buyers / funnelData.visitors * 100).toFixed(2)}%</span>
                   </div>
                   <Progress value={(funnelData.buyers / funnelData.visitors * 100) * 10} className="h-1 bg-ivory" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Top Performing Artifacts */}
            <Card className="lg:col-span-7 bg-white border-border shadow-luxury overflow-hidden">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-headline text-xl">High-Resonance Artifacts</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Revenue leaders by volume & margin</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Artifact</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Acquisitions</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right">Yield</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueByHub.slice(0, 5).map((hub, idx) => (
                      <TableRow key={idx} className="hover:bg-ivory/30 transition-colors">
                        <TableCell className="pl-8">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-tight">Maison Piece {idx + 1}</span>
                            <span className="text-[8px] text-gray-400 uppercase">Heritage Collection</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-xs font-light">{(124 - (idx * 12))}</TableCell>
                        <TableCell className="text-right text-xs font-bold text-plum">${(hub.value / 10).toLocaleString()}</TableCell>
                        <TableCell className="text-right pr-8">
                           <Badge variant="outline" className="text-[7px] uppercase border-green-200 text-green-600 bg-green-50">Trend Up</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Strategic Alerts */}
            <Card className="lg:col-span-5 bg-white border-border shadow-luxury flex flex-col">
              <CardHeader className="border-b border-border bg-plum/5">
                <div className="flex items-center space-x-3 text-plum">
                   <AlertTriangle className="w-5 h-5" />
                   <CardTitle className="font-headline text-xl uppercase">Revenue Safeguard</CardTitle>
                </div>
                <CardDescription className="text-[10px] uppercase tracking-widest text-plum/60 font-bold">Autonomous Market Anomalies</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                <RevenueAlertItem 
                  type="opportunity" 
                  title="UAE High-Jewelry Surge" 
                  desc="Hub resonance increased by 24% in the last 48 hours. Recommend expanding private allocation slots." 
                />
                <RevenueAlertItem 
                  type="drop" 
                  title="Singapore Watch Liquidity" 
                  desc="Minor yield drift detected (-8.2%). AI suggests refreshing the curatorial narrative for Heritage Complications." 
                />
                <RevenueAlertItem 
                  type="threshold" 
                  title="Institutional Goal Achieved" 
                  desc="Monthly global revenue threshold ($1.2M) bypassed 4 days ahead of schedule." 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function FunnelStep({ label, value, color, percent }: { label: string, value: number, color: string, percent?: string }) {
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-end">
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
        <div className="text-right">
           <span className="text-lg font-headline font-bold italic text-gray-900">{value.toLocaleString()}</span>
           {percent && <span className="text-[8px] font-bold text-plum block leading-none">{percent} yield</span>}
        </div>
      </div>
      <div className={cn("h-8 w-full border border-border/40 transition-all group-hover:scale-[1.02]", color)} />
    </div>
  );
}

function RevenueAlertItem({ type, title, desc }: { type: 'drop' | 'opportunity' | 'threshold', title: string, desc: string }) {
  const isDrop = type === 'drop';
  const isOpp = type === 'opportunity';
  
  return (
    <div className={cn(
      "p-6 border flex flex-col space-y-3 transition-all hover:shadow-md",
      isDrop ? "bg-red-50 border-red-100" : isOpp ? "bg-gold/5 border-gold/20" : "bg-green-50 border-green-100"
    )}>
       <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
             {isDrop ? <TrendingDown className="w-4 h-4 text-red-500" /> : <TrendingUp className="w-4 h-4 text-gold" />}
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">{title}</span>
          </div>
          <Badge className={cn(
            "text-[7px] uppercase tracking-tighter border-none",
            isDrop ? "bg-red-500 text-white" : isOpp ? "bg-gold text-white" : "bg-green-500 text-white"
          )}>{type}</Badge>
       </div>
       <p className="text-[11px] text-gray-600 font-light italic leading-relaxed">"{desc}"</p>
       <button className="text-[8px] font-bold uppercase tracking-widest text-plum hover:text-black transition-colors w-fit border-b border-plum pb-0.5">
          EXECUTE MITIGATION
       </button>
    </div>
  );
}

function RevenueNavItem({ icon, label, active }: { icon: any, label: string, active: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border",
      active ? "bg-plum text-white border-plum shadow-md" : "text-gray-400 hover:bg-ivory hover:text-plum border-transparent"
    )}>
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-gold")}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </span>
      <span>{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

function StatCard({ icon, label, value, trend, positive }: { icon: any, label: string, value: string, trend: string, positive: boolean }) {
  return (
    <Card className="bg-white border-border shadow-luxury hover:border-gold transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-ivory rounded-full group-hover:bg-gold/10 transition-colors text-plum">{icon}</div>
          <div className={cn(
            "flex items-center text-[10px] font-bold tracking-widest uppercase",
            positive ? "text-gold" : "text-gray-400"
          )}>
            {trend} {positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-[10px] uppercase tracking-[0.4em] font-bold">{label}</div>
          <div className="text-4xl font-headline font-bold italic mt-2 text-gray-900">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
