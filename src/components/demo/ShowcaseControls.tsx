'use client';

import React, { useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { COUNTRIES } from '@/lib/mock-data';
import { users as RBAC_USERS } from '@/lib/rbac/mock-users';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Crown, 
  LayoutDashboard, 
  Settings2,
  PlayCircle,
  Zap,
  BookOpen,
  PieChart,
  X,
  UserCheck,
  ShieldAlert,
  BrainCircuit,
  Target,
  FileText,
  ShieldCheck,
  CreditCard,
  Search,
  FlaskConical,
  Store,
  LifeBuoy,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * ShowcaseControls: The master diagnostic and navigation hub for the prototype.
 * Provides rapid access to all administrative terminals and persona switching.
 */
export function ShowcaseControls() {
  const { country } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { 
    isShowcaseMode, 
    setShowcaseMode, 
    currentUser, 
    setCurrentUser,
    recordLog 
  } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentCountry = (country as string) || 'us';

  const handleCountrySwitch = (code: string) => {
    const newPath = pathname.replace(`/${currentCountry}`, `/${code}`);
    router.push(newPath);
  };

  const handlePersonaSwitch = (userId: string) => {
    const user = RBAC_USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      recordLog(`Security Persona Switched to ${user.name}`, 'System');
      setIsOpen(false);
      // Redirect to home if current page is restricted for new persona
      if (pathname.includes('/admin')) {
        router.push(`/${user.country === 'GLOBAL' ? 'us' : user.country}`);
      }
    }
  };

  if (!isShowcaseMode) return (
    <Button 
      onClick={() => setShowcaseMode(true)}
      className="fixed bottom-6 right-6 z-[100] bg-white border-gold text-gold hover:bg-gold hover:text-white rounded-full shadow-luxury h-12 px-6"
    >
      <PlayCircle className="w-4 h-4 mr-2" /> Enter Showcase
    </Button>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end space-y-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="w-16 h-16 bg-gold text-gray-900 rounded-full shadow-luxury flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative hover:shadow-gold-glow">
            <Settings2 className={cn("w-7 h-7 transition-transform duration-500", isOpen && "rotate-180")} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-plum opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-plum border-2 border-white"></span>
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[400px] p-0 bg-white border-border shadow-luxury overflow-hidden">
          <div className="p-6 bg-gold/10 border-b border-border">
             <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-headline font-bold text-gray-900 uppercase tracking-widest">Maison Command Matrix</h3>
                <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-gray-400 hover:text-plum" /></button>
             </div>
             <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Institutional Access Hub • v5.2.0-SECURE</p>
          </div>

          <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Security Context: Persona Switching */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-plum">
                <UserCheck className="w-3 h-3" />
                <span>Security Persona</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {RBAC_USERS.map(user => (
                  <button 
                    key={user.id}
                    onClick={() => handlePersonaSwitch(user.id)}
                    className={cn(
                      "p-3 border text-[9px] font-bold uppercase tracking-widest text-left flex flex-col justify-between transition-all",
                      currentUser?.id === user.id ? "bg-plum text-white border-plum" : "bg-ivory border-border text-gray-400 hover:bg-plum/5 hover:text-plum"
                    )}
                  >
                    <span>{user.name}</span>
                    <span className="opacity-60 text-[7px] mt-1">[{user.role.toUpperCase()}]</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Market Context */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-plum">
                <Globe className="w-3 h-3" />
                <span>Regional Hub</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {Object.keys(COUNTRIES).map(code => (
                  <button 
                    key={code}
                    onClick={() => handleCountrySwitch(code)}
                    className={cn(
                      "h-10 border text-[10px] font-bold uppercase tracking-widest transition-all",
                      currentCountry === code ? "bg-gold border-gold text-gray-900" : "bg-ivory border-border text-gray-400 hover:bg-gold hover:text-gray-900"
                    )}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Comprehensive Admin Registry */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-plum">
                <Zap className="w-3 h-3" />
                <span>Administrative Registry</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <ActionLink href="/admin" icon={<LayoutDashboard />} label="Command Center" />
                <ActionLink href="/admin/ai-dashboard" icon={<BrainCircuit />} label="AI Autopilot" />
                <ActionLink href="/admin/sales" icon={<Target />} label="Sales CRM" />
                <ActionLink href="/admin/content" icon={<FileText />} label="Atelier CMS" />
                <ActionLink href="/admin/operations" icon={<PieChart />} label="Operations Hub" />
                <ActionLink href="/admin/finance" icon={<CreditCard />} label="Finance Hub" />
                <ActionLink href="/admin/seo" icon={<Search />} label="SEO Authority" />
                <ActionLink href="/admin/errors" icon={<ShieldAlert />} label="Error Matrix" />
                <ActionLink href="/admin/compliance" icon={<ShieldCheck />} label="Compliance" />
                <ActionLink href="/admin/qa" icon={<FlaskConical />} label="QA Terminal" />
                <ActionLink href="/admin/super" icon={<Crown />} label="Global Matrix" />
                <ActionLink href="/admin/vendor" icon={<Store />} label="Vendor Portal" />
                <ActionLink href="/admin/support" icon={<LifeBuoy />} label="Care Terminal" />
                <ActionLink href="/admin/notifications" icon={<Bell />} label="Alerts Feed" />
              </div>
            </div>

            {/* Public Experiences */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-plum">
                <BookOpen className="w-3 h-3" />
                <span>Public Experiences</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <ActionLink href={`/${currentCountry}`} icon={<Globe />} label="Homepage" />
                <ActionLink href={`/${currentCountry}/journal`} icon={<BookOpen />} label="Maison Journal" />
              </div>
            </div>
          </div>

          <div className="bg-ivory p-4 border-t border-border flex justify-between items-center">
             <button 
              onClick={() => setShowcaseMode(false)}
              className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-destructive font-bold"
             >
               Exit Super-Demo
             </button>
             <span className="text-[8px] text-gray-300 tracking-widest uppercase italic">Institutional Node Verified</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ActionLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.push(href)}
      className="flex items-center space-x-3 p-3 bg-white border border-border hover:border-gold hover:shadow-luxury group transition-all w-full text-left"
    >
      <span className="text-gold group-hover:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-gray-900 truncate">{label}</span>
    </button>
  );
}
