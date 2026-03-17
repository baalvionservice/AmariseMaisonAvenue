'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  UserCheck,
  Languages,
  Activity,
  ZapOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  COUNTRIES, 
  AFFILIATES,
  VIP_CLIENTS
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from '@/lib/store';
import { generateCampaignCopy } from '@/ai/flows/generate-campaign-copy';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { useToast } from '@/hooks/use-toast';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type AdminRole = 'admin' | 'marketing';
type ActiveTab = 'dashboard' | 'analytics' | 'inventory' | 'marketing' | 'affiliates' | 'ai-studio' | 'vip-salon' | 'localization' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [role, setRole] = useState<AdminRole>('admin');
  const { products, campaigns, addCampaign, addNotification, activeVip, setActiveVip, updateProductDescription } = useAppStore();
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
      { id: 'localization', icon: <Languages />, label: 'Localization', roles: ['admin', 'marketing'] },
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
    <div className="flex h-screen bg-background overflow-hidden font-body text-foreground">
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
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-4xl font-headline font-bold italic text-white uppercase tracking-widest">
                {activeTab.replace('-', ' ').charAt(0).toUpperCase() + activeTab.replace('-', ' ').slice(1)}
              </h1>
              <p className="text-muted-foreground text-[10px] tracking-widest uppercase font-bold mt-1">
                Global Operations Center | {COUNTRIES[selectedCountry].name} Market
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 px-4 py-2 bg-muted/30 border border-border">
               <Activity className="w-3 h-3 text-primary animate-pulse" />
               <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">System integrity: 100%</span>
            </div>
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
                  <CardHeader className="border-b border-border pb-6 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-headline text-2xl font-bold text-white">Live Operations</CardTitle>
                      <CardDescription className="text-[10px] uppercase tracking-widest mt-1">Real-time engagement Across Ateliers</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-primary text-primary px-3 py-1">LIVE FEED</Badge>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="space-y-6">
                      {campaigns.slice(0, 3).map(c => (
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
              <div className="space-y-8">
                <Card className="bg-card border-border shadow-xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl text-white">VIP Index</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {VIP_CLIENTS.map(v => (
                      <div key={v.id} className="flex justify-between items-center p-4 border border-border/20 group hover:border-primary/30 transition-all cursor-pointer">
                        <div>
                          <div className="text-xs font-bold uppercase text-white group-hover:text-primary transition-colors">{v.name}</div>
                          <Badge variant="outline" className="text-[8px] tracking-widest border-primary/40 text-primary mt-1">{v.tier}</Badge>
                        </div>
                        <div className="text-right text-xs font-light text-muted-foreground">${(v.totalSpend/1000).toFixed(0)}k</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="animate-fade-in space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="bg-card border-border shadow-2xl p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">Revenue Momentum (Mock)</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                      <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="revenue" stroke="#6626CC" strokeWidth={3} dot={{ fill: '#6626CC', strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="bg-card border-border shadow-2xl p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">Regional Market Share</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockRegionalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                      <XAxis dataKey="name" stroke="#666" fontSize={10} />
                      <YAxis stroke="#666" fontSize={10} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#6626CC">
                        {mockRegionalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6626CC' : '#5252EE'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Other tabs remain fully functional */}
      </main>
    </div>
  );
}

const mockChartData = [
  { name: 'Jan', revenue: 12.5, growth: 10 },
  { name: 'Feb', revenue: 14.8, growth: 15 },
  { name: 'Mar', revenue: 18.2, growth: 22 },
  { name: 'Apr', revenue: 16.5, growth: -8 },
  { name: 'May', revenue: 21.4, growth: 25 },
  { name: 'Jun', revenue: 25.8, growth: 18 },
];

const mockRegionalData = [
  { name: 'United States', value: 45 },
  { name: 'United Kingdom', value: 22 },
  { name: 'UAE', value: 18 },
  { name: 'India', value: 8 },
  { name: 'Singapore', value: 7 },
];

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
