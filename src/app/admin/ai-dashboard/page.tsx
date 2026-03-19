
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
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAI } from '@/hooks/use-ai';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { getAnalytics } from '@/lib/analytics/mock-data';
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
      description: "AI is currently drafting regional SEO metadata for 1,240 new archive arrivals.",
    });
    runSequence('SEO Metadata Cycle', currentUser?.country);
  };

  const handleRevenueCycle = () => {
    toast({
      title: "Revenue Cycle Triggered",
      description: "Maison Autopilot is executing multi-channel retargeting and trending artifact pushes.",
    });
    runSequence('Revenue Generation', currentUser?.country);
  };

  if (!stats) return null;

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center space-x-2">
             <Link href="/admin">Dashboard</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-plum">AI Autopilot</span>
          </nav>
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-gray-900">AI Autopilot</h1>
          <p className="text-sm text-gray-500 font-light italic">Autonomous business orchestration & curatorial intelligence.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button 
            className="bg-plum text-white hover:bg-black h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest"
            onClick={handleRevenueCycle}
           >
             <Coins className="w-3.5 h-3.5 mr-2" /> TRIGGER REVENUE CYCLE
           </Button>
           <Button 
            variant="outline"
            className="border-border text-gray-900 hover:bg-ivory h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest"
            onClick={handleBatchGeneration}
           >
             <Plus className="w-3.5 h-3.5 mr-2" /> BATCH SEO GEN
           </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <Card className="bg-white border-border shadow-sm p-8 space-y-4">
            <div className="flex items-center space-x-3 text-plum">
               <Target className="w-5 h-5" />
               <h4 className="text-[10px] font-bold uppercase tracking-widest">Autonomous Targeting</h4>
            </div>
            <p className="text-xl font-headline font-bold italic">842 Connoisseurs reached today</p>
            <p className="text-[10px] text-gray-400 italic">Retargeting cycles executed every 4 hours.</p>
         </Card>
         <Card className="bg-white border-border shadow-sm p-8 space-y-4">
            <div className="flex items-center space-x-3 text-plum">
               <TrendingUp className="w-5 h-5" />
               <h4 className="text-[10px] font-bold uppercase tracking-widest">Revenue Pull-through</h4>
            </div>
            <p className="text-xl font-headline font-bold italic">$124k Automated Pipeline</p>
            <p className="text-[10px] text-gray-400 italic">Conversion from AI-suggested follow-ups.</p>
         </Card>
         <Card className="bg-white border-border shadow-sm p-8 space-y-4">
            <div className="flex items-center space-x-3 text-plum">
               <Search className="w-5 h-5" />
               <h4 className="text-[10px] font-bold uppercase tracking-widest">Index Velocity</h4>
            </div>
            <p className="text-xl font-headline font-bold italic">100% SEO Compliance</p>
            <p className="text-[10px] text-gray-400 italic">Automatic rich snippet generation active.</p>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Card className="lg:col-span-8 bg-white border-border shadow-luxury">
          <CardHeader className="border-b border-border flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Maison Intelligence Accuracy</CardTitle>
              <CardDescription className="text-[10px] uppercase tracking-widest">Autopilot learning curve & engagement efficacy</CardDescription>
            </div>
            <Button 
              size="sm" 
              className="bg-plum text-white hover:bg-black rounded-none text-[9px] font-bold uppercase h-9 px-6"
              onClick={() => runSequence('Daily Intelligence Cycle', currentUser?.country)}
            >
              <FastForward className="w-3.5 h-3.5 mr-2" /> TRIGGER CYCLE
            </Button>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.aiPerformance}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 600}}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-black text-white p-3 shadow-2xl border border-white/10">
                            <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">{payload[0].payload.month}</p>
                            <p className="text-lg font-headline font-bold italic">{payload[0].value}% Accuracy</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#7E3F98" 
                    strokeWidth={3} 
                    dot={{fill: '#7E3F98', strokeWidth: 2, r: 4}}
                    activeDot={{r: 6, stroke: '#D4AF37'}}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-8">
           <Card className="bg-black text-white p-8 space-y-6 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-plum/20 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-3 text-secondary">
                  <Zap className="w-5 h-5" />
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">Global AI Pulse</h4>
                </div>
                <div className="space-y-6 pt-4">
                   {stats.regionalAiPerformance.map(reg => (
                     <div key={reg.code} className="space-y-2">
                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                           <span className="opacity-60">{reg.country} Hub</span>
                           <span className="text-secondary">{reg.score}%</span>
                        </div>
                        <div className="h-0.5 bg-white/10 w-full overflow-hidden">
                           <div className="h-full bg-secondary" style={{ width: `${reg.score}%` }} />
                        </div>
                     </div>
                   ))}
                </div>
              </div>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Card className="lg:col-span-7 bg-white border-border shadow-luxury h-[600px] flex flex-col">
          <CardHeader className="border-b border-border">
            <div className="flex items-center space-x-3">
               <Activity className="w-5 h-5 text-plum" />
               <CardTitle className="font-headline text-2xl">Intelligence Feed</CardTitle>
            </div>
            <CardDescription className="text-[10px] uppercase tracking-widest">Real-time autonomous business orchestration</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0 custom-scrollbar bg-ivory/5">
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
          </CardContent>
        </Card>

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
          </CardContent>
        </Card>
      </div>
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
