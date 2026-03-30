"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerticalGalleryProps {
  images: string[];
  productName: string;
  onImageSelect?: (index: number) => void;
  selectedIndex?: number;
}

export function VerticalGallery({
  images,
  productName,
  onImageSelect,
  selectedIndex = 0,
}: VerticalGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create array of 8 images (repeat the main image for demo)
  const galleryImages = Array.from({ length: 8 }, (_, i) => images[0] || "");

  const scrollUp = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return galleryImages.length - 5; // Jump to bottom when at top
      }
      return prev - 1;
    });
  };

  const scrollDown = () => {
    setCurrentIndex((prev) => {
      if (prev >= galleryImages.length - 5) {
        return 0; // Jump to top when at bottom
      }
      return prev + 1;
    });
  };

  const handleImageClick = (index: number) => {
    onImageSelect?.(index);
  };

  return (
    <div className="flex flex-col w-24 shrink-0">
      {/* Up Arrow */}
      <button
        onClick={scrollUp}
        className="flex items-center justify-center h-8 mb-2 transition-all duration-200"
        aria-label="Scroll up"
      >
        <ChevronUp className="w-10 h-10 stroke-1" />
      </button>

      {/* Thumbnail Container */}
      <div className="relative h-[500px] overflow-hidden">
        <div
          className="flex flex-col space-y-3 transition-transform duration-500 ease-out"
          style={{
            transform: `translateY(-${currentIndex * (96 + 12)}px)`, // 96px height + 12px gap
          }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className={cn(
                "aspect-square cursor-pointer transition-all duration-300 group relative",
                "hover:scale-105 hover:shadow-lg",
                selectedIndex === index
                  ? "ring-2 ring-black shadow-lg scale-105"
                  : "hover:ring-1 hover:ring-gray-300"
              )}
            >
              <div className="relative w-full h-full bg-[#fcfcfc] overflow-hidden rounded-sm">
                <Image
                  src={image}
                  alt={`${productName} view ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="96px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Down Arrow */}
      <button
        onClick={scrollDown}
        className="flex items-center justify-center h-8 mb-2 transition-all duration-200"
        aria-label="Scroll up"
      >
        <ChevronDown className="w-10 h-10 stroke-1" />
      </button>
    </div>
  );
}
