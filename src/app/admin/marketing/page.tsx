
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Target, 
  Mail, 
  Crown, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  TrendingUp,
  RefreshCcw,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  LayoutDashboard,
  MessageSquare,
  Gift,
  Bell,
  Eye,
  PieChart,
  Smartphone,
  LifeBuoy,
  Cpu,
  Share2,
  Briefcase
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

type MarketingTab = 'dashboard' | 'campaigns' | 'segments' | 'affiliates' | 'subscriptions' | 'communications' | 'loyalty' | 'analytics';

export default function MarketingAdminPanel() {
  const [activeTab, setActiveTab] = useState<MarketingTab>('dashboard');
  const { activeCampaigns, customerSegments, vipClients, affiliates, upsertCampaign } = useAppStore();
  const { toast } = useToast();

  const handleAction = (msg: string) => {
    toast({ title: "Marketing Action", description: msg });
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">ENGAGE</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Maison Marketing Hub</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <MarketingNavItem icon={<LayoutDashboard />} label="Engagement" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <MarketingNavItem icon={<Zap />} label="Campaigns" active={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} />
          <MarketingNavItem icon={<Briefcase />} label="Affiliates" active={activeTab === 'affiliates'} onClick={() => setActiveTab('affiliates')} />
          <MarketingNavItem icon={<Crown />} label="Memberships" active={activeTab === 'subscriptions'} onClick={() => setActiveTab('subscriptions')} />
          <MarketingNavItem icon={<Target />} label="Segments" active={activeTab === 'segments'} onClick={() => setActiveTab('segments')} />
          <MarketingNavItem icon={<Mail />} label="Communications" active={activeTab === 'communications'} onClick={() => setActiveTab('communications')} />
          <MarketingNavItem icon={<Smartphone />} label="Loyalty & VIP" active={activeTab === 'loyalty'} onClick={() => setActiveTab('loyalty')} />
          <MarketingNavItem icon={<BarChart3 />} label="ROI Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3" /> Exit Hub
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
              Marketing Oversight • CRM Terminal
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-plum/5 px-4 py-2 border border-plum/10 rounded-sm">
               <Users className="w-4 h-4 text-plum" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Global Reach</span>
                  <span className="text-[9px] text-gray-400">425,000 Connoisseurs</span>
               </div>
            </div>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">MK</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<TrendingUp />} label="Marketing Revenue" value="$1.2M" trend="+18.4%" positive={true} />
                <StatCard icon={<Briefcase />} label="Partner Sales" value="$420k" trend="+12.2%" positive={true} />
                <StatCard icon={<Crown />} label="Subscription Volume" value="1,240" trend="+5%" positive={true} />
                <StatCard icon={<Users />} label="New Connoisseurs" value="4.2k" trend="+8%" positive={true} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Active Campaigns</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Real-time engagement across markets</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-ivory/50">
                        <TableRow>
                          <TableHead className="text-[9px] uppercase font-bold pl-8">Campaign</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Type</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Reach</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeCampaigns.map(camp => (
                          <TableRow key={camp.id} className="hover:bg-ivory/30 transition-colors">
                            <TableCell className="pl-8">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold leading-tight">{camp.title}</span>
                                <span className="text-[8px] text-gray-400 uppercase tracking-widest">{camp.market} Market</span>
                              </div>
                            </TableCell>
                            <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest">{camp.type}</Badge></TableCell>
                            <TableCell className="text-xs font-light">{(camp.reach || 0).toLocaleString()}</TableCell>
                            <TableCell className="text-center">
                              <Badge className={cn("text-[8px] uppercase tracking-widest", camp.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold')}>
                                {camp.status}
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
                    <CardTitle className="font-headline text-2xl">Membership Health</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">VIP subscription metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <div className="flex justify-between items-center p-4 bg-plum/5 rounded-sm">
                       <span className="text-[10px] font-bold uppercase tracking-widest">Active Maison Privé</span>
                       <span className="text-plum font-bold">842</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gold/5 rounded-sm">
                       <span className="text-[10px] font-bold uppercase tracking-widest">Active Atelier Reserve</span>
                       <span className="text-gold font-bold">398</span>
                    </div>
                    <Button variant="outline" className="w-full h-10 border-border text-[9px] font-bold uppercase tracking-widest" onClick={() => setActiveTab('subscriptions')}>
                      Manage Member Plans
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'affiliates' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Affiliate & Brand Partners</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Manage influencer and partner relations</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold tracking-widest uppercase">
                  <Plus className="w-4 h-4 mr-2" /> Recruit Partner
                </Button>
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Partner</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Tier</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right">Commission</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {affiliates.map(aff => (
                      <TableRow key={aff.id}>
                        <TableCell className="pl-8 text-xs font-bold">{aff.name}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] uppercase">{aff.tier}</Badge></TableCell>
                        <TableCell className="text-right text-xs font-bold text-plum">${aff.commissionEarned.toLocaleString()}</TableCell>
                        <TableCell className="text-right pr-8 text-xs">${aff.salesGenerated.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-headline font-bold italic">Maison Memberships</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white border-border shadow-luxury p-8 space-y-6">
                  <h3 className="text-xl font-headline font-bold">Maison Privé</h3>
                  <p className="text-xs italic text-gray-500">Monthly editorial gift box + Flagship priority</p>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-headline italic text-plum">$1,200 / mo</span>
                    <Badge className="bg-plum/5 text-plum text-[8px] uppercase font-bold">Premium Tier</Badge>
                  </div>
                </Card>
                <Card className="bg-white border-border shadow-luxury p-8 space-y-6">
                  <h3 className="text-xl font-headline font-bold">Atelier Reserve</h3>
                  <p className="text-xs italic text-gray-500">Exclusive runway access + Bespoke tailoring</p>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-headline italic text-gold">$5,000 / yr</span>
                    <Badge className="bg-gold/5 text-gold text-[8px] uppercase font-bold">Heritage Tier</Badge>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function MarketingNavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
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
