
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Database, 
  Globe, 
  LogOut,
  ChevronRight,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Settings,
  RefreshCcw,
  Activity,
  UserCheck,
  Smartphone,
  LayoutDashboard,
  PieChart,
  LifeBuoy,
  Lock,
  Key,
  Code,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Server,
  Search as SearchIcon,
  Globe2,
  DatabaseZap,
  ArrowRightLeft,
  FastForward,
  RotateCw,
  Gauge
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from '@/lib/utils';

type IntegrationTab = 'dashboard' | 'payments' | 'logistics' | 'indexing' | 'security' | 'health';

export default function IntegrationsAdminPanel() {
  const [activeTab, setActiveTab] = useState<IntegrationTab>('dashboard');
  const { integrations, apiLogs, toggleIntegration, indexingStatus, indexingLogs, triggerReindex, toggleAutoSync, globalSettings } = useAppStore();
  const { toast } = useToast();

  const handleAction = (msg: string) => {
    toast({ title: "Integration Control", description: msg });
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">SYNC</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">API & Systems Hub</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <SyncNavItem icon={<LayoutDashboard />} label="Health Registry" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SyncNavItem icon={<Gauge />} label="System Performance" active={activeTab === 'health'} onClick={() => setActiveTab('health')} />
          <SyncNavItem icon={<FastForward />} label="Auto Indexing" active={activeTab === 'indexing'} onClick={() => setActiveTab('indexing')} />
          <SyncNavItem icon={<CreditCard />} label="Payment Bridges" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
          <SyncNavItem icon={<Truck />} label="Logistics APIs" active={activeTab === 'logistics'} onClick={() => setActiveTab('logistics')} />
          <SyncNavItem icon={<Lock />} label="Keys & Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3" /> Exit Sync
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">
              {activeTab}
            </h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              Systems Integration • API Lifecycle Management
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-plum/5 px-4 py-2 border border-plum/10 rounded-sm">
               <Cpu className="w-4 h-4 text-plum" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest">System Load</span>
                  <span className="text-[9px] text-gray-400">12ms Response</span>
               </div>
            </div>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">AS</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<CheckCircle2 />} label="Active Bridges" value="12" trend="Optimal" positive={true} />
                <StatCard icon={<Activity />} label="API Requests (24h)" value="1.2M" trend="+5.2%" positive={true} />
                <StatCard icon={<AlertTriangle />} label="Endpoint Errors" value="03" trend="Action Needed" positive={false} />
                <StatCard icon={<Clock />} label="Avg. Latency" value="142ms" trend="-12ms" positive={true} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Integration Health</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Real-time status of critical infrastructure</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-ivory/50">
                        <TableRow>
                          <TableHead className="text-[9px] uppercase font-bold pl-8">Integration</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Type</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Uptime</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {integrations.map(int => (
                          <TableRow key={int.id} className="hover:bg-ivory/30 transition-colors">
                            <TableCell className="pl-8">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold leading-tight">{int.name}</span>
                                <span className="text-[8px] text-gray-400 uppercase tracking-widest">{int.provider}</span>
                              </div>
                            </TableCell>
                            <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest">{int.type}</Badge></TableCell>
                            <TableCell className="text-xs font-light">{int.uptime}%</TableCell>
                            <TableCell className="text-center">
                              <Badge className={cn("text-[8px] uppercase tracking-widest", 
                                int.status === 'Connected' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                              )}>
                                {int.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Live Traffic Log</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Recent API interactions</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    {apiLogs.map(log => (
                      <div key={log.id} className="flex items-center justify-between p-4 bg-ivory rounded-sm border border-border/50 group hover:border-plum transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className={cn("w-2 h-2 rounded-full", log.status === 200 ? "bg-green-500" : "bg-red-500")} />
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase font-mono">{log.method} {log.endpoint}</span>
                            <span className="text-[8px] text-gray-400 uppercase tracking-widest">{log.latency}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[7px] font-mono">{log.status}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-headline font-bold italic">Enterprise System Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <HealthCard label="CDN Node Health" value="Global Optimised" progress={100} />
                <HealthCard label="Cache Hit Rate" value="94.2%" progress={94} />
                <HealthCard label="Database Latency" value="8ms" progress={98} />
              </div>
              <Card className="bg-white border-border shadow-luxury p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-headline font-bold italic">Auto-Scaling Infrastructure</h3>
                  <Badge className="bg-plum/5 text-plum text-[10px] uppercase tracking-widest">{globalSettings.performance.autoScalingStatus}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <PerformanceRow label="CPU Utilization" val={42} />
                  <PerformanceRow label="Memory Consumption" val={28} />
                  <PerformanceRow label="Network Throughput" val={15} />
                  <PerformanceRow label="Server Node Count" val={8} max={24} />
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'indexing' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Auto-Indexing & Search Engine</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Real-time database synchronization and SEO indexing</p>
                </div>
                <div className="flex items-center space-x-6 bg-white p-4 border border-border shadow-sm">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Automated Sync</span>
                      <span className="text-[10px] font-bold uppercase text-plum">{indexingStatus.autoSyncEnabled ? 'ENABLED' : 'DISABLED'}</span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="pb-4">
                    <DatabaseZap className="w-5 h-5 text-plum" />
                    <CardTitle className="font-headline text-xl pt-4">Catalog Registry</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">{indexingStatus.catalogItems.toLocaleString()} Items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={100} className="h-1 bg-ivory" />
                    <Button variant="outline" className="w-full mt-6 h-10 border-border text-[9px] font-bold uppercase tracking-widest" onClick={() => triggerReindex('catalog')}>Re-Index Catalog</Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="pb-4">
                    <SearchIcon className="w-5 h-5 text-gold" />
                    <CardTitle className="font-headline text-xl pt-4">Search Engine</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">{indexingStatus.searchEngineStatus}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={95} className="h-1 bg-ivory" />
                    <Button variant="outline" className="w-full mt-6 h-10 border-border text-[9px] font-bold uppercase tracking-widest" onClick={() => triggerReindex('search')}>Sync Search Index</Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="pb-4">
                    <Globe2 className="w-5 h-5 text-plum" />
                    <CardTitle className="font-headline text-xl pt-4">SEO Sitemap</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">{indexingStatus.sitemapStatus}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={100} className="h-1 bg-ivory" />
                    <Button variant="outline" className="w-full mt-6 h-10 border-border text-[9px] font-bold uppercase tracking-widest" onClick={() => triggerReindex('sitemap')}>Refresh Sitemap</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SyncNavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border",
        active 
          ? "bg-plum text-white border-plum shadow-md" 
          : "text-gray-400 hover:bg-ivory hover:text-plum border-transparent"
      )}
    >
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
            {trend} {positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : null}
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

function HealthCard({ label, value, progress }: { label: string, value: string, progress: number }) {
  return (
    <Card className="bg-white border-border p-6 space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">{label}</p>
        <span className="text-xs font-bold text-plum">{value}</span>
      </div>
      <Progress value={progress} className="h-1 bg-ivory" />
    </Card>
  );
}

function PerformanceRow({ label, val, max = 100 }: { label: string, val: number, max?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-plum">{val}{max === 100 ? '%' : ` / ${max}`}</span>
      </div>
      <Progress value={(val / max) * 100} className="h-1 bg-ivory" />
    </div>
  );
}
