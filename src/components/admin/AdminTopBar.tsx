
'use client';

import React from 'react';
import { 
  Plus, 
  Zap, 
  Globe, 
  Bell, 
  Search, 
  UserCircle, 
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { COUNTRIES } from '@/lib/mock-data';
import { useRouter, useParams } from 'next/navigation';

/**
 * AdminTopBar: Global Functional Header
 * Centralizes quick actions and jurisdictional hub controls.
 */
export function AdminTopBar() {
  const { 
    currentUser, 
    scopedNotifications, 
    globalSettings, 
    setGuideMode 
  } = useAppStore();
  const { toast } = useToast();
  const router = useRouter();
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;

  const handleAction = (msg: string) => {
    toast({ title: "Global Command", description: msg });
  };

  const handleCountrySwitch = (code: string) => {
    router.push(`/admin?market=${code}`);
    toast({ title: "Market Hub Switched", description: `Accessing ${code.toUpperCase()} jurisdictional data.` });
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40 shrink-0">
      {/* Left: Quick Search & Hub Status */}
      <div className="flex items-center space-x-8 flex-1">
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search artifacts, leads, or logs..." 
            className="w-full bg-slate-100 h-10 pl-10 pr-4 rounded-md text-sm border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">System Optimal</span>
        </div>
      </div>

      {/* Right: Global Actions & User Context */}
      <div className="flex items-center space-x-6">
        {/* Global Control Triggers */}
        <div className="flex items-center space-x-2 border-r border-slate-200 pr-6 mr-6">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 text-xs font-bold uppercase tracking-widest rounded-md transition-all shadow-md active:scale-95"
            onClick={() => handleAction("Artifact creation hub initialized.")}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Artifact
          </Button>
          <Button 
            variant="outline"
            className="border-slate-200 hover:bg-slate-50 text-slate-600 h-9 px-4 text-xs font-bold uppercase tracking-widest rounded-md"
            onClick={() => handleAction("Autonomous content cycles executed.")}
          >
            <Zap className="w-4 h-4 mr-2 text-blue-600" /> Run AI
          </Button>
        </div>

        {/* Global Hub Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-50 rounded-md transition-colors border border-transparent hover:border-slate-200 group">
              <Globe className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">{countryCode} HUB</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 bg-white rounded-lg shadow-xl border-slate-200">
            <DropdownMenuLabel className="text-[9px] uppercase tracking-[0.2em] text-slate-400 px-3 py-2">Select Hub</DropdownMenuLabel>
            {Object.values(COUNTRIES).map((c) => (
              <DropdownMenuItem 
                key={c.code} 
                onClick={() => handleCountrySwitch(c.code)}
                className="flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-slate-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm">{c.flag}</span>
                  <span className="text-xs font-bold uppercase tracking-tight">{c.name}</span>
                </div>
                {countryCode === c.code && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* System Settings & Help */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Guide</span>
            <Switch checked={globalSettings.isGuideMode} onCheckedChange={setGuideMode} className="scale-75 data-[state=checked]:bg-blue-600" />
          </div>
          
          <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-md relative transition-all">
            <Bell size={20} />
            {scopedNotifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>
        </div>

        {/* User Identity */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-inner hover:ring-4 hover:ring-blue-100 transition-all outline-none">
              {currentUser?.name.charAt(0) || 'A'}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 bg-white rounded-lg shadow-2xl border-slate-200">
            <div className="p-4 bg-slate-50 rounded-md mb-2">
              <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{currentUser?.role.replace('_', ' ')}</p>
            </div>
            <DropdownMenuItem className="p-3 text-xs font-medium cursor-pointer rounded-md hover:bg-slate-50">
              <UserCircle className="w-4 h-4 mr-3 text-slate-400" /> Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 text-xs font-medium cursor-pointer rounded-md hover:bg-slate-50">
              <HelpCircle className="w-4 h-4 mr-3 text-slate-400" /> Documentation
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="p-3 text-xs font-bold text-red-500 cursor-pointer rounded-md hover:bg-red-50">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
