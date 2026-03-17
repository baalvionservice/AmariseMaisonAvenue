
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Settings, 
  DollarSign, 
  Package,
  LogOut,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Zap,
  Target,
  Briefcase,
  Globe,
  Database,
  Sparkles,
  RefreshCcw,
  LayoutDashboard,
  Crown,
  Share2,
  BookOpen,
  Activity,
  UserCheck,
  Languages,
  Plus,
  Trash2,
  Image as ImageIcon,
  Edit3,
  CheckCircle2,
  FileText,
  MapPin,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  COUNTRIES, 
  DEPARTMENTS, 
  CATEGORIES, 
  COLORS, 
  SIZES 
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

type AdminTab = 'overview' | 'catalog' | 'hierarchy' | 'collections' | 'editorial' | 'templates' | 'assets' | 'ops';

/**
 * Super Admin Panel: The Single Control Center for AMARISÉ MAISON AVENUE.
 */
export default function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const { 
    products, 
    collections, 
    departments, 
    categories, 
    cities, 
    editorials, 
    buyingGuides,
    upsertProduct,
    deleteProduct,
    upsertCollection
  } = useAppStore();
  const { toast } = useToast();

  const [selectedCountry, setSelectedCountry] = useState('us');
  const currentCountry = COUNTRIES[selectedCountry] || COUNTRIES.us;

  // --- Entity Management State ---
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const stats = useMemo(() => ({
    totalProducts: products.length,
    totalCollections: collections.length,
    totalCities: cities.length,
    totalEditorial: editorials.length,
    activeMarkets: Object.keys(COUNTRIES).length,
    imageHealth: 98,
    systemUptime: '99.99%'
  }), [products, collections, cities, editorials]);

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      {/* Universal Sidebar Navigation */}
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">SUPER</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Maison Command Center v4.0</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <AdminNavItem icon={<LayoutDashboard />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <AdminNavItem icon={<Package />} label="Catalog" active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} />
          <AdminNavItem icon={<Database />} label="Hierarchy" active={activeTab === 'hierarchy'} onClick={() => setActiveTab('hierarchy')} />
          <AdminNavItem icon={<Crown />} label="Collections" active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} />
          <AdminNavItem icon={<BookOpen />} label="Editorial" active={activeTab === 'editorial'} onClick={() => setActiveTab('editorial')} />
          <AdminNavItem icon={<ImageIcon />} label="AI Assets" active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} />
          <AdminNavItem icon={<Settings />} label="Templates" active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} />
          <AdminNavItem icon={<Activity />} label="Operations" active={activeTab === 'ops'} onClick={() => setActiveTab('ops')} />
        </nav>

        <div className="pt-8 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href={`/${selectedCountry}`}>
              <LogOut className="w-4 h-4 mr-3 transition-transform group-hover:-translate-x-1" /> Exit to Maison
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Command Workspace */}
      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              Command Context: {currentCountry.name} Market
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 px-4 py-2 bg-ivory border border-border">
               <Activity className="w-3 h-3 text-gold animate-pulse" />
               <span className="text-[9px] font-bold tracking-[0.3em] text-gray-500 uppercase">System Sync: Real-Time</span>
            </div>
            
            <div className="relative">
               <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum" />
               <select 
                 className="bg-white border border-border h-10 pl-10 pr-8 text-[10px] tracking-widest uppercase font-bold outline-none appearance-none cursor-pointer text-gray-700 hover:border-gold transition-colors"
                 value={selectedCountry}
                 onChange={(e) => setSelectedCountry(e.target.value)}
               >
                 {Object.entries(COUNTRIES).map(([code, c]) => (
                   <option key={code} value={code}>{c.name}</option>
                 ))}
               </select>
            </div>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">A</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<Database />} label="Catalog Entities" value={stats.totalProducts.toLocaleString()} trend="+12 New" positive />
                <StatCard icon={<Globe />} label="Dynamic Pages" value="2,026,875" trend="Live" positive />
                <StatCard icon={<ImageIcon />} label="Asset Health" value={`${stats.imageHealth}%`} trend="Optimal" positive />
                <StatCard icon={<Activity />} label="Uptime" value={stats.systemUptime} trend="Global" positive />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border pb-6 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-headline text-2xl font-bold">Market Distribution</CardTitle>
                      <CardDescription className="text-[10px] uppercase tracking-widest">Global entity allocation by hub</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-gold text-gold">ACTIVE</Badge>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="space-y-8">
                      {Object.values(COUNTRIES).map(c => (
                        <div key={c.code} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-ivory border border-border flex items-center justify-center text-[10px] font-bold">{c.code.toUpperCase()}</div>
                            <span className="text-xs font-bold uppercase">{c.name}</span>
                          </div>
                          <div className="flex-1 max-w-xs mx-12">
                            <Progress value={Math.random() * 40 + 60} className="h-1 bg-gray-100" />
                          </div>
                          <span className="text-[10px] font-bold text-plum uppercase">400k+ Pages</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-xl">Asset Queue</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <QueueItem label="Bulk AI Image Regeneration" status="Pending" color="gold" />
                    <QueueItem label="SEO Meta Update - Summer 24" status="Syncing" color="plum" />
                    <QueueItem label="JSON-LD Schema Audit" status="Completed" color="green" />
                    <QueueItem label="Maison City Narrative Refresh" status="Queueing" color="gray" />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* CATALOG TAB */}
          {activeTab === 'catalog' && (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold">Artifact Repository</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Manage {products.length} luxury products</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-plum/10">
                  <Plus className="w-4 h-4 mr-2" /> Register New Piece
                </Button>
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold">ID / SKU</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold">Product Name</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold">Department</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold">Price</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold">Stock</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.slice(0, 15).map(p => (
                      <TableRow key={p.id} className="hover:bg-ivory/30 transition-colors">
                        <TableCell className="text-xs font-mono font-bold text-plum">{p.id.toUpperCase()}</TableCell>
                        <TableCell className="text-xs font-bold uppercase">{p.name}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest">{p.departmentId}</Badge></TableCell>
                        <TableCell className="text-xs font-light">${p.basePrice.toLocaleString()}</TableCell>
                        <TableCell className="text-xs font-bold text-gold">{p.stock} Units</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><Edit3 className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-destructive" onClick={() => deleteProduct(p.id)}><Trash2 className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 bg-ivory/50 border-t border-border flex justify-center">
                  <Button variant="link" className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-gold">Load Global Repository</Button>
                </div>
              </Card>
            </div>
          )}

          {/* EDITORIAL TAB */}
          {activeTab === 'editorial' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <EditorialSectionCard icon={<MapPin />} label="Maison Cities" count={cities.length} />
                <EditorialSectionCard icon={<Zap />} label="Trend Guides" count={10} />
                <EditorialSectionCard icon={<FileText />} label="Buying Guides" count={buyingGuides.length} />
              </div>

              <div className="space-y-8">
                <h3 className="text-xl font-headline font-bold italic">The Journal: Drafts & Published</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {editorials.map(ed => (
                    <Card key={ed.id} className="bg-white border-border hover:border-gold transition-all group overflow-hidden">
                      <div className="flex h-40">
                        <div className="w-1/3 relative bg-ivory">
                          <img src={ed.imageUrl} alt={ed.title} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="w-2/3 p-6 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-plum">{ed.category}</span>
                              <Badge className="bg-green-50 text-green-600 border-green-100 text-[8px] uppercase tracking-tighter">Live</Badge>
                            </div>
                            <h4 className="text-lg font-headline font-bold leading-tight line-clamp-1">{ed.title}</h4>
                            <p className="text-[10px] text-gray-400 line-clamp-2 italic">{ed.excerpt}</p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-border/40">
                            <span className="text-[8px] font-bold uppercase text-gray-400">By {ed.author}</span>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" className="h-6 w-6"><Eye className="w-3 h-3" /></Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-plum"><Edit3 className="w-3 h-3" /></Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ASSETS TAB - AI IMAGE ENGINE */}
          {activeTab === 'assets' && (
            <div className="space-y-12">
              <Card className="bg-plum text-white border-none shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Sparkles className="w-64 h-64" />
                </div>
                <CardContent className="p-12 space-y-8 relative z-10">
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center space-x-3 text-gold">
                      <Sparkles className="w-6 h-6" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Maison AI Visual Engine</span>
                    </div>
                    <h2 className="text-5xl font-headline font-bold italic">Artifact Visualization</h2>
                    <p className="text-white/70 font-light italic leading-relaxed text-lg">
                      "Generate production-grade card images for 2,000,000+ products with consistent lighting, Maison palette compliance, and high-fidelity textures."
                    </p>
                  </div>
                  <div className="flex space-x-6">
                    <Button className="bg-gold text-gray-900 hover:bg-white h-14 px-10 rounded-none text-[10px] font-bold tracking-widest uppercase">
                      Start Global Render (US Market)
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-10 rounded-none text-[10px] font-bold tracking-widest uppercase">
                      Audit Visual Assets
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">Asset Compliance</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Brand consistency audit across 10 departments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                    <AssetHealthRow label="Jewelry - High Contrast" health={99} />
                    <AssetHealthRow label="Apparel - Texture Depth" health={94} />
                    <AssetHealthRow label="Watches - Macro Detail" health={97} />
                    <AssetHealthRow label="Home - Ambient Lighting" health={92} />
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-border shadow-luxury p-12 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-ivory rounded-full flex items-center justify-center text-gold">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-headline font-bold">Image Seed Settings</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Master lighting & background configuration</p>
                  </div>
                  <Button variant="outline" className="border-border text-gray-400 uppercase tracking-widest text-[9px] font-bold h-10 px-8">Edit Visual Seed</Button>
                </Card>
              </div>
            </div>
          )}

          {/* TEMPLATES & OPS PLACEHOLDERS */}
          {(activeTab === 'templates' || activeTab === 'ops' || activeTab === 'hierarchy' || activeTab === 'collections') && (
            <div className="py-40 text-center space-y-6">
              <RefreshCcw className="w-12 h-12 text-gold/30 mx-auto animate-spin-slow" />
              <p className="text-2xl text-muted-foreground font-light italic font-headline">The {activeTab} workspace is initializing from the Global Registry.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

function AdminNavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border",
        active 
          ? "bg-gold text-gray-900 border-gold shadow-md scale-105 z-10" 
          : "text-gray-400 hover:bg-ivory hover:text-plum border-transparent"
      )}
    >
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-gray-900" : "text-gold")}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </span>
      <span>{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

function StatCard({ icon, label, value, trend, positive }: { icon: any, label: string, value: string, trend: string, positive: boolean }) {
  return (
    <Card className="bg-white border-border shadow-luxury hover:border-gold transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-ivory rounded-full group-hover:bg-gold/10 transition-colors text-plum">{icon}</div>
          <div className={cn(
            "flex items-center text-xs font-bold tracking-widest",
            positive ? "text-gold" : "text-destructive"
          )}>
            {trend} {positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <ArrowDownRight className="ml-1 w-3 h-3" />}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-[10px] uppercase tracking-[0.4em] font-bold">{label}</div>
          <div className="text-4xl font-headline font-bold italic mt-2 text-gray-900">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function QueueItem({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-ivory/50 border border-border rounded-sm">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">{label}</span>
      <div className="flex items-center space-x-2">
        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", color === 'gold' ? 'bg-gold' : color === 'plum' ? 'bg-plum' : color === 'green' ? 'bg-green-500' : 'bg-gray-400')} />
        <span className="text-[9px] font-bold uppercase text-gray-400">{status}</span>
      </div>
    </div>
  );
}

function AssetHealthRow({ label, health }: { label: string, health: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
        <span className="text-gray-500">{label}</span>
        <span className="text-gold">{health}% Match</span>
      </div>
      <Progress value={health} className="h-1 bg-gray-100" />
    </div>
  );
}

function EditorialSectionCard({ icon, label, count }: { icon: any, label: string, count: number }) {
  return (
    <Card className="bg-white border-border shadow-luxury p-8 hover:border-plum transition-all cursor-pointer group">
      <div className="flex items-center space-x-4">
        <div className="p-4 bg-ivory rounded-sm text-plum group-hover:text-gold transition-colors">{icon}</div>
        <div className="space-y-1">
          <h4 className="text-lg font-headline font-bold italic">{label}</h4>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{count} Live Segments</p>
        </div>
      </div>
    </Card>
  );
}
