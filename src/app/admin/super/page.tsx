'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, 
  ShieldCheck, 
  LayoutDashboard, 
  Settings, 
  Briefcase, 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  RefreshCcw,
  Power,
  CreditCard,
  Target,
  BarChart3,
  Building2,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function SuperAdminHub() {
  const { 
    countryConfigs, 
    brandConfigs, 
    activeBrandId, 
    setCountryEnabled, 
    updateCountryConfig,
    privateInquiries,
    invoices
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'global' | 'countries' | 'brands' | 'infrastructure'>('global');

  const globalTotalRevenue = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const globalLeads = privateInquiries.length;

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            MAISON <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">CORE</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Infrastructure Command</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <SuperNavItem icon={<LayoutDashboard />} label="Global Pulse" active={activeTab === 'global'} onClick={() => setActiveTab('global')} />
          <SuperNavItem icon={<Globe />} label="Country Matrix" active={activeTab === 'countries'} onClick={() => setActiveTab('countries')} />
          <SuperNavItem icon={<Briefcase />} label="Brand Registry" active={activeTab === 'brands'} onClick={() => setActiveTab('brands')} />
          <SuperNavItem icon={<Settings />} label="System Config" active={activeTab === 'infrastructure'} onClick={() => setActiveTab('infrastructure')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Regional Admin
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">Command Center</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Multi-Country Luxury Orchestration</p>
          </div>
          <div className="flex items-center space-x-4">
             <Badge className="bg-plum text-white text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-none">Super Admin Access</Badge>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {activeTab === 'global' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <GlobalStat icon={<TrendingUp />} label="Aggregate Rev" value={`$${(globalTotalRevenue / 1000).toFixed(1)}k`} trend="Live" />
                <GlobalStat icon={<Users />} label="Global Leads" value={globalLeads.toString()} trend="+4 Today" />
                <GlobalStat icon={<ShieldCheck />} label="Compliance" value="100%" trend="Optimal" />
                <GlobalStat icon={<Globe />} label="Active Hubs" value={countryConfigs.filter(c => c.enabled).length.toString()} trend="Global" />
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-headline text-2xl">Regional Distribution</CardTitle>
                  <CardDescription className="text-[10px] uppercase tracking-widest">Market health and participation</CardDescription>
                </CardHeader>
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Market Hub</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Currency</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Strategy</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {countryConfigs.map(country => (
                      <TableRow key={country.code} className="hover:bg-ivory/30">
                        <TableCell className="pl-8 font-bold text-xs uppercase tracking-widest">{country.code} Hub</TableCell>
                        <TableCell className="text-xs font-light">{country.currency} ({country.symbol})</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest">{country.messagingStrategy}</Badge></TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            checked={country.enabled} 
                            onCheckedChange={(val) => setCountryEnabled(country.code, val)} 
                          />
                        </TableCell>
                        <TableCell className="text-right pr-8">
                           <div className="flex items-center justify-end space-x-2">
                              <span className="text-[10px] font-bold text-gold">High Engagement</span>
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                           </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </>
          )}

          {activeTab === 'countries' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {countryConfigs.map(country => (
                <Card key={country.code} className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border flex flex-row justify-between items-center bg-ivory/20">
                    <div className="space-y-1">
                      <CardTitle className="font-headline text-xl uppercase tracking-widest">{country.code.toUpperCase()} Configuration</CardTitle>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Market-Specific Logic</p>
                    </div>
                    <Badge variant={country.enabled ? 'default' : 'outline'} className={cn(country.enabled ? "bg-plum" : "")}>
                      {country.enabled ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                       <ConfigField label="Currency Hub" value={country.currency} />
                       <ConfigField label="Price Model" value={country.pricingVisibility} />
                       <ConfigField label="Outreach" value={country.messagingStrategy} />
                       <ConfigField label="Localization" value={country.locale} />
                    </div>
                    <div className="pt-6 border-t border-border">
                       <Button variant="outline" className="w-full h-10 border-border text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white">
                         Edit Region Overrides
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'brands' && (
            <div className="space-y-8">
               <div className="flex justify-between items-end mb-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-headline font-bold italic">Brand Registry</h2>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Manage the multi-brand architecture</p>
                  </div>
                  <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold uppercase tracking-widest">
                    REGISTER NEW MAISON
                  </Button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {brandConfigs.map(brand => (
                    <Card key={brand.id} className="bg-white border-border shadow-luxury group hover:border-plum transition-all">
                       <CardHeader className="border-b border-border bg-ivory/10">
                          <CardTitle className="font-headline text-xl uppercase tracking-tighter truncate">{brand.name}</CardTitle>
                          <CardDescription className="text-[9px] font-mono uppercase">{brand.domain}</CardDescription>
                       </CardHeader>
                       <CardContent className="p-8 space-y-6">
                          <div className="flex justify-between items-center">
                             <div className="flex space-x-2">
                                <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: brand.theme.primary }} />
                                <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: brand.theme.accent }} />
                             </div>
                             <Badge variant={brand.enabled ? 'default' : 'outline'}>{brand.enabled ? 'LIVE' : 'DORMANT'}</Badge>
                          </div>
                          <Button variant="ghost" className="w-full h-10 text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-plum">
                            Enter Identity Hub <ChevronRight className="w-3 h-3 ml-2" />
                          </Button>
                       </CardContent>
                    </Card>
                  ))}
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SuperNavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border",
        active ? "bg-plum text-white border-plum shadow-md" : "text-gray-400 hover:bg-ivory hover:text-plum border-transparent"
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

function GlobalStat({ icon, label, value, trend }: { icon: any, label: string, value: string, trend: string }) {
  return (
    <Card className="bg-white border-border shadow-luxury hover:border-gold transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-ivory rounded-full group-hover:bg-gold/10 transition-colors text-plum">{icon}</div>
          <div className="text-[10px] font-bold tracking-widest uppercase text-gold">{trend}</div>
        </div>
        <div>
          <div className="text-gray-400 text-[10px] uppercase tracking-[0.4em] font-bold">{label}</div>
          <div className="text-4xl font-headline font-bold italic mt-2 text-gray-900">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function ConfigField({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
      <p className="text-xs font-bold uppercase text-gray-900">{value}</p>
    </div>
  );
}
