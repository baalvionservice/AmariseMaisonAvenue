"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useFilter } from "@/hooks/useFilter";
import { FilterSheet } from "@/components/category/FilterSheet";
import { CategorySidebar } from "@/components/category/CatergorySidebar";
import { CollectionToolbar } from "@/components/category/CollectionToolbar";
import { PRODUCTS } from "@/lib/mock-data";
import { ProductGrid } from "@/components/category/ProductGrid";
import { ShopByCategory } from "@/components/category/ShopByCategory";
import { HERMES_SIDEBAR } from "@/lib/mock-category-data";

// ── Components ────────────────────────────────────────────────────────────────

// ── Data / hooks ──────────────────────────────────────────────────────────────

export default function CategoryPage() {
  const params = useParams();
  const countryCode = (params?.country as string) || "us";
  const id = params?.id as string;
  const categoryName = id === "hermes" ? "Hermès" : id === "other-brands" ? null : "Atelier Registry";

  const [filterOpen, setFilterOpen] = useState(false);
  const filter = useFilter();

  // Find if the current ID matches a collection or item in HERMES_SIDEBAR
  const findMatchingData = () => {
    for (const section of HERMES_SIDEBAR) {
      // Check if ID matches a section (like "handbags")
      if (section.id === id) {
        return { type: "section" as const, data: section };
      }

      // Check if ID matches an item (like "birkin")
      for (const item of section.items) {
        if (item.id === id) {
          return { type: "item" as const, data: item };
        }

        // Check if ID matches a subItem (like "birkin-25cm")
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
            Hermès Archive
          </h1>

          {/* ── Left: Sidebar navigation ── */}

          {categoryName && <CategorySidebar categoryName={categoryName} />}

          {/* ── Right: Main content area ── */}
          <main className="flex-1 min-w-0 space-y-10 md:px-4">
            {/* Page heading */}
            <header>
              <h1 className="hidden md:flex text-[34px] font-medium text-[#1a1a1a] tracking-tight leading-none mb-[18px]">
                Hermès Archive
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
