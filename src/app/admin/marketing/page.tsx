'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Target, 
  Mail, 
  Crown, 
  BarChart3, 
  LogOut,
  ChevronRight,
  Plus,
  RefreshCcw,
  TrendingUp,
  Users,
  LayoutDashboard,
  Smartphone,
  Briefcase,
  Megaphone,
  Network,
  UserCheck,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

type MarketingTab = 'dashboard' | 'campaigns' | 'verification' | 'segments' | 'affiliates' | 'subscriptions' | 'communications' | 'loyalty' | 'analytics';

export default function MarketingAdminPanel() {
  const [activeTab, setActiveTab] = useState<MarketingTab>('dashboard');
  const { activeCampaigns, affiliates, vipClients, verifyClient } = useAppStore();
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
          <MarketingNavItem icon={<UserCheck />} label="Client Verification" active={activeTab === 'verification'} onClick={() => setActiveTab('verification')} />
          <MarketingNavItem icon={<Network />} label="Affiliates" active={activeTab === 'affiliates'} onClick={() => setActiveTab('affiliates')} />
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
                  <span className="text-[9px] text-gray-400">425,000 Global Connoisseurs</span>
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
                <StatCard icon={<UserCheck />} label="Pending Verification" value={vipClients.filter(c => c.status === 'pending').length.toString()} trend="Action" positive={false} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Active Strategic Campaigns</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Real-time engagement across markets</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-ivory/50">
                        <TableRow>
                          <TableHead className="text-[9px] uppercase font-bold pl-8">Campaign</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Type</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Market Reach</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeCampaigns.map(camp => (
                          <TableRow key={camp.id} className="hover:bg-ivory/30 transition-colors">
                            <TableCell className="pl-8">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold leading-tight">{camp.title}</span>
                                <span className="text-[8px] text-gray-400 uppercase tracking-widest">{camp.market} Market Hub</span>
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
                    <CardTitle className="font-headline text-2xl">Client Loyalty Health</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">VIP subscription tier metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <div className="flex justify-between items-center p-4 bg-plum/5 rounded-sm border border-plum/10">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-plum">Maison Privé</span>
                       <span className="font-bold text-gray-900">842</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gold/5 rounded-sm border border-gold/10">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Atelier Reserve</span>
                       <span className="font-bold text-gray-900">398</span>
                    </div>
                    <Button variant="outline" className="w-full h-10 border-border text-[9px] font-bold uppercase tracking-widest" onClick={() => setActiveTab('subscriptions')}>
                      Manage Subscription Plans
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-12">
              <div className="space-y-2">
                <h2 className="text-2xl font-headline font-bold italic">Elite Client Registry</h2>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Verify connoisseur credentials for archival acquisition access</p>
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Connoisseur</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Email</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Tier</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vipClients.map(client => (
                      <TableRow key={client.id} className="hover:bg-ivory/30 transition-colors">
                        <TableCell className="pl-8">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold leading-tight uppercase tracking-tight">{client.name}</span>
                            <span className="text-[8px] text-gray-400 uppercase tracking-widest">Lifetime Value: ${client.totalSpend.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-light">{client.email}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest">{client.tier}</Badge></TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn("text-[8px] uppercase tracking-widest", 
                            client.status === 'verified' ? 'bg-green-50 text-green-600' : 
                            client.status === 'rejected' ? 'bg-red-50 text-red-600' : 
                            'bg-gold/10 text-gold'
                          )}>
                            {client.status || 'pending'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          {client.status === 'pending' || !client.status ? (
                            <div className="flex justify-end space-x-2">
                              <Button 
                                size="sm" 
                                className="h-8 bg-black text-white hover:bg-plum text-[8px] font-bold uppercase"
                                onClick={() => verifyClient(client.id)}
                              >
                                VERIFY
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500"><ShieldCheck className="w-4 h-4" /></Button>
                            </div>
                          ) : (
                            <div className="flex justify-end items-center text-green-500 space-x-2">
                               <CheckCircle2 className="w-4 h-4" />
                               <span className="text-[8px] font-bold uppercase">Identity Secured</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {['campaigns', 'segments', 'affiliates', 'subscriptions', 'communications', 'loyalty', 'analytics'].includes(activeTab) && (
            <div className="py-40 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-12 bg-ivory border border-border rounded-full animate-pulse">
                  <Megaphone className="w-12 h-12 text-gold/30 mx-auto" />
                </div>
              </div>
              <p className="text-2xl text-muted-foreground font-light italic font-headline">
                The {activeTab} workspace is currently synchronizing with the global Maison engagement engine.
              </p>
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
