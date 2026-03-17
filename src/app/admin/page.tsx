'use client';

import React from 'react';
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
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from '@/lib/mock-data';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-6 flex flex-col space-y-10">
        <div className="font-headline text-2xl font-bold tracking-tighter">
          AMARISÉ <span className="text-primary text-sm font-normal">ADMIN</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon={<BarChart3 className="w-4 h-4" />} label="Dashboard" active />
          <NavItem icon={<Package className="w-4 h-4" />} label="Products" />
          <NavItem icon={<Layers className="w-4 h-4" />} label="Collections" />
          <NavItem icon={<ShoppingBag className="w-4 h-4" />} label="Orders" />
          <NavItem icon={<Users className="w-4 h-4" />} label="VIP Clients" />
          <NavItem icon={<TrendingUp className="w-4 h-4" />} label="Analytics" />
          <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
        </nav>

        <div className="pt-10 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3" /> Exit Admin
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 space-y-10">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-headline font-bold">Executive Overview</h1>
            <p className="text-muted-foreground text-sm">Good morning, Atelier Director.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full"><Search className="w-4 h-4" /></Button>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<DollarSign className="text-primary" />} label="Monthly Revenue" value="$428,500" trend="+12.4%" />
          <StatCard icon={<ShoppingBag className="text-secondary" />} label="Active Orders" value="1,284" trend="+3.2%" />
          <StatCard icon={<Users className="text-purple-400" />} label="New VIPs" value="48" trend="+18.5%" />
          <StatCard icon={<TrendingUp className="text-green-400" />} label="Avg. Order Value" value="$2,450" trend="+5.7%" />
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-xl">Recent Product Performance</CardTitle>
                  <CardDescription>Top moving pieces this week across all markets.</CardDescription>
                </div>
                <Button variant="link" size="sm" className="text-primary text-xs tracking-widest uppercase">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {PRODUCTS.slice(0, 5).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-muted relative rounded-sm overflow-hidden">
                           {/* img removed */}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{p.name}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{p.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">${p.basePrice.toLocaleString()}</div>
                        <div className="text-[10px] text-green-400 uppercase tracking-widest">+15 Sales</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Market Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <MarketStat label="USA" percent={45} color="bg-primary" />
                <MarketStat label="UAE" percent={25} color="bg-secondary" />
                <MarketStat label="UK" percent={15} color="bg-purple-400" />
                <MarketStat label="Singapore" percent={10} color="bg-blue-400" />
                <MarketStat label="India" percent={5} color="bg-gray-400" />
              </CardContent>
            </Card>

            <Card className="bg-primary text-white border-none">
              <CardHeader>
                <CardTitle className="font-headline text-xl">VIP Concierge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs opacity-90 leading-relaxed">You have 12 pending personalized consultation requests from UAE Diamond tier clients.</p>
                <Button variant="secondary" className="w-full text-xs font-bold tracking-widest uppercase">Manage Requests</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all",
      active ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-muted hover:text-foreground"
    )}>
      {icon}
      <span>{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <Card className="bg-card">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-muted rounded-lg">{icon}</div>
          <span className="text-xs text-green-400 font-bold">{trend}</span>
        </div>
        <div>
          <div className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">{label}</div>
          <div className="text-2xl font-headline font-bold mt-1">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function MarketStat({ label, percent, color }: { label: string, percent: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold tracking-widest uppercase">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div className={cn("h-full", color)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
