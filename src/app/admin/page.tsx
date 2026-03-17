
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  Settings, 
  DollarSign, 
  Package,
  LogOut,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Zap,
  Target,
  Briefcase,
  Globe,
  Database,
  Sparkles,
  RefreshCcw,
  LayoutDashboard,
  Clock,
  Crown,
  Star,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  COUNTRIES, 
  AFFILIATES 
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from '@/lib/store';
import { generateCampaignCopy } from '@/ai/flows/generate-campaign-copy';
import { useToast } from '@/hooks/use-toast';

type AdminRole = 'admin' | 'marketing';
type ActiveTab = 'dashboard' | 'analytics' | 'inventory' | 'marketing' | 'affiliates' | 'ai-studio' | 'vip-salon' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [role, setRole] = useState<AdminRole>('admin');
  const { products, campaigns, addCampaign, addNotification, vipClients, activeVip, setActiveVip } = useAppStore();
  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('us');

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    type: 'email' as 'email' | 'push',
    product: products[0]?.id || '',
    subject: '',
    body: ''
  });

  const filteredNavItems = useMemo(() => {
    const items = [
      { id: 'dashboard', icon: <LayoutDashboard />, label: 'Overview', roles: ['admin', 'marketing'] },
      { id: 'analytics', icon: <BarChart3 />, label: 'Insights', roles: ['admin', 'marketing'] },
      { id: 'inventory', icon: <Package />, label: 'Inventory', roles: ['admin'] },
      { id: 'vip-salon', icon: <Crown />, label: 'VIP Salon', roles: ['admin', 'marketing'] },
      { id: 'ai-studio', icon: <Sparkles />, label: 'AI Studio', roles: ['admin', 'marketing'] },
      { id: 'marketing', icon: <Target />, label: 'Marketing', roles: ['admin', 'marketing'] },
      { id: 'affiliates', icon: <Briefcase />, label: 'Partners', roles: ['admin', 'marketing'] },
      { id: 'settings', icon: <Settings />, label: 'System', roles: ['admin'] },
    ];
    return items.filter(item => item.roles.includes(role));
  }, [role]);

  const handleSuggestCopy = async () => {
    const prod = products.find(p => p.id === newCampaign.product);
    if (!prod) return;
    
    setIsGenerating(true);
    try {
      const res = await generateCampaignCopy({
        campaignType: newCampaign.type,
        productName: prod.name,
        category: prod.category,
        country: COUNTRIES[selectedCountry].name
      });
      setNewCampaign(prev => ({
        ...prev,
        subject: res.subjectLine,
        body: res.bodyText
      }));
      toast({ title: "AI Copy Ready", description: "Localized luxury copy has been crafted." });
    } catch (e) {
      toast({ variant: "destructive", title: "Copy Engine Offline" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLaunchCampaign = () => {
    const campaign: any = {
      id: 'cmp-' + Date.now(),
      title: newCampaign.title,
      type: newCampaign.type,
      status: 'scheduled',
      reach: 0,
      engagement: 0,
      country: selectedCountry,
      performance: 0,
      subject: newCampaign.subject,
      body: newCampaign.body,
      scheduledAt: new Date(Date.now() + 86400000).toISOString()
    };
    addCampaign(campaign);
    addNotification({
      id: 'not-' + Date.now(),
      type: newCampaign.type === 'email' ? 'Email' : 'Push',
      subject: newCampaign.subject,
      recipients: 'Global Client List',
      scheduledAt: campaign.scheduledAt,
      status: 'Queued'
    });
    toast({ title: "Campaign Scheduled", description: `${newCampaign.title} is queued for ${COUNTRIES[selectedCountry].name}.` });
    setNewCampaign({ title: '', type: 'email', product: products[0].id, subject: '', body: '' });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      <aside className="w-72 border-r border-border bg-card p-8 flex flex-col space-y-12 shadow-2xl z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-white">
            AMARISÉ <span className="text-primary text-xs font-normal tracking-[0.4em] ml-2">ADMIN</span>
          </div>
          <div className="flex items-center space-x-2 bg-muted/50 p-2 border border-border">
             <UserCheck className="w-3 h-3 text-primary" />
             <select 
               className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none w-full cursor-pointer text-white"
               value={role}
               onChange={(e) => setRole(e.target.value as AdminRole)}
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

      <main className="flex-1 overflow-y-auto p-12 space-y-12">
        <header className="flex justify-between items-center bg-card/50 luxury-blur p-6 -m-6 mb-6 border-b border-border sticky top-0 z-10">
          <div>
            <h1 className="text-4xl font-headline font-bold italic text-white uppercase tracking-widest">
              {activeTab.replace('-', ' ').charAt(0).toUpperCase() + activeTab.replace('-', ' ').slice(1)}
            </h1>
            <p className="text-muted-foreground text-[10px] tracking-widest uppercase font-bold mt-1">
              Global Operations Center | {COUNTRIES[selectedCountry].name} Market
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative group">
               <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
               <select 
                 className="bg-muted/30 border border-border h-12 pl-10 pr-8 text-[10px] tracking-widest uppercase font-bold outline-none appearance-none cursor-pointer text-white"
                 value={selectedCountry}
                 onChange={(e) => setSelectedCountry(e.target.value)}
               >
                 {Object.entries(COUNTRIES).map(([code, c]) => (
                   <option key={code} value={code}>{c.name}</option>
                 ))}
               </select>
            </div>
            <div className="w-12 h-12 bg-primary flex items-center justify-center font-headline text-2xl font-bold italic text-white shadow-lg">A</div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="animate-fade-in space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard icon={<DollarSign className="text-primary" />} label="Market Revenue" value="$42.8M" trend="+18.4%" positive />
              <StatCard icon={<Star className="text-secondary" />} label="VIP Retention" value="98.2%" trend="Stable" positive />
              <StatCard icon={<Database className="text-accent" />} label="Entity Load" value={products.length.toString()} trend="High" positive />
              <StatCard icon={<Globe className="text-primary" />} label="Global Reach" value="2.4M" trend="+12.2%" positive />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <Card className="bg-card border-border shadow-2xl">
                  <CardHeader className="border-b border-border pb-6">
                    <CardTitle className="font-headline text-2xl font-bold text-white">Active Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="space-y-4">
                      {campaigns.map(c => (
                        <div key={c.id} className="flex items-center justify-between p-6 bg-muted/20 border border-border/20 group hover:border-primary/40 transition-all">
                          <div className="flex items-center space-x-6">
                            <div className={cn("p-4", c.type === 'email' ? 'bg-primary/10' : 'bg-secondary/10')}>
                               {c.type === 'email' ? <Mail className="w-5 h-5 text-primary" /> : <Zap className="w-5 h-5 text-secondary" />}
                            </div>
                            <div>
                              <div className="font-headline text-xl font-bold text-white">{c.title}</div>
                              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                                {c.status} | {COUNTRIES[c.country]?.name}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] font-bold uppercase tracking-widest text-primary">{c.performance}% Impact</div>
                             <Progress value={c.performance} className="w-24 h-1 mt-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-headline text-2xl text-white">Partner Index</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {AFFILIATES.map(a => (
                    <div key={a.id} className="flex justify-between items-center p-4 border border-border/20">
                      <div>
                        <div className="text-xs font-bold uppercase text-white">{a.name}</div>
                        <Badge variant="outline" className="text-[8px] tracking-widest border-primary/40 text-primary mt-1">{a.tier}</Badge>
                      </div>
                      <div className="text-right text-xs font-light text-white">${(a.salesGenerated/1000).toFixed(0)}k</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'vip-salon' && (
          <div className="animate-fade-in space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="bg-card border-border shadow-2xl overflow-hidden">
                <CardHeader className="bg-primary/10 border-b border-primary/20 p-8">
                  <CardTitle className="font-headline text-3xl font-bold text-white flex items-center">
                    <Crown className="w-8 h-8 mr-4 text-primary" /> Private Client Roster
                  </CardTitle>
                  <CardDescription className="text-primary text-[10px] uppercase tracking-widest font-bold">Manage elite tiers & access</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {vipClients.map(client => (
                      <div 
                        key={client.id} 
                        className={cn(
                          "p-8 flex items-center justify-between group transition-all cursor-pointer hover:bg-muted/30",
                          activeVip?.id === client.id && "bg-primary/5 border-l-4 border-l-primary"
                        )}
                        onClick={() => setActiveVip(client)}
                      >
                        <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-muted border border-border flex items-center justify-center font-headline text-2xl font-bold text-muted-foreground">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white">{client.name}</h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <Badge className={cn(
                                "text-[8px] uppercase tracking-widest",
                                client.tier === 'Bespoke' ? "bg-primary" : client.tier === 'Platinum' ? "bg-secondary" : "bg-muted"
                              )}>
                                {client.tier}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground uppercase">{client.email}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-light text-white">${(client.totalSpend / 1000).toFixed(0)}k Spend</div>
                          <div className="text-[9px] text-muted-foreground uppercase mt-1">Last Active: {client.lastActive}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {activeVip ? (
                <div className="space-y-12">
                  <Card className="bg-card border-border border-t-4 border-t-primary animate-fade-in">
                    <CardHeader className="p-8 border-b border-border">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-3xl font-headline font-bold text-white">Simulation: {activeVip.name}</CardTitle>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Active Prototype Context</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setActiveVip(null)} className="text-[10px] tracking-widest uppercase border-border hover:bg-muted">
                          Switch Client
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-10">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="p-6 bg-muted/20 border border-border space-y-2">
                           <span className="text-[9px] uppercase tracking-widest text-primary font-bold">Market Hub</span>
                           <p className="text-lg font-headline text-white">{COUNTRIES[activeVip.country]?.name}</p>
                        </div>
                        <div className="p-6 bg-muted/20 border border-border space-y-2">
                           <span className="text-[9px] uppercase tracking-widest text-primary font-bold">Privé Tier</span>
                           <p className="text-lg font-headline text-white">{activeVip.tier}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-[10px] uppercase tracking-widest font-bold text-white flex items-center">
                          <Sparkles className="w-3 h-3 mr-2 text-primary" /> Exclusive Access Config
                        </h5>
                        <div className="space-y-4">
                          {activeVip.assignedCollections.map(colId => (
                            <div key={colId} className="p-4 bg-muted/30 border border-primary/20 flex justify-between items-center group">
                               <span className="text-xs font-bold text-white uppercase italic">{colId.replace('-', ' ')}</span>
                               <ShieldCheck className="w-4 h-4 text-primary" />
                            </div>
                          ))}
                          <Button variant="ghost" className="w-full h-12 border border-dashed border-border text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary hover:border-primary">
                             + Assign Private Collection
                          </Button>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-border">
                         <div className="p-6 bg-primary/5 border border-primary/20 text-center space-y-4">
                            <p className="text-[11px] text-muted-foreground italic">
                              "This simulation will update the storefront for the active session to reflect {activeVip.name}'s personalized experience."
                            </p>
                            <Link href={`/${activeVip.country}`}>
                               <Button className="w-full h-14 bg-primary hover:bg-secondary text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                                  PREVIEW AS {activeVip.name.toUpperCase()}
                               </Button>
                            </Link>
                         </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold uppercase tracking-widest text-white">VIP Performance Analytics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest">
                          <span className="text-muted-foreground">Portfolio Appreciation</span>
                          <span className="text-primary">+24.2%</span>
                        </div>
                        <Progress value={74} className="h-1 bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest">
                          <span className="text-muted-foreground">Engagement Depth</span>
                          <span className="text-secondary">High</span>
                        </div>
                        <Progress value={92} className="h-1 bg-muted" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-20 bg-muted/10 border border-dashed border-border">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-muted border border-border flex items-center justify-center mx-auto">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-headline font-bold text-white">Client Not Selected</h4>
                      <p className="text-xs text-muted-foreground max-w-xs mx-auto">Select a private client from the roster to configure their artisanal experience.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="animate-fade-in space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="bg-card border-border shadow-2xl">
                <CardHeader className="border-b border-border pb-6">
                  <CardTitle className="font-headline text-3xl font-bold text-white flex items-center">
                    <Target className="w-6 h-6 mr-3 text-primary" /> Global Studio
                  </CardTitle>
                  <CardDescription className="text-[10px] uppercase tracking-widest">Orchestrate localized luxury campaigns</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-widest">Internal Title</Label>
                      <Input 
                        value={newCampaign.title}
                        onChange={(e) => setNewCampaign(prev => ({...prev, title: e.target.value}))}
                        className="bg-muted/30 border-border h-12 text-sm text-white" 
                        placeholder="e.g., Heritage Autumn Launch" 
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase tracking-widest">Medium</Label>
                      <select 
                        className="w-full bg-muted/30 border border-border h-12 px-4 text-sm text-white outline-none"
                        value={newCampaign.type}
                        onChange={(e) => setNewCampaign(prev => ({...prev, type: e.target.value as any}))}
                      >
                        <option value="email">Luxury Email</option>
                        <option value="push">Mobile Concierge (Push)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase tracking-widest">Hero Selection</Label>
                    <select 
                      className="w-full bg-muted/30 border border-border h-12 px-4 text-sm text-white outline-none"
                      value={newCampaign.product}
                      onChange={(e) => setNewCampaign(prev => ({...prev, product: e.target.value}))}
                    >
                      {products.slice(0, 20).map(p => (
                        <option key={p.id} value={p.id}>{p.name} — {p.category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-border/20">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] uppercase tracking-widest text-primary">Artisanal Copy (AI)</Label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[10px] tracking-widest uppercase hover:text-primary"
                        onClick={handleSuggestCopy}
                        disabled={isGenerating}
                      >
                        {isGenerating ? <RefreshCcw className="w-3 h-3 animate-spin mr-2" /> : <Sparkles className="w-3 h-3 mr-2" />}
                        Craft Narrative
                      </Button>
                    </div>
                    <Input 
                      value={newCampaign.subject}
                      onChange={(e) => setNewCampaign(prev => ({...prev, subject: e.target.value}))}
                      className="bg-muted/30 border-border h-12 text-sm text-white italic" 
                      placeholder="Subject Line..." 
                    />
                    <textarea 
                      value={newCampaign.body}
                      onChange={(e) => setNewCampaign(prev => ({...prev, body: e.target.value}))}
                      className="w-full bg-muted/30 border border-border p-6 text-sm text-white font-light italic h-32 outline-none"
                      placeholder="Narrative Body..."
                    />
                  </div>

                  <Button 
                    className="w-full h-16 bg-primary hover:bg-secondary text-white text-[10px] font-bold tracking-[0.3em] uppercase"
                    onClick={handleLaunchCampaign}
                  >
                    DEPLOY TO {COUNTRIES[selectedCountry].name} HUB
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-12">
                <Card className="bg-card border-border shadow-2xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl text-white">Preview Lab</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 flex justify-center">
                    {newCampaign.type === 'push' ? (
                      <div className="w-64 h-[450px] bg-black rounded-[3rem] border-4 border-muted/50 p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-2xl z-10" />
                        <div className="mt-20 space-y-4 animate-fade-in">
                          <div className="bg-white/10 luxury-blur rounded-2xl p-4 border border-white/5 space-y-2">
                             <div className="flex justify-between items-center">
                               <div className="flex items-center space-x-2">
                                 <div className="w-4 h-4 bg-primary flex items-center justify-center text-[6px] font-bold">A</div>
                                 <span className="text-[8px] font-bold text-white/60">AMARISÉ</span>
                               </div>
                               <span className="text-[8px] text-white/40">Now</span>
                             </div>
                             <div className="text-[10px] font-bold text-white">{newCampaign.subject || "Luxury Awaits"}</div>
                             <div className="text-[9px] text-white/80 line-clamp-2 italic">{newCampaign.body || "A bespoke notification for the discerning individual."}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full max-w-md aspect-[3/4] bg-white text-black p-10 space-y-8 shadow-2xl overflow-hidden">
                        <div className="text-center font-headline text-2xl tracking-tighter border-b border-black/10 pb-4">AMARISÉ <span className="text-gray-400 font-normal text-sm">LUXE</span></div>
                        <div className="space-y-4 text-center">
                          <h4 className="text-xl font-headline italic">{newCampaign.subject || "Your Private Invitation"}</h4>
                          <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-widest italic">Artisanal Visual</div>
                          <p className="text-xs font-light leading-relaxed italic text-gray-600">
                            {newCampaign.body || "We invite you to experience the pinnacle of global craft, tailored exclusively for our clients."}
                          </p>
                          <div className="pt-6">
                            <div className="inline-block bg-black text-white px-8 py-3 text-[8px] font-bold tracking-widest uppercase">Explore Gallery</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
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
          <div className="text-4xl font-headline font-bold italic mt-2 text-white">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
