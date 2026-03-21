'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { 
  Package, 
  Truck, 
  ChevronRight, 
  Search, 
  Filter, 
  FileText,
  History,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useParams } from 'next/navigation';

export default function AcquisitionsPage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const { transactions } = useAppStore();

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center space-x-2">
             <Link href={`/${countryCode}/account`}>Dashboard</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-plum">Acquisition Registry</span>
          </nav>
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-gray-900 uppercase">Acquisitions</h1>
          <p className="text-sm text-gray-500 font-light italic">Detailed ledger of your global Maison collection.</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
              <input className="bg-white border border-border h-10 pl-10 pr-4 text-[9px] font-bold uppercase tracking-widest outline-none w-48 focus:ring-1 focus:ring-plum transition-all" placeholder="FILTER LEDGER..." />
           </div>
        </div>
      </header>

      <Card className="bg-white border-border shadow-luxury overflow-hidden">
        <Table>
          <TableHeader className="bg-ivory/50">
            <TableRow>
              <TableHead className="text-[9px] uppercase font-bold pl-8">Artifact</TableHead>
              <TableHead className="text-[9px] uppercase font-bold">Region</TableHead>
              <TableHead className="text-[9px] uppercase font-bold">Value</TableHead>
              <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
              <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(tx => (
              <TableRow key={tx.id} className="hover:bg-ivory/30 transition-colors">
                <TableCell className="pl-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-12 bg-muted rounded-sm flex items-center justify-center text-[6px] font-bold text-gray-400 uppercase border border-border">Asset</div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-tight text-gray-900">Maison Heritage Transfer</span>
                      <span className="text-[8px] text-gray-400 uppercase font-mono">ID: {tx.id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{tx.country.toUpperCase()} Hub</span></TableCell>
                <TableCell><span className="text-sm font-bold text-gray-900">${tx.amount.toLocaleString()}</span></TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={cn("text-[8px] uppercase tracking-tighter border-none", 
                    tx.status === 'Settled' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold'
                  )}>
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><FileText className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><History className="w-3.5 h-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-40 text-center opacity-30">
                   <Package className="w-12 h-12 mx-auto mb-4" />
                   <p className="text-sm font-bold uppercase tracking-widest italic">Your acquisition history is currently empty.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Logistics Support CTA */}
      <section className="bg-plum/5 py-12 px-10 border border-plum/10 rounded-sm flex flex-col md:row items-center justify-between gap-8">
         <div className="flex items-center space-x-6">
            <div className="p-4 bg-white rounded-full text-plum"><Truck className="w-6 h-6" /></div>
            <div>
               <h4 className="text-lg font-headline font-bold italic">Logistical Assistance</h4>
               <p className="text-xs text-gray-500 font-light italic">Need help with high-fidelity delivery orchestration?</p>
            </div>
         </div>
         <Link href={`/${countryCode}/account/concierge`}>
            <Button className="rounded-none bg-black text-white hover:bg-plum text-[9px] font-bold uppercase tracking-widest h-12 px-10 transition-all">
               Contact Concierge <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
         </Link>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { cn } from '@/lib/utils';
