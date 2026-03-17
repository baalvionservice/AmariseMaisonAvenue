
'use client';

import React, { useState } from 'react';
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
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PRODUCTS, REVIEWS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card p-8 flex flex-col space-y-12 shadow-2xl z-20">
        <div className="font-headline text-3xl font-bold tracking-tighter">
          AMARISÉ <span className="text-primary text-xs font-normal tracking-[0.4em] ml-2">ADMIN</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon={<BarChart3 />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Package />} label="Inventory" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
          <NavItem icon={<Layers />} label="Collections" active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} />
          <NavItem icon={<ShoppingBag />} label="Global Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <NavItem icon={<Users />} label="VIP Clientele" active={activeTab === 'clients'} onClick={() => setActiveTab('clients')} />
          <NavItem icon={<TrendingUp />} label="Market Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <div className="pt-8 mt-8 border-t border-border">
            <NavItem icon={<Settings />} label="System Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </div>
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
            <h1 className="text-4xl font-headline font-bold italic">Atelier Overview</h1>
            <p className="text-muted-foreground text-sm tracking-widest uppercase font-bold mt-1">Status: Operational | Global Region: Multi</p>
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
              <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-widest">Director Vandervilt</div>
                <div className="text-[10px] text-primary uppercase tracking-widest">Senior Curator</div>
              </div>
              <div className="w-12 h-12 rounded-none bg-primary flex items-center justify-center font-headline text-2xl font-bold italic">V</div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard icon={<DollarSign className="text-primary" />} label="Market Revenue" value="$2.4M" trend="+12.4%" positive />
          <StatCard icon={<ShoppingBag className="text-secondary" />} label="VIP Requests" value="148" trend="+3.2%" positive />
          <StatCard icon={<Users className="text-accent" />} label="New Diamond Tier" value="12" trend="-1.5%" positive={false} />
          <StatCard icon={<TrendingUp className="text-primary" />} label="Market Sentiment" value="Exquisite" trend="Stable" positive />
        </div>

        {/* Main Content Sections based on Active Tab */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <Card className="bg-card border-border shadow-2xl rounded-none">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-6">
                <div>
                  <CardTitle className="font-headline text-3xl font-bold">Heritage Movement</CardTitle>
                  <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold mt-2">Active piece performance across global hubs</CardDescription>
                </div>
                <Button variant="ghost" className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-primary/10">Full Audit <ArrowUpRight className="ml-2 w-3 h-3" /></Button>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-6">
                  {PRODUCTS.slice(0, 5).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-6 bg-muted/20 hover:bg-muted/40 transition-all border border-transparent hover:border-primary/20 group">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-20 bg-muted relative overflow-hidden">
                           <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div>
                          <div className="font-headline text-xl font-bold">{p.name}</div>
                          <div className="flex items-center space-x-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                            <span>{p.category}</span>
                            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                            <span>Stock: 12 Units</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-light text-xl">${p.basePrice.toLocaleString()}</div>
                        <div className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold flex items-center justify-end mt-1">
                          Performance: Exceptional <TrendingUp className="w-3 h-3 ml-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border rounded-none shadow-2xl">
              <CardHeader className="border-b border-border pb-6">
                <CardTitle className="font-headline text-3xl font-bold">Recent Appraisals</CardTitle>
                <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Client feedback from verified global ateliers</CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {REVIEWS.map(rev => (
                    <div key={rev.id} className="p-6 bg-muted/20 border border-border/50 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex text-primary">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-3 h-3", i < rev.rating ? "fill-current" : "text-muted-foreground")} />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{rev.date}</span>
                      </div>
                      <p className="text-sm font-light text-muted-foreground italic leading-relaxed">"{rev.comment}"</p>
                      <div className="text-[10px] font-bold uppercase tracking-widest pt-2 border-t border-border/50">— {rev.userName}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-12">
            <Card className="bg-card border-border rounded-none shadow-2xl">
              <CardHeader className="border-b border-border pb-6">
                <CardTitle className="font-headline text-2xl font-bold">Global Hub Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-8">
                <MarketStat label="North America" percent={42} color="bg-primary" />
                <MarketStat label="Middle East (UAE)" percent={28} color="bg-secondary" />
                <MarketStat label="European Union" percent={18} color="bg-accent" />
                <MarketStat label="Asia Pacific" percent={12} color="bg-blue-400" />
              </CardContent>
            </Card>

            <Card className="bg-primary text-white rounded-none border-none shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-1000" />
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <Globe className="w-5 h-5" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Private Salon</span>
                </div>
                <CardTitle className="font-headline text-3xl font-bold italic">VIP Concierge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <p className="text-sm opacity-90 leading-relaxed font-light">
                  There are <span className="font-bold underline">14 pending</span> bespoke consultation requests from Diamond tier clients in the UAE and Singapore.
                </p>
                <Button variant="secondary" className="w-full h-14 rounded-none text-xs font-bold tracking-[0.3em] uppercase bg-white text-primary hover:bg-gray-100">
                  MANAGE REQUESTS
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border rounded-none shadow-2xl overflow-hidden">
               <div className="relative h-64 w-full">
                  <Image src="https://picsum.photos/seed/admin-editorial/800/800" alt="Atelier" fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-primary text-[10px] font-bold tracking-widest uppercase mb-1 block">Live Feed</span>
                    <h4 className="text-xl font-headline font-bold italic">Paris Atelier Status</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Master artisan LeFleur currently on floor.</p>
                  </div>
               </div>
            </Card>
          </div>
        </div>
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
