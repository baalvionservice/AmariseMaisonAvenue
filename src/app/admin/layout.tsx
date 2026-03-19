
'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * AdminLayout: Global Enterprise Wrapper
 * Orchestrates the institutional shell for all 11 specialized terminals.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { globalSettings } = useAppStore();

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopBar />
        
        <main className="flex-1 overflow-y-auto relative bg-[#fcfcfc]">
          {/* Guide Mode Overlay (Optional Step Sequence) */}
          {globalSettings.isGuideMode && (
            <div className="bg-plum/5 border-b border-plum/10 p-6 flex items-center justify-between animate-fade-in">
               <div className="flex items-center space-x-4">
                  <div className="p-2 bg-plum rounded-full text-white"><Sparkles className="w-4 h-4" /></div>
                  <div className="space-y-0.5">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-plum">Maison Guide Active</p>
                     <p className="text-xs italic text-gray-500">Recommended Next: "Audit 1,240 new arrivals in UAE Hub"</p>
                  </div>
               </div>
               <div className="flex items-center space-x-6">
                  <GuideStep num={1} label="Register" active />
                  <ArrowRight className="w-3 h-3 text-gray-300" />
                  <GuideStep num={2} label="Optimize" />
                  <ArrowRight className="w-3 h-3 text-gray-300" />
                  <GuideStep num={3} label="Verify" />
                  <ArrowRight className="w-3 h-3 text-gray-300" />
                  <GuideStep num={4} label="Publish" />
               </div>
            </div>
          )}
          
          <div className="p-8 pb-32">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function GuideStep({ num, label, active = false }: { num: number, label: string, active?: boolean }) {
  return (
    <div className={cn("flex items-center space-x-2", active ? "opacity-100" : "opacity-30")}>
       <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center text-[8px] font-bold", active ? "bg-plum text-white border-plum" : "border-gray-400")}>
          {num}
       </div>
       <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}
