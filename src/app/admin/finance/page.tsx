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
  BadgeDollarSign,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

/**
 * Finance Hub: Multi-Jurisdictional Treasury Engine
 * Tab 1: Strategic Yield, Tab 2: Transaction Ledger, Tab 3: Tax Compliance
 */
export default function FinanceHub() {
  const { scopedTransactions, currentUser, updateTransactionStatus, countryConfigs } = useAppStore();
  const { toast } = useToast();
  const [activeInternalTab, setActiveInternalTab] = useState('overview');

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
    <div className="space-y-12 animate-fade-in">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center space-x-2">
             <Link href="/admin">Dashboard</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-plum">Institutional Treasury</span>
          </nav>
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-gray-900 uppercase">Finance Hub</h1>
          <p className="text-sm text-gray-500 font-light italic">Global yield monitoring & jurisdictional settlement engine.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button className="h-14 px-10 rounded-none bg-plum text-white hover:bg-black transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-plum/20">
             <BadgeDollarSign className="w-4 h-4 mr-3" /> RECONCILE LEDGER
           </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveInternalTab}>
        <TabsList className="bg-white border-b border-border h-14 w-full justify-start p-0 rounded-none space-x-12 mb-12">
          <TabsTrigger value="overview" className="tab-trigger">Strategic Yield</TabsTrigger>
          <TabsTrigger value="ledger" className="tab-trigger">Global Ledger</TabsTrigger>
          <TabsTrigger value="compliance" className="tab-trigger">Jurisdictional Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-12 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatsTile label="Total Settled" value={`$${(stats.netRevenue / 1000).toFixed(1)}k`} trend="+12.4% MoM" />
              <StatsTile label="Tax Liability" value={`$${(stats.totalTax / 1000).toFixed(1)}k`} trend="Compliance: OK" />
              <StatsTile label="Pipeline Value" value={`$${(stats.pipelineValue / 1000).toFixed(1)}k`} trend="Scheduled" />
              <StatsTile label="Global Yield" value="98.2%" trend="Optimal" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <Card className="lg:col-span-8 bg-white border-border shadow-luxury overflow-hidden">
                <CardHeader className="border-b border-border">
                   <CardTitle className="font-headline text-2xl">Regional Contribution</CardTitle>
                   <CardDescription className="text-[10px] uppercase tracking-widest">Revenue split by active market hub</CardDescription>
                </CardHeader>
                <CardContent className="p-10 h-[350px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.revenueByCountry}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="country" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <Tooltip cursor={{fill: '#f9f7f9'}} />
                        <Bar dataKey="value" fill="#7E3F98" radius={[2, 2, 0, 0]} />
                      </BarChart>
                   </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-4 bg-black text-white p-10 flex flex-col justify-center space-y-8 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Receipt className="w-40 h-40" /></div>
                 <h3 className="text-3xl font-headline font-bold italic">Treasury Status</h3>
                 <div className="space-y-6">
                    <YieldRow label="US Hub" val={100} status="Settled" />
                    <YieldRow label="UAE Hub" val={65} status="Transit" />
                    <YieldRow label="UK Hub" val={100} status="Settled" />
                 </div>
                 <Button variant="outline" className="w-full rounded-none border-white/20 text-white hover:bg-white hover:text-black text-[9px] font-bold uppercase tracking-widest h-12 mt-6">
                    VIEW SETTLEMENT PIPELINE
                 </Button>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="ledger" className="animate-fade-in space-y-8">
           <Card className="bg-white border-border shadow-luxury overflow-hidden">
              <Table>
                <TableHeader className="bg-ivory/50">
                  <TableRow>
                    <TableHead className="text-[9px] uppercase font-bold pl-8">Entry ID</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold">Client</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold">Gross Yield</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scopedTransactions.map(tx => (
                    <TableRow key={tx.id} className="hover:bg-ivory/30 transition-colors">
                      <TableCell className="pl-8 font-mono text-[10px] uppercase text-gray-400">{tx.id}</TableCell>
                      <TableCell className="text-xs font-bold uppercase">{tx.clientName}</TableCell>
                      <TableCell className="text-xs font-bold text-plum tabular">${tx.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-[8px] uppercase tracking-tighter">{tx.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-plum"><FileText className="w-3.5 h-3.5" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {scopedTransactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-40 text-center opacity-30">
                         <Receipt className="w-12 h-12 mx-auto mb-4" />
                         <p className="text-sm font-bold uppercase tracking-widest italic">The ledger is currently dormant.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
           </Card>
        </TabsContent>

        <TabsContent value="compliance" className="animate-fade-in space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-white border-border shadow-luxury p-10 space-y-8">
                 <div className="flex items-center space-x-4 text-plum">
                    <Scale className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Regional Tax Matrix</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Enforce jurisdictional tax rules across global acquisitions. Standard models include Sales Tax (US), VAT (UK/UAE), and GST (IN/SG).
                 </p>
                 <div className="space-y-4 pt-4 border-t border-border">
                    {countryConfigs.map(c => (
                      <div key={c.code} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-gray-400">{c.name} Hub</span>
                         <span className="text-plum tabular">{c.taxType} ({c.taxRate}%)</span>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="bg-white border-border shadow-luxury p-10 space-y-8">
                 <div className="flex items-center space-x-4 text-plum">
                    <ShieldCheck className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Institutional Audit</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Maintain an immutable record of all financial settlements and curatorial reconciliations for global regulatory compliance.
                 </p>
                 <Button variant="outline" className="w-full h-12 border-border text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white">
                    EXPORT FISCAL YEAR LOGS
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
          <Badge variant="outline" className="text-[8px] uppercase">{trend}</Badge>
       </div>
       <div className="text-4xl font-body font-bold italic text-gray-900 tabular">{value}</div>
    </Card>
  );
}

function YieldRow({ label, val, status }: { label: string, val: number, status: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span className="opacity-60">{label}</span>
        <span className="text-gold">{status}</span>
      </div>
      <Progress value={val} className="h-1 bg-white/10" />
    </div>
  );
}
