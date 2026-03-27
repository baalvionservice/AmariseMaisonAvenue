'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, History, Search, Download, ChevronRight, Lock, Activity, Eye, FileText, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
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
 * Layer 4: Audit & Logs Panel.
 * The absolute record of institutional truth.
 */
export default function AuditCommandHub() {
  const { scopedAuditLogs, currentUser } = useAppStore();

  return (
    <div className="space-y-12 animate-fade-in font-body">
      <header className="flex justify-between items-end border-b border-white/5 pb-12">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 mb-2 text-emerald-500">
             <ShieldCheck className="w-5 h-5" />
             <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Tactical Layer 4</span>
          </div>
          <h1 className="text-5xl font-headline font-bold italic tracking-tight text-white uppercase leading-none">
            Institutional Audit
          </h1>
          <p className="text-sm text-white/40 font-light italic">Immutable record of global Maison actions and state mutations.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button className="h-14 px-10 rounded-none bg-white text-black hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl">
             <Download className="w-4 h-4 mr-3" /> EXPORT FULL ARCHIVE
           </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-8 space-y-8">
            <Card className="bg-[#111113] border-white/5 shadow-2xl overflow-hidden rounded-none">
               <CardHeader className="border-b border-white/5 bg-white/5 flex flex-row items-center justify-between">
                  <CardTitle className="font-headline text-2xl text-white">Action Ledger</CardTitle>
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                     <input className="bg-white/5 border border-white/10 h-10 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none w-64 text-white" placeholder="FILTER LEDGER..." />
                  </div>
               </CardHeader>
               <Table>
                  <TableHeader className="bg-white/5">
                     <TableRow className="border-white/5">
                        <TableHead className="text-[9px] uppercase font-bold pl-8 text-white/40">Timestamp</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-white/40">Actor</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-white/40">Action</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-right pr-8 text-white/40">Status</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {scopedAuditLogs.slice(0, 15).map(log => (
                       <TableRow key={log.id} className="hover:bg-white/5 transition-colors border-white/5">
                          <TableCell className="pl-8 text-[10px] font-mono text-white/20">{new Date(log.timestamp).toLocaleString()}</TableCell>
                          <TableCell>
                             <div className="flex flex-col">
                                <span className="text-xs font-bold text-white/80 uppercase">{log.actorName}</span>
                                <span className="text-[8px] text-white/20 uppercase tracking-widest">{log.actorRole}</span>
                             </div>
                          </TableCell>
                          <TableCell className="text-xs font-light italic text-white/60">"{log.action}"</TableCell>
                          <TableCell className="text-right pr-8">
                             <Badge variant="outline" className="text-[7px] border-white/10 text-emerald-400 uppercase">Verified</Badge>
                          </TableCell>
                       </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </Card>
         </div>

         <aside className="lg:col-span-4 space-y-8">
            <Card className="bg-black text-white p-10 space-y-10 shadow-2xl relative overflow-hidden rounded-none border-none">
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><Lock className="w-40 h-40 text-emerald-500" /></div>
               <h3 className="text-3xl font-headline font-bold italic tracking-tight leading-none">Security Status</h3>
               <div className="space-y-6">
                  <StatLine label="Integrity" val="100%" />
                  <StatLine label="Retention" val="365 Days" />
                  <StatLine label="Compliance" val="Standard III" />
               </div>
               <Button variant="outline" className="w-full rounded-none border-emerald-900/40 text-emerald-400 hover:bg-emerald-500 hover:text-white text-[9px] font-bold uppercase tracking-widest h-12 mt-4">
                  RUN SECURITY FLUSH
               </Button>
            </Card>

            <div className="p-8 border border-white/5 bg-white/[0.02] space-y-6">
               <div className="flex items-center space-x-3 text-blue-400">
                  <Database className="w-4 h-4" />
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">Database Sync</h4>
               </div>
               <p className="text-[10px] text-white/40 italic leading-relaxed">
                 "Registry nodes are synchronized globally every 15 minutes. Latency is currently 12ms between hub nodes."
               </p>
            </div>
         </aside>
      </div>
    </div>
  );
}

function StatLine({ label, val }: any) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
       <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">{label}</span>
       <span className="text-sm font-bold text-white tabular">{val}</span>
    </div>
  );
}
