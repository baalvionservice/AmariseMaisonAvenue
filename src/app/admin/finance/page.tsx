
'use client';

import React, { useState } from 'react';
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
  Cpu
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

export default function FinanceHub() {
  const { invoices, vendors } = useAppStore();
  const { toast } = useToast();

  const handleAction = (msg: string) => {
    toast({ title: "Finance Operation", description: msg });
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">FINANCE</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Maison Treasury Hub</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <FinanceNavItem icon={<LayoutDashboard />} label="Ledger Overview" active={true} />
          <FinanceNavItem icon={<FileText />} label="Invoicing" active={false} />
          <FinanceNavItem icon={<Building2 />} label="Vendor Payouts" active={false} />
          <FinanceNavItem icon={<PieChart />} label="Tax Reporting" active={false} />
          <FinanceNavItem icon={<Lock />} label="Reconciliation" active={false} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3" /> Exit Hub
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">
              Ledger & Invoicing
            </h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              Global Transactional Oversight
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Button className="bg-plum text-white hover:bg-gold h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest">
              <Plus className="w-3 h-3 mr-2" /> GENERATE INVOICE
            </Button>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">AF</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={<DollarSign />} label="Net Revenue (MTD)" value="$1.2M" trend="+12.4%" positive />
            <StatCard icon={<CreditCard />} label="Pending Payouts" value="$245k" trend="Scheduled" positive />
            <StatCard icon={<TrendingUp />} label="Avg. Order Value" value="$8,450" trend="+2.1%" positive />
            <StatCard icon={<CheckCircle2 />} label="Reconciled Today" value="98.2%" trend="Optimal" positive />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-headline text-2xl">Invoice Registry</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Automated artisanal transaction logs</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Invoice ID</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Client</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Amount</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map(inv => (
                      <TableRow key={inv.id} className="hover:bg-ivory/30">
                        <TableCell className="text-xs font-bold font-mono pl-8">{inv.id}</TableCell>
                        <TableCell className="text-xs font-light">{inv.customerName}</TableCell>
                        <TableCell className="text-xs font-bold text-plum">{inv.currency} {inv.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn("text-[8px] uppercase tracking-widest", inv.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold')}>
                            {inv.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction("Downloading PDF.")}><Download className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-white border-border shadow-luxury">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-headline text-2xl">Regional Tax Compliance</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Global jurisdictional reporting</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-8">
                <ComplianceRow label="VAT (United Kingdom)" status="Ready" progress={100} />
                <ComplianceRow label="Sales Tax (US)" status="Optimal" progress={95} />
                <ComplianceRow label="GST (Singapore)" status="Ready" progress={100} />
                <ComplianceRow label="Customs (UAE)" status="Processing" progress={65} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function FinanceNavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick?: () => void }) {
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
        <span>{label}</span>
        <span className="text-plum">{status}</span>
      </div>
      <Progress value={progress} className="h-1 bg-ivory" />
    </div>
  );
}
