
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
  Cpu
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type IntegrationTab = 'dashboard' | 'payments' | 'logistics' | 'crm' | 'erp' | 'analytics' | 'security';

export default function IntegrationsAdminPanel() {
  const [activeTab, setActiveTab] = useState<IntegrationTab>('dashboard');
  const { integrations, apiLogs, toggleIntegration } = useAppStore();
  const { toast } = useToast();

  const handleAction = (msg: string) => {
    toast({ title: "Integration Control", description: msg });
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      {/* Integration Sidebar */}
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">SYNC</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">API & Systems Hub</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <SyncNavItem icon={<LayoutDashboard />} label="Health Registry" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SyncNavItem icon={<CreditCard />} label="Payment Bridges" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
          <SyncNavItem icon={<Truck />} label="Logistics APIs" active={activeTab === 'logistics'} onClick={() => setActiveTab('logistics')} />
          <SyncNavItem icon={<UserCheck />} label="CRM Connectors" active={activeTab === 'crm'} onClick={() => setActiveTab('crm')} />
          <SyncNavItem icon={<Database />} label="ERP Middleware" active={activeTab === 'erp'} onClick={() => setActiveTab('erp')} />
          <SyncNavItem icon={<PieChart />} label="BI Endpoints" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
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

      {/* Main Workspace */}
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
          
          {/* DASHBOARD (HEALTH REGISTRY) */}
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
                          <TableHead className="text-[9px] uppercase font-bold">Latency</TableHead>
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
                            <TableCell className="text-xs font-bold text-plum">{int.latency || '--'}</TableCell>
                            <TableCell className="text-center">
                              <button onClick={() => toggleIntegration(int.id)}>
                                <Badge className={cn("text-[8px] uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform", 
                                  int.status === 'Connected' ? 'bg-green-50 text-green-600' : 
                                  int.status === 'Degraded' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                                )}>
                                  {int.status}
                                </Badge>
                              </button>
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
                    <Button variant="outline" className="w-full h-10 border-border text-[9px] font-bold uppercase tracking-widest" onClick={() => handleAction("Full log trace opened.")}>
                      View All Traces
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* PAYMENTS (PAYMENT BRIDGES) */}
          {activeTab === 'payments' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Payment Ecosystem</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Manage transactional gateways and risk bridges</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold tracking-widest uppercase">
                  <Plus className="w-4 h-4 mr-2" /> Connect Gateway
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <IntegrationCard name="Stripe Connect" provider="Stripe" status="Connected" volume="$840k" risk="Low" />
                <IntegrationCard name="PayPal Global" provider="PayPal" status="Connected" volume="$320k" risk="Medium" />
                <IntegrationCard name="Apple Pay Bridge" provider="Apple" status="Connected" volume="$150k" risk="Low" />
              </div>

              <Card className="bg-white border-border shadow-luxury p-8">
                <h3 className="text-xl font-headline font-bold italic mb-8">Reconciliation & Settlement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Next Payout: March 20, 2024</p>
                      <div className="flex items-end space-x-4">
                         <span className="text-4xl font-headline font-bold">$124,500.00</span>
                         <span className="text-xs text-green-600 font-bold uppercase mb-1">Cleared</span>
                      </div>
                      <Progress value={85} className="h-1 bg-ivory" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-ivory rounded-sm border border-border">
                         <p className="text-[8px] text-gray-400 uppercase font-bold mb-1">Fee Optimization</p>
                         <p className="text-xs font-bold text-plum">2.4% Avg.</p>
                      </div>
                      <div className="p-4 bg-ivory rounded-sm border border-border">
                         <p className="text-[8px] text-gray-400 uppercase font-bold mb-1">Fraud Mitigation</p>
                         <p className="text-xs font-bold text-plum">99.9% Shield</p>
                      </div>
                   </div>
                </div>
              </Card>
            </div>
          )}

          {/* LOGISTICS (API HUB) */}
          {activeTab === 'logistics' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Logistics Orchestration</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Real-time shipping rates and tracking automation</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Card className="bg-white border-border shadow-luxury overflow-hidden flex">
                  <div className="w-2 bg-plum" />
                  <div className="flex-1 p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-ivory rounded-sm"><Truck className="w-5 h-5 text-plum" /></div>
                        <div>
                          <h4 className="text-xl font-headline font-bold italic">FedEx Enterprise</h4>
                          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Connected • Global</p>
                        </div>
                      </div>
                      <Badge className="bg-green-50 text-green-600 text-[8px] uppercase">Active</Badge>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-gray-400">API Sync Success</span>
                          <span className="text-plum">99.8%</span>
                       </div>
                       <Progress value={99.8} className="h-1 bg-ivory" />
                    </div>
                    <div className="pt-4 flex justify-between border-t border-border">
                       <button className="text-[9px] font-bold uppercase tracking-widest text-plum hover:text-gold">Rate Config</button>
                       <button className="text-[9px] font-bold uppercase tracking-widest text-plum hover:text-gold">Label Logic</button>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white border-border shadow-luxury overflow-hidden flex">
                  <div className="w-2 bg-orange-400" />
                  <div className="flex-1 p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-ivory rounded-sm"><Truck className="w-5 h-5 text-orange-400" /></div>
                        <div>
                          <h4 className="text-xl font-headline font-bold italic">DHL Express</h4>
                          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Latency Warning • Regional</p>
                        </div>
                      </div>
                      <Badge className="bg-orange-50 text-orange-600 text-[8px] uppercase">Degraded</Badge>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-gray-400">API Sync Success</span>
                          <span className="text-orange-400">84.2%</span>
                       </div>
                       <Progress value={84.2} className="h-1 bg-ivory" />
                    </div>
                    <div className="pt-4 flex justify-between border-t border-border">
                       <button className="text-[9px] font-bold uppercase tracking-widest text-plum hover:text-gold">Troubleshoot</button>
                       <button className="text-[9px] font-bold uppercase tracking-widest text-plum hover:text-gold">Switch Failover</button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECURITY (KEYS & OAUTH) */}
          {activeTab === 'security' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-headline font-bold italic">Security & Credentials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Card className="bg-white border-border shadow-luxury p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-plum/5 text-plum rounded-sm"><Key className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-sm uppercase tracking-widest font-bold">Maison API Keys</h4>
                        <p className="text-[8px] text-gray-400">Production environment credentials</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 border-border text-[9px] font-bold uppercase">Generate New</Button>
                  </div>
                  <div className="space-y-4">
                    <KeyRow label="Public Client Key" val="pk_live_******************1924" />
                    <KeyRow label="Secret Server Key" val="sk_live_******************8822" hidden />
                    <KeyRow label="Webhook Secret" val="wh_live_******************4455" hidden />
                  </div>
                </Card>

                <Card className="bg-white border-border shadow-luxury p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gold/5 text-gold rounded-sm"><ShieldCheck className="w-5 h-5" /></div>
                      <div>
                        <h4 className="text-sm uppercase tracking-widest font-bold">Auth & OAuth Bridges</h4>
                        <p className="text-[8px] text-gray-400">Third-party authentication status</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <AuthRow label="Salesforce OAuth" status="Verified" date="March 10" />
                    <AuthRow label="Google Cloud Platform" status="Verified" date="March 12" />
                    <AuthRow label="SAP Enterprise Connect" status="Expired" date="Expired" urgent />
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* PLACEHOLDERS FOR REMAINING TABS */}
          {['crm', 'erp', 'analytics'].includes(activeTab) && (
            <div className="py-40 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-12 bg-ivory border border-border rounded-full animate-pulse">
                  <SyncIcon className="w-12 h-12 text-gold/30 mx-auto animate-spin-slow" />
                </div>
              </div>
              <p className="text-2xl text-muted-foreground font-light italic font-headline">
                The {activeTab.toUpperCase()} middleware is synchronizing with the Maison Master Registry.
              </p>
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

function IntegrationCard({ name, provider, status, volume, risk }: { name: string, provider: string, status: string, volume: string, risk: string }) {
  return (
    <Card className="bg-white border-border shadow-luxury hover:border-gold transition-all group p-8 space-y-6">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-ivory rounded-sm text-plum group-hover:bg-gold/10"><Zap className="w-5 h-5" /></div>
        <Badge variant="outline" className="text-[8px] uppercase">{status}</Badge>
      </div>
      <div className="space-y-1">
        <h4 className="text-xl font-headline font-bold italic group-hover:text-plum transition-colors">{name}</h4>
        <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{provider}</p>
      </div>
      <div className="pt-4 grid grid-cols-2 gap-4 border-t border-border">
         <div className="flex flex-col">
            <span className="text-[8px] text-gray-400 uppercase font-bold">24h Vol</span>
            <span className="text-xs font-bold text-plum">{volume}</span>
         </div>
         <div className="flex flex-col">
            <span className="text-[8px] text-gray-400 uppercase font-bold">Risk Index</span>
            <span className={cn("text-xs font-bold", risk === 'Low' ? 'text-green-600' : 'text-orange-600')}>{risk}</span>
         </div>
      </div>
    </Card>
  );
}

function KeyRow({ label, val, hidden }: { label: string, val: string, hidden?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-sm bg-ivory/30">
      <div className="flex flex-col">
        <span className="text-[9px] text-gray-400 uppercase font-bold">{label}</span>
        <span className="text-xs font-mono font-bold mt-1">{hidden ? '••••••••••••••••••••' : val}</span>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><Code className="w-4 h-4" /></Button>
    </div>
  );
}

function AuthRow({ label, status, date, urgent }: { label: string, status: string, date: string, urgent?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-sm">
      <div className="flex items-center space-x-4">
        <div className={cn("w-2 h-2 rounded-full", urgent ? "bg-red-500" : "bg-green-500")} />
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
          <span className="text-[9px] text-gray-400 italic">Last Verified: {date}</span>
        </div>
      </div>
      <Badge className={cn("text-[7px] uppercase", urgent ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600")}>{status}</Badge>
    </div>
  );
}

function SyncIcon({ className }: { className?: string }) {
  return <RefreshCcw className={className} />;
}
