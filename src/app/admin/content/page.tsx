'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutTemplate, 
  Eye, 
  Star, 
  Edit3, 
  Plus, 
  ChevronRight, 
  RefreshCcw,
  FileText,
  Package,
  Search,
  Send,
  Globe,
  Lock,
  History,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Clock
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ContentAdminHub() {
  const { sections, products, updateSection, updateProduct, removeProduct } = useCMS();
  const { submitApproval, currentUser, lockProductForEditing, unlockProduct, rollbackProductVersion } = useAppStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'sections' | 'artifacts' | 'editorial'>('artifacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductVersions, setSelectedProductVersions] = useState<any[] | null>(null);
  const [vcsProductId, setVcsProductId] = useState<string | null>(null);

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

  const handleEditArtifact = (productId: string) => {
    const locked = lockProductForEditing(productId);
    if (locked) {
      toast({ title: "Artifact Locked", description: "You have exclusive edit rights for 15 minutes." });
    } else {
      toast({ variant: "destructive", title: "Access Denied", description: "This artifact is currently being edited by another regional hub." });
    }
  };

  const handleOpenVCS = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setSelectedProductVersions(prod.versionHistory);
      setVcsProductId(productId);
    }
  };

  const handleRollback = (versionId: string) => {
    if (vcsProductId) {
      rollbackProductVersion(vcsProductId, versionId);
      toast({ title: "Rollback Successful", description: "Artifact registry has been reverted to the selected state." });
      setVcsProductId(null);
      setSelectedProductVersions(null);
    }
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      {/* VCS Modal */}
      <Dialog open={!!vcsProductId} onOpenChange={() => setVcsProductId(null)}>
        <DialogContent className="max-w-2xl bg-white rounded-none border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl italic">Artifact Version Control</DialogTitle>
            <DialogDescription className="text-[10px] uppercase tracking-widest">Select a previous registry state to restore</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
            {selectedProductVersions?.map((v) => (
              <div key={v.id} className="p-6 border border-border bg-ivory/30 flex items-center justify-between group hover:border-plum transition-all">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-plum text-white text-[8px] uppercase">v.{v.version}</Badge>
                    <span className="text-xs font-bold text-gray-900">{v.timestamp}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 italic">"{v.changeSummary}"</p>
                  <p className="text-[8px] text-gray-400 uppercase font-bold tracking-tighter">Specialist: {v.editedBy}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 border-plum text-plum text-[8px] font-bold uppercase hover:bg-plum hover:text-white"
                  onClick={() => handleRollback(v.id)}
                >
                  <RotateCcw className="w-3 h-3 mr-2" /> Rollback
                </Button>
              </div>
            ))}
            {selectedProductVersions?.length === 0 && (
              <div className="py-20 text-center opacity-30">
                <History className="w-12 h-12 mx-auto mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest">No previous versions in registry</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Institutional Storytelling • Conflict-Aware Registry</p>
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
                <Card key={prod.id} className="bg-white border-border shadow-luxury overflow-hidden flex flex-col md:flex-row relative">
                  {prod.editingLock && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-plum animate-pulse" />
                  )}
                  
                  <div className="md:w-48 bg-ivory/50 flex flex-col items-center justify-center border-r border-border p-4">
                     <span className="text-[8px] font-bold uppercase tracking-widest text-gray-300 mb-4">v.{prod.currentVersion} Registry</span>
                     <div className="w-full h-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-gray-200">
                        Asset
                     </div>
                  </div>

                  <CardContent className="flex-1 p-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-gray-400 uppercase">ID: {prod.id}</p>
                          <h3 className="text-xl font-headline font-bold italic">{prod.name}</h3>
                       </div>
                       <div className="flex items-center space-x-2">
                          <Badge variant={prod.status === 'published' ? 'default' : 'outline'} className={cn(prod.status === 'verified' && "bg-green-500 text-white")}>
                            {prod.status}
                          </Badge>
                          {prod.editingLock ? (
                            <Badge className="bg-plum text-white text-[7px] animate-pulse">LOCKED BY {prod.editingLock.userName}</Badge>
                          ) : (
                            <Badge variant="outline" className="text-[7px] text-green-500 border-green-200">AVAILABLE</Badge>
                          )}
                       </div>
                    </div>

                    <div className="space-y-4 border-l border-border pl-8">
                       <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Conflict Matrix</p>
                       <div className="space-y-3">
                          <div className="flex items-center justify-between">
                             <span className="text-[10px] font-bold uppercase">Strategy</span>
                             <Select defaultValue={prod.conflictStrategy}>
                                <SelectTrigger className="h-8 w-32 text-[9px] uppercase font-bold bg-ivory border-border">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-border">
                                   <SelectItem value="global-priority" className="text-[9px] font-bold uppercase">Global Priority</SelectItem>
                                   <SelectItem value="regional-priority" className="text-[9px] font-bold uppercase">Regional Priority</SelectItem>
                                </SelectContent>
                             </Select>
                          </div>
                          <div className="flex items-center space-x-2 text-[8px] font-bold uppercase text-gray-400">
                             <Clock className="w-3 h-3" />
                             <span>Sync: {prod.lastSyncedAt ? new Date(prod.lastSyncedAt).toLocaleTimeString() : 'Manual Only'}</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4 border-l border-border pl-8">
                       <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Regional Edit Path</p>
                       <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                             <span className="text-gray-400">Last Hub</span>
                             <span className="text-plum">{prod.lastEditedRegion.toUpperCase()}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                             {prod.regions.map(r => <Badge key={r} variant="outline" className="text-[7px] uppercase h-5">{r}</Badge>)}
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                       <Button 
                        variant="outline" 
                        className={cn(
                          "h-10 border-border text-[9px] font-bold uppercase tracking-widest w-full transition-all",
                          prod.editingLock ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"
                        )}
                        onClick={() => handleEditArtifact(prod.id)}
                        disabled={!!prod.editingLock && prod.editingLock.userId !== currentUser?.id}
                       >
                          <Lock className="w-3 h-3 mr-2" /> {prod.editingLock ? 'Locked' : 'Acquire Lock'}
                       </Button>
                       <div className="flex space-x-2 w-full pt-4">
                          <Button 
                            variant="ghost" 
                            className="flex-1 h-10 text-[9px] font-bold uppercase hover:bg-plum/5"
                            onClick={() => handleOpenVCS(prod.id)}
                          >
                             <History className="w-3 h-3 mr-2" /> VCS
                          </Button>
                          <Button 
                            className="flex-1 h-10 bg-black text-white hover:bg-plum text-[9px] font-bold uppercase"
                            onClick={() => handlePublishRequest('listing', prod.id, prod.name)}
                          >
                             Audit
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
