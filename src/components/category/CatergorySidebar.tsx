"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  HERMES_SIDEBAR,
  SidebarNavItem,
  SidebarSection,
} from "@/lib/mock-category-data";

// ─── Single sub-link ──────────────────────────────────────────────────────────
function SidebarSubLink({ label, id }: { label: string; id: string }) {
  return (
    <Link
    href={`/us/category/${id}`}
      className="block text-[11.5px] font-light text-[#7a7570] hover:text-[#1a1a1a] transition-colors duration-150 tracking-wide leading-relaxed"
    >
      {label}
    </Link>
  );
}

// ─── Single nav item (may have sub-items) ─────────────────────────────────────
function SidebarNavItemRow({ item }: { item: SidebarNavItem }) {
  const hasChildren = Boolean(item.subItems?.length);
  const [open, setOpen] = useState(item.id === "birkin"); // Birkin open by default

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen((o) => !o)}
        className={`w-full flex items-center justify-between py-1.5 text-[12.5px] tracking-wide text-[#5a5550] hover:text-[#1a1a1a] transition-colors duration-150 bg-transparent border-none text-left leading-snug ${
          hasChildren ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <Link href={`/us/category/${item.id}`}>{item.label}</Link>
        {hasChildren &&
          (open ? (
            <ChevronUp className="w-3 h-3 text-[#ccc] flex-shrink-0" />
          ) : (
            <ChevronDown className="w-3 h-3 text-[#ccc] flex-shrink-0" />
          ))}
      </button>

      {hasChildren && open && (
        <div className="pl-4 mt-1.5 mb-3 space-y-2.5">
          {item.subItems!.map((sub) => (
            <SidebarSubLink key={sub.id} label={sub.label} id={sub.id} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section accordion ────────────────────────────────────────────────────────
function SidebarSectionBlock({ section }: { section: SidebarSection }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-[#ece9e4] pb-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-[11px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a] bg-transparent border-none cursor-pointer"
      >
        <Link href={`/us/category/${section.id}`}>{section.label}</Link>
        {open ? (
          <ChevronUp className="w-3.5 h-3.5 text-[#aaa] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-[#aaa] flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="pl-1 space-y-0.5 mb-2">
          {section.items.map((item) => (
            <SidebarNavItemRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Full Sidebar ─────────────────────────────────────────────────────────────
interface CategorySidebarProps {
  categoryName: string;
}

export function CategorySidebar({ categoryName }: CategorySidebarProps) {
  return (
    <aside className="lg:w-48 xl:w-52 shrink-0">
      {/* Category heading */}
      <div className="pb-4 mb-1 border-b border-[#ece9e4]">
        <h2 className="text-[22px] font-medium text-[#6a6560] tracking-tight leading-tight">
          {categoryName}
        </h2>
      </div>

      {/* Nav sections */}
      <nav className="space-y-0 mt-2">
        {HERMES_SIDEBAR.map((section) => (
          <SidebarSectionBlock key={section.id} section={section} />
        ))}
      </nav>
    </aside>
  );
}
