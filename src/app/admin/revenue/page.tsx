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
  LineChart
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
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function RevenueDashboard() {
  const { scopedInquiries, currentUser, analyticsData } = useAppStore();
  const metrics = MOCK_REVENUE_METRICS;
  
  const [filterTier, setFilterTier] = useState<string>('all');

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

  const filteredInquiries = useMemo(() => {
    if (filterTier === 'all') return scopedInquiries;
    return scopedInquiries.filter(i => i.leadTier.toString() === filterTier);
  }, [scopedInquiries, filterTier]);

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
          <RevenueNavItem icon={<Target />} label="Lead Terminal" active={false} />
          <RevenueNavItem icon={<Zap />} label="Service Performance" active={false} />
          <RevenueNavItem icon={<Globe />} label="Market Distribution" active={false} />
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
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">Acquisition Hub</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Institutional Revenue Intelligence</p>
          </div>
          <div className="flex items-center space-x-6">
             <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/5 px-4 py-2 border border-gold/10">
                <Crown className="w-4 h-4" />
                <span>Curatorial Access</span>
             </div>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">AS</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {/* Analytics Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-8 bg-white border-border shadow-luxury">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border">
                <div>
                  <CardTitle className="font-headline text-2xl">Regional Revenue Contribution</CardTitle>
                  <CardDescription className="text-[10px] uppercase tracking-widest">Market participation by Hub</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-plum" />
                   <span className="text-[8px] font-bold uppercase text-gray-400">Hub Volume</span>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.sales}>
                      <XAxis 
                        dataKey="country" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 9, fontWeight: 700}}
                      />
                      <Tooltip 
                        cursor={{fill: '#f9f7f9'}} 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white border border-border p-4 shadow-luxury">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-plum mb-1">{payload[0].payload.country}</p>
                                <p className="text-xl font-headline font-bold italic">${(payload[0].value as number).toLocaleString()}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                        {stats.sales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7E3F98' : '#D4AF37'} fillOpacity={0.8} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-4 space-y-8">
              <Card className="bg-white border-border shadow-luxury">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-headline text-xl">Conversion Loop</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <AnalyticsProgress label="Tier 1 Closing Rate" val={12} target={15} />
                  <AnalyticsProgress label="Service Pull-Through" val={28} target={30} />
                  <AnalyticsProgress label="AI-Assisted Wins" val={74} target={80} />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={<DollarSign />} label="Estimated Value" value={`$${(metrics.totalAcquisitionValue / 1000000).toFixed(1)}M`} trend="+12.4%" positive />
            <StatCard icon={<Users />} label="Active Leads" value={scopedInquiries.length.toString()} trend="Local Scope" positive />
            <StatCard icon={<ShieldCheck />} label="Verified Registry" value="100%" trend="Compliance" positive />
            <StatCard icon={<LineChart />} label="Avg. Order" value="$42k" trend="High Intensity" positive />
          </div>

          <Card className="bg-white border-border shadow-luxury overflow-hidden">
            <CardHeader className="border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-2xl">Maison Content Resonance</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Engagement metrics by editorial topic</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-ivory/50">
                  <TableRow>
                    <TableHead className="text-[9px] uppercase font-bold pl-8">Editorial Topic</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-center">Global Views</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-center">Resonance Score</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.contentEngagement.map((item, idx) => (
                    <TableRow key={idx} className="hover:bg-ivory/30 transition-colors">
                      <TableCell className="pl-8 font-bold text-xs uppercase tracking-widest">{item.topic}</TableCell>
                      <TableCell className="text-center text-xs font-light">{item.views.toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-[8px] uppercase border-plum/30 text-plum">{item.resonance}% Optimal</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <ArrowUpRight className="w-4 h-4 ml-auto text-gold" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function AnalyticsProgress({ label, val, target }: { label: string, val: number, target: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
        <span className="text-gray-400">{label}</span>
        <span className="text-plum">{val}% / {target}%</span>
      </div>
      <Progress value={(val / target) * 100} className="h-1 bg-ivory" />
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
          <div className={cn("text-[10px] font-bold tracking-widest uppercase", positive ? "text-gold" : "text-red-500")}>
            {trend}
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
