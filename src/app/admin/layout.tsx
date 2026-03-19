
'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, CheckCircle2, Target, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * AdminLayout: Optimized for Curatorial Workflow
 * Orchestrates the institutional shell with Interactive Guide and View Mode support.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { globalSettings, scopedNotifications, scopedApprovals, scopedErrors } = useAppStore();

  const urgentTaskCount = scopedNotifications.filter(n => !n.read && n.type === 'alert').length + 
                          scopedApprovals.filter(a => a.status === 'pending').length +
                          scopedErrors.filter(e => !e.resolved && e.severity === 'high').length;

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopBar />
        
        <main className="flex-1 overflow-y-auto relative bg-[#fcfcfc]">
          {/* Today's Priority Context Bar */}
          <div className="bg-black text-white px-8 py-3 flex items-center justify-between border-b border-white/5">
             <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                   <Target className="w-3.5 h-3.5 text-gold" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Today's Focus:</span>
                </div>
                <div className="flex items-center space-x-4">
                   <span className="text-[10px] text-white/60 uppercase tracking-widest">{urgentTaskCount} Strategic Actions Required</span>
                   <div className="h-3 w-px bg-white/10" />
                   <span className="text-[10px] text-white/60 uppercase tracking-widest">Market Status: Operational</span>
                </div>
             </div>
             <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Global Node Verified</span>
             </div>
          </div>

          {/* Interactive Guide Mode Overlay */}
          {globalSettings.isGuideMode && (
            <div className="bg-plum text-white p-6 flex items-center justify-between animate-fade-in shadow-2xl relative z-40">
               <div className="flex items-center space-x-6">
                  <div className="p-3 bg-white/10 rounded-full"><Sparkles className="w-5 h-5 text-gold" /></div>
                  <div className="space-y-0.5">
                     <p className="text-[11px] font-bold uppercase tracking-widest">Maison Interactive Workflow</p>
                     <p className="text-xs italic text-white/80">"Institutional discovery is a dialogue. Follow the artisanal steps to maintain the archive."</p>
                  </div>
               </div>
               <div className="flex items-center space-x-10">
                  <InteractiveStep num={1} label="Register Artifact" active />
                  <ArrowRight className="w-3 h-3 text-white/30" />
                  <InteractiveStep num={2} label="AI Enrichment" />
                  <ArrowRight className="w-3 h-3 text-white/30" />
                  <InteractiveStep num={3} label="Audit Verification" />
                  <ArrowRight className="w-3 h-3 text-white/30" />
                  <InteractiveStep num={4} label="Global Indexing" />
               </div>
               <Button variant="ghost" className="text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 h-10 px-6">
                 Skip Guide
               </Button>
            </div>
          )}
          
          <div className="p-10 pb-40">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function InteractiveStep({ num, label, active = false }: { num: number, label: string, active?: boolean }) {
  return (
    <div className={cn("flex items-center space-x-3 transition-all", active ? "opacity-100 scale-105" : "opacity-40")}>
       <div className={cn(
         "w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all", 
         active ? "bg-gold border-gold text-black shadow-lg shadow-gold/20" : "border-white/30 text-white"
       )}>
          {num}
       </div>
       <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
