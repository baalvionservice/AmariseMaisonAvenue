"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useFilter } from "@/hooks/useFilter";
import { FilterSheet } from "@/components/category/FilterSheet";
import { CategorySidebar } from "@/components/category/CatergorySidebar";
import { CollectionToolbar } from "@/components/category/CollectionToolbar";
import { PRODUCTS } from "@/lib/mock-data";
import { ProductGrid } from "@/components/category/ProductGrid";
import { ShopByCategory } from "@/components/category/ShopByCategory";
import { getCategorySidebar } from "@/lib/mock-category-data";

// ── Category label map ────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  // New Arrivals
  "new-arrivals-handbags": "Hermès Handbags - New Arrivals",
  "new-arrivals-hermes": "Hermès Handbags - New Arrivals",
  "new-arrivals-chanel-handbags-and-accessories": "Chanel Bags - New Arrivals",
  "view-all-new-arrivals": "New Arrivals",
  "jewelry-new-arrivals": "Jewelry - New Arrivals",

  // Hermès Bags
  "hermes-handbags": "Hermès Bags",
  "hermes-birkin-handbags": "Hermès Birkin Bags",
  "hermes-kelly-handbags": "Hermès Kelly Bags",
  "hermes-constance-handbags": "Hermès Constance Bags",
  "hermes-evelyne-bags": "Hermès Evelyne Bags",
  "hermes-picotin-bags": "Hermès Picotin Bags",
  "hermes-lindy-bags": "Hermès Lindy Bags",
  "hermes-bolide-bags": "Hermès Bolide Bags",
  "hermes-herbag-collection": "Hermès Herbag Collection",
  "hermes-clutch": "Hermès Pochettes & Kelly Cuts",
  "hermes-hss-special-order-bags": "Hermès HSS Special Order Bags",
  "hermes-exotic-handbags": "Hermès Exotics",
  "hermes-rare-handbags": "Hermès Rare & Unique",
  "hermes-pre-owned-vintage": "Pre-Owned Hermès Bags",
  "bag-besties-organizers": "Bag Besties",

  // Hermès Accessories
  "hermes-wallets": "Hermès Wallets",
  "hermes-belts": "Hermès Belts",
  "hermes-charms": "Hermès Charms",
  "hermes-scarves": "Hermès Scarves",
  "hermes-shoes": "Hermès Shoes",

  // Watches & Jewelry
  "watches": "Hermès Watches",
  "jewelry": "Fine Jewelry",
  "fine-jewelry": "Fine Jewelry",
  "costume-jewelry": "Costume Jewelry",
  "vintage-chanel-jewelry": "Vintage Chanel Jewelry",
  "chanel-contemporary-jewelry": "Contemporary Chanel Jewelry",
  "jewelry-vintage": "Vintage Jewelry",
  "jewelry-contemporary": "Contemporary Jewelry",

  // Chanel Bags
  "chanel-bags": "Chanel Bags",
  "chanel-flap-bags": "Chanel Flap Bags",
  "chanel-classic-mini": "Chanel Mini Flap Bags",
  "chanel-classic-small": "Chanel Small Flap Bags",
  "chanel-classic-medium": "Chanel Medium Flap Bags",
  "chanel-jumbo-maxi-flaps": "Chanel Jumbo & Maxi Flap Bags",
  "chanel-22-bags": "Chanel 22 Bags",
  "chanel-25-bags": "Chanel 25 Bags",
  "chanel-tote": "Chanel Totes",
  "chanel-wallet-on-chain": "Chanel Wallet on Chain",
  "chanel-fashion-runway-bags": "Chanel Fashion & Runway Bags",
  "chanel-wallets": "Chanel Wallets",
  "chanel-shoes": "Chanel Shoes",
  "chanel-pre-owned": "Pre-Owned Chanel Bags",

  // Goyard
  "goyard": "Goyard Bags",
  "goyard-st-louis-bags": "Goyard St. Louis Totes",
  "goyard-saigon-bags": "Goyard Saigon Bags",
  "goyard-anjou-bags": "Goyard Anjou Bags",
  "goyard-artois-bags": "Goyard Artois Bags",
  "goyard-other-styles": "Goyard Other Styles",

  // Other Brands
  "other-bags-1": "Other Bags",
  "the-row-bags": "The Row Bags",
  "louis-vuitton-bags": "Louis Vuitton Bags",
  "christian-dior-bags": "Christian Dior Bags",
  "fendi-bags": "Fendi Bags",
  "loro-piana-bags": "Loro Piana Bags",
};

function getCategoryLabel(id: string): string {
  if (!id) return "Collection";
  
  // 1. Direct match
  if (CATEGORY_LABELS[id]) return CATEGORY_LABELS[id];
  
  // 2. Heuristic formatting for unmatched IDs (e.g. "hermes-birkin-30cm")
  let result = id
    .split("-")
    .map((w) => {
      // Keep capitalization for certain words like "HSS", don't format 'cm' numbers weirdly
      if (w.toLowerCase() === "hss") return "HSS";
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");

  // Fix brand names
  result = result.replace(/Hermes/gi, "Hermès");
  
  // Ensure "Bags" suffix if the category implies it but doesn't have it
  if (id.includes('handbags') || id.includes('bags')) {
     result = result.replace('Handbags', 'Bags');
  } else if (!result.includes('Bags') && !result.includes('Jewelry') && !result.includes('Watches') && !result.includes('Wallets') && !result.includes('Shoes') && !result.includes('Belts')) {
     result += " Bags";
  }

  return result;
}

function getCategoryBrandName(id: string): string {
  if (!id) return "Collection";
  
  const idLower = id.toLowerCase();
  if (idLower.startsWith("hermes") || idLower === "new-arrivals-handbags" || idLower === "bag-besties-organizers") {
    return "Hermès";
  }
  if (idLower.includes("chanel")) {
    return "Chanel";
  }
  if (idLower.startsWith("goyard")) {
    return "Goyard";
  }
  if (idLower.includes("jewelry") || idLower === "watches") {
    return "Fine Jewelry";
  }
  if (
    idLower === "other-bags-1" || 
    idLower === "view-all-new-arrivals" ||
    idLower.includes("row") || 
    idLower.includes("dior") || 
    idLower.includes("vuitton") || 
    idLower.includes("fendi") || 
    idLower.includes("piana")
  ) {
    return "Other Brands";
  }
  
  return "Collection";
}

// ── Data / hooks ──────────────────────────────────────────────────────────────

export default function CategoryPage() {
  const params = useParams();
  const countryCode = (params?.country as string) || "us";
  const id = params?.id as string;

  const pageTitle = useMemo(() => getCategoryLabel(id), [id]);
  const brandName = useMemo(() => getCategoryBrandName(id), [id]);
  const sidebarSections = useMemo(() => getCategorySidebar(id), [id]);

  const [filterOpen, setFilterOpen] = useState(false);
  const filter = useFilter();

  // Find if the current ID matches a section/item/subItem in the resolved sidebar
  const findMatchingData = () => {
    if (!sidebarSections) return null;
    for (const section of sidebarSections) {
      if (section.id === id) {
        return { type: "section" as const, data: section };
      }
      for (const item of section.items) {
        if (item.id === id) {
          return { type: "item" as const, data: item };
        }
        if (item.subItems) {
          for (const subItem of item.subItems) {
            if (subItem.id === id) {
              return { type: "subItem" as const, data: subItem, parent: item };
            }
          }
        }
      }
    }
    return null;
  };

  const matchingData = findMatchingData();

  return (
    <div className="bg-white min-h-screen font-sans antialiased">
      {/* ── Filter slide-over panel ── */}
      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filter={filter}
      />

      {/* ── Page body ── */}
      <div className="max-w-[1200px] mx-auto px-1 lg:px-12 pt-10 lg:pt-14 pb-28">
        <div className="flex flex-col lg:flex-row ">
          <h1 className=" md:hidden text-[24px] font-medium text-[#1a1a1a] tracking-tight leading-none mb-[18px]">
            {pageTitle}
          </h1>

          {/* ── Left: Sidebar navigation ── */}
          {sidebarSections && (
            <CategorySidebar
              categoryName={brandName}
              sections={sidebarSections}
              countryCode={countryCode}
            />
          )}

          {/* ── Right: Main content area ── */}
          <main className="flex-1 min-w-0 space-y-10 md:px-4">
            {/* Page heading */}
            <header>
              <h1 className="hidden md:flex text-[34px] font-medium text-[#1a1a1a] tracking-tight leading-none mb-[18px]">
                {pageTitle}
              </h1>

              {/* Shop by Category Components based on matching data */}
              {matchingData?.type === "section" && (
                <ShopByCategory
                  title="Shop by Style"
                  items={matchingData.data.items}
                  countryCode={countryCode}
                  variant="style"
                />
              )}

              {matchingData?.type === "item" && matchingData.data.subItems && (
                <ShopByCategory
                  title="Shop by Size"
                  items={matchingData.data.subItems}
                  countryCode={countryCode}
                  variant="size"
                />
              )}

              {/* Toolbar: product count + filter + sort + chips */}
              <CollectionToolbar
                totalProducts={PRODUCTS.length}
                filter={filter}
                onFilterOpen={() => setFilterOpen(true)}
              />
            </header>

            {/* Product grid */}
            <ProductGrid
              products={PRODUCTS.slice(0, 50)}
              countryCode={countryCode}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
