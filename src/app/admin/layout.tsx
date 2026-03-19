
'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Sparkles, Info } from 'lucide-react';

/**
 * AdminLayout: Unified Enterprise Shell
 * Provides a consistent left sidebar and top command bar for all 11 admin panels.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { globalSettings } = useAppStore();

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-body antialiased text-slate-900">
      {/* Fixed Left Sidebar - High Authority Navigation */}
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Persistent Top Command Bar */}
        <AdminTopBar />
        
        {/* Dynamic Main Content Area */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar scroll-smooth">
          {/* Guide Mode Overlay: Beginner Assistance */}
          {globalSettings.isGuideMode && (
            <div className="bg-teal-500 text-white px-8 py-3 flex items-center justify-between animate-fade-in shadow-lg relative z-40">
               <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-medium tracking-wide">
                    <span className="font-bold uppercase mr-2">Institutional Guide:</span> 
                    You are in the Maison Management Terminal. Use the sidebar to navigate between global market hubs.
                  </div>
               </div>
               <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest opacity-80 cursor-help">
                 <Info className="w-3.5 h-3.5" />
                 <span>Help Center</span>
               </div>
            </div>
          )}
          
          {/* Page Container */}
          <div className="p-8 max-w-[1600px] mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
