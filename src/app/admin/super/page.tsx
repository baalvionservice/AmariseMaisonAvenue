
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
import { Checkbox } from "@/components/ui/checkbox";
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
 * Tab 1: Global Pulse, Tab 2: Safe Sync, Tab 3: Infrastructure Matrix
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
           <div className="p-12 space-y-10">
              <div className="flex items-center space-x-4 text-plum">
                 <Zap className="w-6 h-6" />
                 <h3 className="text-2xl font-headline font-bold italic uppercase tracking-widest">Safe Global Sync</h3>
              </div>
              <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                "Authorizing a global override is a strategic action. Ensure all regional hubs are prepared for registry synchronization."
              </p>
              <div className="pt-8 flex justify-end space-x-4">
                 <Button variant="ghost" onClick={() => setIsSyncOpen(false)}>Cancel</Button>
                 <Button className="bg-black text-white hover:bg-plum rounded-none h-12 px-10 font-bold uppercase tracking-widest transition-all" onClick={handleStartSync}>
                    AUTHORIZE MASTER OVERRIDE
                 </Button>
              </div>
           </div>
        </DialogContent>
      </Dialog>

      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-plum/5 rounded-none text-plum"><Globe className="w-5 h-5" /></div>
             <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center space-x-2">
                <Link href="/admin">Dashboard</Link>
                <ChevronRight className="w-2.5 h-2.5" />
                <span className="text-plum">Global Orchestration</span>
             </nav>
          </div>
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-gray-900 uppercase">Global Matrix</h1>
          <p className="text-sm text-gray-500 font-light italic">Master control for multi-brand and multi-market architecture.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button className="h-14 px-10 rounded-none bg-plum text-white hover:bg-black transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-plum/20" onClick={() => setIsSyncOpen(true)}>
             <Zap className="w-4 h-4 mr-3" /> INITIATE MASTER SYNC
           </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white border-b border-border h-14 w-full justify-start p-0 rounded-none space-x-12 mb-12">
          <TabsTrigger value="overview" className="tab-trigger">Global Pulse</TabsTrigger>
          <TabsTrigger value="strategy" className="tab-trigger">Maison Strategy</TabsTrigger>
          <TabsTrigger value="infrastructure" className="tab-trigger">Infrastructure Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-12 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatsTile label="Aggregate Revenue" value={`$${(globalTotalRevenue / 1000).toFixed(1)}k`} trend="Live Ledger" />
              <StatsTile label="Global Lead Flow" value={globalLeads.toString()} trend="+12% Vol" />
              <StatsTile label="Active Market Hubs" value={countryConfigs.filter(c => c.enabled).length.toString()} trend="Operational" />
              <StatsTile label="System Integrity" value="100%" trend="Verified" />
           </div>

           <Card className="bg-white border-border shadow-luxury overflow-hidden rounded-none">
              <CardHeader className="border-b border-border bg-ivory/10">
                 <CardTitle className="font-headline text-2xl">Regional Hub Distribution</CardTitle>
                 <CardDescription className="text-[10px] uppercase tracking-widest">Market status and jurisdictional logic</CardDescription>
              </CardHeader>
              <Table>
                <TableHeader className="bg-ivory/50">
                  <TableRow>
                    <TableHead className="text-[9px] uppercase font-bold pl-8">Market Hub</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold">Tax Logic</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold">Currency</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-center">Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countryConfigs.map(c => (
                    <TableRow key={c.code} className="hover:bg-ivory/30 transition-colors border-border">
                      <TableCell className="pl-8 font-bold text-xs uppercase tracking-widest">{c.name} ({c.code.toUpperCase()})</TableCell>
                      <TableCell className="text-[10px] font-bold text-gray-400">{c.taxType} ({c.taxRate}%)</TableCell>
                      <TableCell className="text-xs font-light">{c.currency}</TableCell>
                      <TableCell className="text-center">
                        <Switch checked={c.enabled} onCheckedChange={(val) => setCountryEnabled(c.code, val)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
           </Card>
        </TabsContent>

        <TabsContent value="strategy" className="animate-fade-in space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-white border-border shadow-luxury p-10 space-y-8 rounded-none border-l-4 border-l-gold">
                 <div className="flex items-center space-x-4 text-gold">
                    <FlaskConical className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Institutional Persona Flow</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Determine the primary routing logic for the Maison. When active, VIP artifacts bypass the standard registry and route directly to the Private Salon environment.
                 </p>
                 <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="space-y-1">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Dual-Persona Routing</span>
                       <p className="text-[9px] text-gray-400 italic">Enable Salon (Design B) for VIP status artifacts.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-gold" />
                 </div>
              </Card>

              <Card className="bg-white border-border shadow-luxury p-10 space-y-8 rounded-none border-l-4 border-l-plum">
                 <div className="flex items-center space-x-4 text-plum">
                    <Palette className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Brand Visuals Matrix</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Global override for the primary action palette. Currently locked to **Maison Plum (#7E3F98)** with **Golden Yellow hover**.
                 </p>
                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="p-4 border border-border flex items-center space-x-4">
                       <div className="w-6 h-6 bg-plum shadow-sm" />
                       <span className="text-[9px] font-bold uppercase tracking-widest">PLUM (PRIMARY)</span>
                    </div>
                    <div className="p-4 border border-border flex items-center space-x-4">
                       <div className="w-6 h-6 bg-gold shadow-sm" />
                       <span className="text-[9px] font-bold uppercase tracking-widest">GOLD (HOVER)</span>
                    </div>
                 </div>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="animate-fade-in space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-white border-border shadow-luxury p-10 space-y-8 rounded-none border-l-4 border-l-gray-900">
                 <div className="flex items-center space-x-4 text-gray-900">
                    <Database className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Brand Registry</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Manage the multi-brand architecture of the Maison. Configure domain isolation and identity synergy between houses.
                 </p>
                 <div className="space-y-4 pt-4 border-t border-border">
                    {brandConfigs.map(b => (
                      <div key={b.id} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-gray-400">{b.name}</span>
                         <Badge variant={b.enabled ? 'default' : 'outline'} className="rounded-none border-none bg-emerald-50 text-emerald-600">
                            {b.enabled ? 'ACTIVE' : 'DORMANT'}
                         </Badge>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="bg-white border-border shadow-luxury p-10 space-y-8 rounded-none border-l-4 border-l-red-500">
                 <div className="flex items-center space-x-4 text-red-500">
                    <ShieldAlert className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Master Kill Switch</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Emergency platform oversight. Activating this will immediately switch all market hubs to read-only mode and activate the Institutional Maintenance Overlay.
                 </p>
                 <Button variant="outline" className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 text-[9px] font-bold uppercase tracking-widest rounded-none transition-all">
                    ACTIVATE EMERGENCY OVERRIDE
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
    <Card className="bg-white border-border shadow-luxury p-8 space-y-4 group hover:border-plum transition-all rounded-none">
       <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-plum transition-colors">{label}</span>
          <Badge variant="outline" className="text-[8px] uppercase border-plum/20 text-plum rounded-none">{trend}</Badge>
       </div>
       <div className="text-4xl font-headline font-bold italic text-gray-900">{value}</div>
    </Card>
  );
}
