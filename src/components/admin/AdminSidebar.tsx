
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  Globe, 
  Package, 
  Zap, 
  Target, 
  Truck, 
  CreditCard, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  FlaskConical,
  ChevronRight,
  LogOut,
  Settings,
  Briefcase,
  Bell,
  MessageSquare,
  LifeBuoy,
  BarChart3,
  Cpu,
  Settings2,
  PlayCircle,
  Database,
  Megaphone,
  UserCircle,
  Activity,
  Gauge,
  Shield,
  Video,
  Award,
  ExternalLink,
  ClipboardList,
  BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AdminSidebar: Institutional Navigation Matrix
 * Standardized for Super Admin, Hub Lead, and Partner Atelier personas.
 */
export function AdminSidebar() {
  const pathname = usePathname();
  const { country } = useParams();
  const countryCode = (country as string) || 'us';

  const menuGroups = [
    {
      title: "Tactical",
      items: [
        { icon: <LayoutDashboard />, label: "Terminal", href: "/admin" },
        { icon: <BarChart />, label: "Audit Summary", href: "/admin/audit-summary" },
        { icon: <Globe />, label: "Global Matrix", href: "/admin/super" },
        { icon: <Zap />, label: "AI Dashboard", href: "/admin/ai-dashboard" },
        { icon: <Activity />, label: "Observability", href: "/admin/observability" },
      ]
    },
    {
      title: "Operations Hub",
      items: [
        { icon: <Package />, label: "Atelier CMS", href: "/admin/content" },
        { icon: <Truck />, label: "Logistics", href: "/admin/logistics" },
        { icon: <ClipboardList />, label: "Consignments", href: "/admin/operations" },
        { icon: <Award />, label: "Heritage Bureau", href: "/admin/heritage-archive" },
      ]
    },
    {
      title: "Acquisition",
      items: [
        { icon: <Target />, label: "Sales CRM", href: "/admin/sales" },
        { icon: <BarChart3 />, label: "Revenue Matrix", href: "/admin/revenue" },
        { icon: <CreditCard />, label: "Treasury", href: "/admin/finance" },
      ]
    },
    {
      title: "Market Integrity",
      items: [
        { icon: <UserCircle />, label: "Partner Hub", href: "/admin/vendor" },
        { icon: <Megaphone />, label: "Marketing", href: "/admin/marketing" },
        { icon: <Activity />, label: "Integrations", href: "/admin/integrations" },
      ]
    },
    {
      title: "Infrastructure",
      items: [
        { icon: <FlaskConical />, label: "QA Stress Lab", href: "/admin/qa" },
        { icon: <Bell />, label: "Alerts", href: "/admin/notifications" },
        { icon: <ShieldAlert />, label: "Anomalies", href: "/admin/errors" },
        { icon: <ShieldCheck />, label: "Audit Log", href: "/admin/compliance" },
      ]
    }
  ];

  return (
    <aside className="w-72 bg-[#111113] border-r border-white/5 flex flex-col z-50 h-full shrink-0">
      <div className="p-10 border-b border-white/5">
        <Link href="/admin">
          <div className="font-headline text-3xl font-bold tracking-tighter text-white flex items-center group">
            AMARISÉ <span className="text-plum text-[10px] font-bold tracking-[0.4em] ml-2 opacity-60">CORE</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-6 py-10 space-y-12 custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h4 className="px-4 text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">{group.title}</h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button className={cn(
                    "w-full flex items-center space-x-4 px-4 py-3 rounded-none transition-all duration-500 text-[11px] group border-none bg-transparent outline-none cursor-pointer",
                    pathname === item.href 
                      ? "bg-white/5 text-white border-l-2 border-plum" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}>
                    <span className={cn(
                      "transition-transform duration-500 group-hover:scale-110",
                      pathname === item.href ? "text-plum" : "text-white/20 group-hover:text-white/60"
                    )}>
                      {React.cloneElement(item.icon as React.ReactElement, { size: 16 })}
                    </span>
                    <span className="flex-1 text-left tracking-widest uppercase font-bold">{item.label}</span>
                    {pathname === item.href && <ChevronRight className="w-3 h-3 text-plum" />}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-2 bg-[#0A0A0B]">
        <Link href={`/${countryCode}`}>
          <button className="w-full flex items-center space-x-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-blue-400/60 hover:text-blue-400 transition-colors border-none bg-transparent outline-none cursor-pointer">
            <ExternalLink size={16} />
            <span>Maison Storefront</span>
          </button>
        </Link>
        <Link href={`/${countryCode}`}>
          <button className="w-full flex items-center space-x-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors border-none bg-transparent outline-none cursor-pointer">
            <LogOut size={16} />
            <span>Exit Node</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}
