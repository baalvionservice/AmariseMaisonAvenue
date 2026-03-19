
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
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Plus,
  Lock,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { NotificationFeed } from '@/components/admin/NotificationFeed';
import { getAnalytics } from '@/lib/analytics/mock-data';
import { Badge } from '@/components/ui/badge';
import { 
  Pie, 
  PieChart as RechartsPieChart, 
  ResponsiveContainer, 
  Cell, 
  Tooltip as RechartsTooltip
} from 'recharts';

/**
 * Command Center: Unified Strategic Dashboard
 * Focuses on Actions Required and Platform Resilience.
 */
export default function CommandCenter() {
  const { 
    privateInquiries, 
    scopedNotifications, 
    currentUser, 
    scopedApprovals, 
    scopedErrors, 
    runWorkflowSequence 
  } = useAppStore();

  const stats = useMemo(() => {
    if (!currentUser) return null;
    return getAnalytics(currentUser.role, currentUser.country);
  }, [currentUser]);

  if (!stats) return null;

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-gray-900">Today's Focus</h1>
          <p className="text-sm text-gray-500 font-light italic">Your institutional queue for {currentUser?.country.toUpperCase()} market hub.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button variant="outline" className="h-12 px-8 rounded-none border-border text-[9px] font-bold uppercase tracking-widest hover:bg-ivory" asChild>
              <Link href="/admin/finance">VIEW GLOBAL YIELD</Link>
           </Button>
           <Button className="h-12 px-8 rounded-none bg-plum text-white hover:bg-black transition-all text-[9px] font-bold uppercase tracking-widest shadow-xl shadow-plum/10" onClick={() => runWorkflowSequence('Daily Intelligence Cycle', currentUser?.country)}>
              <Zap className="w-3.5 h-3.5 mr-2" /> TRIGGER DAILY CYCLE
           </Button>
        </div>
      </header>

      {/* Strategic Task Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <TaskCard 
          icon={<Package className="text-plum" />} 
          label="Registry Audit" 
          count={scopedApprovals.filter(a => a.status === 'pending').length} 
          desc="Artifacts awaiting curatorial verification."
          href="/admin/operations"
         />
         <TaskCard 
          icon={<Users className="text-gold" />} 
          label="Priority Leads" 
          count={privateInquiries.filter(i => i.leadTier === 1 && i.status === 'new').length} 
          desc="Tier 1 connoisseurs requesting dialogue."
          href="/admin/sales"
         />
         <TaskCard 
          icon={<ShieldCheck className="text-green-500" />} 
          label="System Resilience" 
          count={scopedErrors.filter(e => !e.resolved).length} 
          desc="Anomalies detected in local hub logic."
          href="/admin/errors"
          status={scopedErrors.filter(e => !e.resolved).length === 0 ? 'Optimal' : 'Action Required'}
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Market Resonance Card */}
          <Card className="bg-white border-border shadow-luxury overflow-hidden">
            <CardHeader className="border-b border-border bg-ivory/10 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-2xl">Regional Yield Matrix</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Global lead distribution by market hub</CardDescription>
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
                        <span className="text-xs font-light italic text-gray-400">{((lead.total / stats.leads.reduce((a, b) => a + b.total, 0)) * 100).toFixed(0)}% resonance</span>
                     </div>
                   ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Institutional Actions Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-black text-white p-10 space-y-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-headline font-bold italic">Quick Triggers</h3>
                <div className="space-y-4">
                  <QuickActionBtn href="/admin/content" label="Register New Artifact" icon={<Plus />} />
                  <QuickActionBtn href="/admin/ai-dashboard" label="Execute SEO Cycle" icon={<Zap />} />
                  <QuickActionBtn href="/admin/sales" label="Review Tier 1 Leads" icon={<Target />} />
                </div>
              </div>
              <p className="text-[8px] text-white/30 uppercase tracking-widest mt-8">Institutional Node: SECURE-01</p>
            </Card>

            <Card className="bg-white border-border shadow-luxury p-10 flex flex-col justify-between border-l-4 border-l-gold">
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gold">
                     <AlertTriangle className="w-5 h-5" />
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">System Anomaly Feed</h4>
                  </div>
                  <div className="space-y-4 pt-4">
                     {scopedErrors.filter(e => !e.resolved).slice(0, 2).map(err => (
                       <div key={err.id} className="p-4 bg-red-50 border border-red-100 space-y-1">
                          <p className="text-[10px] font-bold uppercase text-red-700">{err.type}</p>
                          <p className="text-[9px] text-red-500 italic line-clamp-1">"{err.message}"</p>
                       </div>
                     ))}
                     {scopedErrors.filter(e => !e.resolved).length === 0 && (
                       <div className="flex flex-col items-center py-8 opacity-20 space-y-2">
                          <ShieldCheck className="w-8 h-8" />
                          <p className="text-[9px] font-bold uppercase tracking-widest">No Active Anomalies</p>
                       </div>
                     )}
                  </div>
               </div>
               <Link href="/admin/errors">
                  <Button variant="outline" className="w-full rounded-none border-border text-[9px] font-bold uppercase tracking-widest h-12 hover:bg-ivory mt-6">
                    Open Error Matrix
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

function TaskCard({ icon, label, count, desc, href, status }: { icon: any, label: string, count: number, desc: string, href: string, status?: string }) {
  return (
    <Link href={href}>
      <Card className="bg-white border-border shadow-luxury hover:border-plum hover:shadow-xl transition-all group overflow-hidden relative">
        {count > 0 && <div className="absolute top-0 left-0 w-full h-1 bg-plum" />}
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-ivory rounded-full group-hover:bg-plum/5 transition-colors">{icon}</div>
            <Badge variant={count > 0 ? 'default' : 'outline'} className={cn(
              "text-[9px] uppercase tracking-widest px-3 py-1",
              count > 0 ? "bg-plum text-white" : "border-gray-100 text-gray-300"
            )}>
              {status || (count > 0 ? 'ACTION' : 'CLEARED')}
            </Badge>
          </div>
          <div>
            <div className="flex items-baseline space-x-3">
               <span className="text-4xl font-headline font-bold italic text-gray-900">{count}</span>
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">{label}</span>
            </div>
            <p className="text-[11px] text-gray-500 font-light italic mt-3 leading-relaxed">
              {desc}
            </p>
          </div>
          <div className="pt-4 flex items-center text-[9px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-plum transition-colors">
             Open Terminal <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function QuickActionBtn({ href, label, icon }: { href: string, label: string, icon: any }) {
  return (
    <Link href={href} className="block w-full">
      <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group">
        <div className="flex items-center space-x-4">
           <span className="text-gold opacity-40 group-hover:opacity-100 transition-opacity">
             {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
           </span>
           <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{label}</span>
        </div>
        <ChevronRight className="w-3 h-3 text-white/20 group-hover:translate-x-1 transition-all" />
      </button>
    </Link>
  );
}
