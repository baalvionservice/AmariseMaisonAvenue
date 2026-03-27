'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Boxes, ChevronRight, ArrowRight, Tag, ShieldCheck, Database, LayoutDashboard, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

/**
 * Layer 4: Commerce Command Hub.
 * Master control for Products and Inventory.
 */
export default function CommerceCommandHub() {
  const { scopedProducts } = useAppStore();

  return (
    <div className="space-y-12 animate-fade-in font-body">
      <header className="flex justify-between items-end border-b border-white/5 pb-12">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 mb-2 text-blue-400">
             <Package className="w-5 h-5" />
             <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Tactical Layer 4</span>
          </div>
          <h1 className="text-5xl font-headline font-bold italic tracking-tight text-white uppercase leading-none">
            Commerce Hub
          </h1>
          <p className="text-sm text-white/40 font-light italic">Orchestrating the global artifact registry and inventory liquidity.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Link href="/admin/content">
              <Button className="h-14 px-10 rounded-none bg-blue-600 text-white hover:bg-blue-500 transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-blue-600/20">
                MANAGE ATELIER REGISTRY
              </Button>
           </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <PanelCard 
            title="Registry Artifacts" 
            count={scopedProducts.length} 
            icon={<Tag />} 
            href="/admin/content"
            desc="Manage high-fidelity metadata, pricing, and SEO descriptors for the global catalog."
         />
         <PanelCard 
            title="Atomic Inventory" 
            count={scopedProducts.reduce((acc, p) => acc + p.stock, 0)} 
            icon={<Boxes />} 
            href="/admin/operations"
            desc="Control stock levels, warehouse allocations, and atomic locking protocols."
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
         <div className="lg:col-span-8">
            <Card className="bg-[#111113] border-white/5 shadow-2xl overflow-hidden rounded-none">
               <CardHeader className="border-b border-white/5 bg-white/5">
                  <CardTitle className="font-headline text-2xl text-white">Registry Inventory Pulse</CardTitle>
               </CardHeader>
               <CardContent className="p-8">
                  <div className="space-y-8">
                     {scopedProducts.slice(0, 4).map(prod => (
                       <div key={prod.id} className="flex items-center justify-between group">
                          <div className="flex items-center space-x-6">
                             <div className="w-12 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-[8px] font-bold text-white/20">ASSET</div>
                             <div className="space-y-1">
                                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{prod.name}</p>
                                <p className="text-[9px] text-white/20 font-mono">STOCK: {prod.stock} UNITS</p>
                             </div>
                          </div>
                          <Link href={`/admin/content?edit=${prod.id}`}>
                             <Button variant="ghost" size="icon" className="text-white/20 hover:text-white"><Settings size={16} /></Button>
                          </Link>
                       </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>

         <aside className="lg:col-span-4 space-y-8">
            <Card className="bg-black text-white p-8 space-y-6 shadow-2xl relative overflow-hidden rounded-none border-none">
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><ShieldCheck className="w-32 h-32 text-blue-500" /></div>
               <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Integrity Audit</h4>
               <p className="text-xs font-light italic leading-relaxed opacity-70">
                 "Registry consistency is verified against the 1924 Maison standards. Zero stock discrepancies detected across regional hubs."
               </p>
               <Button variant="outline" className="w-full border-blue-900/40 text-blue-400 hover:bg-blue-500 hover:text-white text-[9px] font-bold uppercase tracking-widest h-12">
                  RUN RE-INDEXING SYNC
               </Button>
            </Card>
         </aside>
      </div>
    </div>
  );
}

function PanelCard({ title, count, icon, href, desc }: any) {
  return (
    <Link href={href}>
       <Card className="bg-[#111113] border-white/5 p-10 space-y-6 group hover:border-blue-500/40 transition-all rounded-none shadow-2xl">
          <div className="flex justify-between items-start">
             <div className="p-4 bg-white/5 text-white/20 rounded-none group-hover:text-blue-400 transition-colors border border-white/5">{icon}</div>
             <span className="text-4xl font-headline font-bold italic text-white tabular">{count}</span>
          </div>
          <div className="space-y-2">
             <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-tight">{title}</h3>
             <p className="text-xs text-white/30 italic leading-relaxed">{desc}</p>
          </div>
          <div className="pt-4 flex items-center text-[10px] font-bold uppercase tracking-widest text-blue-400/60 group-hover:text-blue-400">
             ENTER MODULE <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </div>
       </Card>
    </Link>
  );
}
