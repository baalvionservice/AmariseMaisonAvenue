
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Package,
  Layers,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Globe,
  Star,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Zap,
  Target,
  Briefcase,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PRODUCTS, 
  REVIEWS, 
  CAMPAIGNS, 
  AFFILIATES, 
  NOTIFICATIONS, 
  COUNTRIES 
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type AdminRole = 'admin' | 'marketing';
type ActiveTab = 'dashboard' | 'inventory' | 'marketing' | 'affiliates' | 'notifications' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [role, setRole] = useState<AdminRole>('admin');

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
          <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-none border border-border">
             <UserCheck className="w-3 h-3 text-primary" />
             <select 
               className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none w-full"
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

        <div className="pt-8 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3 transition-transform group-hover:-translate-x-1" /> Exit to Maison
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 space-y-12">
        <header className="flex justify-between items-center bg-card/50 luxury-blur p-6 -m-6 mb-6 rounded-none border-b border-border sticky top-0 z-10">
          <div>
            <h1 className="text-4xl font-headline font-bold italic">
              {activeTab === 'dashboard' ? 'Atelier Overview' : 
               activeTab === 'marketing' ? 'Global Growth' : 
               activeTab === 'affiliates' ? 'Heritage Partners' : 
               activeTab === 'notifications' ? 'Client Messaging' : 'Atelier Management'}
            </h1>
            <p className="text-muted-foreground text-sm tracking-widest uppercase font-bold mt-1">
              Role: {role === 'admin' ? 'Executive Director' : 'Marketing Curator'} | Region: Global
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <input className="bg-muted/30 border border-border rounded-none h-12 pl-10 pr-4 text-xs tracking-widest outline-none focus:border-primary transition-all w-64" placeholder="SEARCH ENTITIES..." />
            </div>
            <Button variant="outline" size="icon" className="rounded-none border-border relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse border-2 border-background" />
            </Button>
            <div className="flex items-center space-x-3 pl-6 border-l border-border">
              <div className="w-12 h-12 rounded-none bg-primary flex items-center justify-center font-headline text-2xl font-bold italic">V</div>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard icon={<DollarSign className="text-primary" />} label="Market Revenue" value="$2.4M" trend="+12.4%" positive />
              <StatCard icon={<Zap className="text-secondary" />} label="Campaign Reach" value="1.2M" trend="+45.2%" positive />
              <StatCard icon={<Users className="text-accent" />} label="VIP Conversions" value="84" trend="+8.5%" positive />
              <StatCard icon={<TrendingUp className="text-primary" />} label="Market Sentiment" value="Exquisite" trend="Stable" positive />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <Card className="bg-card border-border shadow-2xl rounded-none">
                  <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-6">
                    <div>
                      <CardTitle className="font-headline text-3xl font-bold">Active Campaigns</CardTitle>
                      <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold mt-2">Global growth performance across hubs</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="space-y-6">
                      {CAMPAIGNS.map(c => (
                        <div key={c.id} className="flex items-center justify-between p-6 bg-muted/20 border border-border/20 group hover:border-primary/40 transition-all">
                          <div className="flex items-center space-x-6">
                            <div className={cn("p-4 rounded-none", c.type === 'email' ? 'bg-primary/10' : c.type === 'push' ? 'bg-secondary/10' : 'bg-accent/10')}>
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
                 <Card className="bg-card border-border rounded-none shadow-2xl">
                    <CardHeader className="border-b border-border pb-6">
                      <CardTitle className="font-headline text-2xl font-bold">Affiliate Tiers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 pt-8">
                      {AFFILIATES.map(a => (
                        <div key={a.id} className="flex justify-between items-center p-4 bg-muted/20 border border-border/20">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest">{a.name}</div>
                            <Badge variant="outline" className="mt-1 text-[8px] tracking-[0.2em] rounded-none border-primary/40 text-primary">{a.tier}</Badge>
                          </div>
                          <div className="text-right">
                             <div className="text-sm font-light">${(a.salesGenerated / 1000).toFixed(1)}k</div>
                             <div className="text-[9px] text-muted-foreground uppercase">Revenue</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                 </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === 'marketing' && (
          <div className="space-y-12">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard icon={<Mail className="text-primary" />} label="Email Engagement" value="18.2%" trend="+2.1%" positive />
                <StatCard icon={<Zap className="text-secondary" />} label="Push CTR" value="4.8%" trend="+0.4%" positive />
                <StatCard icon={<Target className="text-accent" />} label="Ad ROI" value="4.2x" trend="+0.1x" positive />
             </div>
             
             <Card className="bg-card border-border rounded-none shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-6">
                  <div>
                    <CardTitle className="font-headline text-3xl font-bold">Campaign Orchestration</CardTitle>
                    <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Manage and schedule global marketing initiatives</CardDescription>
                  </div>
                  <Button className="rounded-none bg-primary text-white text-[10px] tracking-widest uppercase font-bold px-8 h-12">Create New Campaign</Button>
                </CardHeader>
                <CardContent className="pt-8 overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <th className="pb-4 pr-6">Campaign Name</th>
                          <th className="pb-4 px-6">Type</th>
                          <th className="pb-4 px-6">Status</th>
                          <th className="pb-4 px-6">Region</th>
                          <th className="pb-4 px-6">Reach</th>
                          <th className="pb-4 pl-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                         {CAMPAIGNS.map(c => (
                           <tr key={c.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors group">
                             <td className="py-6 pr-6 font-headline text-lg font-bold">{c.title}</td>
                             <td className="py-6 px-6 text-xs uppercase tracking-widest text-muted-foreground">{c.type}</td>
                             <td className="py-6 px-6">
                                <Badge className={cn("rounded-none text-[8px] tracking-widest uppercase", 
                                  c.status === 'active' ? 'bg-primary text-white' : 
                                  c.status === 'scheduled' ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground')}>
                                  {c.status}
                                </Badge>
                             </td>
                             <td className="py-6 px-6 text-xs font-bold">{c.country.toUpperCase()}</td>
                             <td className="py-6 px-6 text-xs">{(c.reach / 1000).toFixed(1)}k</td>
                             <td className="py-6 pl-6 text-right">
                                <Button variant="ghost" size="icon" className="group-hover:text-primary transition-colors">
                                   <Eye className="w-4 h-4" />
                                </Button>
                             </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </CardContent>
             </Card>
          </div>
        )}

        {activeTab === 'notifications' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="bg-card border-border rounded-none shadow-2xl">
                 <CardHeader className="border-b border-border pb-6">
                    <CardTitle className="font-headline text-3xl font-bold">Scheduled Messaging</CardTitle>
                    <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Automated high-touch client communication</CardDescription>
                 </CardHeader>
                 <CardContent className="pt-8">
                    <div className="space-y-6">
                       {NOTIFICATIONS.map(n => (
                         <div key={n.id} className="p-6 bg-muted/20 border border-border/20 space-y-4">
                            <div className="flex justify-between items-start">
                               <div className="flex items-center space-x-3">
                                  {n.type === 'Email' ? <Mail className="w-4 h-4 text-primary" /> : <Zap className="w-4 h-4 text-secondary" />}
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{n.type}</span>
                               </div>
                               <Badge className="bg-muted text-muted-foreground rounded-none text-[8px] uppercase tracking-widest">{n.status}</Badge>
                            </div>
                            <div className="font-headline text-xl font-bold">{n.subject}</div>
                            <div className="flex justify-between items-center pt-4 border-t border-border/40 text-[10px] text-muted-foreground uppercase tracking-widest">
                               <span>Recipients: {n.recipients}</span>
                               <span>Time: {n.scheduledAt}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>

              <div className="space-y-8">
                 <Card className="bg-primary text-white rounded-none border-none shadow-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="relative z-10 space-y-6">
                       <h3 className="font-headline text-3xl font-bold italic">Push Notification Lab</h3>
                       <p className="text-sm opacity-90 leading-relaxed font-light">Test localized messaging for our Diamond tier clients in selected global regions.</p>
                       <div className="space-y-4 pt-4">
                          <input className="w-full bg-white/10 border border-white/20 rounded-none h-12 px-4 text-xs tracking-widest outline-none focus:bg-white/20" placeholder="NOTIFICATION TITLE" />
                          <textarea className="w-full bg-white/10 border border-white/20 rounded-none h-24 p-4 text-xs tracking-widest outline-none focus:bg-white/20 resize-none" placeholder="NOTIFICATION CONTENT..." />
                          <Button className="w-full h-14 bg-white text-primary hover:bg-white/90 rounded-none text-[10px] tracking-[0.3em] font-bold uppercase shadow-2xl">SEND TEST PUSH</Button>
                       </div>
                    </div>
                 </Card>
                 
                 <Card className="bg-card border-border rounded-none shadow-2xl p-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6 text-primary">Global Send Performance</h4>
                    <div className="space-y-6">
                       <MarketStat label="US Delivery Rate" percent={99.8} color="bg-primary" />
                       <MarketStat label="UAE Open Rate" percent={24.5} color="bg-secondary" />
                       <MarketStat label="UK Engagement" percent={18.2} color="bg-accent" />
                    </div>
                 </Card>
              </div>
           </div>
        )}

        {activeTab === 'affiliates' && (
          <div className="space-y-12">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <StatCard icon={<Briefcase className="text-primary" />} label="Active Partners" value="342" trend="+12" positive />
                <StatCard icon={<DollarSign className="text-secondary" />} label="Partner Sales" value="$1.2M" trend="+14.2%" positive />
                <StatCard icon={<Star className="text-accent" />} label="Top Commission" value="15%" trend="Fixed" positive />
                <StatCard icon={<ShieldCheck className="text-primary" />} label="Verification" value="98%" trend="+2.1%" positive />
             </div>

             <Card className="bg-card border-border rounded-none shadow-2xl">
                <CardHeader className="border-b border-border pb-6">
                   <CardTitle className="font-headline text-3xl font-bold">Heritage Partners</CardTitle>
                   <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Luxury brand affiliates and high-profile curators</CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {AFFILIATES.map(a => (
                        <div key={a.id} className="p-8 border border-border/40 hover:border-primary/40 bg-muted/20 transition-all flex justify-between items-center">
                           <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                 <div className="w-10 h-10 bg-primary/10 flex items-center justify-center font-headline text-xl font-bold text-primary italic">{a.name.charAt(0)}</div>
                                 <div>
                                    <div className="text-lg font-bold">{a.name}</div>
                                    <Badge variant="outline" className="text-[8px] uppercase tracking-widest border-primary/40 text-primary mt-1">{a.tier} partner</Badge>
                                 </div>
                              </div>
                              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Joined: Jan 2024</div>
                           </div>
                           <div className="text-right space-y-2">
                              <div className="text-2xl font-light tracking-tighter">${(a.salesGenerated / 1000).toFixed(0)}k</div>
                              <div className="text-[9px] font-bold uppercase tracking-widest text-primary">Generated</div>
                              <Button variant="outline" className="h-8 rounded-none text-[8px] tracking-widest px-4 border-border">Details</Button>
                           </div>
                        </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-4 px-6 py-4 rounded-none text-[11px] font-bold uppercase tracking-[0.2em] transition-all group",
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
    <Card className="bg-card border-border rounded-none shadow-xl hover:border-primary/50 transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-muted/50 rounded-none group-hover:bg-primary/10 transition-colors">{icon}</div>
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

function MarketStat({ label, percent, color }: { label: string, percent: number, color: string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase">
        <span>{label}</span>
        <span className="text-primary">{percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-muted/50 rounded-none overflow-hidden">
        <div className={cn("h-full transition-all duration-1000", color)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
