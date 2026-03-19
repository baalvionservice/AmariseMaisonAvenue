'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Activity, 
  MessageSquare, 
  FileText, 
  Search, 
  TrendingUp, 
  ChevronRight, 
  RefreshCcw,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  Settings,
  BrainCircuit,
  Bot,
  Lightbulb,
  AlertCircle,
  Play,
  History
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAI } from '@/hooks/use-ai';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function AIDashboard() {
  const { modules, logs, suggestions, approveSuggestion, rejectSuggestion } = useAI();
  const { workflows, runWorkflowTask } = useAppStore();

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">CORE</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Intelligence Operating System</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <AINavItem icon={<LayoutDashboard />} label="Intelligence Hub" active={true} href="/admin/ai-dashboard" />
          <AINavItem icon={<Settings />} label="Module Control" active={false} href="/admin/ai-control" />
          <div className="pt-8 border-t border-border mt-8">
             <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
                <Link href="/admin">
                  <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
                </Link>
             </Button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">Intelligence Pulse</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Real-time Business Autopilot Status</p>
          </div>
          <div className="flex items-center space-x-6">
             <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 border border-green-100 rounded-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Autopilot Active</span>
             </div>
             <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">AI</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {/* Workflow Tasks */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-plum" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Scheduled Workflows</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {workflows.map(task => (
                <Card key={task.id} className="bg-white border-border shadow-sm flex items-center p-6 space-x-6">
                  <div className={cn(
                    "p-3 rounded-full",
                    task.status === 'running' ? "bg-plum/10 text-plum animate-spin" : "bg-ivory text-gray-400"
                  )}>
                    <RefreshCcw className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold uppercase tracking-widest">{task.taskName}</h4>
                    <p className="text-[9px] text-gray-400 uppercase">{task.frequency} Cycle • {task.country.toUpperCase()}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className={cn("text-[8px] uppercase", 
                      task.status === 'complete' ? "text-green-600 bg-green-50 border-green-100" : ""
                    )}>
                      {task.status}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-plum hover:bg-plum/5"
                      onClick={() => runWorkflowTask(task.id)}
                      disabled={task.status === 'running'}
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Live Action Feed */}
            <Card className="lg:col-span-7 bg-white border-border shadow-luxury h-[600px] flex flex-col">
              <CardHeader className="border-b border-border">
                <div className="flex items-center space-x-3">
                   <Activity className="w-5 h-5 text-plum" />
                   <CardTitle className="font-headline text-2xl">Intelligence Feed</CardTitle>
                </div>
                <CardDescription className="text-[10px] uppercase tracking-widest">Real-time autonomous business orchestration</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0 custom-scrollbar bg-ivory/5">
                {logs.length > 0 ? (
                  <div className="divide-y divide-border/40">
                    {logs.map(log => (
                      <div key={log.id} className="p-6 flex items-start space-x-6 hover:bg-white transition-colors group">
                        <div className="p-3 bg-ivory rounded-full border border-border group-hover:bg-plum/5 transition-colors">
                           {getModuleIcon(log.moduleId)}
                        </div>
                        <div className="flex-1 space-y-1">
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-plum">{log.action}</span>
                              <span className="text-[8px] text-gray-400 uppercase">{new Date(log.timestamp).toLocaleTimeString()}</span>
                           </div>
                           <p className="text-xs text-gray-600 italic font-light">"{log.details}"</p>
                           <div className="flex items-center space-x-2 pt-2">
                              <Badge className="bg-green-50 text-green-600 text-[7px] uppercase tracking-tighter border-none">{log.status}</Badge>
                              <span className="text-[8px] text-gray-300 uppercase tracking-widest">{log.moduleId}</span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-30">
                     <RefreshCcw className="w-12 h-12 animate-spin duration-[3s]" />
                     <p className="text-[10px] uppercase tracking-widest font-bold">Synchronizing with Maison Intelligence...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Strategic Suggestions */}
            <Card className="lg:col-span-5 bg-white border-border shadow-luxury flex flex-col">
              <CardHeader className="border-b border-border">
                <div className="flex items-center space-x-3">
                   <Lightbulb className="w-5 h-5 text-gold" />
                   <CardTitle className="font-headline text-2xl">Specialist Oversight</CardTitle>
                </div>
                <CardDescription className="text-[10px] uppercase tracking-widest">AI proposals awaiting curatorial approval</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {suggestions.filter(s => s.status === 'pending').map(sug => (
                  <div key={sug.id} className="p-6 bg-ivory/30 border border-border space-y-4 animate-in fade-in slide-in-from-right-4">
                    <div className="flex justify-between items-start">
                       <Badge variant="outline" className="text-[8px] uppercase tracking-widest border-plum/30 text-plum">{sug.type}</Badge>
                       <span className="text-[8px] text-gray-400 font-bold">{new Date(sug.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-sm font-headline font-bold uppercase italic">{sug.title}</h4>
                       <p className="text-[11px] text-gray-500 font-light italic leading-relaxed">{sug.description}</p>
                    </div>
                    <div className="flex space-x-3 pt-2">
                       <Button 
                        size="sm" 
                        className="flex-1 h-9 rounded-none bg-black text-white hover:bg-plum text-[9px] font-bold uppercase"
                        onClick={() => approveSuggestion(sug.id)}
                       >
                         APPROVE
                       </Button>
                       <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-9 rounded-none border-border text-gray-400 text-[9px] font-bold uppercase"
                        onClick={() => rejectSuggestion(sug.id)}
                       >
                         REJECT
                       </Button>
                    </div>
                  </div>
                ))}
                {suggestions.filter(s => s.status === 'pending').length === 0 && (
                  <div className="text-center py-20 opacity-20">
                     <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                     <p className="text-xs uppercase tracking-widest font-bold">No active proposals</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function getModuleIcon(id: string) {
  switch (id) {
    case 'ai-sales': return <MessageSquare className="w-4 h-4" />;
    case 'ai-content': return <FileText className="w-4 h-4" />;
    case 'ai-seo': return <Search className="w-4 h-4" />;
    case 'ai-analytics': return <TrendingUp className="w-4 h-4" />;
    default: return <Zap className="w-4 h-4" />;
  }
}

function AINavItem({ icon, label, active, href }: { icon: any, label: string, active: boolean, href: string }) {
  return (
    <Link href={href}>
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
    </Link>
  );
}
