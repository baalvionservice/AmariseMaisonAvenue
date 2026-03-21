
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  FileText, 
  RefreshCcw, 
  ChevronRight, 
  Receipt,
  Scale,
  ArrowRight,
  BadgeDollarSign,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Download,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  Search,
  CheckCircle2,
  XCircle,
  Smartphone,
  CreditCard,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  CartesianGrid
} from 'recharts';

export default function FinanceHub() {
  const { scopedTransactions, currentUser, countryConfigs, updateTransactionStatus } = useAppStore();
  const { toast } = useToast();
  const [activeInternalTab, setActiveInternalTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = useMemo(() => {
    const completed = scopedTransactions.filter(t => t.status === 'Settled' || t.status === 'Closed');
    const pipeline = scopedTransactions.filter(t => t.status === 'Paid' || t.status === 'Processing' || t.status === 'Pending');
    
    const revenueByCountry = countryConfigs.map(c => {
      const countryTrans = completed.filter(t => t.country.toLowerCase() === c.code.toLowerCase());
      return {
        country: c.name,
        value: countryTrans.reduce((acc, t) => acc + t.amount, 0),
        code: c.code
      };
    });

    const revenueByGateway = ['STRIPE', 'RAZORPAY', 'PAYU', 'BANK_TRANSFER'].map(gw => {
      const gwTrans = completed.filter(t => t.gateway === gw);
      return {
        gateway: gw,
        value: gwTrans.reduce((acc, t) => acc + t.amount, 0)
      };
    });

    return {
      netRevenue: completed.reduce((acc, t) => acc + (t.netAmount || t.amount), 0),
      totalTax: completed.reduce((acc, t) => acc + (t.taxAmount || 0), 0),
      pipelineValue: pipeline.reduce((acc, t) => acc + t.amount, 0),
      revenueByCountry,
      revenueByGateway
    };
  }, [scopedTransactions, countryConfigs]);

  const handleReconcile = (id: string) => {
    updateTransactionStatus(id, 'Settled');
    toast({
      title: "Transaction Reconciled",
      description: "Treasury ledger has been updated with verified funds.",
    });
  };

  const filteredTransactions = scopedTransactions.filter(tx => 
    tx.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <header className="flex justify-between items-end border-b border-white/5 pb-10">
        <div className="space-y-2">
          <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 flex items-center space-x-2">
             <Link href="/admin" className="hover:text-white transition-colors">Terminal</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-white">Institutional Treasury</span>
          </nav>
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-white uppercase">Finance Hub</h1>
          <p className="text-sm text-white/40 font-light italic">Global settlement engine & gateway health matrix.</p>
        </div>
        <div className="flex items-center space-x-6">
           <Button className="h-14 px-10 rounded-none bg-plum text-white hover:bg-black transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl">
             <BadgeDollarSign className="w-4 h-4 mr-3" /> RECONCILE LEDGER
           </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveInternalTab}>
        <TabsList className="bg-[#111113] border border-white/5 h-14 w-full justify-start p-1 rounded-none space-x-2 mb-10">
          <TabsTrigger value="overview" className="tab-trigger-modern !text-white/40 data-[state=active]:!bg-white/5 data-[state=active]:!text-white rounded-none">Strategic Yield</TabsTrigger>
          <TabsTrigger value="ledger" className="tab-trigger-modern !text-white/40 data-[state=active]:!bg-white/5 data-[state=active]:!text-white rounded-none">Global Ledger</TabsTrigger>
          <TabsTrigger value="gateways" className="tab-trigger-modern !text-white/40 data-[state=active]:!bg-white/5 data-[state=active]:!text-white rounded-none">Gateway Resonance</TabsTrigger>
          <TabsTrigger value="compliance" className="tab-trigger-modern !text-white/40 data-[state=active]:!bg-white/5 data-[state=active]:!text-white rounded-none">Jurisdictional Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatsTile label="Net Settled" value={`$${(stats.netRevenue / 1000).toFixed(1)}k`} trend="Live Settlement" />
              <StatsTile label="Tax Reserve" value={`$${(stats.totalTax / 1000).toFixed(1)}k`} trend="Compliance: OK" />
              <StatsTile label="Pipeline Yield" value={`$${(stats.pipelineValue / 1000).toFixed(1)}k`} trend="Awaiting Settlement" />
              <StatsTile label="Liquidity Score" value="98.2%" trend="Optimal" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <Card className="lg:col-span-8 bg-[#111113] border-white/5 rounded-none overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-white/[0.02] p-8">
                   <CardTitle className="font-headline text-2xl text-white uppercase italic">Regional Performance Matrix</CardTitle>
                   <CardDescription className="text-[10px] uppercase tracking-widest text-white/30">Settled revenue split by jurisdictional hub</CardDescription>
                </CardHeader>
                <CardContent className="p-10 h-[380px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.revenueByCountry}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                        <XAxis dataKey="country" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#666', fontWeight: 700}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#666'}} />
                        <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                        <Bar dataKey="value" fill="#7E3F98" radius={[2, 2, 0, 0]} />
                      </BarChart>
                   </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-4 bg-black text-white p-10 flex flex-col justify-center space-y-10 shadow-2xl relative overflow-hidden border-none">
                 <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                    <Database className="w-40 h-40 text-blue-500" />
                 </div>
                 <h3 className="text-3xl font-headline font-bold italic tracking-tight">Treasury Health</h3>
                 <div className="space-y-8">
                    <YieldRow label="US Hub Settlement" val={100} status="SECURED" color="text-emerald-400" />
                    <YieldRow label="UAE Hub Reserve" val={65} status="PENDING" color="text-blue-400" />
                    <YieldRow label="Global Liquidity" val={92} status="OPTIMAL" color="text-emerald-400" />
                 </div>
                 <Button variant="outline" className="w-full rounded-none border-white/10 text-white/60 hover:bg-white hover:text-black text-[9px] font-bold uppercase tracking-widest h-12 mt-6">
                    EXPORT SETTLEMENT LOGS
                 </Button>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="ledger" className="animate-fade-in space-y-8">
           <Card className="bg-[#111113] border-white/5 rounded-none overflow-hidden shadow-2xl">
              <CardHeader className="bg-white/[0.02] border-b border-white/5 flex flex-row items-center justify-between p-6">
                 <div>
                    <CardTitle className="text-white font-headline text-xl">Transactional Registry</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest text-white/30">High-fidelity ledger of all global transfers</CardDescription>
                 </div>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                    <input 
                      className="bg-white/5 border border-white/10 h-10 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none w-64 focus:border-plum text-white" 
                      placeholder="FILTER LEDGER..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                 </div>
              </CardHeader>
              <Table>
                <TableHeader className="bg-white/[0.02]">
                  <TableRow className="border-white/5">
                    <TableHead className="text-[9px] uppercase font-bold pl-8 text-white/40">Entry ID</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-white/40">Collector Identity</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-white/40">Settlement Gateway</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-white/40">Delta</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-center text-white/40">Status</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-right pr-8 text-white/40">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map(tx => (
                    <TableRow key={tx.id} className="hover:bg-white/5 transition-colors border-white/5">
                      <TableCell className="pl-8 font-mono text-[10px] uppercase text-plum">{tx.id}</TableCell>
                      <TableCell className="text-xs font-bold uppercase text-white/80 tracking-tight">{tx.clientName}</TableCell>
                      <TableCell>
                         <div className="flex items-center space-x-2 text-white/40">
                            {tx.gateway === 'STRIPE' && <CreditCard className="w-3 h-3" />}
                            {tx.gateway === 'RAZORPAY' && <Smartphone className="w-3 h-3" />}
                            {tx.gateway === 'PAYU' && <Globe className="w-3 h-3" />}
                            {tx.gateway === 'BANK_TRANSFER' && <Building2 className="w-3 h-3" />}
                            <span className="text-[9px] font-bold uppercase">{tx.gateway || 'MAISON_WALLET'}</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-sm font-bold text-white tabular">${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("text-[7px] uppercase border-none px-2 py-0.5", 
                          tx.status === 'Settled' ? "bg-emerald-500/10 text-emerald-400" : 
                          tx.status === 'Pending' ? "bg-blue-500/10 text-blue-400" :
                          "bg-white/10 text-white/40"
                        )}>{tx.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        {tx.status === 'Pending' && tx.gateway === 'BANK_TRANSFER' ? (
                          <Button size="sm" className="h-7 bg-white text-black hover:bg-plum hover:text-white text-[8px] font-bold uppercase rounded-none" onClick={() => handleReconcile(tx.id)}>
                             RECONCILE
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/20 hover:text-white"><FileText className="w-3.5 h-3.5" /></Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-40 text-center opacity-20">
                         <Receipt className="w-12 h-12 mx-auto mb-4" />
                         <p className="text-[10px] font-bold uppercase tracking-widest italic">Ledger currently dormant.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
           </Card>
        </TabsContent>

        <TabsContent value="gateways" className="animate-fade-in space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.revenueByGateway.map(gw => (
                <Card key={gw.gateway} className="bg-[#111113] border-white/5 p-8 space-y-6 rounded-none group hover:border-plum transition-all">
                   <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover:text-plum">{gw.gateway}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   </div>
                   <div className="text-3xl font-body font-bold text-white tabular">${(gw.value / 1000).toFixed(1)}k</div>
                   <div className="pt-4 border-t border-white/5">
                      <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-white/20">
                         <span>API Health</span>
                         <span className="text-emerald-500">OPTIMAL</span>
                      </div>
                   </div>
                </Card>
              ))}
           </div>
        </TabsContent>

        <TabsContent value="compliance" className="animate-fade-in space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Card className="bg-[#111113] border-white/5 p-10 space-y-8 rounded-none">
                 <div className="flex items-center space-x-4 text-blue-400">
                    <Scale className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest text-white">Jurisdictional Tax Matrix</h3>
                 </div>
                 <p className="text-sm text-white/40 font-light italic leading-relaxed">
                   Management of jurisdictional tax logic across 5 active hubs. System automates Sales Tax (US), VAT (UK/UAE), and GST (IN/SG) calculations.
                 </p>
                 <div className="space-y-4 pt-6 border-t border-white/5">
                    {countryConfigs.map(c => (
                      <div key={c.code} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-white/20">{c.name} Hub</span>
                         <span className="text-plum tabular">{c.taxType} / {c.taxRate}%</span>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="bg-[#111113] border-white/5 p-10 space-y-8 rounded-none">
                 <div className="flex items-center space-x-4 text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest text-white">Institutional Audit</h3>
                 </div>
                 <p className="text-sm text-white/40 font-light italic leading-relaxed">
                   Immutable record of all financial settlements and curatorial reconciliations. Verified by Maison Core Security Protocols.
                 </p>
                 <div className="pt-4">
                    <Button variant="outline" className="w-full h-12 border-white/10 text-white/60 hover:bg-white hover:text-black text-[9px] font-bold uppercase tracking-widest">
                       GENERATE FISCAL COMPLIANCE REPORT
                    </Button>
                 </div>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsTile({ label, value, trend }: { label: string, value: string, trend: string }) {
  return (
    <Card className="bg-[#111113] border-white/5 p-8 space-y-4 group hover:border-blue-500/40 transition-all rounded-none shadow-xl">
       <div className="flex justify-between items-start">
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover:text-blue-400 transition-colors">{label}</span>
          <Badge variant="outline" className="text-[7px] uppercase border-none bg-blue-500/5 text-blue-400">{trend}</Badge>
       </div>
       <div className="text-4xl font-body font-bold italic text-white/90 group-hover:text-white tabular">{value}</div>
    </Card>
  );
}

function YieldRow({ label, val, status, color }: { label: string, val: number, status: string, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em]">
        <span className="opacity-40">{label}</span>
        <span className={cn("tabular", color)}>{status}</span>
      </div>
      <div className="h-0.5 bg-white/5 w-full">
         <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${val}%` }} />
      </div>
    </div>
  );
}
