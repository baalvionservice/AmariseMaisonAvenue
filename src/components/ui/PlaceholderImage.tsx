'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  className?: string;
}

/**
 * PlaceholderImage: Institutional placeholder for product artifacts.
 * Ensures layout stability and accessibility while visuals are in transition.
 */
export function PlaceholderImage({ className }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "bg-[#ffffff] flex items-center justify-center text-[#ccc] text-[10px] font-bold uppercase tracking-[0.2em] text-center p-6 border border-border/40 select-none",
        className
      )}
      aria-label="Lens Opening Placeholder"
      role="img"
    >
      Lens Opening Placeholder
    </div>
  );
}
