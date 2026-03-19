
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
  Clock,
  LayoutDashboard,
  Database
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

/**
 * Atelier CMS: Multi-Tabbed Registry Control
 * Tab 1: Overview (Primary CTA), Tab 2: Full Registry, Tab 3: Advanced (VCS/Locking)
 */
export default function ContentAdminHub() {
  const { sections, products, updateSection, updateProduct, removeProduct } = useCMS();
  const { submitApproval, currentUser, lockProductForEditing, unlockProduct, rollbackProductVersion } = useAppStore();
  const { toast } = useToast();
  
  const [activeInternalTab, setActiveInternalTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductVersions, setSelectedProductVersions] = useState<any[] | null>(null);
  const [vcsProductId, setVcsProductId] = useState<string | null>(null);

  const filteredProducts = useSearch(products, searchQuery);

  const handlePublishRequest = (type: any, id: string, title: string) => {
    submitApproval(type, id, currentUser?.country);
    toast({
      title: "Review Transmitted",
      description: `Entry "${title}" sent to curatorial oversight.`,
    });
  };

  const handleEditArtifact = (productId: string) => {
    const locked = lockProductForEditing(productId);
    if (locked) {
      toast({ title: "Artifact Locked", description: "You have exclusive edit rights." });
    } else {
      toast({ variant: "destructive", title: "Access Denied", description: "This artifact is being refined by another regional hub." });
    }
  };

  const handleOpenVCS = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setSelectedProductVersions(prod.versionHistory);
      setVcsProductId(productId);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
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
                  onClick={() => {
                    rollbackProductVersion(vcsProductId!, v.id);
                    setVcsProductId(null);
                    toast({ title: "Rollback Complete" });
                  }}
                >
                  <RotateCcw className="w-3 h-3 mr-2" /> Rollback
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center space-x-2">
             <Link href="/admin">Dashboard</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-plum">Atelier Registry</span>
          </nav>
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-gray-900 uppercase">Atelier CMS</h1>
          <p className="text-sm text-gray-500 font-light italic">Institutional artifact management & curatorial workflows.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button className="h-14 px-10 rounded-none bg-plum text-white hover:bg-black transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-plum/20">
             <Plus className="w-4 h-4 mr-3" /> REGISTER NEW ARTIFACT
           </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveInternalTab}>
        <TabsList className="bg-white border-b border-border h-14 w-full justify-start p-0 rounded-none space-x-12 mb-12">
          <TabsTrigger value="overview" className="tab-trigger">Overview</TabsTrigger>
          <TabsTrigger value="registry" className="tab-trigger">Registry Hub</TabsTrigger>
          <TabsTrigger value="advanced" className="tab-trigger">Advanced Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-12 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatsTile label="Total Artifacts" value={products.length.toString()} trend="Global Scope" />
              <StatsTile label="Pending Verification" value={products.filter(p => p.status === 'review').length.toString()} trend="Immediate Action" />
              <StatsTile label="Registry Health" value="100%" trend="Optimal" />
           </div>

           <Card className="bg-black text-white p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                 <Database className="w-64 h-64" />
              </div>
              <div className="relative z-10 space-y-8 max-w-2xl">
                 <h2 className="text-4xl font-headline font-bold italic leading-tight">Master Catalog Oversight</h2>
                 <p className="text-xl font-light italic text-white/70 leading-relaxed">
                   "Every artifact in the Maison registry must maintain its architectural integrity. Begin by registering high-resonance archive pieces."
                 </p>
                 <Button className="h-12 px-10 bg-white text-black hover:bg-gold hover:text-white rounded-none text-[10px] font-bold uppercase tracking-widest shadow-xl">
                    START REGISTRATION FLOW
                 </Button>
              </div>
           </Card>
        </TabsContent>

        <TabsContent value="registry" className="space-y-8 animate-fade-in">
          <div className="flex items-center justify-between bg-white p-6 border border-border">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  className="w-full bg-ivory h-12 pl-12 pr-4 text-xs font-bold uppercase tracking-widest outline-none border border-border focus:ring-1 focus:ring-plum transition-all"
                  placeholder="Filter Registry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <div className="flex space-x-4">
                <Button variant="outline" className="h-12 px-6 border-border text-[9px] font-bold uppercase tracking-widest">
                   <RefreshCcw className="w-3.5 h-3.5 mr-2" /> Sync Nodes
                </Button>
             </div>
          </div>

          <Card className="bg-white border-border shadow-luxury overflow-hidden">
            <Table>
              <TableHeader className="bg-ivory/50">
                <TableRow>
                  <TableHead className="text-[9px] uppercase font-bold pl-8">Artifact</TableHead>
                  <TableHead className="text-[9px] uppercase font-bold">Scope</TableHead>
                  <TableHead className="text-[9px] uppercase font-bold">Status</TableHead>
                  <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.slice(0, 15).map(prod => (
                  <TableRow key={prod.id} className="hover:bg-ivory/30 group transition-colors">
                    <TableCell className="pl-8">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-tight">{prod.name}</span>
                        <span className="text-[8px] text-gray-400 uppercase font-mono">ID: {prod.id}</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest">{prod.scope}</Badge></TableCell>
                    <TableCell>
                      <Badge className={cn("text-[8px] uppercase tracking-tighter", prod.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold')}>
                        {prod.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 group-hover:text-plum" onClick={() => handleEditArtifact(prod.id)}><Edit3 className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 group-hover:text-plum" onClick={() => handleOpenVCS(prod.id)}><History className="w-3.5 h-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-40 text-center">
                       <div className="flex flex-col items-center space-y-4 opacity-30">
                          <Package className="w-12 h-12" />
                          <p className="text-sm font-bold uppercase tracking-widest italic">No artifacts match your query.</p>
                          <Button variant="outline" onClick={() => setSearchQuery('')}>Clear Search</Button>
                       </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-12 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="bg-white border-border shadow-luxury p-10 space-y-8">
                 <div className="flex items-center space-x-4 text-plum">
                    <Lock className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Registry Locking</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Configure the institutional locking mechanism to prevent hub-level edit conflicts. Locks auto-expire after 15 minutes of inactivity.
                 </p>
                 <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Global Locking Active</span>
                    <Switch defaultChecked className="data-[state=checked]:bg-plum" />
                 </div>
              </Card>

              <Card className="bg-white border-border shadow-luxury p-10 space-y-8">
                 <div className="flex items-center space-x-4 text-plum">
                    <RotateCcw className="w-6 h-6" />
                    <h3 className="text-xl font-headline font-bold italic uppercase tracking-widest">Conflict Strategy</h3>
                 </div>
                 <p className="text-sm text-gray-500 font-light italic leading-relaxed">
                   Define how the Maison handles divergent edits between global curators and regional hub operators.
                 </p>
                 <div className="pt-4 border-t border-border">
                    <Select defaultValue="global-priority">
                       <SelectTrigger className="h-12 rounded-none bg-ivory text-xs font-bold uppercase tracking-widest border-border">
                          <SelectValue />
                       </SelectTrigger>
                       <SelectContent className="bg-white border-border">
                          <SelectItem value="global-priority">Global-Priority (Master Registry)</SelectItem>
                          <SelectItem value="regional-priority">Regional-Priority (Hub Sovereign)</SelectItem>
                       </SelectContent>
                    </Select>
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
