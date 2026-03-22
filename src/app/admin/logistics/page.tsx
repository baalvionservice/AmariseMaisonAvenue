
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Globe,
  Package,
  ArrowRight,
  Info,
  ExternalLink,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

/**
 * Logistics Terminal: High-Fidelity Dispatch Control.
 * Manages the "Absolute Standard" of Maison global delivery.
 */
export default function LogisticsHub() {
  const { scopedTransactions, currentUser } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const activeShipments = scopedTransactions.filter(t => t.status === 'Settled' || t.status === 'Paid');

  return (
    <div className="space-y-12 animate-fade-in font-body">
      <header className="flex justify-between items-end border-b border-white/5 pb-12">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 mb-2 text-blue-400">
             <Truck className="w-5 h-5" />
             <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Dispatch Protocol</span>
          </div>
          <h1 className="text-5xl font-headline font-bold italic tracking-tight text-white uppercase">Logistics Matrix</h1>
          <p className="text-sm text-white/40 font-light italic">Orchestrating global white-glove dispatch and archival transit.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button className="h-14 px-10 rounded-none bg-blue-600 text-white hover:bg-blue-500 transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl">
             <Plus className="w-4 h-4 mr-3" /> INITIATE DISPATCH
           </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Fulfillment Queue */}
        <div className="lg:col-span-8 space-y-12">
           <Card className="bg-[#111113] border-white/5 shadow-2xl overflow-hidden rounded-none">
              <CardHeader className="border-b border-white/5 bg-white/5 flex flex-row items-center justify-between">
                 <div>
                    <CardTitle className="font-headline text-2xl text-white">Active Queue</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest text-white/30">Artifacts currently in the logistics lifecycle</CardDescription>
                 </div>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                    <input 
                      className="bg-white/5 border border-white/10 h-10 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none w-48 focus:border-blue-500 transition-all text-white" 
                      placeholder="SEARCH REF..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                 </div>
              </CardHeader>
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5">
                    <TableHead className="text-[9px] uppercase font-bold pl-8 text-white/40">Registry ID</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-white/40">Artifact</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-white/40">Hub Destination</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-center text-white/40">Lifecycle</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-right pr-8 text-white/40">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeShipments.map(shipment => (
                    <TableRow key={shipment.id} className="hover:bg-white/5 transition-colors border-white/5">
                      <TableCell className="pl-8 font-mono text-[10px] text-blue-400">{shipment.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-white/80 uppercase">{shipment.artifactName}</span>
                           <span className="text-[8px] text-white/20 uppercase tracking-tighter">REF: {shipment.artifactSku?.toUpperCase() || shipment.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center space-x-2">
                            <span className="text-lg grayscale brightness-200">🇺🇸</span>
                            <span className="text-[10px] font-bold text-white/40 uppercase">{shipment.country.toUpperCase()} HUB</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-center">
                         <div className="flex items-center justify-center space-x-1">
                            {[1, 2, 3, 4, 5].map(step => (
                              <div key={step} className={cn("w-1.5 h-1.5 rounded-full", step < 3 ? "bg-blue-500" : "bg-white/10")} />
                            ))}
                         </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 text-[7px] uppercase border-none">In Transit</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {activeShipments.length === 0 && (
                    <TableRow>
                       <TableCell colSpan={5} className="py-40 text-center opacity-20">
                          <Package className="w-12 h-12 mx-auto mb-4" />
                          <p className="text-[10px] font-bold uppercase tracking-widest">No active Logistics Records</p>
                       </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
           </Card>
        </div>

        {/* Global Strategy Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
           <Card className="bg-black text-white p-10 space-y-8 shadow-2xl relative overflow-hidden rounded-none border-none">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                 <ShieldCheck className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center space-x-3 text-gold">
                    <Globe className="w-5 h-5" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Global Charter</h4>
                 </div>
                 <p className="text-xs font-light italic leading-relaxed opacity-70">
                   "Institutional dispatch is an architectural process. Every artifact must pass the 12-point Heritage Audit before the White-Glove Logistics protocol is initialized."
                 </p>
                 <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                       <span className="opacity-40">Dispatch accuracy</span>
                       <span className="text-emerald-400">100.0%</span>
                    </div>
                    <div className="h-0.5 bg-white/5 w-full"><div className="h-full bg-blue-500 w-full" /></div>
                 </div>
              </div>
           </Card>

           <div className="p-8 border border-white/5 bg-white/[0.02] space-y-6">
              <div className="flex items-center space-x-3 text-blue-400">
                 <Zap className="w-4 h-4" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest">Real-time Traces</h4>
              </div>
              <p className="text-[10px] text-white/40 italic leading-relaxed">
                "Direct API connectivity with our global courier partners ensures absolute surface transparency for the connoisseur."
              </p>
              <Button variant="outline" className="w-full border-white/10 text-white/60 h-12 rounded-none text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black">
                 OPEN COURIER CONSOLE
              </Button>
           </div>
        </aside>
      </div>
    </div>
  );
}
