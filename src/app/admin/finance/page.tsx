
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
  Cpu,
  ShieldCheck,
  Globe,
  Receipt,
  Scale
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

type FinanceTab = 'overview' | 'invoices' | 'payouts' | 'tax' | 'compliance' | 'reports';

export default function FinanceHub() {
  const [activeTab, setActiveTab] = useState<FinanceTab>('overview');
  const { invoices, vendors, globalSettings } = useAppStore();
  const { toast } = useToast();

  const handleAction = (msg: string) => {
    toast({ title: "Finance Operation", description: msg });
  };

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
          <FinanceNavItem icon={<Receipt />} label="Invoicing & Billing" active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} />
          <FinanceNavItem icon={<Building2 />} label="Vendor Settlements" active={activeTab === 'payouts'} onClick={() => setActiveTab('payouts')} />
          <FinanceNavItem icon={<Globe />} label="Tax & Customs" active={activeTab === 'tax'} onClick={() => setActiveTab('tax')} />
          <FinanceNavItem icon={<ShieldCheck />} label="Regulatory Audit" active={activeTab === 'compliance'} onClick={() => setActiveTab('compliance')} />
          <FinanceNavItem icon={<TrendingUp />} label="Financial Reports" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3" /> Exit Treasury
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">
              {activeTab}
            </h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              Global Treasury Oversight • Multi-Market Liquidity
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Button className="bg-plum text-white hover:bg-gold h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest" onClick={() => handleAction("New manual invoice generated.")}>
              <Plus className="w-3 h-3 mr-2" /> GENERATE BILLING
            </Button>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">AF</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<DollarSign />} label="Net Revenue (Global)" value="$1.2M" trend="+12.4%" positive />
                <StatCard icon={<Globe />} label="Tax Liability accrued" value="$245k" trend="Compliance: 100%" positive />
                <StatCard icon={<ShieldCheck />} label="Verified Settlements" value="98.2%" trend="Optimal" positive />
                <StatCard icon={<Clock />} label="Awaiting Release" value="$180k" trend="Scheduled" positive />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Transactional Registry</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Automated artisanal invoice logs & legal exports</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-ivory/50">
                        <TableRow>
                          <TableHead className="text-[9px] uppercase font-bold pl-8">Entry ID</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Connoisseur</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Value</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-center">Tax Cert</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Audit Export</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map(inv => (
                          <TableRow key={inv.id} className="hover:bg-ivory/30">
                            <TableCell className="text-xs font-bold font-mono pl-8">{inv.id}</TableCell>
                            <TableCell className="text-xs font-light">{inv.customerName}</TableCell>
                            <TableCell className="text-xs font-bold text-plum">{inv.currency} {inv.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="text-[8px] uppercase tracking-tighter">VAT-{inv.taxRate}% Certified</Badge>
                            </TableCell>
                            <TableCell className="text-right pr-8">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction("Exporting ISO-certified PDF.")}><FileText className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction("Sent to external ERP.")}><RefreshCcw className="w-4 h-4" /></Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Regional Payout Velocity</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Global partner disbursement status</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <ComplianceRow label="Europe (EUR/GBP)" status="Ready" progress={100} />
                    <ComplianceRow label="Americas (USD)" status="Optimal" progress={95} />
                    <ComplianceRow label="Asia Pacific (SGD/INR)" status="Ready" progress={100} />
                    <ComplianceRow label="Middle East (AED)" status="Reporting" progress={65} />
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {['invoices', 'payouts', 'tax', 'compliance', 'reports'].includes(activeTab) && (
            <div className="py-40 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-12 bg-ivory border border-border rounded-full animate-pulse">
                  <Scale className="w-12 h-12 text-gold/30 mx-auto" />
                </div>
              </div>
              <p className="text-2xl text-muted-foreground font-light italic font-headline">
                The {activeTab} ledger is currently synchronizing with the Maison Treasury registry.
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
        <span>{label}</span>
        <span className="text-plum">{status}</span>
      </div>
      <Progress value={progress} className="h-1 bg-ivory" />
    </div>
  );
}
