'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Package,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Zap,
  Target,
  Briefcase,
  ShieldCheck,
  UserCheck,
  Activity,
  Globe,
  Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CAMPAIGNS, 
  AFFILIATES, 
  PRODUCTS,
  formatPrice 
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type AdminRole = 'admin' | 'marketing';
type ActiveTab = 'dashboard' | 'inventory' | 'marketing' | 'affiliates' | 'notifications' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [role, setRole] = useState<AdminRole>('admin');
  const [isStressTest, setIsStressTest] = useState(false);

  // Simulate stress test activation
  useEffect(() => {
    const timer = setTimeout(() => setIsStressTest(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredNavItems = useMemo(() => {
    const items = [
      { id: 'dashboard', icon: <BarChart3 />, label: 'Dashboard', roles: ['admin', 'marketing'] },
      { id: 'inventory', icon: <Package />, label: 'Inventory', roles: ['admin'] },
      { id: 'marketing', icon: <Target />, label: 'Campaigns', roles: ['admin', 'marketing'] },
      { id: 'affiliates', icon: <Briefcase />, label: 'Affiliates', roles: ['admin', 'marketing'] },
      { id: 'notifications', icon: <Mail />, label: 'Messaging', roles: ['admin', 'marketing'] },
      { id: 'settings', icon: <Settings />, label: 'System', roles: ['admin'] },
    ];
    return items.filter(item => item.roles.includes(role));
  }, [role]);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card p-8 flex flex-col space-y-12 shadow-2xl z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter">
            AMARISÉ <span className="text-primary text-xs font-normal tracking-[0.4em] ml-2">ADMIN</span>
          </div>
          <div className="flex items-center space-x-2 bg-muted/50 p-2 border border-border">
             <UserCheck className="w-3 h-3 text-primary" />
             <select 
               className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none w-full cursor-pointer"
               value={role}
               onChange={(e) => {
                 setRole(e.target.value as AdminRole);
                 setActiveTab('dashboard');
               }}
             >
               <option value="admin">Director (Admin)</option>
               <option value="marketing">Curator (Marketing)</option>
             </select>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {filteredNavItems.map(item => (
            <NavItem 
              key={item.id}
              icon={item.icon} 
              label={item.label} 
              active={activeTab === item.id} 
              onClick={() => setActiveTab(item.id as ActiveTab)} 
            />
          ))}
        </nav>

        <div className="pt-8 space-y-4 border-t border-border">
          {isStressTest && (
            <div className="p-4 bg-primary/5 border border-primary/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-widest font-bold text-primary">Enterprise Node</span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              </div>
              <p className="text-[9px] text-muted-foreground font-light italic">Simulating high-volume traffic across 5 global hubs.</p>
            </div>
          )}
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3 transition-transform group-hover:-translate-x-1" /> Exit to Maison
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 space-y-12">
        <header className="flex justify-between items-center bg-card/50 luxury-blur p-6 -m-6 mb-6 border-b border-border sticky top-0 z-10">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-4xl font-headline font-bold italic">
                {activeTab === 'dashboard' ? 'Enterprise Overview' : 
                 activeTab === 'marketing' ? 'Global Growth' : 
                 activeTab === 'affiliates' ? 'Heritage Partners' : 
                 activeTab === 'notifications' ? 'Client Messaging' : 'Atelier Management'}
              </h1>
              <p className="text-muted-foreground text-sm tracking-widest uppercase font-bold mt-1">
                {role === 'admin' ? 'Executive Director' : 'Marketing Curator'} | 5 Global Hubs Active
              </p>
            </div>
            {isStressTest && (
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5 px-4 h-8 text-[9px] tracking-widest">
                STRESS TEST: STABLE
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <input className="bg-muted/30 border border-border h-12 pl-10 pr-4 text-xs tracking-widest outline-none focus:border-primary transition-all w-64" placeholder="SEARCH ENTITIES..." />
            </div>
            <Button variant="outline" size="icon" className="border-border relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse border-2 border-background" />
            </Button>
            <div className="flex items-center space-x-3 pl-6 border-l border-border">
              <div className="w-12 h-12 bg-primary flex items-center justify-center font-headline text-2xl font-bold italic">V</div>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard icon={<DollarSign className="text-primary" />} label="Market Revenue" value="$42.8M" trend="+18.4%" positive />
              <StatCard icon={<Activity className="text-secondary" />} label="API Latency" value="24ms" trend="Stable" positive />
              <StatCard icon={<Database className="text-accent" />} label="Entity Load" value={PRODUCTS.length.toString()} trend="High" positive />
              <StatCard icon={<Globe className="text-primary" />} label="Global Reach" value="2.4M" trend="+12.2%" positive />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <Card className="bg-card border-border shadow-2xl">
                  <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-6">
                    <div>
                      <CardTitle className="font-headline text-3xl font-bold">Global Campaigns</CardTitle>
                      <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold mt-2">Enterprise-wide marketing performance</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="space-y-6">
                      {CAMPAIGNS.map(c => (
                        <div key={c.id} className="flex items-center justify-between p-6 bg-muted/20 border border-border/20 group hover:border-primary/40 transition-all">
                          <div className="flex items-center space-x-6">
                            <div className={cn("p-4", c.type === 'email' ? 'bg-primary/10' : c.type === 'push' ? 'bg-secondary/10' : 'bg-accent/10')}>
                               {c.type === 'email' ? <Mail className="w-5 h-5 text-primary" /> : <Zap className="w-5 h-5 text-secondary" />}
                            </div>
                            <div>
                              <div className="font-headline text-xl font-bold">{c.title}</div>
                              <div className="flex items-center space-x-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                                <span>{c.type}</span>
                                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                <span>Region: {c.country.toUpperCase()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                             <div className="text-[10px] font-bold uppercase tracking-widest">Reach: {c.reach.toLocaleString()}</div>
                             <div className="flex items-center space-x-3">
                                <Progress value={c.performance} className="w-24 h-1" />
                                <span className="text-[10px] font-bold text-primary">{c.performance}%</span>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-12">
                 <Card className="bg-card border-border shadow-2xl">
                    <CardHeader className="border-b border-border pb-6">
                      <CardTitle className="font-headline text-2xl font-bold">Heritage Partners</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 pt-8">
                      {AFFILIATES.map(a => (
                        <div key={a.id} className="flex justify-between items-center p-4 bg-muted/20 border border-border/20">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest">{a.name}</div>
                            <Badge variant="outline" className="mt-1 text-[8px] tracking-[0.2em] border-primary/40 text-primary">{a.tier}</Badge>
                          </div>
                          <div className="text-right">
                             <div className="text-sm font-light">${(a.salesGenerated / 1000).toFixed(1)}k</div>
                             <div className="text-[9px] text-muted-foreground uppercase">Revenue</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                 </Card>
                 
                 <Card className="bg-primary/5 border-primary/20">
                   <CardHeader className="pb-4">
                     <CardTitle className="text-xs uppercase tracking-[0.2em] font-bold text-primary">System Integrity</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <IntegrityMetric label="Asset CDN" value="99.9%" />
                      <IntegrityMetric label="Genkit Flow" value="Stable" />
                      <IntegrityMetric label="Firestore Sink" value="Active" />
                   </CardContent>
                 </Card>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function IntegrityMetric({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold text-primary">{value}</span>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group",
        active 
          ? "bg-primary text-white shadow-xl shadow-primary/20" 
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent hover:border-border"
      )}
    >
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-primary")}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </span>
      <span>{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

function StatCard({ icon, label, value, trend, positive }: { icon: React.ReactNode, label: string, value: string, trend: string, positive: boolean }) {
  return (
    <Card className="bg-card border-border shadow-xl hover:border-primary/50 transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-muted/50 group-hover:bg-primary/10 transition-colors">{icon}</div>
          <div className={cn(
            "flex items-center text-xs font-bold tracking-widest",
            positive ? "text-primary" : "text-destructive"
          )}>
            {trend} {positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-bold">{label}</div>
          <div className="text-4xl font-headline font-bold italic mt-2">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
