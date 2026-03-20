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
  Filter,
  Cpu,
  Database,
  FlaskConical,
  Palette
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SyncCategory, CountryCode } from '@/lib/types';

/**
 * Global Matrix: Institutional Master Control
 * Centralizes oversight for the 1 Super Admin and 5 Hub leads.
 */
export default function SuperAdminHub() {
  const { 
    countryConfigs, 
    brandConfigs, 
    setCountryEnabled, 
    products,
    globalSyncHistory,
    executeSafeSync,
    rollbackGlobalSync,
    currentUser,
    privateInquiries,
    invoices,
    globalSettings
  } = useAppStore();

  const [isSyncModalOpen, setIsSyncOpen] = useState(false);
  const [selectedCats, setSyncCats] = useState<SyncCategory[]>(['products']);
  const [selectedTargets, setSyncTargets] = useState<CountryCode[]>(['us', 'uk', 'ae', 'in', 'sg']);

  const globalTotalRevenue = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const globalLeads = privateInquiries.length;

  const handleStartSync = () => {
    executeSafeSync(selectedCats, selectedTargets);
    setIsSyncOpen(false);
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Global Safe Sync Modal */}
      <Dialog open={isSyncModalOpen} onOpenChange={setIsSyncOpen}>
        <DialogContent className="max-w-3xl bg-white border-none shadow-2xl rounded-none p-0 overflow-hidden">
           <div className="p-12 space-y-10 text-gray-900">
              <div className="flex items-center space-x-4 text-plum">
                 <Zap className="w-6 h-6" />
                 <h3 className="text-2xl font-headline font-bold italic uppercase tracking-widest">Safe Global Sync</h3>
              </div>
              <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                "Authorizing a global override is a strategic action. Ensure all regional hubs are prepared for registry synchronization. This affects all 5 market jurisdictions."
              </p>
              
              <div className="space-y-6">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Target Jurisdictions</p>
                 <div className="grid grid-cols-5 gap-4">
                    {Object.values(countryConfigs).map(c => (
                      <div key={c.code} className="flex flex-col items-center space-y-2 p-4 border border-border bg-ivory/50">
                         <span className="text-xl">{c.symbol}</span>
                         <span className="text-[9px] font-bold uppercase">{c.code}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="pt-8 flex justify-end space-x-4">
                 <Button variant="ghost" onClick={() => setIsSyncOpen(false)} className="rounded-none text-[10px] font-bold uppercase">Cancel</Button>
                 <Button className="bg-black text-white hover:bg-plum rounded-none h-12 px-10 font-bold uppercase tracking-widest transition-all" onClick={handleStartSync}>
                    AUTHORIZE MASTER OVERRIDE
                 </Button>
              </div>
           </div>
        </DialogContent>
      </Dialog>

      <header className="flex justify-between items-end border-b border-white/5 pb-12">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-blue-500/10 rounded-none text-blue-500 border border-blue-500/20"><Globe className="w-5 h-5" /></div>
             <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 flex items-center space-x-2">
                <Link href="/admin" className="hover:text-white transition-colors">Terminal</Link>
                <ChevronRight className="w-2.5 h-2.5" />
                <span className="text-white">Global Orchestration</span>
             </nav>
          </div>
          <h1 className="text-5xl font-headline font-bold italic tracking-tight text-white uppercase">Global Matrix</h1>
          <p className="text-sm text-white/40 font-light italic">Institutional Master Control for the Global Super Admin.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button className="h-14 px-10 rounded-none bg-blue-600 text-white hover:bg-blue-500 transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/20" onClick={() => setIsSyncOpen(true)}>
             <Zap className="w-4 h-4 mr-3" /> INITIATE MASTER SYNC
           </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-transparent border-b border-white/5 h-14 w-full justify-start p-0 rounded-none space-x-12 mb-12">
          <TabsTrigger value="overview" className="tab-trigger-modern !text-white/40 data-[state=active]:!text-white data-[state=active]:!border-blue-600">Global Hub Status</TabsTrigger>
          <TabsTrigger value="strategy" className="tab-trigger-modern !text-white/40 data-[state=active]:!text-white data-[state=active]:!border-blue-600">Maison Principles</TabsTrigger>
          <TabsTrigger value="infrastructure" className="tab-trigger-modern !text-white/40 data-[state=active]:!text-white data-[state=active]:!border-blue-600">Security Layers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-12 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatsTile label="Aggregate Yield" value={`$${(globalTotalRevenue / 1000).toFixed(1)}k`} trend="Live Matrix" />
              <StatsTile label="Network Users" value="1.2M" trend="+14.2% Vol" />
              <StatsTile label="Operational Hubs" value="05 / 05" trend="Optimal" />
              <StatsTile label="System Integrity" value="VERIFIED" trend="Immutable" />
           </div>

           <Card className="bg-[#111113] border-white/5 shadow-2xl overflow-hidden rounded-none">
              <CardHeader className="border-b border-white/5 bg-white/5">
                 <CardTitle className="font-headline text-2xl text-white">Regional Hub Matrix</CardTitle>
                 <CardDescription className="text-[10px] uppercase tracking-widest text-white/30">Jurisdictional status and jurisdictional logic</CardDescription>
              </CardHeader>
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5">
                    <TableHead className="text-[9px] uppercase font-bold pl-8 text-white/40">Market Hub</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-white/40">Jurisdiction Logic</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-white/40">Hub Lead</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-center text-white/40">Connectivity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countryConfigs.map(c => (
                    <TableRow key={c.code} className="hover:bg-white/5 transition-colors border-white/5">
                      <TableCell className="pl-8 font-bold text-xs uppercase tracking-widest text-white/80">{c.name} ({c.code.toUpperCase()})</TableCell>
                      <TableCell className="text-[10px] font-bold text-white/30 italic">{c.taxType} / {c.currency} Settlement</TableCell>
                      <TableCell className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">Assigned: {c.code.toUpperCase()}_ADMIN</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center items-center">
                           <div className={cn("w-2 h-2 rounded-full", c.enabled ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-red-500")} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
           </Card>
        </TabsContent>

        <TabsContent value="strategy" className="animate-fade-in space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-[#111113] border-white/5 shadow-2xl p-10 space-y-8 rounded-none border-l-4 border-l-blue-600">
                 <div className="flex items-center space-x-4 text-blue-500">
                    <FlaskConical className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest text-white">Dual-Persona Logic</h3>
                 </div>
                 <p className="text-sm text-white/40 font-light italic leading-relaxed">
                   Determine the primary routing logic for the Maison. When active, high-value artifacts bypass the standard registry and route directly to the Private Salon environment for discreet dialogue.
                 </p>
                 <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="space-y-1">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Salon Routing Protocol</span>
                       <p className="text-[9px] text-white/20 italic">Global enforcement for all 5 jurisdictions.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                 </div>
              </Card>

              <Card className="bg-[#111113] border-white/5 shadow-2xl p-10 space-y-8 rounded-none border-l-4 border-l-plum">
                 <div className="flex items-center space-x-4 text-plum">
                    <Palette className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest text-white">Global Aesthetic Overlay</h3>
                 </div>
                 <p className="text-sm text-white/40 font-light italic leading-relaxed">
                   Master override for the primary action palette. Unified brand coherence ensures consistent luxury recognition across international borders.
                 </p>
                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="p-4 border border-white/5 flex items-center space-x-4 bg-white/5">
                       <div className="w-6 h-6 bg-plum shadow-sm" />
                       <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">PLUM CORE</span>
                    </div>
                    <div className="p-4 border border-white/5 flex items-center space-x-4 bg-white/5">
                       <div className="w-6 h-6 bg-gold shadow-sm" />
                       <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">GOLD ACCENT</span>
                    </div>
                 </div>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="animate-fade-in space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-[#111113] border-white/5 shadow-2xl p-10 space-y-8 rounded-none border-l-4 border-l-white/20">
                 <div className="flex items-center space-x-4 text-white/60">
                    <Database className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest text-white">Market Isolation</h3>
                 </div>
                 <p className="text-sm text-white/40 font-light italic leading-relaxed">
                   Enforce strict regional hub context for registry memory. Prevents data leakage and ensures jurisdictional compliance for Country Admins.
                 </p>
                 <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Hub Isolation Active</span>
                    <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                 </div>
              </Card>

              <Card className="bg-[#111113] border-white/5 shadow-2xl p-10 space-y-8 rounded-none border-l-4 border-l-red-600/40">
                 <div className="flex items-center space-x-4 text-red-500">
                    <ShieldAlert className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest text-white">Emergency Termination</h3>
                 </div>
                 <p className="text-sm text-white/40 font-light italic leading-relaxed">
                   Master platform override. Activating this will immediately switch all regional market hubs to read-only mode and activate the Maintenance Overlay.
                 </p>
                 <Button variant="outline" className="w-full h-12 border-red-900/40 text-red-500 hover:bg-red-500 hover:text-white text-[9px] font-bold uppercase tracking-widest rounded-none transition-all">
                    ACTIVATE MASTER KILL-SWITCH
                 </Button>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsTile({ label, value, trend }: { label: string, value: string, trend: string }) {
  return (
    <Card className="bg-[#111113] border-white/5 shadow-xl p-8 space-y-4 group hover:border-blue-600/40 transition-all rounded-none">
       <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 group-hover:text-blue-400 transition-colors">{label}</span>
          <Badge variant="outline" className="text-[8px] uppercase border-blue-600/20 text-blue-400 rounded-none bg-blue-600/5">{trend}</Badge>
       </div>
       <div className="text-4xl font-headline font-bold italic text-white/90 group-hover:text-white">{value}</div>
    </Card>
  );
}
