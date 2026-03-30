import React from "react";
import { PRODUCTS, COUNTRIES } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";
import { ProductGallery } from "@/components/product/ProductGallery";
import Link from "next/link";
import ProductInfoPanel from "@/components/product/ProductInfoPanel";
import YouMayAlsoLike from "@/components/product/YouMayAlsoLike";
import CustomerReviews from "@/components/product/CustomerReviews";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    id: string;
    country: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id, country } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  const countryData = COUNTRIES[country] || COUNTRIES.us;

  if (!product) {
    return {
      title: "Product Not Found | Amarisé Luxe",
      description:
        "The requested luxury artifact could not be found in our registry.",
    };
  }

  const seoTitle =
    product.seoTitle || `${product.name} | Amarisé Luxe ${countryData.name}`;
  const seoDescription =
    product.seoDescription ||
    `Discover the exquisite ${product.name} at Amarisé Luxe. Premium luxury artifacts with heritage craftsmanship. Available in ${countryData.name}.`;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [product.imageUrl],
    },
  };
}

/**
 * ProductPage: Institutional Artifact View.
 * Optimized for high-fidelity technical detail and SEO authority.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { id, country } = await params;
  const countryCode = country || "us";

  const product = PRODUCTS.find((p) => p.id === id);

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
            <ProductGallery
              images={[product.imageUrl]}
              productName={product.name}
            />
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
