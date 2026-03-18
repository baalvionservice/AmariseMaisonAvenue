'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Globe, 
  Search, 
  Edit3, 
  Plus, 
  ChevronRight, 
  RefreshCcw,
  BarChart3,
  Target,
  LayoutDashboard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSEO } from '@/hooks/use-seo';
import { cn } from '@/lib/utils';

export default function SEOAdminHub() {
  const { registry, updateMetadata } = useSEO();
  const [selectedPath, setSelectedPath] = useState(registry[0]?.path);
  
  const currentMeta = registry.find(m => m.path === selectedPath);

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">SEO</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Authority Control</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <SEONavItem icon={<LayoutDashboard />} label="Sitemap Registry" active={true} />
          <SEONavItem icon={<Target />} label="Keyword Matrix" active={false} />
          <SEONavItem icon={<BarChart3 />} label="Ranking Analytics" active={false} />
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
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">SEO Authority</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Multi-Market Metadata Management</p>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <Card className="lg:col-span-1 bg-white border-border shadow-luxury h-[70vh] overflow-y-auto custom-scrollbar">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-headline text-xl">Market Paths</CardTitle>
              </CardHeader>
              <div className="p-2 space-y-1">
                {registry.map(meta => (
                  <button 
                    key={meta.id}
                    onClick={() => setSelectedPath(meta.path)}
                    className={cn(
                      "w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm",
                      selectedPath === meta.path ? "bg-plum text-white shadow-md" : "text-gray-400 hover:bg-ivory hover:text-plum"
                    )}
                  >
                    {meta.path}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
              {currentMeta ? (
                <>
                  <CardHeader className="border-b border-border bg-ivory/30">
                    <CardTitle className="font-headline text-2xl uppercase tracking-tight">Edit Metadata: {currentMeta.path}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 space-y-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-bold">Meta Title</Label>
                      <Input 
                        value={currentMeta.title} 
                        onChange={(e) => updateMetadata({ ...currentMeta, title: e.target.value })}
                        className="rounded-none border-border bg-ivory/20 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-bold">Meta Description</Label>
                      <Textarea 
                        value={currentMeta.description} 
                        onChange={(e) => updateMetadata({ ...currentMeta, description: e.target.value })}
                        className="rounded-none border-border bg-ivory/20 min-h-[100px] italic font-light"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest font-bold">Primary H1</Label>
                        <Input 
                          value={currentMeta.h1} 
                          onChange={(e) => updateMetadata({ ...currentMeta, h1: e.target.value })}
                          className="rounded-none border-border bg-ivory/20 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest font-bold">Keywords</Label>
                        <Input 
                          value={currentMeta.keywords} 
                          onChange={(e) => updateMetadata({ ...currentMeta, keywords: e.target.value })}
                          className="rounded-none border-border bg-ivory/20 h-12"
                        />
                      </div>
                    </div>
                    <div className="pt-8 border-t border-border flex justify-end">
                      <Button className="bg-plum text-white hover:bg-black h-12 px-12 rounded-none text-[10px] font-bold uppercase tracking-widest">
                        SAVE SEO CONFIG
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="p-40 text-center text-gray-400 italic">Select a path to manage authority settings.</div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function SEONavItem({ icon, label, active }: { icon: any, label: string, active: boolean }) {
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
