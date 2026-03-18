'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Play, 
  Settings, 
  ShieldCheck, 
  ChevronRight, 
  RefreshCcw,
  Power,
  Cpu,
  LayoutDashboard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAutomation } from '@/hooks/use-automation';
import { cn } from '@/lib/utils';

export default function AutomationAdminHub() {
  const { rules, toggleRule } = useAutomation();

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">AUTO</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Logic Rule Engine</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <AutoNavItem icon={<LayoutDashboard />} label="Rule Registry" active={true} />
          <AutoNavItem icon={<Cpu />} label="System Triggers" active={false} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">Automation Matrix</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Operational Intelligence Flows</p>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rules.map(rule => (
              <Card key={rule.id} className="bg-white border-border shadow-luxury hover:border-plum transition-all group overflow-hidden">
                <CardHeader className="border-b border-border bg-ivory/30">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">RULE ID: {rule.id}</span>
                      <CardTitle className="font-headline text-xl uppercase tracking-tight">{rule.name}</CardTitle>
                    </div>
                    <div className="p-3 bg-plum/10 rounded-full text-plum"><Zap className="w-4 h-4" /></div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Trigger</p>
                      <Badge variant="outline" className="text-[8px] uppercase tracking-tighter">{rule.trigger.replace(/_/g, ' ')}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Action</p>
                      <Badge variant="outline" className="text-[8px] uppercase tracking-tighter text-plum border-plum/30">{rule.action.replace(/_/g, ' ')}</Badge>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Power className={cn("w-3 h-3", rule.enabled ? "text-green-500" : "text-red-500")} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-700">{rule.enabled ? 'ACTIVE' : 'DORMANT'}</span>
                    </div>
                    <Switch 
                      checked={rule.enabled} 
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function AutoNavItem({ icon, label, active }: { icon: any, label: string, active: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border",
      active ? "bg-plum text-white border-plum shadow-md" : "text-gray-400 hover:bg-ivory hover:text-plum border-transparent"
    )}>
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-gold")}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </span>
      <span>{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}
