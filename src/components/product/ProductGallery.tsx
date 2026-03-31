"use client";

import React, { useState } from "react";
import { VerticalGallery } from "./VerticalGallery";
import { ImageZoom } from "./ImageZoom";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export function ProductGallery({
  images,
  productName,
  className,
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Use the selected image or fallback to the first image
  const currentImage = images[selectedImageIndex] || images[0];

  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row gap-10 max-w-[600px]">
        {/* Vertical Gallery Thumbnails */}
        <VerticalGallery
          images={images}
          productName={productName}
          selectedIndex={selectedImageIndex}
          onImageSelect={handleImageSelect}
        />

        {/* Main Artifact Viewport */}
          <ImageZoom
            src={currentImage}
            alt={productName}
            className="flex-1 aspect-[4/5] luxury-reveal"
            zoomScale={2.5}
          />
      </div>
    </div>
  );
}
