
'use client';

import React, { useMemo, useState } from 'react';
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
  History,
  FastForward,
  Plus,
  Coins,
  Target,
  Database,
  Cpu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAI } from '@/hooks/use-ai';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { getAnalytics } from '@/lib/analytics/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useToast } from '@/hooks/use-toast';

/**
 * AI Autopilot: High-Frequency Automation Terminal
 * Tab 1: Performance Overview, Tab 2: Automation Logs, Tab 3: Neural Parameters
 */
export default function AIDashboard() {
  const { modules, logs, suggestions, jobs, runJob, runSequence, approveSuggestion, rejectSuggestion } = useAI();
  const { workflows, runWorkflowTask, currentUser } = useAppStore();
  const { toast } = useToast();

  const stats = useMemo(() => {
    if (!currentUser) return null;
    return getAnalytics(currentUser.role, currentUser.country);
  }, [currentUser]);

  const handleBatchGeneration = () => {
    toast({
      title: "Batch Generation Initiated",
      description: "AI is crafting market-specific SEO descriptors for the registry.",
    });
    runSequence('SEO Metadata Cycle', currentUser?.country);
  };

  if (!stats) return null;

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center space-x-2">
             <Link href="/admin">Dashboard</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-plum">Autonomous Operations</span>
          </nav>
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-gray-900 uppercase">AI Autopilot</h1>
          <p className="text-sm text-gray-500 font-light italic">Orchestrating high-volume curatorial and business logic.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button className="h-14 px-10 rounded-none bg-plum text-white hover:bg-black transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-plum/20" onClick={handleBatchGeneration}>
             <Zap className="w-4 h-4 mr-3" /> BATCH GENERATE METADATA
           </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white border-b border-border h-14 w-full justify-start p-0 rounded-none space-x-12 mb-12">
          <TabsTrigger value="overview" className="tab-trigger">Efficiency Overview</TabsTrigger>
          <TabsTrigger value="logs" className="tab-trigger">Automation Logs</TabsTrigger>
          <TabsTrigger value="parameters" className="tab-trigger">Neural Parameters</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-12 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <StatsTile label="Autonomous Accuracy" value="95.2%" trend="Neural Confidence" />
              <StatsTile label="Requests Processed" value="1.2M" trend="+14.2% Vol" />
              <StatsTile label="Mean Response" value="142ms" trend="Optimal" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <Card className="lg:col-span-8 bg-white border-border shadow-luxury overflow-hidden">
                <CardHeader className="border-b border-border">
                   <CardTitle className="font-headline text-2xl">Learning Trajectory</CardTitle>
                   <CardDescription className="text-[10px] uppercase tracking-widest">Model alignment efficacy over 30 days</CardDescription>
                </CardHeader>
                <CardContent className="p-8 h-[300px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.aiPerformance}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <Tooltip contentStyle={{ borderRadius: '0px', border: '1px solid #eee' }} />
                        <Line type="monotone" dataKey="score" stroke="#7E3F98" strokeWidth={3} dot={{fill: '#7E3F98'}} />
                      </LineChart>
                   </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-4 bg-black text-white p-10 flex flex-col justify-center space-y-10 shadow-2xl relative overflow-hidden">
                 <div className="absolute -top-10 -right-10 p-12 opacity-10 pointer-events-none"><Cpu className="w-40 h-40" /></div>
                 <div className="space-y-4">
                    <h3 className="text-3xl font-headline font-bold italic tracking-tight">System Pulse</h3>
                    <p className="text-sm font-light italic text-white/60 leading-relaxed">
                      "Autonomous business orchestration is currently maintaining a high-fidelity sync across all five Maison hubs."
                    </p>
                 </div>
                 <div className="space-y-6 pt-6 border-t border-white/10">
                    {stats.regionalAiPerformance.map(reg => (
                      <div key={reg.code} className="space-y-2">
                         <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.3em]">
                            <span className="opacity-60">{reg.country} Hub</span>
                            <span className="text-gold">{reg.score}%</span>
                         </div>
                         <div className="h-0.5 bg-white/10 w-full rounded-full overflow-hidden">
                            <div className="h-full bg-gold" style={{ width: `${reg.score}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-8 animate-fade-in">
           <Card className="bg-white border-border shadow-luxury overflow-hidden">
              <Table>
                <TableHeader className="bg-ivory/50">
                  <TableRow>
                    <TableHead className="text-[9px] uppercase font-bold pl-8">Protocol</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold">Action</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold">Timestamp</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map(log => (
                    <TableRow key={log.id} className="hover:bg-ivory/30 transition-colors">
                      <TableCell className="pl-8 font-bold text-[10px] uppercase tracking-widest text-plum">{log.moduleId}</TableCell>
                      <TableCell className="text-xs font-light italic text-gray-600">"{log.action}"</TableCell>
                      <TableCell className="text-[9px] text-gray-400 font-mono uppercase">{new Date(log.timestamp).toLocaleTimeString()}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-[8px] uppercase tracking-tighter border-green-200 text-green-600 bg-green-50">{log.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {logs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="py-40 text-center opacity-30">
                         <History className="w-12 h-12 mx-auto mb-4" />
                         <p className="text-sm font-bold uppercase tracking-widest italic">Neural logs are currently synchronizing.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
           </Card>
        </TabsContent>

        <TabsContent value="parameters" className="animate-fade-in space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-white border-border shadow-luxury p-10 space-y-8">
                 <div className="flex items-center space-x-4 text-plum">
                    <Settings className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Automation Levels</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Define the degree of autonomous intervention across Maison business logic. `Assisted` requires curatorial oversight before execution.
                 </p>
                 <div className="space-y-6 pt-4 border-t border-border">
                    {modules.map(mod => (
                      <div key={mod.id} className="flex justify-between items-center">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">{mod.name}</span>
                         <Badge className="bg-plum text-white text-[8px] uppercase tracking-widest px-3 py-1 cursor-pointer hover:bg-black transition-all">
                            {mod.level}
                         </Badge>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card className="bg-white border-border shadow-luxury p-10 space-y-8 border-l-4 border-l-gold">
                 <div className="flex items-center space-x-4 text-gold">
                    <Database className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Memory Isolation</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Enforce strict regional hub context for AI memory to prevent data leakage between non-synergistic market hubs.
                 </p>
                 <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Cross-Hub Isolation Active</span>
                    <Switch defaultChecked className="data-[state=checked]:bg-gold" />
                 </div>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsTile({ label, value, trend }: { label: string, value: string, trend: string }) {
  return (
    <Card className="bg-white border-border shadow-luxury p-8 space-y-4 group hover:border-plum transition-all">
       <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-plum transition-colors">{label}</span>
          <Badge variant="outline" className="text-[8px] uppercase">{trend}</Badge>
       </div>
       <div className="text-4xl font-headline font-bold italic text-gray-900">{value}</div>
    </Card>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full text-left text-sm">{children}</table>;
}
function TableHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return <thead className={cn("border-b border-border", className)}>{children}</thead>;
}
function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}
function TableRow({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return <tr className={cn("border-b border-border last:border-0", className)} onClick={onClick}>{children}</tr>;
}
function TableHead({ children, className }: { children: React.ReactNode, className?: string }) {
  return <th className={cn("h-12 px-4 align-middle", className)}>{children}</th>;
}
function TableCell({ children, className }: { children: React.ReactNode, className?: string }) {
  return <td className={cn("p-4 align-middle", className)}>{children}</td>;
}
