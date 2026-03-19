
'use client';

import React from 'react';
import { 
  Plus, 
  Zap, 
  Globe, 
  LayoutDashboard, 
  Bell, 
  HelpCircle, 
  UserCircle,
  Settings,
  Search
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

/**
 * AdminTopBar: Global Functional Header
 * Provides persistent actions and jurisdictional context across all terminals.
 */
export function AdminTopBar() {
  const { 
    currentUser, 
    scopedNotifications, 
    globalSettings, 
    setGuideMode,
    countryConfigs
  } = useAppStore();
  const { toast } = useToast();

  const handleQuickAction = (msg: string) => {
    toast({ title: "Global Action", description: msg });
  };

  return (
    <header className="h-24 bg-white/80 luxury-blur border-b border-border flex items-center justify-between px-10 sticky top-0 z-30 shrink-0">
      <div className="flex items-center space-x-12">
        {/* Jurisdictional Context */}
        <div className="flex items-center space-x-4 bg-ivory border border-border px-5 py-2 group cursor-pointer hover:border-plum transition-all">
           <Globe className="w-4 h-4 text-plum" />
           <div className="flex flex-col">
              <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Jurisdiction</span>
              <span className="text-[10px] font-bold uppercase">{currentUser?.country.toUpperCase()} Market Hub</span>
           </div>
        </div>

        {/* Global Quick Actions */}
        <div className="flex items-center space-x-4 border-l border-border pl-12">
           <Button 
            variant="outline" 
            className="h-10 border-border text-[9px] font-bold uppercase tracking-widest px-6 hover:bg-black hover:text-white"
            onClick={() => handleQuickAction("Artifact creation terminal initialized.")}
           >
             <Plus className="w-3.5 h-3.5 mr-2" /> ADD ARTIFACT
           </Button>
           <Button 
            variant="outline" 
            className="h-10 border-border text-[9px] font-bold uppercase tracking-widest px-6 hover:bg-plum hover:text-white"
            onClick={() => handleQuickAction("Autonomous metadata generation triggered.")}
           >
             <Zap className="w-3.5 h-3.5 mr-2" /> EXECUTE AI
           </Button>
        </div>
      </div>

      <div className="flex items-center space-x-8">
        {/* Guide Mode Toggle */}
        <div className="flex items-center space-x-3 bg-white border border-border px-4 py-2">
           <span className={cn("text-[9px] font-bold uppercase tracking-widest", globalSettings.isGuideMode ? "text-plum" : "text-gray-300")}>
             Guide Mode
           </span>
           <Switch checked={globalSettings.isGuideMode} onCheckedChange={setGuideMode} className="data-[state=checked]:bg-plum" />
        </div>

        {/* System Utility */}
        <div className="flex items-center space-x-2">
           <button className="p-3 text-gray-400 hover:text-plum transition-colors relative">
              <Bell className="w-5 h-5" />
              {scopedNotifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full" />
              )}
           </button>
           <button className="p-3 text-gray-400 hover:text-plum transition-colors">
              <HelpCircle className="w-5 h-5" />
           </button>
        </div>

        {/* User Identity */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-4 pl-8 border-l border-border group outline-none">
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900 group-hover:text-plum transition-colors">{currentUser?.name}</p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">{currentUser?.role.replace('_', ' ')}</p>
               </div>
               <div className="w-10 h-10 bg-plum/10 border border-plum/20 rounded-full flex items-center justify-center font-headline text-lg font-bold text-plum group-hover:bg-plum group-hover:text-white transition-all">
                  {currentUser?.name.charAt(0)}
               </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 bg-white border-border shadow-2xl rounded-none">
             <div className="p-4 bg-ivory/50 mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest">Active Session</p>
                <p className="text-[8px] text-gray-400 mt-1 uppercase">Institutional Node Verified</p>
             </div>
             <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-plum/5">
                <UserCircle className="w-4 h-4 mr-3 text-gold" /> My Registry Profile
             </DropdownMenuItem>
             <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-plum/5">
                <Settings className="w-4 h-4 mr-3 text-gold" /> Security Settings
             </DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer text-red-500 hover:bg-red-50">
                Log out
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
