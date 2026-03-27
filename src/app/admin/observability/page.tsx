'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  ChevronRight, 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  Clock, 
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Gauge,
  Cpu,
  ArrowRight,
  RefreshCcw,
  Search,
  Bell,
  MoreVertical,
  XCircle,
  Smartphone,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';

/**
 * SRE Terminal: The Maison Observability Hub.
 * Monitors global system health, metrics, and institutional alerts.
 */
export default function SREHub() {
  const { systemHealth, scopedAlerts, scopedMetrics, adminJurisdiction, currentUser } = useAppStore();

  const chartData = useMemo(() => {
    return scopedMetrics.slice(0, 7).map(m => ({
      time: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: m.value
    })).reverse();
  }, [scopedMetrics]);

  return (
    <div className="space-y-12 animate-fade-in font-body pb-20">
      <header className="flex justify-between items-end border-b border-white/5 pb-12">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 mb-2 text-blue-400">
             <Activity className="w-5 h-5" />
             <span className="text-[9px] font-bold uppercase tracking-[0.4em]">SRE Terminal</span>
          </div>
          <h1 className="text-5xl font-headline font-bold italic tracking-tight text-white uppercase">Observability</h1>
          <p className="text-sm text-white/40 font-light italic">Institutional telemetry and real-time resilience tracking.</p>
        </div>
        <div className="flex items-center space-x-6">
           <div className="text-right">
              <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">System Integrity</span>
              <div className="flex items-center space-x-3 mt-1">
                 <span className={cn("text-3xl font-headline font-bold italic tabular", 
                   systemHealth.overall > 90 ? "text-emerald-400" : "text-gold"
                 )}>{systemHealth.overall}%</span>
                 <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[8px] uppercase">Optimal</Badge>
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <HealthNode label="Payments" value={systemHealth.subsystems.payments} icon={<Zap className="w-4 h-4" />} />
         <HealthNode label="API Pulse" value={systemHealth.subsystems.api} icon={<Activity className="w-4 h-4" />} />
         <HealthNode label="Inventory" value={systemHealth.subsystems.inventory} icon={<Cpu className="w-4 h-4" />} />
         <HealthNode label="AI Logic" value={systemHealth.subsystems.ai} icon={<ShieldCheck className="w-4 h-4" />} />
      </div>

      <Tabs defaultValue="pulse" className="w-full">
        <TabsList className="bg-transparent border-b border-white/5 h-14 w-full justify-start p-0 rounded-none space-x-12 mb-12">
          <TabsTrigger value="pulse" className="tab-trigger-modern !text-white/40 data-[state=active]:!text-white">Real-time Pulse</TabsTrigger>
          <TabsTrigger value="alerts" className="tab-trigger-modern !text-white/40 data-[state=active]:!text-white">Alert Registry ({scopedAlerts.filter(a => a.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="telemetry" className="tab-trigger-modern !text-white/40 data-[state=active]:!text-white">Full Telemetry</TabsTrigger>
        </TabsList>

        <TabsContent value="pulse" className="space-y-12 animate-fade-in">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <Card className="lg:col-span-8 bg-[#111113] border-white/5 shadow-2xl overflow-hidden rounded-none">
                 <CardHeader className="border-b border-white/5 bg-white/5 p-8">
                    <CardTitle className="font-headline text-2xl text-white italic uppercase tracking-tighter">Throughput Matrix</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest text-white/30">Latency and requests over 15-minute window</CardDescription>
                 </CardHeader>
                 <CardContent className="p-10 h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData}>
                          <defs>
                             <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#666', fontWeight: 700}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#666'}} />
                          <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                          <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </CardContent>
              </Card>

              <aside className="lg:col-span-4 space-y-8">
                 <Card className="bg-black text-white p-10 space-y-8 shadow-2xl relative overflow-hidden rounded-none border-none">
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Gauge className="w-40 h-40 text-blue-500" /></div>
                    <div className="relative z-10 space-y-6">
                       <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Alert Severity</h4>
                       <div className="space-y-6">
                          <SeverityGauge label="Critical" count={scopedAlerts.filter(a => a.severity === 'critical').length} color="bg-red-500" />
                          <SeverityGauge label="High" count={scopedAlerts.filter(a => a.severity === 'high').length} color="bg-orange-500" />
                          <SeverityGauge label="Medium" count={scopedAlerts.filter(a => a.severity === 'medium').length} color="bg-blue-500" />
                       </div>
                       <Button variant="outline" className="w-full border-white/10 text-white/60 h-12 rounded-none text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black mt-4">
                          ACKNOWLEDGE ALL
                       </Button>
                    </div>
                 </Card>
              </aside>
           </div>
        </TabsContent>

        <TabsContent value="alerts" className="animate-fade-in">
           <Card className="bg-[#111113] border-white/5 shadow-2xl overflow-hidden rounded-none">
              <Table>
                 <TableHeader className="bg-white/5">
                    <TableRow className="border-white/5">
                       <TableHead className="text-[9px] uppercase font-bold pl-8 text-white/40">Timestamp</TableHead>
                       <TableHead className="text-[9px] uppercase font-bold text-white/40">Hub</TableHead>
                       <TableHead className="text-[9px] uppercase font-bold text-white/40">Anomaly Description</TableHead>
                       <TableHead className="text-[9px] uppercase font-bold text-center text-white/40">Severity</TableHead>
                       <TableHead className="text-[9px] uppercase font-bold text-right pr-8 text-white/40">Status</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {scopedAlerts.map(alert => (
                      <TableRow key={alert.id} className="hover:bg-white/5 transition-colors border-white/5">
                         <TableCell className="pl-8 text-[10px] font-mono text-white/20">{new Date(alert.triggeredAt).toLocaleTimeString()}</TableCell>
                         <TableCell><Badge variant="outline" className="text-[8px] uppercase border-white/10 text-white/40">{alert.country.toUpperCase()}</Badge></TableCell>
                         <TableCell className="text-xs font-light italic text-white/80">"{alert.message}"</TableCell>
                         <TableCell className="text-center">
                            <Badge className={cn("text-[7px] uppercase border-none", 
                              alert.severity === 'critical' ? "bg-red-500 text-white" :
                              alert.severity === 'high' ? "bg-orange-500 text-white" :
                              "bg-blue-500 text-white"
                            )}>{alert.severity}</Badge>
                         </TableCell>
                         <TableCell className="text-right pr-8">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">{alert.status}</span>
                         </TableCell>
                      </TableRow>
                    ))}
                    {scopedAlerts.length === 0 && (
                      <TableRow>
                         <TableCell colSpan={5} className="py-40 text-center opacity-20">
                            <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">No Active Alerts In This Jurisdiction</p>
                         </TableCell>
                      </TableRow>
                    )}
                 </TableBody>
              </Table>
           </Card>
        </TabsContent>

        <TabsContent value="telemetry" className="animate-fade-in">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <Card className="bg-[#111113] border-white/5 p-8 space-y-6">
                 <div className="flex items-center space-x-3 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Self-Audit Loop</h4>
                 </div>
                 <p className="text-xs text-white/40 italic leading-relaxed">
                   "Observability Engine is currently monitoring 1,240 global endpoints. System health aggregation happens every 60 seconds."
                 </p>
                 <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-white/20">
                       <span>Telemetry coverage</span>
                       <span className="text-emerald-400">100%</span>
                    </div>
                    <div className="h-0.5 bg-white/5 w-full"><div className="h-full bg-emerald-500 w-full" /></div>
                 </div>
              </Card>

              <Card className="bg-[#111113] border-white/5 p-8 space-y-6">
                 <div className="flex items-center space-x-3 text-blue-400">
                    <Globe className="w-5 h-5" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Cross-Hub Sync</h4>
                 </div>
                 <p className="text-xs text-white/40 italic leading-relaxed">
                   "Metrics from regional market hubs (UAE, US, IN) are normalized to Maison Global Standards for real-time comparative analysis."
                 </p>
                 <Button variant="outline" className="w-full border-white/10 text-white/60 h-10 rounded-none text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    SWITCH TO REGIONAL VIEW
                 </Button>
              </Card>

              <Card className="bg-[#111113] border-white/5 p-8 space-y-6">
                 <div className="flex items-center space-x-3 text-plum">
                    <Zap className="w-5 h-5" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">AI Observation</h4>
                 </div>
                 <p className="text-xs text-white/40 italic leading-relaxed">
                   "Neural Traces are audited for logic deviations. AI decision success rate is currently 98.4%."
                 </p>
                 <div className="pt-4 flex space-x-2">
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-plum w-[98%]" />
                    </div>
                 </div>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HealthNode({ label, value, icon }: { label: string, value: number, icon: any }) {
  return (
    <Card className="bg-[#111113] border-white/5 p-8 space-y-4 group hover:border-blue-500/40 transition-all rounded-none shadow-xl">
       <div className="flex justify-between items-start">
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover:text-blue-400 transition-colors">{label}</span>
          <div className="p-2 bg-white/5 text-white/40 rounded-none group-hover:text-white transition-colors">{icon}</div>
       </div>
       <div className={cn("text-4xl font-headline font-bold italic tabular", 
         value > 90 ? "text-white" : "text-gold"
       )}>{value}%</div>
       <div className="h-0.5 bg-white/5 w-full"><div className={cn("h-full transition-all duration-1000", value > 90 ? "bg-blue-500" : "bg-gold")} style={{ width: `${value}%` }} /></div>
    </Card>
  );
}

function SeverityGauge({ label, count, color }: { label: string, count: number, color: string }) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <span className="opacity-40">{label}</span>
          <span className={cn("tabular", count > 0 ? "text-white" : "opacity-20")}>{count} ACTIVE</span>
       </div>
       <div className="h-1 bg-white/5 w-full">
          <div className={cn("h-full transition-all duration-1000", color)} style={{ width: count > 0 ? '100%' : '0%' }} />
       </div>
    </div>
  );
}
