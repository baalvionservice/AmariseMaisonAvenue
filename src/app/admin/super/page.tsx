'use client';

import React, { useState, useMemo } from 'react';
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
  Users,
  Box,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Search,
  Activity,
  History,
  Lock,
  ArrowRight,
  ShieldAlert,
  Download,
  Filter
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
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { SyncCategory, CountryCode } from '@/lib/types';

export default function SuperAdminHub() {
  const { 
    countryConfigs, 
    brandConfigs, 
    activeBrandId, 
    setCountryEnabled, 
    updateCountryConfig,
    privateInquiries,
    invoices,
    products,
    syncGlobalProducts,
    scopedErrors,
    qaTests,
    globalSyncHistory,
    executeSafeSync,
    rollbackGlobalSync,
    currentUser
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'global' | 'countries' | 'brands' | 'sync' | 'infrastructure'>('global');
  const [isSyncModalOpen, setIsSyncOpen] = useState(false);
  const [syncStep, setSyncStep] = useState(1);
  const [selectedCats, setSyncCats] = useState<SyncCategory[]>(['products']);
  const [selectedTargets, setSyncTargets] = useState<CountryCode[]>(['us', 'uk', 'ae', 'in', 'sg']);

  const globalTotalRevenue = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const globalLeads = privateInquiries.length;
  const syncRate = products.filter(p => p.scope === 'global').length / products.length * 100;

  const isHighImpactSync = selectedCats.includes('config') || selectedCats.includes('roles');

  const handleStartSync = () => {
    executeSafeSync(selectedCats, selectedTargets);
    setIsSyncOpen(false);
    setSyncStep(1);
  };

  const toggleCategory = (cat: SyncCategory) => {
    setSyncCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const toggleTarget = (code: CountryCode) => {
    setSyncTargets(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      {/* Global Safe Sync Interface */}
      <Dialog open={isSyncModalOpen} onOpenChange={setIsSyncOpen}>
        <DialogContent className="max-w-3xl bg-white border-none shadow-2xl rounded-none p-0 overflow-hidden">
          <div className="flex h-[500px]">
            {/* Steps Sidebar */}
            <div className="w-48 bg-ivory border-r border-border p-8 flex flex-col space-y-8">
               <SyncStep num={1} label="Selection" active={syncStep === 1} completed={syncStep > 1} />
               <SyncStep num={2} label="Impact Analysis" active={syncStep === 2} completed={syncStep > 2} />
               <SyncStep num={3} label="Confirmation" active={syncStep === 3} completed={syncStep === 3} />
            </div>

            {/* Step Content */}
            <div className="flex-1 p-12 flex flex-col">
              {syncStep === 1 && (
                <div className="space-y-10 animate-fade-in">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-headline font-bold italic">Safe Sync Matrix</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Define the global synchronization parameters</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-plum">Data Categories</p>
                      <div className="grid grid-cols-2 gap-4">
                        <SyncOption label="Atelier Artifacts" checked={selectedCats.includes('products')} onChange={() => toggleCategory('products')} />
                        <SyncOption label="SEO Metadata" checked={selectedCats.includes('seo')} onChange={() => toggleCategory('seo')} />
                        <SyncOption label="Jurisdictional Roles" checked={selectedCats.includes('roles')} onChange={() => toggleCategory('roles')} />
                        <SyncOption label="System Config" checked={selectedCats.includes('config')} onChange={() => toggleCategory('config')} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-plum">Target Market Hubs</p>
                      <div className="flex flex-wrap gap-2">
                        {countryConfigs.map(c => (
                          <button 
                            key={c.code}
                            onClick={() => toggleTarget(c.code)}
                            className={cn(
                              "h-10 px-4 border text-[10px] font-bold uppercase tracking-widest transition-all",
                              selectedTargets.includes(c.code) ? "bg-plum text-white border-plum shadow-md" : "bg-white border-border text-gray-400"
                            )}
                          >
                            {c.code}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {syncStep === 2 && (
                <div className="space-y-10 animate-fade-in h-full">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-headline font-bold italic">Pre-Flight Impact Report</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Analysis of the proposed synchronization session</p>
                  </div>

                  <div className="bg-ivory p-8 border border-border space-y-6 flex-1">
                    <div className="flex justify-between items-center pb-4 border-b border-border/40">
                       <span className="text-[10px] font-bold uppercase tracking-widest">Affected Artifacts</span>
                       <span className="font-bold text-gray-900">{products.filter(p => p.scope === 'global').length} Global Entries</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border/40">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Impact Radius</span>
                       <span className="text-[10px] font-bold uppercase text-plum">{selectedTargets.length} Market Hubs</span>
                    </div>
                    {isHighImpactSync && (
                      <div className="p-4 bg-red-50 border border-red-100 flex items-start space-x-4">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-red-700 uppercase">HIGH IMPACT DETECTED</p>
                           <p className="text-[9px] text-red-500 leading-relaxed italic">Changes to System Config or Roles can trigger global node restarts.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {syncStep === 3 && (
                <div className="space-y-10 animate-fade-in flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-plum/10 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-10 h-10 text-plum" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-headline font-bold italic">Authorization Required</h3>
                    <p className="text-sm text-gray-500 font-light italic max-w-sm">
                      "By executing this cycle, you are authorizing a master override across {selectedTargets.length} jurisdictions. This action is recorded in the institutional compliance registry."
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-border mt-auto flex justify-between">
                <Button 
                  variant="ghost" 
                  className="text-[9px] font-bold uppercase tracking-widest h-10 px-6 rounded-none"
                  onClick={() => syncStep > 1 ? setSyncStep(syncStep - 1) : setIsSyncOpen(false)}
                >
                  {syncStep === 1 ? 'Cancel' : 'Back'}
                </Button>
                <Button 
                  className="bg-black text-white hover:bg-plum h-10 px-10 rounded-none text-[9px] font-bold uppercase tracking-widest shadow-xl"
                  onClick={() => syncStep < 3 ? setSyncStep(syncStep + 1) : handleStartSync()}
                >
                  {syncStep === 3 ? 'AUTHORIZE & EXECUTE' : 'Next Step'} <ArrowRight className="ml-3 w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            MAISON <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">CORE</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Infrastructure Command</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <SuperNavItem icon={<LayoutDashboard />} label="Global Pulse" active={activeTab === 'global'} onClick={() => setActiveTab('global')} />
          <SuperNavItem icon={<RefreshCcw />} label="Safe Sync Hub" active={activeTab === 'sync'} onClick={() => setActiveTab('sync')} />
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
             <Button 
              className="bg-plum text-white hover:bg-gold h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest shadow-lg"
              onClick={() => { setSyncStep(1); setIsSyncOpen(true); }}
             >
               <Zap className="w-3.5 h-3.5 mr-2" /> SAFE GLOBAL SYNC
             </Button>
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <Card className="lg:col-span-8 bg-white border-border shadow-luxury overflow-hidden">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Regional Distribution Matrix</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Market health, tax type, and participation</CardDescription>
                  </CardHeader>
                  <Table>
                    <TableHeader className="bg-ivory/50">
                      <TableRow>
                        <TableHead className="text-[9px] uppercase font-bold pl-8">Market Hub</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold">Tax Logic</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold">Currency</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {countryConfigs.map(country => (
                        <TableRow key={country.code} className="hover:bg-ivory/30">
                          <TableCell className="pl-8 font-bold text-xs uppercase tracking-widest">{country.code} Hub</TableCell>
                          <TableCell className="text-[10px] font-bold text-gray-400">{country.taxType} ({country.taxRate}%)</TableCell>
                          <TableCell className="text-xs font-light">{country.currency} ({country.symbol})</TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={country.enabled} 
                              onCheckedChange={(val) => setCountryEnabled(country.code, val)} 
                            />
                          </TableCell>
                          <TableCell className="text-right pr-8">
                             <div className="flex items-center justify-end space-x-2">
                                <span className="text-[10px] font-bold text-gold">Optimal</span>
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                             </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>

                <div className="lg:col-span-4 space-y-8">
                  <Card className="bg-black text-white p-8 space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                      <Activity className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center space-x-3 text-secondary">
                        <Box className="w-5 h-5" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest">Global Catalog Sync</h4>
                      </div>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="opacity-60">Synchronized State</span>
                            <span>{syncRate.toFixed(0)}%</span>
                          </div>
                          <Progress value={syncRate} className="h-1 bg-white/10" />
                        </div>
                        <p className="text-[9px] text-white/60 italic">"Global scope items are auto-replicated across all active regional registries."</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white border-border shadow-sm p-8 space-y-6">
                    <div className="flex items-center justify-between">
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-plum">Maison Health Pulse</h4>
                       <Badge variant="outline" className="text-[8px] uppercase">{scopedErrors.length} Active Anomalies</Badge>
                    </div>
                    <div className="space-y-4">
                       <HealthIndicator label="SEO Readiness" passed={true} />
                       <HealthIndicator label="QA Integrity" passed={qaTests.every(t => t.status === 'passed')} />
                       <HealthIndicator label="Market Isolation" passed={true} />
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}

          {activeTab === 'sync' && (
            <div className="space-y-12 animate-fade-in">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Global Sync History</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Institutional registry of master overrides and reverts</p>
                </div>
                <div className="flex space-x-4">
                   <Button variant="outline" className="h-10 border-border text-[9px] font-bold uppercase tracking-widest h-12 rounded-none px-8">
                     <Download className="w-3.5 h-3.5 mr-2" /> Export Log
                   </Button>
                </div>
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Sync ID</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Timestamp</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Actor</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Categories</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Hubs</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Emergency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {globalSyncHistory.map(session => (
                      <TableRow key={session.id} className="hover:bg-ivory/30 transition-colors group">
                        <TableCell className="pl-8 text-[10px] font-mono text-gray-400 uppercase">{session.id}</TableCell>
                        <TableCell className="text-xs font-light">{new Date(session.timestamp).toLocaleString()}</TableCell>
                        <TableCell className="text-[10px] font-bold uppercase">{session.actorName}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {session.categories.map(c => <Badge key={c} variant="outline" className="text-[7px] uppercase h-5">{c}</Badge>)}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-plum font-bold uppercase">{session.targets.length} Hubs</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={session.status === 'rolled_back' ? 'destructive' : 'default'} className="text-[8px] uppercase tracking-tighter">
                            {session.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          {session.status === 'applied' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 border-red-200 text-red-600 text-[8px] font-bold uppercase hover:bg-red-50 rounded-none group-hover:shadow-md"
                              onClick={() => rollbackGlobalSync(session.id)}
                            >
                              <RotateCcw className="w-3 h-3 mr-2" /> Rollback Hubs
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {globalSyncHistory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="py-40 text-center">
                          <div className="flex flex-col items-center space-y-4 opacity-20">
                            <RefreshCcw className="w-12 h-12" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em]">No master sync sessions recorded</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'countries' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              {countryConfigs.map(country => (
                <Card key={country.code} className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border flex flex-row justify-between items-center bg-ivory/20">
                    <div className="space-y-1">
                      <CardTitle className="font-headline text-xl uppercase tracking-widest">{country.code.toUpperCase()} Hub</CardTitle>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Jurisdictional Logic</p>
                    </div>
                    <Badge variant={country.enabled ? 'default' : 'outline'} className={cn(country.enabled ? "bg-plum" : "")}>
                      {country.enabled ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                       <ConfigField label="Currency Hub" value={country.currency} />
                       <ConfigField label="Taxation Model" value={`${country.taxType} (${country.taxRate}%)`} />
                       <ConfigField label="Outreach" value={country.messagingStrategy} />
                       <ConfigField label="Localization" value={country.locale} />
                    </div>
                    <div className="pt-6 border-t border-border">
                       <Button variant="outline" className="w-full h-10 border-border text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white">
                         Edit Market Overrides
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'brands' && (
            <div className="space-y-8 animate-fade-in">
               <div className="flex justify-between items-end mb-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-headline font-bold italic">Brand Registry</h2>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Manage multi-maison architecture</p>
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

function SyncStep({ num, label, active, completed }: { num: number, label: string, active: boolean, completed: boolean }) {
  return (
    <div className={cn(
      "flex flex-col items-center space-y-2 transition-all",
      active ? "opacity-100" : completed ? "opacity-60" : "opacity-30"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold",
        active ? "bg-plum text-white border-plum shadow-lg" : completed ? "bg-black text-white border-black" : "border-gray-300 text-gray-400"
      )}>
        {completed && !active ? <CheckCircle2 className="w-4 h-4" /> : num}
      </div>
      <span className="text-[8px] font-bold uppercase tracking-widest text-center">{label}</span>
    </div>
  );
}

function SyncOption({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-white border border-border hover:border-plum transition-all cursor-pointer group" onClick={onChange}>
      <Checkbox checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-plum" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-plum">{label}</span>
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

function HealthIndicator({ label, passed }: { label: string, passed: boolean }) {
  return (
    <div className="flex justify-between items-center">
       <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</span>
       {passed ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
    </div>
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
