
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
  Database
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
 * Tab 1: Global Pulse, Tab 2: Safe Sync, Tab 3: Infrastructure Overrides
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
    invoices
  } = useAppStore();

  const [isSyncModalOpen, setIsSyncOpen] = useState(false);
  const [syncStep, setSyncStep] = useState(1);
  const [selectedCats, setSyncCats] = useState<SyncCategory[]>(['products']);
  const [selectedTargets, setSyncTargets] = useState<CountryCode[]>(['us', 'uk', 'ae', 'in', 'sg']);

  const globalTotalRevenue = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const globalLeads = privateInquiries.length;

  const handleStartSync = () => {
    executeSafeSync(selectedCats, selectedTargets);
    setIsSyncOpen(false);
    setSyncStep(1);
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Global Safe Sync Modal (Hidden logic) */}
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
                 <Button className="bg-black text-white hover:bg-plum rounded-none h-12 px-10 font-bold uppercase tracking-widest" onClick={handleStartSync}>
                    AUTHORIZE MASTER OVERRIDE
                 </Button>
              </div>
           </div>
        </DialogContent>
      </Dialog>

      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center space-x-2">
             <Link href="/admin">Dashboard</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-plum">Global Orchestration</span>
          </nav>
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
          <TabsTrigger value="registry" className="tab-trigger">Master Registry</TabsTrigger>
          <TabsTrigger value="advanced" className="tab-trigger">Infrastructure Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-12 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatsTile label="Aggregate Revenue" value={`$${(globalTotalRevenue / 1000).toFixed(1)}k`} trend="Live Ledger" />
              <StatsTile label="Global Lead Flow" value={globalLeads.toString()} trend="+12% Vol" />
              <StatsTile label="Active Market Hubs" value={countryConfigs.filter(c => c.enabled).length.toString()} trend="Operational" />
              <StatsTile label="System Integrity" value="100%" trend="Verified" />
           </div>

           <Card className="bg-white border-border shadow-luxury overflow-hidden">
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
                    <TableRow key={c.code} className="hover:bg-ivory/30 transition-colors">
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

        <TabsContent value="registry" className="animate-fade-in space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <Card className="lg:col-span-2 bg-white border-border shadow-luxury overflow-hidden">
                 <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-xl">Sync History Ledger</CardTitle>
                 </CardHeader>
                 <Table>
                    <TableHeader className="bg-ivory/50">
                       <TableRow>
                          <TableHead className="text-[9px] uppercase font-bold pl-8">ID</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Timestamp</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Actor</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {globalSyncHistory.map(log => (
                         <TableRow key={log.id} className="hover:bg-ivory/30 transition-colors">
                            <TableCell className="pl-8 text-[10px] font-mono text-gray-400">{log.id}</TableCell>
                            <TableCell className="text-xs font-light">{new Date(log.timestamp).toLocaleString()}</TableCell>
                            <TableCell className="text-[10px] font-bold uppercase">{log.actorName}</TableCell>
                            <TableCell className="text-right pr-8">
                               <Button variant="outline" size="sm" className="h-8 border-red-200 text-red-600 text-[8px] font-bold uppercase hover:bg-red-50" onClick={() => rollbackGlobalSync(log.id)}>ROLLBACK</Button>
                            </TableCell>
                         </TableRow>
                       ))}
                    </TableBody>
                 </Table>
              </Card>

              <aside className="space-y-8">
                 <Card className="bg-black text-white p-8 space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><Cpu className="w-32 h-32" /></div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold">Master Sync Logic</h4>
                    <p className="text-xs font-light italic opacity-60 leading-relaxed">
                       "A master sync enforces the global artifact schema across all jurisdictional nodes."
                    </p>
                    <div className="space-y-4 pt-4 border-t border-white/10">
                       <SyncCategory label="Products" active />
                       <SyncCategory label="SEO Metadata" active />
                       <SyncCategory label="Roles" />
                    </div>
                 </aside>
              </aside>
           </div>
        </TabsContent>

        <TabsContent value="advanced" className="animate-fade-in space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-white border-border shadow-luxury p-10 space-y-8 border-l-4 border-l-gold">
                 <div className="flex items-center space-x-4 text-gold">
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
                         <Badge variant={b.enabled ? 'default' : 'outline'}>{b.enabled ? 'Live' : 'Dormant'}</Badge>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="bg-white border-border shadow-luxury p-10 space-y-8">
                 <div className="flex items-center space-x-4 text-plum">
                    <ShieldAlert className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Master Kill Switch</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Emergency platform oversight. Activating this will immediately switch all market hubs to read-only mode.
                 </p>
                 <Button variant="outline" className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 text-[9px] font-bold uppercase tracking-widest">
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
    <Card className="bg-white border-border shadow-luxury p-8 space-y-4 group hover:border-plum transition-all">
       <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-plum transition-colors">{label}</span>
          <Badge variant="outline" className="text-[8px] uppercase">{trend}</Badge>
       </div>
       <div className="text-4xl font-headline font-bold italic text-gray-900">{value}</div>
    </Card>
  );
}

function SyncCategory({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <div className="flex items-center space-x-3">
       <div className={cn("w-2 h-2 rounded-full", active ? "bg-gold" : "bg-white/10")} />
       <span className={cn("text-[9px] font-bold uppercase tracking-widest", active ? "text-white" : "text-white/30")}>{label}</span>
    </div>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full text-left text-sm">{children}</table>;
}
function TableHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return <thead className={cn("border-b border-border", className)}>{children}</thead>;
}
function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}
function TableRow({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return <tr className={cn("border-b border-border last:border-0", className)} onClick={onClick}>{children}</tr>;
}
function TableHead({ children, className }: { children: React.ReactNode, className?: string }) {
  return <th className={cn("h-12 px-4 align-middle", className)}>{children}</th>;
}
function TableCell({ children, className }: { children: React.ReactNode, className?: string }) {
  return <td className={cn("p-4 align-middle", className)}>{children}</td>;
}
