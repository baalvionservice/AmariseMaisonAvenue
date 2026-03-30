"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { formatPrice, PRODUCTS } from "@/lib/mock-data";
import { Product } from "@/lib/types";
import Link from "next/link";

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group flex-shrink-0 w-[280px] cursor-pointer">
      {/* Image box — pure white bg, square, object-contain like MAC */}
      <div className="relative bg-white overflow-hidden aspect-square">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((w) => !w);
          }}
          className="absolute top-3 right-3 z-10"
          aria-label="Wishlist"
        >
          <Heart
            strokeWidth={1.5}
            className={cn(
              "w-5 h-5 transition-all",
              wishlisted
                ? "fill-black stroke-black"
                : "fill-transparent stroke-gray-400 hover:stroke-gray-700"
            )}
          />
        </button>

        <Link href={`/us/product/${product.id}`}>
          <Image
            fill
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </Link>
      </div>

      {/* Text — centered, no badge */}
      <div className="pt-4 text-center space-y-1">
        <p className="text-[12px] text-gray-800 leading-[1.5] tracking-wide">
          {product.name}
        </p>
        <p className="text-[13px] font-semibold text-gray-900 tabular-nums tracking-tight">
          {formatPrice(product.basePrice, "us")}
        </p>
      </div>
    </div>
  );
}

// ─── Main Carousel ────────────────────────────────────────────────────────────
export default function YouMayAlsoLike() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const step = firstCard ? firstCard.offsetWidth + 16 : 280;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section className="w-full py-16">
      {/* Centered serif heading — matches MAC exactly */}
      <h2 className="text-center text-[30px] font-serif font-normal text-gray-900 tracking-normal mb-10">
        You May Also Like
      </h2>

      {/* Row: [arrow] [cards] [arrow] */}
      <div className="relative flex items-center gap-2">
        {/* ← Prev */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center bg-white transition-all shadow-sm",
            canScrollLeft
              ? "border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-900"
              : "border-gray-100 text-gray-200 cursor-default pointer-events-none"
          )}
          aria-label="Previous"
        >
          <ChevronLeft className="w-[14px] h-[14px]" />
        </button>

        {/* Scrollable cards track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto flex-1 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>
          {PRODUCTS.map((p) => (
            <div key={p.id} data-card>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* → Next */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center bg-white transition-all shadow-sm",
            canScrollRight
              ? "border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-900"
              : "border-gray-100 text-gray-200 cursor-default pointer-events-none"
          )}
          aria-label="Next"
        >
          <ChevronRight className="w-[14px] h-[14px]" />
        </button>
      </div>
    </section>
  );
}
