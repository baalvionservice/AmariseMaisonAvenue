'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Sliders, ShieldCheck, Activity, BrainCircuit, Cpu, Database, TrendingUp, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { useAI } from '@/hooks/use-ai';
import { cn } from '@/lib/utils';

/**
 * Layer 4: AI Control Panel.
 * Consolidation node for Neural Logic, Dynamic Pricing, and Fraud Matrix.
 */
export default function AICommandPanel() {
  const { modules, logs } = useAI();

  return (
    <div className="space-y-12 animate-fade-in font-body">
      <header className="flex justify-between items-end border-b border-white/5 pb-12">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 mb-2 text-plum">
             <BrainCircuit className="w-5 h-5" />
             <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Tactical Layer 4</span>
          </div>
          <h1 className="text-5xl font-headline font-bold italic tracking-tight text-white uppercase leading-none">
            Neural Control
          </h1>
          <p className="text-sm text-white/40 font-light italic">Orchestrating autonomous business logic and predictive matrix.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Link href="/admin/ai-dashboard">
              <Button variant="outline" className="h-12 border-white/10 text-white/60 hover:bg-white hover:text-black text-[9px] font-bold uppercase tracking-widest rounded-none">
                VIEW FULL DASHBOARD
              </Button>
           </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <ModuleCard 
            title="Dynamic Pricing" 
            desc="Optimizing artifact yield based on registry scarcity." 
            icon={<TrendingUp />} 
            status="Auto" 
         />
         <ModuleCard 
            title="Fraud Matrix" 
            desc="Heuristic risk scoring for high-value settlement." 
            icon={<ShieldCheck />} 
            status="Active" 
         />
         <ModuleCard 
            title="Resonance Engine" 
            desc="Personalized discovery for elite client nodes." 
            icon={<Zap />} 
            status="Assisted" 
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <Card className="lg:col-span-8 bg-[#111113] border-white/5 rounded-none overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
               <CardTitle className="font-headline text-2xl text-white italic">Neural Traces</CardTitle>
            </CardHeader>
            <div className="p-0">
               {logs.slice(0, 8).map(log => (
                 <div key={log.id} className="p-6 flex items-center justify-between border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center space-x-6">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-plum w-24">{log.moduleId}</span>
                       <p className="text-xs text-white/60 italic font-light">"{log.action}"</p>
                    </div>
                    <Badge variant="outline" className="text-[7px] border-white/10 text-white/20 uppercase">{new Date(log.timestamp).toLocaleTimeString()}</Badge>
                 </div>
               ))}
            </div>
         </Card>

         <aside className="lg:col-span-4 space-y-8">
            <Card className="bg-black text-white p-10 space-y-8 shadow-2xl relative overflow-hidden rounded-none border-none">
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><Cpu className="w-40 h-40 text-plum" /></div>
               <h3 className="text-2xl font-headline font-bold italic tracking-tight leading-none">Model Health</h3>
               <div className="space-y-6">
                  <HealthRow label="Confidence" val={98.2} />
                  <HealthRow label="Alignment" val={100} />
                  <HealthRow label="Latency" val={142} unit="ms" />
               </div>
            </Card>

            <div className="p-8 border border-white/5 bg-white/[0.02] space-y-4">
               <div className="flex items-center space-x-3 text-gold">
                  <Info className="w-4 h-4" />
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">Logic Safety</h4>
               </div>
               <p className="text-[10px] text-white/40 italic leading-relaxed">
                 "Neural overrides are strictly governed by the 1924 Maison Charter. Manual curatorial review is mandatory for all $100k+ adjustments."
               </p>
            </div>
         </aside>
      </div>
    </div>
  );
}

function ModuleCard({ title, desc, icon, status }: any) {
  return (
    <Card className="bg-[#111113] border-white/5 p-8 space-y-6 hover:border-plum transition-all rounded-none shadow-xl group">
       <div className="flex justify-between items-start">
          <div className="p-3 bg-white/5 text-white/20 rounded-none group-hover:text-plum transition-colors">{icon}</div>
          <Badge className="bg-white/5 text-white/40 border-none text-[8px] uppercase">{status}</Badge>
       </div>
       <div className="space-y-2">
          <h4 className="text-lg font-headline font-bold text-white uppercase tracking-tight">{title}</h4>
          <p className="text-[10px] text-white/30 italic font-light leading-relaxed">{desc}</p>
       </div>
    </Card>
  );
}

function HealthRow({ label, val, unit = "%" }: any) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
       <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">{label}</span>
       <span className="text-sm font-bold text-white tabular">{val}{unit}</span>
    </div>
  );
}
