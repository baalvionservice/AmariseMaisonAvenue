'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutTemplate, 
  Eye, 
  EyeOff, 
  Star, 
  Edit3, 
  Plus, 
  ChevronRight, 
  RefreshCcw,
  LogOut,
  LayoutDashboard,
  FileText,
  Package,
  Boxes
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useCMS } from '@/hooks/use-cms';
import { cn } from '@/lib/utils';

export default function ContentAdminHub() {
  const { sections, updateSection } = useCMS();
  const [activeTab, setActiveTab] = useState('sections');

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">CMS</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Atelier Content Control</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <CMSNavItem icon={<LayoutTemplate />} label="Sections" active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} />
          <CMSNavItem icon={<Package />} label="Collections" active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} />
          <CMSNavItem icon={<FileText />} label="Editorial" active={activeTab === 'editorial'} onClick={() => setActiveTab('editorial')} />
          <CMSNavItem icon={<Boxes />} label="Media Library" active={activeTab === 'media'} onClick={() => setActiveTab('media')} />
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
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">Atelier CMS</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Institutional Storytelling & Layout</p>
          </div>
          <Button className="bg-plum text-white hover:bg-gold h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest">
            <Plus className="w-3 h-3 mr-2" /> CREATE CONTENT
          </Button>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {activeTab === 'sections' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map(section => (
                <Card key={section.id} className="bg-white border-border shadow-luxury hover:border-plum transition-all group overflow-hidden">
                  <CardHeader className="border-b border-border bg-ivory/30">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Section ID: {section.id}</span>
                        <CardTitle className="font-headline text-xl uppercase tracking-tight">{section.title}</CardTitle>
                      </div>
                      {section.featured && <Badge className="bg-gold text-white text-[8px] uppercase tracking-widest">Featured</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase text-gray-700">Visibility</p>
                        <p className="text-[10px] text-gray-400 italic">Toggle display on global markets</p>
                      </div>
                      <Switch 
                        checked={section.visible} 
                        onCheckedChange={(val) => updateSection({ ...section, visible: val })}
                      />
                    </div>
                    
                    <div className="pt-6 border-t border-border flex justify-between items-center">
                      <Button variant="ghost" className="h-8 px-4 text-[9px] font-bold uppercase text-gray-400 hover:text-plum">
                        <Edit3 className="w-3 h-3 mr-2" /> Edit Layout
                      </Button>
                      <Button variant="ghost" className="h-8 px-4 text-[9px] font-bold uppercase text-gray-400">
                        <LayoutDashboard className="w-3 h-3 mr-2" /> Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab !== 'sections' && (
            <div className="py-40 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-12 bg-ivory border border-border rounded-full animate-pulse">
                  <RefreshCcw className="w-12 h-12 text-gold/30 mx-auto" />
                </div>
              </div>
              <p className="text-2xl text-muted-foreground font-light italic font-headline">
                The {activeTab} workspace is currently synchronizing with the Maison Archive.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function CMSNavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border",
        active ? "bg-plum text-white border-plum shadow-md" : "text-gray-400 hover:bg-ivory hover:text-plum border-transparent"
      )}
    >
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-gold")}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </span>
      <span>{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}
