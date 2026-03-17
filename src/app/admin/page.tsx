
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
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
  Crown,
  Share2,
  BookOpen,
  Activity,
  UserCheck,
  Languages
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  COUNTRIES, 
  VIP_CLIENTS 
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from '@/lib/store';
import { generateEditorialContent } from '@/ai/flows/generate-editorial-content';
import { useToast } from '@/hooks/use-toast';

type AdminRole = 'admin' | 'marketing';
type ActiveTab = 'dashboard' | 'analytics' | 'inventory' | 'marketing' | 'affiliates' | 'ai-studio' | 'vip-salon' | 'localization' | 'storytelling' | 'engagement' | 'settings';

/**
 * AdminDashboard: Redesigned for the Light/Elegant luxury theme.
 */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [role, setRole] = useState<AdminRole>('admin');
  const { products, campaigns, activeVip, editorials, addEditorial, socialMetrics, socialInteractions, simulateGlobalEngagement } = useAppStore();
  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('us');

  const currentCountry = COUNTRIES[selectedCountry] || COUNTRIES.us;

  const [editorialDraft, setEditorialDraft] = useState({
    topic: '',
    category: 'Artisanal' as any,
    isVip: false,
    title: '',
    excerpt: '',
    content: ''
  });

  const filteredNavItems = useMemo(() => {
    const items = [
      { id: 'dashboard', icon: <LayoutDashboard />, label: 'Overview', roles: ['admin', 'marketing'] },
      { id: 'analytics', icon: <BarChart3 />, label: 'Insights', roles: ['admin', 'marketing'] },
      { id: 'engagement', icon: <Share2 />, label: 'Social Index', roles: ['admin', 'marketing'] },
      { id: 'inventory', icon: <Package />, label: 'Inventory', roles: ['admin'] },
      { id: 'vip-salon', icon: <Crown />, label: 'VIP Salon', roles: ['admin', 'marketing'] },
      { id: 'ai-studio', icon: <Sparkles />, label: 'AI Studio', roles: ['admin', 'marketing'] },
      { id: 'storytelling', icon: <BookOpen />, label: 'Storytelling', roles: ['admin', 'marketing'] },
      { id: 'marketing', icon: <Target />, label: 'Marketing', roles: ['admin', 'marketing'] },
      { id: 'localization', icon: <Languages />, label: 'Localization', roles: ['admin', 'marketing'] },
      { id: 'affiliates', icon: <Briefcase />, label: 'Partners', roles: ['admin', 'marketing'] },
      { id: 'settings', icon: <Settings />, label: 'System', roles: ['admin'] },
    ];
    return items.filter(item => item.roles.includes(role));
  }, [role]);

  const handleSimulateViral = (productId: string) => {
    simulateGlobalEngagement(productId);
    toast({
      title: "Viral Event Triggered",
      description: `Simulating high-volume engagement for ${products.find(p => p.id === productId)?.name}.`,
    });
  };

  const handleGenerateEditorial = async () => {
    if (!editorialDraft.topic) return;
    setIsGenerating(true);
    try {
      const res = await generateEditorialContent({
        topic: editorialDraft.topic,
        category: editorialDraft.category,
        country: currentCountry.name,
        isVip: editorialDraft.isVip
      });
      setEditorialDraft(prev => ({
        ...prev,
        title: res.title,
        excerpt: res.excerpt,
        content: res.content
      }));
      toast({ title: "Editorial Crafted", description: "The Maison narrative is ready for review." });
    } catch (e) {
      toast({ variant: "destructive", title: "Atelier Offline", description: "Could not generate storytelling." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishEditorial = () => {
    const newEd: any = {
      id: 'ed-' + Date.now(),
      title: editorialDraft.title,
      excerpt: editorialDraft.excerpt,
      content: editorialDraft.content,
      imageUrl: `https://picsum.photos/seed/${Date.now()}/1600/900`,
      category: editorialDraft.category,
      country: selectedCountry,
      author: 'Maison AI Curator',
      date: new Date().toISOString().split('T')[0],
      isVip: editorialDraft.isVip,
      featuredProducts: [products[0].id, products[1].id]
    };
    addEditorial(newEd);
    toast({ title: "Narrative Published", description: "The AMARISÉ Journal has been updated." });
    setEditorialDraft({ topic: '', category: 'Artisanal', isVip: false, title: '', excerpt: '', content: '' });
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">ADMIN</span>
          </div>
          <div className="flex items-center space-x-2 bg-ivory p-2 border border-border">
             <UserCheck className="w-3 h-3 text-gold" />
             <select 
               className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none w-full cursor-pointer text-gray-700"
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
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3 transition-transform group-hover:-translate-x-1" /> Exit to Maison
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 space-y-12 bg-ivory">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-6 -m-6 mb-6 border-b border-border sticky top-0 z-10">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              Atelier Command Hub | {currentCountry.name}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 px-4 py-2 bg-ivory border border-border">
               <Activity className="w-3 h-3 text-gold animate-pulse" />
               <span className="text-[9px] font-bold tracking-[0.3em] text-gray-500 uppercase">System Integrity: 100%</span>
            </div>
            <div className="relative">
               <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum" />
               <select 
                 className="bg-white border border-border h-10 pl-10 pr-8 text-[10px] tracking-widest uppercase font-bold outline-none appearance-none cursor-pointer text-gray-700"
                 value={selectedCountry}
                 onChange={(e) => setSelectedCountry(e.target.value)}
               >
                 {Object.entries(COUNTRIES).map(([code, c]) => (
                   <option key={code} value={code}>{c.name}</option>
                 ))}
               </select>
            </div>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">A</div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="animate-fade-in space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard icon={<DollarSign className="text-gold" />} label="Market Revenue" value="$42.8M" trend="+18.4%" positive />
              <StatCard icon={<Share2 className="text-plum" />} label="Social Sentiment" value="High" trend="+5.2%" positive />
              <StatCard icon={<Database className="text-gold" />} label="Entity Load" value={products.length.toString()} trend="Optimal" positive />
              <StatCard icon={<Globe className="text-plum" />} label="Global Reach" value="2.4M" trend="+12.2%" positive />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border pb-6 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-headline text-2xl font-bold text-gray-900">Live Operations</CardTitle>
                      <CardDescription className="text-[10px] uppercase tracking-widest mt-1">Real-time engagement across ateliers</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-gold text-gold px-3 py-1">LIVE FEED</Badge>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="space-y-6">
                      {campaigns.slice(0, 3).map(c => (
                        <div key={c.id} className="flex items-center justify-between p-6 bg-ivory border border-border hover:border-gold/40 transition-all rounded-sm group">
                          <div className="flex items-center space-x-6">
                            <div className={cn("p-4 rounded-full shadow-sm", c.type === 'email' ? 'bg-plum/5' : 'bg-gold/5')}>
                               {c.type === 'email' ? <Mail className="w-5 h-5 text-plum" /> : <Zap className="w-5 h-5 text-gold" />}
                            </div>
                            <div>
                              <div className="font-headline text-xl font-bold text-gray-900 group-hover:text-plum transition-colors">{c.title}</div>
                              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">
                                {c.status} | {COUNTRIES[c.country]?.name || 'Global'}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] font-bold uppercase tracking-widest text-gold">{c.performance}% Impact</div>
                             <Progress value={c.performance} className="w-24 h-1 mt-2 bg-gray-200" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-8">
                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl text-gray-900">VIP Index</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    {VIP_CLIENTS.map(v => (
                      <div key={v.id} className="flex justify-between items-center p-4 border border-border bg-ivory rounded-sm group hover:border-plum transition-all cursor-pointer">
                        <div>
                          <div className="text-xs font-bold uppercase text-gray-900 group-hover:text-plum transition-colors">{v.name}</div>
                          <Badge variant="outline" className="text-[8px] tracking-widest border-gold/40 text-gold mt-1">{v.tier}</Badge>
                        </div>
                        <div className="text-right text-xs font-light text-gray-400">${(v.totalSpend/1000).toFixed(0)}k</div>
                      </div>
                    ))}
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
        "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm",
        active 
          ? "bg-gold text-gray-900 shadow-md" 
          : "text-gray-400 hover:bg-ivory hover:text-plum border border-transparent hover:border-border"
      )}
    >
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-gray-900" : "text-gold")}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </span>
      <span>{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

function StatCard({ icon, label, value, trend, positive }: { icon: React.ReactNode, label: string, value: string, trend: string, positive: boolean }) {
  return (
    <Card className="bg-white border-border shadow-luxury hover:border-gold transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-ivory rounded-full group-hover:bg-gold/10 transition-colors">{icon}</div>
          <div className={cn(
            "flex items-center text-xs font-bold tracking-widest",
            positive ? "text-gold" : "text-destructive"
          )}>
            {trend} {positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
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
