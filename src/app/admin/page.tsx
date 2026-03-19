
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  Globe, 
  Zap, 
  BarChart3, 
  ChevronRight, 
  Users,
  CreditCard,
  DollarSign,
  PieChart,
  ActivitySquare,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { NotificationFeed } from '@/components/admin/NotificationFeed';
import { getAnalytics } from '@/lib/analytics/mock-data';
import { 
  Pie, 
  PieChart as RechartsPieChart, 
  ResponsiveContainer, 
  Cell, 
  Tooltip as RechartsTooltip
} from 'recharts';

/**
 * Command Center: Updated to use global AdminLayout
 */
export default function CommandCenter() {
  const { privateInquiries, scopedNotifications, currentUser } = useAppStore();

  const stats = useMemo(() => {
    if (!currentUser) return null;
    return getAnalytics(currentUser.role, currentUser.country);
  }, [currentUser]);

  if (!stats) return null;

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="space-y-2">
        <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center space-x-2">
           <Link href="/admin">Dashboard</Link>
           <ChevronRight className="w-2.5 h-2.5" />
           <span className="text-plum">Command Center</span>
        </nav>
        <h1 className="text-4xl font-headline font-bold italic tracking-tight text-gray-900">Command Center</h1>
        <p className="text-sm text-gray-500 font-light italic">Institutional Yield & Platform Intelligence overview.</p>
      </header>

      {/* Stats Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard icon={<DollarSign />} label="Estimated Rev." value="$1.2M" trend="+12.4%" positive />
        <StatCard icon={<Users />} label="Active Leads" value={privateInquiries.length.toString()} trend="High Value" positive />
        <StatCard icon={<Zap />} label="Registry Health" value="100%" trend="Optimal" positive />
        <StatCard icon={<ActivitySquare />} label="Conv. Rate" value="4.2%" trend="+0.8%" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <Card className="bg-white border-border shadow-luxury overflow-hidden">
            <CardHeader className="border-b border-border bg-ivory/10 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-2xl">Global Market Resonance</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Regional lead distribution</CardDescription>
              </div>
              <PieChart className="w-5 h-5 text-plum" />
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="h-[250px] w-full lg:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={stats.leads}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="total"
                      >
                        {stats.leads.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#7E3F98', '#D4AF37', '#000000', '#BFA2DB', '#FAF9F6'][index % 5]} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white border border-border p-3 shadow-xl">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-plum">{payload[0].payload.country}</p>
                                <p className="text-lg font-headline font-bold italic">{payload[0].value} Leads</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full lg:w-1/2 space-y-4">
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-6">Market Distribution Index</h4>
                   {stats.leads.map((lead, idx) => (
                     <div key={idx} className="flex items-center justify-between group cursor-default">
                        <div className="flex items-center space-x-3">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#7E3F98', '#D4AF37', '#000000', '#BFA2DB', '#FAF9F6'][idx % 5] }} />
                           <span className="text-xs font-bold uppercase tracking-tighter text-gray-600 group-hover:text-black transition-colors">{lead.country} Hub</span>
                        </div>
                        <span className="text-xs font-light italic text-gray-400">{((lead.total / stats.leads.reduce((a, b) => a + b.total, 0)) * 100).toFixed(0)}% participation</span>
                     </div>
                   ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-black text-white p-10 space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-headline font-bold italic">Quick Access</h3>
                <div className="space-y-4">
                  <Link href="/admin/ai-dashboard" className="block p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left text-white">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Review AI Proposals</p>
                  </Link>
                  <Link href="/admin/sales" className="block p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left text-white">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Review T1 Leads</p>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="bg-white border-border shadow-luxury p-10 flex flex-col justify-between">
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-plum">
                     <Globe className="w-5 h-5" />
                     <h4 className="text-[10px] font-bold uppercase tracking-widest">Global Matrix</h4>
                  </div>
                  <p className="text-xs text-gray-500 font-light italic leading-relaxed">
                    Manage the global node configuration, regional overrides, and multi-brand expansion strategy.
                  </p>
               </div>
               <Link href="/admin/super">
                  <Button variant="outline" className="w-full rounded-none border-border text-[9px] font-bold uppercase tracking-widest h-12 hover:bg-ivory">
                    Open Global Matrix
                  </Button>
               </Link>
            </Card>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <Card className="bg-white border-border shadow-luxury h-full flex flex-col">
            <CardHeader className="border-b border-border bg-ivory/5">
              <CardTitle className="font-headline text-xl">Intelligence Pulse</CardTitle>
              <CardDescription className="text-[9px] uppercase tracking-widest font-bold">Real-time Maison activity</CardDescription>
            </CardHeader>
            <CardContent className="p-8 flex-1 overflow-y-auto custom-scrollbar">
              <NotificationFeed showTitle={false} maxItems={8} />
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
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
