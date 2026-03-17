
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

type MarketingTab = 'dashboard' | 'campaigns' | 'segments' | 'communications' | 'loyalty' | 'analytics';

export default function MarketingAdminPanel() {
  const [activeTab, setActiveTab] = useState<MarketingTab>('dashboard');
  const { activeCampaigns, customerSegments, vipClients, upsertCampaign } = useAppStore();
  const { toast } = useToast();

  const handleAction = (msg: string) => {
    toast({ title: "Marketing Action", description: msg });
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      {/* Marketing Sidebar */}
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
          <MarketingNavItem icon={<Target />} label="Segments" active={activeTab === 'segments'} onClick={() => setActiveTab('segments')} />
          <MarketingNavItem icon={<Mail />} label="Communications" active={activeTab === 'communications'} onClick={() => setActiveTab('communications')} />
          <MarketingNavItem icon={<Crown />} label="Loyalty & VIP" active={activeTab === 'loyalty'} onClick={() => setActiveTab('loyalty')} />
          <MarketingNavItem icon={<BarChart3 />} label="ROI Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin/support">
              <LifeBuoy className="w-4 h-4 mr-3" /> Support Hub
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin/integrations">
              <Cpu className="w-4 h-4 mr-3" /> Sync Hub
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3" /> Exit Hub
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
          
          {/* DASHBOARD (ENGAGEMENT) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<TrendingUp />} label="Total Campaign Revenue" value="$1.2M" trend="+18.4%" positive={true} />
                <StatCard icon={<Mail />} label="Email Open Rate" value="42%" trend="+5.2%" positive={true} />
                <StatCard icon={<Crown />} label="VIP Conversions" value="840" trend="+12%" positive={true} />
                <StatCard icon={<Users />} label="New Subscribers" value="4.2k" trend="+8%" positive={true} />
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
                          <TableHead className="text-[9px] uppercase font-bold">ROI</TableHead>
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
                            <TableCell className="text-xs font-bold text-plum">{camp.roi}x</TableCell>
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
                    <CardTitle className="font-headline text-2xl">VIP Loyalty Hub</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Top tier client activity</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    {vipClients.slice(0, 3).map(client => (
                      <div key={client.id} className="flex items-center justify-between p-4 bg-ivory rounded-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-plum rounded-full flex items-center justify-center text-white font-headline text-xs">{client.name.charAt(0)}</div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase">{client.name}</span>
                            <span className="text-[8px] text-gray-400 uppercase tracking-widest">{client.tier} tier</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-gold">{client.loyaltyPoints.toLocaleString()} pts</span>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full h-10 border-border text-[9px] font-bold uppercase tracking-widest" onClick={() => setActiveTab('loyalty')}>
                      Manage VIP Program
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* CAMPAIGNS (MANAGEMENT) */}
          {activeTab === 'campaigns' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Marketing Campaigns</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Launch and track global marketing events</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold tracking-widest uppercase">
                  <Plus className="w-4 h-4 mr-2" /> Create Campaign
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {activeCampaigns.map(camp => (
                  <Card key={camp.id} className="bg-white border-border shadow-luxury overflow-hidden flex">
                    <div className={cn("w-2 h-full", camp.status === 'active' ? 'bg-green-500' : 'bg-gold')} />
                    <div className="flex-1 p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="text-xl font-headline font-bold italic">{camp.title}</h4>
                          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{camp.type}</p>
                        </div>
                        <Badge className={cn("text-[8px] uppercase tracking-widest", camp.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold')}>
                          {camp.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-8 border-y border-border py-6">
                        <div className="space-y-1">
                          <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">ROI Metric</span>
                          <p className="text-xs font-bold uppercase text-plum">{camp.roi}x Returns</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Target Market</span>
                          <p className="text-xs font-bold uppercase">{camp.market}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[9px] text-gray-400 italic">Duration: {camp.startDate} — {camp.endDate}</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><Edit3 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* SEGMENTS (CRM) */}
          {activeTab === 'segments' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Customer Segmentation</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Target specific connoisseur groups</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold tracking-widest uppercase">
                  <Plus className="w-4 h-4 mr-2" /> Define New Segment
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {customerSegments.map(seg => (
                  <Card key={seg.id} className="bg-white border-border shadow-luxury hover:border-gold transition-all group">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="p-4 bg-ivory rounded-full text-plum group-hover:bg-gold/10 transition-colors">
                          <Target className="w-6 h-6" />
                        </div>
                        <Badge variant="outline" className="text-[8px] uppercase tracking-widest">{seg.userCount.toLocaleString()} Users</Badge>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-headline font-bold italic">{seg.name}</h4>
                        <p className="text-[9px] text-gray-400 leading-relaxed italic">{seg.description}</p>
                      </div>
                      <div className="pt-6 border-t border-border flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-gray-400 uppercase font-bold">Avg Order</span>
                          <span className="text-xs font-bold text-plum">${seg.avgOrderValue.toLocaleString()}</span>
                        </div>
                        <div className="flex space-x-2">
                          {seg.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} className="text-[7px] bg-plum/5 text-plum uppercase tracking-tighter">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* COMMUNICATIONS (EMAIL/PUSH) */}
          {activeTab === 'communications' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-headline font-bold italic">Maison Communications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border flex flex-row items-center space-x-4">
                    <div className="p-3 bg-plum/5 text-plum rounded-sm"><Mail className="w-5 h-5" /></div>
                    <div>
                      <CardTitle className="text-sm uppercase tracking-widest">Email Ateliers</CardTitle>
                      <CardDescription className="text-[8px]">Curate newsletter and transactional broadcasts</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <div className="space-y-4">
                      <CommRow icon={<Edit3 />} label="Draft New Editorial" action={() => handleAction("Email editor opened.")} />
                      <CommRow icon={<Clock />} label="Scheduled Broadcasts (2)" action={() => handleAction("Opening schedule.")} />
                      <CommRow icon={<Users />} label="A/B Test Configurations" action={() => handleAction("Opening test suite.")} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border flex flex-row items-center space-x-4">
                    <div className="p-3 bg-gold/5 text-gold rounded-sm"><Smartphone className="w-5 h-5" /></div>
                    <div>
                      <CardTitle className="text-sm uppercase tracking-widest">Push Notifications</CardTitle>
                      <CardDescription className="text-[8px]">Direct artisanal alerts to mobile connoisseurs</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <div className="space-y-4">
                      <CommRow icon={<Bell />} label="Immediate Alert Draft" action={() => handleAction("Push editor opened.")} />
                      <CommRow icon={<Settings />} label="Automation Triggers" action={() => handleAction("Opening automation hub.")} />
                      <CommRow icon={<LayoutDashboard />} label="Engagement Metrics" action={() => handleAction("Opening push analytics.")} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* LOYALTY (POINTS/TIERS) */}
          {activeTab === 'loyalty' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-headline font-bold italic">Loyalty & Reward Architecture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <LoyaltyTierCard tier="Silver" pts="0 - 5,000" color="bg-slate-300" count={4200} benefit="Early Collection Access" />
                <LoyaltyTierCard tier="Gold" pts="5,001 - 15,000" color="bg-gold" count={1200} benefit="Complimentary White-Glove Shipping" />
                <LoyaltyTierCard tier="Diamond" pts="15,001+" color="bg-plum" count={450} benefit="Private Ateliers & Bespoke Concierge" />
              </div>
              
              <Card className="bg-white border-border shadow-luxury p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-headline font-bold italic">Automated Milestones</h3>
                  <Button variant="outline" className="border-border text-[9px] font-bold uppercase tracking-widest">Add Trigger</Button>
                </div>
                <div className="space-y-4">
                  <MilestoneRow label="Birthday Commemoration" desc="Gift selection + Personal note" active={true} />
                  <MilestoneRow label="Tier Progression Alert" desc="Exclusive invite to Private Salon" active={true} />
                  <MilestoneRow label="Heritage Anniversary" desc="10% Artifact Appreciation Code" active={false} />
                </div>
              </Card>
            </div>
          )}

          {/* ANALYTICS (ROI) */}
          {activeTab === 'analytics' && (
            <div className="py-40 text-center space-y-6">
              <RefreshCcw className="w-12 h-12 text-gold/30 mx-auto animate-spin-slow" />
              <p className="text-2xl text-muted-foreground font-light italic font-headline">The ROI Intelligence engine is processing the latest market conversions.</p>
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

function CommRow({ icon, label, action }: { icon: any, label: string, action: () => void }) {
  return (
    <button 
      onClick={action}
      className="w-full flex items-center justify-between p-4 bg-ivory/50 border border-border hover:border-plum transition-all group"
    >
      <div className="flex items-center space-x-4">
        <span className="text-gray-400 group-hover:text-plum">{React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">{label}</span>
      </div>
      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-plum" />
    </button>
  );
}

function LoyaltyTierCard({ tier, pts, color, count, benefit }: { tier: string, pts: string, color: string, count: number, benefit: string }) {
  return (
    <Card className="bg-white border-border shadow-luxury overflow-hidden">
      <div className={cn("h-1", color)} />
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <h4 className="text-2xl font-headline font-bold italic">{tier}</h4>
          <Badge variant="outline" className="text-[8px] uppercase">{pts} PTS</Badge>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
            <span className="text-gray-400">Total Connoisseurs</span>
            <span className="text-plum">{count.toLocaleString()}</span>
          </div>
          <div className="p-4 bg-ivory/50 rounded-sm">
            <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Primary Benefit</p>
            <p className="text-xs font-light italic">{benefit}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MilestoneRow({ label, desc, active }: { label: string, desc: string, active: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-sm">
      <div className="flex items-center space-x-4">
        <div className={cn("w-2 h-2 rounded-full", active ? "bg-green-500" : "bg-gray-200")} />
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
          <span className="text-[10px] text-gray-400 italic">{desc}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-[9px] uppercase font-bold tracking-widest text-plum">Configure</Button>
    </div>
  );
}
