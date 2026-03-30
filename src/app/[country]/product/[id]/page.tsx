"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { PRODUCTS, formatPrice, COUNTRIES } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";
import { ImageZoom } from "@/components/product/ImageZoom";
import { VerticalGallery } from "@/components/product/VerticalGallery";
import Link from "next/link";
import ProductInfoPanel from "@/components/product/ProductInfoPanel";
import YouMayAlsoLike from "@/components/product/YouMayAlsoLike";
import CustomerReviews from "@/components/product/CustomerReviews";

/**
 * ProductPage: Institutional Artifact View.
 * Optimized for high-fidelity technical detail and SEO authority.
 */
export default function ProductPage() {
  const { id, country } = useParams();
  const countryCode = (country as string) || "us";
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);

  if (!product)
    return (
      <div className="py-40 text-center font-headline text-3xl">
        Artifact not found in registry.
      </div>
    );

  return (
    <div className="bg-white max-w-[1200px] mx-auto min-h-screen px-3 pb-20 lg:pb-40 animate-fade-in font-body">
      {/* 1. Breadcrumbs */}
      <nav className="hidden sm:block container mx-auto  lg:px-12 py-4 mb-4 max-w-[1600px]">
        <div
          className="flex items-center space-x-2 text-[10px] lg:text-[11px] font-normal text-black
         tracking-widest"
        >
          <Link
            href={`/${countryCode}`}
            className="hover:text-black transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-gray-900 truncate font-bold">
            {product.name}
          </span>
        </div>
      </nav>

      <main className=" lg:px-12 py-6 lg:py-2 ">
        <div className="flex flex-col lg:flex-row ">
          {/* Column 1: Gallery & Visual Authority */}
          <div className="flex-1 space-y-16">
            <div className="flex flex-col md:flex-row gap-10 max-w-[600px]">
              {/* Vertical Gallery Thumbnails */}
              <div className="hidden xl:block">
                <VerticalGallery
                  images={[product.imageUrl]}
                  productName={product.name}
                  selectedIndex={selectedImageIndex}
                  onImageSelect={setSelectedImageIndex}
                />
              </div>

              {/* Main Artifact Viewport */}
              <ImageZoom
                src={product.imageUrl}
                alt={product.name}
                className="flex-1 aspect-[4/5] luxury-reveal"
                zoomScale={2.5}
              />
            </div>
          </div>

          {/* Column 2: Actions & Technical Specs */}
          <ProductInfoPanel />
        </div>
      </main>

      <YouMayAlsoLike />
      <CustomerReviews />
    </div>
  );
}
