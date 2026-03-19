'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ArrowUpRight, 
  ArrowRight,
  Clock,
  AlertCircle,
  Zap,
  ShieldCheck,
  Plus,
  Globe,
  ArrowDownRight,
  Activity,
  Cpu,
  RefreshCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { NotificationFeed } from '@/components/admin/NotificationFeed';
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid 
} from 'recharts';

const REVENUE_DATA = [
  { day: 'Mon', revenue: 12000 },
  { day: 'Tue', revenue: 18000 },
  { day: 'Wed', revenue: 15000 },
  { day: 'Thu', revenue: 24000 },
  { day: 'Fri', revenue: 32000 },
  { day: 'Sat', revenue: 28000 },
  { day: 'Sun', revenue: 35000 },
];

export default function AdminDashboard() {
  const { products, privateInquiries, globalSettings } = useAppStore();

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
          <div className="flex items-center bg-white border border-slate-200 rounded-md p-1 mr-4">
            <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-white rounded">Live</button>
            <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Historical</button>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-[10px] h-11 px-6 rounded-md shadow-lg shadow-blue-600/20">
            <RefreshCcw className="w-4 h-4 mr-2" /> Sync Registry
          </Button>
        </div>
      </header>

      {/* Global Operations Map - Level 2 New Component */}
      <section className="relative h-[400px] w-full bg-[#0A1A2F] rounded-xl overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Floating Map Label */}
        <div className="absolute top-8 left-8 z-10 flex items-center space-x-3 bg-white/5 luxury-blur px-4 py-2 border border-white/10 rounded-md">
          <Globe className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Global Presence: 5 Hubs Active</span>
        </div>

        {/* Map Nodes */}
        <MapNode top="35%" left="25%" hub="NYC" status="Optimal" />
        <MapNode top="28%" left="48%" hub="LON" status="High Load" active />
        <MapNode top="45%" left="62%" hub="DXB" status="Optimal" />
        <MapNode top="52%" left="75%" hub="BOM" status="Optimal" />
        <MapNode top="65%" left="85%" hub="SIN" status="Optimal" />

        {/* Connection Lines (Simulated with absolute DIVs) */}
        <div className="absolute top-[35%] left-[25%] w-[23%] h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 rotate-[-15deg] origin-left"></div>
        <div className="absolute top-[28%] left-[48%] w-[14%] h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 rotate-[45deg] origin-left"></div>

        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[9px] font-bold uppercase text-white/60 tracking-widest">Network Stability: 99.9%</span>
          </div>
          <div className="text-[18px] font-headline font-bold text-white italic tracking-tighter">Global Yield Flow: Active</div>
        </div>
      </section>

      {/* Strategic KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="Total Global Revenue" 
          value="$1,242,800" 
          trend="+14.2%" 
          trendUp={true} 
          icon={<TrendingUp className="text-blue-600" />} 
          subtext="vs last 7 days"
        />
        <KPICard 
          label="Registry Capacity" 
          value={products.length.toString()} 
          trend="Steady" 
          trendUp={true} 
          icon={<Package className="text-teal-500" />} 
          subtext="Verified Artifacts"
        />
        <KPICard 
          label="High-Intent Leads" 
          value={privateInquiries.filter(i => i.leadTier === 1).length.toString()} 
          trend="+5" 
          trendUp={true} 
          icon={<Users className="text-amber-500" />} 
          subtext="Tier 1 Verification Needed"
        />
        <KPICard 
          label="System Resource Load" 
          value="42%" 
          trend="Optimal" 
          trendUp={true} 
          icon={<Cpu className="text-emerald-500" />} 
          subtext="Compute Utilization"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Performance Chart */}
        <Card className="lg:col-span-8 bg-white border-slate-200 shadow-sm luxury-card-lift overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">Yield Velocity</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Institutional revenue trajectory (7 days)</CardDescription>
              </div>
              <Badge variant="outline" className="bg-white border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                <Activity className="w-3 h-3 mr-1.5 text-blue-600" /> Real-time
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-10 pb-6 px-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" x1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                    dx={-10}
                    tickFormatter={(val) => `$${val/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#2563EB" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Action Center */}
        <Card className="lg:col-span-4 bg-white border-slate-200 shadow-sm luxury-card-lift flex flex-col">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-900 rounded text-white"><ShieldCheck size={16} /></div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">Action Matrix</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Priority curatorial queue</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
            <div className="divide-y divide-slate-100">
              <ActionItem 
                priority="CRITICAL"
                title="System Anomaly" 
                desc="UAE Lead routing logic failed." 
                href="/admin/errors"
              />
              <ActionItem 
                priority="STRATEGIC"
                title="New Tier 1 Lead" 
                desc="Heritage Birkin Inquiry (UK)." 
                href="/admin/sales"
              />
              <ActionItem 
                priority="NOMINAL"
                title="Pending Artifacts" 
                desc="12 items awaiting description audit." 
                href="/admin/content"
              />
              <ActionItem 
                priority="NOMINAL"
                title="SEO Audit" 
                desc="Missing metadata for London Hub." 
                href="/admin/seo"
              />
            </div>
          </CardContent>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <Button variant="ghost" className="w-full text-slate-500 hover:text-blue-600 text-xs font-bold uppercase tracking-widest">
              Full Task Archive <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MapNode({ top, left, hub, status, active = false }: { top: string, left: string, hub: string, status: string, active?: boolean }) {
  return (
    <div className="absolute group z-20" style={{ top, left }}>
      <div className={cn(
        "w-3 h-3 rounded-full border-2 border-white transition-all duration-500 cursor-help",
        active ? "bg-blue-500 node-pulse scale-125" : "bg-emerald-500"
      )}></div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-40 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-95 group-hover:scale-100">
        <div className="bg-black/90 luxury-blur border border-white/10 p-3 shadow-2xl rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{hub} Hub</span>
            <div className={cn("w-1.5 h-1.5 rounded-full", active ? "bg-blue-400 animate-pulse" : "bg-emerald-400")}></div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] uppercase font-bold text-white/40">
              <span>Status</span>
              <span className="text-white/80">{status}</span>
            </div>
            <div className="flex justify-between text-[8px] uppercase font-bold text-white/40">
              <span>Sync Lag</span>
              <span className="text-white/80">12ms</span>
            </div>
          </div>
        </div>
        <div className="w-2 h-2 bg-black/90 rotate-45 mx-auto -mt-1 border-r border-b border-white/10"></div>
      </div>

      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap">
        {hub}
      </span>
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
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionItem({ priority, title, desc, href }: { priority: string, title: string, desc: string, href: string }) {
  const color = priority === 'CRITICAL' ? 'bg-red-500' : priority === 'STRATEGIC' ? 'bg-blue-500' : 'bg-slate-400';
  
  return (
    <div className="p-5 flex items-start justify-between group hover:bg-slate-50 transition-colors">
      <div className="flex space-x-4">
        <div className={cn("w-1 h-10 rounded-full", color)} />
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className={cn("text-[8px] font-bold text-white px-1.5 rounded uppercase tracking-tighter", color)}>{priority}</span>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{title}</h4>
          </div>
          <p className="text-xs text-slate-500 font-light max-w-[200px] line-clamp-1">{desc}</p>
        </div>
      </div>
      <Link href={href}>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-blue-600 hover:bg-white rounded-full border border-transparent hover:border-slate-100 transition-all opacity-0 group-hover:opacity-100">
          <ArrowRight size={14} />
        </Button>
      </Link>
    </div>
  );
}