'use client';

import React from 'react';
import { 
  Plus, 
  Zap, 
  Globe, 
  Bell, 
  Search, 
  UserCircle, 
  ChevronDown,
  ShieldCheck,
  RefreshCcw
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { COUNTRIES } from '@/lib/mock-data';
import { useRouter, useParams } from 'next/navigation';

/**
 * AdminTopBar: Global Command Matrix
 * Refined for the dark luxury operating system.
 */
export function AdminTopBar() {
  const { currentUser, scopedNotifications } = useAppStore();
  const router = useRouter();
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;

  const handleCountrySwitch = (code: string) => {
    router.push(`/admin?market=${code}`);
  };

  return (
    <header className="h-20 bg-[#0A0A0B]/80 border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-40 shrink-0 backdrop-blur-xl">
      <div className="flex items-center space-x-12 flex-1">
        {/* Universal Discovery */}
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Registry Discovery..." 
            className="w-full bg-white/5 h-11 pl-12 pr-4 rounded-none text-[11px] font-bold uppercase tracking-widest border-transparent focus:bg-white/10 focus:border-blue-500/30 transition-all outline-none text-white placeholder:text-white/10"
          />
        </div>

        <div className="flex items-center space-x-6 border-l border-white/5 pl-10">
          <div className="flex items-center space-x-3 px-4 py-1.5 bg-blue-500/5 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">Node Synced</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-4 pr-10 border-r border-white/5">
          <Button 
            className="bg-white text-black hover:bg-white/90 h-10 px-6 text-[10px] font-bold uppercase tracking-widest rounded-none transition-all shadow-xl shadow-white/5"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Artifact
          </Button>
          <Button 
            variant="outline"
            className="border-white/10 hover:bg-white/5 text-white/60 hover:text-white h-10 px-6 text-[10px] font-bold uppercase tracking-widest rounded-none"
          >
            <Zap className="w-4 h-4 mr-2 text-blue-500" /> Execute AI
          </Button>
        </div>

        {/* Jurisdictional Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-4 px-4 py-2 hover:bg-white/5 transition-colors group">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{currentCountry.name}</span>
              </div>
              <span className="text-xl leading-none grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 transition-all">{currentCountry.flag}</span>
              <ChevronDown className="w-3 h-3 text-white/20" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 bg-[#111113] border-white/5 rounded-none shadow-2xl">
            <DropdownMenuLabel className="text-[8px] uppercase tracking-[0.3em] text-white/20 px-4 py-3">Market Hubs</DropdownMenuLabel>
            {Object.values(COUNTRIES).map((c) => (
              <DropdownMenuItem 
                key={c.code} 
                onClick={() => handleCountrySwitch(c.code)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 rounded-none"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-lg">{c.flag}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">{c.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Identity & Status */}
        <div className="flex items-center space-x-6">
          <button className="relative p-2 text-white/20 hover:text-white transition-all group">
            <Bell size={20} className="group-hover:rotate-12 transition-transform" />
            {scopedNotifications.some(n => !n.read) && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            )}
          </button>
          
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-none flex items-center justify-center font-bold text-xs hover:border-blue-500 transition-colors cursor-pointer">
            {currentUser?.name.charAt(0) || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}
