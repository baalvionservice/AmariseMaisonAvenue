
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
  Eye,
  ShieldAlert,
  Users,
  CreditCard,
  Truck,
  Building2,
  History,
  Lock,
  Smartphone,
  LayoutTemplate
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
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

type AdminTab = 'intelligence' | 'governance' | 'ecosystem' | 'architecture' | 'strategy' | 'archives' | 'catalog' | 'assets';

const REVENUE_DATA = [
  { name: 'Jan', value: 450000 },
  { name: 'Feb', value: 520000 },
  { name: 'Mar', value: 480000 },
  { name: 'Apr', value: 610000 },
  { name: 'May', value: 590000 },
  { name: 'Jun', value: 720000 },
];

const DEMO_DATA = [
  { name: 'Diamond', value: 45, color: '#D4AF37' },
  { name: 'Gold', value: 30, color: '#7E3F98' },
  { name: 'Silver', value: 25, color: '#BFA2DB' },
];

/**
 * Super Admin Panel (Master Control): The Strategic Center for AMARISÉ MAISON AVENUE.
 */
export default function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>('intelligence');
  const { 
    products, 
    admins,
    vendors,
    activeCampaigns,
    auditLogs,
    deleteProduct
  } = useAppStore();
  const { toast } = useToast();

  const [selectedCountry, setSelectedCountry] = useState('us');
  const currentCountry = COUNTRIES[selectedCountry] || COUNTRIES.us;

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      {/* Strategic Sidebar Navigation */}
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">MASTER</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Maison Master Control v5.0</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <AdminNavItem icon={<BarChart3 />} label="Intelligence" active={activeTab === 'intelligence'} onClick={() => setActiveTab('intelligence')} />
          <AdminNavItem icon={<Users />} label="Governance" active={activeTab === 'governance'} onClick={() => setActiveTab('governance')} />
          <AdminNavItem icon={<Building2 />} label="Ecosystem" active={activeTab === 'ecosystem'} onClick={() => setActiveTab('ecosystem')} />
          <AdminNavItem icon={<Settings />} label="Architecture" active={activeTab === 'architecture'} onClick={() => setActiveTab('architecture')} />
          <AdminNavItem icon={<Target />} label="Strategy" active={activeTab === 'strategy'} onClick={() => setActiveTab('strategy')} />
          <AdminNavItem icon={<History />} label="Archives" active={activeTab === 'archives'} onClick={() => setActiveTab('archives')} />
          
          <div className="pt-6 pb-2 px-6 text-[8px] font-bold uppercase tracking-widest text-gray-300">Department Jumps</div>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-gold group px-6" asChild>
            <Link href="/admin/operations">
              <LayoutTemplate className="w-4 h-4 mr-3" /> Operations Hub
            </Link>
          </Button>
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <div className="flex items-center space-x-3 px-4 py-3 bg-plum/5 border border-plum/10 rounded-sm">
             <ShieldAlert className="w-4 h-4 text-plum" />
             <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-widest">Security: Optimal</span>
                <span className="text-[8px] text-gray-400">2FA Verified</span>
             </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href={`/${selectedCountry}`}>
              <LogOut className="w-4 h-4 mr-3 transition-transform group-hover:-translate-x-1" /> Exit Control
            </Link>
          </Button>
        </div>
      </aside>

      {/* Control Workspace */}
      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">
              {activeTab}
            </h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              Global Platform Oversight • {currentCountry.name} Market Context
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
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
            <div className="flex items-center space-x-4 border-l border-border pl-6">
               <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest">Maison CEO</p>
                  <p className="text-[8px] text-gray-400 uppercase">Master Access</p>
               </div>
               <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">MC</div>
            </div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          
          {/* INTELLIGENCE (ANALYTICS) */}
          {activeTab === 'intelligence' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<DollarSign />} label="Global Revenue" value="$4.2M" trend="+12.5%" positive />
                <StatCard icon={<Briefcase />} label="Avg. Order Value" value="$8,450" trend="+4.2%" positive />
                <StatCard icon={<Crown />} label="VIP Retention" value="94%" trend="Live" positive />
                <StatCard icon={<Target />} label="Ad Conversion" value="3.8%" trend="-0.5%" positive={false} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Revenue Architecture</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Growth trajectory across global ateliers (6 months)</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7E3F98" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#7E3F98" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} tickFormatter={(v) => `$${v/1000}k`} />
                        <ChartTooltip 
                          contentStyle={{backgroundColor: '#fff', border: '1px solid #eee', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase'}}
                        />
                        <Area type="monotone" dataKey="value" stroke="#7E3F98" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Client Segmentation</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Market distribution by loyalty tier</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 flex flex-col items-center">
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={DEMO_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {DEMO_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-full space-y-4 mt-6">
                      {DEMO_DATA.map(d => (
                        <div key={d.name} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}} />
                            <span className="text-gray-500">{d.name}</span>
                          </div>
                          <span>{d.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* GOVERNANCE (ADMINS) */}
          {activeTab === 'governance' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Maison Governance</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Oversee administrative roles and permissions</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold tracking-widest uppercase">
                  <Plus className="w-4 h-4 mr-2" /> Appoint New Admin
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {admins.map(admin => (
                  <Card key={admin.id} className="bg-white border-border shadow-luxury hover:border-plum transition-all group overflow-hidden">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-ivory rounded-sm flex items-center justify-center border border-border group-hover:border-plum transition-colors overflow-hidden">
                          {admin.avatar ? <img src={admin.avatar} alt={admin.name} className="w-full h-full object-cover" /> : <Users className="w-8 h-8 text-plum" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-headline font-bold leading-tight">{admin.name}</h4>
                          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-1">{admin.email}</p>
                        </div>
                        <Badge className={cn("text-[8px] uppercase tracking-widest", admin.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600')}>
                          {admin.status}
                        </Badge>
                      </div>
                      <div className="pt-6 border-t border-border space-y-4">
                        <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-gray-500">
                          <span>Role</span>
                          <span className="text-plum">{admin.role}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {admin.permissions.map(p => (
                            <Badge key={p} variant="outline" className="text-[7px] border-border text-gray-400 uppercase tracking-tighter">PERM_{p.toUpperCase()}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-[8px] text-gray-300 italic">Last Active: {new Date(admin.lastActive).toLocaleDateString()}</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><Edit3 className="w-3 h-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-destructive"><Lock className="w-3 h-3" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ECOSYSTEM (VENDORS) */}
          {activeTab === 'ecosystem' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Artisanal Partners</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Manage vendor applications and sales performance</p>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" className="border-border text-gray-400 hover:text-plum h-12 px-8 rounded-none text-[10px] font-bold uppercase">View Applications (3)</Button>
                  <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold uppercase">Invite Master Artisan</Button>
                </div>
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold">Partner Name</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold">Category</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold text-center">Trust Index</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold text-center">Entities</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold text-right">Revenue Share</TableHead>
                      <TableHead className="text-[9px] uppercase tracking-widest font-bold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map(vendor => (
                      <TableRow key={vendor.id} className="hover:bg-ivory/30 transition-colors">
                        <TableCell className="text-xs font-bold uppercase">{vendor.name}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest">{vendor.category}</Badge></TableCell>
                        <TableCell>
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-[10px] font-bold text-gold">{vendor.performance}%</span>
                            <Progress value={vendor.performance} className="h-1 w-16 bg-gray-100" />
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-center font-bold text-plum">{vendor.productCount}</TableCell>
                        <TableCell className="text-xs text-right font-light">${vendor.salesTotal.toLocaleString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><DollarSign className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* ARCHITECTURE (SETTINGS) */}
          {activeTab === 'architecture' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-headline font-bold italic">Maison Architecture</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border flex flex-row items-center space-x-4">
                    <div className="p-3 bg-plum/5 text-plum rounded-sm"><Smartphone className="w-5 h-5" /></div>
                    <div>
                      <CardTitle className="text-sm uppercase tracking-widest">Interface & Identity</CardTitle>
                      <CardDescription className="text-[8px]">Global theming and font registry</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <div className="space-y-4">
                      <Label className="text-[9px] uppercase tracking-widest text-gray-400">Primary Branding Color</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-sm bg-plum border-2 border-border shadow-sm" />
                        <Input className="h-10 text-[10px] font-bold rounded-none" defaultValue="#7E3F98" />
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-border">
                      <Label className="text-[9px] uppercase tracking-widest text-gray-400">Maison Typography</Label>
                      <select className="w-full bg-white border border-border h-10 px-4 text-[10px] font-bold uppercase outline-none rounded-none">
                        <option>Alegreya (Serif)</option>
                        <option>Inter (Sans)</option>
                        <option>Playfair Display</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border flex flex-row items-center space-x-4">
                    <div className="p-3 bg-gold/5 text-gold rounded-sm"><CreditCard className="w-5 h-5" /></div>
                    <div>
                      <CardTitle className="text-sm uppercase tracking-widest">Financial Gateway</CardTitle>
                      <CardDescription className="text-[8px]">Payment bridge configuration</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <SettingsToggle label="Global Card Terminal" active={true} />
                    <SettingsToggle label="Digital Wallets (Apple/Google)" active={true} />
                    <SettingsToggle label="Cryptocurrency Bridge" active={false} />
                    <SettingsToggle label="Tax Engine Autopilot" active={true} />
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border flex flex-row items-center space-x-4">
                    <div className="p-3 bg-plum/5 text-plum rounded-sm"><Search className="w-5 h-5" /></div>
                    <div>
                      <CardTitle className="text-sm uppercase tracking-widest">Global SEO Index</CardTitle>
                      <CardDescription className="text-[8px]">Metadata and schema strategy</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[9px] uppercase tracking-widest text-gray-400">Title Template</Label>
                      <Input className="h-10 text-[10px] rounded-none" defaultValue="%s | Amarisé Luxe" />
                    </div>
                    <div className="space-y-2 pt-4 border-t border-border">
                      <Label className="text-[9px] uppercase tracking-widest text-gray-400">Default OG Image</Label>
                      <div className="aspect-video bg-ivory border border-dashed border-border flex items-center justify-center text-gray-300 text-[8px] uppercase tracking-widest">
                        Upload Asset
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* STRATEGY (CAMPAIGNS) */}
          {activeTab === 'strategy' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Market Strategy</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Strategic campaign oversight and approvals</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold uppercase tracking-widest">
                  Draft Platform Event
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {activeCampaigns.map(camp => (
                  <Card key={camp.id} className="bg-white border-border shadow-luxury overflow-hidden flex">
                    <div className={cn("w-2 h-full", camp.status === 'active' ? 'bg-green-500' : 'bg-gold')} />
                    <div className="flex-1 p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="text-xl font-headline font-bold italic">{camp.title}</h4>
                          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{camp.type}</p>
                        </div>
                        <Badge className={cn("text-[8px] uppercase tracking-widest", camp.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gold/10 text-gold')}>
                          {camp.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-8 border-y border-border py-6">
                        <div className="space-y-1">
                          <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Market Scope</span>
                          <p className="text-xs font-bold uppercase">{camp.market}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Benefit</span>
                          <p className="text-xs font-bold uppercase text-plum">{camp.discountValue > 0 ? `-${camp.discountValue}% Global` : 'Early Access'}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[9px] text-gray-400 italic">Timeline: {camp.startDate} — {camp.endDate}</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-[9px] uppercase tracking-widest font-bold text-plum hover:bg-plum/5">Edit Scope</Button>
                          {camp.status === 'scheduled' && <Button size="sm" className="bg-plum text-white h-8 text-[9px] uppercase tracking-widest font-bold">Launch Now</Button>}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ARCHIVES (AUDIT LOGS) */}
          {activeTab === 'archives' && (
            <div className="space-y-12">
              <div className="flex justify-between items-center border-b border-border pb-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic text-gray-900">Maison Archives</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Platform-wide audit and activity footprint</p>
                </div>
                <Button variant="outline" className="border-border text-gray-400 h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest">
                  Export Compliance Report
                </Button>
              </div>

              <div className="space-y-4">
                {auditLogs.map(log => (
                  <div key={log.id} className="flex items-center justify-between p-6 bg-white border border-border hover:border-plum transition-all group">
                    <div className="flex items-center space-x-8">
                      <div className="text-center w-24">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">{new Date(log.timestamp).toLocaleDateString()}</p>
                        <p className="text-[8px] text-gray-300">{new Date(log.timestamp).toLocaleTimeString()}</p>
                      </div>
                      <div className="h-8 w-px bg-border" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-900">{log.action}</p>
                        <div className="flex items-center space-x-3">
                          <span className="text-[9px] text-plum font-bold uppercase tracking-widest">{log.adminName}</span>
                          <span className="text-[8px] text-gray-300">•</span>
                          <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">{log.module}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-12">
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">IP ORIGIN</p>
                        <p className="text-[10px] text-gray-900 font-mono">{log.ipAddress}</p>
                      </div>
                      <Badge className={cn(
                        "text-[8px] uppercase tracking-widest",
                        log.severity === 'high' ? 'bg-red-50 text-red-600' : log.severity === 'medium' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                      )}>
                        {log.severity} RISK
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OPERATIONAL PLACEHOLDERS (CATALOG & ASSETS) */}
          {(activeTab === 'catalog' || activeTab === 'assets') && (
            <div className="py-40 text-center space-y-6">
              <RefreshCcw className="w-12 h-12 text-gold/30 mx-auto animate-spin-slow" />
              <p className="text-2xl text-muted-foreground font-light italic font-headline">The {activeTab} workspace is being updated with the latest Global Registry data.</p>
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

function SettingsToggle({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 bg-ivory/50 border border-border rounded-none">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">{label}</span>
      <div className={cn(
        "w-10 h-5 rounded-full relative transition-colors duration-300",
        active ? 'bg-plum' : 'bg-gray-200'
      )}>
        <div className={cn(
          "w-3 h-3 bg-white rounded-full absolute top-1 transition-all duration-300",
          active ? 'left-6' : 'left-1'
        )} />
      </div>
    </div>
  );
}
