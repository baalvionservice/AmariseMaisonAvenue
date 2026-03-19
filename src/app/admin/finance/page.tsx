'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  PieChart, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Download, 
  RefreshCcw, 
  ChevronRight, 
  LogOut,
  LayoutDashboard,
  Building2,
  Lock,
  Cpu,
  ShieldCheck,
  Globe,
  Receipt,
  Scale,
  ArrowRight,
  BadgeDollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';

type FinanceTab = 'overview' | 'ledger' | 'settlements' | 'tax' | 'compliance' | 'reports';

export default function FinanceHub() {
  const [activeTab, setActiveTab] = useState<FinanceTab>('overview');
  const { scopedTransactions, currentUser, updateTransactionStatus, countryConfigs } = useAppStore();
  const { toast } = useToast();

  const handleAction = (msg: string) => {
    toast({ title: "Finance Operation", description: msg });
  };

  const handleStatusTransition = (id: string, nextStatus: any) => {
    updateTransactionStatus(id, nextStatus);
    toast({ 
      title: "Ledger State Transition", 
      description: `Transaction ${id} moved to ${nextStatus}.` 
    });
  };

  const stats = useMemo(() => {
    const completed = scopedTransactions.filter(t => t.status === 'Settled' || t.status === 'Closed');
    const pipeline = scopedTransactions.filter(t => t.status === 'Paid' || t.status === 'Processing');
    
    const revenueByCountry = countryConfigs.map(c => {
      const countryTrans = completed.filter(t => t.country.toLowerCase() === c.code.toLowerCase());
      return {
        country: c.name,
        value: countryTrans.reduce((acc, t) => acc + t.amount, 0),
        code: c.code
      };
    });

    return {
      netRevenue: completed.reduce((acc, t) => acc + (t.netAmount || t.amount), 0),
      totalTax: completed.reduce((acc, t) => acc + (t.taxAmount || 0), 0),
      pipelineValue: pipeline.reduce((acc, t) => acc + t.amount, 0),
      revenueByCountry
    };
  }, [scopedTransactions, countryConfigs]);

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">TREASURY</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Maison Financial Hub</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <FinanceNavItem icon={<LayoutDashboard />} label="Ledger Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <FinanceNavItem icon={<Receipt />} label="Global Ledger" active={activeTab === 'ledger'} onClick={() => setActiveTab('ledger')} />
          <FinanceNavItem icon={<Building2 />} label="Settlement Pipeline" active={activeTab === 'settlements'} onClick={() => setActiveTab('settlements')} />
          <FinanceNavItem icon={<Globe />} label="Tax Jurisdictions" active={activeTab === 'tax'} onClick={() => setActiveTab('tax')} />
          <FinanceNavItem icon={<ShieldCheck />} label="Regulatory Audit" active={activeTab === 'compliance'} onClick={() => setActiveTab('compliance')} />
          <FinanceNavItem icon={<TrendingUp />} label="Financial Reports" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest capitalize">
              {activeTab} Hub
            </h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              Treasury Settlement Engine • {currentUser?.country.toUpperCase()} Market
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Button className="bg-plum text-white hover:bg-gold h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest" onClick={() => handleAction("Internal reconciliation initiated.")}>
              <BadgeDollarSign className="w-3.5 h-3.5 mr-2" /> RECONCILE LEDGER
            </Button>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">AF</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<DollarSign />} label="Settled Revenue" value={`$${(stats.netRevenue / 1000).toFixed(1)}k`} trend="+12.4%" positive />
                <StatCard icon={<Globe />} label="Total Tax Liab." value={`$${(stats.totalTax / 1000).toFixed(1)}k`} trend="Compliance: 100%" positive />
                <StatCard icon={<CheckCircle2 />} label="Settlement Velocity" value="98.2%" trend="Optimal" positive />
                <StatCard icon={<Clock />} label="Pipeline Funds" value={`$${(stats.pipelineValue / 1000).toFixed(1)}k`} trend="Scheduled" positive />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <Card className="lg:col-span-8 bg-white border-border shadow-luxury overflow-hidden">
                  <CardHeader className="border-b border-border flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-headline text-2xl">Revenue by Hub</CardTitle>
                      <CardDescription className="text-[10px] uppercase tracking-widest">Market contribution index</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-10">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.revenueByCountry}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="country" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9}} />
                          <Tooltip 
                            cursor={{fill: '#f9f7f9'}}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white border border-border p-4 shadow-luxury">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-plum mb-1">{payload[0].payload.country}</p>
                                    <p className="text-xl font-headline font-bold italic">${(payload[0].value as number).toLocaleString()}</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                            {stats.revenueByCountry.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7E3F98' : '#D4AF37'} fillOpacity={0.8} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="lg:col-span-4 space-y-8">
                  <Card className="bg-black text-white p-8 space-y-6 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-plum/20 rounded-full blur-3xl" />
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center space-x-3 text-secondary">
                        <Scale className="w-5 h-5" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest">Settlement Health</h4>
                      </div>
                      <div className="space-y-6 pt-4">
                        <ComplianceRow label="Europe Settlements" status="CLEARED" progress={100} />
                        <ComplianceRow label="UAE Treasury" status="TRANSIT" progress={65} />
                        <ComplianceRow label="Asia Hub" status="CLEARED" progress={100} />
                        <ComplianceRow label="USA Sales Tax" status="FILED" progress={100} />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}

          {activeTab === 'ledger' && (
            <Card className="bg-white border-border shadow-luxury overflow-hidden">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-headline text-2xl">Institutional Ledger</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Full transaction lifecycle registry</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Entry ID</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Market</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Gross</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Tax</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Net</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Lifecycle Stage</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scopedTransactions.map(tx => (
                      <TableRow key={tx.id} className="hover:bg-ivory/30 transition-colors">
                        <TableCell className="text-xs font-bold font-mono pl-8">{tx.id}</TableCell>
                        <TableCell className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{tx.country}</TableCell>
                        <TableCell className="text-xs font-bold">${tx.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-xs font-light text-red-500">-${(tx.taxAmount || 0).toLocaleString()}</TableCell>
                        <TableCell className="text-xs font-bold text-plum">${(tx.netAmount || tx.amount).toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn("text-[8px] uppercase tracking-tighter", 
                            tx.status === 'Settled' ? "bg-green-50 text-green-600" : 
                            tx.status === 'Processing' ? "bg-gold/10 text-gold" : 
                            "bg-gray-50 text-gray-400"
                          )}>
                            {tx.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <div className="flex justify-end space-x-2">
                            {tx.status === 'Paid' && <Button size="sm" className="h-7 bg-black text-white text-[8px] font-bold uppercase rounded-none" onClick={() => handleStatusTransition(tx.id, 'Processing')}>Process</Button>}
                            {tx.status === 'Processing' && <Button size="sm" className="h-7 bg-plum text-white text-[8px] font-bold uppercase rounded-none" onClick={() => handleStatusTransition(tx.id, 'Settled')}>Settle</Button>}
                            {tx.status === 'Settled' && <Button size="sm" className="h-7 border-border text-gray-400 text-[8px] font-bold uppercase rounded-none" onClick={() => handleStatusTransition(tx.id, 'Closed')}>Archive</Button>}
                            <Button variant="ghost" size="icon" className="h-7 w-7"><FileText className="w-3.5 h-3.5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {['settlements', 'tax', 'compliance', 'reports'].includes(activeTab) && (
            <div className="py-40 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-12 bg-ivory border border-border rounded-full animate-pulse">
                  <Scale className="w-12 h-12 text-gold/30 mx-auto" />
                </div>
              </div>
              <p className="text-2xl text-muted-foreground font-light italic font-headline">
                The {activeTab} terminal is currently processing regional data.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

function FinanceNavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border",
        active 
          ? "bg-plum text-white border-plum shadow-md" 
          : "text-gray-400 hover:bg-ivory hover:text-plum border-transparent"
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

function StatCard({ icon, label, value, trend, positive }: { icon: any, label: string, value: string, trend: string, positive: boolean }) {
  return (
    <Card className="bg-white border-border shadow-luxury hover:border-gold transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-ivory rounded-full group-hover:bg-gold/10 transition-colors text-plum">{icon}</div>
          <div className={cn(
            "flex items-center text-[10px] font-bold tracking-widest uppercase",
            positive ? "text-gold" : "text-gray-400"
          )}>
            {trend} {positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : null}
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

function ComplianceRow({ label, status, progress }: { label: string, status: string, progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span className="opacity-60">{label}</span>
        <span className="text-secondary">{status}</span>
      </div>
      <Progress value={progress} className="h-1 bg-white/10" />
    </div>
  );
}
