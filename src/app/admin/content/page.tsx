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
  Boxes,
  Search,
  X,
  Send,
  CheckCircle2,
  Globe,
  MapPin,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useCMS } from '@/hooks/use-cms';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useSearch } from '@/hooks/use-search';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContentAdminHub() {
  const { sections, products, updateSection, updateProduct } = useCMS();
  const { submitApproval, currentUser } = useAppStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'sections' | 'artifacts' | 'editorial'>('sections');
  const [searchQuery, setSearchQuery] = useState('');

  // Scoped searching
  const filteredSections = useSearch(sections, searchQuery);
  const filteredProducts = useSearch(products, searchQuery);

  const handlePublishRequest = (type: any, id: string, title: string) => {
    submitApproval(type, id, currentUser?.country);
    toast({
      title: "Review Transmitted",
      description: `Entry "${title}" sent to curatorial oversight.`,
    });
  };

  const toggleProductScope = (productId: string, scope: 'global' | 'regional') => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    updateProduct({ ...prod, scope });
    toast({ title: "Product Scope Updated", description: `Artifact is now ${scope}.` });
  };

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
          <CMSNavItem icon={<LayoutTemplate />} label="Layout Sections" active={activeTab === 'sections'} onClick={() => setActiveTab('sections')} />
          <CMSNavItem icon={<Package />} label="Atelier Artifacts" active={activeTab === 'artifacts'} onClick={() => setActiveTab('artifacts')} />
          <CMSNavItem icon={<FileText />} label="Editorial Journal" active={activeTab === 'editorial'} onClick={() => setActiveTab('editorial')} />
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
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Institutional Storytelling • {activeTab}</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
              <input 
                className="bg-white border border-border h-10 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none w-64 focus:ring-1 focus:ring-plum transition-all shadow-sm" 
                placeholder="SEARCH REGISTRY..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-plum text-white hover:bg-gold h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest">
              <Plus className="w-3 h-3 mr-2" /> NEW {activeTab.toUpperCase()}
            </Button>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {activeTab === 'artifacts' && (
            <div className="grid grid-cols-1 gap-8">
              {filteredProducts.slice(0, 15).map(prod => (
                <Card key={prod.id} className="bg-white border-border shadow-luxury overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-48 bg-ivory/50 flex items-center justify-center border-r border-border">
                     <span className="text-[8px] font-bold uppercase tracking-widest text-gray-300">Artifact Asset</span>
                  </div>
                  <CardContent className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">ID: {prod.id}</p>
                          <h3 className="text-xl font-headline font-bold italic">{prod.name}</h3>
                       </div>
                       <div className="flex items-center space-x-2">
                          <Badge variant={prod.status === 'published' ? 'default' : 'outline'} className={cn(prod.status === 'verified' && "bg-green-500 text-white")}>
                            {prod.status}
                          </Badge>
                          <span className="text-[9px] font-bold uppercase text-gray-400">Atelier: {prod.vendorId}</span>
                       </div>
                    </div>

                    <div className="space-y-4 border-l border-border pl-8">
                       <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Hub Distribution</p>
                       <div className="space-y-3">
                          <div className="flex items-center justify-between">
                             <span className="text-[10px] font-bold uppercase">Jurisdiction</span>
                             <Select defaultValue={prod.scope} onValueChange={(val) => toggleProductScope(prod.id, val as any)}>
                                <SelectTrigger className="h-8 w-28 text-[9px] uppercase font-bold bg-ivory border-border">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-border">
                                   <SelectItem value="global" className="text-[9px] font-bold uppercase">GLOBAL Hub</SelectItem>
                                   <SelectItem value="regional" className="text-[9px] font-bold uppercase">REGIONAL Hub</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>
                          <div className="flex flex-wrap gap-1">
                             {prod.regions.map(r => <Badge key={r} variant="outline" className="text-[7px] uppercase h-5">{r}</Badge>)}
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                       <Button variant="outline" className="h-10 border-border text-[9px] font-bold uppercase tracking-widest w-full hover:bg-black hover:text-white" asChild>
                          <Link href={`/${currentUser?.country || 'us'}/product/${prod.id}`}>
                             <Eye className="w-3 h-3 mr-2" /> View Public
                          </Link>
                       </Button>
                       <div className="flex space-x-2 w-full">
                          <Button variant="ghost" className="flex-1 h-10 text-[9px] font-bold uppercase hover:bg-plum/5">
                             <Edit3 className="w-3 h-3 mr-2" /> Edit
                          </Button>
                          <Button 
                            className="flex-1 h-10 bg-black text-white hover:bg-plum text-[9px] font-bold uppercase"
                            onClick={() => handlePublishRequest('listing', prod.id, prod.name)}
                          >
                             Submit Audit
                          </Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredSections.map(section => (
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
                        <p className="text-xs font-bold uppercase text-gray-700">Public Visibility</p>
                        <p className="text-[10px] text-gray-400 italic">Toggle display on global markets</p>
                      </div>
                      <Switch 
                        checked={section.visible} 
                        onCheckedChange={(val) => updateSection({ ...section, visible: val })}
                      />
                    </div>
                    
                    <div className="pt-6 border-t border-border flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="ghost" className="h-8 px-4 text-[9px] font-bold uppercase text-gray-400 hover:text-plum">
                          <Edit3 className="w-3 h-3 mr-2" /> Edit Layout
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="h-8 px-4 text-[9px] font-bold uppercase text-plum hover:bg-plum/5"
                          onClick={() => handlePublishRequest('editorial', section.id, section.title)}
                        >
                          <Send className="w-3 h-3 mr-2" /> Request Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
