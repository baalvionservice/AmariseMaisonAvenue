'use client';

import React, { useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { COUNTRIES, VIP_CLIENTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Crown, 
  LayoutDashboard, 
  Sparkles, 
  ChevronRight, 
  X, 
  Settings2,
  PlayCircle,
  Eye,
  Zap,
  BookOpen,
  PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * ShowcaseControls: The high-fidelity demo orchestration layer.
 * Allows demonstrators to jump between global contexts, VIP tiers, and administrative hubs.
 */
export function ShowcaseControls() {
  const { country } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { activeVip, setActiveVip, isShowcaseMode, setShowcaseMode } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentCountry = (country as string) || 'us';

  const handleCountrySwitch = (code: string) => {
    const newPath = pathname.replace(`/${currentCountry}`, `/${code}`);
    router.push(newPath);
  };

  const handleVipToggle = (id: string | null) => {
    if (!id) {
      setActiveVip(null);
    } else {
      const vip = VIP_CLIENTS.find(v => v.id === id);
      if (vip) setActiveVip(vip);
    }
  };

  if (!isShowcaseMode) return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => setShowcaseMode(true)}
      className="fixed bottom-6 right-6 z-[100] bg-background border-primary text-primary hover:bg-primary hover:text-white rounded-full shadow-2xl"
    >
      <PlayCircle className="w-4 h-4 mr-2" /> Enter Showcase
    </Button>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end space-y-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="w-16 h-16 bg-primary hover:bg-secondary text-white rounded-full shadow-[0_20px_50px_rgba(102,38,204,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative">
            <Settings2 className={cn("w-7 h-7 transition-transform duration-500", isOpen && "rotate-180")} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary border-2 border-primary"></span>
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0 bg-card border-border shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="p-6 bg-primary/10 border-b border-primary/20">
             <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-headline font-bold text-white uppercase tracking-widest">Super-Demo Mode</h3>
                <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-muted-foreground hover:text-white" /></button>
             </div>
             <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Maison Amarisé | Integrated Showcase</p>
          </div>

          <div className="p-6 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {/* Market Context */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Globe className="w-3 h-3" />
                <span>Global Market Hub</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {Object.keys(COUNTRIES).map(code => (
                  <button 
                    key={code}
                    onClick={() => handleCountrySwitch(code)}
                    className={cn(
                      "h-10 border text-[10px] font-bold uppercase tracking-widest transition-all",
                      currentCountry === code ? "bg-primary border-primary text-white" : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Persona Simulation */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Crown className="w-3 h-3" />
                <span>Client Tiers</span>
              </div>
              <div className="space-y-2">
                <VipButton 
                  active={!activeVip} 
                  label="Guest Prospect" 
                  onClick={() => handleVipToggle(null)} 
                />
                {VIP_CLIENTS.map(vip => (
                  <VipButton 
                    key={vip.id} 
                    active={activeVip?.id === vip.id} 
                    label={`${vip.name} (${vip.tier})`} 
                    onClick={() => handleVipToggle(vip.id)} 
                  />
                ))}
              </div>
            </div>

            {/* Quick Experience Jumps */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Zap className="w-3 h-3" />
                <span>Experience Flow</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <ActionLink href="/admin" icon={<LayoutDashboard />} label="Super-Dashboard" />
                <ActionLink href={`/${currentCountry}/journal`} icon={<BookOpen />} label="Maison Journal" />
                <ActionLink href={`/${currentCountry}/category/apparel`} icon={<PieChart />} label="Global Catalog" />
                <ActionLink href={`/${currentCountry}/wishlist`} icon={<Crown />} label="Private Selection" />
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-4 border-t border-border flex justify-between items-center">
             <button 
              onClick={() => setShowcaseMode(false)}
              className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-destructive font-bold"
             >
               Exit Super-Demo
             </button>
             <span className="text-[8px] text-muted-foreground/50 tracking-widest">v3.0.0-PRO</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function VipButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full h-12 px-4 border text-[10px] font-bold uppercase tracking-widest text-left flex items-center justify-between transition-all",
        active ? "bg-primary/20 border-primary text-primary" : "bg-muted/10 border-border text-muted-foreground hover:bg-muted/30 hover:text-white"
      )}
    >
      <span>{label}</span>
      {active && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
    </button>
  );
}

function ActionLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.push(href)}
      className="flex items-center space-x-3 p-3 bg-muted/20 border border-border hover:border-primary/50 group transition-all w-full"
    >
      <span className="text-primary group-hover:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-white">{label}</span>
    </button>
  );
}
